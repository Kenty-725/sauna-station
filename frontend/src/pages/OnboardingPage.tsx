import React, { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Step0AccountForm from "./onboarding/Step0AccountForm";
import Step1EmailVerify from "./onboarding/Step1EmailVerify";
import styles from "./OnboardingPage.module.css";

const STEPS = [
  "アカウント作成",
  "メール確認",
  "施設基本情報",
  "所在地・営業情報",
  "予約ポリシー",
  "確認 & 公開",
];

export default function OnboardingPage() {
  const [params] = useSearchParams();
  const initialStep = useMemo(() => {
    const raw = params.get("step");
    const n = raw ? parseInt(raw, 10) : 0;
    return Number.isFinite(n) ? Math.max(0, Math.min(n, STEPS.length - 1)) : 0;
  }, [params]);
  const [step, setStep] = useState(initialStep);
  const [formData, setFormData] = useState<any>({});
  const [message, setMessage] = useState("");

  const nextStep = () => {
    setMessage("");
    setStep((prev) => prev + 1);
  };

  const prevStep = () => {
    setMessage("");
    setStep((prev) => prev - 1);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({ ...prev, [name]: value }));
  };

  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <Step0AccountForm
            formData={formData}
            onChange={handleChange}
            onNext={nextStep}
            onPrev={prevStep}
            step={step}
          />
        );
      case 1:
        return (
          <Step1EmailVerify
            email={formData.email}
          />
        );
      default:
        return <p>まだ準備中のステップです</p>;
    }
  };
  return (
    <div className={styles.container}>
      <div className={styles.cardContainer}>
        {/* Left Side: Step Indicator */}
        <div className={styles.sidebar}>
          <div>
            <h3 className={styles.sidebarTitle}>進行状況</h3>
            {STEPS.map((stepName, index) => (
              <div
                key={index}
                className={`${styles.stepItem} ${
                  step >= index ? styles.active : styles.inactive
                }`}
              >
                <div
                  className={`${styles.stepNumber} ${
                    step >= index ? styles.active : styles.inactive
                  }`}
                >
                  {index + 1}
                </div>
                <span className={styles.stepLabel}>{stepName}</span>
              </div>
            ))}
          </div>

          {/* トップページに戻るボタン */}
          <div>
            <button
              className={styles.backButton}
              onClick={() => {
                // トップページに移動する処理をここに追加
                console.log("トップページに戻る");
              }}
            >
              トップページに戻る
            </button>
          </div>
        </div>

        {/* Right Side: Step Content */}
        <div className={styles.contentArea}>{renderStep()}</div>
      </div>
    </div>
  );
}
