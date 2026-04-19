export type StaffSignupParams = {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
};

export type StaffSignupResponse = {
  message: string;
  email: string;
};

export async function signupStaff(params: StaffSignupParams) {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/staffs`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({ staff: params }),
    credentials: 'include',
  });

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.errors?.join('\n') || 'サインアップに失敗しました');
  }

  return res.json() as Promise<StaffSignupResponse>;
}

export async function fetchPendingStaffConfirmation() {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/staffs/confirmation/pending`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
    },
    credentials: 'include',
  });

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.errors?.join('\n') || '確認待ち情報の取得に失敗しました');
  }

  return res.json() as Promise<{ email: string }>;
}

export async function resendStaffConfirmation() {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/staffs/confirmation`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    credentials: 'include',
  });

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.errors?.join('\n') || '確認メールの再送に失敗しました');
  }

  return res.json() as Promise<StaffSignupResponse>;
}
