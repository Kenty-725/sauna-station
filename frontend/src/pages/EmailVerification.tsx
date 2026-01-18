import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { verifyEmail } from "../api/verifyEmail";
import styles from "./EmailVerification.module.css";

export default function EmailVerificationPage() {
  const [params] = useSearchParams();
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const email = useMemo(() => params.get("email") || "", [params]);

  const handleResend = async () => {
    if (!email) {
      setError("メールアドレスが取得できませんでした。");
      return;
    }
    setMessage("");
    setError("");
    setLoading(true);
    try {
      await verifyEmail(email);
      setMessage("確認メールを再送しました。メールボックスをご確認ください。");
    } catch (e: any) {
      setError(e?.error || "再送に失敗しました");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.root}>
      <div className={styles.card}>
        <h1 className={styles.title}>メール確認が必要です</h1>
        <p className={styles.lead}>
          {email ? `${email} 宛に確認メールを送信しました。` : "登録されたメールアドレス宛に確認メールを送信しました。"}
          メール内のリンクをクリックして、メールアドレスの確認を完了してください。
        </p>
        <p className={styles.note}>
          確認完了後、ログインしてセットアップを続けられます。
        </p>

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
