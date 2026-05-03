import type { ReactNode } from 'react';
import { useStaffRouteGuard } from '../../hooks/useStaffRouteGuard';

type StaffRouteGuardProps = {
  children: ReactNode;
  requireFacilitySetup?: boolean;
};

export const StaffRouteGuard = ({ children, requireFacilitySetup = false }: StaffRouteGuardProps) => {
  const { isLoading, isReady } = useStaffRouteGuard({ requireFacilitySetup });

  if (isLoading) {
    return <div className="d-flex align-items-center justify-content-center min-vh-100">Loading...</div>;
  }

  if (!isReady) {
    return null;
  }

  return <>{children}</>;
};
