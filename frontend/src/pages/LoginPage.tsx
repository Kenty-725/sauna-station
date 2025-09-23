import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import styles from "./LoginPage.module.css";
import { login } from "../api/auth";
import { EnvelopeIcon, LockClosedIcon } from "@heroicons/react/24/solid";

export default function LoginPage() {
  const [params] = useSearchParams();
  const confirmed = params.get("confirmed");
  const reason = params.get("reason");

  const showSuccess = confirmed === "1";
  const showError = confirmed === "0";

  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setError(null);
    setLoading(true);
    try {
      await login(email, password);
      // ステップ3（0始まりで index=2: 施設基本情報）から開始
      navigate("/onboarding?step=2");
    } catch (e: any) {
      setError(typeof e === 'string' ? e : e?.error || 'ログインに失敗しました');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.root}>
      <div className={styles.shell}>
        <div className={styles.left}>
          <div className={styles.leftCard}>
            <div className={styles.brand}>Sauna Station</div>
          </div>
        </div>
        <div className={styles.right}>
          <h1 className={styles.heading}>ログイン</h1>
          <p className={styles.note}>メール確認が完了している場合は、そのままログインできます。</p>

          {showSuccess && (
            <div className={styles.alert}>メール確認が完了しました。ログインして設定を続けてください。</div>
          )}
          {showError && (
            <div className={styles.alertError}>
              メール確認リンクが無効、または既に使用されています。
              {reason && reason === "invalid_token" && "（invalid_token）"}
            </div>
          )}

          {error && <div className={styles.alertError}>{error}</div>}

          <label className={styles.label}>メールアドレス</label>
          <div className={styles.inputWrap}>
            <EnvelopeIcon className={styles.icon} />
            <input
              className={styles.input}
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <label className={styles.label}>パスワード</label>
          <div className={styles.inputWrap}>
            <LockClosedIcon className={styles.icon} />
            <input
              className={styles.input}
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button className={styles.button} onClick={handleLogin} disabled={loading}>
            {loading ? "ログイン中..." : "ログイン"}
          </button>

          {/* サインアップ導線は現時点では非表示 */}
        </div>
      </div>
    </div>
  );
}
