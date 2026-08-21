'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import CategorySelect from '@/entities/categories/ui/CategorySelect';
import { useExpertSearch } from '../Api/useExpertSearch';
import ExpertList from '@/widget/exper-list/ExpertList'; // <--- لیست رو اینجا ایمپورت کن
import { useExpertStatusSocket } from '@/entities/expert/hook/useExpertStatusSocket';
import { useUpdateAvailability } from '@/entities/expert/hook/useUpdateAvailability';
const DynamicMapPicker = dynamic(() => import('@/features/map/MapPicker'), {
  ssr: false,
  loading: () => <div className="h-[400px] bg-gray-100 animate-pulse rounded-xl flex items-center justify-center text-gray-500">در حال بارگذاری نقشه... 🌍</div>,
});

export default function ExpertSearchPage() {
  const {
    location,
    categoryId,
    isMapModalOpen,
    experts,
    isFetching,
    isError,
    refetch,
    setLocation,
    setCategoryId,
    setIsMapModalOpen
  } = useExpertSearch();

   useExpertStatusSocket(); 
  return (
    <div className="max-w-5xl mx-auto p-4 space-y-8">
      
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row gap-4 items-end">
        <div className="w-full md:w-1/2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            تخصص مورد نیاز (اختیاری)
          </label>
          <CategorySelect 
            value={categoryId} 
            onChange={setCategoryId} 
          />
        </div>

        <div className="w-full md:w-1/2">
          <button
            type="button"
            onClick={() => setIsMapModalOpen(true)}
            className={`w-full px-4 py-2 border rounded-xl transition flex items-center justify-center gap-2 ${
              location 
                ? 'border-green-500 text-green-700 bg-green-50 hover:bg-green-100' 
                : 'border-blue-500 text-blue-600 hover:bg-blue-50'
            }`}
          >
            {location ? '✅ موقعیت ثبت شد (تغییر موقعیت)' : '📍 انتخاب موقعیت روی نقشه'}
          </button>
        </div>
      </div>

      <div className="min-h-[200px]">
        {!location && !isFetching && (
          <div className="text-center text-gray-500 py-10">برای شروع جستجو، لطفا موقعیت خود را روی نقشه مشخص کنید 🗺️</div>
        )}

        {/* اگر لوکیشن داشتیم، لیست رو رندر کن و دیتاها رو بهش پاس بده */}
        {location && (
           <ExpertList 
             experts={experts} 
             isFetching={isFetching} 
             isError={isError} 
             refetch={refetch} 
           />
        )}
      </div>

      {isMapModalOpen && (
        <div className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl overflow-hidden flex flex-col">
            <div className="p-4 border-b flex justify-between items-center bg-gray-50">
              <h3 className="font-bold text-gray-800">انتخاب موقعیت شما</h3>
              <button onClick={() => setIsMapModalOpen(false)} className="text-gray-500 hover:text-red-500 text-2xl leading-none">&times;</button>
            </div>
            
            <div className="p-2">
              <DynamicMapPicker
                defaultLocation={location || undefined}
                onLocationSelect={setLocation}
              />
            </div>

            <div className="p-4 border-t bg-gray-50 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setIsMapModalOpen(false)}
                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
              >
                تایید موقعیت
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
