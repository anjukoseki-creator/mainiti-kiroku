import { useRef, useState } from "react";
import type { Entry, ISODate } from "../types";

interface Props {
  date: ISODate;
  initial?: Entry;
  onSave: (e: Entry) => void;
}

export function EntryForm({ date, initial, onSave }: Props) {
  const [achievements, setAchievements] = useState<string[]>(() => {
    const a = initial?.achievements.filter((s) => s.trim()) ?? [];
    return a.length < 3 ? [...a, ""] : a;
  });
  const [learning, setLearning] = useState(initial?.learning ?? "");
  const [focus, setFocus] = useState(initial?.tomorrowFocus ?? "");
  const [saved, setSaved] = useState(false);

  const learningRef = useRef<HTMLTextAreaElement>(null);
  const focusRef = useRef<HTMLInputElement>(null);
  const achRefs = useRef<(HTMLInputElement | null)[]>([]);

  function setAchievement(i: number, v: string) {
    setAchievements((prev) => {
      const next = [...prev];
      next[i] = v;
      // 入力されたら次の空欄を出す（最大3）
      if (v.trim() && i === next.length - 1 && next.length < 3) next.push("");
      return next;
    });
  }

  function onAchKeyDown(i: number, e: React.KeyboardEvent) {
    if (e.key !== "Enter") return;
    e.preventDefault();
    const next = achRefs.current[i + 1];
    if (next && achievements[i].trim()) next.focus();
    else learningRef.current?.focus();
  }

  function handleSave() {
    const now = new Date().toISOString();
    onSave({
      date,
      achievements: achievements.map((s) => s.trim()).filter(Boolean),
      learning: learning.trim(),
      tomorrowFocus: focus.trim(),
      focusDone: initial?.focusDone,
      createdAt: initial?.createdAt ?? now,
      updatedAt: now,
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <div className="fade-in">
      <span className="label">今日できたこと（最大3件・Enterで次へ）</span>
      {achievements.map((a, i) => (
        <input
          key={i}
          ref={(el) => (achRefs.current[i] = el)}
          type="text"
          value={a}
          placeholder={i === 0 ? "例: Python 30分" : ""}
          onChange={(e) => setAchievement(i, e.target.value)}
          onKeyDown={(e) => onAchKeyDown(i, e)}
          style={{ marginBottom: 8 }}
        />
      ))}

      <span className="label">今日学んだこと</span>
      <textarea
        ref={learningRef}
        value={learning}
        onChange={(e) => setLearning(e.target.value)}
        placeholder="1〜3行くらいで"
      />

      <span className="label">明日最も重要なこと（1件だけ）</span>
      <input
        ref={focusRef}
        type="text"
        value={focus}
        onChange={(e) => setFocus(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSave()}
        placeholder="明日の自分への宣言"
      />

      <div style={{ marginTop: 24, display: "flex", alignItems: "center", gap: 12 }}>
        <button onClick={handleSave}>保存</button>
        {saved && <span style={{ color: "var(--accent)", fontSize: 13 }}>保存しました</span>}
      </div>
    </div>
  );
}
