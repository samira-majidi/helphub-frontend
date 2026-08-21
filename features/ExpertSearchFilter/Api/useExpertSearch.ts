"use client";
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { searchExperts } from '@/entities/expert/api/expert.api';

export const useExpertSearch = () => {

  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [categoryId, setCategoryId] = useState<number | ''>('');
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
      select: (response) => response.data,
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
