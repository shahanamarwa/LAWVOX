import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import crypto from "crypto";
import db from "./database";
import "./cases";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const PORT = Number(process.env.PORT) || 5000;

// Predefined account credential verification
function verifyCredentials(accountInput: string, passwordInput: string): boolean {
  const expectedAccount = (process.env.AUTH_ACCOUNT_NAME || "lakshmi").trim();
  const expectedPassword = process.env.AUTH_PASSWORD || process.env.ADMIN_PASSWORD;

  if (!accountInput || !passwordInput || !expectedPassword) {
    return false;
  }

  // Account check (case-insensitive)
  if (accountInput.trim().toLowerCase() !== expectedAccount.toLowerCase()) {
    return false;
  }

  // Constant-time comparison using SHA-256 digests
  const inputHash = crypto.createHash("sha256").update(passwordInput).digest();
  const expectedHash = crypto.createHash("sha256").update(expectedPassword).digest();

  return crypto.timingSafeEqual(inputHash, expectedHash);
}

// Generate signed authentication token
function generateAuthToken(accountName: string): string {
  const secret = process.env.AUTH_SECRET || "lawvox-session-token-secret-salt-2025";
  const header = Buffer.from(JSON.stringify({ alg: "HS256", typ: "JWT" })).toString("base64url");
  const payload = Buffer.from(
    JSON.stringify({
      accountName,
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + 7 * 24 * 60 * 60, // 7 days validity
    })
  ).toString("base64url");

  const signature = crypto
    .createHmac("sha256", secret)
    .update(`${header}.${payload}`)
    .digest("base64url");

  return `${header}.${payload}.${signature}`;
}

// Verify signed authentication token
function verifyAuthToken(token: string): { valid: boolean; accountName?: string } {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) return { valid: false };
    const [header, payload, signature] = parts;
    const secret = process.env.AUTH_SECRET || "lawvox-session-token-secret-salt-2025";

    const expectedSig = crypto
      .createHmac("sha256", secret)
      .update(`${header}.${payload}`)
      .digest("base64url");

    const sigBuf = Buffer.from(signature);
    const expBuf = Buffer.from(expectedSig);
    if (sigBuf.length !== expBuf.length || !crypto.timingSafeEqual(sigBuf, expBuf)) {
      return { valid: false };
    }

    const decoded = JSON.parse(Buffer.from(payload, "base64url").toString("utf-8"));
    if (decoded.exp && decoded.exp < Math.floor(Date.now() / 1000)) {
      return { valid: false };
    }

    return { valid: true, accountName: decoded.accountName };
  } catch {
    return { valid: false };
  }
}

// Health check
app.get("/api/health", (_req, res) => {
  res.json({
    success: true,
    message: "LAWVOX backend is running",
  });
});

// Get all cases
app.get("/api/cases", (_req, res) => {
  try {
    const cases = db
      .prepare("SELECT * FROM cases ORDER BY year DESC")
      .all();

    res.json({
      success: true,
      count: cases.length,
      cases,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch cases",
    });
  }
});

// Search cases — MUST BE BEFORE :id route
app.get("/api/cases/search", (req, res) => {
  try {
    const query = String(req.query.q || "").trim();

    if (!query) {
      return res.json({
        success: true,
        count: 0,
        cases: [],
      });
    }

    const searchTerm = `%${query}%`;

    const cases = db
      .prepare(`
        SELECT * FROM cases
        WHERE case_name LIKE ?
           OR category LIKE ?
           OR summary LIKE ?
           OR judgment LIKE ?
        ORDER BY year DESC
      `)
      .all(searchTerm, searchTerm, searchTerm, searchTerm);

    res.json({
      success: true,
      count: cases.length,
      cases,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Search failed",
    });
  }
});

// Get case by ID — AFTER search route
app.get("/api/cases/:id", (req, res) => {
  try {
    const id = Number(req.params.id);

    const caseData = db
      .prepare("SELECT * FROM cases WHERE id = ?")
      .get(id);

    if (!caseData) {
      return res.status(404).json({
        success: false,
        message: "Case not found",
      });
    }

    res.json({
      success: true,
      case: caseData,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch case",
    });
  }
});

// Login endpoint (Predefined account authentication)
app.post("/api/login", (req, res) => {
  try {
    const { accountName, username, password } = req.body || {};
    const inputAccount = (accountName || username || "").toString().trim();
    const inputPassword = (password || "").toString();

    if (!inputAccount || !inputPassword) {
      return res.status(401).json({
        success: false,
        message: "Invalid account name or password",
      });
    }

    const isValid = verifyCredentials(inputAccount, inputPassword);

    if (!isValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid account name or password",
      });
    }

    const token = generateAuthToken(inputAccount);

    return res.json({
      success: true,
      message: "Login successful",
      token,
      user: {
        accountName: inputAccount,
        name: inputAccount.toLowerCase() === "lakshmi" ? "Lakshmi" : inputAccount,
        role: "Constitutional Law Researcher",
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({
      success: false,
      message: "An unexpected error occurred during login",
    });
  }
});

// Current user session verification endpoint
app.get("/api/auth/me", (req, res) => {
  const authHeader = req.headers.authorization;
  const token = authHeader?.startsWith("Bearer ") ? authHeader.slice(7) : null;

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "No token provided",
    });
  }

  const { valid, accountName } = verifyAuthToken(token);
  if (!valid || !accountName) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }

  return res.json({
    success: true,
    user: {
      accountName,
      name: accountName.toLowerCase() === "lakshmi" ? "Lakshmi" : accountName,
      role: "Constitutional Law Researcher",
    },
  });
});

// Root endpoint
app.get("/", (_req, res) => {
  res.json({
    message: "Welcome to LAWVOX API",
  });
});

app.listen(PORT, () => {
  console.log(`LAWVOX backend running on port ${PORT}`);
});
