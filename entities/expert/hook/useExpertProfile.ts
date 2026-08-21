import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { ExpertProfileData } from "../types/experts.types";
import { getExpertProfile } from "../api/expert.api";

export const useExpertProfile = () => {
  return useQuery<ExpertProfileData | null>({
    queryKey: ["expertProfile"],
    queryFn: async () => {
      try {
        const response = await getExpertProfile();
        
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const rawData: any = response.data ? response.data : response;
      
        if (!rawData || (typeof rawData === 'object' && Object.keys(rawData).length === 0)) {
          return null; 
        }

        return {
          id: rawData.id,
          bio: rawData.bio,
          availabilityStatus: rawData.availabilityStatus || 'off_shift',
          category: rawData.category ? {
            id: rawData.category.id,
            name: rawData.category.name,
          } : undefined,
         
          location: rawData.location?.coordinates ? {
            type: "Point",
            coordinates: [rawData.location.coordinates[0], rawData.location.coordinates[1]] as [number, number],
          } : undefined,
          avatarUrl: rawData.avatar?.url || rawData.avatar?.path, 
          user: rawData.user ? {
            firstName: rawData.user.name || rawData.user.first_name || "",
            lastName: rawData.user.lastName || "",
            email: rawData.user.email || "",
          } : undefined,
        }; 
      } catch (error) {
        toast.error("Error fetching profile data! 🥲");
        console.error("Expert Profile Error:", error);
        throw error; 
      }
    },
    retry: 1,
    staleTime: 5 * 60 * 1000,
  });
};