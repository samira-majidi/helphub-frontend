import { useMutation } from '@tanstack/react-query';
import { uploadFile } from '../services/upload.service';

export const useAutoUpload = () => {
  return useMutation({

    mutationFn: ({ file, isPrivate = false }: { file: File, isPrivate?: boolean }) => 
      uploadFile(file, isPrivate),
  });
};
