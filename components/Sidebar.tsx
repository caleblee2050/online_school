
import React from 'react';
import { Page } from '../types';
import { HomeIcon, SparklesIcon, ArchiveIcon, BellIcon, CalendarIcon, AcademicCapIcon } from './icons';

interface SidebarProps {
  currentPage: Page;
  setCurrentPage: (page: Page) => void;
  isOpen: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ currentPage, setCurrentPage, isOpen }) => {
  const navItems = [
    { id: 'dashboard', label: '대시보드', icon: <HomeIcon /> },
    { id: 'ai-assistant', label: 'AI 비서', icon: <SparklesIcon /> },
    { id: 'resources', label: '자료실', icon: <ArchiveIcon /> },
    { id: 'announcements', label: '공지사항', icon: <BellIcon /> },
    { id: 'calendar', label: '학사일정', icon: <CalendarIcon /> },
  ] as const;

  return (
    <aside className={`bg-white text-gray-700 transition-all duration-300 ease-in-out ${isOpen ? 'w-64' : 'w-20'} h-full flex flex-col shadow-lg`}>
      <div className={`flex items-center p-4 h-16 border-b ${isOpen ? 'justify-start' : 'justify-center'}`}>
        <AcademicCapIcon className="h-8 w-8 text-indigo-600" />
        {isOpen && <h1 className="text-xl font-bold ml-2 text-indigo-600">스마트 교무실</h1>}
      </div>
      <nav className="flex-1 px-2 py-4 space-y-2">
        {navItems.map((item) => (
          <a
            key={item.id}
            href="#"
            onClick={(e) => {
              e.preventDefault();
              setCurrentPage(item.id);
            }}
            className={`flex items-center p-3 rounded-lg transition-colors duration-200 ${
              currentPage === item.id
                ? 'bg-indigo-100 text-indigo-700 font-semibold'
                : 'hover:bg-gray-200'
            } ${!isOpen && 'justify-center'}`}
          >
            <div className="h-6 w-6">{item.icon}</div>
            {isOpen && <span className="ml-4">{item.label}</span>}
          </a>
        ))}
      </nav>
      <div className={`p-4 border-t ${!isOpen && 'hidden'}`}>
        <div className="flex items-center">
            <img className="h-10 w-10 rounded-full object-cover" src="https://picsum.photos/100" alt="User" />
            <div className="ml-3">
                <p className="text-sm font-semibold">김민준 선생님</p>
                <p className="text-xs text-gray-500">정교사</p>
            </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
