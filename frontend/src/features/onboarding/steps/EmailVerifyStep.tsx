import styles from "./EmailVerifyStep.module.css";
import { useEmailVerifyStep } from "../hooks/useEmailVerifyStep";

type EmailVerifyStepProps = {
  email: string;
};

export default function EmailVerifyStep({ email }: EmailVerifyStepProps) {
  const { info, error, loading, handleResend } = useEmailVerifyStep({ email });

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>メールの確認</h2>
      <div className={styles.message}>
        {email} 宛に確認メールを送信しました。メール内のリンクをクリックして、メールアドレスの確認を完了してください。
      </div>
      <div className={styles.note}>
        確認が完了したら、ログインから次の設定にお進みください。
      </div>
      {info && <div className={styles.message}>{info}</div>}
      {error && (
        <div className={`${styles.message} ${styles.errorMessage}`}>
          {error}
        </div>
      )}

      <div className={styles.actions}>
        <button
          className={styles.button}
          onClick={handleResend}
          disabled={loading}
        >
          {loading ? "再送中..." : "確認メールを再送"}
        </button>
      </div>
      <p className={styles.note}>
        届かない場合：迷惑メールやプロモーションタブをご確認ください。
      </p>
    </div>
  );
}
