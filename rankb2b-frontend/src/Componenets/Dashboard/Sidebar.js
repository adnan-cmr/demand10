import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { FaDatabase, FaMedal, FaUsers, FaUserPlus, FaGlobe } from "react-icons/fa";

const TABS = [
  { id: "DataImport", label: "Data Import", icon: FaDatabase },
  { id: "TopLists", label: "Top 10 Lists", icon: FaMedal },
  { id: "AddUser", label: "Add User", icon: FaUserPlus },
  { id: "Users", label: "All Users", icon: FaUsers },
  { id: "WebsiteUsers", label: "Website Users", icon: FaGlobe },
];

export default function Sidebar({ activeTab, setActiveTab, sidebarOpen, toggleSidebar }) {
  return (
    <div
      className={`${
        sidebarOpen ? "w-64" : "w-20"
      } transition-all duration-300 bg-gradient-to-b from-[#0F1B3D] via-[#0B1533] to-[#070D24] text-white shadow-xl flex flex-col min-h-screen overflow-y-auto`}
    >
      <div className="flex justify-between items-center p-4 pl-6 border-b border-white/10">
        <Link href="/">
          <h1 className={` w-20 h-5 ${!sidebarOpen && "hidden"}`}>
            <span className="inline-block bg-white rounded-lg px-2 py-1">
              <Image src="/images/logo.png" width={100} height={100} alt="logo" priority />
            </span>
          </h1>
        </Link>
        <button onClick={toggleSidebar} className="text-white/80 hover:text-white cursor-pointer transition-colors">
          {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <div className="flex flex-col mt-6 space-y-2 px-2">
        {TABS.map(({ id, label, icon: Icon }) => (
          <SidebarButton
            key={id}
            icon={<Icon size={20} />}
            label={label}
            isActive={activeTab === id}
            onClick={() => setActiveTab(id)}
            sidebarOpen={sidebarOpen}
          />
        ))}
      </div>
    </div>
  );
}

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
