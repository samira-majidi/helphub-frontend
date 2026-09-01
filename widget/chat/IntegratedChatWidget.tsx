'use client';

import ChatBox from '@/features/chat/ui/ChatBox';
import { useState } from 'react';
import RecentConversationsWidget from '../RecentConversationsWidget/RecentConversationsWidget';

export default function IntegratedChatWidget() {
  // مدیریت کاربری که برای چت انتخاب شده
  const [activeTargetId, setActiveTargetId] = useState<number | null>(null);

  return (
    // تغییرات: استفاده از w-full و h-full و حذف حاشیه‌های اضافی برای فول‌اسکرین شدن بی‌نقص
    <div className="flex w-full h-full bg-white overflow-hidden font-sans">
      
      {/* سایدبار سمت چپ (لیست مکالمات) */}
      {/* اضافه شدن h-full و transition برای واکنش‌گرایی بهتر */}
      <div 
        className={`w-full md:w-[380px] shrink-0 border-r border-gray-100 flex flex-col h-full transition-all duration-300 ${
          activeTargetId ? 'hidden md:flex' : 'flex'
        }`}
      >
        <RecentConversationsWidget 
          activeTargetId={activeTargetId} 
          onSelectUser={setActiveTargetId} 
        />
      </div>

      {/* بخش سمت راست (محیط چت) */}
      <div 
        className={`flex-1 bg-white flex-col relative h-full transition-all duration-300 ${
          !activeTargetId ? 'hidden md:flex' : 'flex'
        }`}
      >
        {activeTargetId ? (
          <ChatBox 
            targetUserID={activeTargetId} 
            onBack={() => setActiveTargetId(null)} // برای دکمه بک در موبایل
          />
        ) : (
          // حالت خالی وقتی هنوز کسی انتخاب نشده (بهینه‌سازی ظاهری)
          <div className="flex-1 flex flex-col items-center justify-center text-center p-8 bg-gray-50/50 h-full">
            <div className="w-20 h-20 bg-indigo-50/70 rounded-full flex items-center justify-center mb-6 shadow-sm border border-indigo-100/50">
              <svg className="w-10 h-10 text-[#1e1b4b] opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Your Messages</h3>
            <p className="text-gray-500 max-w-sm text-sm leading-relaxed">
              Select a conversation from the left menu to start chatting with your contacts.
            </p>
          </div>
        )}
      </div>

    </div>
  );
}
