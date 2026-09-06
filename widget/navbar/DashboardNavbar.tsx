'use client';

import { User } from 'lucide-react';
import Logo from '@/shared/ui/Logo';
import { useIsLoggedIn } from '@/features/auth/hooks/useIsLoggedIn';
import ChatNavButton from '@/shared/ui/ChatNavButton';
import Link from 'next/link';

export default function DashboardNavbar() {
  const { name} = useIsLoggedIn();

  const displayName = name || 'کاربر عزیز';

  const initial =
    (name)?.charAt(0).toUpperCase() || null;

  return (
    <header className="w-full bg-[#0A1E3F] text-white relative z-50">
      <div className="max-w-7xl mx-auto px-6 sm:px-5 lg:px-15">
        <div className="flex justify-between items-center h-[65px]">

          <Logo />

          <div className="flex items-center gap-3">
              <Link href="/chats">
                    <ChatNavButton />
                  </Link>
        

            <div className="flex items-center gap-2 bg-white/10 pl-2 pr-4 py-1.5 rounded-full border border-white/20">
              <div className="w-8 h-8 rounded-full bg-[#FACC15] text-[#0A1E3F] flex items-center justify-center font-bold text-sm">
                {initial ? (
                  initial
                ) : (
                  <User size={16} strokeWidth={2.5} />
                )}
              </div>

              <span className="text-sm font-semibold text-white max-w-[150px] truncate">
                {displayName}
              </span>
             

            </div> 
          
          </div>

        </div>
      </div>
    </header>
  );
}