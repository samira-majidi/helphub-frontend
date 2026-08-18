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
    if (typeof window === "undefined") return { isLoggedIn: false, role: null };

    const authStorage = getCookie("auth-storage");

    if (!authStorage) return { isLoggedIn: false, role: null };

    try {
      const parsed = JSON.parse(authStorage);
      return {
        isLoggedIn: parsed?.state?.isAuthenticated === true,
        role: parsed?.state?.user?.role || null
      };
    } catch {
      return { isLoggedIn: false, role: null };
    }
  });


  return authState;
}
