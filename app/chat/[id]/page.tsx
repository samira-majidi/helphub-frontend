// فایل: app/chat/[id]/page.tsx
'use client';

import { useParams, useRouter } from 'next/navigation';
import ChatBox from '@/features/chat/ui/ChatBox';

export default function SingleChatPage() {
  const params = useParams();
  const router = useRouter();
  
  // خواندن شناسه کاربر از URL (مثلاً /chat/14)
  const targetUserID = Number(params?.id);

  if (!targetUserID || isNaN(targetUserID)) {
    return (
      <div className="flex flex-col items-center justify-center h-[70vh] text-center gap-3">
        <p className="text-red-500 font-medium">شناسه مخاطب نامعتبر است! ❌</p>
        <button 
          onClick={() => router.back()}
          className="text-sm px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-xl transition-all"
        >
          بازگشت 🔙
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto h-[calc(100vh-100px)] p-2 sm:p-4">
      {/* دکمه بازگشت ساده بالای چت */}
      <button 
        onClick={() => router.back()} 
        className="mb-2 flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-slate-800 transition-colors"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        <span>Back to Conversations</span>
      </button>

      {/* کامپوننت چت شما به صورت تمام‌صفحه */}
      <div className="h-[calc(100%-40px)]">
        <ChatBox key={targetUserID} targetUserID={targetUserID} />
      </div>
    </div>
  );
}
