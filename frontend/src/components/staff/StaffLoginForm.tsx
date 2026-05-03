import { Link } from 'react-router-dom';
import { useStaffLogin } from '../../hooks/useStaffLogin';
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
      className="form-control signup"
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
    />
  </div>
);

export const StaffLoginForm = () => {
  const { state, setField, submit } = useStaffLogin();

  return (
    <div className="glass-panel w-100 mx-3 mx-lg-5 p-4 p-lg-4">
      <div className="mb-4">
        <div className="small text-uppercase fw-semibold text-secondary mb-2">Staff Login</div>
        <h2 className="signup-title mb-2">管理者ログイン</h2>
        <p className="signup-subtitle mb-0">ログイン後、施設未設定の管理者は施設セットアップに進みます。</p>
      </div>

      <form className="d-flex flex-column gap-3" onSubmit={submit}>
        {state.error && <ErrorAlert message={state.error} />}
        <InputField
          label="メールアドレス"
          type="email"
          value={state.email}
          placeholder="admin@example.com"
          onChange={(value) => setField('email', value)}
        />
        <InputField
          label="パスワード"
          type="password"
          value={state.password}
          placeholder="パスワードを入力してください"
          onChange={(value) => setField('password', value)}
        />
        <button className="btn btn-gradient w-100 py-2" type="submit" disabled={state.loading}>
          {state.loading ? 'ログイン中...' : 'ログインする'}
        </button>
      </form>

      <div className="text-center text-secondary pt-3">
        アカウント未登録ですか？{' '}
        <Link className="signup-footer-link fw-semibold" to="/staff/signup">
          新規登録はこちら
        </Link>
      </div>
    </div>
  );
};
