import { useState } from 'react';

import { registerUserApi } from '../api/registerUser'; 
import { RegisterPayload } from '../model/type';
import { useAuthStore } from '@/session/useAuthStore';

interface UseSignUpProps {
  onSuccess?: () => void;
}

export const useSignUp = ({ onSuccess }: UseSignUpProps = {}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
    const setToken = useAuthStore((state) => state.setToken);

  const signUpUser = async (payload: RegisterPayload) => {
    setLoading(true);
    setError(null);

 try {
     
      const response = await registerUserApi(payload);
     
    
      const token = response.data?.accesstoken;
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
    signUpUser, 
    loading,
    error,
    clearError: () => setError(null)
  };
};
