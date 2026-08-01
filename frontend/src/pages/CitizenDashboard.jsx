import React from 'react';
import { 
  FileText, Clock, CheckCircle2, ChevronRight, MapPin 
} from 'lucide-react';
import CitizenLayout from '../components/CitizenLayout';

const mockComplaints = [
  { id: 'GRV-001', title: 'Broken Water Pipe', location: 'Main Street, Ward 4', date: '2023-10-24', status: 'Resolved' },
  { id: 'GRV-002', title: 'Garbage Accumulation', location: 'Near Primary School', date: '2023-10-26', status: 'In Progress' },
  { id: 'GRV-003', title: 'Street Light Not Working', location: 'Temple Road', date: '2023-10-27', status: 'Pending' }
];

export default function CitizenDashboard() {

  const getStatusColor = (status) => {
    switch (status) {
      case 'Resolved': return 'bg-green-100 text-green-800';
      case 'In Progress': return 'bg-blue-100 text-blue-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <CitizenLayout title="Citizen Dashboard">
      {/* Welcome Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Welcome back, Rahul!</h2>
        <p className="text-gray-600 mt-1">Here's an overview of your reported issues.</p>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center">
              <FileText size={24} />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Total Filed</p>
              <p className="text-2xl font-bold text-gray-900">3</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-green-100 text-green-600 rounded-xl flex items-center justify-center">
              <CheckCircle2 size={24} />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Resolved</p>
              <p className="text-2xl font-bold text-gray-900">1</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-yellow-100 text-yellow-600 rounded-xl flex items-center justify-center">
              <Clock size={24} />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">In Progress</p>
              <p className="text-2xl font-bold text-gray-900">2</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Complaints */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
          <h3 className="text-lg font-semibold text-gray-900">Recent Complaints</h3>
          <a href="/dashboard/citizen/complaints" className="text-sm font-medium text-saffron hover:text-saffron-dark">View all</a>
        </div>
        <div className="divide-y divide-gray-100">
          {mockComplaints.map((complaint) => (
            <div key={complaint.id} className="p-6 hover:bg-gray-50 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4 cursor-pointer">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-1">
                  <span className="text-sm font-medium text-gray-500">{complaint.id}</span>
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(complaint.status)}`}>
                    {complaint.status}
                  </span>
                </div>
                <h4 className="text-base font-semibold text-gray-900 mb-2">{complaint.title}</h4>
                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                  <span className="flex items-center gap-1.5"><MapPin size={16} /> {complaint.location}</span>
                  <span className="flex items-center gap-1.5"><Clock size={16} /> {complaint.date}</span>
                </div>
              </div>
              <div className="hidden sm:block text-gray-400">
                <ChevronRight size={20} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </CitizenLayout>
  );
}
