export { default as OnboardingLayout } from "./components/OnboardingLayout";
export { default as StepNavigation } from "./components/StepNavigation";
export { default as StepNavigationItem } from "./components/StepNavigationItem";
export { default as StepContentSwitcher } from "./components/StepContentSwitcher";
export { InputField } from "./components/InputField";
export { default as OnboardingPage } from "./Onboarding";

export { default as CreateAccountStep } from "./steps/CreateAccountStep";
export { default as EmailVerifyStep } from "./steps/EmailVerifyStep";
export { default as ReviewStep } from "./steps/ReviewStep";

export { useOnboardingFlow } from "./hooks/useOnboardingFlow";
export type { Step, StepId } from "./hooks/useOnboardingFlow";
export { useCreateAccountStep } from "./hooks/useCreateAccountStep";
export { useEmailVerifyStep } from "./hooks/useEmailVerifyStep";

export { createStaff } from "./api/createStaff";
export { verifyEmail } from "./api/verifyEmail";
