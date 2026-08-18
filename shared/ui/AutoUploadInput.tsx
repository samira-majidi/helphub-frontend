
import React from 'react';


import { useAutoUpload } from '../hooks/useAutoUpload';

interface AutoUploadInputProps {
  onUploadSuccess: (imageId: string) => void;
  label?: string;
    isPrivate?: boolean;
}

export const AutoUploadInput = ({ onUploadSuccess, label = "Select Image", isPrivate = false  }: AutoUploadInputProps) => {
  const { mutate, isPending } = useAutoUpload();

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
     mutate({ file, isPrivate }, {
  onSuccess: (res) => {
    console.log("Response directly in Component:", res); // 👈 اینو حتما چک کن
    if (res) {
      onUploadSuccess(res);
    } else {
      console.error("بک‌اِند جواب داد ولی دیتا خالیه!");
    }
  },
  onError: (err) => {
    console.error("خطای شبکه یا سرور:", err);
      console.log("BASE URL IS:", process.env.NEXT_PUBLIC_API_URL);

  }
});
      event.target.value = ''; // Resetting input
    }
  };
  return (
    <div className="relative flex flex-col items-center justify-center w-full h-20 border-2 border-dashed border-gray-300 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer group">
      
      {/* در صورت نیاز به لیبل می‌تونی این خط رو نگه داری، وگرنه حذفش کن */}
      {label && <span className="absolute top-2 text-sm font-medium text-gray-500">{label}</span>}
      
      <svg 
        className="w-10 h-10 text-gray-400 group-hover:text-blue-500 transition-colors" 
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
      </svg>
      
      <input 
        type="file" 
        accept="image/*" 
        onChange={handleFileSelect} 
        disabled={isPending}
        // این کلاس‌ها جادوی کار هستن: اینپوت رو نامرئی میکنن و روی کل باکس میکشن
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" 
      />
      
      {isPending && <span className="absolute bottom-2 text-sm text-blue-500 font-medium">Uploading...</span>}
    </div>
  );
}