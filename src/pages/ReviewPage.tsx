import { useMemo, useState } from "react";
import { useStore } from "../store";
import { buildReviewPrompt } from "../lib/reviewPrompt";
import { runClaudeReview } from "../lib/claude";
import { addDays, formatShortJa, todayISO } from "../lib/dates";
import { entryHasContent } from "../lib/streak";
import { getMascot } from "../mascots";
import type { Review } from "../types";

export function ReviewPage() {
  const { entries, reviews, settings, addReview } = useStore();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const [manualText, setManualText] = useState("");
  const [showManual, setShowManual] = useState(false);

  const today = todayISO();
  // 対象期間: 前回レビュー以降。初回は直近30日。
  const periodFrom = reviews.length > 0 ? addDays(reviews[0].periodTo, 1) : addDays(today, -29);

  const targetEntries = useMemo(
    () =>
      Object.values(entries)
        .filter(entryHasContent)
        .filter((e) => e.date >= periodFrom && e.date <= today)
        .sort((a, b) => (a.date < b.date ? -1 : 1)),
    [entries, periodFrom, today]
  );

  const mascot = getMascot(settings.mascot);
  const prompt = useMemo(
    () => buildReviewPrompt(targetEntries, reviews[0], mascot?.persona),
    [targetEntries, reviews, mascot]
  );

  function saveReview(content: string, source: Review["source"]) {
    addReview({
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      periodFrom,
      periodTo: today,
      source,
      content,
    });
  }

  async function runApi() {
    if (!settings.apiKey) return;
    setLoading(true);
    setError("");
    try {
      const content = await runClaudeReview(settings.apiKey, settings.model, prompt);
      saveReview(content, "api");
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      setLoading(false);
    }
  }

  async function copyPrompt() {
    await navigator.clipboard.writeText(prompt);
    setCopied(true);
    setShowManual(true);
    setTimeout(() => setCopied(false), 2000);
  }

  const tooFew = targetEntries.length < 3;

  return (
    <div className="fade-in">
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        {mascot && <mascot.Svg size={44} />}
        <h1 style={{ fontSize: 20 }}>AIレビュー</h1>
      </div>
      <p style={{ color: "var(--text-soft)", fontSize: 13, margin: "0 0 16px" }}>
        対象期間: {formatShortJa(periodFrom)} 〜 {formatShortJa(today)}（{targetEntries.length}日分）
      </p>

      {tooFew ? (
        <p style={{ color: "var(--text-soft)" }}>
          レビューには3日分以上の記録が必要です
        </p>
      ) : settings.apiKey ? (
        <button onClick={runApi} disabled={loading}>
          {loading ? "分析中…" : "レビューを実行"}
        </button>
      ) : (
        <div className="card">
          <p style={{ margin: "0 0 12px", fontSize: 14 }}>
            APIキー未設定のため、分析プロンプトをコピーして Claude に貼り付けてください。
            （設定画面でAPIキーを入れると自動になります）
          </p>
          <button onClick={copyPrompt}>{copied ? "コピーしました" : "プロンプトをコピー"}</button>
          {showManual && (
            <div style={{ marginTop: 16 }}>
              <span className="label" style={{ marginTop: 0 }}>Claude の回答を貼り付けて保存</span>
              <textarea
                value={manualText}
                onChange={(e) => setManualText(e.target.value)}
                style={{ minHeight: 120 }}
              />
              <button
                style={{ marginTop: 8 }}
                disabled={!manualText.trim()}
                onClick={() => {
                  saveReview(manualText.trim(), "manual");
                  setManualText("");
                  setShowManual(false);
                }}
              >
                レビューとして保存
              </button>
            </div>
          )}
        </div>
      )}

      {error && <p style={{ color: "var(--danger)", fontSize: 13 }}>{error}</p>}

      {reviews.length > 0 && (
        <div style={{ marginTop: 32 }}>
          <h2 style={{ fontSize: 16, marginBottom: 12 }}>レビュー履歴</h2>
          {reviews.map((r) => (
            <details key={r.id} className="card" style={{ marginBottom: 12 }}>
              <summary style={{ cursor: "pointer", fontSize: 14 }}>
                {r.createdAt.slice(0, 10)}（{formatShortJa(r.periodFrom)}〜{formatShortJa(r.periodTo)}）
              </summary>
              <div style={{ whiteSpace: "pre-wrap", marginTop: 12, fontSize: 14 }}>{r.content}</div>
            </details>
          ))}
        </div>
      )}
    </div>
  );
}
