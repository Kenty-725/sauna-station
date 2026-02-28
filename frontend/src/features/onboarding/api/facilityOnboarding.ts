const API_BASE = import.meta.env.VITE_API_URL;

type OnboardingResponse = {
  step: string;
  message?: string;
};

export async function fetchOnboardingStatus(): Promise<OnboardingResponse> {
  const res = await fetch(`${API_BASE}/facility_onboarding`, {
    method: "GET",
    credentials: "include",
    cache: "no-store",
  });

  const body = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw { status: res.status, ...(body || { error: "オンボーディングステータスの取得に失敗しました" }) };
  }
  return body;
}

export async function advanceOnboardingStep(): Promise<OnboardingResponse> {
  const res = await fetch(`${API_BASE}/facility_onboarding`, {
    method: "PATCH",
    credentials: "include",
    cache: "no-store",
  });

  const body = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw { status: res.status, ...(body || { error: "オンボーディングステップの更新に失敗しました" }) };
  }
  return body;
}
