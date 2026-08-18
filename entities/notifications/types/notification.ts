
export enum NotificationType {
  NEW_MESSAGE = 'NEW_MESSAGE',
  SYSTEM_ALERT = 'SYSTEM_ALERT',
  ORDER_UPDATE = 'ORDER_UPDATE',
}

export interface INotification {
  id: string;
  userId: number;
  type: NotificationType;
  title: string;
  message: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  metadata?: Record<string, any>;
  isRead?: boolean; 
  createdAt?: string; 
}