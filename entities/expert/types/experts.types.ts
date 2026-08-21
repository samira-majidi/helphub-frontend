export interface ExpertCategory {
  id: number;
  name: string;
}

export interface ExpertLocation {
  lat?: number;
  lng?: number;
}

export interface ExpertUser {
  name?: string;       // <--- اضافه شد (چون بک‌اند name میده)
  firstName?: string;  // اختیاری شد
  lastName: string;
  email: string;
}

export interface ExpertProfileData {
  id: string | number;
  bio?: string;
  availabilityStatus: string;
  category?: ExpertCategory;
  location?: {
    type: 'Point';
    coordinates: [number, number]; 
  };
  avatarUrl?: string;
  avatar?: { path: string }; // <--- اضافه شد (برای دریافت مسیر عکس از بک‌اند)
  user?: ExpertUser;
  images?: { id: number; url?: string }[];
}

export interface CreateExpertPayload {
  categoryId: number; 
  bio?: string;
  availabilityStatus: string;
  latitude?: number;  
  longitude?: number; 
  imageIds: number[]
}

export interface SearchExpertsPayload {
  latitude: number;
  longitude: number;
  radius?: number; 
  limit?: number; 
  page?: number;   
  categoryId?: number;
  availabilityStatus?: string; 
}

export type UpdateExpertPayload = Partial<CreateExpertPayload>;

export enum ExpertAvailabilityStatus {
  AVAILABLE = 'available',
  BUSY = 'busy',
  OFF_SHIFT = 'off_shift',
}

export interface UpdateAvailabilityPayload {
  availabilityStatus: ExpertAvailabilityStatus;
}