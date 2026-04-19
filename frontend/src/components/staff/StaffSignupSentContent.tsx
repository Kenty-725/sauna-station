import { Link } from 'react-router-dom';
import { ErrorAlert } from '../shared/ErrorAlert';

type StaffSignupSentContentProps = {
  email: string;
  error: string | null;
  isLoading: boolean;
  isResending: boolean;
  isSuccess: boolean;
  onResend: (e: React.FormEvent) => Promise<void>;
};

export const StaffSignupSentContent = ({
  email,
  error,
  isLoading,
  isResending,
  isSuccess,
  onResend,
}: StaffSignupSentContentProps) => {
  return (
    <div className="container py-5" style={{ maxWidth: 520 }}>
      <h1 className="mb-3 fs-3 fw-bold">確認メールを送信しました</h1>
      <p className="text-secondary mb-4">
        メール内のリンクをクリックしてアカウントを有効化してください。
      </p>
      {error && <ErrorAlert message={error} />}
      {isLoading && <div className="alert alert-light py-2 mb-3">確認待ち情報を読み込み中です...</div>}
      {isSuccess && <div className="alert alert-success py-2 mb-3">再送しました。メールをご確認ください。</div>}
      <div className="alert alert-light border mb-3">
        <div className="small text-secondary mb-1">送信先メールアドレス</div>
        <div className="fw-semibold">{email}</div>
      </div>
      <form className="mb-3" onSubmit={onResend}>
        <button className="btn btn-primary w-100" type="submit" disabled={isLoading || isResending}>
          {isResending ? '再送信中...' : '確認メールを再送する'}
        </button>
      </form>
      <div className="d-flex gap-3 mt-3">
        <Link to="/" className="btn btn-outline-secondary">
          トップへ戻る
        </Link>
      </div>
    </div>
  );
};
