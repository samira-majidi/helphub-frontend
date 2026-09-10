import '@/styles/global.css';
import { Toaster } from 'react-hot-toast';
import type { Metadata } from 'next';
import { Inter, Merriweather } from 'next/font/google';
import { cookies } from 'next/headers'; 

import Providers from './provider';
import NotificationListener from '@/entities/notifications/ui/NotificationListener';
import Navbar from '@/widget/navbar/Navbar';

export const metadata: Metadata = {
  title: 'helphub',
  description: 'Comprehensive platform for searching, comparing, and booking best specialist in your city with lowest time',
};

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const merriweather = Merriweather({ 
  weight: ['400', '700', '900'], 
  subsets: ['latin'],
  variable: '--font-merriweather' 
});

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const authCookie = cookieStore.get('auth-storage')?.value;
  
  let isLoggedIn = false;
  let email = null;
  let name = null;

  if (authCookie) {
    try {
      const parsed = JSON.parse(decodeURIComponent(authCookie));
      isLoggedIn = parsed?.state?.isAuthenticated === true;

      if (parsed?.state?.accessToken) {
        const token = parsed.state.accessToken;
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/'); 
        const jwtPayload = JSON.parse(Buffer.from(base64, 'base64').toString('utf-8'));
        
        email = jwtPayload.email || null;
        name = jwtPayload.name || jwtPayload.firstName || null;
      }
    } catch (error) {
      console.error("Failed to parse auth cookie on server", error);
    }
  }

  return (
    <html lang="en" dir="ltr">
      <body className={`${inter.variable} ${merriweather.variable} font-sans bg-white text-slate-800`}>
        <Providers>
          <NotificationListener />
          <Toaster position="top-right" /> 
          
          <Navbar isLoggedIn={isLoggedIn} email={email} name={name} /> 
          
          <main className="min-h-screen flex flex-col">
            {children}
          </main>
          
        </Providers>
      </body>
    </html>
  );
}
