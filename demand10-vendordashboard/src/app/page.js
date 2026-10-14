"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { checkUserAuth } from '@/services/userApi';
import LoginPage from "@/Componenets/ui/LoginPage";

export default function Page() {
  const [user, setUser] = useState(null);
  const [authChecked, setAuthChecked] = useState(false);
  const router = useRouter();

  // Check if user is already authenticated
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const authData = await checkUserAuth();
        if (authData.ok) {
          setUser(authData.user);
          if (['admin', 'superadmin'].includes(authData.user?.role)) {
            window.location.assign(
              process.env.NEXT_PUBLIC_ADMIN_DASHBOARD_URL ||
                'http://localhost:3008/intent-admin/dashboard'
            );
          } else {
            router.push('/user-dashboard');
          }
        }
      } catch (error) {
        console.error('Authentication check failed:', error);
      } finally {
        setAuthChecked(true);
      }
    };

    checkAuth();
  }, [router]);

  const handleAuthSuccess = (userData) => {
    console.log('Authentication successful for user:', userData);
    setUser(userData);
    if (['admin', 'superadmin'].includes(userData?.role)) {
      window.location.assign(
        process.env.NEXT_PUBLIC_ADMIN_DASHBOARD_URL ||
          'http://localhost:3008/intent-admin/dashboard'
      );
    } else {
      router.push('/user-dashboard');
    }
  };

  // Show login form immediately without any loading text
  // Only redirect if user is already authenticated
  if (user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#f0f9ff] to-[#e0f2fe]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#4897de] mx-auto"></div>
          <p className="mt-4 text-gray-600">Redirecting to dashboard...</p>
        </div>
      </div>
    );
  }

  // Show login form directly - no loading text, just the form
  return (
    <main className="min-h-screen bg-gradient-to-br from-[#f0f9ff] to-[#e0f2fe] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <LoginPage 
          onAuthSuccess={handleAuthSuccess}
        />
      </div>
    </main>
  );
}