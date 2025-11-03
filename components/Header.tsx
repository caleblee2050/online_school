
import React from 'react';
import { MenuIcon, BellIcon as NotificationIcon, SearchIcon, XIcon } from './icons';
import { Page } from '../types';

interface HeaderProps {
  toggleSidebar: () => void;
  isSidebarOpen: boolean;
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar, isSidebarOpen }) => {
  return (
    <header className="flex items-center justify-between h-16 px-6 bg-white border-b">
      <div className="flex items-center">
        <button onClick={toggleSidebar} className="text-gray-500 focus:outline-none focus:text-gray-700">
           {isSidebarOpen ? <XIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
        </button>
        <div className="relative ml-6 hidden md:block">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <SearchIcon className="h-5 w-5 text-gray-400"/>
            </span>
            <input 
                type="text" 
                className="w-full pl-10 pr-4 py-2 border rounded-md text-sm text-gray-700 placeholder-gray-400 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="자료 검색..." 
            />
        </div>
      </div>
      <div className="flex items-center">
        <button className="relative p-2 text-gray-500 hover:text-gray-700 focus:outline-none">
          <NotificationIcon className="h-6 w-6" />
          <span className="absolute top-0 right-0 h-2 w-2 mt-1 mr-1 bg-red-500 rounded-full"></span>
        </button>
      </div>
    </header>
  );
};

export default Header;
