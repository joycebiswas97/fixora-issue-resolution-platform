import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ShieldCheck, Home, FileText, PlusCircle, Settings, LogOut, Menu, X, Users
} from 'lucide-react';
import CitizenOverview from './CitizenOverview';
import CitizenMyComplaints from './CitizenMyComplaints';

const TABS = [
  { key: 'overview', label: 'Overview', icon: Home },
  { key: 'my-complaints', label: 'My Complaints', icon: FileText },
];

export default function CitizenDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
  };

  const handleTabChange = (key) => {
    setActiveTab(key);
    setIsSidebarOpen(false);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'overview': return <CitizenOverview />;
      case 'my-complaints': return <CitizenMyComplaints />;
      default: return <CitizenOverview />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex font-inter">
      {/* Mobile overlay */}
      {isSidebarOpen && (
        <div className="fixed inset-0 z-40 bg-gray-800/50 md:hidden" onClick={() => setIsSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 flex flex-col transform transition-transform duration-300 ease-in-out md:translate-x-0 md:static md:flex-shrink-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        {/* Logo */}
        <div className="h-16 flex items-center px-6 border-b border-gray-200 justify-between shrink-0">
          <Link to="/" className="flex items-center gap-2 text-xl font-bold text-gray-900 hover:opacity-80 transition-opacity">
            <ShieldCheck className="text-saffron" size={26} />
            <span>GramSeva</span>
          </Link>
          <button className="md:hidden text-gray-500 hover:text-gray-900" onClick={() => setIsSidebarOpen(false)}>
            <X size={22} />
          </button>
        </div>

        {/* User profile */}
        <div className="p-4 shrink-0">
          <div className="flex items-center gap-3 p-3 bg-saffron/10 rounded-xl">
            <div className="w-10 h-10 rounded-full bg-saffron text-white flex items-center justify-center font-bold shrink-0">
              {user.name?.charAt(0).toUpperCase() || 'C'}
            </div>
            <div className="min-w-0">
              <p className="font-semibold text-gray-900 text-sm truncate">{user.name || 'Citizen'}</p>
              <p className="text-xs text-gray-500">Citizen</p>
            </div>
          </div>
        </div>

        {/* Nav — Tab switchers */}
        <nav className="flex-1 px-4 space-y-1 overflow-y-auto">
          {TABS.map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => handleTabChange(key)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium transition-all text-sm ${activeTab === key
                  ? 'bg-saffron text-white shadow-sm'
                  : 'text-gray-700 hover:bg-gray-100'
                }`}
            >
              <Icon size={20} /> {label}
            </button>
          ))}

          {/* Divider + action links */}
          <div className="pt-4 pb-2">
            <p className="px-3 text-[10px] font-semibold text-gray-400 uppercase tracking-widest mb-2">Actions</p>
            <Link
              to="/complaint/new"
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium text-sm text-gray-700 hover:bg-gray-100 transition-colors"
            >
              <PlusCircle size={20} /> File New Issue
            </Link>
            <Link
              to="/dashboard/citizen/settings"
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium text-sm text-gray-700 hover:bg-gray-100 transition-colors"
            >
              <Settings size={20} /> Settings
            </Link>
          </div>
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-gray-200 shrink-0">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-3 py-2.5 w-full text-red-500 hover:bg-red-50 rounded-lg font-medium transition-colors text-sm"
          >
            <LogOut size={20} /> Logout
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        {/* Top header */}
        <header className="h-16 shrink-0 bg-white border-b border-gray-200 flex items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <button className="md:hidden text-gray-500 hover:text-gray-900" onClick={() => setIsSidebarOpen(true)}>
              <Menu size={24} />
            </button>
            <h1 className="text-xl font-semibold text-gray-900">
              {TABS.find(t => t.key === activeTab)?.label || 'Citizen Dashboard'}
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-500 hidden sm:inline">
              {new Date().toLocaleDateString('en-IN', { weekday: 'short', day: '2-digit', month: 'short' })}
            </span>
            <Link
              to="/complaint/new"
              className="inline-flex items-center gap-2 px-4 py-2 bg-saffron text-white text-sm font-semibold rounded-xl hover:bg-saffron/90 transition-colors shadow-sm"
            >
              <PlusCircle size={16} />
              <span className="hidden sm:inline">File Issue</span>
            </Link>
          </div>
        </header>

        {/* Scrollable content */}
        <div className="flex-1 overflow-auto bg-gray-50 p-4 sm:p-6 lg:p-8">
          {renderContent()}
        </div>
      </main>
    </div>
  );
}
