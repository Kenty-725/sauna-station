import { useCallback, useEffect, useState } from "react";
import {
  advanceOnboardingStep,
  fetchOnboardingStatus,
} from "../api/facilityOnboarding";

export type StepId =
  | "account"
  | "facility_info"
  | "complete";

export type Step = {
  id: StepId;
  label: string;
  order: number;
};

export const STEPS: Step[] = [
  { id: "account", label: "アカウント作成", order: 1 },
  { id: "facility_info", label: "施設基本情報登録", order: 2 },
  { id: "complete", label: "完了", order: 3 },
];

const STEP_IDS = STEPS.map(s => s.id);

const STEP_ORDER = STEPS.reduce<Record<StepId, number>>((acc, step) => {
  acc[step.id] = step.order;
  return acc;
}, {} as Record<StepId, number>);

const isStepId = (value: unknown): value is StepId =>
  typeof value === "string" && STEP_IDS.includes(value as StepId);

export function useOnboardingFlow() {
  const [completedSteps, setCompletedSteps] = useState<Set<StepId>>(new Set());
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [currentStep, setCurrentStep] = useState<StepId>(STEPS[0].id);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const applyStep = useCallback((step: StepId) => {
    const targetOrder = STEP_ORDER[step];
    const done = new Set(
      STEPS.filter(s => s.order < targetOrder).map(s => s.id),
    );
    setCompletedSteps(done);
    setCurrentStep(step);
  }, []);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const res = await fetchOnboardingStatus();
        if (isStepId(res.step)) {
          applyStep(res.step);
        }
      } catch (e: any) {
        setError(e?.error || "ステップの取得に失敗しました");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [applyStep]);

  const goNext = useCallback(async () => {
    if (currentStep === "account") {
      applyStep("facility_info");
      return;
    }

    try {
      setError(null);
      setLoading(true);
      const res = await advanceOnboardingStep();
      if (isStepId(res.step)) {
        applyStep(res.step);
      } else {
        throw new Error("不明なステップです");
      }
    } catch (e: any) {
      setError(e?.error || "ステップの更新に失敗しました");
      throw e;
    } finally {
      setLoading(false);
    }
  }, [applyStep, currentStep]);

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
    loading,
    error,
    goNext,
    updateFormData,
  };

  
}
