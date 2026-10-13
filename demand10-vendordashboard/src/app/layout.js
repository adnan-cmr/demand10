// 👇 Add this line at the top of the file
export const dynamic = 'force-dynamic';

import "./globals.css";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from 'react-hot-toast';
import { fetchCategories } from '@/services/userApi';
import LayoutWrapper from "@/Componenets/ui/LayoutWrapper";



const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export default async function RootLayout({ children }) {
  const categories = await fetchCategories();

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <LayoutWrapper categories={categories}>
          {children}
        </LayoutWrapper>
        <Toaster 
          position="top-right"
          toastOptions={{
            duration: 5000,
            style: {
              background: '#333',
              color: '#fff',
            },
          }}
        />
      </body>
    </html>
  );
}