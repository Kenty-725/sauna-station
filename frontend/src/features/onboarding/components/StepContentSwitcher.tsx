import { type StepId } from "../hooks/useOnboardingFlow";
import CreateAccountStep from "../steps/CreateAccountStep";
import EmailVerifyStep from "../steps/EmailVerifyStep";
import ReviewStep from "../steps/ReviewStep";

interface StepContentSwitcherProps {
  currentStep: StepId;
  formData: Record<string, any>;
  onFormDataChange: (data: Record<string, any>) => void;
  onNext: () => void;
}

export default function StepContentSwitcher({
  currentStep,
  formData,
  onFormDataChange,
  onNext,
}: StepContentSwitcherProps) {
  switch (currentStep) {
    case "account":
      return (
        <CreateAccountStep
          formData={formData}
          onFormDataChange={onFormDataChange}
          onNext={onNext}
        />
      );
    case "email-verify":
      return <EmailVerifyStep email={formData.email} />;
    case "facility-info":
      return <div>施設基本情報登録（準備中）</div>;
    case "confirm":
      return <ReviewStep />;
    case "complete":
      return <div>完了画面（準備中）</div>;
    default:
      return <div>不明なステップです</div>;
  }
}
