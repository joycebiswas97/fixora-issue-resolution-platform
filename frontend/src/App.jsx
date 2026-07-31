import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import CitizenDashboard from './pages/CitizenDashboard';
import OfficialDashboard from './pages/OfficialDashboard';
import NewComplaintPage from './pages/NewComplaintPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/dashboard/citizen" element={<CitizenDashboard />} />
        <Route path="/dashboard/official" element={<OfficialDashboard />} />
        <Route path="/complaint/new" element={<NewComplaintPage />} />
      </Routes>
    </Router>
  );
}

export default App;
