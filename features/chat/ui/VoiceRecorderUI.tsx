'use client';

import React, { useState, useEffect } from 'react';

interface VoiceRecorderUIProps {
  onCancel: () => void;
  onSend: () => void;
}

export const VoiceRecorderUI = ({ onCancel, onSend }: VoiceRecorderUIProps) => {
  const [seconds, setSeconds] = useState(0);

  // تایمر برای شمارش ثانیه‌های ضبط
  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // فرمت کردن زمان (مثلاً 01:05)
  const formatTime = (sec: number) => {
    const m = Math.floor(sec / 60).toString().padStart(2, '0');
    const s = (sec % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  return (
    <div className="flex items-center justify-between bg-red-50 px-3 py-1.5 rounded-full shadow-inner border border-red-100 min-w-[200px] animate-pulse">
      {/* دکمه لغو (Cancel) */}
      <button 
        onClick={onCancel} 
        className="text-red-500 hover:text-red-700 text-xs font-bold px-2 py-1"
      >
        لغو ✖
      </button>

      {/* تایمر و نقطه چشمک‌زن */}
      <div className="flex items-center gap-2">
        <span className="w-2.5 h-2.5 bg-red-600 rounded-full animate-ping" />
        <span className="text-red-700 font-mono text-sm font-medium tracking-wider">
          {formatTime(seconds)}
        </span>
      </div>

      {/* دکمه ارسال (Send) */}
      <button 
        onClick={onSend} 
        className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-blue-600 shadow-md transition-transform hover:scale-105"
      >
        <svg className="w-4 h-4 mr-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
        </svg>
      </button>
    </div>
  );
};
