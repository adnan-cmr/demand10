"use client";

import { Bell, LogOut, Menu } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { userLogout } from '@/services/userApi';

export default function Header({ toggleSidebar }) {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await userLogout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      router.push('/login');
    }
  };

  return (
    <header className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-20">
      <div className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4">

        {/* Mobile/tablet hamburger */}
        <button
          onClick={toggleSidebar}
          className="lg:hidden p-2 rounded-lg text-gray-700 hover:bg-red-50 hover:text-[#E11D2E] transition-colors"
          aria-label="Open menu"
        >
          <Menu size={24} />
        </button>

        <div className="flex items-center space-x-2 sm:space-x-4 ml-auto">
          {/* Notification Icon */}
          <button className="relative p-1">
            <Bell size={24} className="text-gray-700" />
            <span className="absolute top-0 right-0 w-2 h-2 bg-[#E11D2E] rounded-full"></span>
          </button>

          {/* Profile Section */}
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#E11D2E] to-[#0F1B3D] flex items-center justify-center text-white font-bold">
              AD
            </div>
            <div className="hidden md:block">
              <p className="text-sm font-medium">Admin</p>
              <p className="text-xs text-gray-500">support@demand10.com </p>
            </div>
          </div>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg bg-[#E11D2E] text-white text-sm font-semibold hover:bg-[#0F1B3D] transition-colors shadow-sm"
            aria-label="Logout"
          >
            <LogOut size={18} />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>

      </div>
    </header>
  );
}
