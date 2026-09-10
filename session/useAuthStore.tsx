// entities/session/model/useAuthStore.ts
import Cookies from 'js-cookie';
import { create } from 'zustand';
import { createJSONStorage, persist, StateStorage } from 'zustand/middleware';


const cookieStorage: StateStorage = {
  getItem: (name: string): string | null => {
    return Cookies.get(name) || null;
  },
  setItem: (name: string, value: string): void => {

    Cookies.set(name, value, { 
      expires: 1, 
      secure: process.env.NODE_ENV === 'production', 
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
      name: 'auth-storage', 
     
      storage: createJSONStorage(() => cookieStorage), 
    }
  )
);
