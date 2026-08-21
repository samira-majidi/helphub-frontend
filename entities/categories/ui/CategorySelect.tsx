import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchCategories } from '../api/categories.api';

interface CategorySelectProps {
  value?: number | string;
  onChange: (categoryId: number) => void;
  error?: string; // برای نمایش خطاهای فرم
}

export default function CategorySelect({ value, onChange, error }: CategorySelectProps) {
  // استفاده از React Query برای دریافت و کش کردن داده‌ها
  const { data: responseData, isLoading, isError } = useQuery({
    queryKey: ['categories'],
    queryFn: fetchCategories,
    staleTime: 24 * 60 * 60 * 1000, 
  });

  if (isError) {
    console.error("خطا در دریافت لیست مشاغل از کش یا سرور");
  }

const categoryList = responseData?.data || responseData || [];

  return (
    <div className="w-full">
      <select
        disabled={isLoading || isError}
        value={value || ""} 
        onChange={(e) => onChange(Number(e.target.value))} 
        className={`w-full p-2.5 bg-white border text-gray-700 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
          error ? 'border-red-500' : 'border-gray-300'
        }`}
      >
        <option value="" disabled>
          {isLoading ? '⏳ در حال دریافت مشاغل...' : '🛠️ لطفاً یک تخصص را انتخاب کنید'}
        </option>
        
        {/* رندر کردن آپشن‌ها با استفاده از آرایه‌ی استخراج‌شده */}
        {Array.isArray(categoryList) && categoryList.map((category: any) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>
      
      {/* نمایش پیام خطا در صورت وجود */}
      {error && <span className="text-sm text-red-500 mt-1 block">{error}</span>}
    </div>
  );
}
