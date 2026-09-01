'use client';

import { useChatController } from '../hook/useChatController';
import { MessageBubble } from '@/entities/message/ui/MessageBubble';

interface QuickMessageModalProps {
  targetUserID: number;
  onClose: () => void;
}

export default function QuickMessageModal({ targetUserID, onClose }: QuickMessageModalProps) {
  const {
    messages,
    myUserId,
    targetUser,
    inputValue,
    handleInputChange,
    handleSend,
    isConnected,
    activeRoomId
  } = useChatController(targetUserID);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100 flex flex-col h-[500px]">
        
        {/* هدر سرمه‌ای با آواتار بزرگتر */}
        <div className="bg-[#061c38] px-5 py-4 flex items-center justify-between text-white">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-full bg-white/15 border border-white/20 flex items-center justify-center font-bold text-base overflow-hidden shrink-0 shadow-inner">
              {targetUser?.avatar ? (
                <img src={targetUser.avatar} alt="Avatar" className="w-full h-full object-cover" />
              ) : (
                targetUser?.name?.charAt(0)?.toUpperCase() || '?'
              )}
            </div>
            <div>
              <h3 className="font-bold text-base leading-tight text-white">{targetUser?.name || 'Quick Message'}</h3>
              <span className="text-[11px] text-slate-300">Direct Contact</span>
            </div>
          </div>
          <button 
            onClick={onClose} 
            className="text-slate-300 hover:text-white p-1.5 rounded-lg hover:bg-white/10 transition-colors"
          >
            ✕
          </button>
        </div>

        {/* لیست پیام‌ها با متن راهنمای سفارش و قیمت */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-50/60">
          {messages.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center px-6 text-slate-500">
              <span className="text-2xl mb-2">📋</span>
              <p className="text-xs font-medium leading-relaxed">
                برای هماهنگی سریع‌تر، نوع درخواست، زمان مدنظر و بودجه یا بازه قیمت پیشنهادی خود را ارسال کنید.
              </p>
            </div>
          ) : (
            messages.map((msg, index) => (
              <MessageBubble key={msg.id || index} msg={msg} isMe={msg.sender_id === myUserId} />
            ))
          )}
        </div>

        {/* اینپوت ارسال پیام با رنگ برند سرمه‌ای */}
        <div className="p-3 bg-white border-t border-slate-100 flex items-center gap-2">
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Type your message..."
            className="flex-1 text-sm bg-slate-100 rounded-full px-4 py-2.5 outline-none focus:ring-1 focus:ring-[#061c38]"
          />
          <button
            onClick={handleSend}
            disabled={!isConnected || !inputValue.trim() || !activeRoomId}
            className="w-10 h-10 flex items-center justify-center bg-[#061c38] text-white rounded-full hover:bg-[#0b284e] transition-all disabled:opacity-50"
          >
            <svg className="w-4 h-4 ml-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
          </button>
        </div>

      </div>
    </div>
  );
}
