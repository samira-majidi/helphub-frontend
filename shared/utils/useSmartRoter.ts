'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export const useSmartRouter = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  /**
   * @param targetPath 
   * @param newParams 
   * @param options 
   */
  const pushWithParams = (
    targetPath: string = pathname,
    newParams: Record<string, string | null | undefined> = {},
    options?: { scroll?: boolean }
  ) => {

    const params = new URLSearchParams(searchParams.toString());

    Object.entries(newParams).forEach(([key, value]) => {
      if (value) {
        params.set(key, value); 
      } else {
        params.delete(key); 
      }
    });

    const queryString = params.toString();
    const finalUrl = queryString ? `${targetPath}?${queryString}` : targetPath;

  
    router.push(finalUrl, options);
  };

  return { pushWithParams };
};
