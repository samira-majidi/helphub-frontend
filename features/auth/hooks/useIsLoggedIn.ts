'use client';

import { useEffect, useState } from 'react';

interface AuthState {
  isLoggedIn: boolean;
  role: string | null;
  name: string | null;
  isExpert: boolean;
  hydrated: boolean;
}

function getCookie(name: string) {
  const value = document.cookie
    .split('; ')
    .find((row) => row.startsWith(name + '='));

  return value ? decodeURIComponent(value.split('=')[1]) : null;
}

export function useIsLoggedIn() {
  const [authState, setAuthState] = useState<AuthState>({
    isLoggedIn: false,
    role: null,
    name: null,
    isExpert: false,
    hydrated: false,
  });

  useEffect(() => {
    const authStorage = getCookie('auth-storage');

    if (!authStorage) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setAuthState({
        isLoggedIn: false,
        role: null,
        name: null,
        isExpert: false,
        hydrated: true,
      });
      return;
    }

    try {
      const parsed = JSON.parse(authStorage);

      let role: string | null = null;
      let name: string | null = null;

      if (parsed?.state?.accessToken) {
        try {
          const token = parsed.state.accessToken;
          const base64Url = token.split('.')[1];
          const base64 = base64Url
            .replace(/-/g, '+')
            .replace(/_/g, '/');

          const jwtPayload = JSON.parse(atob(base64));

          role = jwtPayload.role || null;
          name = jwtPayload.name || jwtPayload.firstName || null;
        } catch (e) {
          console.error('Failed to decode JWT on client', e);
        }
      }

      setAuthState({
        isLoggedIn: parsed?.state?.isAuthenticated === true,
        role,
        name,
        isExpert: role === 'specialist',
        hydrated: true,
      });
    } catch {
      setAuthState({
        isLoggedIn: false,
        role: null,
        name: null,
        isExpert: false,
        hydrated: true,
      });
    }
  }, []);

  return authState;
}