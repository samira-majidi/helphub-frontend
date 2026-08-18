// src/shared/lib/getServerUser.ts
import { jwtDecode } from 'jwt-decode';
import { cookies } from 'next/headers';

export interface ServerUser {
     sub?: string | number;
  userId: string;
  role: string;
  token: string;
   name: string; 
}

// تعریف تایپ برای جلوگیری از ارور Unexpected any
interface CustomJwtPayload {
  sub?: string;
  id?: string;
  role: string;
    name?: string; 
}

// تابع باید async باشه و Promise برگردونه
export async function getServerUser(): Promise<ServerUser | null> {
  // اضافه کردن await برای cookies()
  const cookieStore = await cookies(); 
  const authCookie = cookieStore.get('auth-storage')?.value;

  if (!authCookie) return null;

  try {
    const parsedCookie = JSON.parse(decodeURIComponent(authCookie));
    const token = parsedCookie?.state?.accessToken;

    if (!token) return null;

    // استفاده از جنریک برای مشخص کردن تایپ خروجی
    const decodedToken = jwtDecode<CustomJwtPayload>(token);
    
    return {
      userId: decodedToken.sub || decodedToken.id || '',
      role: decodedToken.role,
      token: token,
        name: decodedToken.name || 'Host', 
    };
  } catch (error) {
    console.error("❌ Error extracting user from cookie:", error);
    return null;
  }
}
