
'use client';

import { useAuthStore } from '@/session/useAuthStore';
import { jwtDecode } from 'jwt-decode';

interface JwtPayload {
  role?: string;
  name?: string;
  firstName?: string;
}

interface AuthState {
  isLoggedIn: boolean;
  role: string | null;
  name: string | null;
  isExpert: boolean;
  hydrated: boolean;
}

export function useIsLoggedIn(): AuthState {
  const accessToken = useAuthStore((state) => state.accessToken);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  if (!accessToken) {
    return {
      isLoggedIn: false,
      role: null,
      name: null,
      isExpert: false,
      hydrated: true,
    };
  }

  try {
    const decoded = jwtDecode<JwtPayload>(accessToken);

    const role = decoded.role ?? null;
    const name = decoded.name ?? decoded.firstName ?? null;

    return {
      isLoggedIn: isAuthenticated,
      role,
      name,
      isExpert: role?.toUpperCase() === 'SPECIALIST',
      hydrated: true,
    };
  } catch (error) {
    console.error('Failed to decode JWT:', error);

    return {
      isLoggedIn: false,
      role: null,
      name: null,
      isExpert: false,
      hydrated: true,
    };
  }
}

