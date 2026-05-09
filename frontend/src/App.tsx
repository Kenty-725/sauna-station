import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { StaffRouteGuard } from './components/staff/StaffRouteGuard';
import { MainLayout } from './layouts/MainLayout';
import { Home } from './pages/Home';
import { StaffSignup } from './pages/StaffSignup';
import { StaffSignupSent } from './pages/StaffSignupSent';
import { BlankLayout } from './layouts/BlankLayout';
import { StaffLogin } from './pages/StaffLogin';
import { StaffFacilitySetup } from './pages/StaffFacilitySetup';

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/staff/signup"
          element={
            <BlankLayout>
              <StaffSignup />
            </BlankLayout>
          }
        />
        <Route
          path="/staff/signup/sent"
          element={
            <BlankLayout>
              <StaffSignupSent />
            </BlankLayout>
          }
        />
        <Route
          path="/staff/login"
          element={
            <BlankLayout>
              <StaffLogin />
            </BlankLayout>
          }
        />
        <Route
          path="/staff/facility/setup"
          element={
            <StaffRouteGuard requireFacilitySetup>
              <BlankLayout>
                <StaffFacilitySetup />
              </BlankLayout>
            </StaffRouteGuard>
          }
        />
        <Route
          path="/"
          element={
            <StaffRouteGuard>
              <MainLayout>
                <Home />
              </MainLayout>
            </StaffRouteGuard>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};
