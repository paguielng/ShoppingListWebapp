import React from 'react';
import { 
  LayoutDashboard, 
  ListChecks, 
  Clock, 
  Archive,
  BarChart3, 
  Settings,
  HelpCircle,
  ExternalLink
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

interface SidebarItem {
  id: string;
  label: string;
  icon: React.ReactNode;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, onTabChange }) => {
  const sidebarItems: SidebarItem[] = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
    { id: 'active-lists', label: 'Active Lists', icon: <ListChecks size={20} /> },
    { id: 'history', label: 'History', icon: <Clock size={20} /> },
    { id: 'archived', label: 'Archived', icon: <Archive size={20} /> },
    { id: 'statistics', label: 'Statistics', icon: <BarChart3 size={20} /> },
  ];

  const bottomItems: SidebarItem[] = [
    { id: 'settings', label: 'Settings', icon: <Settings size={20} /> },
    { id: 'help', label: 'Help & Support', icon: <HelpCircle size={20} /> },
  ];

  return (
    <div className="h-full flex flex-col bg-white border-r border-gray-200">
      <div className="p-4">
        <div className="flex items-center justify-center w-full">
          <div className="inline-flex items-center">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              className="h-6 w-6 text-blue-600"
            >
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 0 1-8 0" />
            </svg>
            <span className="ml-2 text-lg font-semibold text-gray-900 hidden md:inline">ShoppingList</span>
          </div>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto">
        <nav className="px-2 py-4 space-y-1">
          {sidebarItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                activeTab === item.id
                  ? 'bg-blue-50 text-blue-700'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <span className={`mr-3 ${activeTab === item.id ? 'text-blue-600' : 'text-gray-500'}`}>
                {item.icon}
              </span>
              <span className="hidden md:inline">{item.label}</span>
              {activeTab === item.id && (
                <span className="ml-auto md:hidden">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-600"></div>
                </span>
              )}
            </button>
          ))}
        </nav>
      </div>
      
      <div className="p-4 border-t border-gray-200">
        <div className="space-y-1">
          {bottomItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                activeTab === item.id
                  ? 'bg-blue-50 text-blue-700'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <span className={`mr-3 ${activeTab === item.id ? 'text-blue-600' : 'text-gray-500'}`}>
                {item.icon}
              </span>
              <span className="hidden md:inline">{item.label}</span>
            </button>
          ))}
          
          <a
            href="https://shoppinlistapp.netlify.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center px-3 py-2 text-sm font-medium text-gray-700 rounded-md hover:bg-gray-100 transition-colors"
          >
            <span className="mr-3 text-gray-500">
              <ExternalLink size={20} />
            </span>
            <span className="hidden md:inline">Mobile App</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;