import { useStaffSignup } from '../../hooks/useStaffSignup';
import { ErrorAlert } from '../shared/ErrorAlert';

type InputFieldProps = {
  label: string;
  type?: string;
  value: string;
  placeholder?: string;
  onChange: (value: string) => void;
};

const InputField = ({ label, type = 'text', value, placeholder, onChange }: InputFieldProps) => (
  <div>
    <label className="form-label">{label}</label>
    <input
      className="form-control"
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
    />
  </div>
);

export const StaffSignupForm = () => {
  const { state, setField, submit } = useStaffSignup();
  const { name, email, password, passwordConfirmation, loading, error } = state;
  return (
    <div className="glass-panel w-100 mx-3 mx-lg-5 p-4 p-lg-4">
      <div className="mb-4">
        <h2 className="signup-title mb-2">施設アカウントの登録</h2>
        <p className="signup-subtitle mb-0">施設担当者様の基本情報をご入力ください。</p>
      </div>

      <form className="d-flex flex-column gap-3" onSubmit={submit}>
        {error && <ErrorAlert message={error} />}
        <InputField label="氏名" value={name} placeholder="山田 太郎" onChange={(v) => setField('name', v)} />
        <InputField
          label="メールアドレス"
          type="email"
          value={email}
          placeholder="staff@example.com"
          onChange={(v) => setField('email', v)}
        />
        <InputField
          label="パスワード"
          type="password"
          value={password}
          placeholder="8文字以上"
          onChange={(v) => setField('password', v)}
        />
        <InputField
          label="パスワード（確認）"
          type="password"
          value={passwordConfirmation}
          placeholder="確認のため再度入力してください"
          onChange={(v) => setField('passwordConfirmation', v)}
        />
        <button className="btn btn-primary w-100 py-2" type="submit" disabled={loading}>
          {loading ? '送信中...' : '登録して確認メールを送る'}
        </button>
      </form>

      <div className="text-center text-secondary pt-3">
        すでにアカウントをお持ちですか？{' '}
        <a className="signup-footer-link fw-semibold" href="/staff/login">
          ログインはこちら
        </a>
      </div>
    </div>
  );
};
