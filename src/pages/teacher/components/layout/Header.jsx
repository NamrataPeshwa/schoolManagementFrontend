// Header component 
import React from 'react';
import { Menu, Bell, Settings } from 'lucide-react';
import { MOCK_USER } from '../../data/mockData';

const Header = ({ toggleSidebar, currentPage }) => {
  return (
    <header className="sticky top-0 z-20 flex items-center justify-between p-4 bg-white shadow-sm md:p-5">
      <div className="flex items-center gap-4">
        <button className="lg:hidden text-gray-600" onClick={toggleSidebar}>
          <Menu size={24} />
        </button>
        <h1 className="text-xl font-semibold text-gray-800">{currentPage}</h1>
      </div>
      <div className="flex items-center gap-4">
        <button className="text-gray-500 hover:text-gray-800">
          <Bell size={22} />
        </button>
        <button className="text-gray-500 hover:text-gray-800">
          <Settings size={22} />
        </button>
        <div className="flex items-center gap-2">
          <img
            src={MOCK_USER.avatar}
            alt="User Avatar"
            className="w-10 h-10 rounded-full border-2 border-[#2F69FF]"
            onError={(e) => e.target.src = `https://placehold.co/100x100/2F69FF/FFFFFF?text=T`}
          />
          <div className="hidden md:block">
            <span className="block text-sm font-medium text-gray-800">{MOCK_USER.name}</span>
            <span className="block text-xs text-gray-500">View Profile</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
