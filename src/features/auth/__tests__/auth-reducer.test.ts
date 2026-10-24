import { describe, expect, it } from 'vitest';
import { authReducer, friendlyAuthError, initialAuthState } from '../auth-reducer';

const user = { uid: 'abc', email: 'a@b.c', displayName: 'A' };

describe('authReducer', () => {
  it('starts initializing', () => {
    expect(initialAuthState.status).toBe('initializing');
  });

  it('moves to signed-in and signed-out on user changes and clears errors', () => {
    const errored = authReducer(initialAuthState, { type: 'error', error: 'x' });
    const signedIn = authReducer(errored, { type: 'user-changed', user });
    expect(signedIn).toEqual({ status: 'signed-in', user, error: null });
    const signedOut = authReducer(signedIn, { type: 'user-changed', user: null });
    expect(signedOut).toEqual({ status: 'signed-out', user: null, error: null });
  });

  it('records errors without changing status', () => {
    const signedOut = authReducer(initialAuthState, { type: 'user-changed', user: null });
    const errored = authReducer(signedOut, { type: 'error', error: 'bad password' });
    expect(errored.status).toBe('signed-out');
    expect(errored.error).toBe('bad password');
    expect(authReducer(errored, { type: 'clear-error' }).error).toBeNull();
    expect(authReducer(signedOut, { type: 'clear-error' })).toBe(signedOut);
  });

  it('marks auth unavailable and drops any user', () => {
    const signedIn = authReducer(initialAuthState, { type: 'user-changed', user });
    expect(authReducer(signedIn, { type: 'unavailable', error: 'offline' })).toEqual({
      status: 'unavailable',
      user: null,
      error: 'offline',
    });
  });
});

describe('friendlyAuthError', () => {
  it('maps known Firebase codes and falls back for unknown ones', () => {
    expect(friendlyAuthError({ code: 'auth/wrong-password' })).toMatch(/No account matches/);
    expect(friendlyAuthError({ code: 'auth/email-already-in-use' })).toMatch(/already exists/);
    expect(friendlyAuthError(new Error('boom'))).toMatch(/Something went wrong/);
    expect(friendlyAuthError(null)).toMatch(/Something went wrong/);
  });
});
