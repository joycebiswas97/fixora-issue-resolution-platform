import React, { useState } from 'react';
import { 
  Search, Filter, MapPin, Calendar, Check, X, ChevronDown, MoreVertical
} from 'lucide-react';

const initialComplaints = [
  { id: 'GRV-001', type: 'Sanitation', title: 'Overflowing garbage bins in market area', location: 'Market Area', date: '2023-10-31', status: 'Pending', reporter: 'Rajesh Kumar' },
  { id: 'GRV-002', type: 'Infrastructure', title: 'Deep pothole on main link road', location: 'Link Road', date: '2023-10-30', status: 'In Progress', reporter: 'Sita Devi' },
  { id: 'GRV-003', type: 'Water Supply', title: 'No water supply for 2 days', location: 'Ward 2', date: '2023-10-29', status: 'Resolved', reporter: 'Anonymous' },
  { id: 'GRV-004', type: 'Electricity', title: 'Street light sparking dangerously', location: 'Near Panchayat Bhawan', date: '2023-10-28', status: 'Pending', reporter: 'Amit Patel' },
  { id: 'GRV-005', type: 'Education', title: 'School boundary wall collapsed', location: 'Primary School', date: '2023-10-25', status: 'In Progress', reporter: 'Sunita Sharma' },
];

export default function OfficialManageIssues() {
  const [complaints, setComplaints] = useState(initialComplaints);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingId, setEditingId] = useState(null);

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Resolved': return <span className="inline-flex items-center gap-1.5 py-1 px-2.5 rounded-full text-xs font-medium bg-green-100 text-green-800"><span className="w-1.5 h-1.5 rounded-full bg-green-500"></span> Resolved</span>;
      case 'In Progress': return <span className="inline-flex items-center gap-1.5 py-1 px-2.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"><span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span> In Progress</span>;
      case 'Pending': return <span className="inline-flex items-center gap-1.5 py-1 px-2.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800"><span className="w-1.5 h-1.5 rounded-full bg-yellow-500"></span> Pending</span>;
      default: return null;
    }
  };

  const handleStatusChange = (id, newStatus) => {
    setComplaints(complaints.map(c => 
      c.id === id ? { ...c, status: newStatus } : c
    ));
    setEditingId(null);
  };

  const filteredComplaints = complaints.filter(c => 
    c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Manage Issues</h2>
          <p className="text-gray-600 mt-1">View, update, and track all citizen complaints.</p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 flex items-center gap-2 font-medium shadow-sm transition-colors">
            <Filter size={18} /> Filter
          </button>
          <button className="px-4 py-2 bg-brand-blue text-white rounded-lg hover:bg-brand-blue-dark font-medium shadow-sm transition-colors">
            Export Report
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col h-[calc(100vh-180px)]">
        
        {/* Toolbar */}
        <div className="p-4 border-b border-gray-100 bg-gray-50/50 flex items-center gap-4 shrink-0">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Search by ID, title, or category..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue transition-all"
            />
          </div>
        </div>

        {/* Table */}
        <div className="flex-1 overflow-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50 sticky top-0 z-10">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Complaint Details</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Citizen</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category & Date</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Current Status</th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Update Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredComplaints.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-6 py-12 text-center text-gray-500">
                    No complaints found matching "{searchTerm}".
                  </td>
                </tr>
              ) : (
                filteredComplaints.map((complaint) => (
                  <tr key={complaint.id} className="hover:bg-gray-50 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-brand-blue mb-1">{complaint.id}</div>
                      <div className="text-sm font-semibold text-gray-900 mb-1">{complaint.title}</div>
                      <div className="text-xs text-gray-500 flex items-center gap-1">
                        <MapPin size={12} /> {complaint.location}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{complaint.reporter}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 mb-2">
                        {complaint.type}
                      </span>
                      <div className="text-xs text-gray-500 flex items-center gap-1">
                        <Calendar size={12} /> {complaint.date}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(complaint.status)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      {editingId === complaint.id ? (
                        <div className="flex items-center justify-end gap-2">
                          <select 
                            className="text-sm border border-gray-300 rounded-md py-1.5 px-2 focus:outline-none focus:ring-1 focus:ring-brand-blue"
                            defaultValue={complaint.status}
                            onChange={(e) => handleStatusChange(complaint.id, e.target.value)}
                          >
                            <option value="Pending">Pending</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Resolved">Resolved</option>
                          </select>
                          <button 
                            onClick={() => setEditingId(null)}
                            className="p-1.5 text-gray-400 hover:text-gray-600 rounded-md"
                          >
                            <X size={16} />
                          </button>
                        </div>
                      ) : (
                        <button 
                          onClick={() => setEditingId(complaint.id)}
                          className="inline-flex items-center gap-1 text-brand-blue hover:text-brand-blue-dark border border-brand-blue/20 bg-brand-blue/5 hover:bg-brand-blue/10 px-3 py-1.5 rounded-lg transition-colors"
                        >
                          Update <ChevronDown size={14} />
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
