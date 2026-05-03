import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchCurrentStaff, StaffApiError, type CurrentStaff } from '../api/staff';

type GuardState = {
  isLoading: boolean;
  isReady: boolean;
  staff: CurrentStaff | null;
};

type GuardOptions = {
  requireFacilitySetup?: boolean;
};

export const useStaffRouteGuard = (options: GuardOptions = {}) => {
  const navigate = useNavigate();
  const [state, setState] = useState<GuardState>({
    isLoading: true,
    isReady: false,
    staff: null,
  });

  useEffect(() => {
    let isActive = true;

    const guard = async () => {
      try {
        const response = await fetchCurrentStaff();
        const staff = response.staff;

        if (options.requireFacilitySetup) {
          if (!staff.needs_facility_setup) {
            navigate('/', { replace: true });
            return;
          }
        } else if (staff.needs_facility_setup) {
          navigate('/staff/facility/setup', { replace: true });
          return;
        }

        if (isActive) {
          setState({
            isLoading: false,
            isReady: true,
            staff,
          });
        }
      } catch (err) {
        if (err instanceof StaffApiError && err.status === 401) {
          navigate('/staff/login', { replace: true });
          return;
        }

        if (isActive) {
          setState({
            isLoading: false,
            isReady: false,
            staff: null,
          });
        }
      }
    };

    guard();

    return () => {
      isActive = false;
    };
  }, [navigate, options.requireFacilitySetup]);

  return state;
};
