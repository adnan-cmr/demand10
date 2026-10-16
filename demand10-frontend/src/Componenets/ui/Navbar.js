"use client";
import { userLogout } from '@/services/userApi';
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  ChevronDown,
  Menu,
  X,
  Facebook,
  Linkedin,
  Phone,
  Mail,
  User
} from "lucide-react";
import Image from "next/image";
import dynamic from 'next/dynamic';
import { checkUserAuth } from '@/services/userApi'; // Import the existing service 
import { IoMdArrowDropdown } from "react-icons/io";

// Dynamically import the AuthForm to avoid SSR issues
const AuthForm = dynamic(() => import('@/Componenets/ui/AuthForm'), { ssr: false });

const getDashboardUrl = (user) => {
  if (['admin', 'superadmin'].includes(user?.role)) {
    return '/admin/dashboard';
  }

  return '/vendor/dashboard';
};

const Navbar = ({ categories = [] }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [hoveredCategoryId, setHoveredCategoryId] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const [expandedCategoryId, setExpandedCategoryId] = useState(null);
  const [showAuthForm, setShowAuthForm] = useState(false);
  const [user, setUser] = useState(null);
  const dropdownRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const dropdownTimeoutRef = useRef(null);

  // Check if user is already logged in
  useEffect(() => {
    const checkUserAuthStatus = async () => {
      try {
        const data = await checkUserAuth();
        if (data.ok) {
          setUser(data.user);
        }
      } catch (error) {
        console.error('Authentication check failed:', error);
        setUser(null);
      }
    };

    checkUserAuthStatus();
  }, []);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const closeDropdown = () => {
    setIsDropdownOpen(false);
    setHoveredCategoryId(null);
  };

  const handleMouseEnter = () => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
    }
    setIsDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setIsDropdownOpen(false);
      setHoveredCategoryId(null);
    }, 300);
  };

  const handleCategoryHover = (categoryId) => {
    setHoveredCategoryId(categoryId);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

const handleSignOut = async () => {
  try {
    await userLogout();
  } catch (err) {
    console.error('Logout API failed:', err);
  } finally {
    setUser(null);
    // Full reload to flush SSR-cached user state
    window.location.href = 'https://demand10.com';
  }
};

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") {
        setIsDropdownOpen(false);
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
        setHoveredCategoryId(null);
      }
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target) &&
        !event.target.closest(".mobile-menu-button")
      ) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (!isMobileMenuOpen) {
      setIsCategoriesOpen(false);
      setExpandedCategoryId(null);
    }
  }, [isMobileMenuOpen]);

  return (
    <>
     

      {/* Main Navbar */}
      <header className="relative sticky top-0   z-50 bg-white  border-b border-gray-100">
        <div className="max-w-9xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex-shrink-0">
              <div className="flex items-center">
                <Image
                  src="/images/logo.png"
                  width={140}
                  height={60}
                  alt="Logo"
                  className="w-50 md:w-66 h-full object-contain"
                  
                />
              </div>
            </Link>

          

            {/* Right Side Actions */}
            <div className="flex items-center space-x-4">
                {/* Center Navigation - Desktop */}
            <nav className="hidden lg:flex flex-1 ">
              <div className="flex items-center space-x-4">
                <Link
                  href="/"
                  className="text-lg font-semibold text-black hover:text-[#E11D2E] transition-colors duration-300 px-3 py-2"
                >
                  Home
                </Link>
              
                {/* Categories Dropdown */}
                <div 
                  className="relative"
                  ref={dropdownRef}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  <button
                    onClick={toggleDropdown}
                    className="flex items-center text-lg font-semibold text-black hover:text-[#E11D2E] transition-colors duration-300 px-3 py-2"
                  >
                    Categories
                    <ChevronDown
                      className={`ml-1 h-4 w-4 transition-transform duration-200 ${
                        isDropdownOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                </div>
              
<Link
                  href="/review"
                  className="text-lg font-semibold text-black hover:text-[#E11D2E] transition-colors duration-300 px-3 py-2"
                >
                  Write a Review
                </Link>
<Link
                  href="/listing"
                  className="text-lg font-semibold text-black hover:text-[#E11D2E] transition-colors duration-300 px-3 py-2"
                >
                  Add a Product
                </Link>

                
                 
              </div>
            </nav>
              {user ? (
               <div className="relative cursor-pointer">
                    <Link
      href={getDashboardUrl(user)}
      className="hidden lg:flex items-center cursor-pointer justify-center w-13 h-13 rounded-full bg-gradient-to-br from-[#E11D2E] via-[#B91C1C] to-[#0F1B3D] text-white transition-colors duration-300"
    >
      <User className="h-8 w-8" />
    </Link>
                </div>

              ) : (
                // Auth button when user is not logged in
                <button 
                  className="hidden lg:flex items-center cursor-pointer bg-gradient-to-br from-[#E11D2E] via-[#B91C1C] to-[#0F1B3D] text-white px-7 py-2.5 rounded-full font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-[#E11D2E]/30 hover:-translate-y-0.5"
                  onClick={() => setShowAuthForm(true)}
                >
                  Sign In
                </button>
              )}

              {/* Mobile Menu Button */}
              <button
                onClick={toggleMobileMenu}
                className="lg:hidden p-2 text-gray-600 hover:text-[#EF4444] hover:bg-[#EF4444]/10 rounded-lg transition-colors duration-300 mobile-menu-button"
              >
                {isMobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* NEW Categories Dropdown Design - Desktop */}
        {isDropdownOpen && (
          <div
            ref={dropdownRef}
            className="absolute left-0 w-full bg-white "
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-4 gap-0">
                {categories?.map((category) => (
                  <div
                    key={category._id}
                    className="relative group"
                  >
                    {/* Category Header */}
                  <div className="text-[#E11D2E] px-3 py-2 ">
  <div className="flex items-center">
    <h3 className="font-bold text-sm flex items-center gap-1 truncate">
      {category.name}
      <IoMdArrowDropdown className="w-4 h-4" />
    </h3>
  </div>
</div>


                    {/* Subcategories - Always visible */}
                    <div className="bg-white border-r border-gray-200 max-h-96 opacity-100">
                      <div>
                        {category.subcategories?.slice(0, 6).map((subcategory, index) => (
                          <Link
                            key={index}
                            href={`/${subcategory.slug}`}
                            onClick={closeDropdown}
                            className="block px-3 py-1 text-sm text-[#494949] hover:underline"
                          >
                            {subcategory.name}
                          </Link>
                        ))}
                       
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Bottom Button - View All Categories */}
              <div className="  px-6 py-4 text-center">
                <Link 
                  href="/all-categories"
                  onClick={closeDropdown}
                  className="inline-block bg-gradient-to-br from-[#E11D2E] via-[#B91C1C] to-[#0F1B3D] text-white px-8 py-2 rounded-lg font-semibold  transition-colors duration-200"
                >
                  View All Categories
                </Link>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[60] lg:hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/10 bg-opacity-50"
            onClick={toggleMobileMenu}
          />

          {/* Menu Panel */}
          <div
            ref={mobileMenuRef}
            className="relative bg-white w-full h-full max-w-md ml-auto transform transition-transform duration-300"
          >
            <div className="flex items-center justify-between p-4 border-b">
              <Link href="/" onClick={toggleMobileMenu} className="flex-shrink-0">
                <Image
                  src="/images/logo.png"
                  width={140}
                  height={60}
                  alt="Logo"
                  className="w-40 h-16 object-cover"
                />
              </Link>
              <button
                onClick={toggleMobileMenu}
                className="p-2 text-gray-600 hover:text-[#EF4444] rounded-lg"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="p-4 overflow-y-auto h-[calc(100vh-64px)]">
              {/* Auth/Profile Button for Mobile */}
              {user ? (
                <Link
      href={getDashboardUrl(user)}
      onClick={toggleMobileMenu}
      className="w-full mb-6 bg-gradient-to-br from-[#E11D2E] via-[#B91C1C] to-[#0F1B3D] text-white py-3 rounded-full font-semibold transition-colors duration-300 flex items-center justify-center"
    >
      <User className="h-4 w-4 mr-2" />
      Profile
    </Link>
              ) : (
                <button 
                  className="w-full mb-6 bg-gradient-to-br from-[#E11D2E] via-[#B91C1C] to-[#0F1B3D] text-white py-3 rounded-full font-semibold transition-colors duration-300"
                  onClick={() => {
                    toggleMobileMenu();
                    setShowAuthForm(true);
                  }}
                >
                  Sign In
                </button>
              )}

              {/* Navigation Links */}
              <nav className="flex flex-col space-y-1">
                <Link
                  href="/"
                  onClick={toggleMobileMenu}
                  className="text-lg font-medium text-gray-800 hover:bg-gray-100 rounded-lg px-4 py-3 transition-colors"
                >
                  Home
                </Link>
                
                {/* Categories Accordion */}
                <div className="border-t border-gray-200 mt-2 pt-2">
                  <button
                    onClick={() => setIsCategoriesOpen(!isCategoriesOpen)}
                    className="flex items-center justify-between w-full text-lg font-medium text-gray-800 hover:bg-gray-100 rounded-lg px-4 py-3 transition-colors"
                  >
                    <span>Categories</span>
                    <ChevronDown
                      className={`h-5 w-5 transition-transform duration-200 ${
                        isCategoriesOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {isCategoriesOpen && (
                    <div className="pl-4 mt-1 space-y-1">
                      {categories?.map((category) => (
                        <div
                          key={category._id}
                          className="border-b border-gray-100 pb-1"
                        >
                          <button
                            onClick={() =>
                              setExpandedCategoryId(
                                expandedCategoryId === category._id
                                  ? null
                                  : category._id
                              )
                            }
                            className="flex items-center justify-between w-full text-base font-medium text-gray-700 hover:bg-gray-50 rounded-lg px-4 py-2 transition-colors"
                          >
                            <span>{category.name}</span>
                            <ChevronDown
                              className={`h-4 w-4 transition-transform duration-200 ${
                                expandedCategoryId === category._id
                                  ? "rotate-180"
                                  : ""
                              }`}
                            />
                          </button>

                          {expandedCategoryId === category._id && (
                            <div className="pl-4 mt-1 space-y-1">
                              {category.subcategories?.map((subcategory) => (
                                <Link
                                  key={subcategory._id}
                                  href={`/${subcategory.slug}`}
                                  onClick={toggleMobileMenu}
                                  className="block text-sm text-gray-600 hover:bg-gray-50 rounded-lg px-4 py-2 transition-colors"
                                >
                                  {subcategory.name}
                                </Link>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </nav>

              {/* Footer Contact and Social */}
              <div className="mt-8 pt-4 border-t">
                <div className="space-y-3">
                  <div className="flex items-center space-x-2 text-sm">
                    <Phone className="h-4 w-4 text-gray-600" />
                    <span>+1&nbsp;(302)&nbsp;200-8684</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <Mail className="h-4 w-4 text-gray-600" />
                    <span>support@demand10.com</span>
                  </div>
                </div>
                <div className="mt-4">
                  <span className="text-sm text-gray-600">Follow us:</span>
                  <div className="flex items-center space-x-3">
                    <a
                      href="https://www.facebook.com/people/Intentwire/61572572363704/"
                      target="_blank"
                      rel="noopener noreferrer"
                       className="text-gray-900 hover:text-[#0F1B3D] transition-colors"
                    >
                      <Facebook className="h-4 w-4" />
                    </a>

                    <a
                      href="https://www.linkedin.com/company/intentwire/posts/?feedView=all"
                      target="_blank"
                      rel="noopener noreferrer"
                       className="text-gray-900 hover:text-[#0F1B3D] transition-colors"
                    >
                      <Linkedin className="h-4 w-4" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Auth Form Popup */}
      {showAuthForm && (
        <AuthForm 
          onClose={() => setShowAuthForm(false)}
          onAuthSuccess={(userData) => {
            setUser(userData);
            setShowAuthForm(false);
          }}
        />
      )}
    </>
  );
};

export default Navbar;