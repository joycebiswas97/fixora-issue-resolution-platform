import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ShieldCheck, Home, FileText, PlusCircle, Settings, LogOut,
  MapPin, Clock, CheckCircle2, ChevronRight, Menu, X
} from 'lucide-react';

const mockComplaints = [
  { id: 'GRV-001', title: 'Broken Water Pipe', location: 'Main Street, Ward 4', date: '2023-10-24', status: 'Resolved' },
  { id: 'GRV-002', title: 'Garbage Accumulation', location: 'Near Primary School', date: '2023-10-26', status: 'In Progress' },
  { id: 'GRV-003', title: 'Street Light Not Working', location: 'Temple Road', date: '2023-10-27', status: 'Pending' }
];

export default function CitizenDashboard() {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Resolved': return 'bg-green-100 text-green-800';
      case 'In Progress': return 'bg-blue-100 text-blue-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex font-inter">

      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div className="fixed inset-0 z-40 bg-gray-800/50 md:hidden" onClick={() => setIsSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out md:translate-x-0 md:static md:flex-shrink-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="h-full flex flex-col">
          <div className="h-16 flex items-center px-6 border-b border-gray-200 justify-between">
            <Link to="/" className="flex items-center gap-2 text-2xl font-bold text-brand-green">
              <ShieldCheck className="text-saffron" size={28} />
              <span>GramSeva</span>
            </Link>
            <button className="md:hidden text-gray-500 hover:text-gray-900" onClick={() => setIsSidebarOpen(false)}>
              <X size={24} />
            </button>
          </div>

          <div className="p-4">
            <div className="flex items-center gap-3 p-3 bg-saffron/10 rounded-xl mb-6">
              <div className="w-10 h-10 rounded-full bg-saffron text-white flex items-center justify-center font-bold">
                RC
              </div>
              <div>
                <p className="font-semibold text-gray-900 text-sm">Rahul Chauhan</p>
                <p className="text-xs text-gray-500">Citizen</p>
              </div>
            </div>
          </div>

          <nav className="flex-1 px-4 space-y-1">
            <a href="#" className="flex items-center gap-3 px-3 py-2.5 bg-saffron text-white rounded-lg font-medium transition-colors shadow-sm">
              <Home size={20} /> Dashboard
            </a>
            <a href="#" className="flex items-center gap-3 px-3 py-2.5 text-gray-700 hover:bg-gray-100 rounded-lg font-medium transition-colors">
              <FileText size={20} /> My Complaints
            </a>
            <Link to="/complaint/new" className="flex items-center gap-3 px-3 py-2.5 text-gray-700 hover:bg-gray-100 rounded-lg font-medium transition-colors">
              <PlusCircle size={20} /> File New Issue
            </Link>
            <a href="#" className="flex items-center gap-3 px-3 py-2.5 text-gray-700 hover:bg-gray-100 rounded-lg font-medium transition-colors">
              <Settings size={20} /> Settings
            </a>
          </nav>

          <div className="p-4 border-t border-gray-200">
            <button onClick={handleLogout} className="flex items-center gap-3 px-3 py-2.5 w-full text-red-600 hover:bg-red-50 rounded-lg font-medium transition-colors">
              <LogOut size={20} /> Logout
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Header */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 sm:px-6 lg:px-8">
          <button className="md:hidden text-gray-500 hover:text-gray-900" onClick={() => setIsSidebarOpen(true)}>
            <Menu size={24} />
          </button>
          <h1 className="text-xl font-semibold text-gray-900 hidden md:block">Citizen Dashboard</h1>
          <div className="flex items-center gap-4 ml-auto">
            <Link to="/complaint/new" className="inline-flex items-center justify-center font-medium px-4 py-2 bg-saffron text-white rounded-lg hover:bg-saffron-dark transition-colors text-sm shadow-sm gap-2">
              <PlusCircle size={18} />
              <span className="hidden sm:inline">New Complaint</span>
            </Link>
          </div>
        </header>

        <div className="flex-1 overflow-auto p-4 sm:p-6 lg:p-8">

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
              <a href="#" className="text-sm font-medium text-saffron hover:text-saffron-dark">View all</a>
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

        </div>
      </main>
    </div>
  );
}
