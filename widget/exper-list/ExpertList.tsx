"use client";

import ExpertCard from '@/entities/expert/ui/ExpertCard';
import { ErrorState } from '@/shared/ui/ErrorState';
import { EmptyState } from '@/shared/ui/EmptyState';
import { ExpertProfileData } from "@/entities/expert/types/experts.types";

interface ExpertListProps {
  experts: ExpertProfileData[];
  isFetching: boolean;
  isError: boolean;
  refetch: () => void;
}

export default function ExpertList({ experts, isFetching, isError, refetch }: ExpertListProps) {
  if (isError) {
    return (
      <ErrorState 
        title="Connection Error" 
        description="We couldn't fetch the experts list. Please check your connection and try again." 
        onRetry={() => refetch()} 
      />
    );
  }

  if (!isFetching && (!experts || experts.length === 0)) {
    return (
      <EmptyState 
        title="No experts found!" 
        description="Try selecting a different category or change your location on the map to find what you need." 
      />
    );
  }

  return (
    
    <div className="flex max-lg:h-auto lg:h-full w-full flex-col font-sans">
      
   
      <div className="relative flex-1 min-h-0 max-lg:overflow-visible lg:overflow-y-auto custom-scrollbar pr-2 pb-4">
        <div className="flex flex-col gap-4">
          {experts?.map((expert: ExpertProfileData) => (
            <ExpertCard key={expert.id} expert={expert} />
          ))}
        </div>

        
      </div>
      
    </div>
  );

}
