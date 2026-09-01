import React from 'react';
import Image from 'next/image';
import { Conversation } from '../type/conversation';

interface ConversationItemProps {

  conv: Conversation;
  isActive: boolean;
  onClick: (targetId: number) => void;
}

const formatTime = (dateString: string) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  }).format(date);
};

export function ConversationItem({ conv, isActive, onClick }: ConversationItemProps) {
  const otherMember = conv.members?.[0];
  if (!otherMember || !otherMember.user) return null;

  const { user } = otherMember;
  console.log(user,'gffjgjhj;lk;k')
  const fullName = `${user.name || ''} ${user.lastName || ''}`.trim() || `User #${user.id}`;
  const displayTime = formatTime(conv.updated_at);

  return (
      <li
    
      onClick={() => onClick?.(user.id)}
      className={`flex items-center gap-3.5 py-3 px-3 cursor-pointer transition-all rounded-2xl ${
        isActive ? 'bg-[#f4f6fb]' : 'bg-transparent hover:bg-gray-50'
      }`}
    >
      <div className="relative shrink-0">
        <div className="relative w-[46px] h-[46px] rounded-full bg-indigo-50 overflow-hidden flex items-center justify-center text-[#1e1b4b] font-bold">
          {user.avatar_url ? (
            <Image
              src={user.avatar_url}
              alt={fullName}
              fill
              sizes="46px"
              className="object-cover"
            />
          ) : (
            <span className="text-lg uppercase">{user.name?.[0] || 'U'}</span>
          )}
        </div>
        {user.is_online && (
          <span className="absolute bottom-0.5 right-0.5 w-3 h-3 bg-[#22c55e] border-2 border-white rounded-full z-10"></span>
        )}
      </div>

      <div className="flex-1 min-w-0">
        <h4 className="text-[15px] font-bold text-gray-900 truncate">
          {fullName}
        </h4>
        <p className={`text-[13px] truncate mt-0.5 ${isActive ? 'text-gray-700' : 'text-gray-500'}`}>
          {conv.last_message || 'Say hi! 👋'}
        </p>
      </div>

      <div className="flex flex-col items-end justify-between h-[42px] shrink-0 pl-2">
        <span className="text-[12px] text-gray-400 font-medium whitespace-nowrap">
          {displayTime}
        </span>
        {conv.unread_count && conv.unread_count > 0 ? (
          <span className="flex items-center justify-center min-w-[20px] h-[20px] px-1.5 bg-[#1e1b4b] text-white text-[11px] font-bold rounded-full">
            {conv.unread_count}
          </span>
        ) : (
          <div className="h-[20px]"></div>
        )}
      </div>
    </li>
  );
}
