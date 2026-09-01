'use client';

import React from 'react';
import { Star, MapPin, Mail, Calendar, Info, Hash } from 'lucide-react';

// تایپ‌ها بر اساس دیتای شما (بدون پسورد)
interface ExpertData {
  id: string;
  rating: string;
  bio: string;
  location: { type: string; coordinates: number[] };
  createdAt: string;
  updatedAt: string;
  availabilityStatus: string;
  user: {
    id: number;
    name: string;
    lastName: string;
    email: string;
    role: string;
  };
  category: { id: number; name: string };
  avatar: string | null;
}

export const GlassyCompactCard = ({ data }: { data: ExpertData }) => {
  // فرمت تاریخ
  const joinedDate = new Date(data.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  // استایل‌دهی وضعیت
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available': return 'bg-green-400 shadow-[0_0_8px_rgba(74,222,128,0.6)]';
      case 'in_service': return 'bg-blue-400 shadow-[0_0_8px_rgba(96,165,250,0.6)]';
      case 'off_shift': return 'bg-gray-400 shadow-[0_0_8px_rgba(156,163,175,0.6)]';
      default: return 'bg-gray-400';
    }
  };

  return (
    /* کانتینر اصلی با افکت شیشه‌ای سرمه‌ای */
    <div className="relative w-[320px] overflow-hidden rounded-2xl border border-white/20 bg-[#061c38]/50 p-5 text-white shadow-2xl backdrop-blur-md">
      
      {/* هدر کارت: عکس و اطلاعات اصلی */}
      <div className="flex items-center gap-4 border-b border-white/10 pb-4">
        {/* آواتار */}
        <div className="relative h-14 w-14 shrink-0 rounded-full border-2 border-[#f6c72d] bg-slate-200 shadow-sm">
          {data.avatar ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img 
              src={data.avatar} 
              alt={data.user.name} 
              className="h-full w-full rounded-full object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center rounded-full bg-[#f6c72d] text-xl font-bold text-[#061c38]">
              {data.user.name.charAt(0).toUpperCase()}
            </div>
          )}
          {/* نشانگر وضعیت */}
          <div className={`absolute bottom-0 right-0 h-3.5 w-3.5 rounded-full border-2 border-[#061c38] ${getStatusColor(data.availabilityStatus)}`} />
        </div>

        {/* نام و دسته‌بندی */}
        <div className="flex-1 overflow-hidden">
          <h3 className="truncate text-lg font-bold">
            {data.user.name} {data.user.lastName}
          </h3>
          <div className="flex items-center gap-2">
            <span className="rounded bg-[#f6c72d]/20 px-2 py-0.5 text-[10px] font-semibold tracking-wider text-[#f6c72d]">
              {data.category.name}
            </span>
            <div className="flex items-center gap-0.5 text-xs font-medium text-yellow-400">
              <Star size={12} className="fill-yellow-400" />
              {data.rating}
            </div>
          </div>
        </div>
      </div>

      {/* بدنه کارت: بیو و ایمیل */}
      <div className="py-3 text-sm">
        <p className="mb-2 line-clamp-2 text-gray-200">
          <span className="font-semibold text-white/70">Bio: </span>
          {data.bio}
        </p>
        <div className="flex items-center gap-2 text-xs text-gray-300">
          <Mail size={14} className="text-[#f6c72d]" />
          <span className="truncate">{data.user.email}</span>
        </div>
      </div>

      {/* اطلاعات تکمیلی (فشرده و جمع‌وجور در یک گرید) */}
      <div className="mt-2 rounded-xl bg-black/20 p-3 text-[10px] text-gray-300">
        <div className="grid grid-cols-2 gap-2">
          {/* لوکیشن */}
          <div className="flex items-center gap-1.5">
            <MapPin size={12} className="text-white/60" />
            <span className="truncate">
              {data.location.coordinates[0].toFixed(4)}, {data.location.coordinates[1].toFixed(4)}
            </span>
          </div>
          {/* تاریخ عضویت */}
          <div className="flex items-center gap-1.5">
            <Calendar size={12} className="text-white/60" />
            <span>{joinedDate}</span>
          </div>
          {/* نقش کاربر */}
          <div className="flex items-center gap-1.5">
            <Info size={12} className="text-white/60" />
            <span className="uppercase">Role: {data.user.role}</span>
          </div>
          {/* آیدی (مخفف شده) */}
          <div className="flex items-center gap-1.5">
            <Hash size={12} className="text-white/60" />
            <span className="truncate" title={data.id}>
              ID: {data.id.substring(0, 8)}...
            </span>
          </div>
        </div>
      </div>

    </div>
  );
};
