import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import CitizenDashboard from './pages/CitizenDashboard';
import MyComplaintsPage from './pages/MyComplaintsPage';
import OfficialLayout from './components/OfficialLayout';
import OfficialDashboard from './pages/OfficialDashboard';
import OfficialManageIssues from './pages/OfficialManageIssues';
import OfficialCitizens from './pages/OfficialCitizens';
import OfficialAnalytics from './pages/OfficialAnalytics';
import SettingsPage from './pages/SettingsPage';
import NewComplaintPage from './pages/NewComplaintPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/dashboard/citizen" element={<CitizenDashboard />} />
        <Route path="/dashboard/citizen/complaints" element={<MyComplaintsPage />} />
        <Route path="/dashboard/citizen/settings" element={<SettingsPage />} />
        {/* Official Dashboard Routes */}
        <Route path="/dashboard/official" element={<OfficialLayout><OfficialDashboard /></OfficialLayout>} />
        <Route path="/dashboard/official/issues" element={<OfficialLayout><OfficialManageIssues /></OfficialLayout>} />
        <Route path="/dashboard/official/citizens" element={<OfficialLayout><OfficialCitizens /></OfficialLayout>} />
        <Route path="/dashboard/official/analytics" element={<OfficialLayout><OfficialAnalytics /></OfficialLayout>} />
        <Route path="/dashboard/official/settings" element={<OfficialLayout><SettingsPage userType="official" /></OfficialLayout>} />
        <Route path="/complaint/new" element={<NewComplaintPage />} />
      </Routes>
    </Router>
  );
}

export default App;
