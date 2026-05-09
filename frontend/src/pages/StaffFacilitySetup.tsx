import { FacilitySetupForm } from '../components/staff/FacilitySetupForm';
import '../styles/signup.css';

export const StaffFacilitySetup = () => {
  return (
    <div className="signup-wrapper">
      <div className="container-fluid px-0">
        <div className="row g-0 min-vh-100">
          <div className="col-lg-6 signup-hero d-flex">
            <div className="signup-hero-content">
              <h2 className="fw-bold display-6 mb-3">
                はじめの施設情報を、
                <br />
                正しく登録する。
              </h2>
              <p className="text-white-50 mb-0">
                この情報は管理者アカウントに紐づく最初の施設として保存されます。
              </p>
            </div>
          </div>
          <div className="col-lg-6 signup-right d-flex align-items-center justify-content-center py-4">
            <FacilitySetupForm />
          </div>
        </div>
      </div>
    </div>
  );
};
