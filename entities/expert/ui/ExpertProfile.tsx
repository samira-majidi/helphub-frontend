"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { ExpertProfileForm } from "./ExpertProfileForm"; 
import { useDeleteExpert } from "../hook/useExpertMutations";
import { useExpertProfile } from "../hook/useExpertProfile";
import { EXPERT_STATUS_MAP } from "../constatnt/expert.constants";

import { LoadingState } from "@/shared/ui/LoadingState";
import { ErrorState } from "@/shared/ui/ErrorState";
import { EmptyState } from "@/shared/ui/EmptyState";
import { Trash2, Edit2, MapPin, AlignRight, Activity, Loader2 } from "lucide-react";

export default function ExpertProfile() {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [addressText, setAddressText] = useState<string | null>(null);
  const [isLoadingAddress, setIsLoadingAddress] = useState(false);
  
  const { mutate: deleteProfile, isPending: isDeleting } = useDeleteExpert();
  const { data: profile, isLoading, isError } = useExpertProfile();

  // 📍 تبدیل مختصات به آدرس کامل و دقیق (شامل خیابان، محله، شهر و کشور)
  useEffect(() => {
    const coords = profile?.location?.coordinates;
    if (coords && coords.length === 2) {
      const lng = coords[0];
      const lat = coords[1];

      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsLoadingAddress(true);
      fetch(
        `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json&accept-language=en`
      )
        .then((res) => res.json())
        .then((data) => {
          if (data && data.address) {
            const addr = data.address;

            // ۱. خیابان / کوچه / مسیر
            const street = addr.road || addr.pedestrian || addr.street || addr.footway || addr.path;
            
            // ۲. محله / منطقه شهری
            const neighbourhood = addr.neighbourhood || addr.suburb || addr.quarter || addr.district;
            
            // ۳. شهر / شهرستان / روستا
            const city = addr.city || addr.town || addr.village || addr.municipality || addr.county || addr.state;
            
            // ۴. کشور
            const country = addr.country;

            // ترکیب فیلدهای موجود بدون بخش‌های تکراری
            const parts = [street, neighbourhood, city, country].filter(Boolean);

            if (parts.length > 0) {
              setAddressText(parts.join(", "));
            } else if (data.display_name) {
              // در صورت موجود نبودن اجزا، ۳ بخش اول display_name را انتخاب کن
              setAddressText(data.display_name.split(",").slice(0, 3).join(", ").trim());
            } else {
              setAddressText(`${lat.toFixed(4)}, ${lng.toFixed(4)}`);
            }
          } else {
            setAddressText(`${lat.toFixed(4)}, ${lng.toFixed(4)}`);
          }
        })
        .catch(() => {
          setAddressText(`${lat.toFixed(4)}, ${lng.toFixed(4)}`);
        })
        .finally(() => {
          setIsLoadingAddress(false);
        });
    }
  }, [profile?.location?.coordinates]);

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
    : "Expert User";

  // محاسبه درصد تکمیل پروفایل
  let completionPercentage = 20;
  if (profile.bio) completionPercentage += 20;
  if (profile.avatarUrl) completionPercentage += 20;
  if (profile.location?.coordinates) completionPercentage += 20;
  if (profile.category) completionPercentage += 20;

  return (
    <>
      <div className="bg-white rounded-[2rem] p-6 shadow-sm border border-slate-100 flex flex-col items-center w-full h-full min-h-[600px]">
        
        {/* Profile Image */}
        <div className="relative w-[120px] h-[120px] rounded-full overflow-hidden mb-5 shrink-0 bg-slate-100">
          {profile.avatarUrl ? (
            <Image 
              src={profile.avatarUrl} 
              alt={fullName} 
              fill
              className="object-cover" 
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-4xl">👤</div>
          )}
        </div>

        {/* Name & Specialty */}
        <h2 className="text-2xl font-bold text-slate-900 mb-1 text-center">
          {fullName}
        </h2>
        <p className="text-slate-500 font-medium mb-2 text-center uppercase tracking-wide text-xs">
          {profile.category?.name || "Specialty not specified"}
        </p>

        {profile.user?.email && (
          <p className="text-slate-400 text-sm mb-6 text-center">
            {profile.user.email}
          </p>
        )}

        {/* Info Cards */}
        <div className="w-full flex flex-col gap-3 text-sm text-slate-600 text-left mb-6">
          
          {/* Status */}
          <div className="flex items-center justify-between bg-slate-50/80 p-3 rounded-2xl border border-slate-100">
            <span className="flex items-center gap-2 text-slate-500 font-medium text-xs">
              <Activity className="w-4 h-4 text-slate-400" /> Status
            </span>
            <span className={`px-2.5 py-1 rounded-full text-xs font-semibold border ${currentStatus.color}`}>
              {currentStatus.label}
            </span>
          </div>

          {/* About Me */}
          {profile.bio && (
            <div className="bg-slate-50/80 p-3.5 rounded-2xl border border-slate-100">
              <span className="flex items-center gap-2 mb-1.5 font-medium text-slate-500 text-xs">
                <AlignRight className="w-4 h-4 text-slate-400" /> About Me
              </span>
              <p className="text-slate-600 leading-relaxed text-xs">
                {profile.bio}
              </p>
            </div>
          )}

          {/* Location / Detailed Address */}
          {profile.location?.coordinates && (
            <div className="bg-slate-50/80 p-3.5 rounded-2xl border border-slate-100">
              <span className="flex items-center gap-2 mb-1.5 font-medium text-slate-500 text-xs">
                <MapPin className="w-4 h-4 text-amber-500 shrink-0" /> Location
              </span>
              <div className="text-slate-700 font-medium text-xs pl-6 leading-relaxed">
                {isLoadingAddress ? (
                  <span className="flex items-center gap-1.5 text-slate-400">
                    <Loader2 className="w-3.5 h-3.5 animate-spin" /> Fetching detailed address...
                  </span>
                ) : (
                  <span>{addressText || "Not specified"}</span>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Progress Bar & Actions */}
        <div className="w-full mt-auto pt-4">
          <div className="flex justify-between items-center mb-2 text-xs">
            <span className="text-slate-600 font-medium">Profile completion</span>
            <span className="text-slate-900 font-bold">{completionPercentage}%</span>
          </div>
          <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden mb-6">
            <div 
              className="h-full bg-amber-400 rounded-full transition-all duration-700" 
              style={{ width: `${completionPercentage}%` }}
            />
          </div>

          <div className="flex items-center gap-3 w-full">
            <button 
              onClick={() => setIsEditModalOpen(true)}
              className="flex-1 bg-[#0F172A] hover:bg-slate-800 text-white py-3 px-4 rounded-2xl font-medium flex items-center justify-center gap-2 transition-colors shadow-sm text-xs cursor-pointer"
            >
              <Edit2 className="w-4 h-4" />
              Edit profile
            </button>
            
            <button 
              onClick={handleDeleteProfile}
              disabled={isDeleting}
              title="Delete profile"
              className="w-[44px] h-[44px] shrink-0 flex items-center justify-center bg-red-50 text-red-500 hover:bg-red-100 hover:text-red-600 rounded-2xl transition-colors disabled:opacity-50 cursor-pointer"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-[2.5rem] w-full max-w-3xl max-h-[90vh] overflow-y-auto relative shadow-2xl">
            <button
              onClick={() => setIsEditModalOpen(false)}
              className="absolute top-6 right-6 w-8 h-8 flex items-center justify-center bg-slate-100 hover:bg-red-100 text-slate-600 hover:text-red-600 rounded-full transition-colors z-10 cursor-pointer"
            >
              ✕
            </button>

            <div className="p-6 sm:p-8">
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
