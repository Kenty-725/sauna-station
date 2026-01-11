import { useNavigate } from "react-router-dom";
import OnboardingLayout from "./components/OnboardingLayout";
import StepContentSwitcher from "./components/StepContentSwitcher";
import StepNavigation from "./components/StepNavigation";
import { useOnboardingFlow } from "./hooks/useOnboardingFlow";

export default function OnboardingPage() {
  const navigate = useNavigate();
  const {
    steps,
    currentStep,
    getStepState,
    formData,
    updateFormData,
    goNext,
  } = useOnboardingFlow();

  const handleBackToHome = () => {
    navigate("/");
  };

  return (
    <OnboardingLayout
      sidebar={
        <StepNavigation
          steps={steps}
          getStepState={getStepState}
          onBackToHome={handleBackToHome}
        />
      }
    >
      <StepContentSwitcher
        currentStep={currentStep}
        formData={formData}
        onFormDataChange={updateFormData}
        onNext={goNext}
      />
    </OnboardingLayout>
  );
}
