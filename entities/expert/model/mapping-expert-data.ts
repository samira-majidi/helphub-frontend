import { UpdateExpertPayload, ExpertProfileData } from "../types/experts.types";
import { ExpertFormValues } from "../model/expertForm.schema";


export const mapInitialDataToFormValues = (
  initialData?: ExpertProfileData 
): Partial<ExpertFormValues> => {
  if (!initialData) return {};
  
  return {
    categoryId: initialData.category?.id || undefined,
    // بررسی می‌کنیم که آیا مختصات وجود دارد یا خیر
    location: initialData.location?.coordinates
      ? { 
          lng: initialData.location.coordinates[0], 
          lat: initialData.location.coordinates[1] 
        }
      : undefined,
    bio: initialData.bio || '',
  };
};

export const mapFormValuesToPayload = (data: ExpertFormValues): UpdateExpertPayload => ({
  categoryId: data.categoryId,
    latitude: data.location?.lat,
    longitude: data.location?.lng, 
  bio: data.bio?.trim() || undefined,
   imageIds: data.imageIds?.length ? data.imageIds : undefined,
});
