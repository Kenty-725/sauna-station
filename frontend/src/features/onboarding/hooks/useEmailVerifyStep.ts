import { useCallback, useState } from "react";
import { verifyEmail } from "../api/verifyEmail";

type UseEmailVerifyStepArgs = {
  email: string;
};

export function useEmailVerifyStep({ email }: UseEmailVerifyStepArgs) {
  const [info, setInfo] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleResend = useCallback(async () => {
    setInfo("");
    setError("");
    setLoading(true);
    try {
      await verifyEmail(email);
      setInfo("確認メールを再送しました。メールボックスをご確認ください。");
    } catch (e: any) {
      setError(e?.error || "再送に失敗しました");
    } finally {
      setLoading(false);
    }
  }, [email]);

  return {
    info,
    error,
    loading,
    handleResend,
  };
}
