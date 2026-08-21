import Image from "next/image";
import Link from "next/link";
import { ExpertProfileData, ExpertAvailabilityStatus } from "../types/experts.types";
import { HiOutlineMail, HiArrowLeft } from "react-icons/hi";

interface ExpertCardProps {
  expert: ExpertProfileData;
}

const getStatusConfig = (status?: string) => {
  switch (status?.toLowerCase()) {
    case ExpertAvailabilityStatus.AVAILABLE:
      return { 
        dotColor: "bg-emerald-500", 
        badgeBg: "bg-emerald-50", 
        badgeText: "text-emerald-700", 
        label: "Available" 
      };
    case ExpertAvailabilityStatus.BUSY:
      return { 
        dotColor: "bg-rose-500", 
        badgeBg: "bg-rose-50", 
        badgeText: "text-rose-700", 
        label: "Busy" 
      };
    case ExpertAvailabilityStatus.OFF_SHIFT:
      return { 
        dotColor: "bg-slate-400", 
        badgeBg: "bg-slate-100", 
        badgeText: "text-slate-600", 
        label: "Off Shift" 
      };
    default:
      return { 
        dotColor: "bg-gray-300", 
        badgeBg: "bg-gray-100", 
        badgeText: "text-gray-600", 
        label: "Unknown" 
      };
  }
};

export default function ExpertCard({ expert }: ExpertCardProps) {
  const { id, user, category, bio, availabilityStatus, avatarUrl, avatar } = expert;

  const finalAvatar = avatarUrl || avatar?.path;
  
  const firstName = user?.name || user?.firstName || "";
  const lastName = user?.lastName || "";
  const fullName = `${firstName} ${lastName}`.trim() || "Unknown User";
  const firstLetter = fullName !== "Unknown User" ? fullName.charAt(0).toUpperCase() : "?";

  const statusConfig = getStatusConfig(availabilityStatus);

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-200/60 focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2">
      
      <div className="relative mb-8 h-16 bg-gradient-to-r from-blue-50 to-indigo-50">
        <div className="absolute -bottom-6 right-5 rounded-full border-4 border-white bg-white shadow-sm">
          <div className="relative h-14 w-14 overflow-hidden rounded-full bg-slate-100">
            {finalAvatar ? (
              <Image
                src={finalAvatar}
                alt={`Image of ${fullName}`}
                fill
                sizes="56px"
                className="object-cover"
              />
            ) : (
              <div
                className="flex h-full w-full items-center justify-center bg-gradient-to-br from-blue-500 to-indigo-600 text-xl font-bold text-white"
                aria-label={`First letter of ${fullName}`}
              >
                {firstLetter}
              </div>
            )}
          </div>
          <span 
            className={`absolute bottom-0.5 right-0.5 h-3.5 w-3.5 rounded-full border-2 border-white ${statusConfig.dotColor}`}
            title={statusConfig.label}
          />
        </div>
      </div>

      <div className="flex flex-1 flex-col px-5 pb-5">
        
        <div className="mb-3 flex items-start justify-between">
          <div className="w-full">
            <h3 className="text-lg font-bold text-slate-800 line-clamp-1" title={fullName}>
              {fullName}
            </h3>
            <div className="mt-2 flex flex-wrap items-center gap-2 text-xs">
              <span className="font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded-md">
                {category?.name || "Uncategorized"}
              </span>
              
              <span className={`font-medium px-2 py-1 rounded-md flex items-center gap-1 ${statusConfig.badgeBg} ${statusConfig.badgeText}`}>
                <span className={`h-1.5 w-1.5 rounded-full ${statusConfig.dotColor}`}></span>
                {statusConfig.label}
              </span>
            </div>
          </div>
        </div>

        {user?.email && (
          <div className="mb-3 flex items-center gap-2 text-xs text-slate-500">
             <HiOutlineMail className="h-4 w-4 text-slate-400 shrink-0" />
             <span className="truncate" dir="ltr">{user.email}</span>
          </div>
        )}

        <p className="line-clamp-3 text-sm leading-relaxed text-slate-600 mt-2">
          {bio || "No bio available for this expert."}
        </p>

        <div className="mt-auto pt-5">
          <Link
            href={`/experts/${id}`}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-slate-50 px-4 py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:bg-blue-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            View Full Profile
            <HiArrowLeft className="h-4 w-4" />
          </Link>
        </div>
        
      </div>
    </article>
  );
}
