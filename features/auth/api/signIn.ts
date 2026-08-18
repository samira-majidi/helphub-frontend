import axios from 'axios';

import { SignInPayload, SignInResponse} from '../model/type';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

/**
 * درخواست ورود کاربر
 */
export const signInApi = async (payload: SignInPayload): Promise<SignInResponse> => {
  try {
    const response = await axios.post<SignInResponse>(
      `${API_BASE_URL}/auth/sign-in`,
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
      const errorMessage = error.response?.data?.message || 'Incorrect email or password!';
      throw new Error(errorMessage);
    }
    throw new Error('Unknown error occurred during sign-in.');
  }
};
