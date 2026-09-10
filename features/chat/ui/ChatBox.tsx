'use client';

import { AutoUploadInput } from '@/shared/ui/AutoUploadInput';
import { MessageBubble } from '@/entities/message/ui/MessageBubble';
import { VoiceRecorder } from '@/features/chat/ui/VoiceRecorder';
import { useChatController } from '../hook/useChatController';
interface ChatBoxProps {
  targetUserID: number;
  onBack?: () => void; 
}

export default function ChatBox({ targetUserID, onBack }: ChatBoxProps) {
  const {
    isConnected,
    messages,
    myUserId,
    activeRoomId,
    targetLastSeen,
    targetLastReadAt,
    sendImage,
    sendVoice,
    isTargetTyping,
    isTargetOnline,
    isLoadingMore,
    targetUser,
    inputValue,
    handleInputChange,
    handleSend,
    handleScroll,
  } = useChatController(targetUserID);

  return (
    <div className="flex flex-col h-full bg-white overflow-hidden" dir="ltr">

      <div className="flex items-center justify-between px-4 sm:px-8 py-5 border-b border-gray-50">
        <div className="flex items-center gap-3">
      
          <button 
            onClick={onBack}
            className="md:hidden mr-1 text-gray-500 hover:text-[#1e1b4b]"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
          </button>

          <div className="w-[42px] h-[42px] shrink-0 bg-indigo-50 rounded-full flex items-center justify-center text-[#1e1b4b] font-bold text-lg overflow-hidden relative">
            {targetUser?.avatar ? (
              <img src={targetUser.avatar} alt="Avatar" className="w-full h-full object-cover" />
            ) : (
              targetUser?.name?.charAt(0)?.toUpperCase() || '?'
            )}
             {isTargetOnline && (
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full z-10"></span>
             )}
          </div>
          
          <div className="flex flex-col">
            <h2 className="text-[16px] font-bold text-gray-900 leading-none mb-1.5">
              {targetUser?.name || 'Loading...'}
            </h2>
         <div className="text-[12px] flex items-center gap-1.5 text-gray-400 font-medium h-4">
  {isTargetTyping ? (
  <span className="text-indigo-500">
    typing...
  </span>
): isTargetOnline ? (
    <span className="text-emerald-500">Online</span>
  ) : (
    <span>
      {targetLastSeen
        ? `Last seen ${new Date(targetLastSeen).toLocaleString('en-US', {
            hour: '2-digit',
            minute: '2-digit'
          })}`
        : 'Offline'}
    </span>
  )}
</div>
          </div>
        </div>

        
      </div>

      <div 
        className="flex-1 overflow-y-auto p-4 sm:p-8 bg-white flex flex-col space-y-4 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:bg-gray-200 [&::-webkit-scrollbar-thumb]:rounded-full"
        onScroll={handleScroll}
      >
        <div className="flex justify-center mb-4">
            <span className="text-[12px] font-semibold text-gray-800 bg-white px-3 py-1">Today</span>
        </div>

        {isLoadingMore && (
          <div className="flex justify-center my-2">
             <span className="bg-white text-gray-500 text-[10px] sm:text-xs py-1 px-3 rounded-full border shadow-sm">Loading... ⏳</span>
          </div>
        )}

        {messages.length === 0 && !isLoadingMore && (
          <div className="m-auto text-center px-4">
             <p className="text-gray-400 text-sm font-medium">No messages yet. Say hello! ✨</p>
          </div>
        )}
        
        {messages.map((msg, index) => {
          const isMe = msg.sender_id === myUserId;
          const isRead = Boolean(isMe && targetLastReadAt && msg.created_at && new Date(msg.created_at).getTime() <= new Date(targetLastReadAt).getTime());

          return (
            <MessageBubble key={msg.id || index} msg={msg} isMe={isMe} isRead={isRead} />
          );
        })}  
        
      </div>

    
      <div className="px-4 sm:px-8 py-5 bg-white">
        <div className="relative flex items-center gap-2 bg-[#f8f9fa] border border-gray-100 rounded-[28px] p-1.5 focus-within:ring-1 focus-within:ring-[#1e1b4b] focus-within:bg-white transition-all">
          
          <div className="flex items-center gap-1 pl-3 text-gray-400">
             <AutoUploadInput label="" isPrivate={true} onUploadSuccess={sendImage} />
             <VoiceRecorder onUploadSuccess={sendVoice} />
          </div>

          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange} 
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Type a message..."
            className="flex-1 min-w-0 px-3 py-2.5 bg-transparent focus:outline-none text-gray-700 placeholder-gray-400 text-[14px]"
            disabled={!activeRoomId}
          />

          <button className="text-gray-400 hover:text-gray-600 px-2 hidden sm:block">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          </button>

          <button
            onClick={handleSend}
            disabled={!isConnected || !inputValue.trim() || !activeRoomId}
           className={`w-10 h-10 flex items-center justify-center rounded-full text-white transition-all shrink-0 shadow-sm
  ${
    inputValue.trim()
      ? 'bg-yellow-400 hover:bg-yellow-500'
      : 'bg-[#1e1b4b] hover:bg-indigo-950'
  }
  disabled:opacity-50 disabled:cursor-not-allowed
`}
          >
            <svg className="w-5 h-5 ml-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
          </button>
        </div>
      </div>
    </div>
  );
}
