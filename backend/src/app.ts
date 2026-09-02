import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import apiRouter from './routes';
import { errorMiddleware } from './middleware/error.middleware';
import { notFoundMiddleware } from './middleware/notFound.middleware';
import { DashboardService } from './services/dashboard.service';
import { ProfileService } from './services/profile.service';
import { CasesService } from './services/cases.service';
import { BookmarksService } from './services/bookmarks.service';
import { HistoryService } from './services/history.service';
import { NotesService } from './services/notes.service';
import { SettingsService } from './services/settings.service';

export function createApp(): Express {
  const app = express();

  // CORS configuration
  const allowedOrigins = [
    process.env.FRONTEND_URL || 'http://localhost:3000',
    'http://localhost:3000',
    'http://127.0.0.1:3000',
    'http://localhost:5173',
    'http://127.0.0.1:5173',
  ];

  app.use(
    cors({
      origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
          return callback(null, true);
        }
        return callback(null, true);
      },
      credentials: true,
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
      allowedHeaders: ['Content-Type', 'Authorization'],
    })
  );

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Pure Backend & SQLite Database Engine Inspector Portal
  const renderPortal = (req: Request, res: Response) => {
    // If request explicitly asks for JSON (via curl or programmatic API clients)
    if (req.headers.accept && req.headers.accept.includes('application/json') && !req.headers.accept.includes('text/html')) {
      return res.status(200).json({
        success: true,
        name: 'LAWVOX Backend & SQLite Database Engine',
        version: '1.0.0',
        status: 'online',
        database: 'SQLite (backend/data/lawvox.db)',
        endpoints: {
          health: '/api/health',
          dashboard: '/api/dashboard',
          cases: '/api/cases',
          search: '/api/search?q=privacy',
          bookmarks: '/api/bookmarks',
          history: '/api/history',
          notes: '/api/notes',
          profile: '/api/profile',
          settings: '/api/settings',
          searches: '/api/searches',
        },
      });
    }

    // Determine initial active tab based on requested URL path
    let initialTab = 'database';
    const cleanPath = req.path.toLowerCase();
    if (cleanPath.includes('case') || cleanPath.includes('search')) {
      initialTab = 'cases';
    } else if (cleanPath.includes('api')) {
      initialTab = 'api-console';
    } else if (cleanPath.includes('bookmark')) {
      initialTab = 'bookmarks';
    } else if (cleanPath.includes('history')) {
      initialTab = 'history';
    } else if (cleanPath.includes('note')) {
      initialTab = 'notes';
    } else if (cleanPath.includes('profile')) {
      initialTab = 'profile';
    } else if (cleanPath.includes('setting')) {
      initialTab = 'settings';
    } else if (cleanPath.includes('dashboard')) {
      initialTab = 'dashboard';
    }

    const profile = ProfileService.getProfile();
    const cases = CasesService.getAllCases();
    const bookmarks = BookmarksService.getBookmarks();
    const history = HistoryService.getHistory();
    const notes = NotesService.getAllNotes();
    const settings = SettingsService.getSettings();

    const casesJsonString = JSON.stringify(cases).replace(/</g, '\\u003c');
    const notesJsonString = JSON.stringify(notes).replace(/</g, '\\u003c');

    const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>LAWVOX — Backend & SQLite Database Control Center</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;600;700&display=swap" rel="stylesheet">
  <style>
    :root {
      --primary: #7e22ce;
      --primary-hover: #9333ea;
      --primary-light: #f3e8ff;
      --primary-border: #d8b4fe;
      --bg-dark: #0a0e1a;
      --bg-sidebar: #0f172a;
      --card-bg: #ffffff;
      --text-main: #0f172a;
      --text-muted: #64748b;
      --border: #e2e8f0;
      --success: #10b981;
      --violet-gradient: linear-gradient(135deg, #2e1065 0%, #6b21a8 50%, #4c1d95 100%);
    }

    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
      font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif;
    }

    code, pre, .font-mono {
      font-family: 'JetBrains Mono', monospace !important;
    }

    body {
      background: #f1f5f9;
      color: var(--text-main);
      display: flex;
      min-height: 100vh;
      overflow-x: hidden;
    }

    /* Left Sidebar */
    .sidebar {
      width: 280px;
      background: var(--bg-sidebar);
      color: #fff;
      padding: 24px 16px;
      display: flex;
      flex-direction: column;
      flex-shrink: 0;
      border-right: 1px solid rgba(255,255,255,0.08);
      position: sticky;
      top: 0;
      height: 100vh;
      overflow-y: auto;
      z-index: 100;
    }

    .brand {
      display: flex;
      align-items: center;
      gap: 12px;
      padding-bottom: 20px;
      margin-bottom: 20px;
      border-bottom: 1px solid rgba(255,255,255,0.1);
      cursor: pointer;
    }

    .brand-icon {
      width: 44px;
      height: 44px;
      background: var(--violet-gradient);
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 22px;
      box-shadow: 0 4px 12px rgba(126, 34, 206, 0.4);
    }

    .brand-title {
      font-size: 17px;
      font-weight: 800;
      letter-spacing: 0.5px;
      color: #ffffff;
    }

    .pro-badge {
      background: #f59e0b;
      color: #000;
      font-size: 10px;
      font-weight: 800;
      padding: 2px 6px;
      border-radius: 4px;
      margin-left: 6px;
      text-transform: uppercase;
    }

    .nav-label {
      font-size: 11px;
      font-weight: 700;
      color: #94a3b8;
      text-transform: uppercase;
      letter-spacing: 1px;
      margin: 14px 0 8px 8px;
    }

    .nav-item {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 12px 14px;
      border-radius: 10px;
      color: #cbd5e1;
      text-decoration: none;
      font-size: 13px;
      font-weight: 600;
      transition: all 0.15s ease;
      cursor: pointer;
      border: 1px solid transparent;
      margin-bottom: 6px;
      background: transparent;
      width: 100%;
      text-align: left;
      user-select: none;
    }

    .nav-item:hover {
      background: rgba(255,255,255,0.08);
      color: #ffffff;
      transform: translateX(3px);
    }

    .nav-item.active {
      background: #7e22ce !important;
      color: #ffffff !important;
      font-weight: 700;
      box-shadow: 0 4px 14px rgba(126, 34, 206, 0.4);
    }

    .sidebar-db-status {
      margin-top: auto;
      background: rgba(255,255,255,0.04);
      border: 1px solid rgba(255,255,255,0.1);
      border-radius: 12px;
      padding: 12px;
      font-size: 11px;
      color: #cbd5e1;
    }

    /* Main Workspace Area */
    .main-content {
      flex: 1;
      padding: 32px 40px;
      overflow-y: auto;
      max-width: 1300px;
      min-width: 0;
    }

    .top-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 24px;
      flex-wrap: wrap;
      gap: 16px;
    }

    .page-title h1 {
      font-size: 24px;
      font-weight: 800;
      color: #0f172a;
      letter-spacing: -0.5px;
    }

    .page-title p {
      font-size: 13px;
      color: #64748b;
      margin-top: 4px;
    }

    .status-pill {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      background: #ecfdf5;
      color: #065f46;
      border: 1px solid #a7f3d0;
      padding: 8px 16px;
      border-radius: 30px;
      font-size: 12px;
      font-weight: 700;
    }

    .status-dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: #10b981;
      box-shadow: 0 0 8px #10b981;
      animation: pulse 2s infinite;
    }

    @keyframes pulse {
      0% { opacity: 1; }
      50% { opacity: 0.4; }
      100% { opacity: 1; }
    }

    /* Tabs Container */
    .tab-section {
      display: none;
    }

    .tab-section.active-section {
      display: block !important;
      animation: fadeIn 0.2s ease forwards;
    }

    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(4px); }
      to { opacity: 1; transform: translateY(0); }
    }

    /* Cards & Containers */
    .card {
      background: #ffffff;
      border: 1px solid #e2e8f0;
      border-radius: 16px;
      padding: 24px;
      margin-bottom: 24px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.03);
    }

    .card-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 18px;
      padding-bottom: 12px;
      border-bottom: 1px solid #f1f5f9;
      flex-wrap: wrap;
      gap: 12px;
    }

    .card-title {
      font-size: 16px;
      font-weight: 800;
      color: #0f172a;
      display: flex;
      align-items: center;
      gap: 8px;
    }

    /* Database Table View */
    .db-table-wrap {
      overflow-x: auto;
      border: 1px solid #e2e8f0;
      border-radius: 12px;
      margin-top: 14px;
    }

    table.db-table {
      width: 100%;
      border-collapse: collapse;
      text-align: left;
      font-size: 13px;
    }

    table.db-table th {
      background: #f8fafc;
      color: #475569;
      font-weight: 700;
      padding: 12px 16px;
      border-bottom: 1px solid #e2e8f0;
      white-space: nowrap;
    }

    table.db-table td {
      padding: 14px 16px;
      border-bottom: 1px solid #f1f5f9;
      color: #1e293b;
      vertical-align: middle;
    }

    table.db-table tr:hover td {
      background: #faf5ff;
      cursor: pointer;
    }

    /* Grid Layouts */
    .grid-4 {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
      gap: 16px;
      margin-bottom: 24px;
    }

    .grid-2 {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 20px;
      margin-bottom: 24px;
    }

    @media (max-width: 900px) {
      .grid-2 { grid-template-columns: 1fr; }
    }

    /* Stat Box (Clickable) */
    .stat-card {
      background: #ffffff;
      border: 1px solid #e2e8f0;
      border-radius: 14px;
      padding: 18px;
      display: flex;
      align-items: center;
      gap: 16px;
      cursor: pointer;
      transition: all 0.2s ease;
    }

    .stat-card:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 16px rgba(126, 34, 206, 0.12);
      border-color: var(--primary-border);
    }

    .stat-icon-wrap {
      width: 46px;
      height: 46px;
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 20px;
      flex-shrink: 0;
    }

    .stat-num {
      font-size: 22px;
      font-weight: 800;
      color: #0f172a;
    }

    .stat-text {
      font-size: 12px;
      color: #64748b;
      font-weight: 600;
    }

    /* Clickable Case Card */
    .case-card {
      background: #ffffff;
      border: 1px solid #e2e8f0;
      border-radius: 14px;
      padding: 20px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      cursor: pointer;
      transition: all 0.2s ease;
      position: relative;
    }

    .case-card:hover {
      transform: translateY(-3px);
      box-shadow: 0 8px 20px rgba(126, 34, 206, 0.12);
      border-color: #c084fc;
    }

    .case-badge {
      display: inline-block;
      font-size: 11px;
      font-weight: 700;
      padding: 4px 10px;
      border-radius: 6px;
      background: #faf5ff;
      color: #7e22ce;
      border: 1px solid #e9d5ff;
      margin-bottom: 8px;
    }

    .cases-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
      gap: 16px;
    }

    /* Action Buttons (Clickable) */
    .btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
      padding: 8px 14px;
      border-radius: 8px;
      font-size: 12px;
      font-weight: 700;
      cursor: pointer;
      border: 1px solid transparent;
      transition: all 0.15s ease;
      user-select: none;
    }

    .btn-primary {
      background: #7e22ce;
      color: #ffffff;
    }

    .btn-primary:hover {
      background: #9333ea;
    }

    .btn-secondary {
      background: #f8fafc;
      color: #334155;
      border-color: #cbd5e1;
    }

    .btn-secondary:hover {
      background: #f1f5f9;
      color: #0f172a;
    }

    .btn-outline-purple {
      background: transparent;
      color: #7e22ce;
      border-color: #d8b4fe;
    }

    .btn-outline-purple:hover {
      background: #faf5ff;
    }

    /* Filter Pills */
    .filter-pills {
      display: flex;
      gap: 8px;
      flex-wrap: wrap;
      margin-bottom: 16px;
    }

    .filter-pill {
      font-size: 12px;
      font-weight: 600;
      padding: 6px 14px;
      border-radius: 20px;
      background: #ffffff;
      border: 1px solid #cbd5e1;
      color: #475569;
      cursor: pointer;
      transition: all 0.15s ease;
    }

    .filter-pill:hover, .filter-pill.active {
      background: #7e22ce;
      color: #ffffff;
      border-color: #7e22ce;
    }

    /* Search Inputs */
    .search-input {
      width: 100%;
      padding: 12px 16px;
      border: 1px solid #cbd5e1;
      border-radius: 10px;
      font-size: 14px;
      outline: none;
      transition: border-color 0.2s;
    }

    .search-input:focus {
      border-color: #7e22ce;
      box-shadow: 0 0 0 3px rgba(126, 34, 206, 0.15);
    }

    /* API Endpoint Cards (Clickable) */
    .api-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
      gap: 12px;
      margin-bottom: 16px;
    }

    .api-card {
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 10px;
      padding: 12px 14px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      cursor: pointer;
      transition: all 0.15s ease;
    }

    .api-card:hover {
      background: #faf5ff;
      border-color: #c084fc;
      transform: translateX(3px);
    }

    .method-get {
      background: #ecfdf5;
      color: #047857;
      border: 1px solid #a7f3d0;
      font-size: 10px;
      font-weight: 800;
      padding: 2px 6px;
      border-radius: 4px;
      margin-right: 8px;
    }

    .endpoint-path {
      font-size: 12px;
      font-weight: 700;
      color: #1e293b;
      font-family: 'JetBrains Mono', monospace;
    }

    #apiOutputBox {
      background: #090d16;
      color: #38bdf8;
      border-radius: 12px;
      padding: 18px;
      font-size: 12px;
      line-height: 1.5;
      overflow-x: auto;
      max-height: 480px;
      display: none;
      border: 1px solid #1e293b;
    }

    /* Modal Popup for Details */
    .modal-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background: rgba(15, 23, 42, 0.75);
      backdrop-filter: blur(4px);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 9999;
      opacity: 0;
      pointer-events: none;
      transition: opacity 0.2s ease;
      padding: 20px;
    }

    .modal-overlay.modal-open {
      opacity: 1;
      pointer-events: auto;
    }

    .modal-content {
      background: #ffffff;
      border-radius: 18px;
      max-width: 780px;
      width: 100%;
      max-height: 88vh;
      overflow-y: auto;
      padding: 28px;
      box-shadow: 0 20px 40px rgba(0,0,0,0.3);
      position: relative;
    }

    .modal-close {
      position: absolute;
      top: 20px;
      right: 20px;
      width: 34px;
      height: 34px;
      border-radius: 50%;
      border: 1px solid #cbd5e1;
      background: #f8fafc;
      cursor: pointer;
      font-size: 18px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: bold;
    }

    .modal-close:hover {
      background: #fee2e2;
      color: #dc2626;
      border-color: #fca5a5;
    }

    /* Toast Notification */
    .toast {
      position: fixed;
      bottom: 24px;
      right: 24px;
      background: #0f172a;
      color: #fff;
      padding: 12px 20px;
      border-radius: 10px;
      font-size: 13px;
      font-weight: 600;
      display: none;
      z-index: 10000;
      box-shadow: 0 8px 24px rgba(0,0,0,0.3);
      border-left: 4px solid #7e22ce;
    }
  </style>
