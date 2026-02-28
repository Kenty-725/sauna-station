export { default as OnboardingLayout } from "./components/OnboardingLayout";
export { default as StepNavigation } from "./components/StepNavigation";
export { default as StepNavigationItem } from "./components/StepNavigationItem";
export { default as StepContentSwitcher } from "./components/StepContentSwitcher";
export { InputField } from "./components/InputField";
export { default as OnboardingPage } from "./Onboarding";

export { default as CreateAccountStep } from "./steps/CreateAccountStep";
export { default as ReviewStep } from "./steps/ReviewStep";

export { useOnboardingFlow } from "./hooks/useOnboardingFlow";
export type { Step, StepId } from "./hooks/useOnboardingFlow";
export { useCreateAccountStep } from "./hooks/useCreateAccountStep";

export { createStaff } from "./api/createStaff";
export {
  fetchOnboardingStatus,
  advanceOnboardingStep,
} from "./api/facilityOnboarding";
