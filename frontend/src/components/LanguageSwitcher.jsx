import React, { useState, useRef, useEffect } from 'react';
import { Globe, Search, ChevronDown, Check, Loader2 } from 'lucide-react';

const LANGUAGES = [
  { code: 'en', name: 'English', native: 'English' },
  { code: 'as', name: 'Assamese', native: 'অসমীয়া' },
  { code: 'bn', name: 'Bengali', native: 'বাংলা' },
  { code: 'brx', name: 'Bodo', native: 'बड़ो' },
  { code: 'doi', name: 'Dogri', native: 'डोगरी' },
  { code: 'gu', name: 'Gujarati', native: 'ગુજરાતી' },
  { code: 'hi', name: 'Hindi', native: 'हिन्दी' },
  { code: 'kn', name: 'Kannada', native: 'ಕನ್ನಡ' },
  { code: 'ks', name: 'Kashmiri', native: 'कॉशुर / کأشُر' },
  { code: 'kok', name: 'Konkani', native: 'कोंकणी' },
  { code: 'mai', name: 'Maithili', native: 'मैथिली' },
  { code: 'ml', name: 'Malayalam', native: 'മലയാളം' },
  { code: 'mni', name: 'Manipuri', native: 'ꯃꯤꯇꯩꯂꯣꯟ' },
  { code: 'mr', name: 'Marathi', native: 'मराठी' },
  { code: 'ne', name: 'Nepali', native: 'नेपाली' },
  { code: 'or', name: 'Odia', native: 'ଓଡ଼ିଆ' },
  { code: 'pa', name: 'Punjabi', native: 'ਪੰਜਾਬੀ' },
  { code: 'sa', name: 'Sanskrit', native: 'संस्कृतम्' },
  { code: 'sat', name: 'Santali', native: 'ᱥᱟᱱᱛᱟᱲᱤ' },
  { code: 'sd', name: 'Sindhi', native: 'سنڌي' },
  { code: 'ta', name: 'Tamil', native: 'தமிழ்' },
  { code: 'te', name: 'Telugu', native: 'తెలుగు' },
  { code: 'ur', name: 'Urdu', native: 'اردو' }
];

export default function LanguageSwitcher({ currentLang, onLanguageChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredLanguages = LANGUAGES.filter(
    (lang) =>
      lang.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lang.native.includes(searchQuery)
  );

  const handleSelect = (lang) => {
    if (lang.code === currentLang.code) {
      setIsOpen(false);
      return;
    }
    
    setIsLoading(true);
    // Simulate translation delay
    setTimeout(() => {
      onLanguageChange(lang);
      setIsLoading(false);
      setIsOpen(false);
      setSearchQuery('');
    }, 1000);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 font-medium text-gray-700 hover:bg-gray-100 px-3 py-2 rounded-lg transition-colors"
        aria-label="Select Language"
      >
        {isLoading ? (
          <Loader2 size={20} className="animate-spin text-saffron" />
        ) : (
          <Globe size={20} className={isOpen ? 'text-saffron' : ''} />
        )}
        <span className="hidden sm:inline">{currentLang.name}</span>
        <ChevronDown size={16} className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-[calc(100vw-2rem)] sm:w-80 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-50 fixed sm:absolute top-16 sm:top-auto right-4 sm:right-0">
          <div className="p-3 border-b border-gray-100 bg-gray-50/50">
            <div className="relative">
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search language..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-saffron/20 focus:border-saffron transition-all"
                autoFocus
              />
            </div>
          </div>
          
          <div className="max-h-[60vh] sm:max-h-96 overflow-y-auto overscroll-contain custom-scrollbar">
            {filteredLanguages.length === 0 ? (
              <div className="p-4 text-center text-sm text-gray-500">
                No languages found matching "{searchQuery}"
              </div>
            ) : (
              <ul className="p-2 space-y-1">
                {filteredLanguages.map((lang) => (
                  <li key={lang.code}>
                    <button
                      onClick={() => handleSelect(lang)}
                      className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm transition-colors ${
                        currentLang.code === lang.code
                          ? 'bg-saffron/10 text-saffron font-medium'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span>{lang.name}</span>
                        <span className="text-gray-400 text-xs">-</span>
                        <span className={currentLang.code === lang.code ? 'text-saffron/80' : 'text-gray-500'}>
                          {lang.native}
                        </span>
                      </div>
                      {currentLang.code === lang.code && (
                        <Check size={16} className="text-saffron" />
                      )}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
