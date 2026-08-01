import React, { useState, useEffect } from 'react';
import { 
  FileText, Clock, CheckCircle2, ChevronRight, MapPin, AlertCircle 
} from 'lucide-react';
import CitizenLayout from '../components/CitizenLayout';
import API from '../services/api';

export default function CitizenDashboard() {
  const [complaints, setComplaints] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  useEffect(() => {
    fetchMyComplaints();
  }, []);

  const fetchMyComplaints = async () => {
    try {
      const response = await API.get('/complaints/me'); 
      setComplaints(response.data.reverse());
    } catch (err) {
      console.error('Failed to fetch complaints', err);
    } finally {
      setIsLoading(false);
    }
  };
  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'resolved':
        return <span className="flex items-center gap-1 text-sm font-bold text-green-600 bg-green-50 px-3 py-1 rounded-full"><CheckCircle2 size={14}/> Resolved</span>;
      case 'in progress':
        return <span className="flex items-center gap-1 text-sm font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full"><Clock size={14}/> In Progress</span>;
      default:
        return <span className="flex items-center gap-1 text-sm font-bold text-yellow-600 bg-yellow-50 px-3 py-1 rounded-full"><AlertCircle size={14}/> Pending</span>;
    }
  };

  return (
    <CitizenLayout title="Citizen Dashboard">
      {/* Welcome Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Welcome back, {user.name || 'Citizen'}!</h2>
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
              <p className="text-2xl font-bold text-gray-900">{complaints.length}</p>
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
              <p className="text-2xl font-bold text-gray-900">{complaints.filter(c => c.status === 'Resolved').length}</p>
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
              <p className="text-2xl font-bold text-gray-900">{complaints.filter(c => c.status === 'In Progress').length}</p>
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
          {isLoading ? (
          <div className="p-10 text-center text-gray-400 font-medium animate-pulse">Loading data...</div>
          ) : complaints.length === 0 ? (
            <div className="p-10 text-center text-gray-500 font-medium">No complaints filed yet.</div>
          ) : (
          <div className="grid gap-6">
            {complaints.map((complaint) => (
              <div key={complaint._id} className="p-6 hover:bg-gray-50 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4 cursor-pointer">
                {/* ADDED Image Rendering */}
                {complaint.imageUrl && (
                  <div className="w-full sm:w-24 h-24 flex-shrink-0">
                    <img 
                      src={complaint.imageUrl} 
                      alt={complaint.title} 
                      className="w-full h-full object-cover rounded-lg border border-gray-200"
                    />
                  </div>
                )}
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <span className="text-sm font-medium text-gray-500">...{complaint._id.slice(-6).toUpperCase()}</span>
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(complaint.status)}`}>
                      {complaint.status}
                    </span>
                  </div>
                  <h4 className="text-base font-semibold text-gray-900 mb-2">{complaint.title}</h4>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                    <span className="flex items-center gap-1.5"><MapPin size={16} /> {complaint.address || 'Location not provided'}</span>
                    <span className="flex items-center gap-1.5"><Clock size={16} /> {new Date(complaint.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
                <div className="hidden sm:block text-gray-400">
                  <ChevronRight size={20} />
                </div>
              </div>
            ))}
          </div>
        )}
        </div>
      </div>
    </CitizenLayout>
  );
}
