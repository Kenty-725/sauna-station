import { type Step, type StepId } from "../hooks/useOnboardingFlow";
import StepNavigationItem from "./StepNavigationItem";
import styles from "./StepNavigation.module.css";

interface StepNavigationProps {
  steps: Step[];
  getStepState: (stepId: StepId) => "active" | "completed" | "inactive";
  onBackToHome: () => void;
}

export default function StepNavigation({
  steps,
  getStepState,
  onBackToHome,
}: StepNavigationProps) {
  return (
    <>
      <div>
        <h3 className={styles.sidebarTitle}>進行状況</h3>
        {steps.map((step) => (
          <StepNavigationItem
            key={step.id}
            step={step}
            order={step.order}
            state={getStepState(step.id)}
          />
        ))}
      </div>

      <div>
        <button className={styles.backButton} onClick={onBackToHome}>
          トップページに戻る
        </button>
      </div>
    </>
  );
}
