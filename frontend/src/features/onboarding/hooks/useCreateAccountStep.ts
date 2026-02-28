import { useCallback, useState, type ChangeEvent } from "react";
import { createStaff } from "../api/createStaff";

const PENDING_EMAIL_KEY = "pending_onboarding_email";

type UseCreateAccountStepArgs = {
  formData: Record<string, any>;
  onFormDataChange: (data: Record<string, any>) => void;
  onSuccess: () => Promise<void>;
};

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function useCreateAccountStep({
  formData,
  onFormDataChange,
  onSuccess,
}: UseCreateAccountStepArgs) {
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      onFormDataChange({ [name]: value });
    },
    [onFormDataChange],
  );

  const validate = useCallback(() => {
    if (
      !formData.managerName ||
      !formData.email ||
      !formData.password ||
      !formData.passwordConfirm
    ) {
      return "全ての項目を入力してください。";
    }

    if (!emailRegex.test(formData.email)) {
      return "メールアドレスの形式が正しくありません。";
    }

    if (formData.password !== formData.passwordConfirm) {
      return "パスワードが一致しません。";
    }

    return "";
  }, [formData]);

  const handleSubmit = useCallback(async () => {
    const validationMessage = validate();
    if (validationMessage) {
      setMessage(validationMessage);
      return;
    }

    setIsLoading(true);
    setMessage("");

    try {
      await createStaff({
        name: formData.managerName,
        email: formData.email,
        password: formData.password,
        password_confirmation: formData.passwordConfirm,
      });

      // 確認メール再送用にブラウザ側で保持（URLには載せない）
      sessionStorage.setItem(PENDING_EMAIL_KEY, formData.email);
      setMessage("アカウント作成に成功しました！ 確認メールをご確認ください。");
      await onSuccess();
    } catch (err: any) {
      if (err?.errors) {
        setMessage(err.errors.map((e: any) => e.message).join("\n"));
      } else if (err?.error) {
        setMessage(err.error);
      } else {
        setMessage("サーバーエラーが発生しました");
      }
    } finally {
      setIsLoading(false);
    }
  }, [formData, onSuccess, validate]);

  return { message, isLoading, handleChange, handleSubmit };
}
