// src/components/modals/BecomeExpertModal.tsx

'use client';

import { useRouter } from 'next/navigation';
import { X } from 'lucide-react';

interface BecomeExpertModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BecomeExpertModal = ({ isOpen, onClose }: BecomeExpertModalProps) => {
  const router = useRouter();

  if (!isOpen) {
    return null;
  }

  const handleSignUp = () => {
    router.push("/sign-up");
    onClose(); 
  };

  return (

    <div 
      onClick={onClose} 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm transition-opacity"
    >

      <div 
        onClick={(e) => e.stopPropagation()} 
        className="relative w-full max-w-md p-8 sm:p-10 mx-4 bg-white rounded-2xl shadow-2xl transform transition-all"
      >
    
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition-colors"
        >
          <X size={24} />
        </button>

     
        <div className="text-center mt-2">
          <h2 className="text-2xl font-bold font-serif text-brand-navy mb-4">
            Join as a Professional
          </h2>
          <p className="text-gray-600 mb-8 leading-relaxed">
            Offer your services, manage your profile, and connect with new clients by creating a professional account.
          </p>
          
   
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={onClose}
           
              className="w-full px-4 py-3 text-sm font-bold text-white bg-red-500 rounded-xl hover:bg-red-600 transition-colors shadow-sm"
            >
              Cancel
            </button>
            <button
              onClick={handleSignUp}
         
              className="w-full px-4 py-3 text-sm font-bold text-brand-navy bg-[#FACC15] rounded-xl hover:bg-[#eab308] transition-colors shadow-sm"
            >
              Sign Up Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
