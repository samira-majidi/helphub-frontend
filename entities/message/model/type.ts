export interface ChatMessage {
  id?: number;
  sender_id: number;
  content?: string;
  
  // آیدی فایل‌ها
  imageId?: string | number;
  audioId?: string | number; 
  
  // اضافه شدن تایپ AUDIO
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