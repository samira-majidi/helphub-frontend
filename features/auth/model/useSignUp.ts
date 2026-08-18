import { useCallback, useState } from 'react';
import { RegisterPayload } from './type';
import { registerUserApi } from '../api/registerUser';

interface UseSignUpProps {
  onSuccess?: () => void;
}

export const useSignUp = ({ onSuccess }: UseSignUpProps = {}) => {
  const initialForm: RegisterPayload = {
    name: '',
    lastName: '',
    email: '',
    password: '',
  };

  const [formData, setFormData] = useState<RegisterPayload>(initialForm);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }, []);

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // اعتبارسنجی اولیه
    if (!formData.email.includes('@')) {
      return setError('Invalid email address.');
    }

    setLoading(true);
    setError(null);

    try {
      // فقط درخواست ثبت‌نام رو می‌فرستیم، نیازی به دریافت و چک کردن توکن نیست
      await registerUserApi(formData);
      
      // در صورت موفقیت‌، تابع onSuccess صدا زده میشه تا کاربر بره صفحه بعد (یا لاگین)
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
    formData,
    loading,
    error,
    handleChange,
    handleSignUp,
    resetForm: () => setFormData(initialForm)
  };
};
