import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import OnboardingPage from "./pages/OnboardingPage";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/staff/login" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/onboarding" element={<OnboardingPage />} />
      </Routes>
    </Router>
  );
}

export default App;
