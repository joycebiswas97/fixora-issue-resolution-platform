import React, { useState, useEffect } from 'react';
import API from '../services/api';
import { Users, Phone, Mail, Calendar, Search } from 'lucide-react';

export default function OfficialCitizens() {
  const [citizens, setCitizens] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchCitizens();
  }, []);

  const fetchCitizens = async () => {
    try {
      const response = await API.get('/users');
      setCitizens(response.data);
    } catch (err) {
      setError('Failed to load citizen data. Ensure you are logged in as an official.');
      console.error('Error fetching citizens:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const getInitials = (name = '') =>
    name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);

  const AVATAR_COLORS = [
    'bg-violet-500', 'bg-blue-500', 'bg-emerald-500',
    'bg-orange-500', 'bg-pink-500', 'bg-teal-500',
  ];
  const getColor = (name = '') => AVATAR_COLORS[name.charCodeAt(0) % AVATAR_COLORS.length];

  const filtered = citizens.filter(c =>
    !search ||
    c.name?.toLowerCase().includes(search.toLowerCase()) ||
    c.email?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      {/* Header */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Registered Citizens</h2>
          <p className="text-gray-600 mt-1">
            {isLoading ? 'Loading...' : `${citizens.length} citizen${citizens.length !== 1 ? 's' : ''} registered on the platform.`}
          </p>
        </div>
        {/* Search */}
        <div className="relative w-full sm:w-72">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search by name or email..."
            className="w-full pl-9 pr-4 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          />
        </div>
      </div>

      {/* Error state */}
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl mb-6">
          {error}
        </div>
      )}

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Citizen</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Phone</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Registered</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {isLoading ? (
                <tr>
                  <td colSpan="4" className="text-center py-16">
                    <div className="flex flex-col items-center gap-2 text-gray-400">
                      <div className="w-8 h-8 border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin" />
                      <span className="text-sm font-medium">Loading citizens...</span>
                    </div>
                  </td>
                </tr>
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan="4" className="text-center py-16">
                    <div className="flex flex-col items-center gap-3 text-gray-400">
                      <Users size={40} className="opacity-30" />
                      <p className="text-sm font-medium">{search ? 'No citizens match your search.' : 'No citizens registered yet.'}</p>
                    </div>
                  </td>
                </tr>
              ) : filtered.map((citizen) => (
                <tr key={citizen._id} className="hover:bg-gray-50/80 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <div className={`w-9 h-9 rounded-full ${getColor(citizen.name)} text-white flex items-center justify-center text-sm font-bold shrink-0`}>
                        {getInitials(citizen.name)}
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-gray-900">{citizen.name}</div>
                        <div className="text-xs text-gray-400">Citizen</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-1.5 text-sm text-gray-600">
                      <Mail size={13} className="text-gray-400" />
                      {citizen.email}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {citizen.phone ? (
                      <div className="flex items-center gap-1.5 text-sm text-gray-600">
                        <Phone size={13} className="text-gray-400" />
                        {citizen.phone}
                      </div>
                    ) : (
                      <span className="text-xs text-gray-400 italic">Not provided</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-1.5 text-sm text-gray-600">
                      <Calendar size={13} className="text-gray-400" />
                      {new Date(citizen.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                    </div>
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
