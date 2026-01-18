import {
  UserIcon,
  EnvelopeIcon,
  LockClosedIcon,
} from "@heroicons/react/24/solid";
import styles from "./CreateAccountStep.module.css";
import { useCreateAccountStep } from "../hooks/useCreateAccountStep";
import { InputField } from "../components/InputField";

type CreateAccountStepProps = {
  formData: Record<string, any>;
  onFormDataChange: (data: Record<string, any>) => void;
  onNext: (email: string) => Promise<void>;
};

export default function CreateAccountStep({
  formData,
  onFormDataChange,
  onNext,
}: CreateAccountStepProps) {
  const { message, isLoading, handleChange, handleSubmit } = useCreateAccountStep(
    {
      formData,
      onFormDataChange,
      onSuccess: onNext,
    },
  );

  return (
    <div className={styles.formContainer}>
      <h2 className={styles.title}>アカウント作成</h2>

      {message && <div className={styles.message}>{message}</div>}

      <InputField
        label="担当者名"
        name="managerName"
        value={formData.managerName || ""}
        onChange={handleChange}
        Icon={UserIcon}
      />

      <InputField
        label="メールアドレス"
        name="email"
        value={formData.email || ""}
        onChange={handleChange}
        Icon={EnvelopeIcon}
        type="email"
      />

      <InputField
        label="パスワード"
        name="password"
        value={formData.password || ""}
        onChange={handleChange}
        Icon={LockClosedIcon}
        type="password"
      />

      <InputField
        label="パスワード（確認用）"
        name="passwordConfirm"
        value={formData.passwordConfirm || ""}
        onChange={handleChange}
        Icon={LockClosedIcon}
        type="password"
      />

      <div className={styles.buttonContainer}>
        <button
          onClick={handleSubmit}
          className={styles.nextButton}
          disabled={isLoading}
        >
          {isLoading ? "作成中..." : "作成する"}
        </button>
      </div>
    </div>
  );
}
