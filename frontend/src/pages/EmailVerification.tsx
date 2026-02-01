import { useEffect, useState } from "react";
import { verifyEmail } from "../api/verifyEmail";
import styles from "./EmailVerification.module.css";

const PENDING_EMAIL_KEY = "pending_onboarding_email";

export default function EmailVerificationPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [forceInput, setForceInput] = useState(false);

  useEffect(() => {
    const pending = sessionStorage.getItem(PENDING_EMAIL_KEY);
    if (pending) {
      setEmail(pending);
    }
  }, []);

  const handleResend = async () => {
    // セッションに紐づいていれば email 空でも再送できる。失敗したら入力を促す。
    setMessage("");
    setError("");
    setLoading(true);
    try {
      await verifyEmail(email || undefined);
      setMessage("確認メールを再送しました。メールボックスをご確認ください。");
    } catch (e: any) {
      setError(e?.error || "再送に失敗しました。メールアドレスを入力して再度お試しください。");
      setForceInput(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.root}>
      <div className={styles.card}>
        <h1 className={styles.title}>メール確認が必要です</h1>
        <p className={styles.lead}>
          登録されたメールアドレス宛に確認メールを送信しました。
          メール内のリンクをクリックして、メールアドレスの確認を完了してください。
        </p>
        <p className={styles.note}>
          確認完了後、ログインしてセットアップを続けられます。
        </p>
        {(forceInput || !email) && (
          <div className={styles.field}>
            <label className={styles.label}>登録したメールアドレス</label>
            <input
              className={styles.input}
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        )}

        {message && <div className={styles.message}>{message}</div>}
        {error && <div className={`${styles.message} ${styles.error}`}>{error}</div>}

        <div className={styles.actions}>
          <button className={styles.button} onClick={handleResend} disabled={loading}>
            {loading ? "再送中..." : "確認メールを再送"}
          </button>
        </div>

        <p className={styles.footerNote}>
          届かない場合: 迷惑メールフォルダやプロモーションタブもご確認ください。
        </p>
      </div>
    </div>
  );
}
