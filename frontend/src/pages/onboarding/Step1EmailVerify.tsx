import React, { useState } from "react";
import styles from "./Step1EmailVerify.module.css";
import { resendConfirmation } from "../../api/staffs";

interface Props {
  email: string;
}

export default function Step1EmailVerify({ email }: Props) {
  const [info, setInfo] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleResend = async () => {
    setInfo("");
    setError("");
    setLoading(true);
    try {
      await resendConfirmation(email);
      setInfo("確認メールを再送しました。メールボックスをご確認ください。");
    } catch (e: any) {
      setError(e?.error || "再送に失敗しました");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>メールの確認</h2>
      <div className={styles.message}>
        {email} 宛に確認メールを送信しました。メール内のリンクをクリックして、メールアドレスの確認を完了してください。
      </div>
      <div className={styles.note}>確認が完了したら、ログインから次の設定にお進みください。</div>
      {info && <div className={styles.message}>{info}</div>}
      {error && <div className={styles.message} style={{ background: '#fee2e2', color: '#991b1b', borderColor: '#fecaca' }}>{error}</div>}

      <div className={styles.actions}>
        <button className={styles.button} onClick={handleResend} disabled={loading}>
          {loading ? "再送中..." : "確認メールを再送"}
        </button>
      </div>
      <p className={styles.note}>届かない場合：迷惑メールやプロモーションタブをご確認ください。</p>
    </div>
  );
}
