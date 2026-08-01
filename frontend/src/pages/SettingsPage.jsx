import React, { useState, useEffect } from 'react';
import {
  User, Bell, Globe, Moon, Sun, Monitor, Save, Shield
} from 'lucide-react';
import CitizenLayout from '../components/CitizenLayout';

export default function SettingsPage() {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'system');
  const [language, setLanguage] = useState('en');
  const [notifications, setNotifications] = useState(true);

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');

    if (theme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      root.classList.add(systemTheme);
    } else {
      root.classList.add(theme);
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <CitizenLayout title="Account Settings">

      <div className="max-w-4xl space-y-6">

        {/* Profile Settings */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-100 dark:border-gray-700 flex items-center gap-3">
            <User className="text-brand-green dark:text-green-400" size={24} />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Personal Information</h3>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Full Name</label>
                <input
                  type="text"
                  defaultValue="Rahul Chauhan"
                  className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:ring-saffron focus:border-saffron sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Phone Number</label>
                <input
                  type="tel"
                  defaultValue="+91 98765 43210"
                  className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:ring-saffron focus:border-saffron sm:text-sm"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Aadhaar Number (Optional)</label>
                <input
                  type="text"
                  defaultValue="XXXX-XXXX-1234"
                  disabled
                  className="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-500 dark:text-gray-400 rounded-lg sm:text-sm cursor-not-allowed"
                />
                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
                  <Shield size={12} /> Aadhaar is verified and cannot be changed here.
                </p>
              </div>
            </div>
            <div className="mt-6 flex justify-end">
              <button className="flex items-center gap-2 px-4 py-2.5 bg-gray-900 text-white font-medium rounded-lg hover:bg-gray-800 transition-colors">
                <Save size={18} /> Save Changes
              </button>
            </div>
          </div>
        </div>

        {/* Preferences Settings */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-100 dark:border-gray-700 flex items-center gap-3">
            <Globe className="text-saffron" size={24} />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">App Preferences</h3>
          </div>
          <div className="p-6 space-y-8">

            {/* Theme Toggle */}
            <div>
              <h4 className="text-sm font-medium text-gray-900 dark:text-gray-200 mb-3">Theme Selection</h4>
              <div className="grid grid-cols-3 gap-4 max-w-lg">
                <button
                  onClick={() => setTheme('light')}
                  className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all ${theme === 'light' ? 'border-saffron bg-saffron/5 dark:bg-saffron/20' : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500 bg-white dark:bg-gray-700'}`}
                >
                  <Sun size={24} className={theme === 'light' ? 'text-saffron' : 'text-gray-400 dark:text-gray-400'} />
                  <span className={`text-sm font-medium ${theme === 'light' ? 'text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-400'}`}>Light</span>
                </button>
                <button
                  onClick={() => setTheme('dark')}
                  className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all ${theme === 'dark' ? 'border-saffron bg-saffron/5 dark:bg-saffron/20' : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500 bg-white dark:bg-gray-700'}`}
                >
                  <Moon size={24} className={theme === 'dark' ? 'text-saffron' : 'text-gray-400 dark:text-gray-400'} />
                  <span className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-400'}`}>Dark</span>
                </button>
                <button
                  onClick={() => setTheme('system')}
                  className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all ${theme === 'system' ? 'border-saffron bg-saffron/5 dark:bg-saffron/20' : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500 bg-white dark:bg-gray-700'}`}
                >
                  <Monitor size={24} className={theme === 'system' ? 'text-saffron' : 'text-gray-400 dark:text-gray-400'} />
                  <span className={`text-sm font-medium ${theme === 'system' ? 'text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-400'}`}>System</span>
                </button>
              </div>
            </div>

            <hr className="border-gray-100 dark:border-gray-700" />

            {/* Language Selection */}
            <div>
              <h4 className="text-sm font-medium text-gray-900 dark:text-gray-200 mb-3">Language</h4>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="w-full max-w-sm px-4 py-2.5 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:ring-saffron focus:border-saffron sm:text-sm"
              >
                <option value="en">English</option>
                <option value="hi">हिंदी (Hindi)</option>
                <option value="bn">বাংলা (Bengali)</option>
                <option value="te">తెలుగు (Telugu)</option>
                <option value="mr">मराठी (Marathi)</option>
              </select>
            </div>

            <hr className="border-gray-100 dark:border-gray-700" />

            {/* Notifications */}
            <div className="flex items-center justify-between max-w-sm">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${notifications ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-500' : 'bg-gray-100 dark:bg-gray-700 text-gray-400'}`}>
                  <Bell size={20} />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-gray-200">SMS Notifications</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Receive updates on complaints</p>
                </div>
              </div>
              <button
                onClick={() => setNotifications(!notifications)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${notifications ? 'bg-brand-green' : 'bg-gray-300'}`}
              >
                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${notifications ? 'translate-x-6' : 'translate-x-1'}`} />
              </button>
            </div>

          </div>
        </div>

      </div>
    </CitizenLayout>
  );
}
