import { useSyncExternalStore } from 'react';

export type ToastKind = 'success' | 'error' | 'info';
export type Toast = { id: number; kind: ToastKind; message: string };

let toasts: Toast[] = [];
let nextId = 1;
const listeners = new Set<() => void>();
const timers = new Map<number, ReturnType<typeof setTimeout>>();

function emit() {
  listeners.forEach((l) => l());
}

export function dismissToast(id: number) {
  const timer = timers.get(id);
  if (timer) clearTimeout(timer);
  timers.delete(id);
  toasts = toasts.filter((t) => t.id !== id);
  emit();
}

export function pushToast(kind: ToastKind, message: string, durationMs = 3500): number {
  const id = nextId++;
  toasts = [...toasts.slice(-3), { id, kind, message }];
  emit();
  if (durationMs > 0)
    timers.set(
      id,
      setTimeout(() => dismissToast(id), durationMs),
    );
  return id;
}

export const toast = {
  success: (m: string) => pushToast('success', m),
  error: (m: string) => pushToast('error', m, 5000),
  info: (m: string) => pushToast('info', m),
};

export function clearToasts() {
  timers.forEach((t) => clearTimeout(t));
  timers.clear();
  toasts = [];
  emit();
}

const subscribe = (l: () => void) => {
  listeners.add(l);
  return () => listeners.delete(l);
};

export function useToasts() {
  return useSyncExternalStore(
    subscribe,
    () => toasts,
    () => toasts,
  );
}
