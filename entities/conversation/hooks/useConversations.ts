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
        // ببین چقدر تمیز شد! نیازی به هدر و توکن نیست، اینترسپتور خودش هندل می‌کنه
        const response = await api.get('/chat/conversations');
        setConversations(response.data?.data || response.data || []);
      } catch (error) {
        console.error('دریافت گفتگوها ناموفق:', error);
      }
    };

    fetchConversations();
  }, [accessToken]);

  return { conversations };
};
