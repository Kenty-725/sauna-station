import { useNavigate } from "react-router-dom";
import OnboardingLayout from "./components/OnboardingLayout";
import StepContentSwitcher from "./components/StepContentSwitcher";
import StepNavigation from "./components/StepNavigation";
import { useOnboardingFlow } from "./hooks/useOnboardingFlow";
import { logout } from "../../api/auth";

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

  const handleNext = async () => {
    if (currentStep === "account") {
      navigate("/email/verify");
      return;
    }
    await goNext();
  };

  const handleLogout = async () => {
    try {
      await logout();
    } finally {
      navigate("/login");
    }
  };

  return (
    <OnboardingLayout
      sidebar={
        <StepNavigation
          steps={steps}
          getStepState={getStepState}
          onBackToHome={handleBackToHome}
          onLogout={handleLogout}
        />
      }
    >
      <StepContentSwitcher
        currentStep={currentStep}
        formData={formData}
        onFormDataChange={updateFormData}
        onNext={handleNext}
      />
    </OnboardingLayout>
  );
}
