'use client';

import React, { useEffect, useRef, useState } from 'react';
import { 
  Wrench, 
  Lightbulb, 
  SprayCan, 
  ThermometerSun, 
  PaintRoller, 
  Hammer, 
  Lock,
  ShieldCheck,
  Tags,
  MapPin
} from 'lucide-react';

export default function ServicesCover() {
  const scrollRef = useRef<HTMLDivElement>(null);
  // استیت برای نگه‌داشتن ایندکس آیتمی که در موبایل وسط/فعال است
  const [activeIndex, setActiveIndex] = useState(0);

  // === سیستم تشخیص آیتم وسط (برای موبایل) ===
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    // از IntersectionObserver استفاده می‌کنیم تا ببینیم کدوم آیتم بیشتر تو دید هست
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute('data-index'));
            setActiveIndex(index);
          }
        });
      },
      {
        root: container,
        threshold: 0.8, // وقتی ۸۰ درصد آیتم تو دید بود فعال بشه
      }
    );

    // به همه آیتم‌ها آبزرور رو وصل می‌کنیم
    const children = container.querySelectorAll('.carousel-item');
    children.forEach((child) => observer.observe(child));

    return () => observer.disconnect();
  }, []);

  // === سیستم حرکت خودکار در موبایل ===
  useEffect(() => {
    const interval = setInterval(() => {
      if (scrollRef.current) {
        const container = scrollRef.current;
        const { scrollLeft, scrollWidth, clientWidth } = container;
        
        if (Math.ceil(scrollLeft + clientWidth) >= scrollWidth) {
          container.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          const firstChild = container.firstChild as HTMLElement;
          const itemWidth = firstChild ? firstChild.clientWidth : 120;
          container.scrollBy({ left: itemWidth, behavior: 'smooth' });
        }
      }
    }, 2000); 

    return () => clearInterval(interval);
  }, []);

  const services = [
    { name: 'Plumbing', pros: '140+ pros', icon: Wrench },
    { name: 'Electrical', pros: '160+ pros', icon: Lightbulb },
    { name: 'Cleaning', pros: '180+ pros', icon: SprayCan },
    { name: 'Heating & Cooling', pros: '130+ pros', icon: ThermometerSun },
    { name: 'Painting', pros: '110+ pros', icon: PaintRoller },
    { name: 'Carpentry', pros: '120+ pros', icon: Hammer },
    { name: 'Locksmith', pros: '90+ pros', icon: Lock },
  ];

  return (
    <section className="w-full bg-[#FAFAFA] py-12 md:py-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <style dangerouslySetInnerHTML={{__html: `
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />

      <div className="max-w-7xl mx-auto">
        
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-10 md:mb-16">
          <span className="text-[#FACC15] text-[10px] md:text-xs font-bold tracking-widest uppercase mb-3 md:mb-4 block">
            Services We Cover
          </span>
          <h2 className="text-3xl md:text-5xl font-black font-serif text-[#0A1E3F] leading-tight mb-3 md:mb-4 tracking-tight">
            Whatever you need,<br />start with a search.
          </h2>
          <p className="text-slate-600 text-sm md:text-lg px-4">
            Describe the job and we'll connect you with the right local professional.
          </p>
        </div>

        <div 
          ref={scrollRef}
          className="flex md:grid md:grid-cols-4 lg:grid-cols-7 gap-4 md:gap-y-10 md:gap-x-4 mb-12 md:mb-16 overflow-x-auto snap-x snap-mandatory hide-scrollbar pb-4 -mx-4 px-4 md:mx-0 md:px-0 md:overflow-visible"
        >
          {services.map((service, index) => {
            const Icon = service.icon;
            // کلاس فعال بودن: تو موبایل اگر activeIndex باشه سرمه‌ای کمرنگ میده، تو دسکتاپ هاور عادی کار میکنه
            const isActiveMobile = activeIndex === index;
            
            return (
              <div 
                key={index} 
                data-index={index}
                className={`carousel-item shrink-0 min-w-[120px] md:min-w-0 snap-center flex flex-col items-center text-center group cursor-pointer transition-all duration-300 rounded-2xl py-3 px-2
                  md:hover:-translate-y-1 md:hover:bg-[#0A1E3F]/5 
                  ${isActiveMobile ? 'bg-[#0A1E3F]/10 scale-105 md:scale-100 md:bg-transparent' : 'bg-transparent scale-100'}
                `}
              >
                <div className="relative w-12 h-12 md:w-14 md:h-14 flex items-center justify-center mb-3 md:mb-4">
                  <div className="absolute right-0 bottom-0 md:right-1 md:bottom-1 w-3.5 h-3.5 md:w-4 md:h-4 bg-[#FACC15] rounded-full opacity-40 group-hover:scale-150 transition-transform duration-300"></div>
                  <div className="absolute top-0 right-1 md:right-2 w-1.5 h-1.5 bg-[#FACC15] rounded-full"></div>
                  
                  <Icon className="relative z-10 text-[#0A1E3F] w-7 h-7 md:w-9 md:h-9" strokeWidth={1.5} />
                </div>
                
                <h3 className="text-[#0A1E3F] font-bold text-xs md:text-sm mb-1">{service.name}</h3>
                <p className="text-slate-500 text-[10px] md:text-xs font-medium">{service.pros}</p>
              </div>
            );
          })}
        </div>

        {/* ... بقیه کد (Trust Signals Banner) تغییری نکرده ... */}
        <div className="bg-transparent border border-gray-200 rounded-2xl p-4 md:p-6 lg:p-0 flex flex-col lg:flex-row items-center justify-between shadow-sm">
          
          <div className="flex items-center gap-3 md:gap-4 p-2 md:p-6 w-full lg:w-1/3">
            <div className="relative w-8 h-8 md:w-10 md:h-10 flex items-center justify-center shrink-0">
              <ShieldCheck className="text-[#0A1E3F] relative z-10 w-6 h-6 md:w-8 md:h-8" strokeWidth={1.5} />
              <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-[#FACC15] rounded-full opacity-70"></div>
            </div>
            <div>
              <h4 className="text-[#0A1E3F] font-bold text-xs md:text-sm">Verified professionals</h4>
              <p className="text-slate-500 text-[10px] md:text-xs mt-0.5">Background-checked and rated</p>
            </div>
          </div>

          <div className="hidden lg:block w-px h-16 bg-gray-200"></div>
          <div className="block lg:hidden w-full h-px bg-gray-100 my-2"></div>

          <div className="flex items-center gap-3 md:gap-4 p-2 md:p-6 w-full lg:w-1/3">
            <div className="relative w-8 h-8 md:w-10 md:h-10 flex items-center justify-center shrink-0">
              <Tags className="text-[#0A1E3F] relative z-10 w-6 h-6 md:w-8 md:h-8" strokeWidth={1.5} />
              <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-[#FACC15] rounded-full opacity-70"></div>
            </div>
            <div>
              <h4 className="text-[#0A1E3F] font-bold text-xs md:text-sm">Upfront pricing</h4>
              <p className="text-slate-500 text-[10px] md:text-xs mt-0.5">Clear quotes, no surprises</p>
            </div>
          </div>

          <div className="hidden lg:block w-px h-16 bg-gray-200"></div>
          <div className="block lg:hidden w-full h-px bg-gray-100 my-2"></div>

          <div className="flex items-center gap-3 md:gap-4 p-2 md:p-6 w-full lg:w-1/3">
            <div className="relative w-8 h-8 md:w-10 md:h-10 flex items-center justify-center shrink-0">
              <MapPin className="text-[#0A1E3F] relative z-10 w-6 h-6 md:w-8 md:h-8" strokeWidth={1.5} />
              <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-[#FACC15] rounded-full opacity-70"></div>
            </div>
            <div>
              <h4 className="text-[#0A1E3F] font-bold text-xs md:text-sm">Local availability</h4>
              <p className="text-slate-500 text-[10px] md:text-xs mt-0.5">Pros near you, when you need them</p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