</head>
<body>

  <!-- Left Sidebar Navigation (Click Any Item to Instantly Switch) -->
  <aside class="sidebar">
    <div class="brand" onclick="switchTab('database')">
      <div class="brand-icon">⚖️</div>
      <div>
        <div class="brand-title">LAWVOX <span class="pro-badge">ENGINE</span></div>
        <div style="font-size: 10px; color: #94a3b8;">Backend & SQLite Core</div>
      </div>
    </div>

    <div class="nav-label">Database & API Core</div>
    <button type="button" id="nav-btn-database" class="nav-item ${initialTab === 'database' ? 'active' : ''}" onclick="switchTab('database')">🗄️ Database Tables</button>
    <button type="button" id="nav-btn-api-console" class="nav-item ${initialTab === 'api-console' ? 'active' : ''}" onclick="switchTab('api-console')">⚡ REST API Console</button>
    
    <div class="nav-label">Constitutional Modules</div>
    <button type="button" id="nav-btn-cases" class="nav-item ${initialTab === 'cases' ? 'active' : ''}" onclick="switchTab('cases')">📚 Precedent Cases (${cases.length})</button>
    <button type="button" id="nav-btn-bookmarks" class="nav-item ${initialTab === 'bookmarks' ? 'active' : ''}" onclick="switchTab('bookmarks')">🔖 Bookmarks (${bookmarks.length})</button>
    <button type="button" id="nav-btn-history" class="nav-item ${initialTab === 'history' ? 'active' : ''}" onclick="switchTab('history')">🎧 Audio Sessions (${history.length})</button>
    <button type="button" id="nav-btn-notes" class="nav-item ${initialTab === 'notes' ? 'active' : ''}" onclick="switchTab('notes')">📝 Research Notes (${notes.length})</button>
    
    <div class="nav-label">Advocate & System</div>
    <button type="button" id="nav-btn-profile" class="nav-item ${initialTab === 'profile' ? 'active' : ''}" onclick="switchTab('profile')">👤 Advocate Record</button>
    <button type="button" id="nav-btn-settings" class="nav-item ${initialTab === 'settings' ? 'active' : ''}" onclick="switchTab('settings')">⚙️ Engine Settings</button>
    <button type="button" id="nav-btn-dashboard" class="nav-item ${initialTab === 'dashboard' ? 'active' : ''}" onclick="switchTab('dashboard')">📊 System Overview</button>

    <div class="sidebar-db-status">
      <div style="font-weight: 700; color: #fff; margin-bottom: 4px;">🟢 Database: SQLite WAL</div>
      <div style="font-size: 10px; color: #94a3b8; word-break: break-all;">backend/data/lawvox.db</div>
      <div style="font-size: 10px; color: #c084fc; margin-top: 6px;">Port 5000 • Production Live</div>
    </div>
  </aside>

  <!-- Main Work Area -->
  <main class="main-content">
    <div class="top-header">
      <div class="page-title">
        <h1 id="viewHeaderTitle">LAWVOX Backend & Database Control Center</h1>
        <p id="viewHeaderSub">Click any sidebar tab, table row, or API endpoint to inspect full live data</p>
      </div>
      <div class="status-pill">
        <span class="status-dot"></span>
        SQLite Backend Active (:5000)
      </div>
    </div>

    <!-- 1. DATABASE TABLES TAB -->
    <div id="tab-database" class="tab-section ${initialTab === 'database' ? 'active-section' : ''}">
      <!-- Quick Database Stats Grid (All Clickable) -->
      <div class="grid-4">
        <div class="stat-card" onclick="switchTab('cases')">
          <div class="stat-icon-wrap" style="background: #faf5ff; color: #7e22ce;">📚</div>
          <div>
            <div class="stat-num">${cases.length}</div>
            <div class="stat-text">Cases in lawvox.db</div>
          </div>
        </div>
        <div class="stat-card" onclick="switchTab('bookmarks')">
          <div class="stat-icon-wrap" style="background: #eff6ff; color: #2563eb;">🔖</div>
          <div>
            <div class="stat-num">${bookmarks.length}</div>
            <div class="stat-text">Active Bookmarks</div>
          </div>
        </div>
        <div class="stat-card" onclick="switchTab('history')">
          <div class="stat-icon-wrap" style="background: #fffbeb; color: #d97706;">🎧</div>
          <div>
            <div class="stat-num">${history.length}</div>
            <div class="stat-text">Audio Sessions Logged</div>
          </div>
        </div>
        <div class="stat-card" onclick="switchTab('notes')">
          <div class="stat-icon-wrap" style="background: #ecfdf5; color: #059669;">📝</div>
          <div>
            <div class="stat-num">${notes.length}</div>
            <div class="stat-text">Research Notes in DB</div>
          </div>
        </div>
      </div>

      <!-- Live Database Tables Explorer -->
      <div class="card">
        <div class="card-header">
          <span class="card-title">🗄️ Live SQLite Database Table: <code>cases</code></span>
          <div style="display: flex; gap: 8px;">
            <button class="btn btn-primary" onclick="fetchApi('/api/cases')">Inspect JSON (/api/cases)</button>
            <button class="btn btn-secondary" onclick="copySimpleText('http://localhost:5000/api/cases')">📋 Copy API URL</button>
          </div>
        </div>
        <p style="font-size: 12px; color: #64748b; margin-bottom: 12px;">👉 <strong>Tip:</strong> Click on any row below to open the complete case record, legal issues, ratio decidendi, and full SQLite JSON.</p>
        
        <div class="db-table-wrap">
          <table class="db-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Case Name</th>
                <th>Citation</th>
                <th>Year</th>
                <th>Bench Composition</th>
                <th>Category / Doctrine</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              ${cases.map((c) => `
                <tr onclick="openCaseModal('${c.id}')">
                  <td><code style="background: #f1f5f9; padding: 2px 6px; border-radius: 4px; font-weight: 700; color: #7e22ce;">${c.id}</code></td>
                  <td><strong>${c.case_name}</strong></td>
                  <td style="color: #64748b; font-size: 12px;">${c.citation || 'N/A'}</td>
                  <td><span class="case-badge">${c.year}</span></td>
                  <td style="font-size: 12px; color: #334155;">${c.bench_size || 'Constitutional Bench'}</td>
                  <td style="color: #7e22ce; font-weight: 600; font-size: 12px;">${c.doctrine || c.category}</td>
                  <td>
                    <button class="btn btn-outline-purple" style="font-size: 11px; padding: 4px 8px;" onclick="event.stopPropagation(); openCaseModal('${c.id}')">🔍 Inspect Record</button>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>

      <!-- Bookmarks & Notes SQLite Summary -->
      <div class="grid-2">
        <div class="card">
          <div class="card-header">
            <span class="card-title">🔖 Table: <code>bookmarks</code> (${bookmarks.length} records)</span>
            <button class="btn btn-secondary" onclick="switchTab('bookmarks')" style="font-size: 11px;">View All →</button>
          </div>
          <div style="display: flex; flex-direction: column; gap: 8px;">
            ${bookmarks.map((b) => `
              <div style="padding: 10px; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; cursor: pointer; display: flex; justify-content: space-between; align-items: center;" onclick="openCaseModal('${b.case_id}')">
                <div>
                  <div style="font-weight: 700; font-size: 13px; color: #0f172a;">${b.case_name}</div>
                  <div style="font-size: 11px; color: #64748b;">${b.category} • Year ${b.year}</div>
                </div>
                <span class="btn btn-outline-purple" style="font-size: 10px; padding: 2px 8px;">Click to View</span>
              </div>
            `).join('')}
          </div>
        </div>

        <div class="card">
          <div class="card-header">
            <span class="card-title">📝 Table: <code>notes</code> (${notes.length} records)</span>
            <button class="btn btn-secondary" onclick="switchTab('notes')" style="font-size: 11px;">View All →</button>
          </div>
          <div style="display: flex; flex-direction: column; gap: 8px;">
            ${notes.map((n) => `
              <div style="padding: 10px; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; cursor: pointer;" onclick="openNoteDetails('${n.id}')">
                <div style="font-weight: 700; font-size: 13px; color: #0f172a; margin-bottom: 2px;">${n.title}</div>
                <div style="font-size: 11px; color: #7e22ce; font-weight: 600;">⚖️ ${n.case_name || n.case_id}</div>
                <div style="font-size: 11px; color: #64748b; margin-top: 4px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${n.content}</div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    </div>

    <!-- 2. REST API CONSOLE TAB -->
    <div id="tab-api-console" class="tab-section ${initialTab === 'api-console' ? 'active-section' : ''}">
      <div class="card">
        <div class="card-header">
          <span class="card-title">⚡ Interactive REST API Console & Test Suite</span>
          <span style="font-size: 12px; color: #64748b;">Click any endpoint to execute and inspect live JSON</span>
        </div>

        <p style="font-size: 13px; color: #475569; margin-bottom: 16px;">
          Click any endpoint button below to trigger real-time HTTP requests to the backend service:
        </p>

        <div class="api-grid">
          <div class="api-card" onclick="fetchApi('/api/health')">
            <div><span class="method-get">GET</span><span class="endpoint-path">/api/health</span></div>
            <span style="font-size: 11px; color: #7e22ce; font-weight: 700;">Click to Run →</span>
          </div>
          <div class="api-card" onclick="fetchApi('/api/cases')">
            <div><span class="method-get">GET</span><span class="endpoint-path">/api/cases</span></div>
            <span style="font-size: 11px; color: #7e22ce; font-weight: 700;">Click to Run →</span>
          </div>
          <div class="api-card" onclick="fetchApi('/api/cases/kesavananda-bharati')">
            <div><span class="method-get">GET</span><span class="endpoint-path">/api/cases/kesavananda-bharati</span></div>
            <span style="font-size: 11px; color: #7e22ce; font-weight: 700;">Click to Run →</span>
          </div>
          <div class="api-card" onclick="fetchApi('/api/dashboard')">
            <div><span class="method-get">GET</span><span class="endpoint-path">/api/dashboard</span></div>
            <span style="font-size: 11px; color: #7e22ce; font-weight: 700;">Click to Run →</span>
          </div>
          <div class="api-card" onclick="fetchApi('/api/search?q=privacy')">
            <div><span class="method-get">GET</span><span class="endpoint-path">/api/search?q=privacy</span></div>
            <span style="font-size: 11px; color: #7e22ce; font-weight: 700;">Click to Run →</span>
          </div>
          <div class="api-card" onclick="fetchApi('/api/bookmarks')">
            <div><span class="method-get">GET</span><span class="endpoint-path">/api/bookmarks</span></div>
            <span style="font-size: 11px; color: #7e22ce; font-weight: 700;">Click to Run →</span>
          </div>
          <div class="api-card" onclick="fetchApi('/api/history')">
            <div><span class="method-get">GET</span><span class="endpoint-path">/api/history</span></div>
            <span style="font-size: 11px; color: #7e22ce; font-weight: 700;">Click to Run →</span>
          </div>
          <div class="api-card" onclick="fetchApi('/api/notes')">
            <div><span class="method-get">GET</span><span class="endpoint-path">/api/notes</span></div>
            <span style="font-size: 11px; color: #7e22ce; font-weight: 700;">Click to Run →</span>
          </div>
          <div class="api-card" onclick="fetchApi('/api/profile')">
            <div><span class="method-get">GET</span><span class="endpoint-path">/api/profile</span></div>
            <span style="font-size: 11px; color: #7e22ce; font-weight: 700;">Click to Run →</span>
          </div>
          <div class="api-card" onclick="fetchApi('/api/settings')">
            <div><span class="method-get">GET</span><span class="endpoint-path">/api/settings</span></div>
            <span style="font-size: 11px; color: #7e22ce; font-weight: 700;">Click to Run →</span>
          </div>
          <div class="api-card" onclick="fetchApi('/api/searches')">
            <div><span class="method-get">GET</span><span class="endpoint-path">/api/searches</span></div>
            <span style="font-size: 11px; color: #7e22ce; font-weight: 700;">Click to Run →</span>
          </div>
        </div>

        <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 16px; margin-bottom: 8px;">
          <span style="font-weight: 700; font-size: 13px; color: #0f172a;">Live API Response Payload:</span>
          <button id="copyApiJsonBtn" class="btn btn-secondary" style="display: none; font-size: 11px;" onclick="copyApiOutput()">📋 Copy Response JSON</button>
        </div>
        <pre id="apiOutputBox"></pre>
      </div>
    </div>

    <!-- 3. PRECEDENT CASES TAB -->
    <div id="tab-cases" class="tab-section ${initialTab === 'cases' ? 'active-section' : ''}">
      <div class="card">
        <div class="card-header">
          <span class="card-title">📚 Constitutional Precedents Corpus (${cases.length} Rulings)</span>
          <span style="font-size: 12px; color: #64748b;">Click on any case card for complete details</span>
        </div>
        
        <div class="filter-pills">
          <span class="filter-pill active" onclick="filterByDoctrine('All', this)">All Precedents</span>
          <span class="filter-pill" onclick="filterByDoctrine('Basic Structure', this)">Basic Structure</span>
          <span class="filter-pill" onclick="filterByDoctrine('Golden Triangle', this)">Golden Triangle</span>
          <span class="filter-pill" onclick="filterByDoctrine('Privacy', this)">Right to Privacy</span>
          <span class="filter-pill" onclick="filterByDoctrine('Freedom', this)">Freedom of Speech</span>
          <span class="filter-pill" onclick="filterByDoctrine('Equality', this)">Equality</span>
          <span class="filter-pill" onclick="filterByDoctrine('Livelihood', this)">Right to Livelihood</span>
        </div>

        <div style="margin-bottom: 20px;">
          <input type="text" id="caseQueryInput" class="search-input" placeholder="🔍 Type to search any case, judge, provision, article (e.g. Article 21, Kesavananda, Privacy)..." onkeyup="filterCasesLive()">
        </div>

        <div class="cases-grid" id="casesContainer">
          ${cases.map((c) => `
            <div class="case-card" data-doctrine="${c.doctrine || ''}" data-category="${c.category || ''}" onclick="openCaseModal('${c.id}')">
              <div>
                <span class="case-badge">${c.category} • ${c.year}</span>
                <h3 style="font-size: 15px; font-weight: 800; color: #0f172a; margin-bottom: 4px;">${c.case_name}</h3>
                <div style="font-size: 11px; color: #64748b; margin-bottom: 8px;">${c.court} • ${c.citation || ''}</div>
                <p style="font-size: 12px; color: #475569; line-height: 1.5; margin-bottom: 12px;">${c.summary || ''}</p>
                <div style="font-size: 11px; color: #7e22ce; font-weight: 700; margin-bottom: 12px;">⚖️ ${c.doctrine || 'Constitutional Precedent'}</div>
              </div>
              <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid #f1f5f9; padding-top: 12px;">
                <span style="font-size: 11px; color: #94a3b8;">${c.bench_size || ''}</span>
                <button type="button" class="btn btn-primary" style="font-size: 11px; padding: 6px 12px;" onclick="event.stopPropagation(); openCaseModal('${c.id}')">View Details →</button>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </div>

    <!-- 4. BOOKMARKS TAB -->
    <div id="tab-bookmarks" class="tab-section ${initialTab === 'bookmarks' ? 'active-section' : ''}">
      <div class="card">
        <div class="card-header">
          <span class="card-title">🔖 Saved Bookmarks in Database (${bookmarks.length})</span>
          <button class="btn btn-secondary" onclick="fetchApi('/api/bookmarks')">Inspect /api/bookmarks</button>
        </div>
        <p style="font-size: 12px; color: #64748b; margin-bottom: 16px;">Click on any saved bookmark to open its constitutional record:</p>
        <div class="cases-grid">
          ${bookmarks.map((b) => `
            <div class="case-card" onclick="openCaseModal('${b.case_id}')">
              <div>
                <span class="case-badge">${b.category} • ${b.year}</span>
                <h3 style="font-size: 15px; font-weight: 800; color: #0f172a; margin-bottom: 4px;">${b.case_name}</h3>
                <div style="font-size: 11px; color: #64748b; margin-bottom: 8px;">${b.court} • ${b.citation || ''}</div>
                <p style="font-size: 12px; color: #475569; margin-bottom: 12px;">${b.summary || ''}</p>
              </div>
              <div style="display: flex; justify-content: flex-end;">
                <button type="button" class="btn btn-primary" style="font-size: 11px;" onclick="event.stopPropagation(); openCaseModal('${b.case_id}')">Inspect Case Record</button>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </div>

    <!-- 5. AUDIO HISTORY TAB -->
    <div id="tab-history" class="tab-section ${initialTab === 'history' ? 'active-section' : ''}">
      <div class="card">
        <div class="card-header">
          <span class="card-title">🎧 Audio Listening Sessions (${history.length})</span>
          <button class="btn btn-secondary" onclick="fetchApi('/api/history')">Inspect /api/history</button>
        </div>
        <p style="font-size: 12px; color: #64748b; margin-bottom: 16px;">Click on any session to inspect playback position in database:</p>
        <div style="display: flex; flex-direction: column; gap: 12px;">
          ${history.map((h) => `
            <div style="background: #f8fafc; border: 1px solid var(--border); border-radius: 12px; padding: 16px; display: flex; justify-content: space-between; align-items: center; gap: 16px; cursor: pointer;" onclick="openCaseModal('${h.case_id}')">
              <div>
                <span class="case-badge">${h.category}</span>
                <h4 style="font-size: 14px; font-weight: 700; color: #0f172a;">${h.case_name}</h4>
                <div style="font-size: 11px; color: #64748b; margin-top: 4px;">${h.court} • Position: <strong>${h.last_position}s</strong> of ${h.duration_listened}s</div>
              </div>
              <div style="text-align: right; min-width: 140px;">
                <span style="font-size: 12px; font-weight: 800; color: #7e22ce;">${h.completion_percentage}% Completed</span>
                <div style="height: 6px; background: #e2e8f0; border-radius: 10px; margin-top: 6px; overflow: hidden;">
                  <div style="height: 100%; width: ${h.completion_percentage}%; background: #7e22ce; border-radius: 10px;"></div>
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </div>

    <!-- 6. RESEARCH NOTES TAB -->
    <div id="tab-notes" class="tab-section ${initialTab === 'notes' ? 'active-section' : ''}">
      <div class="card">
        <div class="card-header">
          <span class="card-title">📝 Research Notes in SQLite Database (${notes.length})</span>
          <button type="button" class="btn btn-primary" onclick="toggleNoteForm()">+ Add Note to DB</button>
        </div>

        <div id="newNoteFormBox" style="display: none; background: #faf5ff; border: 1px solid #e9d5ff; border-radius: 12px; padding: 18px; margin-bottom: 20px;">
          <h4 style="font-size: 14px; font-weight: 800; color: #581c87; margin-bottom: 10px;">Create Note in SQLite (lawvox.db)</h4>
          <input type="text" id="noteTitleInput" class="search-input" placeholder="Note Title (e.g. Ratio on Article 21 Privacy)" style="margin-bottom: 10px;">
          <select id="noteCaseSelect" class="search-input" style="margin-bottom: 10px;">
            ${cases.map((c) => `<option value="${c.id}">${c.case_name}</option>`).join('')}
          </select>
          <textarea id="noteContentInput" class="search-input" rows="3" placeholder="Write research findings, citation arguments, ratio decidendi..." style="margin-bottom: 10px;"></textarea>
          <div style="display: flex; gap: 8px;">
            <button type="button" class="btn btn-primary" onclick="saveNewNote()">Save Note (POST /api/notes)</button>
            <button type="button" class="btn btn-secondary" onclick="toggleNoteForm()">Cancel</button>
          </div>
        </div>

        <div class="cases-grid">
          ${notes.map((n) => `
            <div class="case-card" onclick="openNoteDetails('${n.id}')">
              <div>
                <h3 style="font-size: 15px; font-weight: 800; color: #0f172a; margin-bottom: 4px;">${n.title}</h3>
                <div style="font-size: 11px; color: #7e22ce; font-weight: 700; margin-bottom: 8px;">⚖️ ${n.case_name || n.case_id}</div>
                <p style="font-size: 12px; color: #475569; line-height: 1.5;">${n.content}</p>
              </div>
              <div style="font-size: 10px; color: #94a3b8; border-top: 1px solid #f1f5f9; padding-top: 8px; margin-top: 12px; display: flex; justify-content: space-between; align-items: center;">
                <span>Record #${n.id} • SQLite</span>
                <span class="btn btn-outline-purple" style="font-size: 10px; padding: 2px 8px;">Click to Inspect</span>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </div>

    <!-- 7. ADVOCATE PROFILE TAB -->
    <div id="tab-profile" class="tab-section ${initialTab === 'profile' ? 'active-section' : ''}">
      <div class="card">
        <div class="card-header">
          <span class="card-title">👤 Advocate Profile Record</span>
          <button class="btn btn-secondary" onclick="fetchApi('/api/profile')">Inspect /api/profile</button>
        </div>
        <div style="display: flex; align-items: center; gap: 16px; margin-bottom: 20px;">
          <div style="width: 60px; height: 60px; border-radius: 14px; background: #7e22ce; color: #fff; font-weight: 800; font-size: 22px; display: flex; align-items: center; justify-content: center;">AS</div>
          <div>
            <h2 style="font-size: 18px; font-weight: 800; color: #0f172a;">${profile.name}</h2>
            <div style="font-size: 13px; color: #64748b;">${profile.profession} • ${profile.institution}</div>
          </div>
        </div>
        <div style="display: flex; flex-direction: column; gap: 12px; font-size: 13px;">
          <div style="display: flex; justify-content: space-between; border-bottom: 1px solid #f1f5f9; padding-bottom: 8px;">
            <span style="color: #64748b;">Chamber Email</span>
            <span style="font-weight: 700; color: #0f172a;">${profile.email}</span>
          </div>
          <div style="display: flex; justify-content: space-between; border-bottom: 1px solid #f1f5f9; padding-bottom: 8px;">
            <span style="color: #64748b;">Bar Registration</span>
            <span style="font-weight: 700; color: #0f172a;">D/1482/2019</span>
          </div>
          <div style="display: flex; justify-content: space-between;">
            <span style="color: #64748b;">Research Domains</span>
            <span style="font-weight: 700; color: #7e22ce; text-align: right; max-width: 60%;">${profile.research_interests}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- 8. SETTINGS TAB -->
    <div id="tab-settings" class="tab-section ${initialTab === 'settings' ? 'active-section' : ''}">
      <div class="card">
        <div class="card-header">
          <span class="card-title">⚙️ Backend Engine Preferences</span>
          <button class="btn btn-secondary" onclick="fetchApi('/api/settings')">Inspect /api/settings</button>
        </div>
        <div style="display: flex; flex-direction: column; gap: 16px; font-size: 13px;">
          <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #f1f5f9; padding-bottom: 12px;">
            <div>
              <strong>Playback Speed</strong>
              <div style="font-size: 11px; color: #64748b;">Default audio rate for precedent narration</div>
            </div>
            <span style="font-weight: 800; color: #7e22ce;">${settings.playback_speed}x</span>
          </div>
          <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #f1f5f9; padding-bottom: 12px;">
            <div>
              <strong>Autoplay Next Chapter</strong>
              <div style="font-size: 11px; color: #64748b;">Continuous ratio decidendi streaming</div>
            </div>
            <span style="color: #059669; font-weight: 700;">${settings.autoplay_enabled ? 'Enabled' : 'Disabled'}</span>
          </div>
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <div>
              <strong>Language</strong>
              <div style="font-size: 11px; color: #64748b;">Narration language</div>
            </div>
            <span style="font-weight: 700;">${settings.language}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- 9. DASHBOARD SUMMARY TAB -->
    <div id="tab-dashboard" class="tab-section ${initialTab === 'dashboard' ? 'active-section' : ''}">
      <div class="card">
        <div class="card-header">
          <span class="card-title">📊 Precedent Platform Statistics</span>
          <button class="btn btn-primary" onclick="fetchApi('/api/dashboard')">Inspect /api/dashboard</button>
        </div>
        <div class="grid-4">
          <div class="stat-card" onclick="switchTab('cases')">
            <div class="stat-icon-wrap" style="background: #faf5ff; color: #7e22ce;">⚖️</div>
            <div>
              <div class="stat-num">${cases.length}</div>
              <div class="stat-text">Active Cases</div>
            </div>
          </div>
          <div class="stat-card" onclick="switchTab('bookmarks')">
            <div class="stat-icon-wrap" style="background: #eff6ff; color: #2563eb;">🔖</div>
            <div>
              <div class="stat-num">${bookmarks.length}</div>
              <div class="stat-text">Bookmarks</div>
            </div>
          </div>
          <div class="stat-card" onclick="switchTab('history')">
            <div class="stat-icon-wrap" style="background: #fffbeb; color: #d97706;">🎧</div>
            <div>
              <div class="stat-num">${history.length}</div>
              <div class="stat-text">Audio Sessions</div>
            </div>
          </div>
          <div class="stat-card" onclick="switchTab('notes')">
            <div class="stat-icon-wrap" style="background: #ecfdf5; color: #059669;">📝</div>
            <div>
              <div class="stat-num">${notes.length}</div>
              <div class="stat-text">Research Notes</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>

  <!-- Interactive Detail Modal (Click Any Case/Note/Record) -->
  <div class="modal-overlay" id="caseModalOverlay" onclick="closeCaseModal(event)">
    <div class="modal-content" onclick="event.stopPropagation()">
      <button class="modal-close" onclick="closeCaseModal()">&times;</button>
      <div id="caseModalBody"></div>
    </div>
  </div>

  <!-- Toast for Copy Alerts -->
  <div id="toast" class="toast">Copied to clipboard!</div>

  <script>
    const CASES_DATA = ${casesJsonString};
    const NOTES_DATA = ${notesJsonString};

    const TITLES = {
      'database': 'SQLite Database Tables Inspector',
      'api-console': 'Interactive REST API Console',
      'cases': 'Constitutional Precedents Database',
      'bookmarks': 'Saved Bookmarks in Database',
      'history': 'Audio Listening History Logs',
      'notes': 'Case Annotations & Notes in SQLite',
      'profile': 'Advocate Profile & Chamber Credentials',
      'settings': 'Backend Engine Configuration',
      'dashboard': 'System Architecture Overview',
    };

    window.switchTab = function(tabId) {
      // Hide all sections
      const sections = document.querySelectorAll('.tab-section');
      for (let i = 0; i < sections.length; i++) {
        sections[i].classList.remove('active-section');
      }

      // Deactivate all nav buttons
      const navButtons = document.querySelectorAll('.nav-item');
      for (let i = 0; i < navButtons.length; i++) {
        navButtons[i].classList.remove('active');
      }

      // Activate chosen section
      const target = document.getElementById('tab-' + tabId);
      if (target) {
        target.classList.add('active-section');
      }

      // Activate chosen nav button
      const targetBtn = document.getElementById('nav-btn-' + tabId);
      if (targetBtn) {
        targetBtn.classList.add('active');
      }

      // Update header text
      const hTitle = document.getElementById('viewHeaderTitle');
      if (hTitle && TITLES[tabId]) {
        hTitle.textContent = TITLES[tabId];
      }

      // Push history state so deep-linking works smoothly
      try {
        const newPath = tabId === 'database' ? '/' : '/' + tabId;
        window.history.pushState({ tab: tabId }, '', newPath);
      } catch (e) {}

      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    window.openCaseModal = function(caseId) {
      const c = CASES_DATA.find(function(x) { return x.id === caseId; });
      if (!c) return;

      const body = document.getElementById('caseModalBody');
      body.innerHTML = 
        '<div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">' +
          '<span class="case-badge" style="font-size: 12px; margin-bottom: 0;">' + (c.category || '') + ' • ' + (c.year || '') + '</span>' +
          '<span style="font-size: 11px; color: #7e22ce; font-weight: 700;">SQLite ID: ' + c.id + '</span>' +
        '</div>' +
        '<h2 style="font-size: 22px; font-weight: 800; color: #0f172a; margin-bottom: 6px;">' + (c.case_name || '') + '</h2>' +
        '<div style="font-size: 13px; color: #64748b; margin-bottom: 16px;">' + (c.court || '') + ' • ' + (c.citation || 'N/A') + '</div>' +

        '<div style="background: #faf5ff; border: 1px solid #e9d5ff; border-radius: 12px; padding: 14px; margin-bottom: 16px;">' +
          '<div style="font-size: 11px; font-weight: 800; color: #7e22ce; text-transform: uppercase; margin-bottom: 4px;">Coram / Bench Composition</div>' +
          '<div style="font-size: 13px; color: #0f172a; font-weight: 700;">' + (c.bench_size || 'Constitutional Bench') + '</div>' +
          '<div style="font-size: 12px; color: #475569; margin-top: 4px;">' + (c.judge || 'Supreme Court of India') + '</div>' +
        '</div>' +

        '<div style="margin-bottom: 14px;">' +
          '<h4 style="font-size: 11px; font-weight: 800; text-transform: uppercase; color: #64748b; margin-bottom: 4px;">Constitutional Provisions</h4>' +
          '<div style="font-size: 13px; color: #1e293b; font-weight: 600; background: #f8fafc; padding: 8px 12px; border-radius: 8px; border: 1px solid #e2e8f0;">' + (c.constitutional_provisions || 'Part III of Constitution') + '</div>' +
        '</div>' +

        '<div style="margin-bottom: 14px;">' +
          '<h4 style="font-size: 11px; font-weight: 800; text-transform: uppercase; color: #64748b; margin-bottom: 4px;">Legal Issue / Question</h4>' +
          '<p style="font-size: 13px; color: #334155; line-height: 1.5; background: #f8fafc; padding: 10px 12px; border-radius: 8px; border: 1px solid #e2e8f0;">' + (c.legal_issue || c.summary || '') + '</p>' +
        '</div>' +

        '<div style="margin-bottom: 16px;">' +
          '<h4 style="font-size: 11px; font-weight: 800; text-transform: uppercase; color: #64748b; margin-bottom: 4px;">Ratio Decidendi / Decision</h4>' +
          '<p style="font-size: 13px; color: #334155; line-height: 1.5; background: #f8fafc; padding: 10px 12px; border-radius: 8px; border: 1px solid #e2e8f0;">' + (c.decision || c.summary || '') + '</p>' +
        '</div>' +

        '<div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid #f1f5f9; padding-top: 16px; flex-wrap: wrap; gap: 8px;">' +
          '<button type="button" class="btn btn-secondary" onclick="copyCaseJson(\\'' + c.id + '\\')">📋 Copy Case JSON</button>' +
          '<a class="btn btn-primary" href="/api/cases/' + c.id + '" target="_blank" style="text-decoration: none;">Open Raw API Endpoint ↗</a>' +
        '</div>';

      document.getElementById('caseModalOverlay').classList.add('modal-open');
    };

    window.openNoteDetails = function(noteId) {
      const n = NOTES_DATA.find(function(x) { return String(x.id) === String(noteId); });
      if (!n) return;

      const body = document.getElementById('caseModalBody');
      body.innerHTML = 
        '<span class="case-badge" style="font-size: 12px; margin-bottom: 10px;">SQLite Note Record #' + n.id + '</span>' +
        '<h2 style="font-size: 20px; font-weight: 800; color: #0f172a; margin-bottom: 6px;">' + (n.title || '') + '</h2>' +
        '<div style="font-size: 13px; color: #7e22ce; font-weight: 700; margin-bottom: 16px;">⚖️ Case: ' + (n.case_name || n.case_id) + '</div>' +

        '<div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 16px; margin-bottom: 16px;">' +
          '<h4 style="font-size: 11px; font-weight: 800; text-transform: uppercase; color: #64748b; margin-bottom: 8px;">Note Content</h4>' +
          '<p style="font-size: 13px; color: #334155; line-height: 1.6; white-space: pre-wrap;">' + (n.content || '') + '</p>' +
        '</div>' +

        '<div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid #f1f5f9; padding-top: 14px;">' +
          '<span style="font-size: 11px; color: #94a3b8;">Created: ' + (n.created_at || 'Recently') + '</span>' +
          '<button type="button" class="btn btn-secondary" onclick="copyNoteContent(\\'' + n.id + '\\')">📋 Copy Note Text</button>' +
        '</div>';

      document.getElementById('caseModalOverlay').classList.add('modal-open');
    };

    window.closeCaseModal = function(event) {
      if (event && event.target !== event.currentTarget) return;
      document.getElementById('caseModalOverlay').classList.remove('modal-open');
    };

    window.toggleNoteForm = function() {
      const box = document.getElementById('newNoteFormBox');
      box.style.display = box.style.display === 'none' ? 'block' : 'none';
    };

    window.saveNewNote = async function() {
      const title = document.getElementById('noteTitleInput').value.trim();
      const case_id = document.getElementById('noteCaseSelect').value;
      const content = document.getElementById('noteContentInput').value.trim();
      if (!title || !content) {
        showToast('Please fill in both title and content');
        return;
      }
      try {
        const res = await fetch('/api/notes', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ title: title, case_id: case_id, content: content })
        });
        const data = await res.json();
        if (data.success) {
          showToast('Note inserted into SQLite database!');
          setTimeout(function() { window.location.reload(); }, 800);
        }
      } catch (err) {
        showToast('Error saving note: ' + err.message);
      }
    };

    let lastApiJson = '';
    window.fetchApi = async function(url) {
      const box = document.getElementById('apiOutputBox');
      const copyBtn = document.getElementById('copyApiJsonBtn');
      switchTab('api-console');
      box.style.display = 'block';
      box.textContent = '⏳ Executing GET ' + url + ' ...';
      try {
        const res = await fetch(url);
        const data = await res.json();
        lastApiJson = JSON.stringify(data, null, 2);
        box.textContent = '// HTTP ' + res.status + ' ' + res.statusText + ' (' + url + ')\\n\\n' + lastApiJson;
        if (copyBtn) copyBtn.style.display = 'inline-flex';
      } catch (err) {
        box.textContent = 'Error: ' + err.message;
      }
    };

    window.copyApiOutput = function() {
      if (lastApiJson) {
        copySimpleText(lastApiJson);
      }
    };

    window.copyCaseJson = function(caseId) {
      const c = CASES_DATA.find(function(x) { return x.id === caseId; });
      if (c) {
        copySimpleText(JSON.stringify(c, null, 2));
      }
    };

    window.copyNoteContent = function(noteId) {
      const n = NOTES_DATA.find(function(x) { return String(x.id) === String(noteId); });
      if (n && n.content) {
        copySimpleText(n.content);
      }
    };

    window.filterCasesLive = function() {
      const q = document.getElementById('caseQueryInput').value.toLowerCase().trim();
      const cards = document.querySelectorAll('#casesContainer .case-card');
      for (let i = 0; i < cards.length; i++) {
        const text = cards[i].textContent.toLowerCase();
        cards[i].style.display = text.indexOf(q) !== -1 ? 'flex' : 'none';
      }
    };

    window.filterByDoctrine = function(doctrine, pill) {
      const pills = document.querySelectorAll('.filter-pill');
      for (let i = 0; i < pills.length; i++) {
        pills[i].classList.remove('active');
      }
      if (pill) pill.classList.add('active');

      const cards = document.querySelectorAll('#casesContainer .case-card');
      for (let i = 0; i < cards.length; i++) {
        if (doctrine === 'All') {
          cards[i].style.display = 'flex';
        } else {
          const doc = (cards[i].getAttribute('data-doctrine') || '').toLowerCase();
          const cat = (cards[i].getAttribute('data-category') || '').toLowerCase();
          const matches = doc.indexOf(doctrine.toLowerCase()) !== -1 || cat.indexOf(doctrine.toLowerCase()) !== -1;
          cards[i].style.display = matches ? 'flex' : 'none';
        }
      }
    };

    window.copySimpleText = function(text) {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(function() {
          showToast('Copied to clipboard!');
        }).catch(function() {
          showToast('Copied!');
        });
      } else {
        const ta = document.createElement('textarea');
        ta.value = text;
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
        showToast('Copied to clipboard!');
      }
    };

    window.showToast = function(msg) {
      const toast = document.getElementById('toast');
      if (toast) {
        toast.textContent = msg;
        toast.style.display = 'block';
        setTimeout(function() { toast.style.display = 'none'; }, 2500);
      }
    };

    // Listen to browser back/forward buttons
    window.addEventListener('popstate', function(e) {
      if (e.state && e.state.tab) {
        switchTab(e.state.tab);
      }
    });
  </script>
</body>
</html>`;

    res.setHeader('Content-Type', 'text/html');
    res.status(200).send(html);
  };

  // Mount Backend Inspector Portal at root and all direct route paths
  app.get('/', renderPortal);
  app.get('/database', renderPortal);
  app.get('/dashboard', renderPortal);
  app.get('/search', renderPortal);
  app.get('/cases', renderPortal);
  app.get('/library', renderPortal);
  app.get('/bookmarks', renderPortal);
  app.get('/history', renderPortal);
  app.get('/notes', renderPortal);
  app.get('/profile', renderPortal);
  app.get('/settings', renderPortal);
  app.get('/api-console', renderPortal);

  // Mount API base router at /api
  app.use('/api', apiRouter);

  // 404 handler
  app.use(notFoundMiddleware);

  // Centralized Error handler
  app.use(errorMiddleware);

  return app;
}
