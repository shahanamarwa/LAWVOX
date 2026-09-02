# LAWVOX API Documentation & Reference Guide

Complete technical REST API reference for **LAWVOX** — Constitutional Precedent Research and Legal Audio Intelligence Platform.

## 🌐 Server Base URL
```
http://localhost:5000/api
```

---

## 📑 Endpoints Overview

| Category | Method | Endpoint | Description |
|---|---|---|---|
| **Health** | `GET` | `/api/health` | Service health status |
| **Dashboard** | `GET` | `/api/dashboard` | Aggregated dashboard stats & feed |
| **Search** | `GET` | `/api/search` | Global multi-field precedent search |
| **Cases** | `GET` | `/api/cases` | List all constitutional cases with filters |
| | `GET` | `/api/cases/:id` | Get single case details |
| | `GET` | `/api/cases/search` | Case-specific search |
| | `POST` | `/api/cases` | Create new case record |
| | `PUT` | `/api/cases/:id` | Update case record |
| | `DELETE` | `/api/cases/:id` | Delete case record |
| **Bookmarks** | `GET` | `/api/bookmarks` | List all bookmarked cases |
| | `GET` | `/api/bookmarks/:caseId` | Check if specific case is bookmarked |
| | `POST` | `/api/bookmarks/:caseId` | Add case to bookmarks |
| | `DELETE` | `/api/bookmarks/:caseId` | Remove bookmark |
| **Listening History** | `GET` | `/api/history` | List listening progress & history |
| | `POST` | `/api/history` | Record / update listening session |
| | `PUT` | `/api/history/:id` | Update playback progress |
| | `DELETE` | `/api/history/:id` | Remove history item |
| **Notes** | `GET` | `/api/notes` | List research notes (optional `?case_id=...`) |
| | `GET` | `/api/notes/:id` | Get single note |
| | `POST` | `/api/notes` | Create research note |
| | `PUT` | `/api/notes/:id` | Update research note |
| | `DELETE` | `/api/notes/:id` | Delete research note |
| **Profile** | `GET` | `/api/profile` | Get current practitioner profile |
| | `PUT` | `/api/profile` | Update profile information |
| **Settings** | `GET` | `/api/settings` | Get playback & appearance settings |
| | `PUT` | `/api/settings` | Update settings |
| **Recent Searches** | `GET` | `/api/searches` | Get search query history |
| | `POST` | `/api/searches` | Record a search query |
| | `DELETE` | `/api/searches/:id` | Delete search query |

---

## 1. Health Check

### `GET /api/health`
- **Purpose:** Verifies backend server health and readiness.
- **Request Body:** None
- **Query Parameters:** None
- **Response (200 OK):**
```json
{
  "success": true,
  "message": "LAWVOX backend is running"
}
```

---

## 2. Dashboard API

