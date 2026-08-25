'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import ExpertList from '@/widget/exper-list/ExpertList'; 
import { ExpertProfileData } from '@/entities/expert/types/experts.types';
import { LocationCoords } from '@/features/map/MapPicker';
import ExpertResultSearchForm from './ExpertResultSearchForm';

const DynamicExpertsMap = dynamic(() => import('@/features/map/ExpertMap'), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full animate-pulse items-center justify-center rounded-[20px] bg-slate-100 font-sans text-slate-500">
      در حال بارگذاری نقشه... 🗺️
    </div>
  ),
});

interface ExpertSearchResultsProps {
  location: LocationCoords | null; 
  setLocation: (loc: LocationCoords) => void;
  categoryId: number | "";
  setCategoryId: (id: number | "") => void;
  isMapModalOpen: boolean;
  setIsMapModalOpen: (isOpen: boolean) => void;
  experts: ExpertProfileData[]; 
  isFetching: boolean;
  isError: boolean;
  refetch: () => void;
}

export default function ExpertSearchResults({
  location,
  setLocation,
  categoryId,
  setCategoryId,
  isMapModalOpen,
  setIsMapModalOpen,
  experts,
  isFetching,
  isError,
  refetch
}: ExpertSearchResultsProps) {
  return (
    <div className="flex h-full w-full flex-col font-sans">
      {!location && !isFetching && (
        <div className="flex h-full items-center justify-center text-slate-500">
          برای شروع جستجو، لطفا موقعیت خود را روی نقشه مشخص کنید 🗺️
        </div>
      )}

      {location && (
        <div className="flex h-full w-full flex-col lg:flex-row lg:items-start lg:gap-6">
          
          {/* ستون چپ دسکتاپ (در موبایل با contents باز می‌شود تا بتوانیم جایگاه‌ها را دستی بچینیم) */}
          <div className="flex h-full w-full min-h-0 flex-col max-lg:contents lg:w-[45%] xl:w-[40%]">
            
            {/* ۱. عناوین بالا (در دسکتاپ بالا است، در موبایل زیر نقشه و با استایل جدید) */}
            <div className="mb-4 shrink-0 max-lg:order-3 max-lg:mt-4">
              {/* حالت دسکتاپ */}
              <div className="hidden lg:block">
                <h1 className="mb-1 text-[28px] md:text-[32px] font-extrabold text-[#061c38]">
                  Experts near you
                </h1>
                <p className="text-[15px] font-medium text-slate-500">
                  {experts?.length || 0} experts found near you
                </p>
              </div>

              {/* حالت موبایل (تطابق دقیق با عکس) */}
              <div className="flex items-center gap-2 lg:hidden">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#061c38] text-white">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                  </svg>
                </div>
                <h2 className="text-[18px] font-bold text-[#061c38]">
                  Experts near you <span className="font-normal">({experts?.length || 0})</span>
                </h2>
              </div>
            </div>

            {/* ۲. فرم جستجو (در موبایل می‌رود به بالاترین نقطه با بک‌گراند سرمه‌ای) */}
            <div className="mb-6 shrink-0 max-lg:order-1 max-lg:-mx-4 max-lg:-mt-6 max-lg:mb-4 max-lg:bg-[#061c38] max-lg:px-6 max-lg:pb-6 max-lg:pt-6">
              <ExpertResultSearchForm 
                categoryId={categoryId}
                setCategoryId={setCategoryId}
                location={location}
                setLocation={setLocation}
                isMapModalOpen={isMapModalOpen}
                setIsMapModalOpen={setIsMapModalOpen}
              />
            </div>

            {/* ۳. لیست متخصصان (در موبایل می‌رود به پایین‌ترین نقطه و اسکرول می‌خورد) */}
            <div className="relative min-h-0 flex-1 overflow-hidden max-lg:order-4">
              <ExpertList 
                experts={experts} 
                isFetching={isFetching} 
                isError={isError} 
                refetch={refetch} 
              />
            </div>

          </div>

          {/* ستون راست دسکتاپ: نقشه (در موبایل می‌آید وسط، زیر فرم با ارتفاع کمتر) */}
          {experts && experts.length > 0 && (
            <div className="relative w-full shrink-0 max-lg:order-2 max-lg:mb-2 max-lg:h-[220px] max-lg:min-h-[220px] lg:h-full lg:w-[55%] xl:w-[60%]">
              {/* حذف پدینگ سفید در موبایل برای تطابق با عکس */}
              <div className="absolute inset-0 overflow-hidden rounded-[20px] border border-slate-100 bg-white max-lg:border-none max-lg:p-0 lg:p-1.5 shadow-[0_4px_24px_rgba(0,0,0,0.04)]">
                <DynamicExpertsMap 
                  experts={experts} 
                  userLocation={location} 
                />
              </div>
            </div>
          )}
          
        </div>
      )}
    </div>
  );
}
