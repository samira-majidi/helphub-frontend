// types/conversation.ts


export type UserRole = 'specialist' | 'user' ;

export interface User {
  id: number;
  name: string;        
  lastName: string;    
  email: string;
  role: UserRole;
 
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
 
  last_message?: string;
  unread_count?: number;
}
