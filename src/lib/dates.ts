import type { ISODate } from "../types";

export function toISO(d: Date): ISODate {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export const todayISO = () => toISO(new Date());

export function addDays(date: ISODate, days: number): ISODate {
  const [y, m, d] = date.split("-").map(Number);
  const dt = new Date(y, m - 1, d + days);
  return toISO(dt);
}

const WEEKDAYS = ["日", "月", "火", "水", "木", "金", "土"];

export function formatJa(date: ISODate): string {
  const [y, m, d] = date.split("-").map(Number);
  const w = WEEKDAYS[new Date(y, m - 1, d).getDay()];
  return `${y}年${m}月${d}日（${w}）`;
}

export function formatShortJa(date: ISODate): string {
  const [, m, d] = date.split("-").map(Number);
  return `${m}月${d}日`;
}
