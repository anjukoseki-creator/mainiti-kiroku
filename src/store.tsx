import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { Entry, EntryMap, ISODate, Review, Settings } from "./types";
import * as storage from "./lib/storage";

interface Store {
  entries: EntryMap;
  reviews: Review[];
  settings: Settings;
  saveEntry: (e: Entry) => void;
  setFocusDone: (date: ISODate, done: boolean) => void;
  addReview: (r: Review) => void;
  updateSettings: (s: Partial<Settings>) => void;
  reload: () => void;
}

const StoreContext = createContext<Store | null>(null);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [entries, setEntries] = useState<EntryMap>(storage.loadEntries);
  const [reviews, setReviews] = useState<Review[]>(storage.loadReviews);
  const [settings, setSettings] = useState<Settings>(storage.loadSettings);

  const saveEntry = useCallback((e: Entry) => {
    setEntries((prev) => {
      const next = { ...prev, [e.date]: e };
      storage.saveEntries(next);
      return next;
    });
  }, []);

  const setFocusDone = useCallback((date: ISODate, done: boolean) => {
    setEntries((prev) => {
      const target = prev[date];
      if (!target) return prev;
      const next = {
        ...prev,
        [date]: { ...target, focusDone: done, updatedAt: new Date().toISOString() },
      };
      storage.saveEntries(next);
      return next;
    });
  }, []);

  const addReview = useCallback((r: Review) => {
    setReviews((prev) => {
      const next = [r, ...prev];
      storage.saveReviews(next);
      return next;
    });
  }, []);

  const updateSettings = useCallback((s: Partial<Settings>) => {
    setSettings((prev) => {
      const next = { ...prev, ...s };
      storage.saveSettings(next);
      return next;
    });
  }, []);

  const reload = useCallback(() => {
    setEntries(storage.loadEntries());
    setReviews(storage.loadReviews());
    setSettings(storage.loadSettings());
  }, []);

  const value = useMemo(
    () => ({ entries, reviews, settings, saveEntry, setFocusDone, addReview, updateSettings, reload }),
    [entries, reviews, settings, saveEntry, setFocusDone, addReview, updateSettings, reload]
  );

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore(): Store {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used within StoreProvider");
  return ctx;
}
