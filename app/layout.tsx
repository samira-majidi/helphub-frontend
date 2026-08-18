import '@/styles/global.css';
import { Toaster } from 'react-hot-toast';

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import Providers from './provider';
import NotificationListener from '@/entities/notifications/ui/NotificationListener';

export const metadata: Metadata = {
  title: 'helphub',
  description: 'Comprehensive platform for searching, comparing, and booking best specialist in your city with lowest time',
};

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
});


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" dir="ltr">
      <body className={`flex flex-col min-h-screen ${inter.className}`}>
        <Providers>
          <NotificationListener />
          <Toaster position="top-right" /> {/* 👈 این کامپوننت باید به DOM اضافه بشه */}
          {children}
        </Providers>
      </body>
    </html>
  );
}