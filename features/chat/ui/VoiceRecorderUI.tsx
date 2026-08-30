'use client';

import React, { useState, useEffect } from 'react';

interface VoiceRecorderUIProps {
  onCancel: () => void;
  onSend: () => void;
}

export const VoiceRecorderUI = ({ onCancel, onSend }: VoiceRecorderUIProps) => {
  const [seconds, setSeconds] = useState(0);

  // تایمر (بدون تغییر در منطق)
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
    // 🌟 نکته کلیدی: absolute inset-0 باعث میشه این کامپوننت کل کادر پیام رو بپوشونه
    <div className="absolute inset-0 z-50 flex items-center justify-between bg-white px-4 py-1.5 rounded-2xl shadow-sm border border-yellow-400">
      
      {/* دکمه Cancel به سبک تلگرام (انگلیسی) */}
      <button 
        onClick={onCancel} 
        className="flex items-center gap-1.5 text-gray-400 hover:text-red-500 text-sm font-semibold transition-colors"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
        Cancel
      </button>

      {/* تایمر و نقطه چشمک‌زن رکورد */}
      <div className="flex items-center gap-2">
        <span className="w-2.5 h-2.5 bg-red-500 rounded-full animate-pulse shadow-[0_0_5px_rgba(239,68,68,0.5)]" />
        <span className="text-gray-800 font-mono text-base font-semibold tracking-wider">
          {formatTime(seconds)}
        </span>
      </div>

      {/* دکمه ارسال ویس (زرد رنگ برای هماهنگی با تم HelpHub) */}
      <button 
        onClick={onSend} 
        className="w-10 h-10 flex items-center justify-center bg-[#fbc02d] text-[#1a2438] rounded-xl hover:bg-yellow-500 transition-all shadow-sm shrink-0"
      >
        <svg className="w-5 h-5 ml-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
        </svg>
      </button>
    </div>
  );
};
