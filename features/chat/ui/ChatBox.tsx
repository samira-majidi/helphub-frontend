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
    joinRoom,
    sendMessage,
    sendImage,
    sendVoice,
    isTargetTyping,
    emitTyping, 
    isTargetOnline, 
    loadMoreMessages, 
    nextCursor,
    isLoadingMore    
  } = useChatMessages(targetUserID);
  
  // 🌟 هندلر تشخیص اسکرول به بالا بدون نیاز به useEffect
  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop } = e.currentTarget;
    
    // اگه کاربر به بالای لیست رسید و پیام قدیمی وجود داره، بارگذاری کن
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
  };

  return (
    <div className="flex flex-col h-full p-4 border rounded-xl shadow-lg bg-white" dir="rtl">
      {/* هدر چت‌روم */}
      <div className="flex justify-between items-center mb-4 border-b pb-2">
        <div>
          <h2 className="text-xl font-bold text-gray-800">چت‌روم</h2>
          <div className="text-xs mt-1 flex items-center gap-1.5">
            {isTargetOnline ? (
              <>
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_5px_rgba(34,197,94,0.5)]"></span>
                <span className="text-green-600 font-medium tracking-wide">آنلاین</span>
              </>
            ) : (
              <span className="text-gray-500">
                {targetLastSeen
                  ? `آخرین بازدید: ${new Date(targetLastSeen).toLocaleTimeString('fa-IR', { hour: '2-digit', minute: '2-digit' })}`
                  : 'آفلاین'}
              </span>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-500 truncate max-w-[120px]">
            {activeRoomId ? `روم: ${activeRoomId}` : 'در حال اتصال...'}
          </span>
          <span
            className={`w-3 h-3 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`}
            title={isConnected ? 'متصل' : 'قطع'}
          />
        </div>
      </div>

      {/* تاریخچه پیام‌ها */}
      <div 
        className="flex-1 overflow-y-auto mb-4 p-2 bg-gray-50 rounded flex flex-col space-y-2 border custom-scrollbar"
        onScroll={handleScroll} // 👈 استفاده از هندلر اسکرول
      >
        
        {/* 🌟 نمایش وضعیت بارگذاری پیام‌های قدیمی */}
        {isLoadingMore && (
          <div className="text-center text-xs text-gray-500 my-2">در حال بارگذاری پیام‌های قدیمی... ⏳</div>
        )}

        {messages.length === 0 && !isLoadingMore && (
          <p className="text-gray-400 text-center my-auto text-sm">پیامی وجود ندارد. اولین پیام را بنویسید! ✨</p>
        )}
        
        {messages.map((msg, index) => (
          <MessageBubble 
            key={msg.id || index} 
            msg={msg} 
            isMe={msg.sender_id === myUserId} 
          />
        ))}  
        
        {isTargetTyping && (
          <div className="text-xs text-gray-500 italic ml-auto mr-2">در حال نوشتن... ✍️</div>
        )}
      </div>

      {/* بخش ارسال پیام */}
      <div className="flex gap-2 items-center mt-auto">
        <div className="w-12 h-12 flex-shrink-0">
          <AutoUploadInput label="" isPrivate={true} onUploadSuccess={sendImage} />
        </div>
        <div className="flex-shrink-0">
          <VoiceRecorder onUploadSuccess={sendVoice} />
        </div>  
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange} 
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder="پیامت رو بنویس..."
          className="flex-1 p-2.5 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-black bg-gray-50 text-sm transition"
          disabled={!activeRoomId}
        />
        <button
          onClick={handleSend}
          disabled={!isConnected || !inputValue.trim() || !activeRoomId}
          className="bg-blue-600 text-white px-5 py-2.5 rounded-xl hover:bg-blue-700 transition font-medium text-sm disabled:bg-gray-300 disabled:cursor-not-allowed shadow-sm"
        >
          ارسال
        </button>
      </div>
    </div>
  );
}