
import { useCallback,useState } from 'react';

import { useAuthStore } from '@/session/useAuthStore';


import { signInApi } from '../api/signIn';
import { SignInPayload } from '../model/type';

interface UseSignInProps {
  onSuccess?: () => void;
}

export const useSignIn = ({ onSuccess }: UseSignInProps = {}) => {
  const initialForm: SignInPayload = {
    email: '',
    password: '',
  };

  const [formData, setFormData] = useState<SignInPayload>(initialForm);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const setToken = useAuthStore((state) => state.setToken);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }, []);

  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.email.includes('@')) {
      return setError('Invalid email address.');
    }
    if (!formData.password) {
      return setError('Please enter your password.');
    }

    setLoading(true);
    setError(null);

    try {
      const response = await signInApi(formData);
      
      const token = response.data?.accesstoken;

      if (!token) {
        throw new Error('No token received from the server!');
      }

      setToken(token);
      onSuccess?.();
      
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      const apiError = err?.response?.data?.message || err.message;
      setError(apiError || 'Sign-in failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return {
    formData,
    loading,
    error,
    handleChange,
    handleSignIn,
    resetForm: () => setFormData(initialForm),
  };
};
