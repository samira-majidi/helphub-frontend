'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import ExpertSearchResults from '@/widget/expert-search-result/ExpertSearchResults';
import { useExpertSearch } from '@/features/ExpertSearchFilter/Api/useExpertSearch'; 

export default function ResultPageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // گرفتن تمام استیت‌ها و لاجیک‌ها از هوک بدون تغییر
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
  } = useExpertSearch({ 
    category: searchParams.has('categoryId') ? Number(searchParams.get('categoryId')) : undefined,
    lat: searchParams.has('lat') ? Number(searchParams.get('lat')) : undefined,
    lng: searchParams.has('lng') ? Number(searchParams.get('lng')) : undefined,
  });

  // سینک کردن URL با استیت‌های جستجو (بدون رفرش صفحه)
  useEffect(() => {
    const params = new URLSearchParams();
    if (categoryId) params.append('categoryId', categoryId.toString());
    if (location) {
      params.append('lat', location.lat.toString());
      params.append('lng', location.lng.toString());
    }
    // جایگزین کردن URL فعلی تا اگر کاربر صفحه رو رفرش کرد اطلاعات بماند
    router.replace(`?${params.toString()}`, { scroll: false });
  }, [location, categoryId, router]);

  return (
    // ✨ تغییر اصلی اینجاست ✨
    // ارتفاع و overflow فقط در سایز دسکتاپ (lg) اعمال می‌شوند
    <div className="mx-auto flex w-full max-w-7xl flex-col max-lg:h-auto lg:h-[calc(100vh-80px)] lg:overflow-hidden px-4 pt-6 sm:px-6 lg:px-8">
      <ExpertSearchResults
        location={location}
        setLocation={setLocation}
        categoryId={categoryId}
        setCategoryId={setCategoryId}
        isMapModalOpen={isMapModalOpen}
        setIsMapModalOpen={setIsMapModalOpen}
        experts={experts}
        isFetching={isFetching}
        isError={isError}
        refetch={refetch}
      />
    </div>
  );
}
