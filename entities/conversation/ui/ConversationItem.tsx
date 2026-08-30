import React from 'react';
import Image from 'next/image';
import { Conversation } from '../type/conversation';

interface ConversationItemProps {
  conv: Conversation;
  activeRoomId: string | null;
  onClick: (targetId: number) => void;
}

// تابع کمکی برای فرمت کردن تاریخ مثل دیزاین (10:24 AM یا Yesterday)
const formatTime = (dateString: string) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  }).format(date);
};

export function ConversationItem({ conv, activeRoomId, onClick }: ConversationItemProps) {
  // گرفتن کاربر مقابل (چون چت دایرکته، اولین ممبر همون مخاطبه)
  const otherMember = conv.members?.[0];
  if (!otherMember || !otherMember.user) return null;

  const { user } = otherMember;
  const isActive = activeRoomId === conv.id;
  
  // ترکیب اسم و فامیل با توجه به دیتای واقعی API
  const fullName = `${user.name || ''} ${user.lastName || ''}`.trim() || `User #${user.id}`;
  
  // زمان آخرین آپدیت مکالمه
  const displayTime = formatTime(conv.updated_at);

  return (
    <li
      onClick={() => onClick(user.id)}
      className={`flex items-center gap-4 py-3 px-2 border-b border-slate-100 last:border-0 cursor-pointer transition-all rounded-xl hover:bg-slate-50 ${
        isActive ? 'bg-slate-50' : 'bg-transparent'
      }`}
    >
      {/* بخش آواتار */}
      <div className="relative shrink-0">
        <div className="relative w-12 h-12 rounded-full bg-slate-200 overflow-hidden shadow-sm border border-slate-100">
          {user.avatar_url ? (
            <Image
              src={user.avatar_url}
              alt={`${fullName}'s avatar`}
              fill
              sizes="48px"
              className="object-cover"
            />
          ) : (
            <span className="w-full h-full flex items-center justify-center text-slate-500 font-semibold text-lg uppercase">
              {user.name?.[0] || 'U'}
            </span>
          )}
        </div>

        {/* نقطه سبز رنگ وضعیت آنلاین - مطابق دیزاین */}
        {user.is_online && (
          <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-500 border-2 border-white rounded-full z-10 shadow-sm"></span>
        )}
      </div>

      {/* بخش نام و آخرین پیام */}
      <div className="flex-1 min-w-0">
        <h4 className="text-[15px] font-bold text-slate-900 truncate">
          {fullName}
        </h4>
        <p className="text-sm text-slate-500 truncate mt-0.5">
          {conv.last_message || 'No messages yet. Say hi! 👋'}
        </p>
      </div>

      {/* بخش زمان و بج (Badge) پیام‌های خوانده نشده */}
      <div className="flex flex-col items-end gap-1.5 shrink-0 pl-2">
        <span className="text-[13px] text-slate-500 font-medium whitespace-nowrap">
          {displayTime}
        </span>

        {/* بج زرد رنگ مطابق داشبورد */}
        {conv.unread_count && conv.unread_count > 0 ? (
          <span className="flex items-center justify-center min-w-[22px] h-[22px] px-1.5 bg-amber-400 text-white text-[12px] font-bold rounded-full shadow-sm">
            {conv.unread_count}
          </span>
        ) : (
          <div className="h-[22px]"></div> // برای حفظ ارتفاع وقتی بج نیست
        )}
      </div>
    </li>
  );
}
