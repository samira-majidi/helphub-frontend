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
 
  const fullName = `${user.name || ''} ${user.lastName || ''}`.trim() || `User #${user.id}`;
  const displayTime = formatTime(conv.updated_at);
  

  const hasUnread = conv.unread_count && conv.unread_count > 0;

  return (
    <li
      onClick={() => onClick?.(user.id)}
      className={`flex items-center justify-between gap-4 py-4 px-5 sm:px-6 cursor-pointer transition-all border-b border-gray-50 last:border-none ${
        hasUnread ? 'bg-[#FCF9F0]' : 'bg-transparent hover:bg-gray-50'
      }`}
    >
      <div className="flex items-center gap-4 flex-1 min-w-0">
        {/* Avatar */}
        <div className="relative shrink-0">
          <div className="w-[42px] h-[42px] rounded-full bg-[#F3F4F6] overflow-hidden flex items-center justify-center text-[#374151] font-bold text-sm">
            {user.avatar_url ? (
              <Image
                src={user.avatar_url}
                alt={fullName}
                fill
                sizes="42px"
                className="object-cover"
              />
            ) : (
              <span className="uppercase">{user.name?.[0] || 'U'}</span>
            )}
          </div>
        </div>

        {/* User Info & Last Message */}
        <div className="flex-1 min-w-0">
          <h4 className="text-[14px] font-bold text-gray-800 truncate">
            {fullName}
          </h4>
          <p className={`text-[12px] truncate mt-1 ${hasUnread ? 'text-gray-600' : 'text-gray-400'}`}>
            {conv.last_message || 'Say hi! 👋'}
          </p>
        </div>
      </div>

      {/* Time & Unread Indicator Dot */}
      <div className="flex flex-col items-end gap-1.5 shrink-0 pl-2">
        <span className="text-[11px] text-gray-400 font-medium whitespace-nowrap">
          {displayTime}
        </span>
        <span className={`w-2 h-2 rounded-full ${hasUnread ? 'bg-amber-400' : 'bg-gray-200'}`}></span>
      </div>
    </li>
  );
}
