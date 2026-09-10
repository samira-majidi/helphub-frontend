'use client';

import { useState } from 'react';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { useSignIn } from '../hooks/useSingIn';
interface SignInFormProps {
  onSuccess?: () => void;
}

export const SignInForm = ({ onSuccess }: SignInFormProps) => {
  const { formData, loading, error, handleChange, handleSignIn } = useSignIn({
    onSuccess,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  return (
    <div className="flex flex-col w-full bg-transparent p-0">
      
  
      <div className="text-center mb-6">
        <h2 className="text-white text-[26px] font-semibold mb-2">Welcome back</h2>
        <p className="text-[#94A3B8] text-[15px]">Sign in to continue to your account</p>
      </div>

      {error && (
        <div className="bg-red-500/10 border border-red-500/50 text-red-500 p-2.5 rounded-xl mb-4 text-[13px] text-center">
          {error}
        </div>
      )}

      <form onSubmit={handleSignIn} className="flex flex-col gap-4">
        
   
        <div className="flex flex-col gap-1.5">
          <label className="text-white text-[13px] font-semibold">Email</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
              <Mail size={16} className="text-[#64748B]" />
            </div>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Enter your email"
              className="w-full pl-9 pr-3 py-2.5 border border-white/10 rounded-xl text-white placeholder-[#64748B] focus:outline-none focus:border-yellow-400 transition-all duration-300 bg-white/[0.02] backdrop-blur-md hover:bg-white/[0.04] focus:bg-white/[0.06] shadow-[0_4px_16px_rgba(0,0,0,0.1)] text-[14px]"
            />
          </div>
        </div>

    
        <div className="flex flex-col gap-1.5">
          <label className="text-white text-[13px] font-semibold">Password</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
              <Lock size={16} className="text-[#64748B]" />
            </div>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="Enter your password"
              className="w-full pl-9 pr-10 py-2.5 border border-white/10 rounded-xl text-white placeholder-[#64748B] focus:outline-none focus:border-yellow-400 transition-all duration-300 bg-white/[0.02] backdrop-blur-md hover:bg-white/[0.04] focus:bg-white/[0.06] shadow-[0_4px_16px_rgba(0,0,0,0.1)] text-[14px]"
            />
            <div 
              className="absolute inset-y-0 right-0 pr-3.5 flex items-center cursor-pointer text-[#64748B] hover:text-yellow-400 transition-colors" 
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </div>
          </div>
        </div>

      
        <div className="flex items-center justify-between mt-1">
          <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => setRememberMe(!rememberMe)}>
            <div className={`w-8 h-[18px] rounded-full flex items-center p-0.5 transition-colors ${rememberMe ? 'bg-yellow-400' : 'bg-gray-600'}`}>
              <div className={`w-[14px] h-[14px] bg-white rounded-full transition-transform ${rememberMe ? 'translate-x-[14px]' : 'translate-x-0'}`} />
            </div>
            <span className="text-[#94A3B8] text-[13px]">Remember me</span>
          </div>
          <a href="#" className="text-yellow-400 text-[13px] hover:text-yellow-300 transition-colors">Forgot password?</a>
        </div>

       
        <button 
          type="submit" 
          disabled={loading}
          className="w-full mt-2 bg-yellow-400 text-[#070D1F] font-bold py-3 rounded-xl hover:bg-yellow-500 transition-all disabled:opacity-50 shadow-[0_0_15px_rgba(250,204,21,0.2)] text-[15px]"
        >
          {loading ? 'Processing...' : 'Sign In'}
        </button>

      </form>

  
      <div className="relative mt-6 mb-5">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-white/10"></div>
        </div>
        <div className="relative flex justify-center text-[13px]">
          <span className="px-3 bg-[#070D1F] text-[#64748B]">or continue with</span>
        </div>
      </div>

  
      <div className="flex gap-3">
        <button type="button" className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl border border-white/10 bg-transparent hover:bg-white/5 transition-colors text-white text-[14px] font-medium">
          <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          Google
        </button>
        <button type="button" className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl border border-white/10 bg-transparent hover:bg-white/5 transition-colors text-white text-[14px] font-medium">
          <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24" fill="currentColor">
            <path d="M16.365,21.444c-1.467,0-2.222-0.667-4.044-0.667c-1.733,0-2.8,0.711-4.133,0.711c-1.467,0-3.378-1.556-4.667-3.467C1.467,15.022,0.933,10.844,2.889,8c0.978-1.422,2.444-2.222,4-2.222c1.733,0,2.889,0.756,3.956,0.756c1.111,0,2.489-0.889,4.222-0.889c1.644,0,3.156,0.844,4,2.222c-3.022,1.822-2.578,6.222,0.667,7.689C18.676,18.044,17.209,21.444,16.365,21.444z M14.232,5.289c0.756-0.889,1.156-2.178,0.978-3.378c-1.022,0.089-2.311,0.711-3.067,1.556c-0.667,0.756-1.2,1.911-1.022,3.156C12.276,6.711,13.432,6.133,14.232,5.289z"/>
          </svg>
          Apple
        </button>
      </div>

    </div>
  );
};
