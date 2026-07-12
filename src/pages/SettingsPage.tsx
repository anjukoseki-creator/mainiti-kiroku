import { useRef, useState } from "react";
import { useStore } from "../store";
import { downloadExport, importFromJson } from "../lib/storage";
import { MASCOTS, getMascot } from "../mascots";

export function SettingsPage() {
  const { settings, updateSettings, reload } = useStore();
  const [apiKey, setApiKey] = useState(settings.apiKey ?? "");
  const [message, setMessage] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  function saveKey() {
    updateSettings({ apiKey: apiKey.trim() || undefined });
    setMessage("保存しました ✓");
    setTimeout(() => setMessage(""), 2000);
  }

  async function onImport(file: File) {
    try {
      const result = importFromJson(await file.text());
      reload();
      setMessage(`読み込みました（記録${result.entries}件 / レビュー${result.reviews}件）`);
    } catch (e) {
      setMessage(e instanceof Error ? e.message : "読み込みに失敗しました");
    }
  }

  return (
    <div className="fade-in">
      <h1 style={{ fontSize: 20, marginBottom: 16 }}>設定</h1>

      <div className="card">
        <h2 style={{ fontSize: 15 }}>マスコット</h2>
        <p style={{ fontSize: 13, color: "var(--text-soft)", margin: "4px 0 12px" }}>
          ホームで待っていて、AIレビューもこの子の口調になります。
          記録した日数で育ちます（はじめは赤ちゃん。7日でこども、30日で双葉、100日で花が咲きます）
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10 }}>
          {MASCOTS.map((m) => {
            const active = getMascot(settings.mascot)?.id === m.id;
            return (
              <button
                key={m.id}
                className="ghost"
                onClick={() => updateSettings({ mascot: m.id })}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 4,
                  padding: "10px 4px",
                  borderColor: active ? "var(--accent)" : "var(--border)",
                  background: active ? "var(--accent-soft)" : "transparent",
                  color: "var(--text)",
                }}
              >
                <m.Svg size={40} />
                <span style={{ fontSize: 12 }}>{m.name}</span>
              </button>
            );
          })}
        </div>
        <button
          className="ghost"
          style={{ marginTop: 10, padding: "6px 14px", fontSize: 13,
            borderColor: settings.mascot === "none" ? "var(--accent)" : "var(--border)" }}
          onClick={() => updateSettings({ mascot: "none" })}
        >
          マスコットなし
        </button>
      </div>

      <div className="card" style={{ marginTop: 16 }}>
        <h2 style={{ fontSize: 15 }}>Claude API</h2>
        <p style={{ fontSize: 13, color: "var(--text-soft)", margin: "4px 0 0" }}>
          キーはこの端末の localStorage にのみ保存されます。設定するとAIレビューが自動になります。
        </p>
        <span className="label">APIキー</span>
        <input
          type="password"
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
          placeholder="sk-ant-..."
        />
        <button style={{ marginTop: 12 }} onClick={saveKey}>保存</button>
      </div>

      <div className="card" style={{ marginTop: 16 }}>
        <h2 style={{ fontSize: 15 }}>データ</h2>
        <div style={{ display: "flex", gap: 12, marginTop: 12 }}>
          <button className="ghost" onClick={downloadExport}>JSONエクスポート</button>
          <button className="ghost" onClick={() => fileRef.current?.click()}>インポート</button>
        </div>
        <input
          ref={fileRef}
          type="file"
          accept="application/json"
          style={{ display: "none" }}
          onChange={(e) => e.target.files?.[0] && onImport(e.target.files[0])}
        />
      </div>

      {message && <p style={{ color: "var(--accent)", fontSize: 13, marginTop: 12 }}>{message}</p>}
    </div>
  );
}
