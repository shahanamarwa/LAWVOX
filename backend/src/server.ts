import dotenv from 'dotenv';
import { createApp } from './app';
import { initializeDatabase } from './config/database';
import { seedDatabase } from './database/seed';

dotenv.config();

const PORT = parseInt(process.env.PORT || '5000', 10);

// 1. Initialize SQLite Database Schema
try {
  initializeDatabase();
  // Automatically seed initial landmark cases if database is freshly created
  seedDatabase();
} catch (err) {
  console.error('[Startup] Failed to initialize database:', err);
}

// 2. Start Express Server
const app = createApp();

const server = app.listen(PORT, () => {
  console.log(`====================================================`);
  console.log(`⚖️  LAWVOX Backend running at: http://localhost:${PORT}`);
  console.log(`📡  Health Check:            http://localhost:${PORT}/api/health`);
  console.log(`📊  Dashboard API:           http://localhost:${PORT}/api/dashboard`);
  console.log(`📚  Cases API:               http://localhost:${PORT}/api/cases`);
  console.log(`🔍  Search API:              http://localhost:${PORT}/api/search?q=privacy`);
  console.log(`====================================================`);
});

// Graceful shutdown handling
process.on('SIGINT', () => {
  console.log('\n[Shutdown] Stopping LAWVOX backend gracefully...');
  server.close(() => {
    console.log('[Shutdown] Server closed.');
    process.exit(0);
  });
});

process.on('SIGTERM', () => {
  console.log('\n[Shutdown] SIGTERM received, stopping LAWVOX backend...');
  server.close(() => {
    process.exit(0);
  });
});
