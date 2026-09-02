/**
 * LAWVOX Frontend API Service Client
 * Connects Next.js Frontend to Express SQLite Backend API at http://localhost:5000/api
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

async function fetchJson<T>(endpoint: string, options?: RequestInit): Promise<T | null> {
  try {
    const res = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...(options?.headers || {}),
      },
      ...options,
    });

    if (!res.ok) {
      console.warn(`[API] Request to ${endpoint} failed with status ${res.status}`);
      return null;
    }

    const json = await res.json();
    return json.success ? (json.data as T) : null;
  } catch (error) {
    console.warn(`[API] Error contacting backend at ${API_BASE_URL}${endpoint}:`, error);
    return null;
  }
}

export const LawvoxAPI = {
  // 1. Health Check
  async checkHealth(): Promise<boolean> {
    try {
      const res = await fetch(`${API_BASE_URL}/health`);
      const json = await res.json();
      return json.success === true;
    } catch {
      return false;
    }
  },

  // 2. Dashboard
  async getDashboard() {
    return fetchJson<any>('/dashboard');
  },

  // 3. Cases
  async getCases(params?: { category?: string; court?: string; year?: number }) {
    const query = new URLSearchParams();
    if (params?.category) query.set('category', params.category);
    if (params?.court) query.set('court', params.court);
    if (params?.year) query.set('year', String(params.year));
    const qs = query.toString();
    return fetchJson<any[]>(`/cases${qs ? `?${qs}` : ''}`);
  },

  async getCaseById(id: string) {
    return fetchJson<any>(`/cases/${id}`);
  },

  async searchCases(q: string, filters?: { court?: string; category?: string; year?: number }) {
    const query = new URLSearchParams();
    if (q) query.set('q', q);
    if (filters?.court) query.set('court', filters.court);
    if (filters?.category) query.set('category', filters.category);
    if (filters?.year) query.set('year', String(filters.year));
    return fetchJson<any[]>(`/search?${query.toString()}`);
  },

  // 4. Bookmarks
  async getBookmarks() {
    return fetchJson<any[]>('/bookmarks');
  },

  async checkBookmark(caseId: string) {
    return fetchJson<{ bookmarked: boolean; caseId: string }>(`/bookmarks/${caseId}`);
  },

  async addBookmark(caseId: string) {
    return fetchJson<any>(`/bookmarks/${caseId}`, { method: 'POST' });
  },

  async removeBookmark(caseId: string) {
    return fetchJson<any>(`/bookmarks/${caseId}`, { method: 'DELETE' });
  },

  // 5. Listening History
  async getHistory() {
    return fetchJson<any[]>('/history');
  },

  async recordHistory(data: {
    case_id: string;
    duration_listened: number;
    completion_percentage: number;
    last_position: number;
  }) {
    return fetchJson<any>('/history', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  // 6. Notes
  async getNotes(caseId?: string) {
    const qs = caseId ? `?case_id=${encodeURIComponent(caseId)}` : '';
    return fetchJson<any[]>(`/notes${qs}`);
  },

  async createNote(data: { title: string; case_id: string; content: string }) {
    return fetchJson<any>('/notes', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  async deleteNote(id: number) {
    return fetchJson<any>(`/notes/${id}`, { method: 'DELETE' });
  },

  // 7. Profile
  async getProfile() {
    return fetchJson<any>('/profile');
  },

  async updateProfile(data: any) {
    return fetchJson<any>('/profile', {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  // 8. Settings
  async getSettings() {
    return fetchJson<any>('/settings');
  },

  async updateSettings(data: any) {
    return fetchJson<any>('/settings', {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  // 9. Recent Searches
  async getRecentSearches() {
    return fetchJson<any[]>('/searches');
  },

  async addSearch(query: string) {
    return fetchJson<any>('/searches', {
      method: 'POST',
      body: JSON.stringify({ query }),
    });
  },
};
