import Image from "next/image";
import { SearchWidget } from "@/widget/expert-search-result/SearchWidget";
import { ShieldCheck, Star, Tag } from "lucide-react";
import ServicesCover from "@/shared/ui/ServicesCover";
import ExpertSearchResults from "@/widget/expert-search-result/ExpertSearchResults";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#F9F9F8] lg:bg-white">
     
    <section className="relative w-full flex flex-col lg:flex-row lg:items-center z-30 lg:min-h-[480px]">

        <div className="absolute inset-0 z-0 w-full h-full">
          <Image 
            src="/hero.png" 
            alt="Reliable home services professional" 
            fill
            className="object-cover object-right"
            priority
          />
         
          <div className="absolute inset-0 bg-gradient-to-r from-white/90 via-white/30 to-transparent lg:hidden z-10"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 pt-12 pb-6 lg:py-16 flex flex-col justify-center lg:block h-full w-full">

          <div className="w-full lg:w-1/2 max-w-lg mb-8 mt-10 lg:mt-0">
          
            <div className="w-8 h-0.5 bg-slate-400 mb-5 lg:hidden"></div>

            <h2 className="text-[#d1a700] lg:text-[#FACC15] font-bold text-[12px] sm:text-xs lg:text-sm tracking-widest uppercase mb-3">
              The better way to get things fixed
            </h2>
            
            <h1 className="text-2xl sm:text-xl lg:text-4xl leading-[1.15] lg:leading-[1.1] font-serif text-brand-navy font-bold mb-4">
              Your home<br />
              deserves a<br />
              trusted hand.
            </h1>
            
            <p className="text-sm sm:text-base lg:text-base text-slate-800 lg:text-slate-600 max-w-[250px] lg:max-w-sm leading-relaxed font-sans font-medium lg:font-normal">
              Vetted local specialists, ready when real life needs a fix.
            </p>
          </div>

          <div className="mb-0 lg:mb-6 relative z-20 w-full lg:w-[48rem]">
            <SearchWidget />
          </div>

          <div className="hidden lg:block w-full lg:w-[48rem] mt-9">
            <div className="flex flex-wrap items-center gap-6 sm:gap-8 text-sm font-semibold text-brand-navy">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-brand-navy fill-[#FACC15]" strokeWidth={1.5} />
                <span>Background checked</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-brand-navy fill-[#FACC15]" strokeWidth={1.5} />
                <span>Highly rated</span>
              </div>
              <div className="flex items-center gap-2">
                <Tag className="w-5 h-5 text-brand-navy fill-[#FACC15]" strokeWidth={1.5} />
                <span>Clear pricing</span>
              </div>
            </div>
          </div>
          
        </div>
      </section>

      <div className="lg:hidden w-full bg-[#0F172A] py-4 px-4">
        <div className="flex justify-center items-center gap-2 sm:gap-3 text-[10px] font-bold text-white tracking-[0.1em] sm:tracking-[0.15em] whitespace-nowrap">
          <span>VETTED PROS</span>
          <span className="text-[#FACC15] text-sm leading-none">•</span>
          <span>CLEAR PRICES</span>
          <span className="text-[#FACC15] text-sm leading-none">•</span>
          <span>REAL PEOPLE</span>
        </div>
      </div>
      
      <ServicesCover/>
      
      
    </main>
  );
}
