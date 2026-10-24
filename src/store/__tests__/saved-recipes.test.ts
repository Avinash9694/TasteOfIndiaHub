import { act, renderHook } from '@testing-library/react';
import { beforeEach, describe, expect, it } from 'vitest';
import {
  clearSaved,
  getSaved,
  isSaved,
  removeSaved,
  resetSavedCache,
  storageKeyFor,
  toggleSaved,
  useSavedRecipes,
} from '../saved-recipes';

describe('saved recipes store', () => {
  beforeEach(() => {
    resetSavedCache();
    window.localStorage.clear();
  });

  it('starts empty and toggles slugs on and off', () => {
    expect(getSaved('u1')).toEqual([]);
    expect(toggleSaved('u1', 'dal-makhani')).toBe(true);
    expect(isSaved('u1', 'dal-makhani')).toBe(true);
    expect(toggleSaved('u1', 'dal-makhani')).toBe(false);
    expect(getSaved('u1')).toEqual([]);
  });

  it('persists per user in localStorage', () => {
    toggleSaved('u1', 'biryani');
    toggleSaved('u2', 'rasgulla');
    expect(JSON.parse(window.localStorage.getItem(storageKeyFor('u1')) ?? '[]')).toEqual([
      'biryani',
    ]);
    expect(getSaved('u2')).toEqual(['rasgulla']);
    resetSavedCache();
    expect(getSaved('u1')).toEqual(['biryani']);
  });

  it('ignores corrupt stored values', () => {
    window.localStorage.setItem(storageKeyFor('u1'), '{"not":"an array"}');
    expect(getSaved('u1')).toEqual([]);
    window.localStorage.setItem(storageKeyFor('u2'), '["ok", 42, null]');
    expect(getSaved('u2')).toEqual(['ok']);
  });

  it('removes and clears', () => {
    toggleSaved('u1', 'a');
    toggleSaved('u1', 'b');
    removeSaved('u1', 'a');
    expect(getSaved('u1')).toEqual(['b']);
    clearSaved('u1');
    expect(getSaved('u1')).toEqual([]);
  });

  it('exposes a reactive hook that is inert when signed out', () => {
    const signedOut = renderHook(() => useSavedRecipes(null));
    act(() => {
      expect(signedOut.result.current.toggle('x')).toBe(false);
    });
    expect(signedOut.result.current.saved).toEqual([]);

    const signedIn = renderHook(() => useSavedRecipes('u1'));
    act(() => {
      signedIn.result.current.toggle('pav-bhaji');
    });
    expect(signedIn.result.current.has('pav-bhaji')).toBe(true);
    act(() => {
      signedIn.result.current.remove('pav-bhaji');
    });
    expect(signedIn.result.current.saved).toEqual([]);
  });
});
