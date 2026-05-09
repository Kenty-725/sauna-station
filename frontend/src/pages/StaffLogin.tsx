import { StaffLoginForm } from '../components/staff/StaffLoginForm';
import '../styles/signup.css';

export const StaffLogin = () => {
  return (
    <div className="signup-wrapper">
      <div className="container-fluid px-0">
        <div className="row g-0 min-vh-100">
          <div className="col-lg-6 signup-hero d-flex">
            <div className="signup-hero-content">
              <h2 className="fw-bold display-6 mb-3">
                運営の起点を、
                <br />
                ここから整える。
              </h2>
              <p className="text-white-50 mb-0">
                ログイン後、施設未設定の管理者はそのまま施設作成フローへ進めます。
              </p>
            </div>
          </div>
          <div className="col-lg-6 signup-right d-flex align-items-center justify-content-center py-4">
            <StaffLoginForm />
          </div>
        </div>
      </div>
    </div>
  );
};
