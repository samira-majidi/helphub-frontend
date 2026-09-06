
'use client';

import { useRouter } from 'next/navigation';
import { X, LogIn, UserPlus } from 'lucide-react';

interface AuthRequiredModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuthRequiredModal = ({
  isOpen,
  onClose,
}: AuthRequiredModalProps) => {
  const router = useRouter();

  if (!isOpen) {
    return null;
  }

  const handleSignUp = () => {
    onClose();
    router.push('/sign-up');
  };

  const handleLogin = () => {
    onClose();
    router.push('/sign-up');
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm transition-opacity"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative mx-4 w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl sm:p-10"
      >
        {/* Close */}
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 transition-colors hover:text-red-500"
          aria-label="Close"
        >
          <X size={24} />
        </button>

        <div className="mt-2 text-center">
          {/* Icon */}
          <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-[#061c38]">
            <LogIn className="h-7 w-7 text-[#FACC15]" />
          </div>

          <h2 className="mb-4 font-serif text-2xl font-bold text-[#061c38]">
            Login Required
          </h2>

          <p className="mb-8 leading-relaxed text-gray-600">
            You need to be logged in to chat with an expert.
            Create an account or log in to continue.
          </p>

          {/* Buttons */}
          <div className="flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={onClose}
              className="w-full rounded-xl bg-red-500 px-4 py-3 text-sm font-bold text-white shadow-sm transition-colors hover:bg-red-600"
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={handleLogin}
              className="flex w-full items-center justify-center gap-2 rounded-xl border-2 border-[#061c38] bg-white px-4 py-3 text-sm font-bold text-[#061c38] shadow-sm transition-colors hover:bg-slate-50"
            >
              <LogIn size={17} />
              Login
            </button>

            <button
              type="button"
              onClick={handleSignUp}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#FACC15] px-4 py-3 text-sm font-bold text-[#061c38] shadow-sm transition-colors hover:bg-[#eab308]"
            >
              <UserPlus size={17} />
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

