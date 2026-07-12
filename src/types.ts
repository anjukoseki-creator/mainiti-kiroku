export type ISODate = string; // "2026-07-12"

export interface Entry {
  date: ISODate;
  achievements: string[]; // 今日できたこと（最大3）
  learning: string; // 今日学んだこと
  tomorrowFocus: string; // 明日最も重要なこと
  focusDone?: boolean; // 前日の宣言を達成したか
  createdAt: string;
  updatedAt: string;
}

export type EntryMap = Record<ISODate, Entry>;

export interface Review {
  id: string;
  createdAt: string;
  periodFrom: ISODate;
  periodTo: ISODate;
  source: "api" | "manual";
  content: string; // Markdown
}

export interface Settings {
  apiKey?: string;
  model: string;
  mascot?: string; // マスコットID。"none" で非表示
}

export interface ExportFile {
  app: "mainichi-kiroku";
  version: 1;
  exportedAt: string;
  entries: EntryMap;
  reviews: Review[];
}

export const DEFAULT_MODEL = "claude-sonnet-5";
