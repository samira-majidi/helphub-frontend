'use client'
import { useUpdateAvailability } from "../hook/useUpdateAvailability";
import { ExpertAvailabilityStatus } from "../types/status-type";


export const ExpertStatusManager = () => {
  const { mutate: changeStatus, isPending } = useUpdateAvailability();

  const handleStatusClick = (status: ExpertAvailabilityStatus) => {
   changeStatus({ availabilityStatus: status });
  };

  return (
    <div className="flex gap-4">
      <button 
        disabled={isPending}
        onClick={() => handleStatusClick(ExpertAvailabilityStatus.AVAILABLE)}
        className="bg-green-500 text-white p-2 rounded"
      >
        Available
      </button>
      
      <button 
        disabled={isPending}
        onClick={() => handleStatusClick(ExpertAvailabilityStatus.BUSY)}
        className="bg-yellow-500 text-white p-2 rounded"
      >
        Busy
      </button>

      <button 
        disabled={isPending}
        onClick={() => handleStatusClick(ExpertAvailabilityStatus.OFF_SHIFT)}
        className="bg-red-500 text-white p-2 rounded"
      >
        Off Shift
      </button>
    </div>
  );
};
