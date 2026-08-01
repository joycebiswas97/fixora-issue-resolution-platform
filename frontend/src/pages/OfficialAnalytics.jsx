import React from 'react';
import { BarChart3, TrendingUp, Download, PieChart, Activity } from 'lucide-react';

export default function OfficialAnalytics() {
  // Mock data for analytics
  const overallStats = {
    total: 245,
    resolved: 142,
    inProgress: 68,
    pending: 35
  };

  const categoryStats = [
    { name: 'Sanitation', count: 85, color: 'bg-emerald-500' },
    { name: 'Water Supply', count: 62, color: 'bg-blue-500' },
    { name: 'Infrastructure', count: 54, color: 'bg-amber-500' },
    { name: 'Electricity', count: 31, color: 'bg-purple-500' },
    { name: 'Others', count: 13, color: 'bg-gray-400' }
  ];

  const calculatePercentage = (value, total) => {
    return Math.round((value / total) * 100) || 0;
  };

  return (
    <>
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Analytics & Reports</h2>
          <p className="text-gray-600 mt-1">Track complaint resolution progress and identify trends.</p>
        </div>
        <button className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 flex items-center gap-2 font-medium shadow-sm transition-colors">
          <Download size={18} /> Download Full Report
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        
        {/* Main Progress Overview */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <Activity className="text-brand-blue" size={20} /> Overall Resolution Progress
            </h3>
            <select className="text-sm border border-gray-300 rounded-lg py-1.5 px-3 focus:outline-none focus:ring-1 focus:ring-brand-blue bg-gray-50">
              <option>This Month</option>
              <option>Last 3 Months</option>
              <option>This Year</option>
            </select>
          </div>

          <div className="flex flex-col gap-6">
            {/* Resolved */}
            <div>
              <div className="flex justify-between items-end mb-2">
                <span className="text-sm font-semibold text-gray-700">Resolved Complaints</span>
                <span className="text-sm font-bold text-green-600">{calculatePercentage(overallStats.resolved, overallStats.total)}% ({overallStats.resolved})</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-3">
                <div className="bg-green-500 h-3 rounded-full transition-all duration-1000" style={{ width: `${calculatePercentage(overallStats.resolved, overallStats.total)}%` }}></div>
              </div>
            </div>

            {/* In Progress */}
            <div>
              <div className="flex justify-between items-end mb-2">
                <span className="text-sm font-semibold text-gray-700">In Progress</span>
                <span className="text-sm font-bold text-blue-600">{calculatePercentage(overallStats.inProgress, overallStats.total)}% ({overallStats.inProgress})</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-3">
                <div className="bg-blue-500 h-3 rounded-full transition-all duration-1000" style={{ width: `${calculatePercentage(overallStats.inProgress, overallStats.total)}%` }}></div>
              </div>
            </div>

            {/* Pending */}
            <div>
              <div className="flex justify-between items-end mb-2">
                <span className="text-sm font-semibold text-gray-700">Pending Actions</span>
                <span className="text-sm font-bold text-yellow-600">{calculatePercentage(overallStats.pending, overallStats.total)}% ({overallStats.pending})</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-3">
                <div className="bg-yellow-400 h-3 rounded-full transition-all duration-1000" style={{ width: `${calculatePercentage(overallStats.pending, overallStats.total)}%` }}></div>
              </div>
            </div>
          </div>
          
          <div className="mt-8 pt-6 border-t border-gray-100 grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-3xl font-extrabold text-gray-900">{overallStats.total}</p>
              <p className="text-xs text-gray-500 font-medium uppercase mt-1">Total Issues</p>
            </div>
            <div>
              <p className="text-3xl font-extrabold text-brand-green">{overallStats.resolved}</p>
              <p className="text-xs text-gray-500 font-medium uppercase mt-1">Resolved</p>
            </div>
            <div>
              <p className="text-3xl font-extrabold text-brand-blue">3.2d</p>
              <p className="text-xs text-gray-500 font-medium uppercase mt-1">Avg Resolution</p>
            </div>
          </div>
        </div>

        {/* Category Breakdown */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col">
          <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2 mb-6">
            <PieChart className="text-brand-blue" size={20} /> Issues by Category
          </h3>
          
          <div className="flex-1 flex flex-col justify-center gap-5">
            {categoryStats.map((category, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className={`w-3 h-3 rounded-full ${category.color} shrink-0`}></div>
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium text-gray-700">{category.name}</span>
                    <span className="text-sm font-bold text-gray-900">{category.count}</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-1.5">
                    <div className={`${category.color} h-1.5 rounded-full`} style={{ width: `${calculatePercentage(category.count, overallStats.total)}%` }}></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Trends */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2 mb-6">
          <TrendingUp className="text-brand-blue" size={20} /> Monthly Trend
        </h3>
        <div className="h-48 flex items-end justify-between gap-2 md:gap-4 pt-4">
          {/* Simple CSS Bar Chart representing months */}
          {[
            { month: 'May', val: 40 },
            { month: 'Jun', val: 55 },
            { month: 'Jul', val: 80 },
            { month: 'Aug', val: 65 },
            { month: 'Sep', val: 95 },
            { month: 'Oct', val: 100 }, // Current max
          ].map((item, idx) => (
            <div key={idx} className="flex-1 flex flex-col items-center justify-end h-full group">
              <div className="w-full max-w-[40px] bg-brand-blue-light group-hover:bg-brand-blue rounded-t-md transition-colors relative" style={{ height: `${item.val}%` }}>
                <div className="opacity-0 group-hover:opacity-100 absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs py-1 px-2 rounded transition-opacity whitespace-nowrap">
                  {Math.round((item.val / 100) * 120)} issues
                </div>
              </div>
              <span className="text-xs text-gray-500 font-medium mt-3">{item.month}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
