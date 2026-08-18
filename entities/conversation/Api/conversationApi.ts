import api from '@/shared/services/Api'; 

export const conversationApi = {
  // دیگه نیازی به گرفتن token به عنوان ورودی نیست
  getConversations: async () => {
    const response = await api.get('/chat/conversations');
    return response.data;
  },
};