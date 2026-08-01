import React, { useState } from 'react';
import { Search, Mail, Phone, MapPin, ExternalLink, Filter } from 'lucide-react';

const mockCitizens = [
  { id: 'C-1042', name: 'Rajesh Kumar', phone: '+91 98765 43210', email: 'rajesh.k@example.com', location: 'Market Area, Ward 4', joined: '2023-01-15', complaintsCount: 3 },
  { id: 'C-1089', name: 'Sita Devi', phone: '+91 98765 43211', email: 'sita.devi@example.com', location: 'Link Road, Ward 1', joined: '2023-03-22', complaintsCount: 5 },
  { id: 'C-1102', name: 'Amit Patel', phone: '+91 98765 43212', email: 'amit.patel99@example.com', location: 'Near Panchayat Bhawan', joined: '2023-05-10', complaintsCount: 1 },
  { id: 'C-1156', name: 'Sunita Sharma', phone: '+91 98765 43213', email: 'sunita.s@example.com', location: 'Primary School Area', joined: '2023-08-05', complaintsCount: 2 },
  { id: 'C-1204', name: 'Rahul Verma', phone: '+91 98765 43214', email: 'rahul.v88@example.com', location: 'Ward 3', joined: '2023-09-18', complaintsCount: 0 },
];

export default function OfficialCitizens() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCitizens = mockCitizens.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.phone.includes(searchTerm) ||
    c.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Citizens Directory</h2>
          <p className="text-gray-600 mt-1">Manage and view details of registered citizens.</p>
        </div>
        <button className="px-4 py-2 bg-brand-blue text-white rounded-lg hover:bg-brand-blue-dark font-medium shadow-sm transition-colors flex items-center justify-center gap-2">
          Export CSV
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col h-[calc(100vh-180px)]">
        
        {/* Toolbar */}
        <div className="p-4 border-b border-gray-100 bg-gray-50/50 flex flex-wrap items-center justify-between gap-4 shrink-0">
          <div className="relative flex-1 min-w-[250px] max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Search citizens by name, phone, or area..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue transition-all"
            />
          </div>
          <button className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 flex items-center gap-2 text-sm font-medium transition-colors shrink-0">
            <Filter size={16} /> Filter by Area
          </button>
        </div>

        {/* Table */}
        <div className="flex-1 overflow-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50 sticky top-0 z-10">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Citizen Details</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact Info</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stats</th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredCitizens.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-6 py-12 text-center text-gray-500">
                    No citizens found matching "{searchTerm}".
                  </td>
                </tr>
              ) : (
                filteredCitizens.map((citizen) => (
                  <tr key={citizen.id} className="hover:bg-gray-50 transition-colors group">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-brand-blue-light text-brand-blue flex items-center justify-center font-bold">
                          {citizen.name.charAt(0)}
                        </div>
                        <div>
                          <div className="text-sm font-semibold text-gray-900">{citizen.name}</div>
                          <div className="text-xs text-gray-500">ID: {citizen.id}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 flex items-center gap-2 mb-1">
                        <Phone size={14} className="text-gray-400" /> {citizen.phone}
                      </div>
                      <div className="text-xs text-gray-500 flex items-center gap-2">
                        <Mail size={14} className="text-gray-400" /> {citizen.email}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 flex items-center gap-2">
                        <MapPin size={16} className="text-brand-blue" />
                        {citizen.location}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {citizen.complaintsCount} <span className="text-gray-500 font-normal">Complaints</span>
                      </div>
                      <div className="text-xs text-gray-500">
                        Joined {citizen.joined}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button className="inline-flex items-center gap-1 text-brand-blue hover:text-brand-blue-dark font-medium px-3 py-1.5 rounded-lg hover:bg-brand-blue/5 transition-colors">
                        View Profile <ExternalLink size={14} />
                      </button>
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
