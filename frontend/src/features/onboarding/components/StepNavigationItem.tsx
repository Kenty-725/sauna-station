import { type Step } from "../hooks/useOnboardingFlow";
import styles from "./StepNavigation.module.css";

interface StepNavigationItemProps {
  step: Step;
  order: number;
  state: "active" | "completed" | "inactive";
}

export default function StepNavigationItem({
  step,
  order,
  state,
}: StepNavigationItemProps) {
  return (
    <div className={styles.stepItem} data-state={state}>
      <div className={styles.stepNumber} data-state={state}>
        {order}
      </div>
      <span className={styles.stepLabel}>{step.label}</span>
    </div>
  );
}
