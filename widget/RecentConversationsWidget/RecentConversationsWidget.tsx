'use client';

import { conversationApi } from '@/entities/conversation/Api/conversationApi';
import { ConversationItem } from '@/entities/conversation/ui/ConversationItem';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

export default function RecentConversationsWidget() {
  const router = useRouter();

  // ۱. نام متغیر data رو به apiResponse تغییر میدیم تا گیج‌کننده نباشه
  const { 
    data: apiResponse, 
    isLoading, 
    isError 
  } = useQuery({
    queryKey: ['recent-conversations'],
    queryFn: conversationApi.getConversations,
  });

  // ۲. استخراج آرایه مکالمات از داخل فیلد data (اگر وجود نداشت یه آرایه خالی میذاریم)
  const conversationsList = apiResponse?.data || [];

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-4 sm:p-6 h-full flex flex-col">
      <h3 className="text-lg font-bold text-slate-800 mb-4">
        Recent Conversations
      </h3>
      
      {/* بخش اسکرول‌پذیر برای لیست مکالمات */}
      <div className="flex-1 overflow-y-auto pr-1 custom-scrollbar">
        {isLoading ? (
          <div className="flex items-center justify-center py-8 text-slate-500 animate-pulse">
            در حال بارگذاری مکالمات... ⏳
          </div>
        ) : isError ? (
          <div className="text-center py-8 text-red-500 bg-red-50 rounded-lg">
            خطا در دریافت لیست مکالمات! ❌
          </div>
        ) : conversationsList.length > 0 ? (
          <ul className="flex flex-col gap-2">
            {/* ۳. استفاده از conversationsList به جای conversations */}
            {/* ۴. اضافه کردن :any برای conv و targetId جهت رفع خطای TypeScript */}
            {conversationsList.map((conv: any) => (
              <ConversationItem 
                key={conv.id} 
                conv={conv} 
                activeRoomId={null} 
                // هدایت کاربر به صفحه چت با کلیک روی هر آیتم
               onClick={(targetId: number) => router.push(`/chat/${targetId}`)}
              />
            ))}
          </ul>
        ) : (
          <div className="text-center py-8 text-slate-500 flex flex-col items-center">
            <p>No recent conversations yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}
