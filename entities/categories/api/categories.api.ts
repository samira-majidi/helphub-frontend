import api from "@/shared/services/Api";

export interface CategoryResponse {
  id: number;
  name: string;
}

let cachedPromise: Promise<CategoryResponse[]> | null = null;

export const fetchCategories = (): Promise<CategoryResponse[]> => {

  if (cachedPromise) return cachedPromise;

 
  cachedPromise = api.get<{ data: CategoryResponse[] }>('/categories')
    .then(res => res.data.data)
    .catch(error => {

      cachedPromise = null;
      console.error('Error fetching categories:', error);
      throw error;
    });

  return cachedPromise;
};

export const invalidateCategoriesCache = () => {
  cachedPromise = null;
};
