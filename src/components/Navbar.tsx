import React, { useState } from 'react';
import { Menu, Bell, Plus, Search, User, ChevronDown, X } from 'lucide-react';
import Avatar from './ui/Avatar';
import Button from './ui/Button';
import { currentUser } from '../data/mockData';

interface NavbarProps {
  onCreateList: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onCreateList }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleProfile = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo and brand */}
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <ShoppingBagIcon className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">ShoppingListApp</span>
            </div>
          </div>

          {/* Search (hidden on mobile) */}
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-center max-w-md">
            <div className="relative w-full">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search lists..."
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
          </div>

          {/* Desktop navigation */}
          <div className="hidden sm:ml-6 sm:flex sm:items-center sm:space-x-4">
            <Button 
              variant="primary"
              icon={<Plus size={16} />}
              onClick={onCreateList}
            >
              New List
            </Button>
            
            <button className="p-2 rounded-full text-gray-500 hover:text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500">
              <Bell size={20} />
            </button>
            
            <div className="relative">
              <button 
                onClick={toggleProfile}
                className="flex items-center space-x-2 p-1 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <Avatar 
                  src={currentUser.avatar} 
                  alt={currentUser.name} 
                  size="sm" 
                />
                <span className="text-sm font-medium text-gray-700">{currentUser.name}</span>
                <ChevronDown size={16} className="text-gray-500" />
              </button>
              
              {/* Profile dropdown */}
              {isProfileOpen && (
                <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="py-1">
                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Your Profile</a>
                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Settings</a>
                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Sign out</a>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center sm:hidden">
            <button 
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="sm:hidden">
          <div className="pt-2 pb-3 space-y-1">
            <div className="px-4 py-2">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search lists..."
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
            </div>
            
            <div className="px-4 py-2">
              <Button 
                variant="primary" 
                className="w-full"
                icon={<Plus size={16} />}
                onClick={() => {
                  onCreateList();
                  toggleMenu();
                }}
              >
                New List
              </Button>
            </div>
            
            <a href="#" className="block px-4 py-2 text-base font-medium text-gray-700 hover:bg-gray-100">
              <div className="flex items-center">
                <User size={20} className="mr-3" />
                Profile
              </div>
            </a>
            
            <a href="#" className="block px-4 py-2 text-base font-medium text-gray-700 hover:bg-gray-100">
              <div className="flex items-center">
                <Bell size={20} className="mr-3" />
                Notifications
              </div>
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

// A simple shopping bag icon component
const ShoppingBagIcon = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
    <line x1="3" y1="6" x2="21" y2="6" />
    <path d="M16 10a4 4 0 0 1-8 0" />
  </svg>
);

export default Navbar;