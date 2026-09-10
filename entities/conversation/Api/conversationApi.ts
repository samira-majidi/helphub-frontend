import api from '@/shared/services/Api'; 

export const conversationApi = {

  getConversations: async () => {
    const response = await api.get('/chat/conversations');
    return response.data;
  },
};