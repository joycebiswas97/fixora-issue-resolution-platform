import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import API from '../services/api';
import { ShieldCheck, User, Users, ArrowLeft } from 'lucide-react';

export default function SignupPage() {
  const location = useLocation();
  const [signupType, setSignupType] = useState(location.state?.type || 'citizen');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [officialKey, setOfficialKey] = useState('');
  const [phone, setPhone] = useState('');
  
  // 1. ADDED: State to handle and display errors
  const [error, setError] = useState(''); 

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Clear any previous errors

    if (password !== confirmPassword) {
      return setError('Passwords do not match!');
    }

    try {
      // Backend User model expects 'official' or 'citizen'
      const userRole = signupType === 'official' ? 'official' : 'citizen';

      // Send the data to your backend
      const response = await API.post('/auth/register', { 
        name, 
        email, 
        password,
        role: userRole,
        officialKey: signupType === 'official' ? officialKey : undefined,
        phone: phone 
      });
      
      // Save the token and user data to localStorage
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));

      if (userRole === 'official') {
        navigate('/dashboard/official');
      } else {
        navigate('/dashboard/citizen');
      }
      
    } catch (err) {
      // Capture and display the error message from the backend
      setError(err.response?.data?.message || 'Failed to register account');
      console.error("Signup Error Details:", err.response); // Helps you debug in browser console
    }
  };

  return (
    <div className="min-h-screen bg-off-white flex flex-col justify-center py-12 sm:px-6 lg:px-8 font-inter">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <Link to="/" className="flex items-center gap-2 text-3xl font-bold text-brand-green hover:opacity-90 transition-opacity">
            <ShieldCheck className="text-saffron" size={40} />
            <span>Fixora</span>
          </Link>
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Create an account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <Link to="/login" className="font-medium text-saffron hover:text-saffron-dark transition-colors">
            Sign in
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-xl sm:rounded-2xl sm:px-10 border border-gray-100">
          
          {/* Toggle Switch */}
          <div className="flex flex-col p-1 bg-gray-100 rounded-xl mb-8 space-y-1">
            <button
              onClick={() => setSignupType('citizen')}
              className={`flex-1 flex justify-center items-center gap-2 py-2.5 text-sm font-medium rounded-lg transition-all ${
                signupType === 'citizen' 
                  ? 'bg-white text-saffron shadow-sm ring-1 ring-black/5' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <User size={18} />
              User
            </button>
            <button
              onClick={() => setSignupType('official')}
              className={`flex-1 flex justify-center items-center gap-2 py-2.5 text-sm font-medium rounded-lg transition-all ${
                signupType === 'official' 
                  ? 'bg-white text-brand-blue shadow-sm ring-1 ring-black/5' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <Users size={18} />
              Official
            </button>
          </div>
          {error && (
            <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200 text-sm text-red-600 text-center">
              {error}
            </div>
          )}
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <div className="mt-1">
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="appearance-none block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-saffron focus:border-saffron sm:text-sm transition-colors"
                  placeholder="Enter your full name"
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-saffron focus:border-saffron sm:text-sm transition-colors"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-saffron focus:border-saffron sm:text-sm transition-colors"
                  placeholder="Create a password"
                />
              </div>
            </div>

            {/* Confirm Password Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
              <input 
                type="password" 
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Re-enter your password"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                required
              />
            </div>

             {/* Optional Phone Number Field */}
             <div>
               <label className="block text-sm font-medium text-gray-700">
                 Phone Number <span className="text-gray-400 font-normal">(Optional)</span>
               </label>
               <input 
                 type="tel" 
                 value={phone}
                 onChange={(e) => setPhone(e.target.value)}
                 placeholder="Enter 10-digit mobile number"
                 className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
               />
             </div>

            {signupType === 'official' && (
              <>
                <div>
                  <label htmlFor="department" className="block text-sm font-medium text-gray-700">
                    Department / Authority Name
                  </label>
                  <div className="mt-1">
                    <input
                      id="department"
                      name="department"
                      type="text"
                      required
                      className="appearance-none block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-brand-blue focus:border-brand-blue sm:text-sm transition-colors"
                      placeholder="E.g., Municipal Public Works Dept / Facility Management"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Official Authorization Key</label>
                  <input 
                    type="password" 
                    value={officialKey}
                    onChange={(e) => setOfficialKey(e.target.value)}
                    placeholder="Enter the secret admin code"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                    required
                  />
                </div>
              </>
            )}

            <div>
              <button
                type="submit"
                className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                  signupType === 'citizen'
                    ? 'bg-saffron hover:bg-saffron-dark focus:ring-saffron'
                    : 'bg-brand-blue hover:bg-brand-blue-dark focus:ring-brand-blue'
                }`}
              >
                Sign up
              </button>
            </div>
          </form>
          
          <div className="mt-8">
            <Link to="/" className="flex items-center justify-center gap-2 text-sm text-gray-500 hover:text-gray-900 transition-colors">
              <ArrowLeft size={16} />
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
