import { useState } from "react";

export type StepId = "account" | "email-verify" | "facility-info";

export type Step = {
  id: StepId;
  label: string;
  order: number;
};

export const STEPS: Step[] = [
  { id: "account", label: "アカウント作成", order: 1 },
  { id: "email-verify", label: "メール確認", order: 2 },
  { id: "facility-info", label: "施設基本情報登録", order: 3 },
];

export function useOnboardingFlow() {
  const [completedSteps, setCompletedSteps] = useState<Set<StepId>>(new Set());
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [currentStep, setCurrentStep] = useState<StepId>(STEPS[0].id);

  const goNext = () => {
    const currentIndex = STEPS.findIndex(s => s.id === currentStep);
    const nextStep = STEPS[currentIndex + 1];
  
    if (!nextStep) return;
  
    setCompletedSteps(prev => new Set([...prev, currentStep]));
  
    setCurrentStep(nextStep.id);
  };

  const updateFormData = (data: Record<string, any>) => {
    setFormData((prev) => ({ ...prev, ...data }));
  };

  const getStepState = (stepId: StepId) => {
    if (currentStep === stepId) return "active";
    if (completedSteps.has(stepId)) return "completed";
    return "inactive";
  };


  return {
    steps: STEPS,
    currentStep,
    getStepState,
    formData,
    goNext,
    updateFormData,
  };

  
}

