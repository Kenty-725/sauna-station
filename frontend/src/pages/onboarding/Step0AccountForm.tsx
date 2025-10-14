import React, { useState } from "react";
import {
  UserIcon,
  EnvelopeIcon,
  LockClosedIcon,
} from "@heroicons/react/24/solid";
import styles from './Step0AccountForm.module.css';
import { createStaff } from "../../api/staffs";

interface Step0AccountFormProps {
  formData: any;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onNext: () => void;
  onPrev?: () => void;
  step?: number;
}

export default function Step0AccountForm({
  formData,
  onChange,
  onNext,
  onPrev,
  step = 0,
}: Step0AccountFormProps) {
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleSubmit = async () => {
    // バリデーションチェック
    if (!formData.managerName || !formData.email || !formData.password || !formData.passwordConfirm) {
      setMessage("全ての項目を入力してください。");
      return;
    }

    if (!emailRegex.test(formData.email)) {
      setMessage("メールアドレスの形式が正しくありません。");
      return;
    }

    if (formData.password !== formData.passwordConfirm) {
      setMessage("パスワードが一致しません。");
      return;
    }

    setIsLoading(true);
    setMessage("");

    try {
      // 実際API呼び出し
      await createStaff({
        name: formData.managerName,
        email: formData.email,
        password: formData.password,
        password_confirmation: formData.passwordConfirm,
      });
      
      setMessage("アカウント作成に成功しました！ 確認メールをご確認ください。");
      onNext();
    } catch (err: any) {
      if (err.errors) {
        setMessage(err.errors.map((e: any) => e.message).join("\n"));
      } else {
        setMessage("サーバーエラーが発生しました");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.formContainer}>
      <h2 className={styles.title}>アカウント作成</h2>
      
      {message && (
        <div className={styles.message}>
          {message}
        </div>
      )}
      {/* 担当者名 */}
      <div className={styles.fieldGroup}>
        <label className={styles.label}>担当者名</label>
        <div className={styles.inputWrapper}>
          <UserIcon className={styles.inputIcon} />
          <input
            type="text"
            name="managerName"
            value={formData.managerName || ""}
            onChange={onChange}
            className={styles.input}
          />
        </div>
      </div>

      {/* メールアドレス */}
      <div className={styles.fieldGroup}>
        <label className={styles.label}>メールアドレス</label>
        <div className={styles.inputWrapper}>
          <EnvelopeIcon className={styles.inputIcon} />
          <input
            type="email"
            name="email"
            value={formData.email || ""}
            onChange={onChange}
            className={styles.input}
          />
        </div>
      </div>

      {/* パスワード */}
      <div className={styles.fieldGroup}>
        <label className={styles.label}>パスワード</label>
        <div className={styles.inputWrapper}>
          <LockClosedIcon className={styles.inputIcon} />
          <input
            type="password"
            name="password"
            value={formData.password || ""}
            onChange={onChange}
            className={styles.input}
          />
        </div>
      </div>

      {/* パスワード確認 */}
      <div className={styles.fieldGroup}>
        <label className={styles.label}>パスワード（確認用）</label>
        <div className={styles.inputWrapper}>
          <LockClosedIcon className={styles.inputIcon} />
          <input
            type="password"
            name="passwordConfirm"
            value={formData.passwordConfirm || ""}
            onChange={onChange}
            className={styles.input}
          />
        </div>
      </div>

      {/* ナビゲーションボタン */}
      <div className={styles.buttonContainer}>
        {step > 0 && onPrev && (
          <button onClick={onPrev} className={styles.prevButton}>
            戻る
          </button>
        )}
        <button 
          onClick={handleSubmit} 
          className={styles.nextButton}
          disabled={isLoading}
        >
          {isLoading ? '作成中...' : '作成する'}
        </button>
      </div>
    </div>
  );
}
