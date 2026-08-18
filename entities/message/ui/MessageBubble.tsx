import React from 'react';
import { ChatMessage } from '../model/type';
import { VoicePlayer } from '@/features/chat/ui/voicePlayer';// 👈 کامپوننت جدید رو ایمپورت کن

interface MessageBubbleProps {
  msg: ChatMessage;
  isMe: boolean;
}
 
export function MessageBubble({ msg, isMe }: MessageBubbleProps) {
  return (
    <div
      className={`p-3 rounded-xl max-w-[80%] shadow-sm ${
        isMe
          ? 'bg-blue-600 text-white self-start rounded-tr-none'
          : 'bg-gray-200 text-gray-800 self-end rounded-tl-none'
      }`}
    >
      <span className={`block text-[10px] mb-1 font-bold ${isMe ? 'text-blue-100' : 'text-gray-500'}`}>
        {isMe ? 'شما' : `کاربر #${msg.sender_id}`}
      </span>
      
      {/* 👈 ۱. هندل کردن ویس */}
     {msg.type === 'AUDIO' ? (
  <div className="flex flex-col gap-2">
    {msg.audio?.path ? (
      
      <VoicePlayer 
        key={msg.audio.path} // این خوبه
        src={msg.audio.path} 
      />
    ) : (
      <div className="bg-black/10 p-2 rounded-full text-xs text-center">
        ⏳ در حال آماده‌سازی فایل صوتی...
      </div>
    )}
    {msg.content && <p className="text-sm opacity-80">{msg.content}</p>}
  </div>
      )
      /* 👈 ۲. هندل کردن تصویر */
      : msg.type === 'IMAGE' || msg.image ? (
        <div className="flex flex-col gap-2">
          {msg.image?.path ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={msg.image.path}
              alt="تصویر ارسالی"
              className="max-w-full rounded-lg object-cover max-h-60"
            />
          ) : (
            <div className="bg-white/20 p-4 rounded text-center text-xs">
              [در حال بارگذاری تصویر...]
            </div>
          )}
          {msg.content && msg.content !== '🖼️ تصویر ارسال شد' && (
            <p className="text-sm break-words opacity-80">{msg.content}</p>
          )}
        </div>
      ) 
      
      /* 👈 ۳. هندل کردن متن ساده */
      : (
        <p className="text-sm break-words leading-relaxed">{msg.content}</p>
      )}
    </div>
  );
}
