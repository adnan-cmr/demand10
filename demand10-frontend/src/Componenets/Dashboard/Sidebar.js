import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {
  FaDatabase,
  FaRegNewspaper,
  FaPenFancy,
  FaFileSignature,
  FaUsers,
  FaClipboardList,
  FaBuilding,
  FaStar,
  FaList,
  FaSitemap,
  FaBoxes,
  FaChartBar,
  FaUserCheck,
  FaUserPlus,
  FaFileAlt,
  FaCog,
  FaMedal,
  FaGlobe,
  FaFileInvoice
} from "react-icons/fa";

export default function Sidebar({
  activeTab,
  setActiveTab,
  sidebarOpen,
  toggleSidebar,
}) {
  return (
    <div
      className={`${
        sidebarOpen ? "w-64" : "w-20"
      } transition-all duration-300 bg-gradient-to-b from-[#0F1B3D] via-[#0B1533] to-[#070D24] text-white shadow-xl flex flex-col min-h-screen overflow-y-auto`}
    >
      {/* Header */}
      <div className="flex justify-between items-center p-4 pl-6 border-b border-white/10">
        <Link href="/">
          <h1 className={` w-20 h-5 ${!sidebarOpen && "hidden"}`}>
            <span className="inline-block bg-white rounded-lg px-2 py-1">
              <Image
                src="/images/logo.png"
                width={100}
                height={100}
                alt="logo"
                priority
                unoptimized
              />
            </span>
          </h1>
        </Link>
        <button onClick={toggleSidebar} className="text-white/80 hover:text-white cursor-pointer transition-colors">
          {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Navigation Buttons */}
      <div className="flex flex-col mt-6 space-y-2 px-2">
        <SidebarButton
          icon={<FaRegNewspaper size={20} />}
          label="All Blogs"
          isActive={activeTab === "blog"}
          onClick={() => setActiveTab("blog")}
          sidebarOpen={sidebarOpen}
        />

        <SidebarButton
          icon={<FaPenFancy size={20} />}
          label="Add Blogs"
          isActive={activeTab === "Addblog"}
          onClick={() => setActiveTab("Addblog")}
          sidebarOpen={sidebarOpen}
        />

        <SidebarButton
          icon={<FaFileSignature size={20} />}
          label="Data Request"
          isActive={activeTab === "DataRequest"}
          onClick={() => setActiveTab("DataRequest")}
          sidebarOpen={sidebarOpen}
        />
        
        <SidebarButton
          icon={<FaUserPlus size={20} />}
          label="Add User"
          isActive={activeTab === "AddUser"}
          onClick={() => setActiveTab("AddUser")}
          sidebarOpen={sidebarOpen}
        />
        
        <SidebarButton
          icon={<FaUsers size={20} />}
          label="All Users"
          isActive={activeTab === "Users"}
          onClick={() => setActiveTab("Users")}
          sidebarOpen={sidebarOpen}
        />
        
        {/* Website Users Tab */}
        <SidebarButton
          icon={<FaGlobe size={20} />}
          label="Website Users"
          isActive={activeTab === "WebsiteUsers"}
          onClick={() => setActiveTab("WebsiteUsers")}
          sidebarOpen={sidebarOpen}
        />
        
        <SidebarButton
          icon={<FaClipboardList size={20} />}
          label="Categories"
          isActive={activeTab === "Categories"}
          onClick={() => setActiveTab("Categories")}
          sidebarOpen={sidebarOpen}
        />
        
        <SidebarButton
          icon={<FaSitemap size={20} />}
          label="Sub Categories Sheet"
          isActive={activeTab === "SubCategory"}
          onClick={() => setActiveTab("SubCategory")}
          sidebarOpen={sidebarOpen}
        />
        
        {/* Subcategory Management Tab */}
        <SidebarButton
          icon={<FaBoxes size={20} />}
          label="Subcategory Add"
          isActive={activeTab === "SubcategoryManagement"}
          onClick={() => setActiveTab("SubcategoryManagement")}
          sidebarOpen={sidebarOpen}
        />
        
        {/* Subcategory Details Tab */}
        <SidebarButton
          icon={<FaFileAlt size={20} />}
          label="Subcategory Details"
          isActive={activeTab === "SubcategoryDetails"}
          onClick={() => setActiveTab("SubcategoryDetails")}
          sidebarOpen={sidebarOpen}
        />
         {/* Subcategory Content Tab */}
        <SidebarButton
          icon={<FaFileInvoice size={20} />}
          label="Subcategory Content"
          isActive={activeTab === "SubcategoryContent"}
          onClick={() => setActiveTab("SubcategoryContent")}
          sidebarOpen={sidebarOpen}
        />
        
        {/* Subcategory FAQs Tab */}
        <SidebarButton
          icon={<FaFileInvoice size={20} />}
          label="Subcategory FAQs"
          isActive={activeTab === "SubcategoryFAQs"}
          onClick={() => setActiveTab("SubcategoryFAQs")}
          sidebarOpen={sidebarOpen}
        />
        
        <SidebarButton
          icon={<FaBuilding size={20} />}
          label="All Companies"
          isActive={activeTab === "allCompanies"}
          onClick={() => setActiveTab("allCompanies")}
          sidebarOpen={sidebarOpen}
        />
        
        {/* COMPANY CLAIMS SECTION */}
        <SidebarButton
          icon={<FaUserCheck size={20} />}
          label="Company Claims"
          isActive={activeTab === "CompanyClaims"}
          onClick={() => setActiveTab("CompanyClaims")}
          sidebarOpen={sidebarOpen}
        />
        
        {/* COMPANY LISTINGS SECTION */}
        <SidebarButton
          icon={<FaList size={20} />}
          label="Company Listings"
          isActive={activeTab === "CompanyListings"}
          onClick={() => setActiveTab("CompanyListings")}
          sidebarOpen={sidebarOpen}
        />
        
        {/* REVIEWS SECTION */}
        <SidebarButton
          icon={<FaStar size={20} />}
          label="Reviews"
          isActive={activeTab === "Reviews"}
          onClick={() => setActiveTab("Reviews")}
          sidebarOpen={sidebarOpen}
        />
        
        {/* BADGES SECTION */}
        <SidebarButton
          icon={<FaMedal size={20} />}
          label="Badges"
          isActive={activeTab === "Badges"}
          onClick={() => setActiveTab("Badges")}
          sidebarOpen={sidebarOpen}
        />
      </div>
    </div>
  );
}

// Reusable Button Component
function SidebarButton({ icon, label, isActive, onClick, sidebarOpen }) {
  return (
    <button
      className={`flex items-center p-3 rounded-lg transition-all duration-200 ${
        isActive
          ? "bg-white/15 text-white font-semibold border-l-4 border-[#FCA5A5] shadow-lg"
          : "text-red-100 hover:bg-white/10 hover:text-white"
      }`}
      onClick={onClick}
    >
      {icon}
      {sidebarOpen && <span className="ml-3">{label}</span>}
</button>
  );
}