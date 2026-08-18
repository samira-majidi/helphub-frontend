'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { Suspense } from 'react';
import ChatBox from '@/features/chat/ui/ChatBox';
import { useConversations } from '@/entities/conversation/hooks/useConversations';
import { ConversationItem } from '@/entities/conversation/ui/ConversationItem';

function ChatPageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  // گرفتن آیدی از URL
  const targetIdParam = searchParams.get('targetId'); 
  const targetUserID = targetIdParam ? Number(targetIdParam) : null;
  
  // واکشی لیست گفتگوها در صفحه اصلی
  const { conversations } = useConversations();

  return (
    <div className="flex max-w-5xl mx-auto mt-10 gap-4 h-[70vh]" dir="rtl">
      
      {/* 🟢 سایدبار: لیست گفتگوها */}
      <div className="w-1/3 bg-white p-4 border rounded-xl shadow-lg flex flex-col">
        <h2 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2">گفتگوهای من</h2>
        
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          {conversations.length > 0 ? (
            <ul className="flex flex-col gap-2">
              {conversations.map((conv: any) => {
              
                return (
                  <ConversationItem 
                    key={conv.id} 
                    conv={conv} 
                    activeRoomId={null} 
                 onClick={(receivedTargetId) => {
                    if (receivedTargetId) {
                      router.push(`?targetId=${receivedTargetId}`);
                    }
                  }} 
                  />
                );
              })}
            </ul>
          ) : (
            <p className="text-gray-500 text-sm text-center mt-10">گفتگویی یافت نشد. 🤷‍♀️</p>
          )}
        </div>
      </div>

      {/* 🔵 بخش اصلی: چت‌باکس */}
      <div className="w-2/3 h-full">
        {!targetUserID || isNaN(targetUserID) ? (
          <div className="flex items-center justify-center h-full bg-gray-50 border rounded-xl shadow-lg">
            <p className="text-gray-600 text-lg font-medium p-6">
              👈 لطفاً یک گفتگو را از لیست انتخاب کنید...
            </p>
          </div>
        ) : (
          <ChatBox targetUserID={targetUserID} />
        )}
      </div>

    </div>
  );
}

export default function ChatPage() {
  return (
    <Suspense fallback={<div className="text-center mt-10">در حال بارگذاری... ⏳</div>}>
      <ChatPageContent />
    </Suspense>
  );
}
