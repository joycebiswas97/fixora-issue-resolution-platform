import React, { useState } from 'react';
import { 
  FileText, Clock, CheckCircle2, MapPin, Filter, Search, ChevronRight
} from 'lucide-react';
import CitizenLayout from '../components/CitizenLayout';

const allComplaints = [
  { id: 'GRV-001', title: 'Broken Water Pipe', location: 'Main Street, Ward 4', date: '2023-10-24', status: 'Success' },
  { id: 'GRV-002', title: 'Garbage Accumulation', location: 'Near Primary School', date: '2023-10-26', status: 'In Progress' },
  { id: 'GRV-003', title: 'Street Light Not Working', location: 'Temple Road', date: '2023-10-27', status: 'Pending' },
  { id: 'GRV-004', title: 'Pothole on Market Road', location: 'Market Area', date: '2023-09-12', status: 'Success' },
  { id: 'GRV-005', title: 'Drain Blockage', location: 'Ward 2, Lane 3', date: '2023-10-30', status: 'Pending' },
];

export default function MyComplaintsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  // Calculate statistics
  const stats = {
    total: allComplaints.length,
    success: allComplaints.filter(c => c.status === 'Success').length,
    inProgress: allComplaints.filter(c => c.status === 'In Progress').length,
    pending: allComplaints.filter(c => c.status === 'Pending').length,
  };

  // Filter complaints based on search and status
  const filteredComplaints = allComplaints.filter(c => {
    const matchesSearch = c.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          c.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || c.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Success': 
        return <span className="inline-flex items-center gap-1.5 py-1 px-2.5 rounded-full text-xs font-bold bg-green-100 text-green-800"><span className="w-1.5 h-1.5 rounded-full bg-green-500"></span> Success</span>;
      case 'In Progress': 
        return <span className="inline-flex items-center gap-1.5 py-1 px-2.5 rounded-full text-xs font-bold bg-blue-100 text-blue-800"><span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span> In Progress</span>;
      case 'Pending': 
        return <span className="inline-flex items-center gap-1.5 py-1 px-2.5 rounded-full text-xs font-bold bg-yellow-100 text-yellow-800"><span className="w-1.5 h-1.5 rounded-full bg-yellow-500"></span> Pending</span>;
      default: 
        return <span className="inline-flex items-center gap-1.5 py-1 px-2.5 rounded-full text-xs font-bold bg-gray-100 text-gray-800">{status}</span>;
    }
  };

  return (
    <CitizenLayout title="My Complaints">
      
      {/* Header & Stats summary */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Complaint Overview</h2>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between">
            <div className="flex justify-between items-start mb-2">
              <span className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Total Filed</span>
              <FileText className="text-gray-400" size={20} />
            </div>
            <span className="text-3xl font-black text-gray-900">{stats.total}</span>
          </div>

          <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between">
            <div className="flex justify-between items-start mb-2">
              <span className="text-sm font-semibold text-green-600 uppercase tracking-wider">Success</span>
              <CheckCircle2 className="text-green-500" size={20} />
            </div>
            <span className="text-3xl font-black text-gray-900">{stats.success}</span>
          </div>

          <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between">
            <div className="flex justify-between items-start mb-2">
              <span className="text-sm font-semibold text-blue-600 uppercase tracking-wider">In Progress</span>
              <Clock className="text-blue-500" size={20} />
            </div>
            <span className="text-3xl font-black text-gray-900">{stats.inProgress}</span>
          </div>

          <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between">
            <div className="flex justify-between items-start mb-2">
              <span className="text-sm font-semibold text-yellow-600 uppercase tracking-wider">Pending</span>
              <Clock className="text-yellow-500" size={20} />
            </div>
            <span className="text-3xl font-black text-gray-900">{stats.pending}</span>
          </div>
        </div>
      </div>

      {/* Complaints List Section */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        
        {/* Toolbar */}
        <div className="p-5 border-b border-gray-100 bg-gray-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="relative max-w-xs w-full">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={18} className="text-gray-400" />
            </div>
            <input 
              type="text" 
              placeholder="Search by ID or title..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg focus:ring-saffron focus:border-saffron sm:text-sm transition-colors"
            />
          </div>
          
          <div className="flex items-center gap-2">
            <Filter size={18} className="text-gray-500" />
            <select 
              className="border-gray-200 rounded-lg text-sm focus:ring-saffron focus:border-saffron py-2 pl-3 pr-8 bg-white shadow-sm"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="All">All Statuses</option>
              <option value="Success">Success</option>
              <option value="In Progress">In Progress</option>
              <option value="Pending">Pending</option>
            </select>
          </div>
        </div>

        {/* List Content */}
        <div className="divide-y divide-gray-100">
          {filteredComplaints.length > 0 ? (
            filteredComplaints.map((complaint) => (
              <div key={complaint.id} className="p-6 hover:bg-gray-50 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4 cursor-pointer group">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-sm font-bold text-gray-500">{complaint.id}</span>
                    {getStatusBadge(complaint.status)}
                  </div>
                  <h4 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-saffron transition-colors">{complaint.title}</h4>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 font-medium">
                    <span className="flex items-center gap-1.5"><MapPin size={16} className="text-gray-400" /> {complaint.location}</span>
                    <span className="flex items-center gap-1.5"><Clock size={16} className="text-gray-400" /> {complaint.date}</span>
                  </div>
                </div>
                <div className="hidden sm:flex items-center justify-center w-10 h-10 rounded-full bg-white border border-gray-200 text-gray-400 group-hover:bg-saffron group-hover:text-white group-hover:border-saffron transition-all">
                  <ChevronRight size={20} />
                </div>
              </div>
            ))
          ) : (
            <div className="p-12 text-center text-gray-500">
              <p className="text-lg font-medium">No complaints found.</p>
              <p className="text-sm mt-1">Try adjusting your filters or search term.</p>
            </div>
          )}
        </div>
      </div>

    </CitizenLayout>
  );
}