### `GET /api/dashboard`
- **Purpose:** Provides unified data for the main LAWVOX dashboard, including greeting, dynamic SQLite-calculated metrics, continue listening case, bookmarks, categories, recommendations, and recent searches.
- **Request Body:** None
- **Query Parameters:** None
- **Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "welcome": {
      "userName": "Adv. Arvind Narain",
      "profession": "Constitutional Law Senior Advocate",
      "institution": "Supreme Court Bar Association",
      "greeting": "Good afternoon, Adv."
    },
    "statistics": {
      "totalListeningTimeSeconds": 2250,
      "totalListeningTimeFormatted": "37m",
      "casesListened": 4,
      "bookmarksCount": 2,
      "dailyAverageMinutes": 38
    },
    "continueListening": {
      "id": 1,
      "case_id": "kesavananda-bharati",
      "duration_listened": 525,
      "completion_percentage": 63,
      "last_position": 525,
      "case_name": "Kesavananda Bharati v. State of Kerala",
      "court": "Supreme Court of India",
      "year": 1973,
      "citation": "(1973) 4 SCC 225 | AIR 1973 SC 1461",
      "category": "Constitutional Amendments",
      "audio_url": "/audio/kesavananda-bharati.mp3"
    },
    "recentCases": [...],
    "bookmarks": [...],
    "categories": [
      {
        "category": "Fundamental Rights",
        "articleRange": "Articles 12–35",
        "description": "Core constitutional liberties, protection of life, personal liberty, and remedies.",
        "caseCount": 2
      }
    ],
    "recommendations": [...],
    "recentSearches": [...]
  }
}
```

---

## 3. Global Search & Precedents Search

### `GET /api/search`
- **Purpose:** Searches constitutional precedents across case title, court, citation, judges, constitutional provisions, summary, legal issue, decision, keywords, and doctrine.
- **Query Parameters:**
  - `q` *(string, optional)*: Search keyword (e.g. `privacy`, `article 21`, `basic structure`)
  - `court` *(string, optional)*: Filter by court name
  - `year` *(number, optional)*: Filter by judgment year
  - `category` *(string, optional)*: Filter by constitutional category
  - `judge` *(string, optional)*: Filter by judge name
  - `doctrine` *(string, optional)*: Filter by legal doctrine
- **Response (200 OK):**
```json
{
  "success": true,
  "data": [
    {
      "id": "puttaswamy",
      "case_name": "Justice K.S. Puttaswamy v. Union of India",
      "year": 2017,
      "court": "Supreme Court of India",
      "citation": "(2017) 10 SCC 1 | AIR 2017 SC 4161",
      "summary": "Unanimous 9-Judge Constitutional Bench declaration confirming that the Right to Privacy is an intrinsic and foundational fundamental right guaranteed under Article 21 and the architectural scheme of Part III.",
      "judge": "Chief Justice J.S. Khehar, Justice J. Chelameswar, Justice S.A. Bobde, Justice R.K. Agrawal, Justice R.F. Nariman, Justice A.M. Sapre, Justice D.Y. Chandrachud, Justice S.K. Kaul, Justice S.A. Nazeer",
      "category": "Right to Privacy",
      "constitutional_provisions": "Article 21, Part III (Fundamental Rights), Informational Autonomy",
      "audio_url": "/audio/puttaswamy.mp3"
    }
  ]
}
```

---

## 4. Cases API

### `GET /api/cases`
- **Purpose:** Returns list of all constitutional cases with support for query filters.
- **Query Parameters:** `court`, `year`, `category`, `judge`, `doctrine`
- **Response (200 OK):** Array of Case objects.

### `GET /api/cases/:id`
- **Purpose:** Retrieves a single constitutional case by unique ID (e.g., `kesavananda-bharati`).
- **Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "id": "kesavananda-bharati",
    "case_name": "Kesavananda Bharati v. State of Kerala",
    "court": "Supreme Court of India",
    "year": 1973,
    "citation": "(1973) 4 SCC 225 | AIR 1973 SC 1461",
    "category": "Constitutional Amendments",
    "judge": "Chief Justice S.M. Sikri, Justice H.R. Khanna, ...",
    "constitutional_provisions": "Article 368, Article 13, Article 19(1)(f), Article 31, Preamble",
    "summary": "Historic 13-Judge Constitutional Bench ruling by a 7:6 majority establishing the celebrated Basic Structure Doctrine...",
    "legal_issue": "Does Parliament possess unlimited, sovereign constituent powers under Article 368...",
    "decision": "Parliament can amend constitutional provisions, but the power under Article 368 does not include the power to destroy or alter the foundational Basic Structure...",
    "keywords": "Basic Structure Doctrine, Article 368, Judicial Review, 13-Judge Bench",
    "bench_size": "13-Judge Constitutional Bench",
    "doctrine": "Basic Structure Doctrine",
    "audio_url": "/audio/kesavananda-bharati.mp3",
    "created_at": "2026-09-01 10:30:00",
    "updated_at": "2026-09-01 10:30:00"
  }
}
```

### `POST /api/cases`
- **Purpose:** Adds a new case to the repository.
- **Request Body:**
```json
{
  "case_name": "S.R. Bommai v. Union of India",
  "court": "Supreme Court of India",
  "year": 1994,
  "citation": "(1994) 3 SCC 1",
  "category": "Judicial Review",
  "judge": "9-Judge Bench",
  "constitutional_provisions": "Article 356",
  "summary": "Landmark decision on federalism and proclamation of President's Rule.",
  "audio_url": "/audio/sr-bommai.mp3"
}
```
- **Response (201 Created):** Created Case object.

### `PUT /api/cases/:id`
- **Purpose:** Updates an existing case.
- **Request Body:** Partial case fields to update.
- **Response (200 OK):** Updated Case object.

