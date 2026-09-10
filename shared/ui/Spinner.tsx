// src/shared/ui/spinner/LogoLoader.tsx
import Image from 'next/image';

export const LogoLoader = () => {
  return (
   
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/5">
      

      <div className="flex justify-center w-48 h-48 bg-white/40 backdrop-blur-md border-2 border-blue-500 rounded-2xl shadow-xl">
         <div className="relative items-center  animate-pulse">
        <Image 
          src="/logo.png"
          alt="App Logo"
          width={120} 
          height={120} 
          className="object-contain"
           priority 
          quality={75} 
             loading="eager" 
        />
        </div>
      </div>
    </div>
  );
};
