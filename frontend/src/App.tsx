import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { MainLayout } from './layouts/MainLayout';
import { Home } from './pages/Home';
import { StaffSignup } from './pages/StaffSignup';
import { StaffSignupSent } from './pages/StaffSignupSent';
import { BlankLayout } from './layouts/BlankLayout';

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/staff/signup/*"
          element={
            <BlankLayout>
              <Routes>
                <Route path="" element={<StaffSignup />} />
                <Route path="sent" element={<StaffSignupSent />} />
              </Routes>
            </BlankLayout>
          }
        />
        <Route
          path="/*"
          element={
            <MainLayout>
              <Routes>
                <Route path="/" element={<Home />} />
              </Routes>
            </MainLayout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};
