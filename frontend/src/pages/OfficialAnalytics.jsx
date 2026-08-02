import React, { useState, useEffect } from 'react';
import API from '../services/api';
import {
  PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
} from 'recharts';

const CATEGORY_COLORS = ['#6366f1', '#f59e0b', '#10b981', '#3b82f6', '#f43f5e'];
const STATUS_COLORS = { Pending: '#f59e0b', 'In Progress': '#3b82f6', Resolved: '#10b981' };

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-gray-200 rounded-xl shadow-lg p-3">
        <p className="font-semibold text-gray-800 text-sm">{payload[0].name}</p>
        <p className="text-gray-600 text-sm">Count: <span className="font-bold text-gray-900">{payload[0].value}</span></p>
      </div>
    );
  }
  return null;
};

export default function OfficialAnalytics() {
  const [complaints, setComplaints] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    API.get('/complaints')
      .then(res => setComplaints(res.data))
      .catch(err => console.error(err))
      .finally(() => setIsLoading(false));
  }, []);

  // Aggregate data for Pie chart (by category)
  const categoryData = Object.entries(
    complaints.reduce((acc, c) => {
      acc[c.category] = (acc[c.category] || 0) + 1;
      return acc;
    }, {})
  ).map(([name, value]) => ({ name, value }));

  // Aggregate data for Bar chart (by status)
  const statusData = ['Pending', 'In Progress', 'Resolved'].map(status => ({
    name: status,
    count: complaints.filter(c => c.status === status).length,
  }));

  // Summary stat cards
  const totalResolved = complaints.filter(c => c.status === 'Resolved').length;
  const resolutionRate = complaints.length > 0 ? Math.round((totalResolved / complaints.length) * 100) : 0;
  const pendingCount = complaints.filter(c => c.status === 'Pending').length;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="flex flex-col items-center gap-3 text-gray-400">
          <div className="w-10 h-10 border-2 border-gray-300 border-t-indigo-500 rounded-full animate-spin" />
          <p className="text-sm font-medium">Loading analytics...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Analytics & Reports</h2>
        <p className="text-gray-600 mt-1">Visual breakdown of complaint trends and resolution performance.</p>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Total Complaints', value: complaints.length, color: 'bg-indigo-50 text-indigo-700', icon: '📋' },
          { label: 'Pending', value: pendingCount, color: 'bg-amber-50 text-amber-700', icon: '⏳' },
          { label: 'Resolved', value: totalResolved, color: 'bg-emerald-50 text-emerald-700', icon: '✅' },
          { label: 'Resolution Rate', value: `${resolutionRate}%`, color: 'bg-blue-50 text-blue-700', icon: '📈' },
        ].map(stat => (
          <div key={stat.label} className={`${stat.color} rounded-2xl p-4`}>
            <div className="text-2xl mb-1">{stat.icon}</div>
            <p className="text-2xl font-bold">{stat.value}</p>
            <p className="text-xs font-medium opacity-80 mt-0.5">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pie Chart — Category Breakdown */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-base font-semibold text-gray-900 mb-1">Complaints by Category</h3>
          <p className="text-xs text-gray-500 mb-6">Distribution of issues across categories</p>
          {categoryData.length === 0 ? (
            <div className="h-64 flex items-center justify-center text-gray-400 text-sm">No data available.</div>
          ) : (
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={110}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={CATEGORY_COLORS[index % CATEGORY_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend
                  formatter={(value) => <span className="text-xs text-gray-600 font-medium">{value}</span>}
                />
              </PieChart>
            </ResponsiveContainer>
          )}
        </div>

        {/* Bar Chart — Status Breakdown */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-base font-semibold text-gray-900 mb-1">Complaints by Status</h3>
          <p className="text-xs text-gray-500 mb-6">Current status distribution across all complaints</p>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={statusData} barSize={40}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
              <XAxis
                dataKey="name"
                tick={{ fontSize: 12, fill: '#6b7280' }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 12, fill: '#6b7280' }}
                axisLine={false}
                tickLine={false}
                allowDecimals={false}
              />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: '#f9fafb' }} />
              <Bar dataKey="count" name="Count" radius={[6, 6, 0, 0]}>
                {statusData.map((entry) => (
                  <Cell key={entry.name} fill={STATUS_COLORS[entry.name]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
