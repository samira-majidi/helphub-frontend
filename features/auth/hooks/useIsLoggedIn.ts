'use client';

import { useState } from "react";

function getCookie(name: string) {
  const value = document.cookie
    .split("; ")
    .find((row) => row.startsWith(name + "="));

  return value ? decodeURIComponent(value.split("=")[1]) : null;
}

export function useIsLoggedIn() {
  const [authState] = useState(() => {
    if (typeof window === "undefined") return { isLoggedIn: false, role: null, name: null };

    const authStorage = getCookie("auth-storage");

    if (!authStorage) return { isLoggedIn: false, role: null, name: null };

    try {
      const parsed = JSON.parse(authStorage);
      let role = null;
      let name = null;

      
      if (parsed?.state?.accessToken) {
        try {
          const token = parsed.state.accessToken;
          const base64Url = token.split('.')[1];
          const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
          const jwtPayload = JSON.parse(atob(base64));
          
          role = jwtPayload.role || null;
          name = jwtPayload.name || jwtPayload.firstName || null;
        } catch (e) {
          console.error("Failed to decode JWT on client", e);
        }
      }

      return {
        isLoggedIn: parsed?.state?.isAuthenticated === true,
        role: role,
        name: name,
      };
    } catch {
      return { isLoggedIn: false, role: null, name: null };
    }
  });

  return authState;
}
