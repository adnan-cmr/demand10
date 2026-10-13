"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { checkUserAuth } from '@/services/userApi';
import Sidebar from '@/Componenets/UserDashboard/Sidebar';
import Header from '@/Componenets/UserDashboard/Header';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Menu } from 'lucide-react';

export default function UserDashboardClient({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false); // Changed default to false for mobile-first
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const authData = await checkUserAuth();
        if (authData.ok) {
          setUser(authData.user);
        } else {
          // Check if it's a token expiration issue
          if (authData.message && authData.message.includes('expired')) {
            alert('Your session has expired. Please login again.');
          }
          // Redirect to login if not authenticated
          router.push('/');
        }
      } catch (error) {
        console.error('Authentication check failed:', error);
        // Redirect to login on network error as well
        router.push('/');
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [router]);

  // Handle responsive sidebar
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setSidebarOpen(true);
      } else {
        setSidebarOpen(false);
      }
    };

    // Set initial state
    handleResize();
    
    // Add event listener
    window.addEventListener('resize', handleResize);
    
    // Cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-white">
        <div className="text-center p-8">
          {/* Modern pulse loader */}
          <div className="relative">
            <div className="w-20 h-20 mx-auto mb-6 relative">
              {/* Outer ring */}
              <div className="absolute inset-0 border-4 border-[#4897de] border-opacity-20 rounded-full"></div>
              {/* Inner animated ring */}
              <div className="absolute inset-0 border-4 border-transparent border-t-[#4897de] rounded-full animate-spin"></div>
              {/* Center dot */}
              <div className="absolute inset-4 bg-[#4897de] rounded-full animate-pulse"></div>
              {/* Pulsing effect */}
              <div className="absolute inset-0 border-4 border-[#4897de] border-opacity-30 rounded-full animate-ping"></div>
            </div>
          </div>
          
          
        </div>
      </div>
    );
  }

  if (!user) {
    return null; // Router will redirect
  }

  return (
    <div className="flex flex-1">
      {/* Sticky Sidebar - position sticky on desktop, fixed on mobile */}
      <div className={`sticky top-0 lg:top-0 z-30 h-screen bg-white  transition-all duration-300 ease-in-out lg:sticky lg:flex lg:flex-col ${
        sidebarOpen ? "w-64" : "w-20"
      }`}>
        <Sidebar 
          sidebarOpen={sidebarOpen} 
          toggleSidebar={toggleSidebar} 
          user={user}
        />
      </div>
      
      {/* Floating button to reopen sidebar when collapsed on desktop */}
      {!sidebarOpen && (
        <button
          onClick={toggleSidebar}
          className="fixed top-20 left-4 z-20 p-3 bg-[#4897de] text-white rounded-xl shadow-lg hover:bg-[#0249aa] transition-all duration-200 lg:block transform hover:scale-110"
          aria-label="Open sidebar"
        >
          <Menu size={20} />
        </button>
      )}
      
      {/* Main Content Area - scrollable */}
      <div className="flex-1 flex flex-col min-h-0 w-full">
        <div className="w-full">
          <Header 
            sidebarOpen={sidebarOpen} 
            toggleSidebar={toggleSidebar} 
            user={user}
          />
        </div>
        <main className="flex-1 overflow-y-auto p-2 md:p-3 bg-white">
          <div className="w-full mx-auto">
            {children}
          </div>
        </main>
      </div>
      
      <ToastContainer 
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        toastStyle={{
          backgroundColor: '#4897de',
          color: 'white',
          borderRadius: '12px',
          fontWeight: '500',
          fontSize: '14px',
          boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
        }}
        progressStyle={{
          backgroundColor: 'rgba(255, 255, 255, 0.3)'
        }}
        bodyStyle={{
          padding: '12px 16px',
          fontFamily: 'inherit'
        }}
      />
    </div>
  );
}