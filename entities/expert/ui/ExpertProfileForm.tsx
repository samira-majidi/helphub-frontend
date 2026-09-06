"use client";

import React from "react";
import { useWatch, Controller } from "react-hook-form";

import { AutoUploadInput } from "@/shared/ui/AutoUploadInput";
import CategorySelect from "@/entities/categories/ui/CategorySelect";
import { MapField } from "@/features/map/MapField";

import { useExpertForm } from "../hook/useExpertForm";
import { ExpertProfileData } from "../types/experts.types";

interface ExpertProfileFormProps {
   expertId?: string;
  initialData?: ExpertProfileData;
  onSuccessCallback?: () => void;
}

export const ExpertProfileForm: React.FC<ExpertProfileFormProps> = (props) => {
 const { methods, isSubmitting, isEditing, handleUploadSuccess, onSubmit } = useExpertForm({
   ...props,
  expertId: props.expertId?.toString(),
});
  const { control, formState: { errors } } = methods;
  const uploadedImageIds = useWatch({ control, name: "imageIds" });

  return (
 <div className="w-full">

      <form onSubmit={onSubmit} className="space-y-8">
        {/* Category Field */}
        <div className="flex flex-col gap-3">
          <label className="text-[13px] font-bold text-[#0F172A] uppercase tracking-wide flex items-center gap-2">
            <span className="text-lg">🛠️</span> Expertise Category
          </label>
          <div className="rounded-2xl border-2 border-[#F6E05E]/60 bg-[#FFFAF0]/50 p-4 shadow-sm transition-all focus-within:border-[#F6E05E] focus-within:ring-4 focus-within:ring-[#F6E05E]/20">
            <Controller
              name="categoryId"
              control={control}
              render={({ field }) => (
                <CategorySelect
                  value={field.value}
                  onChange={field.onChange}
                  error={errors.categoryId?.message}
                />
              )}
            />
          </div>
        </div>

        {/* Bio Field */}
        <div className="flex flex-col gap-3">
          <label className="text-[13px] font-bold text-[#0F172A] uppercase tracking-wide flex items-center gap-2">
            <span className="text-lg">📋</span> Biography (Bio)
          </label>
          <div className="relative">
            <Controller
              name="bio"
              control={control}
              render={({ field }) => (
                <textarea
                  {...field}
                  rows={4}
                  placeholder="Briefly describe your skills and professional background..."
                  className="w-full p-5 border border-orange-200/60 rounded-[1.5rem] focus:outline-none focus:ring-2 focus:ring-orange-400/20 focus:border-orange-400 transition-all placeholder:text-slate-400 bg-orange-50/30 text-slate-700 resize-none"
                />
              )}
            />
            {/* استایل نمایشی کانتر متن مثل عکس (می‌تونی بعداً داینامیکش کنی) */}
            <span className="absolute bottom-4 right-4 text-xs text-slate-400 font-medium">
              114/500
            </span>
          </div>
          {errors.bio && (
            <span className="text-xs text-red-500 font-semibold px-2">
              {errors.bio.message}
            </span>
          )}
        </div>

        {/* File Upload Field */}
        <div className="flex flex-col gap-3">
          <label className="text-[13px] font-bold text-[#0F172A] uppercase tracking-wide flex items-center gap-2">
            <span className="text-lg">👤</span> Profile Photo
          </label>
          <div className="border-2 border-dashed border-slate-200 rounded-[2rem] p-6 flex flex-col md:flex-row items-center justify-center gap-6 bg-slate-50/50 hover:bg-slate-50 transition-colors">
            <div className="flex-1 w-full flex flex-col items-center justify-center">
              <AutoUploadInput
                onUploadSuccess={handleUploadSuccess}
                label="Click to upload or drag & drop (JPG, PNG)"
                isPrivate={false}
              />
              {/* پیام موفقیت دقیقاً با استایل عکس طراحی شد */}
              {uploadedImageIds && uploadedImageIds.length > 0 && (
                <div className="mt-4 px-4 py-2 bg-emerald-50 border border-emerald-100 rounded-full flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center text-white">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-xs text-emerald-700 font-bold">
                    {uploadedImageIds.length} Photo uploaded successfully
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Location / Map Field */}
        <div className="flex flex-col gap-3">
          <label className="text-[13px] font-bold text-[#0F172A] uppercase tracking-wide flex items-center gap-2">
            <span className="text-lg">📍</span> Service Area Selection
          </label>
          <div className="border border-slate-200 p-2 rounded-[2rem] bg-white shadow-sm overflow-hidden">
            <MapField
              control={control}
              name="location"
              label=""
            />
          </div>
          {errors.location && (
            <span className="text-xs text-red-500 font-semibold px-2 block italic">
              Please pin your service location on the map.
            </span>
          )}
        </div>

        {/* Final Submission Button */}
        <button
          type="submit"
          disabled={isSubmitting}
         className="
  w-full
  h-12
  mt-2
  bg-[#0F172A]
  hover:bg-slate-800
  text-white
  font-semibold
  text-sm
  rounded-2xl
  shadow-[0_8px_20px_rgba(15,23,42,0.12)]
  transition-all
  active:scale-[0.99]
  disabled:opacity-60
  disabled:cursor-not-allowed
  flex items-center justify-center gap-2
  cursor-pointer
"
        >
         {isSubmitting
  ? "Saving changes..."
  : isEditing
  ? "Save Changes"
  : "Create Profile"}
        </button>
      </form>
    </div>
  );
};
