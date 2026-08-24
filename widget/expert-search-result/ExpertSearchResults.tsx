
'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import ExpertList from '@/widget/exper-list/ExpertList'; 
import { ExpertProfileData } from '@/entities/expert/types/experts.types';
import { LocationCoords } from '@/features/map/MapPicker';

const DynamicExpertsMap = dynamic(() => import('@/features/map/ExpertMap'), {
  ssr: false,
  loading: () => (
    <div className="h-[400px] bg-gray-100 animate-pulse rounded-xl flex items-center justify-center text-gray-500">
      در حال بارگذاری موقعیت متخصص‌ها... 🗺️
    </div>
  ),
});

interface ExpertSearchResultsProps {
    location: LocationCoords | null; 
  experts: ExpertProfileData[]; 
  isFetching: boolean;
  isError: boolean;
  refetch: () => void;
}

export default function ExpertSearchResults({
  location,
  experts,
  isFetching,
  isError,
  refetch
}: ExpertSearchResultsProps) {
  return (
    <div className="min-h-[200px] space-y-8">
  
      {!location && !isFetching && (
        <div className="text-center text-gray-500 py-10">
          برای شروع جستجو، لطفا موقعیت خود را روی نقشه مشخص کنید 🗺️
        </div>
      )}

     
      {location && (
        <>
     
          {experts && experts.length > 0 && (
            <div className="bg-white p-2 rounded-2xl shadow-sm border border-gray-100">
              <DynamicExpertsMap 
                experts={experts} 
                userLocation={location} 
              />
            </div>
          )}

          {/* لیست کارت‌های متخصص‌ها */}
          <ExpertList 
            experts={experts} 
            isFetching={isFetching} 
            isError={isError} 
            refetch={refetch} 
          />
        </>
      )}
    </div>
  );
}
