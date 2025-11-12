// Sidebar component 
import React from 'react';
import {
  LayoutDashboard, Users, ClipboardCheck, BookCopy, FileEdit, FileText, 
  Calendar, UserCircle, Menu, X, Star, Briefcase
} from 'lucide-react';

const Sidebar = ({ currentPage, setCurrentPage, isSidebarOpen, setIsSidebarOpen }) => {
  const navItems = [
    { name: "Home", icon: LayoutDashboard },
    { name: "Subject", icon: Briefcase },
    { name: "Classes", icon: Users },
    { name: "Assignments", icon: ClipboardCheck },
    { name: "Notes", icon: BookCopy },
    { name: "Exams", icon: FileEdit },
    { name: "Report Card", icon: FileText },
    { name: "Time Table", icon: Calendar },
    { name: "Profile", icon: UserCircle },
  ];

  const NavLink = ({ item }) => {
    const { name, icon: Icon } = item;
    const isActive = currentPage === name;
    return (
      <button
        onClick={() => {
          setCurrentPage(name);
          setIsSidebarOpen(false);
        }}
        className={`
          flex items-center w-full px-4 py-3 rounded-lg transition-all duration-200
          ${isActive
            ? "bg-white text-[#2F69FF] shadow-md"
            : "text-white/80 hover:text-white hover:bg-white/10"
          }
        `}
      >
        <Icon size={20} className="mr-3" />
        <span className="font-medium">{name}</span>
      </button>
    );
  };

  return (
    <>
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      <aside
        className={`
          fixed lg:sticky top-0 left-0 z-40 h-screen w-64 bg-[#2F69FF] text-white
          flex flex-col p-4 transition-transform duration-300
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0
        `}
      >
        <div className="flex items-center justify-between p-2 mb-4">
          <div className="flex items-center gap-2">
            
            <span className="text-xl font-bold">LOGO</span>
          </div>
          <button className="lg:hidden text-white" onClick={() => setIsSidebarOpen(false)}>
            <X size={24} />
          </button>
        </div>

        <nav className="flex-1 space-y-2">
          <span className="px-4 text-xs font-light text-white/60 uppercase">Menu</span>
          {navItems.map((item) => (
            <NavLink key={item.name} item={item} />
          ))}
        </nav>

        <div className="mt-auto">
          <div className="flex items-center justify-between p-3 bg-white/10 rounded-lg">
            <span className="font-medium text-white/90">Dark Mode</span>
            <div className="w-12 h-6 p-1 bg-white/30 rounded-full">
              <div className="w-4 h-4 bg-white rounded-full shadow-md"></div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
