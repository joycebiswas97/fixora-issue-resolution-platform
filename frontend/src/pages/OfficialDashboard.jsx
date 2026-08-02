import React, { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import API from '../services/api';
import {
  ShieldCheck, Home, FileText, Settings, LogOut,
  MapPin, Clock, AlertTriangle, Users, BarChart3, ChevronDown, Check, Menu, X, BellRing,
  ZoomIn, Copy, Check as CheckIcon, ImageOff
} from 'lucide-react';

// ── Shared lightbox ──────────────────────────────────────────────────────────
function Lightbox({ complaint, onClose }) {
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);
  if (!complaint) return null;
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div
        className="relative bg-white rounded-2xl shadow-2xl max-w-3xl w-full overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-10 p-1.5 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors"
        >
          <X size={18} />
        </button>
        <div className="bg-gray-900 flex items-center justify-center max-h-[70vh] overflow-hidden">
          <img src={complaint.imageUrl} alt={complaint.title} className="w-full object-contain max-h-[70vh]" />
        </div>
        <div className="p-5">
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div>
              <h3 className="text-base font-bold text-gray-900">{complaint.title}</h3>
              <p className="text-sm text-gray-500 mt-0.5 flex items-center gap-1"><MapPin size={12} /> {complaint.address || 'Location not provided'}</p>
            </div>
            <span className="text-xs font-mono bg-gray-100 text-gray-700 px-2.5 py-1 rounded-lg shrink-0">{complaint._id}</span>
          </div>
          {complaint.description && (
            <p className="text-sm text-gray-600 mt-3 leading-relaxed border-t border-gray-100 pt-3">{complaint.description}</p>
          )}
          <div className="flex items-center gap-3 mt-3 text-xs text-gray-400">
            <span>Category: <strong className="text-gray-600">{complaint.category}</strong></span>
            <span>•</span>
            <span>Filed: <strong className="text-gray-600">{new Date(complaint.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}</strong></span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Copy-on-click ID ─────────────────────────────────────────────────────────
function CopyableID({ id }) {
  const [copied, setCopied] = useState(false);
  const copy = (e) => {
    e.stopPropagation();
    navigator.clipboard.writeText(id).then(() => { setCopied(true); setTimeout(() => setCopied(false), 2000); });
  };
  return (
    <button onClick={copy} title="Click to copy full ID" className="group flex items-center gap-1.5 text-left">
      <span className="text-xs font-mono text-gray-600 group-hover:text-blue-600 transition-colors">{id.slice(-10).toUpperCase()}</span>
      {copied
        ? <CheckIcon size={12} className="text-green-500 shrink-0" />
        : <Copy size={12} className="text-gray-300 group-hover:text-blue-400 shrink-0 transition-colors" />}
    </button>
  );
}

const isPlaceholder = (url) => !url || url.includes('placeholder.com') || url === '';

// Tab sub-components (imported inline via lazy pattern for simplicity)
import OfficialManageIssues from './OfficialManageIssues';
import OfficialCitizens from './OfficialCitizens';
import OfficialAnalytics from './OfficialAnalytics';
import OfficialSettings from './OfficialSettings';

const TABS = [
  { key: 'overview', label: 'Overview', icon: Home },
  { key: 'issues', label: 'Manage Issues', icon: FileText },
  { key: 'citizens', label: 'Citizens', icon: Users },
  { key: 'analytics', label: 'Analytics', icon: BarChart3 },
  { key: 'settings', label: 'Settings', icon: Settings },
];

export default function OfficialDashboard() {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [lightboxComplaint, setLightboxComplaint] = useState(null);
  const closeLightbox = useCallback(() => setLightboxComplaint(null), []);

  // Overview data
  const [complaints, setComplaints] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  useEffect(() => {
    fetchComplaints();
  }, []);

  const fetchComplaints = async () => {
    try {
      const response = await API.get('/complaints');
      setComplaints(response.data.reverse());
    } catch (err) {
      console.error('Error fetching complaints:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleStatusUpdate = async (id, newStatus) => {
    try {
      await API.put(`/complaints/${id}/status`, { status: newStatus });
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
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
  };

  const avgResolutionTime = React.useMemo(() => {
    const resolved = complaints.filter(c => c.status === 'Resolved' && c.updatedAt);
    if (resolved.length === 0) return '0 Days';
    const totalMs = resolved.reduce((acc, curr) => acc + (new Date(curr.updatedAt) - new Date(curr.createdAt)), 0);
    const days = (totalMs / (1000 * 60 * 60 * 24)).toFixed(1);
    return Number(days) > 0 ? `${days} Days` : '< 1 Day';
  }, [complaints]);

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

  const handleTabChange = (key) => {
    setActiveTab(key);
    setIsSidebarOpen(false); // close mobile sidebar on tab switch
  };

  // ── Overview Tab content ─────────────────────────────────────────
  const OverviewContent = () => (
    <>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Dashboard Overview</h2>
        <p className="text-gray-600 mt-1">Monitor and manage civic issues across the Panchayat.</p>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[
          { icon: <FileText className="text-gray-600" size={24} />, bg: 'bg-gray-50', label: 'Total Received', value: complaints.length, trend: totalTrend },
          { icon: <AlertTriangle className="text-red-600" size={24} />, bg: 'bg-red-50', label: 'Action Required', value: complaints.filter(c => c.status === 'Pending').length, trend: actionTrend, trendInvert: true },
          { icon: <Clock className="text-blue-600" size={24} />, bg: 'bg-blue-50', label: 'Avg. Resolution Time', value: avgResolutionTime },
          { icon: <Check className="text-green-600" size={24} />, bg: 'bg-green-50', label: 'Total Resolved', value: complaints.filter(c => c.status === 'Resolved').length },
        ].map((card, i) => (
          <div key={i} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col justify-between">
            <div className="flex justify-between items-start mb-4">
              <div className={`p-2 ${card.bg} rounded-lg`}>{card.icon}</div>
              {card.trend !== undefined && (
                <span className={`flex items-center text-sm font-medium ${card.trendInvert ? (card.trend >= 0 ? 'text-red-600' : 'text-green-600') : (card.trend >= 0 ? 'text-green-600' : 'text-red-600')}`}>
                  {card.trend > 0 ? '+' : ''}{card.trend}%
                  <ArrowUpIcon className={`w-4 h-4 ml-0.5 ${card.trend < 0 ? 'rotate-180' : ''}`} />
                </span>
              )}
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{card.value}</p>
              <p className="text-sm font-medium text-gray-500">{card.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Issues Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-100 flex flex-col sm:flex-row sm:justify-between sm:items-center bg-gray-50/50 gap-4">
          <h3 className="text-lg font-semibold text-gray-900">Recent Incoming Issues</h3>
          <div className="flex gap-2">
            <button
              onClick={() => handleTabChange('issues')}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2"
            >
              View All <ChevronDown size={16} className="-rotate-90" />
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Photo</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">ID / Date</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Issue Details</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Category</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {isLoading ? (
                <tr><td colSpan="6" className="text-center py-10 text-gray-500">Loading complaints...</td></tr>
              ) : complaints.slice(0, 5).map((complaint) => (
                <tr key={complaint._id} className="hover:bg-gray-50 transition-colors">

                  {/* Photo Thumbnail */}
                  <td className="px-4 py-3">
                    {isPlaceholder(complaint.imageUrl) ? (
                      <div className="w-16 h-16 rounded-xl bg-gray-100 flex flex-col items-center justify-center text-gray-300 gap-1 shrink-0">
                        <ImageOff size={18} />
                        <span className="text-[10px] font-medium">No photo</span>
                      </div>
                    ) : (
                      <button
                        onClick={() => setLightboxComplaint(complaint)}
                        className="relative w-16 h-16 rounded-xl overflow-hidden border border-gray-200 group shrink-0 block"
                        title="Click to enlarge"
                      >
                        <img
                          src={complaint.imageUrl}
                          alt={complaint.title}
                          className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all flex items-center justify-center">
                          <ZoomIn size={18} className="text-white opacity-0 group-hover:opacity-100 transition-opacity drop-shadow" />
                        </div>
                      </button>
                    )}
                  </td>

                  {/* ID / Date */}
                  <td className="px-4 py-3 whitespace-nowrap">
                    <CopyableID id={complaint._id} />
                    <div className="text-xs text-gray-400 mt-0.5">{new Date(complaint.createdAt).toLocaleDateString()}</div>
                  </td>

                  {/* Issue Details */}
                  <td className="px-4 py-3 max-w-xs">
                    <div className="text-sm font-medium text-gray-900 truncate">{complaint.title}</div>
                    <div className="text-sm text-gray-500 flex items-center gap-1 mt-0.5">
                      <MapPin size={12} /> <span className="truncate">{complaint.address || 'Location not provided'}</span>
                    </div>
                  </td>

                  {/* Category */}
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                      {complaint.category}
                    </span>
                  </td>

                  {/* Status */}
                  <td className="px-4 py-3 whitespace-nowrap">
                    {getStatusBadge(complaint.status)}
                  </td>

                  {/* Action */}
                  <td className="px-4 py-3 whitespace-nowrap text-right text-sm font-medium">
                    <select
                      value={complaint.status}
                      onChange={(e) => handleStatusUpdate(complaint._id, e.target.value)}
                      className="text-sm border border-gray-300 rounded-lg px-2 py-1 outline-none cursor-pointer focus:ring-2 focus:ring-blue-500"
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
    </>
  );

  // ── Tab content renderer ─────────────────────────────────────────
  const renderContent = () => {
    switch (activeTab) {
      case 'overview': return <OverviewContent />;
      case 'issues': return <OfficialManageIssues />;
      case 'citizens': return <OfficialCitizens />;
      case 'analytics': return <OfficialAnalytics />;
      case 'settings': return <OfficialSettings />;
      default: return <OverviewContent />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex font-inter">
      {/* Lightbox */}
      {lightboxComplaint && <Lightbox complaint={lightboxComplaint} onClose={closeLightbox} />}

      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div className="fixed inset-0 z-40 bg-gray-800/50 md:hidden" onClick={() => setIsSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-[#0B1A28] text-white border-r border-[#15273B] transform transition-transform duration-300 ease-in-out md:translate-x-0 md:static md:flex-shrink-0 flex flex-col ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        {/* Logo */}
        <div className="h-16 flex items-center px-6 border-b border-[#15273B] justify-between shrink-0">
          <Link to="/" className="flex items-center gap-2 text-2xl font-bold text-white hover:opacity-90">
            <ShieldCheck className="text-saffron" size={28} />
            <span>GramSeva</span>
          </Link>
          <button className="md:hidden text-gray-400 hover:text-white" onClick={() => setIsSidebarOpen(false)}>
            <X size={24} />
          </button>
        </div>

        {/* User Profile */}
        <div className="p-4 shrink-0">
          <div className="flex items-center gap-3 p-3 bg-[#15273B] rounded-xl">
            <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center font-bold text-white">
              {user.name?.charAt(0).toUpperCase() || 'O'}
            </div>
            <div className="min-w-0">
              <p className="font-semibold text-white text-sm truncate">{user.name || 'Official'}</p>
              <p className="text-xs text-gray-400">Panchayat Official</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 mt-2 space-y-1 overflow-y-auto">
          {TABS.map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => handleTabChange(key)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium transition-all text-sm ${
                activeTab === key
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-gray-300 hover:bg-[#15273B] hover:text-white'
              }`}
            >
              <Icon size={20} /> {label}
            </button>
          ))}
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-[#15273B] shrink-0">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-3 py-2.5 w-full text-red-400 hover:bg-red-400/10 rounded-lg font-medium transition-colors text-sm"
          >
            <LogOut size={20} /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        {/* Top Header */}
        <header className="h-16 shrink-0 bg-white border-b border-gray-200 flex items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <button className="md:hidden text-gray-500 hover:text-gray-900" onClick={() => setIsSidebarOpen(true)}>
              <Menu size={24} />
            </button>
            <h1 className="text-xl font-semibold text-gray-900">
              {TABS.find(t => t.key === activeTab)?.label || 'Official Portal'}
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium text-gray-500 hidden sm:inline-block">
              {new Date().toLocaleDateString('en-IN', { weekday: 'short', day: '2-digit', month: 'short' })}
            </span>
            <button className="relative p-2 text-gray-400 hover:text-gray-600 transition-colors">
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
              <BellRing size={20} />
            </button>
          </div>
        </header>

        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-auto bg-gray-50 p-4 sm:p-6 lg:p-8">
          {renderContent()}
        </div>
      </main>
    </div>
  );
}

// Inline SVG arrow used for trend indicators
function ArrowUpIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M12 19V5M5 12l7-7 7 7" />
    </svg>
  );
}
