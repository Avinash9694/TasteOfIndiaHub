export type AuthUser = {
  uid: string;
  email: string | null;
  displayName: string | null;
};

export type AuthStatus = 'initializing' | 'signed-out' | 'signed-in' | 'unavailable';

export type AuthState = {
  status: AuthStatus;
  user: AuthUser | null;
  error: string | null;
};

export type AuthAction =
  | { type: 'user-changed'; user: AuthUser | null }
  | { type: 'unavailable'; error: string }
  | { type: 'error'; error: string }
  | { type: 'clear-error' };

export const initialAuthState: AuthState = { status: 'initializing', user: null, error: null };

export function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case 'user-changed':
      return {
        status: action.user ? 'signed-in' : 'signed-out',
        user: action.user,
        error: null,
      };
    case 'unavailable':
      return { status: 'unavailable', user: null, error: action.error };
    case 'error':
      return { ...state, error: action.error };
    case 'clear-error':
      return state.error ? { ...state, error: null } : state;
  }
}

const FRIENDLY: Record<string, string> = {
  'auth/email-already-in-use': 'An account with this email already exists. Try signing in.',
  'auth/invalid-email': 'That email address does not look right.',
  'auth/weak-password': 'Use a password with at least 6 characters.',
  'auth/user-not-found': 'No account matches that email and password.',
  'auth/wrong-password': 'No account matches that email and password.',
  'auth/invalid-credential': 'No account matches that email and password.',
  'auth/too-many-requests': 'Too many attempts. Wait a moment and try again.',
  'auth/network-request-failed': 'Network error. Check your connection and try again.',
  'auth/operation-not-allowed': 'Email sign-in is disabled for this project.',
};

export function friendlyAuthError(error: unknown): string {
  const code =
    typeof error === 'object' && error !== null && 'code' in error ? String(error.code) : '';
  return FRIENDLY[code] ?? 'Something went wrong. Please try again.';
}
