import React from 'react';
import PublicExpertProfile from '@/entities/expert/ui/PublicExpertProfile'; 
import ProfileChatSection from '@/features/chat/ui/ProfileChatSection';

interface ExpertProfilePageProps {
  params: Promise<{
    id: string; 
  }>;
}

export default async function ExpertProfilePage({ params }: ExpertProfilePageProps) {
  const resolvedParams = await params;
  const expertId = resolvedParams.id;

  return (
    <main className="min-h-screen bg-gray-50 py-10">
      <div className="container mx-auto px-4">
     
        <PublicExpertProfile expertId={expertId} />

   
        <ProfileChatSection expertId={expertId} />

      </div>
    </main>
  );
}