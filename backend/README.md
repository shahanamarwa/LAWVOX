# LAWVOX Backend

REST API Backend for **LAWVOX** — Constitutional Precedent Research and Legal Audio Platform.

## 🚀 Tech Stack

- **Runtime:** Node.js (v18+)
- **Framework:** Express.js
- **Language:** TypeScript
- **Database:** SQLite via `better-sqlite3`
- **Location:** `backend/data/lawvox.db`
- **Architecture:** Layered Architecture (Routes → Controllers → Services → SQLite Database)

---

## 📁 Project Structure

```
backend/
│
├── src/
│   ├── server.ts                 # Server entrypoint and graceful shutdown
│   ├── app.ts                    # Express app setup and middleware pipeline
│   │
│   ├── config/
│   │   └── database.ts           # SQLite connection & schema initialization
│   │
│   ├── database/
│   │   ├── schema.sql            # SQLite schema (tables, foreign keys, indexes)
│   │   └── seed.ts               # Landmark constitutional case dataset seeder
│   │
│   ├── routes/                   # Express routers
│   │   ├── index.ts
│   │   ├── cases.routes.ts
│   │   ├── bookmarks.routes.ts
│   │   ├── history.routes.ts
│   │   ├── notes.routes.ts
│   │   ├── profile.routes.ts
│   │   ├── settings.routes.ts
│   │   ├── dashboard.routes.ts
│   │   └── searches.routes.ts
│   │
│   ├── controllers/              # Request parsing & response handlers
│   │   ├── cases.controller.ts
│   │   ├── bookmarks.controller.ts
│   │   ├── history.controller.ts
│   │   ├── notes.controller.ts
│   │   ├── profile.controller.ts
│   │   ├── settings.controller.ts
│   │   ├── dashboard.controller.ts
│   │   └── searches.controller.ts
│   │
│   ├── services/                 # Business logic & SQL queries
│   │   ├── cases.service.ts
│   │   ├── bookmarks.service.ts
│   │   ├── history.service.ts
│   │   ├── notes.service.ts
│   │   ├── profile.service.ts
│   │   ├── settings.service.ts
│   │   ├── dashboard.service.ts
│   │   └── searches.service.ts
│   │
│   ├── middleware/               # Centralized error and 404 middleware
│   │   ├── error.middleware.ts
│   │   └── notFound.middleware.ts
│   │
│   ├── types/                    # TypeScript interfaces & types
│   │   └── index.ts
│   │
│   └── utils/                    # Unified JSON response builder
│       └── response.ts
│
├── data/
│   └── lawvox.db                 # Local SQLite database file
│
├── .env                          # Environment variables
├── .env.example
├── .gitignore
├── package.json
├── tsconfig.json
└── README.md
```

---

## ⚙️ Environment Variables

Create `.env` in the `backend/` directory:

```env
PORT=5000
DATABASE_PATH=./data/lawvox.db
FRONTEND_URL=http://localhost:3000
NODE_ENV=development
```

---

## 🛠️ Installation & Setup

1. **Install Dependencies:**
   ```bash
   cd backend
   npm install
   ```

2. **Seed Database (Optional - auto-runs on startup):**
   ```bash
   npm run seed
   ```

3. **Start Development Server:**
   ```bash
   npm run dev
   ```

4. **Build Production Bundle:**
   ```bash
   npm run build
   ```

5. **Start Production Server:**
   ```bash
   npm start
   ```

---

## 📡 API Endpoints

### Base URL: `/api`

| Method | Endpoint | Description |
|---|---|---|
| **GET** | `/api/health` | Health check endpoint |
| **GET** | `/api/dashboard` | Aggregated dashboard stats & feed |
| **GET** | `/api/cases` | Get all cases (supports filters) |
| **GET** | `/api/cases/:id` | Get case by ID |
| **POST** | `/api/cases` | Create a new case |
| **PUT** | `/api/cases/:id` | Update an existing case |
| **DELETE** | `/api/cases/:id` | Delete a case |
| **GET** | `/api/cases/search?q=...` | Search cases across metadata & text |
| **GET** | `/api/search?q=keyword` | Global search endpoint |
| **GET** | `/api/bookmarks` | List all bookmarked cases |
| **GET** | `/api/bookmarks/:caseId` | Check if case is bookmarked |
| **POST** | `/api/bookmarks/:caseId` | Bookmark a case |
| **DELETE** | `/api/bookmarks/:caseId` | Remove bookmark |
| **GET** | `/api/history` | List listening history |
| **POST** | `/api/history` | Create / update listening progress |
| **PUT** | `/api/history/:id` | Update history entry |
| **DELETE** | `/api/history/:id` | Delete history entry |
| **GET** | `/api/notes` | Get notes (optionally `?case_id=...`) |
| **GET** | `/api/notes/:id` | Get note by ID |
| **POST** | `/api/notes` | Create a research note |
| **PUT** | `/api/notes/:id` | Update note |
| **DELETE** | `/api/notes/:id` | Delete note |
| **GET** | `/api/profile` | Get user profile |
| **PUT** | `/api/profile` | Update profile |
| **GET** | `/api/settings` | Get application settings |
| **PUT** | `/api/settings` | Update settings |
| **GET** | `/api/searches` | Get recent search queries |
| **POST** | `/api/searches` | Add search query to history |
| **DELETE** | `/api/searches/:id` | Delete search history item |

---

## 🏛️ Seeded Landmark Cases

1. **Kesavananda Bharati v. State of Kerala (1973)** — *Basic Structure Doctrine (Art 368)*
2. **Shreya Singhal v. Union of India (2015)** — *Free Speech & Overbreadth (Art 19(1)(a))*
3. **Indian Young Lawyers Association v. State of Kerala (2018)** — *Sabarimala Equality (Arts 14, 15, 25)*
4. **Olga Tellis v. Bombay Municipal Corporation (1985)** — *Right to Livelihood (Art 21)*
5. **Maneka Gandhi v. Union of India (1978)** — *Golden Triangle & Fair Procedure (Art 21)*
6. **Vishaka v. State of Rajasthan (1997)** — *Workplace Harassment Guidelines (Arts 14, 19, 21)*
7. **Justice K.S. Puttaswamy v. Union of India (2017)** — *Fundamental Right to Privacy (Art 21)*
8. **Golaknath v. State of Punjab (1967)** — *Parliamentary Amending Limits (Art 368)*
