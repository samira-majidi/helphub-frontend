'use client';

import { useRouter } from 'next/navigation';

import { useConversations } from '@/entities/conversation/hooks/useConversations';
import { Conversation } from '@/entities/conversation/type/conversation';
import { ConversationItem } from '@/entities/conversation/ui/ConversationItem';

export default function DashboardSimpleConversationList() {
  const { conversations } = useConversations();
  const router = useRouter();

  const handleGoToChat = (targetUserId: number) => {
    router.push(`/chats?userId=${targetUserId}`);
  };

  return (
    <div className="w-full flex flex-col">
     
      <div className="flex-1 w-full overflow-hidden pb-1">
        {conversations && conversations.length > 0 ? (
          <ul className="flex flex-col w-full">
            {conversations.map((conv: Conversation) => (
              <ConversationItem
                key={conv.id}
                conv={conv}
                isActive={false}
                onClick={handleGoToChat}
              />
            ))}
          </ul>
        ) : (
          <div className="flex flex-col items-center justify-center p-8 text-center text-slate-400">
            <div className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center text-xl mb-3">
              💬
            </div>
            <p className="text-sm font-medium text-gray-500">
              No conversations yet
            </p>
            <p className="text-xs text-gray-400 mt-1">
              Your recent messages will appear here
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
