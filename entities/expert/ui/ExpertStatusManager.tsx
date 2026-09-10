'use client'
import { useState } from "react";
import { useUpdateAvailability} from "../hook/useUpdateAvailability";
import { ExpertAvailabilityStatus } from "../types/status-type";

interface ExpertStatusManagerProps {

  initialStatus?: ExpertAvailabilityStatus; 
}

export const ExpertStatusManager = ({ initialStatus = ExpertAvailabilityStatus.AVAILABLE }: ExpertStatusManagerProps) => {
  const { mutate: changeStatus, isPending } = useUpdateAvailability();
  

  const [activeStatus, setActiveStatus] = useState<ExpertAvailabilityStatus>(initialStatus);

  const handleStatusClick = (status: ExpertAvailabilityStatus) => {
    if (status === activeStatus) return;
    
    setActiveStatus(status);
    changeStatus({ availabilityStatus: status });
  };

  return (
  
    <div className="flex items-center gap-1 bg-white rounded-full p-1 shadow-[0_2px_8px_rgba(0,0,0,0.04)] border border-gray-100/50">
      
  
      <button 
        disabled={isPending}
        onClick={() => handleStatusClick(ExpertAvailabilityStatus.AVAILABLE)}
        className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
          activeStatus === ExpertAvailabilityStatus.AVAILABLE 
            ? "bg-[#FFF9EE] text-gray-900"
            : "text-gray-500 hover:bg-gray-50"
        }`}
      >
        <span className="w-2 h-2 rounded-full bg-[#10B981]"></span>
        Online
      </button>

      <button 
        disabled={isPending}
        onClick={() => handleStatusClick(ExpertAvailabilityStatus.BUSY)}
        className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
          activeStatus === ExpertAvailabilityStatus.BUSY 
            ? "bg-[#FFF9EE] text-gray-900"
            : "text-gray-500 hover:bg-gray-50"
        }`}
      >
        <span className="w-2 h-2 rounded-full bg-[#F59E0B]"></span>
        Busy
      </button>


      <button 
        disabled={isPending}
        onClick={() => handleStatusClick(ExpertAvailabilityStatus.OFF_SHIFT)}
        className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
          activeStatus === ExpertAvailabilityStatus.OFF_SHIFT 
            ? "bg-[#FFF9EE] text-gray-900"
            : "text-gray-500 hover:bg-gray-50"
        }`}
      >
        <span className="w-2 h-2 rounded-full bg-[#D1D5DB]"></span>
        Offline
      </button>
      
    </div>
  );
};
