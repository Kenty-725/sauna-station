import React from "react";
import {
  UserIcon,
  EnvelopeIcon,
  LockClosedIcon,
} from "@heroicons/react/24/solid";
import styles from './Step0AccountForm.module.css';

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
  return (
    <div className={styles.formContainer}>
      <h2 className={styles.title}>
        アカウント作成
      </h2>
      {/* 担当者名 */}
      <div className={styles.fieldGroup}>
        <label className={styles.label}>
          担当者名
        </label>
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
        <label className={styles.label}>
          メールアドレス
        </label>
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
        <label className={styles.label}>
          パスワード
        </label>
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
        <label className={styles.label}>
          パスワード（確認用）
        </label>
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
        <button onClick={onNext} className={styles.nextButton}>
          作成する
        </button>
      </div>
    </div>
  );
}
