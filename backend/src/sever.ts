import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const PORT = Number(process.env.PORT) || 5000;

app.get("/api/health", (_req, res) => {
  res.json({
    success: true,
    message: "LAWVOX backend is running",
  });
});

app.get("/", (_req, res) => {
  res.json({
    message: "Welcome to LAWVOX API",
  });
});

app.listen(PORT, () => {
  console.log(`LAWVOX backend running on port ${PORT}`);
});
