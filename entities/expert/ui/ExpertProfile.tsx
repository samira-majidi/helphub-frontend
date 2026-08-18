"use client";

import Image from "next/image";
import { useState } from "react";
import { ExpertProfileForm } from "./ExpertProfileForm"; 
import { useDeleteExpert } from "../hook/useExpertMutations";
import { useExpertProfile } from "../hook/useExpertProfile";
import { EXPERT_STATUS_MAP } from "../constatnt/expert.constants";

import { LoadingState } from "@/shared/ui/LoadingState";
import { ErrorState } from "@/shared/ui/ErrorState";
import { EmptyState } from "@/shared/ui/EmptyState";

export default function ExpertProfile() {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  
  const { mutate: deleteProfile, isPending: isDeleting } = useDeleteExpert();
  const { data: profile, isLoading, isError } = useExpertProfile();

  const handleDeleteProfile = () => {
    if (window.confirm("آیا از حذف پروفایل متخصص خود مطمئن هستید؟ این عملیات قابل بازگشت نیست! 🚨")) {
      deleteProfile();
    }
  };


  if (isLoading) return <LoadingState />;
  
  if (isError) return <ErrorState />;
  
  if (!profile) return <EmptyState />;

  const statusKey = profile.availabilityStatus.toUpperCase() as keyof typeof EXPERT_STATUS_MAP;
  const currentStatus = EXPERT_STATUS_MAP[statusKey] || EXPERT_STATUS_MAP.OFF_SHIFT;

  return (
    <>
      <div className="max-w-2xl mx-auto mt-10 bg-white shadow-xl rounded-2xl overflow-hidden border border-gray-100 transition-all hover:shadow-2xl">
        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 h-32"></div>
        
        <div className="px-6 py-8 relative">
          
          <div className="absolute -top-16 right-6 w-24 h-24 bg-white rounded-full p-2 shadow-lg border-2 border-indigo-100">
            <div className="w-full h-full bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
              {profile.avatarUrl ? (
               <Image 
                  src={profile.avatarUrl} 
                  alt="Avatar" 
                  width={96}
                  height={96}
                  className="w-full h-full object-cover" 
                />
              ) : (
                <span className="text-3xl text-gray-400">👤</span>
              )}
            </div>
          </div>

          <div className="mt-4">
            <h2 className="text-2xl font-bold text-gray-800">
              {profile.user?.firstName || profile.user?.lastName 
                ? `${profile.user.firstName} ${profile.user.lastName}`.trim() 
                : "پروفایل متخصص"}
            </h2>
            
            {profile.user?.email && (
              <p className="text-gray-500 text-sm mt-1 flex items-center gap-1">
                ✉️ {profile.user.email}
              </p>
            )}
            
            <div className="mt-3 flex items-center gap-2">
              <span className={`px-3 py-1 text-sm rounded-full font-medium border ${currentStatus.color}`}>
                {currentStatus.label}
              </span>
              
              {profile.category && (
                <span className="bg-indigo-50 text-indigo-700 px-3 py-1 text-sm rounded-full font-medium border border-indigo-200">
                  تخصص: {profile.category.name}
                </span>
              )}
            </div>
          </div>

          <div className="mt-8 space-y-4">
            <div>
              <h3 className="text-sm font-semibold text-gray-500 mb-1">درباره من (Bio)</h3>
              <p className="text-gray-700 bg-gray-50 p-4 rounded-xl leading-relaxed whitespace-pre-wrap">
                {profile.bio || "بیوگرافی ثبت نشده است."}
              </p>
            </div>

            {profile.location && (
              <div>
                <h3 className="text-sm font-semibold text-gray-500 mb-1">مختصات ثبت شده (نقشه)</h3>
                <div className="flex gap-4 text-sm text-gray-600 bg-gray-50 p-4 rounded-xl">
                  <span>📍 عرض جغرافیایی: {profile.location.lat}</span>
                  <span>📍 طول جغرافیایی: {profile.location.lng}</span>
                </div>
              </div>
            )}
          </div>
          
          <div className="mt-8 flex justify-end gap-3 border-t pt-4">
            <button 
              onClick={handleDeleteProfile}
              disabled={isDeleting}
              className="px-4 py-2 text-sm font-medium text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isDeleting ? "در حال حذف..." : "حذف پروفایل"}
            </button>
            <button 
              onClick={() => setIsEditModalOpen(true)}
              className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-md transition-all"
            >
              ویرایش اطلاعات
            </button>
          </div>
        </div>
      </div>

      {isEditModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto relative shadow-2xl">
            
            <button
              onClick={() => setIsEditModalOpen(false)}
              className="absolute top-4 left-4 w-8 h-8 flex items-center justify-center bg-gray-100 hover:bg-red-100 text-gray-600 hover:text-red-600 rounded-full transition-colors z-10"
            >
              ✕
            </button>

            <div className="p-2">
              <ExpertProfileForm 
                key={`form-${profile.id}`} 
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
