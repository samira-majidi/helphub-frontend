'use client';

import { useSignIn } from "../model/useSingIn";

interface SignInFormProps {
  onSuccess?: () => void;
}

export const SignInForm = ({ onSuccess }: SignInFormProps) => {
  const { formData, loading, error, handleChange, handleSignIn } = useSignIn({
    onSuccess,
  });

  return (
    <div className="flex flex-col w-full bg-transparent lg:bg-white p-0 lg:px-9 lg:py-8 rounded-none lg:rounded-3xl shadow-none lg:shadow-[0_8px_30px_rgb(0,0,0,0.04)] border-none lg:border lg:border-gray-100">
      
      {/* هدر فرم */}
      <div className="text-center mb-5 lg:mb-7 mt-2 lg:mt-0">
        <h2 className="text-xl lg:text-[26px] font-semibold text-gray-800 mb-1.5 lg:mb-2">Welcome back</h2>
        <p className="text-gray-500 text-[12px] lg:text-[15px]">Sign in to continue to your account</p>
      </div>

      {error && (
        <div className="bg-red-50 text-red-600 p-2.5 lg:p-3.5 rounded-xl mb-3 lg:mb-4 text-[13px] lg:text-[15px] text-center">
          {error}
        </div>
      )}

      <form onSubmit={handleSignIn} className="flex flex-col gap-3.5 lg:gap-5">
        
        {/* فیلد ایمیل */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
            <svg className="h-4 w-4 lg:h-[20px] lg:w-[20px] text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full pl-10 lg:pl-[50px] pr-3 lg:pr-5 py-2.5 lg:py-3.5 border border-gray-200 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors bg-white/80 lg:bg-white text-[13px] lg:text-[15px]"
          />
        </div>

        {/* فیلد پسورد */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
            <svg className="h-4 w-4 lg:h-[20px] lg:w-[20px] text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full pl-10 lg:pl-[50px] pr-10 lg:pr-[50px] py-2.5 lg:py-3.5 border border-gray-200 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors bg-white/80 lg:bg-white text-[13px] lg:text-[15px]"
          />
          <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center cursor-pointer">
            <svg className="h-4 w-4 lg:h-[20px] lg:w-[20px] text-gray-400 hover:text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          </div>
        </div>

        {/* چک‌باکس و فراموشی رمز */}
        <div className="flex items-center justify-between mt-1 lg:mt-2">
          <label className="flex items-center cursor-pointer group">
            <input type="checkbox" className="w-3.5 h-3.5 lg:w-4 lg:h-4 rounded text-emerald-500 border-gray-300 focus:ring-emerald-500 focus:ring-offset-0 bg-white" />
            <span className="ml-2 text-[11.5px] lg:text-[14px] text-gray-600 group-hover:text-gray-900 transition-colors">Remember me</span>
          </label>
          <a href="#" className="text-[11.5px] lg:text-[14px] text-gray-500 hover:text-blue-600 transition-colors">
            Forgot Password?
          </a>
        </div>

        {/* دکمه ورود */}
        <button 
          type="submit" 
          disabled={loading}
          className="w-full mt-2.5 lg:mt-3 bg-[#0A58CA] text-white font-medium py-2.5 lg:py-3.5 rounded-xl hover:bg-blue-700 transition-colors disabled:bg-blue-300 shadow-sm text-[13.5px] lg:text-[16px]"
        >
          {loading ? 'Signing In...' : 'Sign In'}
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
