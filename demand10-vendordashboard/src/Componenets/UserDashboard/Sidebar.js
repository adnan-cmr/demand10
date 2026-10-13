import { getUserClaims, userLogout } from "@/services/userApi";
import { 
  Menu, 
  X, 
  LayoutDashboard, 
  Building, 
  MessageSquare,
  ChevronLeft,
  LogOut,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function Sidebar({
 
}) {
  const [claims, setClaims] = useState([]);
  const pathname = usePathname();
  const router = useRouter();
  
  const handleLogout = async () => {
    try {
      // Call the backend logout API to properly invalidate the token
      const response = await userLogout();
      
      if (response.ok) {
        // Clear user token from cookies (additional safety measure)
        document.cookie = "userToken=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
        // Redirect to home page
        router.push('/');
        toast.success("Logged out successfully");
      } else {
        // Even if the API call fails, still clear the cookie and redirect
        document.cookie = "userToken=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
        router.push('/');
        toast.warn("Session ended");
      }
    } catch (error) {
      console.error("Logout error:", error);
      // Even if the API call fails, still clear the cookie and redirect
      document.cookie = "userToken=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
      router.push('/');
      toast.warn("Session ended due to an error");
    }
  };

  useEffect(() => {
    const fetchClaims = async () => {
      try {
        const claimsData = await getUserClaims();
        if (claimsData.ok) {
          // Filter only approved claims
          const approvedClaims = claimsData.claims.filter(claim => claim.status === 'approved');
          setClaims(approvedClaims);
        }
      } catch (error) {
        console.error('Error fetching claims:', error);
      }
    };

    fetchClaims();
  }, []);
  
  // Define navigation items with icons
  const navItems = [
    {
      name: "Dashboard",
      href: "/user-dashboard",
      icon: <LayoutDashboard size={20} />
    },
  ];
  
  if (claims.length > 0) {
    navItems.push({
      name: "Edit Companies",
      href: "/user-dashboard/edit-companies",
      icon: <Building size={20} />
    });
    
    // Add Reviews tab for users with approved claims
    navItems.push({
      name: "Reviews",
      href: "/user-dashboard/reviews",
      icon: <MessageSquare size={20} />
    });
  }

  return (
    <>
      {/* Main Sidebar Container - Added flex-shrink-0 to prevent sidebar from shrinking */}
      <div className={`h-full flex flex-col flex-shrink-0 w-64 bg-white border-r border-gray-200`}>
    
        <div className="flex-1 overflow-y-auto px-3 py-4 bg-white">
          {navItems.map((item) => (
            <Link key={item.name} href={item.href}>
              <div
                className={`flex items-center p-3 rounded-xl transition-all duration-300 mb-2 group ${
                  pathname === item.href
                    ? "bg-gradient-to-br from-[#265ba3] to-[#1a365d] text-white font-bold shadow-lg"
                    : "text-gray-700 hover:bg-blue-50 hover:text-[#265ba3] hover:shadow-md"
                }`}
              >
                <span className="flex items-center justify-center w-8">
                  {item.icon}
                </span>
                <span className={`ml-3 font-medium`}>
                  {item.name}
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* Logout Button */}
        <div className="p-4 border-t border-gray-200 flex-shrink-0 bg-gray-50">
          <button 
            onClick={handleLogout}
            className="w-full flex items-center justify-center space-x-2 bg-gradient-to-br from-[#265ba3] to-[#1a365d] text-white px-4 py-3 rounded-xl transition-all duration-300 font-bold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </>
  );
}