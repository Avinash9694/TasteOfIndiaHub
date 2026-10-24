import type * as FirebaseAuth from 'firebase/auth';

// Firebase web config is public by design: it identifies the project, it does not grant
// access. Security lives in Firebase Auth rules and the API key's referrer restrictions.
export const firebaseConfig = {
  apiKey: 'AIzaSyAmkpFil-smDhRU3GI-N7hXKSOHunGsmPk',
  authDomain: 'taste-of-india-a9031.firebaseapp.com',
  projectId: 'taste-of-india-a9031',
  storageBucket: 'taste-of-india-a9031.appspot.com',
  messagingSenderId: '841042337519',
  appId: '1:841042337519:web:5868986660b8966c03051a',
  measurementId: 'G-1KG9Y18G9K',
} as const;

export type FirebaseAuthBundle = {
  auth: FirebaseAuth.Auth;
  api: typeof FirebaseAuth;
};

let bundle: Promise<FirebaseAuthBundle> | null = null;

// The SDK is loaded on demand so it stays out of the initial bundle.
export function getFirebaseAuth(): Promise<FirebaseAuthBundle> {
  bundle ??= (async () => {
    const [{ initializeApp, getApps, getApp }, api] = await Promise.all([
      import('firebase/app'),
      import('firebase/auth'),
    ]);
    const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
    const auth = api.getAuth(app);
    await api.setPersistence(auth, api.browserLocalPersistence).catch(() => undefined);
    return { auth, api };
  })();
  return bundle;
}
