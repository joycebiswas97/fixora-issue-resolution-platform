import React, { useState, useEffect, useCallback } from 'react';
import API from '../services/api';
import IssueMap from '../components/IssueMap';
import { Search, MapPin, Filter, X, ZoomIn, Copy, Check as CheckIcon, ImageOff } from 'lucide-react';

const CATEGORIES = ['All Categories', 'Water Supply', 'Electricity', 'Sanitation', 'Roads', 'Other Issue'];
const STATUSES = ['All Statuses', 'Pending', 'In Progress', 'Resolved'];

// ── Lightbox component ────────────────────────────────────────────────────────
function Lightbox({ complaint, onClose }) {
  // Close on Escape key
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
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-10 p-1.5 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors"
        >
          <X size={18} />
        </button>

        {/* Image */}
        <div className="bg-gray-900 flex items-center justify-center max-h-[70vh] overflow-hidden">
          <img
            src={complaint.imageUrl}
            alt={complaint.title}
            className="w-full object-contain max-h-[70vh]"
          />
        </div>

        {/* Complaint info */}
        <div className="p-5">
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div>
              <h3 className="text-base font-bold text-gray-900">{complaint.title}</h3>
              <p className="text-sm text-gray-500 mt-0.5 flex items-center gap-1">
                <MapPin size={12} /> {complaint.address || 'Location not provided'}
              </p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <span className="text-xs font-mono bg-gray-100 text-gray-700 px-2.5 py-1 rounded-lg">
                {complaint._id}
              </span>
            </div>
          </div>
          {complaint.description && (
            <p className="text-sm text-gray-600 mt-3 leading-relaxed border-t border-gray-100 pt-3">
              {complaint.description}
            </p>
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

// ── Copy ID button ─────────────────────────────────────────────────────────────
function CopyableID({ id }) {
  const [copied, setCopied] = useState(false);
  const copy = (e) => {
    e.stopPropagation();
    navigator.clipboard.writeText(id).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };
  return (
    <button
      onClick={copy}
      title="Click to copy full ID"
      className="group flex items-center gap-1.5 text-left"
    >
      <span className="text-xs font-mono text-gray-600 group-hover:text-blue-600 transition-colors">
        {id.slice(-10).toUpperCase()}
      </span>
      {copied
        ? <CheckIcon size={12} className="text-green-500 shrink-0" />
        : <Copy size={12} className="text-gray-300 group-hover:text-blue-400 shrink-0 transition-colors" />
      }
    </button>
  );
}

// ── Main component ─────────────────────────────────────────────────────────────
export default function OfficialManageIssues() {
  const [complaints, setComplaints] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All Categories');
  const [statusFilter, setStatusFilter] = useState('All Statuses');
  const [lightboxComplaint, setLightboxComplaint] = useState(null);

  useEffect(() => { fetchComplaints(); }, []);

  const fetchComplaints = async () => {
    setIsLoading(true);
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
      setComplaints(prev => prev.map(c => (c._id === id ? { ...c, status: newStatus } : c)));
    } catch (err) {
      alert('Failed to update status. Please try again.');
    }
  };

  const filteredComplaints = complaints.filter(c => {
    const matchesSearch =
      !searchQuery ||
      c.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c._id?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.address?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === 'All Categories' || c.category === categoryFilter;
    const matchesStatus = statusFilter === 'All Statuses' || c.status === statusFilter;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const getStatusBadge = (status) => {
    const map = {
      Resolved: 'bg-green-100 text-green-800',
      'In Progress': 'bg-blue-100 text-blue-800',
      Pending: 'bg-yellow-100 text-yellow-800',
    };
    const dotMap = { Resolved: 'bg-green-500', 'In Progress': 'bg-blue-500', Pending: 'bg-yellow-500' };
    return (
      <span className={`inline-flex items-center gap-1.5 py-1 px-2.5 rounded-full text-xs font-semibold ${map[status] || 'bg-gray-100 text-gray-800'}`}>
        <span className={`w-1.5 h-1.5 rounded-full ${dotMap[status] || 'bg-gray-400'}`} />
        {status}
      </span>
    );
  };

  const clearFilters = () => {
    setSearchQuery('');
    setCategoryFilter('All Categories');
    setStatusFilter('All Statuses');
  };

  const hasFilters = searchQuery || categoryFilter !== 'All Categories' || statusFilter !== 'All Statuses';
  const closeLightbox = useCallback(() => setLightboxComplaint(null), []);

  const isPlaceholder = (url) => !url || url.includes('placeholder.com') || url === '';

  return (
    <div>
      {/* Lightbox */}
      {lightboxComplaint && <Lightbox complaint={lightboxComplaint} onClose={closeLightbox} />}

      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Manage Issues</h2>
        <p className="text-gray-600 mt-1">Review, filter, and update the status of all reported complaints.</p>
      </div>

      {/* ── Live Issues Map ── */}
      <div className="mb-6">
        <IssueMap complaints={complaints} />
      </div>

      {/* Controls Bar */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 mb-6">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search by ID, title, or location..."
              className="w-full pl-9 pr-4 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>
          <div className="relative">
            <Filter size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <select
              value={categoryFilter}
              onChange={e => setCategoryFilter(e.target.value)}
              className="pl-8 pr-8 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white appearance-none cursor-pointer"
            >
              {CATEGORIES.map(c => <option key={c}>{c}</option>)}
            </select>
          </div>
          <select
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value)}
            className="px-4 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white appearance-none cursor-pointer"
          >
            {STATUSES.map(s => <option key={s}>{s}</option>)}
          </select>
          {hasFilters && (
            <button
              onClick={clearFilters}
              className="flex items-center gap-1.5 px-4 py-2.5 text-sm text-red-600 bg-red-50 rounded-xl hover:bg-red-100 transition-colors font-medium"
            >
              <X size={14} /> Clear
            </button>
          )}
        </div>
        <p className="text-xs text-gray-500 mt-3">
          Showing <span className="font-semibold text-gray-700">{filteredComplaints.length}</span> of {complaints.length} complaints
        </p>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
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
            <tbody className="bg-white divide-y divide-gray-100">
              {isLoading ? (
                <tr>
                  <td colSpan="6" className="text-center py-16">
                    <div className="flex flex-col items-center gap-2 text-gray-400">
                      <div className="w-8 h-8 border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin" />
                      <span className="text-sm font-medium">Loading complaints...</span>
                    </div>
                  </td>
                </tr>
              ) : filteredComplaints.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center py-16 text-gray-400 text-sm">No complaints match your filters.</td>
                </tr>
              ) : filteredComplaints.map((complaint) => (
                <tr key={complaint._id} className="hover:bg-gray-50/80 transition-colors">

                  {/* ── Image Thumbnail ── */}
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
                        {/* Zoom overlay */}
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all flex items-center justify-center">
                          <ZoomIn size={18} className="text-white opacity-0 group-hover:opacity-100 transition-opacity drop-shadow" />
                        </div>
                      </button>
                    )}
                  </td>

                  {/* ── ID / Date ── */}
                  <td className="px-4 py-3 whitespace-nowrap">
                    <CopyableID id={complaint._id} />
                    <div className="text-xs text-gray-400 mt-0.5">{new Date(complaint.createdAt).toLocaleDateString()}</div>
                  </td>

                  {/* ── Issue Details ── */}
                  <td className="px-4 py-3 max-w-xs">
                    <div className="text-sm font-medium text-gray-900 truncate">{complaint.title}</div>
                    <div className="text-xs text-gray-400 flex items-center gap-1 mt-0.5">
                      <MapPin size={10} className="shrink-0" />
                      <span className="truncate">{complaint.address || 'Location not provided'}</span>
                    </div>
                  </td>

                  {/* ── Category ── */}
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
                      {complaint.category}
                    </span>
                  </td>

                  {/* ── Status ── */}
                  <td className="px-4 py-3 whitespace-nowrap">
                    {getStatusBadge(complaint.status)}
                  </td>

                  {/* ── Action ── */}
                  <td className="px-4 py-3 whitespace-nowrap text-right">
                    <select
                      value={complaint.status}
                      onChange={e => handleStatusUpdate(complaint._id, e.target.value)}
                      className="text-sm border border-gray-200 rounded-lg px-3 py-1.5 outline-none cursor-pointer focus:ring-2 focus:ring-blue-500 bg-white"
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
  );
}
