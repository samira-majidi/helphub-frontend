"use client";

import React from "react";
import dynamic from "next/dynamic";
import { Control, Controller, FieldValues, Path } from "react-hook-form";
import { LocationCoords } from "./MapPicker";

const DynamicMapPicker = dynamic(() => import("./MapPicker"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[400px] flex items-center justify-center bg-gray-50 rounded-xl animate-pulse text-gray-400 border border-gray-200">
      Loading map... 🌍
    </div>
  ),
});

interface MapFieldProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label?: string;
}

export const MapField = <T extends FieldValues>({ 
  control, 
  name, 
  label = "Select location on map" 
}: MapFieldProps<T>) => {
  return (
    <div className="flex flex-col gap-2 w-full">
      <label className="text-sm font-semibold text-gray-700">{label}</label>
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, value } }) => (
          <DynamicMapPicker 
            onLocationSelect={onChange} 
            defaultLocation={value as LocationCoords | undefined} 
          />
        )}
      />
    </div>
  );
};
