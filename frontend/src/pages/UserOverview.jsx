import React, { useState, useEffect } from 'react';
import API from '../services/api';
import { MapPin, Clock, Tag, Users, ZoomIn, X, ImageOff } from 'lucide-react';

// ── Status badge ──────────────────────────────────────────────────────────────
function StatusBadge({ status }) {
  const styles = {
    Resolved: 'bg-emerald-100 text-emerald-700',
    'In Progress': 'bg-blue-100 text-blue-700',
    Pending: 'bg-amber-100 text-amber-700',
  };
  const dots = {
    Resolved: 'bg-emerald-500',
    'In Progress': 'bg-blue-500',
    Pending: 'bg-amber-500',
  };
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${styles[status] || 'bg-gray-100 text-gray-600'}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${dots[status] || 'bg-gray-400'}`} />
      {status || 'Pending'}
    </span>
  );
}

// ── Image lightbox ────────────────────────────────────────────────────────────
function Lightbox({ complaint, onClose }) {
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4" onClick={onClose}>
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-2xl w-full overflow-hidden" onClick={e => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-3 right-3 z-10 p-1.5 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors">
          <X size={18} />
        </button>
        <div className="bg-gray-900 max-h-[65vh] overflow-hidden flex items-center justify-center">
          <img src={complaint.imageUrl} alt={complaint.title} className="w-full object-contain max-h-[65vh]" />
        </div>
        <div className="p-5">
          <h3 className="font-bold text-gray-900">{complaint.title}</h3>
          <p className="text-sm text-gray-500 mt-1 flex items-center gap-1"><MapPin size={12} /> {complaint.address || 'Location not specified'}</p>
          {complaint.description && <p className="text-sm text-gray-600 mt-3 border-t border-gray-100 pt-3">{complaint.description}</p>}
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

const isPlaceholder = (url) => !url || url.includes('placeholder.com');

const CATEGORY_COLORS = {
  'Water Supply': 'bg-cyan-100 text-cyan-700',
  Electricity: 'bg-yellow-100 text-yellow-700',
  Sanitation: 'bg-green-100 text-green-700',
  Roads: 'bg-orange-100 text-orange-700',
  'Other Issue': 'bg-purple-100 text-purple-700',
};

// ── Main component ─────────────────────────────────────────────────────────────
export default function UserOverview() {
  const [complaints, setComplaints] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [lightboxItem, setLightboxItem] = useState(null);

  useEffect(() => {
    API.get('/complaints')
      .then(res => setComplaints(res.data))
      .catch(err => {
        console.error(err);
        setError('Failed to load community feed. Please try again.');
      })
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="flex flex-col items-center gap-3 text-gray-400">
          <div className="w-10 h-10 border-2 border-gray-200 border-t-saffron rounded-full animate-spin" />
          <p className="text-sm font-medium">Loading community feed...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl">{error}</div>
    );
  }

  return (
    <div>
      {lightboxItem && <Lightbox complaint={lightboxItem} onClose={() => setLightboxItem(null)} />}

      {/* Header */}
      <div className="mb-6 flex items-center justify-between flex-wrap gap-3">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Community Issues</h2>
          <p className="text-gray-500 mt-1 text-sm flex items-center gap-1.5">
            <Users size={14} /> {complaints.length} issues reported by users across the community
          </p>
        </div>
        {/* Stats strip */}
        <div className="flex items-center gap-3 text-xs font-medium">
          {[
            { label: 'Pending', count: complaints.filter(c => c.status === 'Pending').length, color: 'bg-amber-50 text-amber-700 border-amber-200' },
            { label: 'In Progress', count: complaints.filter(c => c.status === 'In Progress').length, color: 'bg-blue-50 text-blue-700 border-blue-200' },
            { label: 'Resolved', count: complaints.filter(c => c.status === 'Resolved').length, color: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
          ].map(s => (
            <span key={s.label} className={`px-3 py-1.5 rounded-xl border ${s.color}`}>
              {s.label}: <strong>{s.count}</strong>
            </span>
          ))}
        </div>
      </div>

      {/* Feed grid */}
      {complaints.length === 0 ? (
        <div className="bg-white rounded-2xl p-16 text-center text-gray-400 border border-gray-100">
          <Users size={40} className="mx-auto mb-3 opacity-30" />
          <p className="font-medium">No community issues reported yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
          {complaints.map(complaint => (
            <div key={complaint._id} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition-shadow group flex flex-col">
              {/* Image */}
              {isPlaceholder(complaint.imageUrl) ? (
                <div className="h-36 bg-gray-100 flex flex-col items-center justify-center text-gray-300 gap-1">
                  <ImageOff size={22} />
                  <span className="text-xs font-medium">No photo</span>
                </div>
              ) : (
                <button
                  onClick={() => setLightboxItem(complaint)}
                  className="relative h-36 w-full overflow-hidden block"
                >
                  <img
                    src={complaint.imageUrl}
                    alt={complaint.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all flex items-center justify-center">
                    <ZoomIn size={20} className="text-white opacity-0 group-hover:opacity-100 transition-opacity drop-shadow" />
                  </div>
                </button>
              )}

              {/* Card body */}
              <div className="p-4 flex flex-col flex-1">
                {/* Top row: category + status */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${CATEGORY_COLORS[complaint.category] || 'bg-gray-100 text-gray-600'}`}>
                    <Tag size={10} className="inline mr-1" />{complaint.category}
                  </span>
                  <StatusBadge status={complaint.status} />
                </div>

                {/* Title */}
                <h3 className="text-sm font-bold text-gray-900 leading-snug mb-1 line-clamp-2">{complaint.title}</h3>

                {/* Description */}
                {complaint.description && (
                  <p className="text-xs text-gray-500 leading-relaxed line-clamp-2 mb-3">{complaint.description}</p>
                )}

                {/* Footer */}
                <div className="mt-auto pt-3 border-t border-gray-100 flex items-center justify-between text-xs text-gray-400">
                  <span className="flex items-center gap-1">
                    <MapPin size={11} />
                    <span className="truncate max-w-[130px]">{complaint.address || 'Location N/A'}</span>
                  </span>
                  <span className="flex items-center gap-1 shrink-0">
                    <Clock size={11} />
                    {new Date(complaint.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short' })}
                  </span>
                </div>

                {/* Reported by */}
                {complaint.reportedBy?.name && (
                  <p className="text-[11px] text-gray-400 mt-2">
                    Reported by <span className="font-semibold text-gray-600">{complaint.reportedBy.name}</span>
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
