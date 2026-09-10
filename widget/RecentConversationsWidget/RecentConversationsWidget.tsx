'use client';


import { useConversations } from '@/entities/conversation/hooks/useConversations';
import { Conversation } from '@/entities/conversation/type/conversation';
import { ConversationItem } from '@/entities/conversation/ui/ConversationItem';

interface Props {
  activeTargetId?: number | null;
  onSelectUser: (id: number) => void;
}

export default function RecentConversationsWidget({ activeTargetId, onSelectUser }: Props) {

  const { conversations } = useConversations();

  return (
    <div className="bg-white h-full flex flex-col">

      <div className="p-6 pb-3">
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-[22px] font-bold text-gray-900">Messages</h2>
          <button className="text-gray-400 hover:text-[#1e1b4b] transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
          </button>
        </div>

  
        <div className="relative mb-5">
          <svg className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
          <input 
            type="text" 
            placeholder="Search conversations" 
            className="w-full bg-gray-50/50 border border-gray-200 text-sm rounded-full py-2.5 pl-11 pr-4 focus:outline-none focus:border-[#1e1b4b] focus:ring-1 focus:ring-[#1e1b4b] transition-all"
          />
        </div>

        <div className="flex gap-1 text-[13px] font-medium">
          <button className="bg-[#1e1b4b] text-white px-5 py-1.5 rounded-full shadow-sm">All</button>
          <button className="text-gray-500 hover:bg-gray-100 px-4 py-1.5 rounded-full transition-colors">Unread</button>
          <button className="text-gray-500 hover:bg-gray-100 px-4 py-1.5 rounded-full transition-colors">Mentions</button>
        </div>
      </div>
      
  
      <div className="flex-1 overflow-y-auto px-4 pb-4 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:bg-gray-200 [&::-webkit-scrollbar-thumb]:rounded-full">
        {conversations && conversations.length > 0 ? (
          <ul className="flex flex-col gap-1 mt-2">
            {conversations.map((conv: Conversation) => (
              <ConversationItem 
                key={conv.id} 
                conv={conv} 
                isActive={activeTargetId === conv.members?.[0]?.user?.id} 
                onClick={onSelectUser}
              />
            ))}
          </ul>
        ) : (
          <div className="text-center py-8 text-slate-400 text-sm">
            <p>No conversations found or Loading... ⏳</p>
          </div>
        )}
      </div>
    </div>
  );
}
