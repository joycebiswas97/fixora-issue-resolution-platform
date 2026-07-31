import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ShieldCheck, User, Users, ArrowLeft } from 'lucide-react';

export default function LoginPage() {
  const location = useLocation();
  // If user clicked a specific link on the home page, it passes the type in state. Defaults to citizen.
  const [loginType, setLoginType] = useState(location.state?.type || 'citizen');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (loginType === 'citizen') {
      navigate('/dashboard/citizen');
    } else {
      navigate('/dashboard/official');
    }
  };

  return (
    <div className="min-h-screen bg-off-white flex flex-col justify-center py-12 sm:px-6 lg:px-8 font-inter">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <Link to="/" className="flex items-center gap-2 text-3xl font-bold text-brand-green hover:opacity-90 transition-opacity">
            <ShieldCheck className="text-saffron" size={40} />
            <span>GramSeva</span>
          </Link>
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Welcome back
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Or{' '}
          <Link to="/signup" className="font-medium text-saffron hover:text-saffron-dark transition-colors">
            create a new account
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-xl sm:rounded-2xl sm:px-10 border border-gray-100">
          
          {/* Toggle Switch */}
          <div className="flex flex-col p-1 bg-gray-100 rounded-xl mb-8 space-y-1">
            <button
              onClick={() => setLoginType('citizen')}
              className={`flex-1 flex justify-center items-center gap-2 py-2.5 text-sm font-medium rounded-lg transition-all ${
                loginType === 'citizen' 
                  ? 'bg-white text-saffron shadow-sm ring-1 ring-black/5' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <User size={18} />
              Citizen
            </button>
            <button
              onClick={() => setLoginType('official')}
              className={`flex-1 flex justify-center items-center gap-2 py-2.5 text-sm font-medium rounded-lg transition-all ${
                loginType === 'official' 
                  ? 'bg-white text-brand-blue shadow-sm ring-1 ring-black/5' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <Users size={18} />
              Official
            </button>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
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
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-saffron focus:border-saffron sm:text-sm transition-colors"
                  placeholder="Enter your password"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-saffron focus:ring-saffron border-gray-300 rounded cursor-pointer"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900 cursor-pointer">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a href="#" className="font-medium text-saffron hover:text-saffron-dark transition-colors">
                  Forgot your password?
                </a>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                  loginType === 'citizen'
                    ? 'bg-saffron hover:bg-saffron-dark focus:ring-saffron'
                    : 'bg-brand-blue hover:bg-brand-blue-dark focus:ring-brand-blue'
                }`}
              >
                Sign in
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
