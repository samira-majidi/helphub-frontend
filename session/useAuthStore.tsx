// entities/session/model/useAuthStore.ts
import Cookies from 'js-cookie';
import { create } from 'zustand';
import { createJSONStorage, persist, StateStorage } from 'zustand/middleware';

// ۱. تعریف یک Storage سفارشی برای اتصال Zustand به Cookie
const cookieStorage: StateStorage = {
  getItem: (name: string): string | null => {
    return Cookies.get(name) || null;
  },
  setItem: (name: string, value: string): void => {
    // 👇 تغییر مهم: انقضای کوکی به ۱ روز تغییر کرد تا با بک‌اند هماهنگ باشد
    Cookies.set(name, value, { 
      expires: 1, 
      secure: process.env.NODE_ENV === 'production', // فقط در حالت پروداکشن روی https کار کند
      sameSite: 'strict' 
    });
  },
  removeItem: (name: string): void => {
    Cookies.remove(name);
  },
};

interface AuthState {
  accessToken: string | null;
  isAuthenticated: boolean;
  setToken: (token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      accessToken: null,
      isAuthenticated: false,

      setToken: (token) =>
        set({
          accessToken: token,
          isAuthenticated: true,
        }),

      logout: () =>
        set({
          accessToken: null,
          isAuthenticated: false,
        }),
    }),
    {
      name: 'auth-storage', // اسم کلید کوکی شما این خواهد بود
      // ۲. معرفی استوریج سفارشی به میان‌افزار persist
      storage: createJSONStorage(() => cookieStorage), 
    }
  )
);
