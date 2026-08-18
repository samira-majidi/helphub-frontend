'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { SignUpForm } from '@/features/auth/ui/signupForm';



export default function SignUpPage() {
  const router = useRouter();
  const [isNavigating, setIsNavigating] = useState(false);

  const handleGoHome = () => {
    setIsNavigating(true);
    setTimeout(() => {
      router.push('/');
    }, 500);
  };
    // ۱. این تابع جدید رو برای لاگین موفق اضافه کن
  const handleSignInSuccess = () => {
    setIsNavigating(true);
    setTimeout(() => {
      router.push('/'); // یا داشبورد، هر مسیری که بعد از لاگین باید بره
    }, 500);
  };

  return (
    <div 
      className={`fixed inset-0 z-[100] h-screen flex flex-col lg:flex-row bg-[#F8F8F7] transition-opacity duration-500 overflow-y-auto lg:overflow-hidden ${
        isNavigating ? 'opacity-0' : 'opacity-100'
      }`}
    >
      {/* بخش تصویر */}
      <div className="absolute inset-0 z-0 lg:relative lg:w-3/5 lg:block">
        <Image
          src="/herroSignIn.webp"
          alt="Luxury Hotel Room"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/50 lg:hidden"></div>
        <div className="hidden lg:block absolute inset-0 bg-gradient-to-r from-black/40 via-black/10 to-[#F8F8F7]"></div>
        
        {/* متن روی تصویر (فقط دسکتاپ) */}
        <div className="hidden lg:block absolute bottom-[15%] left-16 max-w-lg z-10">
          <div className="mb-6 animate-[slideUp_0.8s_ease-out]">
            <button
              onClick={handleGoHome}
              className="group flex items-center gap-2 px-5 py-2 rounded-full bg-[#0A58CA] text-white hover:bg-blue-700 transition-all duration-300 font-medium shadow-lg w-fit"
            >
              <svg className="w-4 h-4 transform transition-transform duration-300 group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M7 16l-4-4m0 0l4-4m-4 4h18"></path>
              </svg>
              <span className="text-[14px] tracking-wide">Back to Home</span>
            </button>
          </div>
          
                   <p className="text-white/95 max-w-md animate-[slideUp_1s_ease-out]">
            <span className="block font-light tracking-wider text-white/90 text-xl lg:text-[26px] leading-relaxed">
              Discover a refined stay designed around your comfort.
            </span>
            {/* اگه خواستی یه خط تزئینی کوچیک و لوکس هم زیرش باشه اینو اضافه کن، خیلی شیکش می‌کنه: */}
            <span className="block w-12 h-[1px] bg-white/40 mt-5"></span>
          </p>

        </div>
      </div>

      {/* بخش فرم */}
      <div className="relative z-10 w-full h-full lg:w-2/5 flex items-center justify-center p-5 lg:p-8">

        {/* عرض فرم اینجا کنترل شده تا در موبایل و لپ‌تاپ بیش از حد پهن نشه */}
        <div className="w-full max-w-[350px] lg:max-w-[440px] bg-white/95 lg:bg-transparent backdrop-blur-md lg:backdrop-blur-none p-6 lg:p-0 rounded-3xl lg:rounded-none shadow-2xl lg:shadow-none animate-[scaleIn_0.5s_ease-out]">
          
        
           <SignUpForm onSuccess={handleSignInSuccess} />

          {/* دکمه بازگشت به خانه در موبایل */}
          <div className="mt-5 flex justify-center lg:hidden">
            <button
              onClick={handleGoHome}
              className="group flex items-center gap-1.5 text-gray-500 hover:text-[#0A58CA] transition-colors duration-300 font-medium"
            >
              <svg className="w-4 h-4 transform transition-transform duration-300 group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M7 16l-4-4m0 0l4-4m-4 4h18"></path>
              </svg>
              <span className="text-[13px] tracking-wide">Back to Home</span>
            </button>
          </div>

        </div>
      </div>

      <style jsx global>{`
        @keyframes scaleIn {
          from { transform: scale(0.95); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        @keyframes slideUp {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
      `}</style>
    </div>
  );
}
