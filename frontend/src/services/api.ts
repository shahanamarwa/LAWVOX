/**
 * LAWVOX Frontend API Service Client
 * Connects Next.js Frontend to the Express SQLite Backend.
 */

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

async function fetchJson<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T | null> {
  try {
    const res = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...(options?.headers || {}),
      },
      ...options,
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
};
