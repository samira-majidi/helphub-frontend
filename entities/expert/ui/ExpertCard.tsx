'use client';

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  CheckCircle2, 
  ChevronDown, 
  ChevronUp, 
  MessageCircle, 
  Star, 
  MapPin, 
  Calendar, 
  AlignLeft 
} from "lucide-react";
import { ExpertProfileData, ExpertAvailabilityStatus } from "../types/experts.types";

interface ExpertCardProps {
  expert: ExpertProfileData & {
    bio?: string;
    rating?: string;
    createdAt?: string;
    location?: { coordinates: number[] };
  };
  distanceKm?: number;
}

const getStatusConfig = (status?: string) => {
  switch (status?.toLowerCase()) {
    case ExpertAvailabilityStatus.AVAILABLE:
      return {
        dotColor: "bg-emerald-500",
        badgeBg: "bg-emerald-50 text-emerald-700 border-emerald-100",
        label: "Available",
      };
    case ExpertAvailabilityStatus.BUSY:
      return {
        dotColor: "bg-amber-500",
        badgeBg: "bg-amber-50 text-amber-700 border-amber-100",
        label: "In Service",
      };
    case ExpertAvailabilityStatus.OFF_SHIFT:
    default:
      return {
        dotColor: "bg-slate-400",
        badgeBg: "bg-slate-100 text-slate-600 border-slate-200/60",
        label: "Off Shift",
      };
  }
};

export default function ExpertCard({ expert, distanceKm }: ExpertCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const { 
    id, 
    user, 
    category, 
    availabilityStatus, 
    avatarUrl, 
    avatar, 
    bio, 
    rating, 
    createdAt, 
    location 
  } = expert;

  const finalAvatar = avatarUrl || avatar?.path;
  const firstName = user?.name || user?.firstName || "";
  const lastName = user?.lastName || "";
  const fullName = `${firstName} ${lastName}`.trim() || "HelpHub Expert";
  const firstLetter = fullName.charAt(0).toUpperCase();

  const statusConfig = getStatusConfig(availabilityStatus);

  return (
    <div className="group relative flex w-full flex-col justify-between rounded-2xl border border-slate-200/90 bg-white p-4 shadow-sm transition-all duration-200 hover:border-slate-300 hover:shadow-md sm:p-5">
      
      {/* Top Main Row: Avatar + Info + Status Badge */}
      <div className="flex items-start justify-between gap-2 sm:gap-4">
        
        <div className="flex min-w-0 items-start gap-3 sm:gap-4">
          
          {/* Avatar with Online/Offline Indicator */}
          <div className="relative h-14 w-14 shrink-0 sm:h-16 sm:w-16">
            <div className="relative h-14 w-14 overflow-hidden rounded-full border border-slate-100 bg-slate-100 shadow-inner sm:h-16 sm:w-16">
              {finalAvatar ? (
                <Image
                  src={finalAvatar}
                  alt={fullName}
                  fill
                  sizes="(max-width: 640px) 56px, 64px"
                  className="object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-[#061c38] text-lg font-bold text-white sm:text-xl">
                  {firstLetter}
                </div>
              )}
            </div>
            {/* Status Dot on Avatar */}
            <span
              className={`absolute bottom-0 right-0 h-3.5 w-3.5 rounded-full border-2 border-white shadow-xs sm:right-0.5 sm:h-4 sm:w-4 ${statusConfig.dotColor}`}
            />
          </div>

          {/* Text Information */}
          <div className="flex min-w-0 flex-col pt-0.5 sm:pt-1">
            <div className="flex items-center gap-1 sm:gap-1.5">
              <h3 className="truncate font-sans text-sm font-bold text-[#061c38] sm:text-lg capitalize">
                {fullName}
              </h3>
              <CheckCircle2 className="h-3.5 w-3.5 shrink-0 fill-[#f6c72d] text-[#061c38] sm:h-4 sm:w-4" />
            </div>

            <p className="mt-0.5 truncate text-xs font-medium text-slate-500 sm:text-sm">
              {category?.name || "Home Services"}
            </p>

            {typeof distanceKm === "number" && (
              <p className="mt-1 text-[10px] font-semibold text-slate-400 sm:text-xs">
                {distanceKm.toFixed(1)} km away
              </p>
            )}
          </div>
        </div>

        {/* Status Badge (Top Right) */}
        <span
          className={`flex shrink-0 items-center gap-1 rounded-full border px-2 py-1 text-[10px] font-semibold sm:gap-1.5 sm:px-3 sm:py-1 sm:text-xs ${statusConfig.badgeBg}`}
        >
          <span className={`h-1.5 w-1.5 shrink-0 rounded-full sm:h-2 sm:w-2 ${statusConfig.dotColor}`} />
          {statusConfig.label}
        </span>
      </div>

      {/* Dropdown Toggle Button */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="mt-4 flex w-full items-center justify-between border-t border-slate-100 pt-3 text-sm font-semibold text-slate-500 transition-colors hover:text-[#061c38]"
      >
        <span>{isExpanded ? 'Hide details' : 'View more details'}</span>
        {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
      </button>

      {/* Dropdown Content Area (More Info) */}
      {isExpanded && (
        <div className="mt-3 flex flex-col gap-3 rounded-xl bg-slate-50 p-4 text-sm text-slate-600 animate-in fade-in slide-in-from-top-2 duration-300">
          
          {/* Rating */}
          <div className="flex items-center gap-2">
            <Star size={16} className="text-[#f6c72d] fill-[#f6c72d]" />
            <span className="text-slate-700">
              <strong className="font-semibold text-slate-800">Rating: </strong>
              {rating || '0.0'}
            </span>
          </div>

          {/* Bio */}
          <div className="flex items-start gap-2">
            <AlignLeft size={16} className="mt-0.5 shrink-0 text-slate-400" />
            <p className="leading-relaxed text-slate-700">
              <strong className="font-semibold text-slate-800">About: </strong>
              {bio || 'No description provided.'}
            </p>
          </div>

          {/* Location */}
          {location?.coordinates && (
            <div className="flex items-center gap-2">
              <MapPin size={16} className="shrink-0 text-slate-400" />
              <span className="text-slate-700">
                <strong className="font-semibold text-slate-800">Coordinates: </strong>
                <span>[{location.coordinates[0].toFixed(3)}, {location.coordinates[1].toFixed(3)}]</span>
              </span>
            </div>
          )}

          {/* Join Date */}
          {createdAt && (
            <div className="flex items-center gap-2">
              <Calendar size={16} className="shrink-0 text-slate-400" />
              <span className="text-slate-700">
                <strong className="font-semibold text-slate-800">Member since: </strong>
                {new Date(createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
              </span>
            </div>
          )}
        </div>
      )}

   
      <div className="mt-4 flex items-center justify-end border-t border-slate-100 pt-4 sm:mt-5">
        <Link
           href={`/expert-profile/${id}`}
          className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#f6c72d] px-6 py-2 text-sm font-bold text-[#061c38] shadow-sm transition-colors hover:bg-[#eab308] active:scale-[0.99] sm:w-auto sm:py-2.5"
        >
          <MessageCircle size={18} />
          Chat with Expert
        </Link>
      </div>
      
    </div>
  );
}
