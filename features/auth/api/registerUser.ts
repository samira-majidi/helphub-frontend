import axios from 'axios';

import { RegisterPayload,RegisterResponse } from '../model/type';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

/**
 * درخواست ثبت‌نام کاربر جدید
 */
export const registerUserApi = async (payload: RegisterPayload): Promise<RegisterResponse> => {
  // نیازی به try/catch در اینجا نیست، خطا مستقیما به هوک منتقل می‌شود
  const response = await axios.post<RegisterResponse>(
    `${API_BASE_URL}/auth/register`,
    payload,
    {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    }
  );
  
  return response.data; // در صورت موفقیت، فقط دیتا برمی‌گردد
};
