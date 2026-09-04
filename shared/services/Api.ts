import axios from 'axios';

const api = axios.create({
  // آدرس پایه رو از فایلی که تو قدم دوم ساختیم می‌خونه
  baseURL: process.env.NEXT_PUBLIC_API_URL  || "http://helphub-app.me",
  headers: {
    'Content-Type': 'application/json',
  },
  // این خط برای ارسال کوکی‌ها و توکن‌های احراز هویت واجبه
  withCredentials: true, 
});
// داخل فایل Api.ts

api.interceptors.request.use(
  (config) => {
    // فقط در سمت کلاینت (مرورگر) کوکی رو می‌خونیم
    if (typeof window !== 'undefined') {
      try {
        // تابع کمکی برای پیدا کردن کوکی مورد نظر
        const getCookie = (name: string) => {
          const value = `; ${document.cookie}`;
          const parts = value.split(`; ${name}=`);
          if (parts.length === 2) return parts.pop()?.split(';').shift();
        };

        const cookieValue = getCookie('auth-storage'); // اسم کوکی شما
        
        if (cookieValue) {
          const decodedValue = decodeURIComponent(cookieValue);
          const authData = JSON.parse(decodedValue);
          
         
          const token = authData?.state?.accessToken;
          
          if (token) {
          
            config.headers['Authorization'] = `Bearer ${token}`;
          }
        }
      } catch (error) {
        console.error('خطا در خواندن توکن از کوکی:', error);
      }
    }
    return config; // درخواست رو با هدر جدید بفرست بره
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
