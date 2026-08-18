'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

// ایمپورت صحیح و کامل با مسیر نسبی
import { RegisterSpecialistForm } from './RegisterSpecialistForm';

export default function RegisterSpecialistClient() {
  const router = useRouter();
  const [isNavigating, setIsNavigating] = useState(false);

  const handleGoHome = () => {
    setIsNavigating(true);
    setTimeout(() => {
      router.push('/');
    }, 500);
  };

  const handleRegisterSuccess = () => {
    setIsNavigating(true);
    setTimeout(() => {
      router.push('/');
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
          src="/heroregister.webp"
          alt="Professional working"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/50 lg:hidden"></div>
        <div className="hidden lg:block absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-[#F8F8F7]"></div>
        
        {/* متون روی تصویر */}
        <div className="hidden lg:block absolute bottom-[15%] left-16 max-w-lg z-10">
          <div className="mb-6">
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
          
          <div className="text-white/95 max-w-md">
            <h2 className="font-light tracking-wide text-white text-2xl lg:text-3xl leading-tight mb-5">
              Join as a <span className="font-semibold">Specialist</span>
            </h2>
            <p className="font-light tracking-wider text-white/90 text-xl leading-relaxed border-l border-white/20 pl-4">
              Turn your skills into income. Connect with clients and grow your independent business today.
            </p>
          </div>
        </div>
      </div>

      {/* بخش فرم */}
      <div className="relative z-10 w-full lg:w-2/5 flex items-center justify-center p-5 lg:p-8">
        <div 
          className="w-full max-w-[350px] lg:max-w-[440px] bg-white/95 lg:bg-transparent backdrop-blur-md lg:backdrop-blur-none p-6 lg:p-0 rounded-3xl lg:rounded-none shadow-2xl lg:shadow-none"
        >
          <RegisterSpecialistForm onSuccess={handleRegisterSuccess} />
          
          <p className="text-center text-sm mt-6 text-gray-600">
            Already have an account?{' '}
            <Link href="/sign-in" className="text-[#0A58CA] font-semibold hover:underline">
              Sign in
            </Link>
          </p>

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
    </div>
  );
}
