import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import API from '../services/api';
import { 
  ShieldCheck, Home, FileText, Settings, LogOut,
  MapPin, Clock, AlertTriangle, Users, BarChart3, ChevronDown, Check, Menu, X, BellRing
} from 'lucide-react';

export default function OfficialDashboard() {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // 1. Add these new states and user data
  const [complaints, setComplaints] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  // 2. Fetch data when the page loads
  useEffect(() => {
    fetchComplaints();
  }, []);

  const fetchComplaints = async () => {
    try {
      const response = await API.get('/complaints');
      setComplaints(response.data.reverse()); // Put newest complaints on top
    } catch (err) {
      console.error('Error fetching complaints:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // 3. Handle updating the status
  const handleStatusUpdate = async (id, newStatus) => {
    try {
      await API.put(`/complaints/${id}/status`, { status: newStatus });
      // Instantly update the UI without reloading
      setComplaints(complaints.map(c => c._id === id ? { ...c, status: newStatus } : c));
    } catch (err) {
      alert('Failed to update status');
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Resolved': return <span className="inline-flex items-center gap-1.5 py-1 px-2.5 rounded-full text-xs font-medium bg-green-100 text-green-800"><span className="w-1.5 h-1.5 rounded-full bg-green-500"></span> Resolved</span>;
      case 'In Progress': return <span className="inline-flex items-center gap-1.5 py-1 px-2.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"><span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span> In Progress</span>;
      case 'Pending': return <span className="inline-flex items-center gap-1.5 py-1 px-2.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800"><span className="w-1.5 h-1.5 rounded-full bg-yellow-500"></span> Pending</span>;
      default: return null;
    }
  };

  const handleLogout = () => {
    navigate('/');
  };

  // Calculate Average Resolution Time
  const avgResolutionTime = React.useMemo(() => {
    // Only look at resolved complaints that have an updatedAt timestamp
    const resolved = complaints.filter(c => c.status === 'Resolved' && c.updatedAt);
    if (resolved.length === 0) return '0 Days';

    const totalMs = resolved.reduce((acc, curr) => {
      return acc + (new Date(curr.updatedAt) - new Date(curr.createdAt));
    }, 0);

    const days = (totalMs / (1000 * 60 * 60 * 24)).toFixed(1);
    return days > 0 ? `${days} Days` : '< 1 Day';
  }, [complaints]);

  // Calculate 7-Day Trend (This week vs Last week)
  const calculateTrend = (status = null) => {
    const now = new Date();
    const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const twoWeeksAgo = new Date(now.getTime() - 14 * 24 * 60 * 60 * 1000);

    const data = status ? complaints.filter(c => c.status === status) : complaints;

    const thisWeek = data.filter(c => new Date(c.createdAt) >= oneWeekAgo).length;
    const lastWeek = data.filter(c => new Date(c.createdAt) >= twoWeeksAgo && new Date(c.createdAt) < oneWeekAgo).length;

    if (lastWeek === 0) return thisWeek > 0 ? 100 : 0;
    return Math.round(((thisWeek - lastWeek) / lastWeek) * 100);
  };

  const totalTrend = calculateTrend();
  const actionTrend = calculateTrend('Pending');

  return (
    <div className="min-h-screen bg-gray-50 flex font-inter">
      
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div className="fixed inset-0 z-40 bg-gray-800/50 md:hidden" onClick={() => setIsSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-[#0B1A28] text-white border-r border-[#15273B] transform transition-transform duration-300 ease-in-out md:translate-x-0 md:static md:flex-shrink-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="h-full flex flex-col">
          <div className="h-16 flex items-center px-6 border-b border-[#15273B] justify-between">
            <Link to="/" className="flex items-center gap-2 text-2xl font-bold text-white hover:opacity-90">
              <ShieldCheck className="text-saffron" size={28} />
              <span>GramSeva</span>
            </Link>
            <button className="md:hidden text-gray-400 hover:text-white" onClick={() => setIsSidebarOpen(false)}>
              <X size={24} />
            </button>
          </div>
          
          <div className="p-4">
            <div className="flex items-center gap-3 p-3 bg-[#15273B] rounded-xl mb-6">
              <div className="w-10 h-10 rounded-full bg-brand-blue flex items-center justify-center font-bold">
                {user.name?.charAt(0).toUpperCase() || 'O'}
              </div>
              <div>
                <p className="font-semibold text-white text-sm">{user.name || 'Official'}</p>
                <p className="text-xs text-gray-400">Official</p>
              </div>
            </div>
          </div>

          <nav className="flex-1 px-4 space-y-1">
            <a href="#" className="flex items-center gap-3 px-3 py-2.5 bg-brand-blue text-white rounded-lg font-medium transition-colors shadow-sm">
              <Home size={20} /> Overview
            </a>
            <a href="#" className="flex items-center gap-3 px-3 py-2.5 text-gray-300 hover:bg-[#15273B] hover:text-white rounded-lg font-medium transition-colors">
              <FileText size={20} /> Manage Issues
            </a>
            <a href="#" className="flex items-center gap-3 px-3 py-2.5 text-gray-300 hover:bg-[#15273B] hover:text-white rounded-lg font-medium transition-colors">
              <Users size={20} /> Citizens
            </a>
            <a href="#" className="flex items-center gap-3 px-3 py-2.5 text-gray-300 hover:bg-[#15273B] hover:text-white rounded-lg font-medium transition-colors">
              <BarChart3 size={20} /> Analytics
            </a>
            <a href="#" className="flex items-center gap-3 px-3 py-2.5 text-gray-300 hover:bg-[#15273B] hover:text-white rounded-lg font-medium transition-colors">
              <Settings size={20} /> Settings
            </a>
          </nav>

          <div className="p-4 border-t border-[#15273B]">
            <button onClick={handleLogout} className="flex items-center gap-3 px-3 py-2.5 w-full text-red-400 hover:bg-red-400/10 rounded-lg font-medium transition-colors">
              <LogOut size={20} /> Logout
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Header */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center">
            <button className="md:hidden text-gray-500 hover:text-gray-900 mr-4" onClick={() => setIsSidebarOpen(true)}>
              <Menu size={24} />
            </button>
            <h1 className="text-xl font-semibold text-gray-900">Official Portal</h1>
          </div>
          <div className="flex items-center gap-4 ml-auto">
            <span className="text-sm font-medium text-gray-500 hidden sm:inline-block">Last sync: 2 mins ago</span>
            <button className="relative p-2 text-gray-400 hover:text-gray-500 transition-colors">
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
              <BellRing size={20} />
            </button>
          </div>
        </header>

        <div className="flex-1 overflow-auto p-4 sm:p-6 lg:p-8">
          
          {/* Welcome Section */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900">Dashboard Overview</h2>
            <p className="text-gray-600 mt-1">Monitor and manage civic issues across the Panchayat.</p>
          </div>

          {/* Metrics Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col justify-between">
              <div className="flex justify-between items-start mb-4">
                <div className="p-2 bg-gray-50 rounded-lg">
                  <FileText className="text-gray-600" size={24} />
                </div>
                <span className={`flex items-center text-sm font-medium ${totalTrend >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {totalTrend > 0 ? '+' : ''}{totalTrend}% 
                  <ArrowUpIcon className={`w-4 h-4 ml-0.5 ${totalTrend < 0 ? 'rotate-180' : ''}`} />
                </span>
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{complaints.length}</p>
                <p className="text-sm font-medium text-gray-500">Total Received</p>
              </div>
            </div>
            
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col justify-between">
              <div className="flex justify-between items-start mb-4">
                <div className="p-2 bg-red-50 rounded-lg">
                  <AlertTriangle className="text-red-600" size={24} />
                </div>
                <span className={`flex items-center text-sm font-medium ${actionTrend >= 0 ? 'text-red-600' : 'text-green-600'}`}>
                  {actionTrend > 0 ? '+' : ''}{actionTrend}% 
                  <ArrowUpIcon className={`w-4 h-4 ml-0.5 ${actionTrend < 0 ? 'rotate-180' : ''}`} />
                </span>
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{complaints.filter(c => c.status === 'Pending').length}</p>
                <p className="text-sm font-medium text-gray-500">Action Required</p>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col justify-between">
              <div className="flex justify-between items-start mb-4">
                <div className="p-2 bg-blue-50 rounded-lg">
                  <Clock className="text-blue-600" size={24} />
                </div>
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{avgResolutionTime}</p>
                <p className="text-sm font-medium text-gray-500">Avg. Resolution Time</p>
              </div>
            </div>
            
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col justify-between">
              <div className="flex justify-between items-start mb-4">
                <div className="p-2 bg-green-50 rounded-lg">
                  <Check className="text-green-600" size={24} />
                </div>
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{complaints.filter(c => c.status === 'Resolved').length}</p>
                <p className="text-sm font-medium text-gray-500">Total Resolved</p>
              </div>
            </div>
          </div>

          {/* Action Table */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="px-6 py-5 border-b border-gray-100 flex flex-col sm:flex-row sm:justify-between sm:items-center bg-gray-50/50 gap-4">
              <h3 className="text-lg font-semibold text-gray-900">Recent Incoming Issues</h3>
              <div className="flex gap-2">
                <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2">
                  Filter <ChevronDown size={16} />
                </button>
                <button className="px-4 py-2 text-sm font-medium text-white bg-brand-blue rounded-lg hover:bg-brand-blue-dark shadow-sm">
                  Export
                </button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID / Date</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Issue Details</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {isLoading ? (
                    <tr><td colSpan="5" className="text-center py-10 text-gray-500">Loading complaints...</td></tr>
                  ) : complaints.map((complaint) => (
                    <tr key={complaint._id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">...{complaint._id.slice(-6).toUpperCase()}</div>
                        <div className="text-sm text-gray-500">{new Date(complaint.createdAt).toLocaleDateString()}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm font-medium text-gray-900">{complaint.title}</div>
                        <div className="text-sm text-gray-500 flex items-center gap-1 mt-0.5">
                          <MapPin size={12} /> {complaint.address || 'Location not provided'}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                          {complaint.category}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {getStatusBadge(complaint.status)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        {/* Replaced static button with a functional Select dropdown */}
                        <select
                          value={complaint.status}
                          onChange={(e) => handleStatusUpdate(complaint._id, e.target.value)}
                          className="text-sm border border-gray-300 rounded-lg px-2 py-1 outline-none cursor-pointer focus:ring-2 focus:ring-brand-blue"
                        >
                          <option value="Pending">Pending</option>
                          <option value="In Progress">In Progress</option>
                          <option value="Resolved">Resolved</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          
        </div>
      </main>
    </div>
  );
}

// Simple arrow icon component to keep dependencies low
function ArrowUpIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M12 19V5M5 12l7-7 7 7" />
    </svg>
  );
}
