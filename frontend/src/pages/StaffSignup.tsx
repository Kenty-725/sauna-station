import { StaffSignupForm } from '../components/staff/StaffSignupForm';
import '../styles/signup.css';

export const StaffSignup = () => {

  return (
    <div className="signup-wrapper">
      <div className="container-fluid px-0">
        <div className="row g-0 min-vh-100">
          <div className="col-lg-6 signup-hero d-flex">
            <div className="signup-hero-content">
              <h2 className="fw-bold display-6 mb-3">
                至高のととのいを、
                <br />
                共に創造しましょう。
              </h2>
              <p className="text-white-50 mb-0">
                SaunaReserveは、施設運営の効率化と、ゲストへの最高のエクスペリエンス提供を支援します。
              </p>
            </div>
          </div>
          <div className="col-lg-6 signup-right d-flex align-items-center justify-content-center py-4">
            <StaffSignupForm />
          </div>
        </div>
      </div>
    </div>
  );
};
