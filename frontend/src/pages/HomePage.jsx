import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Menu, Camera, MapPin, BellRing, CheckCircle2, 
  Zap, EyeOff, Activity, ShieldCheck, User, Users
} from 'lucide-react';
import LanguageSwitcher from '../components/LanguageSwitcher';
import '../index.css';

export default function HomePage() {
  const [currentLang, setCurrentLang] = useState({ code: 'en', name: 'English', native: 'English' });

  return (
    <>
      {/* 1. Header / Navbar */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center h-18">
          <div className="flex items-center gap-2 text-2xl font-bold text-brand-green">
            <ShieldCheck className="text-saffron" size={32} />
            <span>GramSeva</span>
          </div>
          
          <nav className="hidden md:flex gap-8">
            <a href="#" className="font-medium text-saffron transition-colors">Home</a>
            <a href="#about" className="font-medium text-gray-500 hover:text-saffron transition-colors">About</a>
            <a href="#track" className="font-medium text-gray-500 hover:text-saffron transition-colors">Track Complaint</a>
            <a href="#contact" className="font-medium text-gray-500 hover:text-saffron transition-colors">Contact</a>
          </nav>
          
          <div className="flex items-center gap-4">
            <LanguageSwitcher 
              currentLang={currentLang} 
              onLanguageChange={setCurrentLang} 
            />
            <Link to="/login" className="hidden md:inline-flex items-center justify-center font-medium px-6 py-3 border-2 border-saffron text-saffron rounded-lg hover:bg-saffron-light transition-colors">
              Login
            </Link>
            <Link to="/signup" className="hidden md:inline-flex items-center justify-center font-medium px-6 py-3 bg-saffron text-white rounded-lg hover:bg-saffron-dark transition-colors">
              Sign Up
            </Link>
            <button className="md:hidden text-gray-900">
              <Menu size={28} />
            </button>
          </div>
        </div>
      </header>

      {/* 2. Hero Section */}
      <section className="py-20 bg-gradient-to-br from-saffron-light to-off-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="max-w-2xl mx-auto lg:mx-0 text-center lg:text-left">
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight mb-6">
              Empowering Villages, <span className="text-saffron">Connecting Communities</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-8">
              Report local issues like garbage dumps, broken roads, or water supply problems directly to your Gram Panchayat in just one click.
            </p>
            <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
              <button className="inline-flex items-center justify-center font-medium px-6 py-3 bg-saffron text-white rounded-lg hover:bg-saffron-dark transition-colors text-lg">
                File a New Complaint
              </button>
              <button className="inline-flex items-center justify-center font-medium px-6 py-3 border-2 border-saffron text-saffron rounded-lg hover:bg-saffron-light transition-colors text-lg">
                Track Status
              </button>
            </div>
          </div>
          <div className="relative rounded-2xl overflow-hidden shadow-2xl">
            <img 
              src="https://images.unsplash.com/photo-1542385011-37d4f9bfdf6f?q=80&w=1470&auto=format&fit=crop" 
              alt="Clean Indian Village" 
              className="w-full h-auto block"
            />
          </div>
        </div>
      </section>

      {/* 3. How It Works (Features Section) */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-gray-900">How It Works</h2>
          <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12 text-lg">
            A simple and transparent process to get your civic issues resolved quickly by the local authorities.
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            <div className="text-center p-6 bg-off-white rounded-2xl transition-all hover:-translate-y-1 hover:shadow-lg hover:bg-white relative z-10 group">
              <div className="w-16 h-16 bg-saffron-light text-saffron rounded-full flex items-center justify-center mx-auto mb-6">
                <Camera size={32} />
              </div>
              <div className="absolute -top-3 -right-3 w-8 h-8 bg-saffron text-white rounded-full flex items-center justify-center font-bold border-4 border-off-white group-hover:border-white transition-colors">1</div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Spot the Issue</h3>
              <p className="text-gray-500 text-sm">See garbage or a civic problem? Take a photo with your mobile phone.</p>
            </div>
            
            <div className="text-center p-6 bg-off-white rounded-2xl transition-all hover:-translate-y-1 hover:shadow-lg hover:bg-white relative z-10 group">
              <div className="w-16 h-16 bg-saffron-light text-saffron rounded-full flex items-center justify-center mx-auto mb-6">
                <MapPin size={32} />
              </div>
              <div className="absolute -top-3 -right-3 w-8 h-8 bg-saffron text-white rounded-full flex items-center justify-center font-bold border-4 border-off-white group-hover:border-white transition-colors">2</div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Report</h3>
              <p className="text-gray-500 text-sm">Upload the photo, add your location, and submit the complaint securely.</p>
            </div>
            
            <div className="text-center p-6 bg-off-white rounded-2xl transition-all hover:-translate-y-1 hover:shadow-lg hover:bg-white relative z-10 group">
              <div className="w-16 h-16 bg-saffron-light text-saffron rounded-full flex items-center justify-center mx-auto mb-6">
                <BellRing size={32} />
              </div>
              <div className="absolute -top-3 -right-3 w-8 h-8 bg-saffron text-white rounded-full flex items-center justify-center font-bold border-4 border-off-white group-hover:border-white transition-colors">3</div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Panchayat Notified</h3>
              <p className="text-gray-500 text-sm">The local officials receive an instant alert about the reported issue.</p>
            </div>
            
            <div className="text-center p-6 bg-off-white rounded-2xl transition-all hover:-translate-y-1 hover:shadow-lg hover:bg-white relative z-10 group">
              <div className="w-16 h-16 bg-saffron-light text-saffron rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 size={32} />
              </div>
              <div className="absolute -top-3 -right-3 w-8 h-8 bg-saffron text-white rounded-full flex items-center justify-center font-bold border-4 border-off-white group-hover:border-white transition-colors">4</div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Resolution</h3>
              <p className="text-gray-500 text-sm">Track the progress in real-time until the Panchayat marks it as "Resolved".</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Key Features / Details Section */}
      <section id="about" className="py-20 bg-off-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-gray-900">Why Use GramSeva?</h2>
          <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12 text-lg">
            Built specifically for rural citizens with simplicity and reliability in mind.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-2xl flex gap-6 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all">
              <div className="shrink-0 w-14 h-14 bg-brand-green-light text-brand-green rounded-xl flex items-center justify-center">
                <Zap size={28} />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900">Quick Resolution</h3>
                <p className="text-gray-500">Direct line to Panchayat members ensures your voice is heard without bureaucratic delays.</p>
              </div>
            </div>
            
            <div className="bg-white p-8 rounded-2xl flex gap-6 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all">
              <div className="shrink-0 w-14 h-14 bg-brand-green-light text-brand-green rounded-xl flex items-center justify-center">
                <Camera size={28} />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900">Photo & GPS Support</h3>
                <p className="text-gray-500">Attach live evidence with compressed images suitable for rural internet speeds.</p>
              </div>
            </div>
            
            <div className="bg-white p-8 rounded-2xl flex gap-6 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all">
              <div className="shrink-0 w-14 h-14 bg-brand-green-light text-brand-green rounded-xl flex items-center justify-center">
                <Activity size={28} />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900">Transparent Tracking</h3>
                <p className="text-gray-500">Get SMS updates and see real-time progress on your complaint dashboard.</p>
              </div>
            </div>
            
            <div className="bg-white p-8 rounded-2xl flex gap-6 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all">
              <div className="shrink-0 w-14 h-14 bg-brand-green-light text-brand-green rounded-xl flex items-center justify-center">
                <EyeOff size={28} />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900">Anonymous Reporting</h3>
                <p className="text-gray-500">Option to hide your identity for safety when reporting sensitive issues.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Login / Portal Access Section */}
      <section id="track" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-gray-900">Portal Access</h2>
          <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12 text-lg">
            Simple OTP-based login tailored for our rural communities.
          </p>
          
          <div className="grid grid-cols-1 gap-8 max-w-2xl mx-auto">
            <div className="p-12 rounded-3xl text-center flex flex-col items-center justify-center bg-gradient-to-br from-saffron-light to-[rgba(244,114,22,0.05)] border border-[rgba(244,114,22,0.2)]">
              <div className="mb-6 p-4 rounded-full bg-white shadow-sm text-saffron">
                <User size={48} />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">For Citizens</h3>
              <p className="text-gray-600 mb-8 text-lg">Are you a resident? Login to track your complaints.</p>
              <Link to="/login" state={{ type: 'citizen' }} className="inline-flex items-center justify-center font-medium px-6 py-3 bg-saffron text-white rounded-lg hover:bg-saffron-dark transition-colors">
                Citizen Login
              </Link>
            </div>
            
            <div className="p-12 rounded-3xl text-center flex flex-col items-center justify-center bg-gradient-to-br from-brand-blue-light to-[rgba(0,86,179,0.05)] border border-[rgba(0,86,179,0.2)]">
              <div className="mb-6 p-4 rounded-full bg-white shadow-sm text-brand-blue">
                <Users size={48} />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">For Officials</h3>
              <p className="text-gray-600 mb-8 text-lg">Are you a Panchayat Member? Login to manage and resolve issues.</p>
              <Link to="/login" state={{ type: 'official' }} className="inline-flex items-center justify-center font-medium px-6 py-3 bg-brand-blue text-white rounded-lg hover:bg-brand-blue-dark transition-colors">
                Official Dashboard
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Footer */}
      <footer id="contact" className="bg-[#1A1A1A] text-white pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
            <div className="lg:col-span-2">
              <div className="flex items-center gap-2 text-2xl font-bold text-white mb-4">
                <ShieldCheck size={28} />
                <span>GramSeva</span>
              </div>
              <p className="text-gray-400 mb-6 leading-relaxed">
                Bridging the gap between rural citizens and the local Panchayat to resolve civic issues efficiently.
              </p>
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-white hover:bg-saffron transition-colors">FB</a>
                <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-white hover:bg-saffron transition-colors">TW</a>
                <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-white hover:bg-saffron transition-colors">IG</a>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-white mb-6">Quick Links</h3>
              <ul className="space-y-3">
                <li><a href="#" className="text-gray-400 hover:text-saffron transition-colors">Home</a></li>
                <li><a href="#about" className="text-gray-400 hover:text-saffron transition-colors">About Us</a></li>
                <li><a href="#track" className="text-gray-400 hover:text-saffron transition-colors">Track Status</a></li>
                <li><a href="#" className="text-gray-400 hover:text-saffron transition-colors">File Complaint</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-white mb-6">Support</h3>
              <ul className="space-y-3">
                <li><a href="#" className="text-gray-400 hover:text-saffron transition-colors">Help Center</a></li>
                <li><a href="#" className="text-gray-400 hover:text-saffron transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="text-gray-400 hover:text-saffron transition-colors">Terms of Service</a></li>
                <li><a href="#" className="text-gray-400 hover:text-saffron transition-colors">Language Help</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-white mb-6">Emergency Contact</h3>
              <div className="bg-[rgba(244,114,22,0.1)] border border-[rgba(244,114,22,0.2)] p-4 rounded-lg">
                <h4 className="text-saffron text-sm mb-1">Panchayat Helpline</h4>
                <p className="font-semibold text-lg text-white">1800-111-2222</p>
              </div>
            </div>
          </div>
          
          <div className="pt-8 border-t border-gray-800 text-center text-gray-500 text-sm">
            <p>&copy; {new Date().getFullYear()} GramSeva. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </>
  );
}
