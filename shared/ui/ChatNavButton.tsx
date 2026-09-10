'use client';

import { useQuery } from '@tanstack/react-query';
import { MessageCircle } from 'lucide-react';
import { conversationApi } from '@/entities/conversation/Api/conversationApi';
import { Conversation } from '@/entities/conversation/type/conversation';

export default function ChatNavButton() {


  const { data: apiResponse } = useQuery({
    queryKey: ['recent-conversations'],
    queryFn: conversationApi.getConversations,
  });


  const totalUnread = apiResponse?.data
    ? apiResponse.data.reduce(
        (sum: number, conv: Conversation) => sum + Number(conv.unread_count || 0),
        0
      )
    : 0;

  return (
    <div className="relative p-2 rounded-full hover:bg-white/10 transition-colors cursor-pointer">
 
      <MessageCircle className="w-6 h-6 text-white" />

      {totalUnread > 0 && (
        <span className="absolute top-0 right-0 inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-500 rounded-full border-2 border-white">
          {totalUnread > 99 ? '99+' : totalUnread}
        </span>
      )}
    </div>
  );
}

