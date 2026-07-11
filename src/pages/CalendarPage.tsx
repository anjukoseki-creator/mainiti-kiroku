import { useState } from "react";
import { useStore } from "../store";
import { Calendar } from "../components/Calendar";
import { EntryCard } from "../components/EntryCard";
import type { ISODate } from "../types";

export function CalendarPage() {
  const { entries } = useStore();
  const [selected, setSelected] = useState<ISODate | null>(null);

  return (
    <div className="fade-in">
      <h1 style={{ fontSize: 20, marginBottom: 16 }}>カレンダー</h1>
      <Calendar entries={entries} onSelect={setSelected} />
      {selected && entries[selected] && (
        <div style={{ marginTop: 16 }} className="fade-in">
          <EntryCard entry={entries[selected]} />
        </div>
      )}
    </div>
  );
}
