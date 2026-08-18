export interface User {
  id: number;
  name: string;
  lastName: string;
  email: string;
  password?: string;
  role: string;
}

export interface RegisterResponseData {
  user: User;
  accesstoken: string;   // دقیقاً مطابق JSON شما
  refreshToken: string;  // دقیقاً مطابق JSON شما
}

export interface MetaData {
  timestamp: string;
  path: string;
  version: string;
}

// تایپ نهایی پاسخ سرور
export interface RegisterResponse {
  data: RegisterResponseData;
  meta: MetaData;
}

// تایپ دیتای ارسالی به سرور (بدنه درخواست)
export interface RegisterPayload {
  name?: string;
  lastName?: string;
  email: string;
  password: string;
}


// ساختار داده‌های برگشتی در بخش data
export interface SignInData {
  accesstoken: string;
  refreshToken: string;
}

// تایپ نهایی پاسخی که از سرور می‌گیریم
export interface SignInResponse {
  data: SignInData;
  meta: MetaData;
}

// تایپ اطلاعاتی که به عنوان بدنه درخواست (Body) برای ورود می‌فرستیم
export interface SignInPayload {
  email: string;
  password: string;
}