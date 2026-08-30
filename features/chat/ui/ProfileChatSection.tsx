// @/features/chat/ui/ProfileChatSection.tsx
'use client';

import ChatBox from '@/features/chat/ui/ChatBox';
// 👈 همون هوکی که تو پروفایل استفاده کردی رو اینجا ایمپورت کن
import { useExpertById } from '@/entities/expert/hook/useExpertById'; 

export default function ProfileChatSection({ expertId }: { expertId: string }) {
  
  // ۱. واکشی دیتای متخصص (از کش خوانده می‌شود و ریکوئست تکراری نمی‌زند)
  const { data: expert, isLoading } = useExpertById(expertId);

  if (isLoading) return null; // یا می‌تونی یه لودینگ ساده بذاری
  if (!expert) return null;

  // ۲. پیدا کردن آیدی کاربر متخصص (بسته به ساختار بک‌اندت یکی از این دو حالت است)
  // معمولا بک‌اند یا userId میده، یا user.id
  const targetUserId = expert.userId || expert.user?.id; 

  if (!targetUserId) {
    return <div className="text-center mt-10 text-red-500">خطا: شناسه کاربری متخصص یافت نشد.</div>;
  }

  return (
    <div className="flex max-w-3xl mx-auto mt-10 h-[70vh]" dir="rtl">
      <div className="w-full h-full bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
        
        {/* ۳. حالا آیدی واقعی کاربر (عدد) رو به چت‌باکس پاس میدیم! */}
        <ChatBox targetUserID={targetUserId} />
        
      </div>
    </div>
  );
}
