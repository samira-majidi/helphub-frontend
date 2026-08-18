"use client";
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { RegisterPayload } from '../../model/type';
import { useRegisterSpecialist } from '../../model/hooks/useRegisterspecialist';

// ۱. تعریف قوانین اعتبارسنجی با Zod
const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  email: z.string().email('Invalid email address format'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[a-z]/, 'Must contain a lowercase letter')
    .regex(/[A-Z]/, 'Must contain an uppercase letter')
    .regex(/[0-9]/, 'Must contain a number'),
});

type RegisterFormData = z.infer<typeof registerSchema>;

// ✨ تغییر نام اینترفیس به Specialist
interface RegisterSpecialistFormProps {
  onSuccess?: (name: string) => void;
}
  
// ✨ تغییر نام اکسپورت به RegisterSpecialistForm تا کلاینت بتونه پیداش کنه
export const RegisterSpecialistForm = ({ onSuccess }: RegisterSpecialistFormProps) => {
  const [showPassword, setShowPassword] = useState(false);

  // ۲. راه‌اندازی React Hook Form
  const {
    register,
    handleSubmit,
    getValues, 
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    mode: 'onTouched',
  });

  const { registerSpecialist, loading, error: apiError } = useRegisterSpecialist({
    onSuccess: () => {
      console.log('Specialist registered successfully!');
      if (onSuccess) {
        const specialistName = getValues('name');
        onSuccess(specialistName);
      }
    },
  });

  // ۳. هندل کردن سابمیت
  const onSubmit = async (data: RegisterPayload) => {
    // 🔴 در اینجا نام تابع اصلاح شد
    await registerSpecialist(data);
  };

  return (
    <div className="flex flex-col w-full bg-transparent lg:bg-white p-0 lg:px-9 lg:py-8 rounded-none lg:rounded-3xl shadow-none lg:shadow-[0_8px_30px_rgb(0,0,0,0.04)] border-none lg:border lg:border-gray-100 transform scale-90 origin-top">
      
      {/* هدر فرم */}
      <div className="text-center mb-5 lg:mb-7 mt-2 lg:mt-0">
        <h2 className="text-xl lg:text-[26px] font-semibold text-gray-800 mb-1.5 lg:mb-2">Become a Specialist</h2>
        <p className="text-gray-500 text-[12px] lg:text-[15px]">Register your account to start earning</p>
      </div>

      {/* ارور مربوط به API */}
      {apiError && (
        <div className="bg-red-50 text-red-600 p-2.5 lg:p-3.5 rounded-xl mb-3 lg:mb-4 text-[13px] lg:text-[15px] text-center">
          {apiError}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3.5 lg:gap-5">
        
        {/* فیلد First Name */}
        <div>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
              <svg className="h-4 w-4 lg:h-[20px] lg:w-[20px] text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <input
              {...register('name')}
              placeholder="First Name"
              className={`w-full pl-10 lg:pl-[50px] pr-3 lg:pr-5 py-2.5 lg:py-3.5 border rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none transition-colors bg-white/80 lg:bg-white text-[13px] lg:text-[15px] ${
                errors.name 
                  ? 'border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500' 
                  : 'border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500'
              }`}
            />
          </div>
          {errors.name && <p className="text-red-500 text-[11px] lg:text-[12px] mt-1 ml-1">{errors.name.message}</p>}
        </div>

        {/* فیلد Last Name */}
        <div>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
              <svg className="h-4 w-4 lg:h-[20px] lg:w-[20px] text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <input
              {...register('lastName')}
              placeholder="Last Name"
              className={`w-full pl-10 lg:pl-[50px] pr-3 lg:pr-5 py-2.5 lg:py-3.5 border rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none transition-colors bg-white/80 lg:bg-white text-[13px] lg:text-[15px] ${
                errors.lastName 
                  ? 'border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500' 
                  : 'border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500'
              }`}
            />
          </div>
          {errors.lastName && <p className="text-red-500 text-[11px] lg:text-[12px] mt-1 ml-1">{errors.lastName.message}</p>}
        </div>

        {/* فیلد Email */}
        <div>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
              <svg className="h-4 w-4 lg:h-[20px] lg:w-[20px] text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <input
              type="email"
              {...register('email')}
              placeholder="Email Address"
              className={`w-full pl-10 lg:pl-[50px] pr-3 lg:pr-5 py-2.5 lg:py-3.5 border rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none transition-colors bg-white/80 lg:bg-white text-[13px] lg:text-[15px] ${
                errors.email 
                  ? 'border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500' 
                  : 'border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500'
              }`}
            />
          </div>
          {errors.email && <p className="text-red-500 text-[11px] lg:text-[12px] mt-1 ml-1">{errors.email.message}</p>}
        </div>
        
        {/* فیلد Password */}
        <div>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
              <svg className="h-4 w-4 lg:h-[20px] lg:w-[20px] text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <input
              {...register('password')}
              type={showPassword ? "text" : "password"} 
              placeholder="Password"
              className={`w-full pl-10 lg:pl-[50px] pr-10 lg:pr-[50px] py-2.5 lg:py-3.5 border rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none transition-colors bg-white/80 lg:bg-white text-[13px] lg:text-[15px] ${
                errors.password 
                  ? 'border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500' 
                  : 'border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500'
              }`}
            />
            <div 
              className="absolute inset-y-0 right-0 pr-3.5 flex items-center cursor-pointer"
              onClick={() => setShowPassword(!showPassword)} 
            >
              {showPassword ? (
                <svg className="h-4 w-4 lg:h-[20px] lg:w-[20px] text-gray-400 hover:text-gray-600 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                </svg>
              ) : (
                <svg className="h-4 w-4 lg:h-[20px] lg:w-[20px] text-gray-400 hover:text-gray-600 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              )}
            </div>
          </div>
          {errors.password && <p className="text-red-500 text-[11px] lg:text-[12px] mt-1 ml-1">{errors.password.message}</p>}
        </div>

        {/* دکمه ثبت‌نام */}
        <button 
          type="submit" 
          disabled={loading}
          className="w-full mt-2.5 lg:mt-3 bg-[#0A58CA] text-white font-medium py-2.5 lg:py-3.5 rounded-xl hover:bg-blue-700 transition-colors disabled:bg-blue-300 shadow-sm text-[13.5px] lg:text-[16px]"
        >
          {loading ? 'Registering...' : 'Register as Specialist'}
        </button>

        {/* متن امنیتی */}
        <div className="mt-4 flex items-center justify-center gap-1.5 lg:gap-2 text-emerald-500">
          <svg className="w-3.5 h-3.5 lg:w-[18px] lg:h-[18px]" fill="currentColor" viewBox="0 0 20 20">
             <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          <span className="text-[11px] lg:text-[13px] font-medium tracking-wide">Your data is secure with us</span>
        </div>

      </form>
    </div>
  );
};
