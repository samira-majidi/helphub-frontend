'use client';

import React from 'react';
import Image from 'next/image';
import { Star, MapPin, Mail, Calendar, Info, Hash } from 'lucide-react';
import { useExpertById } from '../hook/useExpertById'; // مسیر رو در صورت نیاز تنظیم کن

interface ExpertProfileProps {
  expertId: string;
}

const ExpertProfile: React.FC<ExpertProfileProps> = ({ expertId }) => {
  // واکشی دیتا با استفاده از هوک
  const { data: expert, isLoading, isError } = useExpertById(expertId);

  // ۱. هندل کردن حالت لودینگ (کمی استایل دادیم که شیک‌تر بشه)
  if (isLoading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-[#061c38] border-t-[#f6c72d]"></div>
          <p className="animate-pulse font-medium text-[#061c38]">Loading expert profile... ⏳</p>
        </div>
      </div>
    );
  }

  // ۲. هندل کردن حالت خطا
  if (isError) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center p-4">
        <p className="rounded-xl border border-red-200 bg-red-50 px-6 py-4 text-center text-red-600 shadow-sm">
          Oops! Something went wrong while fetching data. ❌
        </p>
      </div>
    );
  }

  // ۳. هندل کردن حالتی که دیتایی پیدا نشده
  if (!expert) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center p-4">
        <p className="rounded-xl border border-gray-200 bg-gray-50 px-6 py-4 text-center text-gray-600 shadow-sm">
          Expert Not Found! 🕵️‍♂️
        </p>
      </div>
    );
  }

  // -- از اینجا به بعد دیتا با موفقیت لود شده --

  // فرمت تاریخ عضویت
  const joinedDate = expert.createdAt
    ? new Date(expert.createdAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      })
    : 'Unknown';

  // استایل‌دهی وضعیت
  const getStatusColor = (status?: string) => {
    switch (status) {
      case 'available': return 'bg-green-400 shadow-[0_0_8px_rgba(74,222,128,0.6)]';
      case 'in_service': return 'bg-blue-400 shadow-[0_0_8px_rgba(96,165,250,0.6)]';
      case 'off_shift': return 'bg-gray-400 shadow-[0_0_8px_rgba(156,163,175,0.6)]';
      default: return 'bg-gray-400';
    }
  };

  // استخراج حرف اول نام برای زمانی که آواتار وجود نداره
  const initial = expert.user?.name ? expert.user.name.charAt(0).toUpperCase() : '?';

  return (
    <div className="mx-auto flex max-w-4xl items-center justify-center p-6">
      
      {/* کانتینر اصلی با افکت شیشه‌ای سرمه‌ای */}
      <div className="relative w-full max-w-[340px] overflow-hidden rounded-3xl border border-[#061c38]/20 bg-[#061c38]/90 p-6 text-white shadow-2xl backdrop-blur-xl">
        
        {/* هدر کارت: عکس و اطلاعات اصلی */}
        <div className="flex items-center gap-4 border-b border-white/10 pb-5">
          {/* آواتار با Next/Image */}
          <div className="relative h-16 w-16 shrink-0 rounded-full border-2 border-[#f6c72d] bg-slate-200 shadow-sm">
            {expert.avatar ? (
              <Image 
                src={expert.avatar} 
                alt={expert.user?.name || 'Expert Avatar'} 
                width={64}
                height={64}
                className="h-full w-full rounded-full object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center rounded-full bg-[#f6c72d] text-2xl font-bold text-[#061c38]">
                {initial}
              </div>
            )}
            {/* نشانگر وضعیت */}
            <div className={`absolute bottom-0 right-0 h-4 w-4 rounded-full border-2 border-[#061c38] ${getStatusColor(expert.availabilityStatus)}`} />
          </div>

          {/* نام و دسته‌بندی */}
          <div className="flex-1 overflow-hidden">
            <h3 className="truncate text-xl font-bold">
              {expert.user?.name} {expert.user?.lastName}
            </h3>
            <div className="mt-1 flex items-center gap-2">
             
              <div className="flex items-center gap-1 text-xs font-semibold text-yellow-400">
                <Star size={14} className="fill-yellow-400" />
                {expert.rating || '0.0'}
              </div>
            </div>
          </div>
        </div>

        {/* بدنه کارت: بیو و ایمیل */}
        <div className="py-7 text-sm">
          <div className="mt-1 flex items-center gap-4">
              <span className="rounded bg-[#f6c72d]/20 px-8 py-1.5 text-[10px] font-bold tracking-wider text-[#f6c72d] mb-3">
                {expert.category?.name || 'UNKNOWN'}
              </span>
              
            </div>
          <p className="mb-3 line-clamp-3 leading-relaxed text-gray-200">
            <span className="font-semibold text-white/70">Bio: </span>
            {expert.bio || 'No description provided.'}
          </p>
          <div className="flex items-center gap-2 text-xs text-gray-300">
            <Mail size={16} className="shrink-0 text-[#f6c72d]" />
            <span className="truncate font-medium">{expert.user?.email || 'No email available'}</span>
          </div>
          
        </div>

        {/* اطلاعات تکمیلی (فشرده و جمع‌وجور در یک گرید) */}
        <div className="mt-2 rounded-xl bg-black/30 p-4 text-xs text-gray-300">
          <div className="grid grid-cols-2 gap-3">
            {/* لوکیشن */}
            <div className="flex items-center gap-1.5">
              <MapPin size={14} className="shrink-0 text-white/60" />
              <span className="truncate">
                {expert.location?.coordinates 
                  ? `${expert.location.coordinates[0].toFixed(3)}, ${expert.location.coordinates[1].toFixed(3)}`
                  : 'N/A'}
              </span>
            </div>
            {/* تاریخ عضویت */}
            <div className="flex items-center gap-1.5">
              <Calendar size={14} className="shrink-0 text-white/60" />
              <span className="truncate">{joinedDate}</span>
            </div>
            {/* نقش کاربر */}
            <div className="flex items-center gap-1.5">
              <Info size={14} className="shrink-0 text-white/60" />
              <span className="truncate uppercase">Role: {expert.user?.role || 'N/A'}</span>
            </div>
            
          </div>
        </div>

      </div>
    </div>
  );
};

export default ExpertProfile;
