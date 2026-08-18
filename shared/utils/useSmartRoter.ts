'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export const useSmartRouter = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  /**
   * این تابع پارامترهای جدید را با پارامترهای فعلی URL ترکیب می‌کند
   * @param targetPath مسیر مقصد (اگر خالی باشد، در همان مسیر فعلی می‌ماند)
   * @param newParams آبجکتی از پارامترهای جدید (اگر مقدار null باشد، آن کلید حذف می‌شود)
   * @param options تنظیمات اضافه مثل scroll
   */
  const pushWithParams = (
    targetPath: string = pathname,
    newParams: Record<string, string | null | undefined> = {},
    options?: { scroll?: boolean }
  ) => {
    // گرفتن تمام پارامترهای فعلی URL
    const params = new URLSearchParams(searchParams.toString());

    // اضافه یا حذف کردن پارامترهای جدید
    Object.entries(newParams).forEach(([key, value]) => {
      if (value) {
        params.set(key, value); // اضافه یا آپدیت
      } else {
        params.delete(key); // حذف در صورت خالی بودن
      }
    });

    const queryString = params.toString();
    const finalUrl = queryString ? `${targetPath}?${queryString}` : targetPath;

    // هدایت کاربر به لینک جدید
    router.push(finalUrl, options);
  };

  return { pushWithParams };
};
