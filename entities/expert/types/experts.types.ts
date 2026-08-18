
export interface ExpertCategory {
  id: number;
  name: string;
}

export interface ExpertLocation {
   lat?: number;
  lng?: number;
}

export interface ExpertUser {
  firstName: string;
  lastName: string;
  email: string;
}

export interface ExpertProfileData {
  id: string | number;
  bio?: string;
  availabilityStatus: string;
  category?: ExpertCategory;
  location?: ExpertLocation;
  avatarUrl?: string;
  user?: ExpertUser;
  images?: { id: number; url?: string }[];
}
export interface CreateExpertPayload {
  categoryId: number; 
  bio?: string;
  availabilityStatus: string;
   latitude?: number;  
  longitude?: number; 
  imageIds :number[]
}
export type UpdateExpertPayload = Partial<CreateExpertPayload>;