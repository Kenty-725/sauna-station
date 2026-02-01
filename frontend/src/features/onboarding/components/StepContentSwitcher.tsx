import { type StepId } from "../hooks/useOnboardingFlow";
import CreateAccountStep from "../steps/CreateAccountStep";
import ReviewStep from "../steps/ReviewStep";

interface StepContentSwitcherProps {
  currentStep: StepId;
  formData: Record<string, any>;
  onFormDataChange: (data: Record<string, any>) => void;
  onNext: () => Promise<void>;
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
    case "facility_info":
      return <div>施設基本情報登録（準備中）</div>;
    case "complete":
      return <ReviewStep />;
    default:
      return <div>不明なステップです</div>;
  }
}
