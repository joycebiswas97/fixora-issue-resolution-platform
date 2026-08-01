import React from 'react';
import { 
  FileText, Clock, AlertTriangle, Check, ChevronDown, MapPin
} from 'lucide-react';

const mockComplaints = [
  { id: 'GRV-004', type: 'Sanitation', title: 'Overflowing garbage bins', location: 'Market Area', date: '2023-10-31', status: 'Pending', reporter: 'Rajesh Kumar' },
  { id: 'GRV-005', type: 'Infrastructure', title: 'Pothole on main link road', location: 'Link Road', date: '2023-10-30', status: 'In Progress', reporter: 'Sita Devi' },
  { id: 'GRV-006', type: 'Water Supply', title: 'No water supply for 2 days', location: 'Ward 2', date: '2023-10-29', status: 'Resolved', reporter: 'Anonymous' },
  { id: 'GRV-007', type: 'Electricity', title: 'Street light sparking', location: 'Near Panchayat Bhawan', date: '2023-10-28', status: 'Pending', reporter: 'Amit Patel' },
];

export default function OfficialDashboard() {

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Resolved': return <span className="inline-flex items-center gap-1.5 py-1 px-2.5 rounded-full text-xs font-medium bg-green-100 text-green-800"><span className="w-1.5 h-1.5 rounded-full bg-green-500"></span> Resolved</span>;
      case 'In Progress': return <span className="inline-flex items-center gap-1.5 py-1 px-2.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"><span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span> In Progress</span>;
      case 'Pending': return <span className="inline-flex items-center gap-1.5 py-1 px-2.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800"><span className="w-1.5 h-1.5 rounded-full bg-yellow-500"></span> Pending</span>;
      default: return null;
    }
  };

  return (
    <>
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
            <span className="flex items-center text-sm font-medium text-green-600">
              +12% <ArrowUpIcon className="w-4 h-4 ml-0.5" />
            </span>
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-900">142</p>
            <p className="text-sm font-medium text-gray-500">Total Received</p>
          </div>
        </div>
        
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col justify-between">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-red-50 rounded-lg">
              <AlertTriangle className="text-red-600" size={24} />
            </div>
            <span className="flex items-center text-sm font-medium text-red-600">
              +4% <ArrowUpIcon className="w-4 h-4 ml-0.5" />
            </span>
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-900">28</p>
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
            <p className="text-2xl font-bold text-gray-900">3.2 Days</p>
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
            <p className="text-2xl font-bold text-gray-900">96</p>
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
              {mockComplaints.map((complaint) => (
                <tr key={complaint.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{complaint.id}</div>
                    <div className="text-sm text-gray-500">{complaint.date}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900">{complaint.title}</div>
                    <div className="text-sm text-gray-500 flex items-center gap-1 mt-0.5">
                      <MapPin size={12} /> {complaint.location}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                      {complaint.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusBadge(complaint.status)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-brand-blue hover:text-brand-blue-dark border border-brand-blue/20 bg-brand-blue/5 hover:bg-brand-blue/10 px-3 py-1.5 rounded-lg transition-colors">
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
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
