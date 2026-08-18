
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast'; 
import { updateExpertAvailability } from '../api/expert.api';

export const useUpdateAvailability = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateExpertAvailability,
    onSuccess: (data) => {
      toast.success(data.message || 'Availability status updated successfully! 👷‍♂️');
      
      queryClient.invalidateQueries({ queryKey: ['expertProfile'] });
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
    
      const errorMessage = error.response?.data?.message || 'Failed to update availability status!';
      toast.error(errorMessage);
    },
  });
};
