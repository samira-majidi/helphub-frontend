import axios from 'axios';


import { RegisterPayload,RegisterResponse  } from '../model/type';


const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';


export const registerSpecialistApi = async (payload: RegisterPayload): Promise<RegisterResponse> => {
  try {
    const response = await axios.post<RegisterResponse>(
      `${API_BASE_URL}/auth/register-specialist`,
      payload,
      {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
      }
    );

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // در صورت وجود پیام خطای مشخص از بک‌اند، همان را برمی‌گرداند
      const errorMessage = error.response?.data?.message || 'Specialist registration failed!';
      throw new Error(errorMessage);
    }
    throw new Error('Unknown error occurred during specialist registration.');
  }
};


export const registerUserApi = async (payload: RegisterPayload): Promise<RegisterResponse> => {

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
  
  return response.data;
};
