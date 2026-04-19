import { useEffect, useState } from 'react';
import { fetchPendingStaffConfirmation, resendStaffConfirmation } from '../api/staff';

type Status = 'loading' | 'idle' | 'resending' | 'success' | 'error' | 'missing';

export const useStaffSignupSent = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<Status>('loading');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadPendingConfirmation = async () => {
      try {
        const response = await fetchPendingStaffConfirmation();
        setEmail(response.email);
        setStatus('idle');
      } catch (err: any) {
        setError(err.message ?? '確認待ち情報の取得に失敗しました');
        setStatus('missing');
      }
    };

    loadPendingConfirmation();
  }, []);

  const resend = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('resending');
    setError(null);

    try {
      const response = await resendStaffConfirmation();
      setEmail(response.email);
      setStatus('success');
    } catch (err: any) {
      setError(err.message ?? '再送に失敗しました');
      setStatus('error');
    }
  };

  return {
    state: {
      email,
      status,
      error,
      shouldRedirect: status === 'missing',
      isLoading: status === 'loading',
      isResending: status === 'resending',
      isSuccess: status === 'success',
    },
    resend,
  };
};
