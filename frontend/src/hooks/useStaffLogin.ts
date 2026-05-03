import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginStaff } from '../api/staff';

type Field = 'email' | 'password';

export const useStaffLogin = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const setField = (field: Field, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!form.email || !form.password) {
      setError('メールアドレスとパスワードを入力してください');
      return;
    }

    setLoading(true);
    try {
      const response = await loginStaff(form);
      navigate(response.staff.needs_facility_setup ? '/staff/facility/setup' : '/', { replace: true });
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'ログインに失敗しました');
    } finally {
      setLoading(false);
    }
  };

  return {
    state: {
      ...form,
      loading,
      error,
    },
    setField,
    submit,
  };
};
