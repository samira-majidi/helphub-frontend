export interface ChatMessage {
  id?: number;
  sender_id: number;
  content?: string;
  

  imageId?: string | number;
  audioId?: string | number; 
  

  type?: 'TEXT' | 'IMAGE' | 'AUDIO'; 
  
  created_at?: string;
  
 
  image?: {
    id: number;
    path: string;
    isPrivate: boolean;
  };

  audio?: { 
    id: number;
    path: string;
    isPrivate: boolean;
  };
}