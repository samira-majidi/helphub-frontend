import { UpdateExpertPayload, ExpertProfileData } from "../types/experts.types";
import { ExpertFormValues } from "../model/expertForm.schema";


export const mapInitialDataToFormValues = (
  initialData?: ExpertProfileData 
): Partial<ExpertFormValues> => {
  if (!initialData) return {};
  
  return {
    categoryId: initialData.category?.id || undefined,
    location: initialData.location?.lat && initialData.location?.lng
      ? { lat: initialData.location.lat, lng: initialData.location.lng }
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
