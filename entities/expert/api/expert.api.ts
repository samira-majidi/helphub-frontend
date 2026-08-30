import api from "@/shared/services/Api";
import { CreateExpertPayload, SearchExpertsPayload, UpdateExpertPayload } from "../types/experts.types";
import { UpdateAvailabilityPayload } from "../types/status-type";

export const getExpertProfile = async () => {
  const response = await api.get('/experts/me');
  return response.data.data; 
};
export const createExpertProfile = async (data: CreateExpertPayload) => {
  const response = await api.post('/experts', data);
  return response.data;
};

export const updateExpertProfile = async (data: UpdateExpertPayload) => {
  const response = await api.patch('/experts/me', data);
  return response.data.data;
};

export const updateExpertAvailability = async (data: UpdateAvailabilityPayload) => {
  const response = await api.patch('/experts/me/availability', data);
  return response.data;
};

export const deleteExpertProfile = async () => {
  const response = await api.delete('/experts/me');
  return response.data;
};
export const searchExperts = async (params: SearchExpertsPayload) => {
  const response = await api.get('/experts/search', { params });
  return response.data.data;
};
export const getExpertById = async (id: string) => {
  const response = await api.get(`/experts/${id}`);
   console.log(response.data.data)
  return response?.data?.data?.data; 
};
export const getUserProfile = async (id: string | number) => {
  const response = await api.get(`/users/profile/${id}`);

  return response.data.data; 
};