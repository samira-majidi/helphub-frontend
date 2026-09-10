"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import dynamic from "next/dynamic"; // 👈 اضافه شد
import { useDeleteExpert } from "../hook/useExpertMutations";
import { useExpertProfile } from "../hook/useExpertProfile";
import { EXPERT_STATUS_MAP } from "../constatnt/expert.constants";

import { LoadingState } from "@/shared/ui/LoadingState";
import { ErrorState } from "@/shared/ui/ErrorState";
import { EmptyState } from "@/shared/ui/EmptyState";
import { Trash2, Edit2, MapPin, AlignRight, Activity, Loader2 } from "lucide-react";

// 👇 بارگذاری تنبل فرم فقط در زمان باز شدن مدال
const DynamicExpertProfileForm = dynamic(
  () => import("./ExpertProfileForm").then((mod) => mod.ExpertProfileForm),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-amber-500" />
      </div>
    ),
  }
);

export default function ExpertProfile() {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [addressText, setAddressText] = useState<string | null>(null);
  const [isLoadingAddress, setIsLoadingAddress] = useState(false);
  
  const { mutate: deleteProfile, isPending: isDeleting } = useDeleteExpert();
  const { data: profile, isLoading, isError } = useExpertProfile();
  useEffect(() => {
    const controller = new AbortController();

    const fetchAddress = async () => {
      const coords = profile?.location?.coordinates;
      
      // بررسی اولیه هم به داخل تابع async منتقل شد تا ESLint خطا نگیرد
      if (!coords || coords.length !== 2) {
        setAddressText(null);
        return;
      }

      const [lng, lat] = coords;

      try {
        setIsLoadingAddress(true);
        const res = await fetch(
          `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json&accept-language=en`,
          { signal: controller.signal }
        );
        const data = await res.json();

        if (data?.address) {
          const addr = data.address;
          const street = addr.road || addr.pedestrian || addr.street || addr.footway || addr.path;
          const neighbourhood = addr.neighbourhood || addr.suburb || addr.quarter || addr.district;
          const city = addr.city || addr.town || addr.village || addr.municipality || addr.county || addr.state;
          const country = addr.country;

          const parts = [street, neighbourhood, city, country].filter(Boolean);

          if (parts.length > 0) {
            setAddressText(parts.join(", "));
          } else if (data.display_name) {
            setAddressText(data.display_name.split(",").slice(0, 3).join(", ").trim());
          } else {
            setAddressText(`${lat.toFixed(4)}, ${lng.toFixed(4)}`);
          }
        } else {
          setAddressText(`${lat.toFixed(4)}, ${lng.toFixed(4)}`);
        }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        if (err.name !== "AbortError") {
          setAddressText(`${lat.toFixed(4)}, ${lng.toFixed(4)}`);
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsLoadingAddress(false);
        }
      }
    };

    fetchAddress();

    return () => {
      controller.abort();
    };
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
              sizes="120px" // 👈 بهینه‌سازی سایز عکس برای پرفورمنس
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

      {isEditModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#0F172A]/55 backdrop-blur-[6px] p-3 sm:p-6 animate-in fade-in duration-200"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) setIsEditModalOpen(false);
          }}
        >
          <div className="relative w-full max-w-2xl max-h-[92vh] overflow-hidden rounded-[28px] bg-white shadow-[0_25px_80px_rgba(15,23,42,0.25)] border border-white/80 animate-in zoom-in-[0.98] slide-in-from-bottom-3 duration-200">
            {/* Modal Header */}
            <div className="relative z-20 flex items-center justify-between px-5 sm:px-8 py-4 sm:py-5 bg-white/95 backdrop-blur-xl border-b border-slate-100">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-10 h-10 shrink-0 rounded-2xl bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-500">
                  <Edit2 className="w-[18px] h-[18px]" />
                </div>
                <div className="min-w-0">
                  <h2 className="text-base sm:text-lg font-bold text-[#0F172A] truncate">
                    Edit Professional Profile
                  </h2>
                  <p className="text-[11px] sm:text-xs text-slate-400 mt-0.5 truncate">
                    Keep your professional information up to date
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsEditModalOpen(false)}
                aria-label="Close modal"
                className="w-9 h-9 shrink-0 ml-3 rounded-xl flex items-center justify-center text-slate-400 bg-slate-50 border border-slate-100 hover:bg-red-50 hover:text-red-500 hover:border-red-100 transition-all cursor-pointer"
              >
                <span className="text-lg leading-none">×</span>
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="max-h-[calc(92vh-81px)] overflow-y-auto overscroll-contain px-4 py-5 sm:px-8 sm:py-7 [scrollbar-width:thin] [scrollbar-color:rgba(251,191,36,0.35)_transparent] [&::-webkit-scrollbar]:w-[4px] [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-amber-200/35 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-amber-300/55 max-sm:[scrollbar-width:none] max-sm:[&::-webkit-scrollbar]:hidden">
              <DynamicExpertProfileForm
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
