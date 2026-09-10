import { useState, useEffect } from 'react';
import api from '@/shared/services/Api';
import { useAuthStore } from '@/session/useAuthStore';
import { Conversation } from '../type/conversation';

export const useConversations = () => {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const accessToken = useAuthStore((state) => state.accessToken);

  useEffect(() => {
    if (!accessToken) return;

    const fetchConversations = async () => {
      try {

        const response = await api.get('/chat/conversations');
        setConversations(response.data?.data || response.data || []);
      } catch (error) {
        console.error('erorr in getting conversation', error);
      }
    };

    fetchConversations();
  }, [accessToken]);

  return { conversations };
};
