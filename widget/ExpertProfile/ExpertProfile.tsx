"use client";

import Image from "next/image";
import { useState } from "react";
import { Camera, Trash2, X } from "lucide-react";
import { LoadingState } from "@/shared/ui/LoadingState";
import { ErrorState } from "@/shared/ui/ErrorState";
import { EmptyState } from "@/shared/ui/EmptyState";
import { EXPERT_STATUS_MAP } from "@/entities/expert/constatnt/expert.constants";
import { useDeleteExpert } from "@/entities/expert/hook/useExpertMutations";
import { useExpertProfile } from "@/entities/expert/hook/useExpertProfile";
import { ExpertProfileForm } from "@/entities/expert/ui/ExpertProfileForm";

export default function ExpertProfile() {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  
  const { mutate: deleteProfile, isPending: isDeleting } = useDeleteExpert();
  const { data: profile, isLoading, isError } = useExpertProfile();

  const handleDeleteProfile = () => {
    if (window.confirm("Are you sure you want to delete your expert profile? This action cannot be undone! 🚨")) {
      deleteProfile();
    }
  };

  if (isLoading) return <LoadingState />;
  if (isError) return <ErrorState />;
  if (!profile) return <EmptyState />;

  const statusKey = profile.availabilityStatus?.toUpperCase() as keyof typeof EXPERT_STATUS_MAP;
  const currentStatus = EXPERT_STATUS_MAP[statusKey] || EXPERT_STATUS_MAP.OFF_SHIFT;

  const fullName = profile.user?.firstName || profile.user?.lastName 
    ? `${profile.user.firstName || ''} ${profile.user.lastName || ''}`.trim() 
    : "Professional Profile";

  return (
    <>
      {/* Profile Card Widget */}
      <div className="w-full max-w-sm bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-100 flex flex-col items-center text-center transition-all hover:shadow-md">
        
        {/* Avatar Section */}
        <div className="relative group">
          <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-slate-50 shadow-inner bg-slate-100 flex items-center justify-center">
            {profile.avatarUrl ? (
              <Image 
                src={profile.avatarUrl} 
                alt={fullName} 
                width={160}
                height={160}
                className="w-full h-full object-cover" 
              />
            ) : (
              <span className="text-5xl text-slate-300">👤</span>
            )}
          </div>

          {/* Quick Change Photo Button */}
          <button 
            type="button"
            onClick={() => setIsEditModalOpen(true)}
            className="mt-3 flex items-center justify-center gap-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 px-4 py-2 rounded-xl transition-all mx-auto cursor-pointer"
          >
            <Camera size={15} />
            <span>Change photo</span>
          </button>
        </div>

        {/* Profile Completion Bar */}
        <div className="w-full mt-6 bg-slate-50 p-4 rounded-2xl border border-slate-100/80">
          <div className="flex justify-between items-center text-xs font-bold text-slate-700 mb-2">
            <span>Profile completion</span>
            <span className="text-amber-500">80%</span>
          </div>
          <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
            <div className="bg-amber-500 w-[80%] h-full"></div>
          </div>
        </div>

        {/* Delete Profile Action */}
        <button 
          type="button"
          onClick={handleDeleteProfile}
          disabled={isDeleting}
          className="mt-6 w-full py-2.5 px-4 text-xs font-medium text-red-500 hover:text-red-700 hover:bg-red-50 rounded-xl transition-all flex items-center justify-center gap-1.5 disabled:opacity-50 cursor-pointer"
        >
          <Trash2 size={14} />
          <span>{isDeleting ? "Deleting..." : "Delete profile"}</span>
        </button>
      </div>

      {/* Modern Sleek Edit Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-3 sm:p-6 overflow-y-auto animate-in fade-in duration-200">
          
          {/* Overlay Click Area to Close */}
          <div 
            className="fixed inset-0 -z-10" 
            onClick={() => setIsEditModalOpen(false)} 
          />

          <div className="bg-white rounded-[2.5rem] w-full max-w-2xl max-h-[92vh] flex flex-col relative shadow-2xl border border-slate-100 overflow-hidden">
            
            {/* Close Button Top Right */}
            <button
              type="button"
              onClick={() => setIsEditModalOpen(false)}
              className="absolute top-5 right-5 w-9 h-9 flex items-center justify-center bg-slate-100 hover:bg-slate-200 text-slate-500 rounded-full transition-all z-20 cursor-pointer"
              aria-label="Close modal"
            >
              <X size={18} />
            </button>

            {/* Modal Body with Custom Clean Scroll */}
            <div className="p-4 sm:p-6 overflow-y-auto [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:bg-slate-200 [&::-webkit-scrollbar-thumb]:rounded-full">
              <ExpertProfileForm
                key={`form-${profile.id}`}
                expertId={profile.id as any}
                initialData={profile}
                onSuccessCallback={() => setIsEditModalOpen(false)}
              />
            </div>

          </div>
        </div>
      )}
    </>
  );
}
