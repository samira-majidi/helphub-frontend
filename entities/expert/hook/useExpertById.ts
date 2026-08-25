import { useQuery } from '@tanstack/react-query';
import { getExpertById } from '../api/expert.api';

export const useExpertById = (expertId: string) => {
  return useQuery({
    queryKey: ['expert-profile', expertId],
    queryFn: () => getExpertById(expertId),

    enabled: !!expertId,
    staleTime: 5 * 60 * 1000, 
  });

};
