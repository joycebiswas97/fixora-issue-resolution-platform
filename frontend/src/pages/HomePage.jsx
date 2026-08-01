import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { 
  Menu, Camera, MapPin, BellRing, CheckCircle2, 
  Zap, EyeOff, Activity, ShieldCheck, User, Users
} from 'lucide-react';
import LanguageSwitcher from '../components/LanguageSwitcher';
import villageCleaningImg from '../assets/real_village_cleaning.png';
import '../index.css';

export default function HomePage() {
  const [currentLang, setCurrentLang] = useState({ code: 'en', name: 'English', native: 'English' });
  const navigate = useNavigate();
  const { t } = useTranslation();

  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  const userRole = localStorage.getItem('userRole');

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userRole');
    navigate('/');
  };

  const handleProtectedNavigation = (citizenRoute) => {
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
    const userRole = localStorage.getItem('userRole');

    if (isAuthenticated) {
      if (userRole === 'citizen') {
        navigate(citizenRoute);
      } else {
        navigate('/dashboard/official');
      }
    } else {
      navigate('/login', { state: { type: 'citizen' } });
    }
  };

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
            <a href="#" className="font-medium text-saffron transition-colors">{t('nav.home')}</a>
            <a href="#about" className="font-medium text-gray-500 hover:text-saffron transition-colors">{t('nav.about')}</a>
            <a href="#track" className="font-medium text-gray-500 hover:text-saffron transition-colors">{t('nav.track')}</a>
            <a href="#contact" className="font-medium text-gray-500 hover:text-saffron transition-colors">{t('nav.contact')}</a>
          </nav>
          
          <div className="flex items-center gap-4">
            <LanguageSwitcher 
              currentLang={currentLang} 
              onLanguageChange={setCurrentLang} 
            />
            
            {isAuthenticated ? (
              <>
                <Link to={userRole === 'citizen' ? '/dashboard/citizen' : '/dashboard/official'} className="hidden md:inline-flex items-center justify-center font-medium px-6 py-3 border-2 border-saffron text-saffron rounded-lg hover:bg-saffron-light transition-colors">
                  Dashboard
                </Link>
                <button onClick={handleLogout} className="hidden md:inline-flex items-center justify-center font-medium px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors">
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="hidden md:inline-flex items-center justify-center font-medium px-6 py-3 border-2 border-saffron text-saffron rounded-lg hover:bg-saffron-light transition-colors">
                  {t('nav.login')}
                </Link>
                <Link to="/signup" className="hidden md:inline-flex items-center justify-center font-medium px-6 py-3 bg-saffron text-white rounded-lg hover:bg-saffron-dark transition-colors">
                  {t('nav.signup')}
                </Link>
              </>
            )}
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
              {t('hero.title1')} <span className="text-saffron">{t('hero.title2')}</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-8">
              {t('hero.subtitle')}
            </p>
            <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
              <button 
                onClick={() => handleProtectedNavigation('/complaint/new')}
                className="inline-flex items-center justify-center font-medium px-6 py-3 bg-saffron text-white rounded-lg hover:bg-saffron-dark transition-colors text-lg"
              >
                {t('hero.btn_file')}
              </button>
              <button 
                onClick={() => handleProtectedNavigation('/dashboard/citizen/complaints')}
                className="inline-flex items-center justify-center font-medium px-6 py-3 border-2 border-saffron text-saffron rounded-lg hover:bg-saffron-light transition-colors text-lg"
              >
                {t('hero.btn_track')}
              </button>
            </div>
          </div>
          <div className="relative rounded-2xl overflow-hidden shadow-2xl max-w-md mx-auto lg:ml-auto">
            <img 
              src={villageCleaningImg}
              alt="Clean Indian Village" 
              className="w-full h-auto block"
            />
          </div>
        </div>
      </section>

      {/* 3. How It Works (Features Section) */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-gray-900">{t('howItWorks.title')}</h2>
          <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12 text-lg">
            {t('howItWorks.subtitle')}
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            <div className="text-center p-6 bg-off-white rounded-2xl transition-all hover:-translate-y-1 hover:shadow-lg hover:bg-white relative z-10 group">
              <div className="w-16 h-16 bg-saffron-light text-saffron rounded-full flex items-center justify-center mx-auto mb-6">
                <Camera size={32} />
              </div>
              <div className="absolute -top-3 -right-3 w-8 h-8 bg-saffron text-white rounded-full flex items-center justify-center font-bold border-4 border-off-white group-hover:border-white transition-colors">1</div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">{t('howItWorks.step1_title')}</h3>
              <p className="text-gray-500 text-sm">{t('howItWorks.step1_desc')}</p>
            </div>
            
            <div className="text-center p-6 bg-off-white rounded-2xl transition-all hover:-translate-y-1 hover:shadow-lg hover:bg-white relative z-10 group">
              <div className="w-16 h-16 bg-saffron-light text-saffron rounded-full flex items-center justify-center mx-auto mb-6">
                <MapPin size={32} />
              </div>
              <div className="absolute -top-3 -right-3 w-8 h-8 bg-saffron text-white rounded-full flex items-center justify-center font-bold border-4 border-off-white group-hover:border-white transition-colors">2</div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">{t('howItWorks.step2_title')}</h3>
              <p className="text-gray-500 text-sm">{t('howItWorks.step2_desc')}</p>
            </div>
            
            <div className="text-center p-6 bg-off-white rounded-2xl transition-all hover:-translate-y-1 hover:shadow-lg hover:bg-white relative z-10 group">
              <div className="w-16 h-16 bg-saffron-light text-saffron rounded-full flex items-center justify-center mx-auto mb-6">
                <BellRing size={32} />
              </div>
              <div className="absolute -top-3 -right-3 w-8 h-8 bg-saffron text-white rounded-full flex items-center justify-center font-bold border-4 border-off-white group-hover:border-white transition-colors">3</div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">{t('howItWorks.step3_title')}</h3>
              <p className="text-gray-500 text-sm">{t('howItWorks.step3_desc')}</p>
            </div>
            
            <div className="text-center p-6 bg-off-white rounded-2xl transition-all hover:-translate-y-1 hover:shadow-lg hover:bg-white relative z-10 group">
              <div className="w-16 h-16 bg-saffron-light text-saffron rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 size={32} />
              </div>
              <div className="absolute -top-3 -right-3 w-8 h-8 bg-saffron text-white rounded-full flex items-center justify-center font-bold border-4 border-off-white group-hover:border-white transition-colors">4</div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">{t('howItWorks.step4_title')}</h3>
              <p className="text-gray-500 text-sm">{t('howItWorks.step4_desc')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Key Features / Details Section */}
      <section id="about" className="py-20 bg-off-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-gray-900">{t('features.title')}</h2>
          <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12 text-lg">
            {t('features.subtitle')}
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-2xl flex gap-6 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all">
              <div className="shrink-0 w-14 h-14 bg-brand-green-light text-brand-green rounded-xl flex items-center justify-center">
                <Zap size={28} />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900">{t('features.feat1_title')}</h3>
                <p className="text-gray-500">{t('features.feat1_desc')}</p>
              </div>
            </div>
            
            <div className="bg-white p-8 rounded-2xl flex gap-6 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all">
              <div className="shrink-0 w-14 h-14 bg-brand-green-light text-brand-green rounded-xl flex items-center justify-center">
                <Camera size={28} />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900">{t('features.feat2_title')}</h3>
                <p className="text-gray-500">{t('features.feat2_desc')}</p>
              </div>
            </div>
            
            <div className="bg-white p-8 rounded-2xl flex gap-6 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all">
              <div className="shrink-0 w-14 h-14 bg-brand-green-light text-brand-green rounded-xl flex items-center justify-center">
                <Activity size={28} />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900">{t('features.feat3_title')}</h3>
                <p className="text-gray-500">{t('features.feat3_desc')}</p>
              </div>
            </div>
            
            <div className="bg-white p-8 rounded-2xl flex gap-6 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all">
              <div className="shrink-0 w-14 h-14 bg-brand-green-light text-brand-green rounded-xl flex items-center justify-center">
                <EyeOff size={28} />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900">{t('features.feat4_title')}</h3>
                <p className="text-gray-500">{t('features.feat4_desc')}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Login / Portal Access Section */}
      <section id="track" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-gray-900">{t('portal.title')}</h2>
          <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12 text-lg">
            {t('portal.subtitle')}
          </p>
          
          <div className="grid grid-cols-1 gap-8 max-w-2xl mx-auto">
            <div className="p-12 rounded-3xl text-center flex flex-col items-center justify-center bg-gradient-to-br from-saffron-light to-[rgba(244,114,22,0.05)] border border-[rgba(244,114,22,0.2)]">
              <div className="mb-6 p-4 rounded-full bg-white shadow-sm text-saffron">
                <User size={48} />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">{t('portal.citizen_title')}</h3>
              <p className="text-gray-600 mb-8 text-lg">{t('portal.citizen_desc')}</p>
              <Link to="/login" state={{ type: 'citizen' }} className="inline-flex items-center justify-center font-medium px-6 py-3 bg-saffron text-white rounded-lg hover:bg-saffron-dark transition-colors">
                {t('portal.citizen_btn')}
              </Link>
            </div>
            
            <div className="p-12 rounded-3xl text-center flex flex-col items-center justify-center bg-gradient-to-br from-brand-blue-light to-[rgba(0,86,179,0.05)] border border-[rgba(0,86,179,0.2)]">
              <div className="mb-6 p-4 rounded-full bg-white shadow-sm text-brand-blue">
                <Users size={48} />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">{t('portal.official_title')}</h3>
              <p className="text-gray-600 mb-8 text-lg">{t('portal.official_desc')}</p>
              <Link to="/login" state={{ type: 'official' }} className="inline-flex items-center justify-center font-medium px-6 py-3 bg-brand-blue text-white rounded-lg hover:bg-brand-blue-dark transition-colors">
                {t('portal.official_btn')}
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
                <li><button onClick={() => handleProtectedNavigation('/dashboard/citizen/complaints')} className="text-gray-400 hover:text-saffron transition-colors">Track Status</button></li>
                <li><button onClick={() => handleProtectedNavigation('/complaint/new')} className="text-gray-400 hover:text-saffron transition-colors">File Complaint</button></li>
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
