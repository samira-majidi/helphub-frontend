// types/conversation.ts

// تایپ نقش کاربر که از بک‌اند میاد
export type UserRole = 'specialist' | 'user' ;

export interface User {
  id: number;
  name: string;        // جایگزین first_name شد
  lastName: string;    // جایگزین username شد
  email: string;
  role: UserRole;
  // این فیلدها تو دیتای فعلی نبودن ولی برای UI نیازیم، پس optional می‌ذاریم:
  avatar_url?: string; 
  is_online?: boolean; 
}

export interface RoomMember {
  room_id: string;
  user_id: number;
  joined_at: string;
  user: User;
}

export interface Conversation {
  id: string;
  type: 'DIRECT' | 'GROUP';
  created_at: string;
  updated_at: string;
  members: RoomMember[];
  // فیلدهای زیر برای UI هستند که ممکنه بک‌اند در آینده اضافه کنه یا فرانت‌اند هندل کنه:
  last_message?: string;
  unread_count?: number;
}
