import React, { useState } from 'react';
import { User, Mail, Phone, Lock, CheckCircle2 } from 'lucide-react';

export default function OfficialSettings() {
  const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
  const [formData, setFormData] = useState({
    name: storedUser.name || '',
    email: storedUser.email || '',
    phone: storedUser.phone || '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [showSuccess, setShowSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = e => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.newPassword && formData.newPassword !== formData.confirmPassword) {
      alert('New passwords do not match!');
      return;
    }
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 4000);
    }, 1000);
  };

  const InputField = ({ label, name, type = 'text', icon: Icon, placeholder }) => (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1.5">{label}</label>
      <div className="relative">
        {Icon && <Icon size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />}
        <input
          type={type}
          name={name}
          value={formData[name]}
          onChange={handleChange}
          placeholder={placeholder}
          className={`w-full ${Icon ? 'pl-10' : 'pl-4'} pr-4 py-3 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-gray-50 focus:bg-white`}
        />
      </div>
    </div>
  );

  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Settings</h2>
        <p className="text-gray-600 mt-1">Update your profile information and account password.</p>
      </div>

      {/* Success Toast */}
      {showSuccess && (
        <div className="mb-6 flex items-center gap-3 p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-700 text-sm font-medium animate-pulse">
          <CheckCircle2 size={18} />
          Profile updated successfully!
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
        {/* Profile Section */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          {/* Avatar Preview */}
          <div className="flex items-center gap-4 mb-6 pb-6 border-b border-gray-100">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-2xl font-bold shadow-lg shadow-blue-200">
              {formData.name?.charAt(0).toUpperCase() || 'O'}
            </div>
            <div>
              <p className="font-semibold text-gray-900">{formData.name || 'Official'}</p>
              <p className="text-sm text-gray-500">{formData.email}</p>
              <span className="inline-block mt-1 text-xs font-medium bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">
                Authority Official
              </span>
            </div>
          </div>

          <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide mb-4">Profile Information</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <InputField label="Full Name" name="name" icon={User} placeholder="Your full name" />
            <InputField label="Email Address" name="email" type="email" icon={Mail} placeholder="your@email.com" />
            <InputField label="Phone Number" name="phone" type="tel" icon={Phone} placeholder="+91 XXXXX XXXXX" />
          </div>
        </div>

        {/* Password Section */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide mb-4">Change Password</h3>
          <div className="space-y-4">
            <InputField label="Current Password" name="currentPassword" type="password" icon={Lock} placeholder="Enter current password" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <InputField label="New Password" name="newPassword" type="password" icon={Lock} placeholder="New password" />
              <InputField label="Confirm New Password" name="confirmPassword" type="password" icon={Lock} placeholder="Re-enter new password" />
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-sm font-semibold rounded-xl hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all shadow-lg shadow-blue-200 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <span className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Saving...
              </span>
            ) : 'Save Changes'}
          </button>
        </div>
      </form>
    </div>
  );
}
