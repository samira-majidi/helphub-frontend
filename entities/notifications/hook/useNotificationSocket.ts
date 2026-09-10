import { useAuthStore } from '@/session/useAuthStore';
import { socketService } from '@/shared/services/socket.service';
import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { INotification, NotificationType } from '../types/notification';
import { useQueryClient } from '@tanstack/react-query';

export const useNotificationSocket = () => {
  const token = useAuthStore((state) => state.accessToken);
  const [notifications, setNotifications] = useState<INotification[]>([]);
 const queryClient = useQueryClient();
  useEffect(() => {
    if (!token) {
      console.log('⚠️ No token found, skipping notification socket connection.');
      return;
    }

    const socket = socketService.connectNotification(token);

    socket.on('connect', () => {
      console.log('✅ Notification Socket FULLY CONNECTED! ID:', socket.id);
    });

    socket.on('connect_error', (error) => {
      console.error('❌ Notification Socket Connection Error:', error.message);
    });

    socket.on('newNotification', (payload: INotification) => {
      console.log('🔔 Notification Received from Socket:', payload); 
      setNotifications((prev) => [payload, ...prev]);

      switch (payload.type) {
        case NotificationType.NEW_MESSAGE:
          toast.success(payload.title, { duration: 4000 });
          queryClient.invalidateQueries({ queryKey: ['recent-conversations'] });
          break;
          
        case NotificationType.SYSTEM_ALERT:
          toast.error(payload.message); 
          break;
        case NotificationType.ORDER_UPDATE:
          toast(payload.message, { icon: '📦' });
          break;
        default:
          toast(payload.message, { icon: '🔔' });
      }
    });

    return () => {
      if (socketService.notificationSocket) {
      
        socketService.notificationSocket.off('connect');
        socketService.notificationSocket.off('connect_error');
        socketService.notificationSocket.off('newNotification');
      }
    };
  }, [queryClient, token]);

  return { notifications };
};
