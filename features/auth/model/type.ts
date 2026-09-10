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
  accesstoken: string;   
  refreshToken: string;  
}

export interface MetaData {
  timestamp: string;
  path: string;
  version: string;
}


export interface RegisterResponse {
  data: RegisterResponseData;
  meta: MetaData;
}


export interface RegisterPayload {
  name?: string;
  lastName?: string;
  email: string;
  password: string;
}



export interface SignInData {
  accesstoken: string;
  refreshToken: string;
}


export interface SignInResponse {
  data: SignInData;
  meta: MetaData;
}


export interface SignInPayload {
  email: string;
  password: string;
}