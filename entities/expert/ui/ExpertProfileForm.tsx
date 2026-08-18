"use client";

import React from "react";
import { useWatch, Controller } from "react-hook-form";
import { AutoUploadInput } from "@/shared/ui/AutoUploadInput";
import CategorySelect from "@/entities/categories/ui/CategorySelect";
import { MapField } from "@/features/map/MapField";
import { useExpertForm } from "../hook/useExpertForm";
import { ExpertProfileData } from "../types/experts.types";

interface ExpertProfileFormProps {
  expertId?: number;
  initialData?: ExpertProfileData;
  onSuccessCallback?: () => void;
}

export const ExpertProfileForm: React.FC<ExpertProfileFormProps> = (props) => {
  // تمام لاجیک‌ها رو از هوک اختصاصی‌مون می‌گیریم
  const { methods, isSubmitting, isEditing, handleUploadSuccess, onSubmit } = useExpertForm(props);
  const { control, formState: { errors } } = methods;

  // استفاده از useWatch فقط برای تغییرات لحظه‌ای UI
  const uploadedImageIds = useWatch({ control, name: "imageIds" });

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-2xl shadow-sm border border-gray-100">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        {isEditing ? "ویرایش پروفایل متخصص ✏️" : "ثبت پروفایل متخصص 🚀"}
      </h2>

      <form onSubmit={onSubmit} className="space-y-6">
        
        {/* فیلد دسته‌بندی */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-gray-700">تخصص (دسته‌بندی) 🛠️</label>
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

        {/* فیلد بیوگرافی */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-gray-700">بیوگرافی (معرفی) 📝</label>
          <Controller
            name="bio"
            control={control}
            render={({ field }) => (
              <textarea
                {...field}
                rows={4}
                placeholder="مختصری درباره خودت و تخصصت بنویس..."
                className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            )}
          />
          {errors.bio && (
            <span className="text-sm text-red-500">{errors.bio.message}</span>
          )}
        </div>

        {/* فیلد آپلود عکس */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-gray-700">عکس پروفایل</label>
          <AutoUploadInput 
            onUploadSuccess={handleUploadSuccess} 
            label="برای آپلود کلیک کنید یا عکس را بکشید اینجا" 
            isPrivate={false} 
          />
          {uploadedImageIds && uploadedImageIds.length > 0 && (
            <p className="text-sm text-green-600 mt-1">
              {uploadedImageIds.length} عکس به فرم اضافه شده است.
            </p>
          )}
        </div>

        {/* فیلد نقشه */}
        <div className="border border-gray-100 p-4 rounded-xl bg-gray-50/50">
          <MapField 
            control={control} 
            name="location" 
            label="موقعیت مکانی متخصص روی نقشه 📍" 
          />
          {errors.location && (
            <span className="text-sm text-red-500 mt-2 block">لطفاً موقعیت را انتخاب کنید.</span>
          )}
        </div>

        {/* دکمه ثبت */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center gap-2"
        >
          {isSubmitting 
            ? "در حال پردازش..." 
            : (isEditing ? "ثبت تغییرات" : "ثبت اطلاعات متخصص")}
        </button>
      </form>
    </div>
  );
};
