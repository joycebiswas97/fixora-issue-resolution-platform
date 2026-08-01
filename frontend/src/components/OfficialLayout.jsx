import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  ShieldCheck, Home, FileText, Settings, LogOut, LayoutDashboard,
  Users, BarChart3, Menu, X, BellRing
} from 'lucide-react';

export default function OfficialLayout({ children }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userRole');
    navigate('/');
  };

  const navLinks = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'Overview', path: '/dashboard/official', icon: LayoutDashboard },
    { name: 'Manage Issues', path: '/dashboard/official/issues', icon: FileText },
    { name: 'Citizens', path: '/dashboard/official/citizens', icon: Users },
    { name: 'Analytics', path: '/dashboard/official/analytics', icon: BarChart3 },
    { name: 'Settings', path: '/dashboard/official/settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex font-inter">
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div className="fixed inset-0 z-40 bg-gray-800/50 md:hidden" onClick={() => setIsSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-[#0B1A28] text-white border-r border-[#15273B] transform transition-transform duration-300 ease-in-out md:translate-x-0 md:static md:flex-shrink-0 flex flex-col ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="h-16 flex items-center px-6 border-b border-[#15273B] justify-between shrink-0">
          <Link to="/" className="flex items-center gap-2 text-2xl font-bold text-white hover:opacity-90">
            <ShieldCheck className="text-saffron" size={28} />
            <span>GramSeva</span>
          </Link>
          <button className="md:hidden text-gray-400 hover:text-white" onClick={() => setIsSidebarOpen(false)}>
            <X size={24} />
          </button>
        </div>
        
        <div className="p-4 shrink-0">
          <div className="flex items-center gap-3 p-3 bg-[#15273B] rounded-xl mb-2">
            <div className="w-10 h-10 rounded-full bg-brand-blue flex items-center justify-center font-bold">
              SP
            </div>
            <div>
              <p className="font-semibold text-white text-sm">Suresh Patel</p>
              <p className="text-xs text-gray-400">Panchayat Head</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 px-4 mt-2 space-y-1 overflow-y-auto">
          {navLinks.map((link) => {
            const Icon = link.icon;
            // Exact match for overview, otherwise startsWith
            const isActive = link.path === '/dashboard/official' 
              ? location.pathname === link.path
              : location.pathname.startsWith(link.path) && link.path !== '/';

            return (
              <Link 
                key={link.name}
                to={link.path} 
                onClick={() => setIsSidebarOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium transition-colors ${
                  isActive 
                    ? 'bg-brand-blue text-white shadow-sm' 
                    : 'text-gray-300 hover:bg-[#15273B] hover:text-white'
                }`}
              >
                <Icon size={20} /> {link.name}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-[#15273B] shrink-0">
          <button onClick={handleLogout} className="flex items-center gap-3 px-3 py-2.5 w-full text-red-400 hover:bg-red-400/10 rounded-lg font-medium transition-colors">
            <LogOut size={20} /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        {/* Top Header */}
        <header className="h-16 shrink-0 bg-white border-b border-gray-200 flex items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center">
            <button className="md:hidden text-gray-500 hover:text-gray-900 mr-4" onClick={() => setIsSidebarOpen(true)}>
              <Menu size={24} />
            </button>
            <h1 className="text-xl font-semibold text-gray-900">Official Portal</h1>
          </div>
          <div className="flex items-center gap-4 ml-auto">
            <span className="text-sm font-medium text-gray-500 hidden sm:inline-block">Last sync: Just now</span>
            <button className="relative p-2 text-gray-400 hover:text-gray-500 transition-colors">
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
              <BellRing size={20} />
            </button>
          </div>
        </header>

        <div className="flex-1 overflow-auto bg-gray-50 p-4 sm:p-6 lg:p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
