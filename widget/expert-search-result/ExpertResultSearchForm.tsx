'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import CategorySelect from '@/entities/categories/ui/CategorySelect';
import { LocationCoords } from '@/features/map/MapPicker';
import { Search, MapPin, ChevronDown, SlidersHorizontal} from 'lucide-react';

const DynamicMapPicker = dynamic(() => import('@/features/map/MapPicker'), {
  ssr: false,
  loading: () => (
    <div className="flex h-[380px] items-center justify-center rounded-xl bg-slate-50 font-sans text-sm text-slate-400">
      Loading map... 🌍
    </div>
  ),
});

interface ExpertResultSearchFormProps {
  categoryId: number | "";
  setCategoryId: (id: number | "") => void;
  location: LocationCoords | null;
  setLocation: (loc: LocationCoords) => void;
  isMapModalOpen: boolean;
  setIsMapModalOpen: (isOpen: boolean) => void;
  sortBy?: string;
  setSortBy?: (sort: string) => void;
}

export default function ExpertResultSearchForm({
  categoryId,
  setCategoryId,
  location,
  setLocation,
  isMapModalOpen,
  setIsMapModalOpen,
  sortBy = 'distance',
  setSortBy,
}: ExpertResultSearchFormProps) {
  return (
    <div className="w-full font-sans">
      {/* ردیف بالا: باکس انتخاب تخصص + باکس لوکیشن */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-12">
        
        {/* ۱. باکس انتخاب سرویس / دسته‌بندی */}
        <div className="relative flex items-center rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-[0_2px_8px_rgba(0,0,0,0.02)] transition-all focus-within:border-slate-400 sm:col-span-7">
          <Search className="mr-3 h-5 w-5 shrink-0 text-slate-400" />
          <div className="w-full [&>div]:border-none [&_select]:w-full [&_select]:border-none [&_select]:bg-transparent [&_select]:p-0 [&_select]:text-sm [&_select]:font-medium [&_select]:text-[#061c38] [&_select]:focus:ring-0">
            <CategorySelect value={categoryId} onChange={setCategoryId} />
          </div>
        </div>

        {/* ۲. دکمه انتخاب لوکیشن */}
        <button
          type="button"
          onClick={() => setIsMapModalOpen(true)}
          className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white px-4 py-3 text-left shadow-[0_2px_8px_rgba(0,0,0,0.02)] transition-colors hover:bg-slate-50 sm:col-span-5"
        >
          <div className="flex min-w-0 items-center gap-2">
            <MapPin className="h-5 w-5 shrink-0 text-slate-700" />
            <span className="truncate text-sm font-medium text-[#061c38]">
              {location ? 'Location selected' : 'Current location'}
            </span>
          </div>
          <ChevronDown className="h-4 w-4 shrink-0 text-slate-500" />
        </button>
      </div>

      {/* ردیف پایین: دکمه‌های فیلتر و سورت */}
      <div className="mt-3 flex items-center gap-2">
        <button
          type="button"
          className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 shadow-xs transition-colors hover:bg-slate-50"
        >
          <SlidersHorizontal className="h-3.5 w-3.5" />
          <span>Filters</span>
          <ChevronDown className="h-3 w-3 text-slate-400" />
        </button>

        <div className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 shadow-xs">
          <span>Sort by:</span>
          <span className="text-[#061c38] font-bold">Distance</span>
          <ChevronDown className="h-3 w-3 text-slate-400" />
        </div>
      </div>

      {/* مودال نقشه اختصاصی برای انتخاب لوکیشن */}
      {isMapModalOpen && (
        <div dir="ltr" className="fixed inset-0 z-[100] flex items-center justify-center bg-[#061c38]/40 p-4 backdrop-blur-xs">
          <div className="w-full max-w-2xl overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
              <h3 className="text-lg font-bold text-[#061c38]">Change your search location</h3>
              <button
                type="button"
                onClick={() => setIsMapModalOpen(false)}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200"
              >
                ✕
              </button>
            </div>
            
            <div className="p-4 sm:p-6 bg-[#fbfaf6]">
              <div className="overflow-hidden rounded-xl border border-slate-200">
                <DynamicMapPicker defaultLocation={location || undefined} onLocationSelect={setLocation} />
              </div>
            </div>

            <div className="flex justify-end border-t border-slate-100 bg-white px-6 py-4">
              <button
                type="button"
                onClick={() => setIsMapModalOpen(false)}
                className="rounded-xl bg-[#f6c72d] px-6 py-2.5 text-sm font-bold text-[#061c38] transition-colors hover:bg-[#eab308]"
              >
                Confirm Location
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
