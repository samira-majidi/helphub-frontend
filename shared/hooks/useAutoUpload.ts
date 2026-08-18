import { useMutation } from '@tanstack/react-query';
import { uploadFile } from '../services/upload.service';

export const useAutoUpload = () => {
  return useMutation({
    // 👈 اینجا حالا یک آبجکت می‌گیریم که هم فایل رو داره هم وضعیت پرایوت بودنش رو
    mutationFn: ({ file, isPrivate = false }: { file: File, isPrivate?: boolean }) => 
      uploadFile(file, isPrivate),
  });
};
