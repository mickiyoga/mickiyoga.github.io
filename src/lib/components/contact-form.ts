export interface PendingVerification {
  code: string;
  name: string;
  email: string;
  ts: number;
}

/** Minimal Storage surface so tests don't need a DOM. */
export type StorageLike = Pick<Storage, 'getItem' | 'setItem' | 'removeItem'>;

/* ---------- pure helpers --------------------------------------------- */

export function generateCode(rng: () => number = Math.random): string {
  // Clamp so an out-of-contract rng() === 1 can't yield "10000".
  const n = 1000 + Math.floor(rng() * 9000);
  return String(Math.min(n, 9999));
}

export function formatCountdown(ms: number): string {
  const total = Math.ceil(Math.max(0, ms) / 1000);
  const m = Math.floor(total / 60);
  const s = total % 60;
  return `${m}:${String(s).padStart(2, '0')}`;
}

export function sanitizeCodeInput(raw: string): string {
  return raw.replace(/\D/g, '').slice(0, 4);
}

export function buildAutoResponse(template: string, code: string): string {
  return template.replace('{code}', code);
}

export function buildStorageKey(base: string, suffix?: string): string {
  return suffix ? `${base}:${suffix}` : base;
}

export function incorrectCodeMessage(attempts: number, max: number): string {
  if (attempts >= max) return 'Too many incorrect attempts.';
  const left = max - attempts;
  return `Incorrect code. ${left} attempt${left === 1 ? '' : 's'} remaining.`;
}

export function intEnv(raw: string | undefined, fallback: number): number {
  const n = Number.parseInt(raw ?? '', 10);
  return Number.isFinite(n) && n > 0 ? n : fallback;
}

/* ---------- sessionStorage wrapper ----------------------------------- */

export interface PendingStore {
  save(p: Omit<PendingVerification, 'ts'>): void;
  load(): PendingVerification | null;
  clear(): void;
}

/**
 * `storage` may be null/undefined (e.g. during SSR / prerender). In that
 * case all operations are no-ops and `load()` returns null.
 *
 * `save()` deliberately does NOT swallow storage errors — the component
 * relies on the exception to detect private-browsing / quota failures.
 */
export function createPendingStore(
  storage: StorageLike | null | undefined,
  key: string,
  expiryMs: number,
  clock: () => number = Date.now
): PendingStore {
  return {
    save(p) {
      if (!storage) return;
      storage.setItem(key, JSON.stringify({ ...p, ts: clock() }));
    },

    load() {
      if (!storage) return null;
      try {
        const raw = storage.getItem(key);
        if (!raw) return null;
        const p = JSON.parse(raw) as PendingVerification;
        if (
          typeof p?.code !== 'string' ||
          typeof p?.ts !== 'number' ||
          clock() - p.ts > expiryMs
        ) {
          this.clear();
          return null;
        }
        return p;
      } catch {
        return null;
      }
    },

    clear() {
      try {
        storage?.removeItem(key);
      } catch {
        /* storage unavailable — nothing to clear */
      }
    }
  };
}