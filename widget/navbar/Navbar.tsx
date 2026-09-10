'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname} from 'next/navigation'; 
import { ChevronDown, Menu, X, User } from 'lucide-react'; 
import Logo from '@/shared/ui/Logo';
import ChatNavButton from '@/shared/ui/ChatNavButton';
import { useIsLoggedIn } from '@/features/auth/hooks/useIsLoggedIn';
import { BecomeExpertModal } from '@/shared/ui/BecomeExpertModal';
import DashboardNavbar from './DashboardNavbar';



interface NavbarProps {
  isLoggedIn?: boolean;
  email?: string | null;
  name?: string | null; 
}

const Navbar = ({ isLoggedIn = false, email = null ,name = null }: NavbarProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname(); 
 const { isExpert } = useIsLoggedIn();
  const [isModalOpen, setIsModalOpen] = useState(false);
   
    if (pathname === '/sign-up' || pathname.startsWith('/chat')) {
    return null; 
  }
    if (pathname === '/dashboard-expert') {
    return <DashboardNavbar />;
  }

   

  const displayName = name || email || "User";
  const initial = (name || email)?.charAt(0).toUpperCase() || null; 
 const handleProfessionalClick = (e: React.MouseEvent) => {
    if (!isExpert) {
      e.preventDefault();
      setIsModalOpen(true); 
    }
  };
  return (
    <>
      <header className="w-full bg-[#0A1E3F] text-white relative z-50 ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-[65px]">
            
            <Logo />

    
            <nav className="hidden lg:flex items-center gap-8">
           <button
  type="button"
  disabled
  className="flex items-center text-sm font-medium text-white/40 cursor-not-allowed"
>
  <span>Find Services</span>
</button>

             <Link 
            href="/dashboard-expert" 
            onClick={handleProfessionalClick}
            prefetch={false}
            className="flex items-center gap-1 text-sm font-medium hover:text-[#FACC15] transition-colors"
          >
               {isExpert ? 'My Dashboard' : 'For Professionals'}


          </Link>
             <button
  type="button"
  disabled
  className="flex items-center text-sm font-medium text-white/40 cursor-not-allowed"
>
  <span>How It Works</span>
</button>
            </nav>

          
            <div className="hidden lg:flex items-center gap-5">
              {isLoggedIn ? (
              
                <>
         
                  <Link href="/chats">
                    <ChatNavButton />
                  </Link>

                   <div className="relative group flex items-center gap-3 bg-white/5 pl-2 pr-4 py-1.5 rounded-full border border-white/10 transition-all hover:bg-white/10 cursor-pointer">
  <div className="w-9 h-9 rounded-full bg-[#FACC15] text-[#0A1E3F] flex items-center justify-center font-bold shadow-sm">
    {initial ? initial : <User size={18} strokeWidth={2.5} />}
  </div>

  <span className="text-sm font-semibold text-white max-w-[150px] truncate">
    {displayName}
  </span>

  {/* Email tooltip */}
  <div className="absolute right-0 top-full mt-2 hidden group-hover:block z-[100]">
    <div className="bg-white text-[#0A1E3F] rounded-lg shadow-lg border border-gray-100 px-4 py-3 min-w-[220px]">
      <p className="text-[11px] text-gray-400 mb-1">
        Email
      </p>

      <p className="text-sm font-semibold whitespace-nowrap">
        {email || "No email"}
      </p>
    </div>
  </div>
</div>
                </>
              ) : (
             
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

        
            <div className="flex items-center gap-2 lg:hidden">
          
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

  {/* Main Navigation */}
  <nav className="flex flex-col gap-2">
<button
  type="button"
  disabled
  className="w-full flex items-center px-4 py-3.5 rounded-md text-white/40 font-medium cursor-not-allowed"
>
  <span>Find Services</span>
</button>

    <Link
      href="/dashboard-expert"
      onClick={(e) => {
        handleProfessionalClick(e);
        if (isExpert) {
          setIsMobileMenuOpen(false);
        }
      }}
      className="flex items-center justify-between px-4 py-3.5 rounded-md text-white font-medium hover:bg-white/5 hover:text-[#FACC15] transition-colors"
    >
      <span>
        {isExpert ? 'My Dashboard' : 'For Professionals'}
      </span>

     
    </Link>

   <button
  type="button"
  disabled
  className="w-full flex items-center px-4 py-3.5 rounded-md text-white/40 font-medium cursor-not-allowed"
>
  <span>How It Works</span>
</button>
  </nav>

  <hr className="border-white/10 my-1" />

  {/* Authentication */}
  <div className="flex flex-col gap-3">

    {isLoggedIn ? (

      /* Logged in */
      <div className="flex items-center gap-3 p-4 bg-white/5 rounded-md border border-white/10">

        <div className="w-12 h-12 rounded-full bg-[#FACC15] text-[#0A1E3F] flex items-center justify-center font-bold text-lg shadow-sm shrink-0">
          {initial ? (
            initial
          ) : (
            <User size={24} strokeWidth={2.5} />
          )}
        </div>

        <div className="flex flex-col overflow-hidden">
          <span className="text-xs text-gray-400">
            Welcome
          </span>

         <span className="text-sm font-semibold text-white truncate">
  {email || "No email"}
</span>
        </div>

      </div>

    ) : (

      /* Guest */
      <>
        <Link
          href="/sign-up"
          onClick={() => setIsMobileMenuOpen(false)}
          className="w-full py-3 text-center text-white border border-white/20 rounded-md font-semibold hover:bg-white/5 transition-colors"
        >
          Log In
        </Link>

        <Link
          href="/sign-up"
          onClick={() => setIsMobileMenuOpen(false)}
          className="w-full py-3 text-center text-[#FACC15] border border-[#FACC15]/30 rounded-md font-semibold hover:bg-[#FACC15]/5 transition-colors"
        >
          Sign Up
        </Link>

        <Link
          href="/sign-up"
          onClick={() => setIsMobileMenuOpen(false)}
          className="w-full py-3 text-center bg-[#FACC15] text-[#0A1E3F] rounded-md font-bold shadow-sm hover:bg-yellow-500 transition-colors"
        >
          Join HelpHub
        </Link>
      </>

    )}

  </div>

</div>
      </div>
      <BecomeExpertModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </>
  );
};

export default Navbar;
