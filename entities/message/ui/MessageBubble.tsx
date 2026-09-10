import React from 'react';
import { ChatMessage } from '../model/type';
import { VoicePlayer } from '@/features/chat/ui/voicePlayer';

interface MessageBubbleProps {
  msg: ChatMessage;
  isMe: boolean;
  isRead?: boolean; 
}
 
export function MessageBubble({ msg, isMe, isRead = false }: MessageBubbleProps) {
  const timeString = msg.created_at 
    ? new Date(msg.created_at).toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: false 
      })
    : '';

  return (
    <div
      className={`p-3 max-w-[80%] flex flex-col rounded-lg shadow-sm ${
        isMe
          ? 'self-end bg-[#2a3b5c] text-white rounded-tr-none' 
          : 'self-start bg-white border border-gray-100 text-gray-800 rounded-tl-none'
      }`}
    >

      {msg.type === 'AUDIO' ? (
        <div className="flex flex-col gap-3.5">
        {msg.audio?.path ? (
  <VoicePlayer key={msg.audio.path} src={msg.audio.path} />
) : (
  <div className={`h-10 w-48 rounded-md animate-pulse ${isMe ? 'bg-white/10' : 'bg-gray-100'}`} />
)}
        </div>
      )
   
      : msg.type === 'IMAGE' || msg.image ? (
        <div className="flex flex-col">
          {msg.image?.path ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={msg.image.path}
              alt="Image"
              className="max-w-full rounded-md object-cover max-h-72"
            />
          ) : (
            <div className={`h-40 w-48 rounded-md animate-pulse ${isMe ? 'bg-white/10' : 'bg-gray-50'}`} />
          )}
        </div>
      ) 
   
      : (
        <p className="text-[15px] break-words leading-relaxed whitespace-pre-wrap">{msg.content}</p>
      )}

      {timeString && (
        <div className="flex items-center gap-1.5 mt-2 self-end select-none">
          <span 
            className={`text-[10px] tabular-nums font-medium ${
              isMe ? 'text-slate-300/80' : 'text-gray-400'
            }`}
          >
            {timeString}
          </span>
          
   
          {isMe && (
            <div className="flex items-center">
              {isRead ? (
             
                <div className="flex items-center -space-x-1.5 text-[#fbc02d]">
                  <svg className="w-3.5 h-3.5 stroke-[2.5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                  <svg className="w-3.5 h-3.5 stroke-[2.5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                </div>
              ) : (
            
                <div className="text-slate-300/70">
                  <svg className="w-3.5 h-3.5 stroke-[2.5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                </div>
              )}
            </div>
          )}
        </div>
      )}

    </div>
  );
}
