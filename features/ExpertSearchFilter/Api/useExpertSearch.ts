"use client";
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { searchExperts } from '@/entities/expert/api/expert.api';

export const useExpertSearch = (p0: { category: number | undefined; lat: number | undefined; lng: number | undefined; }) => {

  // مقادیر اولیه مستقیم از p0 گرفته میشن
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(
    p0.lat && p0.lng ? { lat: p0.lat, lng: p0.lng } : null
  );
  const [categoryId, setCategoryId] = useState<number | ''>(p0.category ?? '');
  const [isMapModalOpen, setIsMapModalOpen] = useState(false);

  const { 
    data: experts = [], 
    isFetching, 
    isError,
    refetch,
  } = useQuery({
    queryKey: ['experts', 'search', location?.lat, location?.lng, categoryId],
    queryFn: () => searchExperts({
      latitude: location!.lat,
      longitude: location!.lng,
      ...(categoryId && { categoryId: Number(categoryId) }),
    }),
    enabled: !!location,
    placeholderData: (previousData) => previousData, 
   
  });
  
  console.log('🚀 [Expert Search Data]:', experts);
 
  return {
    location,
    categoryId,
    isMapModalOpen,
    experts,
    isFetching,
    isError,
    refetch,
    setLocation,
    setCategoryId,
    setIsMapModalOpen,
  };
};
