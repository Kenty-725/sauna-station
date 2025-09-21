import React, { useState } from "react";
import Step0AccountForm from "./onboarding/Step0AccountForm";

const STEPS = [
  "アカウント作成",
  "施設基本情報",
  "所在地・営業情報",
  "予約ポリシー",
  "確認 & 公開",
];

export default function OnboardingPage() {
  const [step, setStep] = useState(0);
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
      default:
        return <p>まだ準備中のステップです</p>;
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#111827",
        color: "white",
        padding: "16px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "Inter, system-ui, sans-serif",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          maxWidth: "1100px",
          width: "100%",
          backgroundColor: "#374151",
          borderRadius: "24px",
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
          overflow: "hidden",
          height: "550px",
        }}
      >
        {/* Left Side: Step Indicator */}
        <div
          style={{
            width: "30%",
            padding: "32px",
            backgroundColor: "#1F2937",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <div>
            <h3
              style={{
                fontSize: "24px",
                fontWeight: "bold",
                color: "#FED7AA",
                marginBottom: "24px",
              }}
            >
              進行状況
            </h3>
            {STEPS.map((stepName, index) => (
              <div
                key={index}
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "16px",
                  color: step >= index ? "#FB923C" : "#9CA3AF",
                }}
              >
                <div
                  style={{
                    width: "32px",
                    height: "32px",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginRight: "12px",
                    color: "white",
                    fontWeight: "bold",
                    fontSize: "14px",
                    backgroundColor: step >= index ? "#EA580C" : "#6B7280",
                  }}
                >
                  {index + 1}
                </div>
                <span style={{ fontSize: "14px", fontWeight: "500" }}>
                  {stepName}
                </span>
              </div>
            ))}
          </div>

          {/* トップページに戻るボタン */}
          <div style={{ marginTop: "32px" }}>
            <button
              style={{
                width: "100%",
                backgroundColor: "#4B5563",
                color: "white",
                padding: "12px 16px",
                borderRadius: "24px",
                border: "none",
                cursor: "pointer",
                fontSize: "14px",
                fontWeight: "500",
              }}
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
        <div
          style={{
            flex: 1,
            padding: "48px 64px",
            backgroundColor: "#374151",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          {renderStep()}
        </div>
      </div>
    </div>
  );
}
