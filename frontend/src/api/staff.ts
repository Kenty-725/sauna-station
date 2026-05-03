export type StaffSignupParams = {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
};

export type StaffLoginParams = {
  email: string;
  password: string;
};

export type StaffSignupResponse = {
  message: string;
  email: string;
};

export type CurrentStaff = {
  id: number;
  name: string;
  email: string;
  role: 'admin' | 'staff';
  facility_id: number | null;
  needs_facility_setup: boolean;
};

export type StaffSessionResponse = {
  message: string;
  staff: CurrentStaff;
};

export type FacilityCreateParams = {
  name: string;
  phone?: string;
  address_prefecture: string;
  address_line: string;
  postal_code?: string;
  description?: string;
  access_info?: string;
  base_capacity: number;
  base_price: number;
  status: 'active' | 'inactive' | 'under_review';
};

class StaffApiError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = 'StaffApiError';
    this.status = status;
  }
}

async function parseError(res: Response, fallbackMessage: string) {
  const body = await res.json().catch(() => ({}));
  const message = body.errors?.join('\n') || fallbackMessage;
  return new StaffApiError(message, res.status);
}

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
    throw await parseError(res, 'サインアップに失敗しました');
  }

  return res.json() as Promise<StaffSignupResponse>;
}

export async function loginStaff(params: StaffLoginParams) {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/staffs/sign_in`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({ staff: params }),
    credentials: 'include',
  });

  if (!res.ok) {
    throw await parseError(res, 'ログインに失敗しました');
  }

  return res.json() as Promise<StaffSessionResponse>;
}

export async function fetchCurrentStaff() {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/staffs/me`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
    },
    credentials: 'include',
  });

  if (!res.ok) {
    throw await parseError(res, 'スタッフ情報の取得に失敗しました');
  }

  return res.json() as Promise<{ staff: CurrentStaff }>;
}

export async function createFacility(params: FacilityCreateParams) {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/facilities`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({ facility: params }),
    credentials: 'include',
  });

  if (!res.ok) {
    throw await parseError(res, '施設情報の作成に失敗しました');
  }

  return res.json() as Promise<{ facility_id: number; staff: CurrentStaff }>;
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
    throw await parseError(res, '確認待ち情報の取得に失敗しました');
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
    throw await parseError(res, '確認メールの再送に失敗しました');
  }

  return res.json() as Promise<StaffSignupResponse>;
}

export { StaffApiError };
