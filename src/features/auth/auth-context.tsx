import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  type ReactNode,
} from 'react';
import { getFirebaseAuth } from '@/lib/firebase';
import { resetSavedCache } from '@/store/saved-recipes';
import {
  authReducer,
  friendlyAuthError,
  initialAuthState,
  type AuthState,
  type AuthUser,
} from './auth-reducer';

type Credentials = { email: string; password: string };

export type AuthContextValue = AuthState & {
  signIn: (c: Credentials) => Promise<boolean>;
  register: (c: Credentials & { displayName: string }) => Promise<boolean>;
  signOut: () => Promise<void>;
  updateDisplayName: (name: string) => Promise<boolean>;
  sendPasswordReset: (email: string) => Promise<boolean>;
  clearError: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

function toUser(user: { uid: string; email: string | null; displayName: string | null } | null) {
  return user ? { uid: user.uid, email: user.email, displayName: user.displayName } : null;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(authReducer, initialAuthState);

  useEffect(() => {
    let unsubscribe: (() => void) | undefined;
    let cancelled = false;
    getFirebaseAuth()
      .then(({ auth, api }) => {
        if (cancelled) return;
        unsubscribe = api.onAuthStateChanged(
          auth,
          (user) => dispatch({ type: 'user-changed', user: toUser(user) }),
          () => dispatch({ type: 'unavailable', error: 'Sign-in is temporarily unavailable.' }),
        );
      })
      .catch(() => {
        if (!cancelled) {
          dispatch({
            type: 'unavailable',
            error: 'Sign-in could not be loaded. You can still browse every recipe.',
          });
        }
      });
    return () => {
      cancelled = true;
      unsubscribe?.();
    };
  }, []);

  const run = useCallback(async (task: () => Promise<unknown>) => {
    try {
      await task();
      return true;
    } catch (error) {
      dispatch({ type: 'error', error: friendlyAuthError(error) });
      return false;
    }
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      ...state,
      signIn: ({ email, password }) =>
        run(async () => {
          const { auth, api } = await getFirebaseAuth();
          await api.signInWithEmailAndPassword(auth, email, password);
        }),
      register: ({ email, password, displayName }) =>
        run(async () => {
          const { auth, api } = await getFirebaseAuth();
          const { user } = await api.createUserWithEmailAndPassword(auth, email, password);
          await api.updateProfile(user, { displayName });
          dispatch({ type: 'user-changed', user: toUser({ ...user, displayName }) });
        }),
      signOut: async () => {
        const { auth, api } = await getFirebaseAuth();
        await api.signOut(auth);
        resetSavedCache();
      },
      updateDisplayName: (displayName) =>
        run(async () => {
          const { auth, api } = await getFirebaseAuth();
          if (!auth.currentUser) throw new Error('not signed in');
          await api.updateProfile(auth.currentUser, { displayName });
          dispatch({ type: 'user-changed', user: toUser({ ...auth.currentUser, displayName }) });
        }),
      sendPasswordReset: (email) =>
        run(async () => {
          const { auth, api } = await getFirebaseAuth();
          await api.sendPasswordResetEmail(auth, email);
        }),
      clearError: () => dispatch({ type: 'clear-error' }),
    }),
    [state, run],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>');
  return ctx;
}

export type { AuthUser };
