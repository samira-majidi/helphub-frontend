'use client'; 

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import type { LocationCoords } from '@/features/map/MapPicker'; 
import ExpertSearchForm from '../hero-search/ExpertSearchForm';

export function SearchWidget() {
  const router = useRouter();
  const [categoryId, setCategoryId] = useState<number | ''>('');
  const [location, setLocation] = useState<LocationCoords | null>(null);
  const [isMapModalOpen, setIsMapModalOpen] = useState(false);

  const handleSearch = () => {
    // استفاده از URLSearchParams برای ساخت تمیز Query String
    const params = new URLSearchParams();

    if (categoryId) {
      params.append('categoryId', categoryId.toString());
    }

    if (location) {
      // فرض بر این است که LocationCoords شامل ویژگی‌های lat و lng است
      params.append('lat', location.lat.toString());
      params.append('lng', location.lng.toString());
    }

    const queryString = params.toString();
    
    // اگر پارامتری وجود داشت با علامت سوال اضافه می‌شه، در غیر این صورت فقط مسیر اصلی
    const url = queryString ? `/result-page?${queryString}` : '/result-page';
    
    console.log("Navigating to:", url);
    router.push(url); 
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <ExpertSearchForm 
        categoryId={categoryId}
        setCategoryId={setCategoryId}
        location={location}
        setLocation={setLocation}
        isMapModalOpen={isMapModalOpen}
        setIsMapModalOpen={setIsMapModalOpen}
        onSearch={handleSearch}
      />
    </div>
  );
}
