import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Home, 
  CreditCard, 
  Search, 
  FileText, 
  Users, 
  BarChart, 
  Settings, 
  HelpCircle, 
  School 
} from 'lucide-react';

interface SidebarProps {
  isAdmin: boolean;
}

const Sidebar = ({ isAdmin }: SidebarProps) => {
  const [expanded, setExpanded] = useState(true);

  const studentLinks = [
    { name: 'Dashboard', to: '/dashboard', icon: <Home size={20} /> },
    { name: 'Request ID Card', to: '/request-id', icon: <CreditCard size={20} /> },
    { name: 'Track Request', to: '/track-request', icon: <Search size={20} /> },
  ];

  const adminLinks = [
    { name: 'Dashboard', to: '/admin', icon: <Home size={20} /> },
    { name: 'ID Requests', to: '/admin/requests', icon: <FileText size={20} /> },
    // { name: 'Students', to: '/admin/students', icon: <Users size={20} /> },
    { name: 'Reports', to: '/admin/reports', icon: <BarChart size={20} /> },
    // { name: 'Settings', to: '/admin/settings', icon: <Settings size={20} /> },
  ];

  const links = isAdmin ? adminLinks : studentLinks;

  return (
    <aside 
      className={`bg-white border-r border-gray-200 transition-all duration-300 ease-in-out fixed md:static inset-y-0 left-0 z-20 md:z-0 ${
        expanded ? 'w-64' : 'w-20'
      } shadow-md md:shadow-none`}
    >
      <div className="flex flex-col h-full">
        <div className={`flex items-center p-4 h-16 border-b border-gray-200 ${expanded ? 'justify-between' : 'justify-center'}`}>
          <div className="flex items-center">
            <School className="text-primary-800" size={24} />
            {expanded && <span className="ml-2 font-heading font-bold text-lg">Campus ID</span>}
          </div>
          <button 
            onClick={() => setExpanded(!expanded)}
            className="hidden md:block text-gray-500 hover:text-gray-700"
          >
            {expanded ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6"></polyline>
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            )}
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto py-4 px-3">
          <ul className="space-y-1">
            {links.map((link, index) => (
              <li key={index}>
                <NavLink 
                  to={link.to}
                  className={({isActive}) => `
                    flex items-center px-3 py-3 text-gray-700 rounded-md hover:bg-gray-100 transition-colors
                    ${isActive ? 'bg-primary-50 text-primary-800 font-medium' : ''}
                    ${expanded ? 'px-4' : 'justify-center px-2'}
                  `}
                >
                  <span className="text-gray-500">{link.icon}</span>
                  {expanded && <span className="ml-3 text-sm">{link.name}</span>}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* <div className="p-4 border-t border-gray-200">
          <NavLink 
            to="/help"
            className="flex items-center px-3 py-3 text-gray-700 rounded-md hover:bg-gray-100 transition-colors"
          >
            <HelpCircle size={20} className="text-gray-500" />
            {expanded && <span className="ml-3 text-sm">Help & Support</span>}
          </NavLink>
        </div> */}
      </div>
    </aside>
  );
};

export default Sidebar;