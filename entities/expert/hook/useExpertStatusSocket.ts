import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { socketService } from '@/shared/services/socket.service';
import { ExpertProfileData } from '../types/experts.types';

const getAccessTokenFromCookie = (): string => {
  if (typeof window === 'undefined') return '';
  try {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; auth-storage=`);
    if (parts.length === 2) {
      const cookieString = parts.pop()?.split(';').shift();
      if (cookieString) {
        const decodedValue = decodeURIComponent(cookieString);
        const authData = JSON.parse(decodedValue);
        return authData?.state?.accessToken || '';
      }
    }
  } catch (error) {
    console.error('❌ Failed to extract socket token:', error);
  }
  return '';
};

export const useExpertStatusSocket = () => {
  const queryClient = useQueryClient();

  useEffect(() => {
    const token = getAccessTokenFromCookie();
    const socket = socketService.connectExpert(token);

    if (!socket) {
      console.warn('⚠️ Expert socket instance not created.');
      return;
    }

    const onConnect = () => console.log('✅ Expert Socket CONNECTED! ID:', socket.id);
    const onDisconnect = (reason: string) => console.log('🛑 Expert Socket DISCONNECTED:', reason);
    const onConnectError = (error: Error) => console.error('❌ Expert Socket Connection ERROR:', error.message);

      const handleStatusUpdate = (data: { expertId: string | number; status: string }) => {
      console.log('🔄 Live status update received:', data);
      
      queryClient.setQueriesData(
        { queryKey: ['experts', 'search'] }, 
        (oldData: any) => {
          if (!oldData) return oldData;

          // لاگ برای دیباگ: به ما نشون میده ساختار دقیق کش چیه
          // console.log('📦 Current Cache Data:', oldData);

          // حالت ۱: خروجی از نوع useInfiniteQuery است (داده‌ها داخل آرایه pages هستند)
          if (oldData.pages && Array.isArray(oldData.pages)) {
            return {
              ...oldData,
              pages: oldData.pages.map((page: any) => {
                // اگر داده‌های هر صفحه داخل پراپرتی data هستند (مثل فرمت‌های استاندارد NestJS)
                if (page.data && Array.isArray(page.data)) {
                  return {
                    ...page,
                    data: page.data.map((expert: ExpertProfileData) =>
                      expert.id === data.expertId ? { ...expert, availabilityStatus: data.status } : expert
                    )
                  };
                }
             
                if (Array.isArray(page)) {
                  return page.map((expert: ExpertProfileData) =>
                    expert.id === data.expertId ? { ...expert, availabilityStatus: data.status } : expert
                  );
                }
                return page;
              }),
            };
          }


          if (oldData.data && Array.isArray(oldData.data)) {
            return {
              ...oldData,
              data: oldData.data.map((expert: ExpertProfileData) =>
                expert.id === data.expertId ? { ...expert, availabilityStatus: data.status } : expert
              ),
            };
          }

          // حالت ۳: داده‌ها داخل پراپرتی items هستند (بسته به پیاده‌سازی بک‌اند)
          if (oldData.items && Array.isArray(oldData.items)) {
            return {
              ...oldData,
              items: oldData.items.map((expert: ExpertProfileData) =>
                expert.id === data.expertId ? { ...expert, availabilityStatus: data.status } : expert
              ),
            };
          }

          // حالت ۴: داده‌ها واقعاً یک آرایه ساده هستند
          if (Array.isArray(oldData)) {
            return oldData.map((expert: ExpertProfileData) =>
              expert.id === data.expertId ? { ...expert, availabilityStatus: data.status } : expert
            );
          }

          return oldData;
        }
      );


      queryClient.invalidateQueries({ queryKey: ['expertProfile'] });
    };

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.on('connect_error', onConnectError);
    socket.on('statusChanged', handleStatusUpdate);

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.off('connect_error', onConnectError);
      socket.off('statusChanged', handleStatusUpdate);
      
      socketService.disconnectExpert();
    };
  }, [queryClient]);
};
   // TODO: Backend is double-wrapping the data (page.data.data). 
   // Fix the NestJS interceptor/controller later and remove this ugly hack! 