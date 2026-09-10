import { io, Socket } from 'socket.io-client';
import { SOCKET_CONFIG } from '../config/socket.config';

class SocketService {
  public socket: Socket | null = null; 
  public notificationSocket: Socket | null = null;
  public expertSocket: Socket | null = null; 

  connect(token: string) {
    if (!this.socket) {
      this.socket = io(`${SOCKET_CONFIG.URL}/chat`, { 
        auth: { token },
        transports: SOCKET_CONFIG.DEFAULT_TRANSPORTS,
      });
    }
    return this.socket;
  }
  connectExpert(token: string) {
    if (!this.expertSocket) {
      this.expertSocket = io(`${SOCKET_CONFIG.URL}/experts`, {
        auth: { token },
        transports: SOCKET_CONFIG.DEFAULT_TRANSPORTS,
      });
    }
    return this.expertSocket;
  }
  connectNotification(token: string) {
    if (!this.notificationSocket) {
      this.notificationSocket = io(`${SOCKET_CONFIG.URL}/notification`, {
        auth: { token },
        transports: SOCKET_CONFIG.DEFAULT_TRANSPORTS,
      });
    }
    return this.notificationSocket;
  }


  disconnectChat() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }
  disconnectExpert() {
    if (this.expertSocket) {
      this.expertSocket.disconnect();
      this.expertSocket = null;
    }
  }


  disconnectNotification() {
    if (this.notificationSocket) {
      this.notificationSocket.disconnect();
      this.notificationSocket = null;
    }
  }


  disconnect() {
    this.disconnectChat();
    this.disconnectNotification();
    this.disconnectExpert(); 
  }

  joinDirectRoom(targetUserId: number) {
    this.socket?.emit('joinDirectRoom', { targetUserId });
  }

  leaveRoom(roomId: string) {
    this.socket?.emit('leaveRoom', { roomId });
  }

  sendDirectMessage(roomId: string, content: string, type: 'TEXT' | 'IMAGE' | 'AUDIO' = 'TEXT', imageId?: string, audioId?: string) {
    this.socket?.emit('sendDirectMessage', { roomId, content, type, imageId, audioId });
  }
  
  sendTypingStatus(roomId: string, isTyping: boolean) {
    this.socket?.emit('typing', { roomId, isTyping });
  }
  
  markAsRead(roomId: string) {
    this.socket?.emit('mark_as_read', { roomId });
  }

  onMessagesRead(callback: (data: { roomId: string; userId: string; readAt: string }) => void) {
    this.socket?.on('messages_read', callback);
  }

  offMessagesRead(callback?: (data: { roomId: string; userId: string; readAt: string }) => void) {
    if (callback) {
      this.socket?.off('messages_read', callback);
    } else {
      this.socket?.off('messages_read');
    }
  }
}

export const socketService = new SocketService();
