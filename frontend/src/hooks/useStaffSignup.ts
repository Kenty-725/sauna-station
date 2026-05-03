import { useState } from 'react';
import { signupStaff } from '../api/staff';
import { useNavigate } from 'react-router-dom';

type Field = 'name' | 'email' | 'password' | 'passwordConfirmation';

export const useStaffSignup = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    passwordConfirmation: '',
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const setField = (field: Field, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const { name, email, password, passwordConfirmation } = form;

    if (!name || !email || !password || !passwordConfirmation) {
      setError('すべての項目を入力してください');
      return;
    }
    if (password !== passwordConfirmation) {
      setError('パスワードが一致していません');
      return;
    }

    setLoading(true);
    try {
      await signupStaff({
        name,
        email,
        password,
        password_confirmation: passwordConfirmation,
      });
      navigate('/staff/signup/sent');
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'サインアップに失敗しました');
    } finally {
      setLoading(false);
    }
  };

  return {
    state: { ...form, error, loading },
    setField,
    submit,
  };
};
