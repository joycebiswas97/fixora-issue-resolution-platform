import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  ShieldCheck, Home, FileText, PlusCircle, Settings, LogOut, Menu, X
} from 'lucide-react';

export default function CitizenLayout({ children, title }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userRole');
    navigate('/');
  };

  const navLinks = [
    { name: 'Dashboard', path: '/dashboard/citizen', icon: Home },
    { name: 'My Complaints', path: '/dashboard/citizen/complaints', icon: FileText },
    { name: 'File New Issue', path: '/complaint/new', icon: PlusCircle },
    { name: 'Settings', path: '/dashboard/citizen/settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex font-inter transition-colors">
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div className="fixed inset-0 z-40 bg-gray-800/50 md:hidden" onClick={() => setIsSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transform transition-transform duration-300 ease-in-out md:translate-x-0 md:static md:flex-shrink-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="h-full flex flex-col">
          <div className="h-16 flex items-center px-6 border-b border-gray-200 dark:border-gray-700 justify-between">
            <Link to="/" className="flex items-center gap-2 text-2xl font-bold text-brand-green dark:text-green-400">
              <ShieldCheck className="text-saffron" size={28} />
              <span>GramSeva</span>
            </Link>
            <button className="md:hidden text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white" onClick={() => setIsSidebarOpen(false)}>
              <X size={24} />
            </button>
          </div>

          <div className="p-4">
            <div className="flex items-center gap-3 p-3 bg-saffron/10 dark:bg-saffron/20 rounded-xl mb-6">
              <div className="w-10 h-10 rounded-full bg-saffron text-white flex items-center justify-center font-bold">
                {user.name?.charAt(0).toUpperCase() || 'O'}
              </div>
              <div>
                <p className="font-semibold text-gray-900 dark:text-white text-sm">{user.name || "Citizen"}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Citizen</p>
              </div>
            </div>
          </div>

          <nav className="flex-1 px-4 space-y-1">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium transition-colors ${
                    isActive 
                      ? 'bg-saffron text-white shadow-sm' 
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  <link.icon size={20} /> {link.name}
                </Link>
              );
            })}
          </nav>

          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            <button onClick={handleLogout} className="flex items-center gap-3 px-3 py-2.5 w-full text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg font-medium transition-colors">
              <LogOut size={20} /> Logout
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Header */}
        <header className="h-16 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between px-4 sm:px-6 lg:px-8">
          <button className="md:hidden text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white" onClick={() => setIsSidebarOpen(true)}>
            <Menu size={24} />
          </button>
          <h1 className="text-xl font-semibold text-gray-900 dark:text-white hidden md:block">{title || 'Citizen Dashboard'}</h1>
          
          <div className="flex items-center gap-4 ml-auto">
            <Link to="/complaint/new" className="inline-flex items-center justify-center font-medium px-4 py-2 bg-saffron text-white rounded-lg hover:bg-saffron-dark transition-colors text-sm shadow-sm gap-2">
              <PlusCircle size={18} />
              <span className="hidden sm:inline">New Complaint</span>
            </Link>
          </div>
        </header>

        {/* Dynamic Page Content */}
        <div className="flex-1 overflow-auto p-4 sm:p-6 lg:p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
