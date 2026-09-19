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

// Safe secret cleanup for environment variables (handles accidental quotes/spaces)
function cleanSecret(val?: string): string {
  if (!val) return "";
  let s = val.trim();
  if ((s.startsWith('"') && s.endsWith('"')) || (s.startsWith("'") && s.endsWith("'"))) {
    s = s.slice(1, -1);
  }
  return s;
}

// Constant-time comparison using SHA-256 digests
function safeCompare(a: string, b: string): boolean {
  if (!a || !b) return false;
  const hashA = crypto.createHash("sha256").update(a).digest();
  const hashB = crypto.createHash("sha256").update(b).digest();
  return crypto.timingSafeEqual(hashA, hashB);
}

// Predefined account credential verification
function verifyCredentials(accountInput: string, passwordInput: string): boolean {
  const expectedAccount = (process.env.AUTH_ACCOUNT_NAME || "lakshmi").trim();
  const rawExpectedPassword = process.env.AUTH_PASSWORD || process.env.ADMIN_PASSWORD || "";
  const cleanedExpectedPassword = cleanSecret(rawExpectedPassword);

  if (!accountInput || !passwordInput || !cleanedExpectedPassword) {
    return false;
  }

  // Account check (case-insensitive)
  if (accountInput.trim().toLowerCase() !== expectedAccount.toLowerCase()) {
    return false;
  }

  // Compare against raw, cleaned (trimmed/unquoted), or trimmed input
  return (
    safeCompare(passwordInput, rawExpectedPassword) ||
    safeCompare(passwordInput, cleanedExpectedPassword) ||
    safeCompare(passwordInput.trim(), cleanedExpectedPassword)
  );
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

// Health check with safe environment diagnosis (no secrets or values revealed)
app.get(["/api/health", "/health"], (_req, res) => {
  res.json({
    success: true,
    message: "LAWVOX backend is running",
    envDiagnosis: {
      AUTH_ACCOUNT_NAME_CONFIGURED: Boolean(process.env.AUTH_ACCOUNT_NAME),
      AUTH_PASSWORD_CONFIGURED: Boolean(process.env.AUTH_PASSWORD || process.env.ADMIN_PASSWORD),
      AUTH_SECRET_CONFIGURED: Boolean(process.env.AUTH_SECRET),
    },
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

// Login endpoint (Predefined account authentication) - supports both /api/login and /login
app.post(["/api/login", "/login"], (req, res) => {
  try {
    const { accountName, username, password } = req.body || {};
    const inputAccount = (accountName || username || "").toString().trim();
    const inputPassword = (password || "").toString();

    const hasPasswordConfigured = Boolean(process.env.AUTH_PASSWORD || process.env.ADMIN_PASSWORD);
    console.log(`[Auth Diagnostic] Received login request for account "${inputAccount}". AUTH_PASSWORD configured: ${hasPasswordConfigured}`);

    if (!inputAccount || !inputPassword) {
      console.warn(`[Auth Diagnostic] Login rejected: Missing accountName or password in request body.`);
      return res.status(401).json({
        success: false,
        message: "Invalid account name or password",
      });
    }

    if (!hasPasswordConfigured) {
      console.error(`[Auth Diagnostic] CRITICAL: AUTH_PASSWORD (or ADMIN_PASSWORD) is NOT available in environment variables. All logins will fail until this variable is linked and available to the service.`);
      return res.status(401).json({
        success: false,
        message: "Invalid account name or password",
      });
    }

    const isValid = verifyCredentials(inputAccount, inputPassword);

    if (!isValid) {
      console.warn(`[Auth Diagnostic] Login rejected: Credentials mismatch for account "${inputAccount}".`);
      return res.status(401).json({
        success: false,
        message: "Invalid account name or password",
      });
    }

    console.log(`[Auth Diagnostic] Login SUCCESSFUL for account "${inputAccount}".`);
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

// Current user session verification endpoint - supports both /api/auth/me and /auth/me
app.get(["/api/auth/me", "/auth/me"], (req, res) => {
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
