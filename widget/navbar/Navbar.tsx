'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation'; 
import { ChevronDown, Menu, X, User } from 'lucide-react'; 
import Logo from '@/shared/ui/Logo';
import ChatNavButton from '@/shared/ui/ChatNavButton';



interface NavbarProps {
  isLoggedIn?: boolean;
  email?: string | null;
  name?: string | null; 
}

const Navbar = ({ isLoggedIn = false, email = null ,name = null }: NavbarProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname(); 

  if (pathname === '/sign-up') {
    return null; 
  }

  const displayName = name || email || "User";
  const initial = (name || email)?.charAt(0).toUpperCase() || null; 

  return (
    <>
      <header className="w-full bg-[#0A1E3F] text-white relative z-50 ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-[65px]">
            
            <Logo />

            {/* لینک‌های وسط */}
            <nav className="hidden lg:flex items-center gap-8">
              <Link href="/services"   prefetch={false} className="flex items-center gap-1 text-sm font-medium hover:text-[#FACC15] transition-colors">
                Find Services <ChevronDown className="w-4 h-4 text-gray-400" />
              </Link>
              <Link href="/professionals"   prefetch={false} className="flex items-center gap-1 text-sm font-medium hover:text-[#FACC15] transition-colors">
                For Professionals <ChevronDown className="w-4 h-4 text-gray-400" />
              </Link>
              <Link href="/how-it-works" className="text-sm font-medium hover:text-[#FACC15] transition-colors">
                How It Works
              </Link>
            </nav>

            {/* دکمه‌های سمت راست - دسکتاپ */}
            <div className="hidden lg:flex items-center gap-5">
              {isLoggedIn ? (
                // 🥇 حالت لاگین شده (دسکتاپ)
                <>
                  {/* ۲. اضافه شدن دکمه چت برای دسکتاپ */}
                  <Link href="/chat">
                    <ChatNavButton />
                  </Link>

                  <div className="flex items-center gap-3 bg-white/5 pl-2 pr-4 py-1.5 rounded-full border border-white/10 transition-all hover:bg-white/10 cursor-pointer">
                    <div className="w-9 h-9 rounded-full bg-[#FACC15] text-[#0A1E3F] flex items-center justify-center font-bold shadow-sm">
                      {initial ? initial : <User size={18} strokeWidth={2.5} />}
                    </div>
                  <span className="text-sm font-semibold text-white max-w-[150px] truncate">
                      {displayName}
                    </span>
                  </div>
                </>
              ) : (
                // 🚪 حالت مهمان (دسکتاپ)
                <>
                  <Link href="/sign-up" className="text-sm font-semibold text-[#FACC15] hover:text-yellow-400 transition-colors">
                    Sign Up
                  </Link>
                  <Link 
                    href="/sign-up" 
                    className="bg-[#FACC15] text-[#0A1E3F] px-6 py-2.5 rounded-md text-sm font-bold shadow-sm hover:bg-yellow-500 transition-colors"
                  >
                    Join HelpHub
                  </Link>
                </>
              )}
            </div>

            {/* همبرگر منو و دکمه چت موبایل */}
            <div className="flex items-center gap-2 lg:hidden">
              {/* ۳. اضافه شدن دکمه چت برای موبایل (کنار همبرگر منو) */}
              {isLoggedIn && (
                <Link href="/chats">
                  <ChatNavButton />
                </Link>
              )}
              
              <button 
                onClick={() => setIsMobileMenuOpen(true)}
                className="p-2 text-white hover:text-[#FACC15] transition-colors"
              >
                <Menu className="w-7 h-7" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* --- منوی موبایل --- */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/60 z-[60] lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      <div 
        className={`fixed top-0 right-0 h-full w-[80%] max-w-sm bg-[#0A1E3F] z-[70] transform transition-transform duration-300 ease-in-out lg:hidden flex flex-col ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex justify-between items-center p-5 border-b border-white/10">
          <Logo />
          <button 
            onClick={() => setIsMobileMenuOpen(false)}
            className="p-2 text-white hover:text-[#FACC15] transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex flex-col px-5 py-6 gap-6 overflow-y-auto">
      
          
          <hr className="border-white/10 my-2" />

          <div className="flex flex-col gap-4 mt-2">
            {isLoggedIn ? (
              // 🥇 حالت لاگین شده (موبایل): پروفایل
              <div className="flex items-center gap-3 p-4 bg-white/5 rounded-md border border-white/10 mb-2">
                <div className="w-12 h-12 rounded-full bg-[#FACC15] text-[#0A1E3F] flex items-center justify-center font-bold text-lg shadow-sm shrink-0">
                  {initial ? initial : <User size={24} strokeWidth={2.5} />}
                </div>
                <div className="flex flex-col overflow-hidden">
                  <span className="text-xs text-gray-400">Welcome</span>
                  <span className="text-sm font-semibold text-white truncate">
                    {email || "User"}
                  </span>
                </div>
              </div>
            ) : (
              // 🚪 حالت مهمان (موبایل)
              <>
                <Link href="/sign-up" onClick={() => setIsMobileMenuOpen(false)} className="w-full py-3 text-center text-white border border-white/20 rounded-md font-semibold">
                  Log In
                </Link>
                <Link href="/sign-up" onClick={() => setIsMobileMenuOpen(false)} className="w-full py-3 text-center text-[#FACC15] border border-[#FACC15]/30 rounded-md font-semibold">
                  Sign Up
                </Link>
                <Link href="/sign-up" onClick={() => setIsMobileMenuOpen(false)} className="w-full py-3 text-center bg-[#FACC15] text-[#0A1E3F] rounded-md font-bold shadow-sm hover:bg-yellow-500">
                  Join HelpHub
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
