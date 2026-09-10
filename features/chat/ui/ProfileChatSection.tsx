// @/features/chat/ui/ProfileChatSection.tsx
'use client';

import ChatBox from '@/features/chat/ui/ChatBox';

import { useExpertById } from '@/entities/expert/hook/useExpertById'; 

export default function ProfileChatSection({ expertId }: { expertId: string }) {
  

  const { data: expert, isLoading } = useExpertById(expertId);

  if (isLoading) return null; 
  if (!expert) return null;

 
  const targetUserId = expert.userId || expert.user?.id; 

  if (!targetUserId) {
    return <div className="text-center mt-10 text-red-500">Error: Expert user ID not found.</div>;
  }

  return (
    <div className="flex max-w-3xl mx-auto mt-10 h-[70vh]" dir="rtl">
      <div className="w-full h-full bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">

        <ChatBox targetUserID={targetUserId} />
        
      </div>
    </div>
  );
}
