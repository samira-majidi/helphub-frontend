'use client';

import { useState, useRef } from 'react';
import { useChatMessages } from '@/entities/message/hooks/useChatMessages';

export function useChatController(targetUserID: number) {
  const [inputValue, setInputValue] = useState('');
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const chat = useChatMessages(targetUserID);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop } = e.currentTarget;
    if (scrollTop === 0 && chat.nextCursor && !chat.isLoadingMore) {
      chat.loadMoreMessages();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    if (chat.activeRoomId && chat.isConnected) {
      chat.emitTyping(true);
      if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
      typingTimeoutRef.current = setTimeout(() => chat.emitTyping(false), 2000);
    }
  };

  const handleSend = () => {
    if (inputValue.trim()) {
      chat.sendMessage(inputValue.trim());
      setInputValue('');
      chat.emitTyping(false);
      if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
    }
  };

  return {
    ...chat,
    inputValue,
    handleInputChange,
    handleSend,
    handleScroll,
  };
}
