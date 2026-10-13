import Image from "next/image";
import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 pt-16 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="mb-6">
              <Image
                src="https://demand10.com/images/logo.png"
                width={160}
                height={45}
                alt="Demand10 Logo"
                className="max-w-full h-auto object-contain"
                priority
                unoptimized
              />
            </div>
            <p className="text-gray-600 text-base leading-relaxed mb-6 max-w-xs">
              Empowering businesses with accurate B2B data and verified suppliers for better decision-making.
            </p>
            <div className="flex space-x-5">
              <Link href="https://www.facebook.com/profile.php?id=61572572363704" className="text-gray-500 hover:text-[#4897de] transition-all duration-300 transform hover:scale-110">
                <span className="sr-only">Facebook</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                </svg>
              </Link>
              <Link href="https://www.linkedin.com/company/intentwire/posts/?feedView=all" className="text-gray-500 hover:text-[#4897de] transition-all duration-300 transform hover:scale-110">
                <span className="sr-only">LinkedIn</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
                </svg>
              </Link>
            </div>
          </div>

          {/* Solutions */}
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-6 pb-2 border-b border-gray-200 inline-block">Solutions</h3>
            <ul className="space-y-4">
              <li>
                <Link href="https://demand10.com/managed-service-providers" className="text-gray-600 hover:text-[#4897de] transition-colors duration-300 text-base flex items-start group">
                  <span className="text-[#4897de] mr-2 opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                  Managed Service Providers
                </Link>
              </li>
              <li>
                <Link href="https://demand10.com/managed-security-service-providers" className="text-gray-600 hover:text-[#4897de] transition-colors duration-300 text-base flex items-start group">
                  <span className="text-[#4897de] mr-2 opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                  Security Service Providers
                </Link>
              </li>
              <li>
                <Link href="https://demand10.com/network-security" className="text-gray-600 hover:text-[#4897de] transition-colors duration-300 text-base flex items-start group">
                  <span className="text-[#4897de] mr-2 opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                  Network Security
                </Link>
              </li>
              <li>
                <Link href="https://demand10.com/data-backup-recovery" className="text-gray-600 hover:text-[#4897de] transition-colors duration-300 text-base flex items-start group">
                  <span className="text-[#4897de] mr-2 opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                  Data Backup & Recovery
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-6 pb-2 border-b border-gray-200 inline-block">Company</h3>
            <ul className="space-y-4">
              <li>
                <Link href="https://demand10.com/about" className="text-gray-600 hover:text-[#4897de] transition-colors duration-300 text-base flex items-start group">
                  <span className="text-[#4897de] mr-2 opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                  About Us
                </Link>
              </li>
              <li>
                <Link href="https://demand10.com/blog" className="text-gray-600 hover:text-[#4897de] transition-colors duration-300 text-base flex items-start group">
                  <span className="text-[#4897de] mr-2 opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                  Blog
                </Link>
              </li>
              
              <li>
                <Link href="https://demand10.com/contact" className="text-gray-600 hover:text-[#4897de] transition-colors duration-300 text-base flex items-start group">
                  <span className="text-[#4897de] mr-2 opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-6 pb-2 border-b border-gray-200 inline-block">Support</h3>
            <ul className="space-y-4">
              <li>
                <Link href="https://demand10.com/faq" className="text-gray-600 hover:text-[#4897de] transition-colors duration-300 text-base flex items-start group">
                  <span className="text-[#4897de] mr-2 opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="https://demand10.com/privacy-policy" className="text-gray-600 hover:text-[#4897de] transition-colors duration-300 text-base flex items-start group">
                  <span className="text-[#4897de] mr-2 opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="https://demand10.com/term-policies" className="text-gray-600 hover:text-[#4897de] transition-colors duration-300 text-base flex items-start group">
                  <span className="text-[#4897de] mr-2 opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="https://demand10.com/contact" className="text-gray-600 hover:text-[#4897de] transition-colors duration-300 text-base flex items-start group">
                  <span className="text-[#4897de] mr-2 opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                  Contact Support
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm mb-4 md:mb-0">
              © {new Date().getFullYear()} Demand10. All rights reserved.
            </p>
            <div className="flex space-x-8">
              <Link href="https://demand10.com/privacy-policy" className="text-gray-500 hover:text-[#4897de] transition-colors duration-300 text-sm hover:underline">
                Privacy Policy
              </Link>
              <Link href="https://demand10.com/term-policies" className="text-gray-500 hover:text-[#4897de] transition-colors duration-300 text-sm hover:underline">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;