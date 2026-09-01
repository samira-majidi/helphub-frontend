import { useEffect, useState, useCallback, useMemo, useRef } from 'react';
import { useAuthStore } from '@/session/useAuthStore';
import { jwtDecode } from 'jwt-decode';
import api from '@/shared/services/Api';
import { socketService } from '@/shared/services/socket.service';
import { ChatMessage } from '@/entities/message/model/type';
import { getUserProfile } from '@/entities/expert/api/expert.api';


export const useChatMessages = (targetUserID: number) => {
  const accessToken = useAuthStore((state) => state.accessToken);

  // --- States ---
  const [isConnected, setIsConnected] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [activeRoomId, setActiveRoomId] = useState<string | null>(null);
  const [targetLastSeen, setTargetLastSeen] = useState<number | null>(null);
  const [targetLastReadAt, setTargetLastReadAt] = useState<Date | null>(null);
  const [isTargetTyping, setIsTargetTyping] = useState(false);
  const [isTargetOnline, setIsTargetOnline] = useState(false);
  const [targetUser, setTargetUser] = useState<{ name?: string; avatar?: string; role?: string } | null>(null);

  // Ref جهت دسترسی به آخرین roomId در زمان cleanup افکت
  const activeRoomIdRef = useRef<string | null>(null);
  // eslint-disable-next-line react-hooks/refs
  activeRoomIdRef.current = activeRoomId;

  // States for Pagination
  const [nextCursor, setNextCursor] = useState<string | null>(null);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  // --- 1. Decode JWT Token ---
  const myUserId = useMemo(() => {
    if (!accessToken) return null;
    try {
      const decoded = jwtDecode<{ sub: number }>(accessToken);
      return Number(decoded.sub);
    } catch (err) {
      console.error('❌ خطا در دیکد کردن توکن:', err);
      return null;
    }
  }, [accessToken]);
 useEffect(() => {
    if (!targetUserID) return;

    const fetchTargetProfile = async () => {
      try {
        const profile = await getUserProfile(targetUserID);
        
        // بک‌اند الان نام، نام خانوادگی و آواتار رو (چه متخصص چه عادی) یکپارچه میده
        setTargetUser({
          name: `${profile.name || ''} ${profile.lastName || ''}`.trim(),
          avatar: profile.avatarUrl,
          role: profile.role, // اگه دوست داشتی بدونی طرف متخصص هست یا نه
        });
      } catch (error) {
        console.error('❌ خطا در دریافت اطلاعات کاربر مقابل:', error);
      }
    };

    fetchTargetProfile();
  }, [targetUserID]);
  // --- 2. Socket Connection & Events ---
  useEffect(() => {
    if (!accessToken) return;

    const socketInstance = socketService.connect(accessToken);

    // Event Handlers
    const handleConnect = () => {
      setIsConnected(true);
      socketService.joinDirectRoom(targetUserID);
    };

    const handleUserTyping = (data: { isTyping: boolean }) => {
      console.log("Typing event received from server:", data); 
      setIsTargetTyping(data.isTyping);
    };

    const handleJoinedRoom = async (data: { 
      roomId: string; 
      targetUserLastSeen?: number | null; 
      isTargetOnline?: boolean;
      targetUserLastReadAt?: string | null;
    }) => {
      setActiveRoomId(data.roomId);
      console.log("📦 Data received on joinedRoom:", data); 
      if (data.targetUserLastSeen) setTargetLastSeen(data.targetUserLastSeen);
      if (data.isTargetOnline !== undefined) setIsTargetOnline(data.isTargetOnline);
      if (data.targetUserLastReadAt) setTargetLastReadAt(new Date(data.targetUserLastReadAt));
               
      try {
        const response = await api.get(`/chat/rooms/${data.roomId}/messages?limit=20`);
        const historyData = response.data.data?.data;
        const cursor = response.data.data?.nextCursor; 
        
        setNextCursor(cursor || null);
        
        if (Array.isArray(historyData)) {
          const formattedMessages = historyData.map((msg:ChatMessage) => ({
            id: msg.id,
            content: msg.content,
            created_at: msg.created_at,
            sender_id: msg.sender_id,
            type: msg.type, 
            image: msg.image,
            audio: msg.audio,
          }));
          // در لود اولیه، پیام‌ها رو مستقیماً ست می‌کنیم (نیاز به prev نیست)
          setMessages(formattedMessages);
        }
      } catch (error) {
        console.error('❌ خطا در دریافت پیام‌های روم:', error);
      }
    };

    const handleNewMessage = (newMsg: ChatMessage) => {
      setMessages((prev) => {
        const existingMessageIndex = prev.findIndex((msg) => msg.id === newMsg.id);
        
        if (existingMessageIndex !== -1) {
          const newMessages = [...prev];
          newMessages[existingMessageIndex] = newMsg;
          return newMessages;
        }
        return [...prev, newMsg];
      });
       if (Number(newMsg.sender_id) === Number(targetUserID) && activeRoomIdRef.current) {
        socketInstance.emit('mark_as_read', { roomId: activeRoomIdRef.current });
      }
    };

    const handleMessagesRead = (data: { roomId: string; userId: string; readAt: string }) => {
      if (Number(data.userId) === Number(targetUserID)) {
        setTargetLastReadAt(new Date(data.readAt));
      }
    };

    const handleDisconnect = () => {
      setIsConnected(false);
      setActiveRoomId(null);
      setIsTargetOnline(false); // وقتی خودمون قطع می‌شیم، فرض می‌کنیم آفلاین شده
    };

    const handleUserStatusChanged = (data: { userId: number; status: string; lastSeen?: number }) => {
      if (Number(data.userId) === Number(targetUserID)) {
        setIsTargetOnline(data.status === 'online'); 
        
        if (data.lastSeen) {
          setTargetLastSeen(data.lastSeen);
        }
      }
    };

    // اگر سوکت در لحظه ماونت وصل بود، مستقیماً جوین شو
    if (socketInstance.connected) {
      handleConnect();
    }

    // Attach Listeners
    socketInstance.on('connect', handleConnect);
    socketInstance.on('joinedRoom', handleJoinedRoom);
    socketInstance.on('newMessage', handleNewMessage);
    socketInstance.on('messages_read', handleMessagesRead);
    socketInstance.on('disconnect', handleDisconnect);
    socketInstance.on('userTyping', handleUserTyping);
    socketInstance.on('userStatusChanged', handleUserStatusChanged);

    // Cleanup
    return () => {
      if (activeRoomIdRef.current) {
        socketService.leaveRoom(activeRoomIdRef.current);
      }
      socketInstance.off('connect', handleConnect);
      socketInstance.off('joinedRoom', handleJoinedRoom);
      socketInstance.off('newMessage', handleNewMessage);
      socketInstance.off('messages_read', handleMessagesRead);
      socketInstance.off('disconnect', handleDisconnect);
      socketInstance.off('userTyping', handleUserTyping);
      socketInstance.off('userStatusChanged', handleUserStatusChanged);
       socketService.disconnectChat()
    };
  }, [accessToken, targetUserID]);

  const loadMoreMessages = useCallback(async () => {
    if (!activeRoomId || !nextCursor || isLoadingMore) return;

    setIsLoadingMore(true);
    try {
      const response = await api.get(
        `/chat/rooms/${activeRoomId}/messages?limit=20&cursor=${nextCursor}`
      );
      const olderHistoryData = response.data.data?.data;
      const newCursor = response.data.data?.nextCursor;

      if (Array.isArray(olderHistoryData)) {
        const formattedOlderMessages = olderHistoryData.map((msg: ChatMessage) => ({
          id: msg.id,
          content: msg.content,
          created_at: msg.created_at,
          sender_id: msg.sender_id,
          type: msg.type,
          image: msg.image,
          audio: msg.audio,
        }));

        // 🌟 فیلتر کردن پیام‌های تکراری
        setMessages((prev) => {
          const uniqueOlderMessages = formattedOlderMessages.filter(
            (olderMsg) => !prev.some((prevMsg) => prevMsg.id === olderMsg.id)
          );
          return [...uniqueOlderMessages, ...prev];
        });
      }
      setNextCursor(newCursor || null);
    } catch (error) {
      console.error('❌ خطا در دریافت پیام‌های قدیمی:', error);
    } finally {
      setIsLoadingMore(false);
    }
  }, [activeRoomId, nextCursor, isLoadingMore]);

  // --- 4. Callbacks ---
  const joinRoom = useCallback((targetId: number) => {
    if (isConnected) {
      if (activeRoomId) {
        socketService.leaveRoom(activeRoomId);
      }
      setMessages([]);
      setActiveRoomId(null);
      setTargetLastReadAt(null);
      socketService.joinDirectRoom(targetId);
    }
  }, [isConnected, activeRoomId]);

  const sendMessage = useCallback((content: string) => {
    if (isConnected && activeRoomId) {
      socketService.sendDirectMessage(activeRoomId, content);
    }
  }, [isConnected, activeRoomId]);

  const sendImage = useCallback((imageId: string) => {
    if (isConnected && activeRoomId) {
      socketService.sendDirectMessage(activeRoomId, '🖼️ تصویر ارسال شد', 'IMAGE', imageId);
    }
  }, [isConnected, activeRoomId]);
 
  const sendVoice = useCallback((audioId: string) => {
    if (isConnected && activeRoomId) {
      socketService.sendDirectMessage(activeRoomId, '🎤 پیام صوتی', 'AUDIO', undefined, audioId);
    }
  }, [isConnected, activeRoomId]);

  const emitTyping = useCallback((isTyping: boolean) => {
    if (isConnected && activeRoomId) {
      socketService.sendTypingStatus(activeRoomId, isTyping);
    }
  }, [isConnected, activeRoomId]);

  return {
    isConnected,
    messages,
    myUserId,
    activeRoomId,
    targetLastSeen,
    targetLastReadAt,
    isTargetOnline,
    isTargetTyping,
    nextCursor,
    isLoadingMore,
    joinRoom,
     targetUser,
    sendMessage,
    sendImage,
    sendVoice,
    emitTyping,
    loadMoreMessages,
  };
};
