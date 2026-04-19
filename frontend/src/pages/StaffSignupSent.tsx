import { Navigate } from 'react-router-dom';
import { StaffSignupSentContent } from '../components/staff/StaffSignupSentContent';
import { useStaffSignupSent } from '../hooks/useStaffSignupSent';

export const StaffSignupSent = () => {
  const { state, resend } = useStaffSignupSent();

  if (state.shouldRedirect) {
    return <Navigate to="/staff/signup" replace />;
  }

  return <StaffSignupSentContent
    email={state.email}
    error={state.error}
    isLoading={state.isLoading}
    isResending={state.isResending}
    isSuccess={state.isSuccess}
    onResend={resend}
  />;
};
