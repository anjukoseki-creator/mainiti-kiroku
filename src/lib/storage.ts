import type { EntryMap, ExportFile, Review, Settings } from "../types";
import { DEFAULT_MODEL } from "../types";

const KEYS = {
  entries: "mk:entries",
  reviews: "mk:reviews",
  settings: "mk:settings",
} as const;

function load<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function save(key: string, value: unknown) {
  localStorage.setItem(key, JSON.stringify(value));
}

export const loadEntries = () => load<EntryMap>(KEYS.entries, {});
export const saveEntries = (m: EntryMap) => save(KEYS.entries, m);

export const loadReviews = () => load<Review[]>(KEYS.reviews, []);
export const saveReviews = (r: Review[]) => save(KEYS.reviews, r);

export const loadSettings = () =>
  load<Settings>(KEYS.settings, { model: DEFAULT_MODEL });
export const saveSettings = (s: Settings) => save(KEYS.settings, s);

export function buildExport(): ExportFile {
  return {
    app: "mainichi-kiroku",
    version: 1,
    exportedAt: new Date().toISOString(),
    entries: loadEntries(),
    reviews: loadReviews(),
  };
}

export function downloadExport() {
  const blob = new Blob([JSON.stringify(buildExport(), null, 2)], {
    type: "application/json",
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `mainichi-kiroku-${new Date().toISOString().slice(0, 10)}.json`;
  a.click();
  URL.revokeObjectURL(url);
}

export function importFromJson(text: string): { entries: number; reviews: number } {
  const data = JSON.parse(text) as ExportFile;
  if (data.app !== "mainichi-kiroku" || !data.entries) {
    throw new Error("毎日記録のエクスポートファイルではありません");
  }
  const entries = { ...loadEntries(), ...data.entries };
  saveEntries(entries);
  const existing = loadReviews();
  const ids = new Set(existing.map((r) => r.id));
  const merged = [...existing, ...(data.reviews ?? []).filter((r) => !ids.has(r.id))];
  saveReviews(merged);
  return { entries: Object.keys(data.entries).length, reviews: (data.reviews ?? []).length };
}
