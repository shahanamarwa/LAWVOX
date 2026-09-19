/**
 * LAWVOX Frontend API Service Client
 * Connects Next.js Frontend to the Express SQLite Backend.
 */

import { AuthService } from './auth';

const RAW_API_URL = (
  process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'
).trim();
const CLEAN_BASE = RAW_API_URL.replace(/\/+$/, '');
const API_BASE_URL = CLEAN_BASE.endsWith('/api')
  ? CLEAN_BASE
  : `${CLEAN_BASE}/api`;

async function fetchJson<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T | null> {
  try {
    const headers = new Headers(options?.headers);

    if (!headers.has('Content-Type')) {
      headers.set('Content-Type', 'application/json');
    }

    const token = AuthService.getAuthToken();
    if (token && !headers.has('Authorization')) {
      headers.set('Authorization', `Bearer ${token}`);
    }

    const res = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });

    if (!res.ok) {
      console.warn(
        `[API] Request to ${endpoint} failed with status ${res.status}`
      );
      return null;
    }

    const json = await res.json();

    if (!json.success) {
      console.warn(`[API] Request to ${endpoint} was unsuccessful`);
      return null;
    }

    // New backend responses use:
    // /cases        -> { success, count, cases }
    // /cases/:id    -> { success, case }
    // Other APIs may use { success, data }
    return (json.data ?? json.cases ?? json.case ?? json) as T;
  } catch (error) {
    console.warn(
      `[API] Error contacting backend at ${API_BASE_URL}${endpoint}:`,
      error
    );
    return null;
  }
}

export const LawvoxAPI = {
  // 0. Authentication
  async login(accountName: string, password: string): Promise<{
    success: boolean;
    message?: string;
    token?: string;
    user?: {
      accountName: string;
      name: string;
      role: string;
    };
  }> {
    try {
      const res = await fetch(`${API_BASE_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          accountName: accountName.trim(),
          password,
        }),
      });

      const json = await res.json();
      return json;
    } catch (error) {
      console.warn(`[API] Login error connecting to ${API_BASE_URL}/login:`, error);
      return {
        success: false,
        message: 'Could not connect to authentication server. Please verify the backend is running.',
      };
    }
  },

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

  // 2. Cases
  async getCases() {
    return fetchJson<any[]>('/cases');
  },

  async getCaseById(id: string) {
    return fetchJson<any>(`/cases/${id}`);
  },

  // 3. Search Cases
  async searchCases(q: string) {
    const query = new URLSearchParams();

    if (q.trim()) {
      query.set('q', q.trim());
    }

    return fetchJson<any[]>(
      `/cases/search?${query.toString()}`
    );
  },

  // 4. Notes (Local Storage Implementation - Frontend Only)
  // These methods store notes locally in the browser since the backend
  // doesn't have a notes endpoint yet. When a notes API is added to the
  // backend, replace these implementations with API calls.
  async getNotes() {
    try {
      const stored = localStorage.getItem('lawvox_notes');
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.warn('[API] Error reading notes from localStorage:', error);
      return [];
    }
  },

  async createNote(note: {
    title: string;
    case_id: string;
    content: string;
  }) {
    try {
      const notes = (await this.getNotes()) || [];
      const newNote = {
        id: Math.max(...notes.map((n: any) => n.id || 0), 0) + 1,
        ...note,
        created_at: new Date().toISOString(),
      };
      notes.push(newNote);
      localStorage.setItem('lawvox_notes', JSON.stringify(notes));
      return newNote;
    } catch (error) {
      console.warn('[API] Error creating note:', error);
      return null;
    }
  },

  async deleteNote(id: number) {
    try {
      const notes = (await this.getNotes()) || [];
      const filtered = notes.filter((n: any) => n.id !== id);
      localStorage.setItem('lawvox_notes', JSON.stringify(filtered));
      return true;
    } catch (error) {
      console.warn('[API] Error deleting note:', error);
      return false;
    }
  },

  // 5. Profile (Local Storage Implementation - Frontend Only)
  async getProfile() {
    try {
      const stored = localStorage.getItem('lawvox_profile');
      return stored
        ? JSON.parse(stored)
        : {
            name: 'Advocate Aarav Sharma',
            email: 'aarav@lawvox.in',
            specialization: 'Constitutional Law',
            yearsOfExperience: 8,
            bio: 'Passionate advocate specializing in constitutional jurisprudence and public law.',
            avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Aarav',
          };
    } catch (error) {
      console.warn('[API] Error reading profile from localStorage:', error);
      return null;
    }
  },

  // 6. Dashboard (Mock Data - Frontend Only)
  async getDashboard() {
    try {
      const stored = localStorage.getItem('lawvox_dashboard');
      return stored
        ? JSON.parse(stored)
        : {
            recentCases: 3,
            totalNotes: 0,
            bookmarks: 0,
            listeningHistory: 0,
          };
    } catch (error) {
      console.warn('[API] Error reading dashboard from localStorage:', error);
      return null;
    }
  },

  // 7. Settings (Local Storage Implementation - Frontend Only)
  async getSettings() {
    try {
      const stored = localStorage.getItem('lawvox_settings');
      return stored
        ? JSON.parse(stored)
        : {
            theme: 'light',
            fontSize: 'medium',
            notifications: true,
            emailDigest: 'weekly',
            language: 'en',
          };
    } catch (error) {
      console.warn('[API] Error reading settings from localStorage:', error);
      return null;
    }
  },

  async updateSettings(settings: any) {
    try {
      localStorage.setItem('lawvox_settings', JSON.stringify(settings));
      return true;
    } catch (error) {
      console.warn('[API] Error updating settings:', error);
      return false;
    }
  },
};
