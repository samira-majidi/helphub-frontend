import React from 'react';

// ۱. تعریف ساختار کاربر
interface User {
  first_name?: string;
  username?: string;
}

// ۲. تعریف ساختار عضو مکالمه
interface Member {
  user_id: number;
  user?: User;
}

// ۳. تعریف ساختار خود مکالمه (Conversation)
interface Conversation {
  id: string;
  members: Member[];
}

// ۴. استفاده از تایپ جدید به جای any
interface ConversationItemProps {
  conv: Conversation; 
  activeRoomId: string | null;
  onClick: (targetId: number) => void;
}

export function ConversationItem({ conv, activeRoomId, onClick }: ConversationItemProps) {
  const otherMember = conv.members?.[0];
  if (!otherMember) return null;

  return (
    <li
      onClick={() => onClick(otherMember.user_id)}
      className={`text-xs p-2.5 rounded shadow-sm cursor-pointer transition flex justify-between items-center ${
        activeRoomId === conv.id
          ? 'bg-blue-200 text-blue-900 border-r-4 border-blue-600'
          : 'bg-white text-gray-700 hover:bg-blue-100'
      }`}
    >
      <span className="font-medium">
        چت با: {otherMember.user?.first_name || otherMember.user?.username || `کاربر #${otherMember.user_id}`}
      </span>
      <span className="text-gray-400 text-[9px] truncate max-w-[60px]">{conv.id}</span>
    </li>
  );
}
