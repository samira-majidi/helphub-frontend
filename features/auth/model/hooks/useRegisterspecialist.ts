
import { useState } from 'react';

import { useAuthStore } from '@/session/useAuthStore';
import { RegisterPayload } from '../type';

import { registerSpecialistApi } from '../../api/registerSpecialistApi';

interface UseRegisterHostProps {
  onSuccess?: () => void;
}

export const useRegisterSpecialist  = ({ onSuccess }: UseRegisterHostProps = {}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const setToken = useAuthStore((state) => state.setToken);

  // تابع مستقل از رویدادهای DOM
  const registerSpecialist = async (payload: RegisterPayload) => {
    setLoading(true);
    setError(null);

    try {
      const response = await registerSpecialistApi(payload);
      
      const token = response.data.accesstoken;
      if (token) {
        setToken(token);
      }
      
      onSuccess?.();
      
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      const apiError = err?.response?.data?.message || err.message;
      setError(apiError || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return {
    registerSpecialist,
    loading,
    error,
    // در صورت نیاز به پاک کردن ارور به صورت دستی
    clearError: () => setError(null), 
  };
};
