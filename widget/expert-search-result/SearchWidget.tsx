'use client'; // 👈 این خط کلید حل مشکل شماست

import { useState } from 'react';

import type { LocationCoords } from '@/features/map/MapPicker'; 
import ExpertSearchForm from '../hero-search/ExpertSearchForm';

export function SearchWidget() {
  const [categoryId, setCategoryId] = useState<number | ''>('');
  const [location, setLocation] = useState<LocationCoords | null>(null);
  const [isMapModalOpen, setIsMapModalOpen] = useState(false);


  const handleSearch = () => {
    console.log("Searching for:", { categoryId, location });
    // TODO: هدایت کاربر به صفحه نتایج یا دریافت لیست متخصصین
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
      />
      
    
    </div>
  );
}
