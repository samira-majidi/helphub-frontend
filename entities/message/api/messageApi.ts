import api from '@/shared/services/Api'; 

export const messageApi = {
 
  getHistory: async (roomId: string) => {
    const response = await api.get(`/chat/rooms/${roomId}/messages`);
    return response.data;
  },
};