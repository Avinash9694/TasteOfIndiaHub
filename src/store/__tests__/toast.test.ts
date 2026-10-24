import { act, renderHook } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { clearToasts, dismissToast, pushToast, toast, useToasts } from '../toast';

describe('toast store', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    clearToasts();
  });
  afterEach(() => vi.useRealTimers());

  it('pushes, auto-dismisses and caps the stack at four', () => {
    const { result } = renderHook(() => useToasts());
    act(() => {
      for (let i = 0; i < 6; i++) pushToast('info', `m${i}`, 0);
    });
    expect(result.current.map((t) => t.message)).toEqual(['m2', 'm3', 'm4', 'm5']);

    let id = 0;
    act(() => {
      id = toast.success('done');
    });
    expect(result.current.some((t) => t.id === id)).toBe(true);
    act(() => {
      vi.advanceTimersByTime(3600);
    });
    expect(result.current.some((t) => t.id === id)).toBe(false);
  });

  it('dismisses manually', () => {
    const { result } = renderHook(() => useToasts());
    let id = 0;
    act(() => {
      id = toast.error('bad');
    });
    act(() => dismissToast(id));
    expect(result.current).toEqual([]);
  });
});
