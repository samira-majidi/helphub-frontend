// src/shared/ui/spinner/LogoLoader.tsx
import Image from 'next/image';

export const LogoLoader = () => {
  return (
    // backdrop-blur-sm یه افکت شیشه‌ای قشنگ به پس‌زمینه میده
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/5">
      
      {/* مربع وسط صفحه: بلور شده، با حاشیه آبی و کمی سایه برای زیبایی بیشتر */}
      <div className="flex justify-center w-48 h-48 bg-white/40 backdrop-blur-md border-2 border-blue-500 rounded-2xl shadow-xl">
         <div className="relative items-center  animate-pulse">
        <Image 
          src="/logo.png"
          alt="App Logo"
          width={120} // یکم بزرگترش کردم که جلوه داشته باشه
          height={120} 
          className="object-contain"
           priority // این عالیه، به Next میگه این عکس حیاتیه
          quality={75} // یا مثلا ۷۵ برای حجم کمتر
             loading="eager" 
        />
        </div>
      </div>
    </div>
  );
};