### `DELETE /api/cases/:id`
- **Purpose:** Deletes a case.
- **Response (200 OK):** `{"success": true, "data": {"deleted": true, "id": "..."}}`

---

## 5. Bookmarks API

### `GET /api/bookmarks`
- **Purpose:** Lists all bookmarked cases joined with case metadata.
- **Response (200 OK):** Array of Bookmark items.

### `GET /api/bookmarks/:caseId`
- **Purpose:** Checks if a specific case is bookmarked.
- **Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "caseId": "kesavananda-bharati",
    "bookmarked": true,
    "bookmark": { ... }
  }
}
```

### `POST /api/bookmarks/:caseId`
- **Purpose:** Bookmarks a case. Prevents duplicates automatically.
- **Response (201 Created):** Created bookmark record.

### `DELETE /api/bookmarks/:caseId`
- **Purpose:** Removes a bookmark.
- **Response (200 OK):** `{"success": true, "data": {"removed": true, "caseId": "..."}}`

---

## 6. Listening History API

### `GET /api/history`
- **Purpose:** Returns listening history with playback progress and case details.
- **Response (200 OK):** Array of ListeningHistory records.

### `POST /api/history`
- **Purpose:** Records or updates listening progress for a case.
- **Request Body:**
```json
{
  "case_id": "kesavananda-bharati",
  "duration_listened": 525,
  "completion_percentage": 63.0,
  "last_position": 525
}
```
- **Response (201 Created):** Created / updated history record.

### `PUT /api/history/:id`
- **Purpose:** Updates an existing history entry.
- **Request Body:** `{"duration_listened": 600, "completion_percentage": 75.0, "last_position": 600}`
- **Response (200 OK):** Updated history record.

### `DELETE /api/history/:id`
- **Purpose:** Removes a history record.
- **Response (200 OK):** `{"success": true, "data": {"deleted": true, "id": 1}}`

---

## 7. Research Notes API

### `GET /api/notes`
- **Purpose:** Returns notes. Filter by case with `?case_id=kesavananda-bharati`.
- **Response (200 OK):** Array of Note records.

### `GET /api/notes/:id`
- **Purpose:** Returns a single note by numeric ID.
- **Response (200 OK):** Note object.

### `POST /api/notes`
- **Purpose:** Creates a new case-linked note.
- **Request Body:**
```json
{
  "title": "Article 368 Basic Structure Boundaries",
  "case_id": "kesavananda-bharati",
  "content": "Key precedent for challenging constitutional amendments violating judicial independence."
}
```
- **Response (201 Created):** Created Note record.

### `PUT /api/notes/:id`
- **Purpose:** Updates note title or content.
- **Request Body:** `{"content": "Updated brief notes"}`
- **Response (200 OK):** Updated Note record.

### `DELETE /api/notes/:id`
- **Purpose:** Deletes a note.
- **Response (200 OK):** `{"success": true, "data": {"deleted": true, "id": 1}}`

---

## 8. Profile & Settings API

### `GET /api/profile` & `PUT /api/profile`
- **Purpose:** Retrieves and updates practitioner profile.
- **PUT Body:**
```json
{
  "name": "Adv. Arvind Narain",
  "profession": "Senior Advocate",
  "email": "arvind.narain@lawvox.internal",
  "institution": "Supreme Court Bar Association",
  "research_interests": "Fundamental Rights, Privacy, Free Speech"
}
```

### `GET /api/settings` & `PUT /api/settings`
- **Purpose:** Retrieves and updates app preferences.
- **PUT Body:**
```json
{
  "notification_enabled": true,
  "autoplay_enabled": true,
  "playback_speed": 1.25,
  "language": "English",
  "appearance": "light"
}
```

---

## 9. Recent Searches API

### `GET /api/searches`
- **Purpose:** Returns recent search query history.
- **Query Parameters:** `limit` *(optional, default 10)*
- **Response (200 OK):** Array of `{ id, query, created_at }`.

### `POST /api/searches`
- **Purpose:** Records a search query.
- **Request Body:** `{"query": "Right to Privacy"}`
- **Response (201 Created):** Recorded search item.

### `DELETE /api/searches/:id`
- **Purpose:** Removes a search item from history.
- **Response (200 OK):** `{"success": true, "data": {"deleted": true, "id": 1}}`
