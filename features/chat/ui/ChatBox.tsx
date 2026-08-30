'use client';

import { useRef, useState } from 'react';
import { AutoUploadInput } from '@/shared/ui/AutoUploadInput';
import { MessageBubble } from '@/entities/message/ui/MessageBubble';
import { useChatMessages } from '@/entities/message/hooks/useChatMessages';
import { VoiceRecorder } from '@/features/chat/ui/VoiceRecorder';

export default function ChatBox({ targetUserID }: { targetUserID: number }) {
  
  const [inputValue, setInputValue] = useState('');
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const {
    isConnected,
    messages,
    myUserId,
    activeRoomId,
    targetLastSeen,
     targetLastReadAt,
    joinRoom,
    sendMessage,
    sendImage,
    sendVoice,
    isTargetTyping,
    emitTyping, 
    isTargetOnline, 
    loadMoreMessages, 
    nextCursor,
    isLoadingMore,
    targetUser

  } = useChatMessages(targetUserID);
  
  // 🌟 هندلر تشخیص اسکرول به بالا بدون نیاز به useEffect
  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop } = e.currentTarget;
    
    if (scrollTop === 0 && nextCursor && !isLoadingMore) {
      loadMoreMessages();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    
    if (activeRoomId && isConnected) {
      emitTyping(true);
      if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
      typingTimeoutRef.current = setTimeout(() => emitTyping(false), 2000);
    }
  };

  const handleSend = () => {
    if (inputValue.trim()) {
      sendMessage(inputValue.trim());
      setInputValue('');
      emitTyping(false); 
      if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
    }
    console.log("targetLastSeen value:", targetLastSeen);
  };

  return (
    <div className="flex flex-col h-full bg-white sm:rounded-2xl sm:shadow-[0_8px_30px_rgb(0,0,0,0.04)] sm:border border-gray-100 overflow-hidden" dir="ltr">
      
      {/* هدر چت‌روم */}
      <div className="flex items-center gap-2 sm:gap-3 overflow-hidden">
          {/* آواتار داینامیک */}
          <div className="w-10 h-10 sm:w-12 sm:h-12 shrink-0 bg-[#fbc02d] rounded-full flex items-center justify-center text-[#1a2438] font-bold text-lg sm:text-xl shadow-sm overflow-hidden">
            {targetUser?.avatar ? (
              <img 
                src={targetUser.avatar} 
                alt={targetUser.name || 'User Avatar'} 
                className="w-full h-full object-cover"
              />
            ) : (
              // اگه عکس نداشت، حرف اول اسمش رو نشون بده
              targetUser?.name?.charAt(0)?.toUpperCase() || '?'
            )}
          </div>
          
          <div className="min-w-0 overflow-hidden">
            <div className="flex items-center gap-1 sm:gap-1.5">
              {/* نام داینامیک */}
              <h2 className="text-base sm:text-lg font-bold text-gray-900 leading-none truncate">
                {targetUser?.name || 'در حال بارگذاری...'}
              </h2>
            
            
            </div>
            
            {/* وضعیت بازدید */}
            <div className="text-xs sm:text-sm mt-1 sm:mt-1.5 flex items-center gap-1.5 sm:gap-2 text-gray-500 truncate">
              {isTargetOnline ? (
                <>
                  <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 shrink-0 rounded-full bg-green-500 shadow-[0_0_5px_rgba(34,197,94,0.4)]"></span>
                  <span className="font-medium text-gray-700 truncate">Online</span>
                </>
              ) : (
                <>
                  <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 shrink-0 rounded-full bg-gray-300"></span>
                  <span className="truncate">
                    {targetLastSeen
                      ? `Last seen ${new Date(targetLastSeen).toLocaleString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}`
                      : 'Offline'}
                  </span>
                </>
              )}
            </div>
          </div>
        </div>
      {/* تگ دایو اضافه از اینجا حذف شد */}


      <div 
        className="flex-1 overflow-y-auto p-3 sm:p-6 bg-[#fafafa] flex flex-col space-y-4 [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-[#fbc02d]/30 [&::-webkit-scrollbar-thumb]:rounded-full"
        onScroll={handleScroll}
      >
        {isLoadingMore && (
          <div className="flex justify-center my-2">
             <span className="bg-white text-gray-500 text-[10px] sm:text-xs py-1 px-3 rounded-full shadow-sm border">Loading older messages... ⏳</span>
          </div>
        )}

        {messages.length === 0 && !isLoadingMore && (
          <div className="m-auto text-center px-4">
             <div className="w-10 h-10 sm:w-12 sm:h-12 bg-yellow-50 text-yellow-500 rounded-full flex items-center justify-center mx-auto mb-3">💬</div>
             <p className="text-gray-400 text-xs sm:text-sm font-medium">No messages yet. Send the first message! ✨</p>
          </div>
        )}
        
        {messages.map((msg, index) => {
          const isMe = msg.sender_id === myUserId;
          
          // ⏱️ ۲. مقایسه ساعت پیام با آخرین زمان دیده‌شدن مخاطب
          const isRead = Boolean(
            isMe &&
            targetLastReadAt &&
    msg.created_at &&
    new Date(msg.created_at).getTime() <= new Date(targetLastReadAt).getTime()
          );

          return (
            <MessageBubble 
              key={msg.id || index} 
              msg={msg} 
              isMe={isMe} 
              isRead={isRead} // 👈 ارسال وضعیت isRead به MessageBubble
            />
          );
        })}  
        
        {isTargetTyping && (
          <div className="flex items-center gap-2 text-[10px] sm:text-xs text-gray-400 ml-2 mt-2">
            <div className="flex gap-1">
              <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-gray-400 rounded-full animate-bounce"></span>
              <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></span>
              <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
            </div>
            typing...
          </div>
        )}
      </div>

      {/* بخش ارسال پیام */}
      <div className="px-2 sm:px-6 py-2 sm:py-4 bg-white border-t border-gray-100">
        <div className="relative overflow-hidden flex items-center gap-1 sm:gap-2 bg-gray-50 border border-gray-200 rounded-2xl p-1 sm:p-1.5 focus-within:ring-2 focus-within:ring-[#fbc02d] focus-within:border-transparent transition-all shadow-inner">
          
          {/* دکمه‌های آپلود */}
          <div className="flex items-center gap-0.5 sm:gap-1 pl-1 sm:pl-2 shrink-0">
            <div className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center rounded-xl hover:bg-gray-200 transition-colors">
              <AutoUploadInput label="" isPrivate={true} onUploadSuccess={sendImage} />
            </div>
            <div className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center rounded-xl hover:bg-gray-200 transition-colors">
              <VoiceRecorder onUploadSuccess={sendVoice} />
            </div>  
          </div>

          {/* فیلد ورودی متن */}
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange} 
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Write a message..."
            className="flex-1 min-w-0 px-2 sm:px-3 py-2 sm:py-2.5 bg-transparent focus:outline-none text-gray-700 placeholder-gray-400 text-sm"
            disabled={!activeRoomId}
          />

          {/* دکمه ارسال زرد رنگ */}
          <button
            onClick={handleSend}
            disabled={!isConnected || !inputValue.trim() || !activeRoomId}
            className="w-9 h-9 sm:w-11 sm:h-11 flex items-center justify-center bg-[#fbc02d] text-[#1a2438] rounded-xl hover:bg-yellow-500 transition-all disabled:opacity-40 disabled:cursor-not-allowed shadow-sm shrink-0 sm:mr-1"
          >
            <svg className="w-4 h-4 sm:w-5 sm:h-5 sm:ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
          </button>
        </div>
      </div>
    
    {/* تگ دایو اصلی اینجا بسته شد */}
    </div>
  );
}
