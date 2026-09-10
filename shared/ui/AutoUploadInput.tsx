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
        console.log("Response directly in Component:", res);
        if (res) {
          onUploadSuccess(res);
        } else {
          console.error("Backend responded, but the data is empty!");
        }
      },
      onError: (err) => {
        console.error("Network or server error:", err);
          console.log("BASE URL IS:", process.env.NEXT_PUBLIC_API_URL);

      }
    });
      event.target.value = ''; // Resetting input
    }
  };

  return (

    <div className="relative flex items-center justify-center w-full h-full text-gray-500 hover:text-[#1a2438] transition-colors cursor-pointer" title={label}>
      
      {isPending ? (

        <span className="animate-spin text-sm">⏳</span>
      ) : (
  
        <svg 
          className="w-5 h-5" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
        </svg>
      )}
  
      <input 
        type="file" 
        accept="image/*" 
        onChange={handleFileSelect} 
        disabled={isPending}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed" 
      />
      
    </div>
  );
}
