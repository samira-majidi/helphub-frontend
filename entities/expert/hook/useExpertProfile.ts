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

        if (
          !rawData ||
          (typeof rawData === "object" &&
            Object.keys(rawData).length === 0)
        ) {
          return null;
        }

        const profile: ExpertProfileData = {
          id: rawData.id,

          bio: rawData.bio,

          availabilityStatus:
            rawData.availabilityStatus || "off_shift",

          category: rawData.category
            ? {
                id: rawData.category.id,
                name: rawData.category.name,
              }
            : undefined,

          location: rawData.location?.coordinates
            ? {
                type: "Point",
                coordinates: [
                  rawData.location.coordinates[0],
                  rawData.location.coordinates[1],
                ],
              }
            : undefined,

          avatarUrl:
            rawData.avatar?.url ||
            rawData.avatar?.path ||
            undefined,

          user: rawData.user
            ? {
                id: rawData.user.id,

                name: rawData.user.name || "",

                firstName:
                  rawData.user.firstName ||
                  rawData.user.first_name ||
                  rawData.user.name ||
                  "",

                lastName:
                  rawData.user.lastName ||
                  rawData.user.last_name ||
                  "",

                email: rawData.user.email || "",
              }
            : undefined,
        };

        return profile;
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