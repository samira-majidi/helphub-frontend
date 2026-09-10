import axios from 'axios';

const api = axios.create({

  baseURL: process.env.NEXT_PUBLIC_API_URL  || "http://helphub-app.me",
  headers: {
    'Content-Type': 'application/json',
  },
 
  withCredentials: true, 
});


api.interceptors.request.use(
  (config) => {

    if (typeof window !== 'undefined') {
      try {
   
        const getCookie = (name: string) => {
          const value = `; ${document.cookie}`;
          const parts = value.split(`; ${name}=`);
          if (parts.length === 2) return parts.pop()?.split(';').shift();
        };

        const cookieValue = getCookie('auth-storage'); 
        
        if (cookieValue) {
          const decodedValue = decodeURIComponent(cookieValue);
          const authData = JSON.parse(decodedValue);
          
         
          const token = authData?.state?.accessToken;
          
          if (token) {
          
            config.headers['Authorization'] = `Bearer ${token}`;
          }
        }
      } catch (error) {
        console.error('error in reading token', error);
      }
    }
    return config; 
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
