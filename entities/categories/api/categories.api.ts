import api from "@/shared/services/Api";

export interface CategoryResponse {
  id: number;
  name: string;
}

export const fetchCategories = async (): Promise<CategoryResponse[]> => {
  try {
    const response = await api.get<CategoryResponse[]>('/categories');
    return response.data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
};