// features/auth/ui/SignUpForm.tsx

'use client';

import { useSignUp } from "../model/useSignUp";

interface SignUpFormProps {
  onSuccess?: () => void;
}

export const SignUpForm = ({ onSuccess }: SignUpFormProps) => {
  const { formData, loading, error, handleChange, handleSignUp } = useSignUp({
    onSuccess,
  });

  return (
    <div className="sign-up-container">
      <h2>ساخت حساب کاربری</h2>

      {error && <div style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}

      <form
        onSubmit={handleSignUp}
        style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}
      >
        <input
          type="text"
          name="name"
          placeholder="نام"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="lastName"
          placeholder="نام خانوادگی"
          value={formData.lastName}
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="ایمیل"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="رمز عبور"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? 'در حال ثبت‌نام...' : 'ثبت‌نام'}
        </button>
      </form>
    </div>
  );
};
