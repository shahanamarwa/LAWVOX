import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import db from "./database";
import "./cases";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const PORT = Number(process.env.PORT) || 5000;

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

// Root endpoint
app.get("/", (_req, res) => {
  res.json({
    message: "Welcome to LAWVOX API",
  });
});

app.listen(PORT, () => {
  console.log(`LAWVOX backend running on port ${PORT}`);
});
