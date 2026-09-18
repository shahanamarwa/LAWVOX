/**
 * LAWVOX Client-Side Authentication Session Management
 * Handles persistent session storage, token retrieval, and logout.
 */

export interface AuthUser {
  accountName: string;
  name: string;
  role: string;
  initials?: string;
  barAffiliation?: string;
}

export interface AuthSession {
  token: string;
  user: AuthUser;
  loggedInAt: string;
}

const AUTH_STORAGE_KEY = 'lawvox_auth_session';

export const AuthService = {
  /**
   * Save active user session to localStorage
   */
  saveSession(session: AuthSession): void {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(session));
    } catch (error) {
      console.warn('[Auth] Failed to save session to localStorage:', error);
    }
  },

  /**
   * Retrieve active session from localStorage
   */
  getSession(): AuthSession | null {
    if (typeof window === 'undefined') return null;
    try {
      const stored = localStorage.getItem(AUTH_STORAGE_KEY);
      if (!stored) return null;
      return JSON.parse(stored) as AuthSession;
    } catch (error) {
      console.warn('[Auth] Failed to parse session from localStorage:', error);
      return null;
    }
  },

  /**
   * Check if user currently has an active session
   */
  isAuthenticated(): boolean {
    const session = this.getSession();
    return Boolean(session && session.token);
  },

  /**
   * Get active session bearer token
   */
  getAuthToken(): string | null {
    const session = this.getSession();
    return session?.token || null;
  },

  /**
   * Get authenticated user profile data
   */
  getAuthUser(): AuthUser | null {
    const session = this.getSession();
    return session?.user || null;
  },

  /**
   * Clear session on logout
   */
  clearSession(): void {
    if (typeof window === 'undefined') return;
    try {
      localStorage.removeItem(AUTH_STORAGE_KEY);
    } catch (error) {
      console.warn('[Auth] Failed to remove session from localStorage:', error);
    }
  },
};
