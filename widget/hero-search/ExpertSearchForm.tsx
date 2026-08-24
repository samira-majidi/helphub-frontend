'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import CategorySelect from '@/entities/categories/ui/CategorySelect';
import { LocationCoords } from '@/features/map/MapPicker';
import { MapPin, LayoutGrid, X } from 'lucide-react'; // X اضافه شد

const DynamicMapPicker = dynamic(() => import('@/features/map/MapPicker'), {
  ssr: false,
  loading: () => <div className="h-[400px] bg-gray-50 animate-pulse rounded-xl flex items-center justify-center text-gray-400 font-sans">Loading map... 🌍</div>,
});

interface ExpertSearchFormProps {
  categoryId: number | "";
  setCategoryId: (id: number | "") => void;
  location: LocationCoords | null;
  setLocation: (loc: LocationCoords) => void;
  isMapModalOpen: boolean;
  setIsMapModalOpen: (isOpen: boolean) => void;
}

export default function ExpertSearchForm({
  categoryId,
  setCategoryId,
  location,
  setLocation,
  isMapModalOpen,
  setIsMapModalOpen
}: ExpertSearchFormProps) {
  return (
    <>
      <div 
       
        className="font-sans w-full max-w-[50rem]  mr-auto relative z-10"
      >
        {/* حالت دسکتاپ (کپسولی و یکپارچه) */}
        <div className="hidden md:flex bg-white rounded-[0.5rem] shadow-[0_10px_40px_rgb(0,0,0,0.08)] p-2 gap-2">
          
          <div className="flex-1 flex">
            <div className="flex-1 flex items-center px-4">
              <LayoutGrid className="w-5 h-5 text-gray-700 mr-3 shrink-0" strokeWidth={1.5} />
              <div className="w-full [&>div]:border-none [&_select]:border-none [&_select]:bg-transparent [&_select]:focus:ring-0 [&_select]:p-0 [&_select]:text-gray-500 [&_select]:text-[15px] cursor-pointer">
                <CategorySelect 
                  value={categoryId} 
                  onChange={setCategoryId}
                
                />
              </div>
            </div>

            <div className="w-px h-8 bg-gray-200 shrink-0"></div>

            <button
              type="button"
              onClick={() => setIsMapModalOpen(true)}
              className="flex-1 flex items-center px-4 py-2 hover:bg-gray-50 rounded-full transition-colors text-left group"
            >
              <MapPin className={`w-5 h-5 mr-3 shrink-0 transition-colors ${location ? 'text-green-500' : 'text-gray-700'}`} strokeWidth={1.5} />
              <span className={`flex-1 truncate text-[15px] ${location ? 'text-gray-900 font-medium' : 'text-gray-500 group-hover:text-gray-700'}`}>
                {location ? '✅ Location Selected (Change)' : 'City'}
              </span>
            </button>
          </div>

          <button
            type="button"
            className="bg-[#FACC15] hover:bg-[#EAB308] text-[#0A1E3F] font-bold px-8 py-3.5 rounded-[0.5rem]  transition-colors whitespace-nowrap text-[15px]"
          >
            Find pros
          </button>
        </div>

        {/* حالت موبایل (عمودی و خوانا) */}
        <div className="md:hidden bg-white p-2 rounded-[0.5rem] max-w-[30rem] shadow-[0_10px_40px_rgb(0,0,0,0.08)] flex flex-col items-center gap-2">
            <div className="w-full flex items-center px-4 py-2">
              <LayoutGrid className="w-4 h-5 text-gray-800 mr-3.5 shrink-0" strokeWidth={1.5} />
              <div className="w-full [&>div]:border-none [&_select]:border-none [&_select]:bg-transparent [&_select]:focus:ring-0 [&_select]:p-0 [&_select]:text-gray-600 [&_select]:text-[15px] cursor-pointer">
                  <CategorySelect 
                    value={categoryId} 
                    onChange={setCategoryId}
                    
                  />
              </div>
            </div>
            
            <div className="w-[90%] h-px bg-gray-100 mx-auto"></div>

            <button
              type="button"
              onClick={() => setIsMapModalOpen(true)}
              className="w-full flex items-center px-4 py-3 hover:bg-gray-50 rounded-xl transition-colors text-left group"
            >
              <MapPin className={`w-5 h-5 mr-3.5 shrink-0 transition-colors ${location ? 'text-green-500' : 'text-gray-800'}`} strokeWidth={1.5} />
              <span className={`flex-1 truncate text-[15px] ${location ? 'text-gray-900 font-medium' : 'text-gray-500 group-hover:text-gray-700'}`}>
                {location ? '✅ Location selected (Change)' : 'City'}
              </span>
            </button>

            <button
              type="button"
              className="w-full bg-[#FACC15] hover:bg-[#EAB308] text-[#0A1E3F] font-bold py-3.5 rounded-[0.5rem] transition-colors text-[15px]"
            >
              Find pros
            </button>
        </div>
      </div>

      {/* مودال نقشه با طراحی جدید و هماهنگ */}
      {isMapModalOpen && (
        <div dir="ltr" className="fixed inset-0 z-[60] bg-[#0F172A]/40 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 font-sans transition-all duration-300">
          <div className="bg-white rounded-2xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] w-full max-w-2xl overflow-hidden flex flex-col transform transition-all border border-slate-100">
            
            {/* هدر */}
            <div className="px-6 py-5 border-b border-slate-100 flex justify-between items-center bg-white">
              <h3 className="font-bold text-[#0F172A] text-xl">Select your location</h3>
              <button 
                onClick={() => setIsMapModalOpen(false)} 
                className="text-slate-400 hover:text-red-500 bg-slate-50 hover:bg-red-50 rounded-full w-9 h-9 flex items-center justify-center transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" strokeWidth={2.5} />
              </button>
            </div>
            
        
            <div className="p-4 sm:p-6 bg-[#F9F9F8]">
  
              <div className="rounded-xl overflow-hidden shadow-sm border border-slate-200/60 ring-4 ring-white relative z-0">
                <DynamicMapPicker defaultLocation={location || undefined} onLocationSelect={setLocation} />
              </div>
            </div>
            
            {/* فوتر */}
            <div className="px-6 py-5 border-t border-slate-100 bg-white flex justify-end">
              <button 
                type="button" 
                onClick={() => setIsMapModalOpen(false)} 
                className="px-8 py-3.5 bg-[#FACC15] hover:bg-[#EAB308] text-[#0A1E3F] font-bold rounded-[0.5rem] transition-colors shadow-sm text-[15px]"
              >
                Confirm Location
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
