'use client';

import { useSearchParams } from 'next/navigation';
import { useExpertSearch } from '@/entities/expert/api/useExpertSearch'; // مسیر هوک خودت رو بذار
import ExpertList from '@/widget/exper-list/ExpertList';
import Link from 'next/link';

export default function ResultsPage() {
  const searchParams = useSearchParams();
  
  // خواندن مقادیر از URL
  const lat = searchParams.get('lat');
  const lng = searchParams.get('lng');
  const categoryId = searchParams.get('category');

  // اگر طول و عرض جغرافیایی در URL نبود
  if (!lat || !lng) {
    return (
      <div className="text-center mt-20">
        <p>موقعیت مکانی مشخص نشده است!</p>
        <Link href="/experts/search" className="text-blue-500 underline mt-4 block">
          برگشت به صفحه جستجو
        </Link>
      </div>
    );
  }

  // ساختن آبجکت لوکیشن برای پاس دادن به هوک
  const location = { lat: parseFloat(lat), lng: parseFloat(lng) };
  const catId = categoryId ? parseInt(categoryId) : null;

  // فراخوانی هوک (هوک باید طوری تغییر کنه که این مقادیر رو به عنوان ورودی بگیره)
  const { experts, isFetching, isError, refetch } = useExpertSearch({ 
    location, 
    categoryId: catId 
  });

  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">نتایج جستجوی شما ✨</h1>
        <Link href="/experts/search" className="text-sm bg-gray-100 px-4 py-2 rounded-md hover:bg-gray-200">
          تغییر فیلترها 🔄
        </Link>
      </div>

      <ExpertList 
        experts={experts} 
        isFetching={isFetching} 
        isError={isError} 
        refetch={refetch} 
        location={location} 
      />
    </div>
  );
}
