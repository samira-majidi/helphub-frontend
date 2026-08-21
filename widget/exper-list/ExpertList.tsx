"use client";

import ExpertCard from '@/entities/expert/ui/ExpertCard';
import { LoadingState } from '@/shared/ui/LoadingState';
import { ErrorState } from '@/shared/ui/ErrorState';
import { EmptyState } from '@/shared/ui/EmptyState';
import { ExpertProfileData } from "@/entities/expert/types/experts.types";

// این اینترفیس رو اضافه کردیم تا دیتا رو از بیرون بگیره
interface ExpertListProps {
  experts: ExpertProfileData[];
  isFetching: boolean;
  isError: boolean;
  refetch: () => void;
}

export default function ExpertList({ experts, isFetching, isError, refetch }: ExpertListProps) {
  // ۱. حالت خطا
  if (isError) {
    return (
      <ErrorState 
        title="Connection Error" 
        description="We couldn't fetch the experts list. Please check your connection and try again." 
        onRetry={() => refetch()} 
      />
    );
  }

  // ۲. حالت لودینگ اولیه
  if (isFetching && experts?.length === 0) {
    return <LoadingState className="h-[400px]" />;
  }

  // ۳. حالت دیتای خالی
  if (!isFetching && (!experts || experts.length === 0)) {
    return (
      <EmptyState 
        title="No experts found!" 
        description="Try selecting a different category or change your location on the map to find what you need." 
      />
    );
  }

  return (
    <div className="relative mt-8"> {/* یکم فاصله دادیم که از فیلترها جدا شه */}
      {/* هاله نیمه‌شفاف برای آپدیت دیتا در پس‌زمینه */}
      {isFetching && experts.length > 0 && (
        <div className="absolute inset-0 z-10 rounded-2xl bg-white/40 backdrop-blur-[1.5px] transition-all duration-300" />
      )}
      
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {experts.map((expert: ExpertProfileData) => (
          <ExpertCard key={expert.id} expert={expert} />
        ))}
      </div>
    </div>
  );
}
