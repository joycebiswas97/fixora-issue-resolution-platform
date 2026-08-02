import React, { useState, useEffect } from 'react';
import API from '../services/api';
import { MapPin, Clock, FileText, CheckCircle2, AlertCircle, ZoomIn, X, ImageOff, Copy, Check as CheckIcon } from 'lucide-react';

// ── Status badge ──────────────────────────────────────────────────────────────
function StatusBadge({ status }) {
  const map = {
    Resolved: { style: 'bg-emerald-100 text-emerald-700', dot: 'bg-emerald-500', icon: CheckCircle2 },
    'In Progress': { style: 'bg-blue-100 text-blue-700', dot: 'bg-blue-500', icon: Clock },
    Pending: { style: 'bg-amber-100 text-amber-700', dot: 'bg-amber-500', icon: AlertCircle },
  };
  const { style, dot } = map[status] || { style: 'bg-gray-100 text-gray-600', dot: 'bg-gray-400' };
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${style}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${dot}`} />
      {status || 'Pending'}
    </span>
  );
}

// ── Copyable ID ───────────────────────────────────────────────────────────────
function CopyableID({ id }) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(id).then(() => { setCopied(true); setTimeout(() => setCopied(false), 2000); });
  };
  return (
    <button onClick={copy} title="Click to copy full ID" className="group flex items-center gap-1.5">
      <span className="font-mono text-xs text-gray-500 group-hover:text-blue-600 transition-colors">{id.slice(-10).toUpperCase()}</span>
      {copied
        ? <CheckIcon size={12} className="text-emerald-500 shrink-0" />
        : <Copy size={12} className="text-gray-300 group-hover:text-blue-400 shrink-0 transition-colors" />}
    </button>
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
          <p className="text-sm text-gray-500 mt-1 flex items-center gap-1"><MapPin size={12} /> {complaint.address}</p>
          {complaint.description && <p className="text-sm text-gray-600 mt-3 border-t border-gray-100 pt-3">{complaint.description}</p>}
        </div>
      </div>
    </div>
  );
}

const isPlaceholder = (url) => !url || url.includes('placeholder.com');

// ── Main component ─────────────────────────────────────────────────────────────
export default function CitizenMyComplaints() {
  const [complaints, setComplaints] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [lightboxItem, setLightboxItem] = useState(null);

  useEffect(() => {
    API.get('/complaints/me')
      .then(res => setComplaints(res.data))
      .catch(err => {
        console.error(err);
        setError('Failed to load your complaints. Please try again.');
      })
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="flex flex-col items-center gap-3 text-gray-400">
          <div className="w-10 h-10 border-2 border-gray-200 border-t-saffron rounded-full animate-spin" />
          <p className="text-sm font-medium">Loading your complaints...</p>
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
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">My Complaints</h2>
        <p className="text-gray-500 mt-1 text-sm">{complaints.length} complaint{complaints.length !== 1 ? 's' : ''} filed by you.</p>
      </div>

      {/* Summary strip */}
      {complaints.length > 0 && (
        <div className="grid grid-cols-3 gap-4 mb-6">
          {[
            { label: 'Total Filed', value: complaints.length, style: 'bg-blue-50 text-blue-700', icon: FileText },
            { label: 'In Progress', value: complaints.filter(c => c.status === 'In Progress').length, style: 'bg-amber-50 text-amber-700', icon: Clock },
            { label: 'Resolved', value: complaints.filter(c => c.status === 'Resolved').length, style: 'bg-emerald-50 text-emerald-700', icon: CheckCircle2 },
          ].map(s => (
            <div key={s.label} className={`rounded-2xl p-4 ${s.style} flex items-center gap-3`}>
              <s.icon size={20} className="opacity-80 shrink-0" />
              <div>
                <p className="text-xl font-bold">{s.value}</p>
                <p className="text-xs font-medium opacity-80">{s.label}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Complaints list */}
      {complaints.length === 0 ? (
        <div className="bg-white rounded-2xl p-16 text-center text-gray-400 border border-gray-100">
          <FileText size={40} className="mx-auto mb-3 opacity-30" />
          <p className="font-semibold text-gray-600 mb-1">No complaints filed yet</p>
          <p className="text-sm">Click "File New Issue" to report a civic problem in your area.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {complaints.map(complaint => (
            <div key={complaint._id} className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow overflow-hidden">
              <div className="flex gap-0">
                {/* Image thumbnail */}
                <div className="shrink-0 w-28 sm:w-36">
                  {isPlaceholder(complaint.imageUrl) ? (
                    <div className="w-full h-full min-h-[100px] bg-gray-100 flex flex-col items-center justify-center text-gray-300 gap-1">
                      <ImageOff size={18} />
                      <span className="text-[10px] font-medium">No photo</span>
                    </div>
                  ) : (
                    <button
                      onClick={() => setLightboxItem(complaint)}
                      className="relative w-full h-full min-h-[100px] block group"
                    >
                      <img
                        src={complaint.imageUrl}
                        alt={complaint.title}
                        className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-all flex items-center justify-center">
                        <ZoomIn size={16} className="text-white opacity-0 group-hover:opacity-100 transition-opacity drop-shadow" />
                      </div>
                    </button>
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 p-4 min-w-0">
                  <div className="flex items-start justify-between gap-3 flex-wrap mb-2">
                    <div className="flex items-center gap-2">
                      <CopyableID id={complaint._id} />
                      <span className="text-gray-300">•</span>
                      <span className="text-xs text-gray-400">
                        <Clock size={11} className="inline mr-1" />
                        {new Date(complaint.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                      </span>
                    </div>
                    <StatusBadge status={complaint.status} />
                  </div>

                  <h3 className="text-sm font-bold text-gray-900 mb-1 truncate">{complaint.title}</h3>

                  <p className="text-xs text-gray-500 line-clamp-2 mb-2">
                    {complaint.description || 'No description provided.'}
                  </p>

                  <div className="flex items-center gap-3 text-xs text-gray-400 flex-wrap">
                    <span className="inline-flex items-center gap-1 bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full font-medium">
                      {complaint.category}
                    </span>
                    {complaint.address && (
                      <span className="flex items-center gap-1 truncate max-w-[200px]">
                        <MapPin size={10} /> {complaint.address}
                      </span>
                    )}
                  </div>

                  {/* Admin feedback / status message */}
                  {complaint.status === 'Resolved' && (
                    <div className="mt-3 px-3 py-2 bg-emerald-50 border border-emerald-100 rounded-lg text-xs text-emerald-700 font-medium flex items-center gap-2">
                      <CheckCircle2 size={13} />
                      This issue has been resolved by the Panchayat team.
                    </div>
                  )}
                  {complaint.status === 'In Progress' && (
                    <div className="mt-3 px-3 py-2 bg-blue-50 border border-blue-100 rounded-lg text-xs text-blue-700 font-medium flex items-center gap-2">
                      <Clock size={13} />
                      Your complaint is currently being reviewed by officials.
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
