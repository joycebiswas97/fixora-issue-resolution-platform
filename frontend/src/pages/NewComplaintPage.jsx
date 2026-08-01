import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import API from '../services/api';
import { 
  ArrowLeft, UploadCloud, MapPin, CheckCircle2, ShieldCheck,
  AlertCircle, FileText, Camera, Droplets, Zap, Trash2, HardHat, Info
} from 'lucide-react';

export default function NewComplaintPage() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [locationStatus, setLocationStatus] = useState('Auto Detect');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isHoveringDrop, setIsHoveringDrop] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    location: '',
    description: '',
  });

  const categories = [
    { id: 'water', name: 'Water Supply', icon: Droplets, color: 'text-blue-500', bg: 'bg-blue-50' },
    { id: 'electricity', name: 'Electricity', icon: Zap, color: 'text-yellow-500', bg: 'bg-yellow-50' },
    { id: 'sanitation', name: 'Sanitation', icon: Trash2, color: 'text-emerald-500', bg: 'bg-emerald-50' },
    { id: 'roads', name: 'Roads', icon: HardHat, color: 'text-orange-500', bg: 'bg-orange-50' },
    { id: 'other', name: 'Other Issue', icon: AlertCircle, color: 'text-gray-500', bg: 'bg-gray-50' },
  ];

  const handleGetLocation = () => {
    setLocationStatus('Finding...');
    if (!navigator.geolocation) {
      setLocationStatus('Not Supported');
    } else {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          
          setLatitude(lat);
          setLongitude(lon);
          setLocationStatus('Located! ✓');

          // --- NEW: Reverse Geocoding to translate GPS to text ---
          try {
            setLocationStatus('Translating...'); // Let user know we are fetching the address
            const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`);
            const data = await response.json();
            
            if (data && data.display_name) {
              // Update the input field with the translated address
              setFormData(prevData => ({ ...prevData, location: data.display_name }));
              setLocationStatus('Located! ✓');
            }
          } catch (err) {
            console.error("Could not fetch address text", err);
            setLocationStatus('Located! (Address missing)');
          }
        },
        () => setLocationStatus('Failed ❌')
      );
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // 1. Validation
    if (!formData.category) return setError('Please select a category.');
    if (!latitude || !longitude) return setError('Please click Auto Detect to get GPS location.');

    setIsSubmitting(true);

    // 2. API Call
    try {
      // Create a FormData object to handle both text and physical files
      const submitData = new FormData();
      submitData.append('title', formData.title);
      submitData.append('description', formData.description || '');
      submitData.append('category', formData.category);
      submitData.append('address', formData.location);
      submitData.append('latitude', latitude);
      submitData.append('longitude', longitude);
      
      // If they selected an image, append it to the FormData
      if (imageFile) {
        submitData.append('image', imageFile);
      }

      // Send as multipart/form-data
      await API.post('/complaints', submitData);
      
      setIsSubmitted(true);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to submit complaint');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBackToDashboard = () => {
    navigate('/dashboard/citizen');
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 font-inter">
        <div className="bg-white/80 backdrop-blur-xl p-10 rounded-[2rem] shadow-2xl max-w-lg w-full text-center border border-white/50 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-saffron to-brand-green"></div>
          
          <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg shadow-green-500/30 animate-bounce">
            <CheckCircle2 size={48} className="text-white" />
          </div>
          
          <h2 className="text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">Success!</h2>
          <p className="text-gray-600 mb-8 text-lg leading-relaxed">
            Your complaint has been securely submitted to the Gram Panchayat. You will receive an SMS with tracking details shortly.
          </p>
          
          <div className="bg-gray-50 rounded-2xl p-6 mb-8 text-left border border-gray-100">
            <p className="text-sm text-gray-500 font-medium mb-1">Tracking ID</p>
            <p className="text-xl font-bold text-gray-900 font-mono tracking-widest">GRV-8492</p>
          </div>
          
          <button 
            onClick={handleBackToDashboard}
            className="w-full inline-flex justify-center items-center py-4 px-6 border border-transparent rounded-2xl shadow-xl shadow-saffron/20 text-lg font-bold text-white bg-gradient-to-r from-saffron to-[#f26513] hover:from-[#f26513] hover:to-[#e55a0f] transition-all hover:-translate-y-1"
          >
            Return to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 font-inter pb-20 relative">
      
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-96 bg-brand-green/5 pointer-events-none"></div>
      
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50 border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-6 h-20 flex items-center justify-between">
          <button 
            onClick={() => navigate('/dashboard/citizen')}
            className="flex items-center gap-2 text-gray-500 hover:text-gray-900 transition-colors font-semibold group bg-white hover:bg-gray-50 px-4 py-2 rounded-full border border-gray-200 shadow-sm"
          >
            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
            Back
          </button>
          <div className="flex items-center gap-2 text-2xl font-black text-brand-green tracking-tight">
            <ShieldCheck className="text-saffron drop-shadow-sm" size={32} />
            <span className="hidden sm:inline">GramSeva</span>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 pt-12 relative z-10">
        
        <div className="mb-10 text-center">
          <span className="inline-flex items-center gap-1.5 py-1.5 px-4 rounded-full text-sm font-semibold bg-saffron/10 text-saffron mb-4 border border-saffron/20">
            <AlertCircle size={16} /> New Issue Report
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight">File a Complaint</h1>
          <p className="mt-4 text-lg text-gray-500 max-w-xl mx-auto">
            Help us improve our village. Fill out the details below and attach a photo for faster resolution.
          </p>
        </div>

        <div className="bg-white/90 backdrop-blur-xl rounded-[2.5rem] shadow-2xl shadow-gray-200/50 border border-white p-6 sm:p-12 relative overflow-hidden">
          
          {/* Subtle gradient blob inside card */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-saffron/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
          
          {error && (
            <div className="mb-8 p-4 bg-red-50 border border-red-200 rounded-2xl text-red-600 font-bold relative z-20">
              {error}
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-10 relative z-10">
            
            {/* Section 1: Basic Details */}
            <div className="space-y-8">
              <div className="flex items-center gap-3 border-b border-gray-100 pb-4">
                <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-500 flex items-center justify-center font-bold">1</div>
                <h3 className="text-xl font-bold text-gray-900">Issue Details</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Title */}
                <div className="md:col-span-2">
                  <label htmlFor="title" className="block text-sm font-bold text-gray-700 mb-2">
                    What is the problem? <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                      <FileText size={20} />
                    </div>
                    <input
                      type="text"
                      id="title"
                      required
                      placeholder="e.g., Broken water pipe leaking"
                      className="w-full pl-12 pr-4 py-4 bg-gray-50 border-2 border-gray-100 rounded-2xl focus:bg-white focus:ring-0 focus:border-saffron text-gray-900 font-medium transition-all"
                      value={formData.title}
                      onChange={(e) => setFormData({...formData, title: e.target.value})}
                    />
                  </div>
                </div>

                {/* Category Selection (Visual Grid) */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-bold text-gray-700 mb-3">
                    Select Category <span className="text-red-500">*</span>
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
                    {categories.map((cat) => (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() => setFormData({...formData, category: cat.name})}
                        className={`flex flex-col items-center justify-center p-4 rounded-2xl border-2 transition-all ${
                          formData.category === cat.name 
                            ? 'border-saffron bg-saffron/5 shadow-md shadow-saffron/10' 
                            : 'border-gray-100 bg-white hover:border-gray-200 hover:bg-gray-50'
                        }`}
                      >
                        <div className={`w-12 h-12 rounded-full ${cat.bg} ${cat.color} flex items-center justify-center mb-3`}>
                          <cat.icon size={24} />
                        </div>
                        <span className={`text-sm font-bold ${formData.category === cat.name ? 'text-gray-900' : 'text-gray-600'}`}>
                          {cat.name}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Section 2: Location & Media */}
            <div className="space-y-8 pt-6">
              <div className="flex items-center gap-3 border-b border-gray-100 pb-4">
                <div className="w-10 h-10 rounded-full bg-green-50 text-green-500 flex items-center justify-center font-bold">2</div>
                <h3 className="text-xl font-bold text-gray-900">Location & Evidence</h3>
              </div>

              {/* Location */}
              <div>
                <label htmlFor="location" className="block text-sm font-bold text-gray-700 mb-2">
                  Where is this happening? <span className="text-red-500">*</span>
                </label>
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="relative flex-1">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                      <MapPin size={20} />
                    </div>
                    <input
                      type="text"
                      id="location"
                      required
                      placeholder="Enter specific landmark, street, or ward"
                      className="w-full pl-12 pr-4 py-4 bg-gray-50 border-2 border-gray-100 rounded-2xl focus:bg-white focus:ring-0 focus:border-saffron text-gray-900 font-medium transition-all"
                      value={formData.location}
                      onChange={(e) => setFormData({...formData, location: e.target.value})}
                    />
                  </div>
                  <button type="button" onClick={handleGetLocation} className="px-6 py-4 bg-gray-900 text-white rounded-2xl hover:bg-gray-800 transition-colors flex items-center justify-center font-bold shadow-lg shadow-gray-900/20 whitespace-nowrap">
                    <MapPin size={20} className="mr-2" />
                    {locationStatus}
                  </button>
                </div>
              </div>

              {/* Advanced Photo Upload */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Upload Photo <span className="text-gray-400 font-medium">(Highly Recommended)</span>
                </label>
                <div 
                  className={`mt-2 flex flex-col items-center justify-center px-6 py-12 border-3 border-dashed rounded-3xl transition-all cursor-pointer group ${
                    isHoveringDrop ? 'border-saffron bg-saffron/5' : 'border-gray-200 bg-gray-50 hover:bg-white hover:border-gray-300'
                  }`}
                  onDragOver={(e) => { e.preventDefault(); setIsHoveringDrop(true); }}
                  onDragLeave={() => setIsHoveringDrop(false)}
                  onDrop={(e) => { e.preventDefault(); setIsHoveringDrop(false); }}
                >
                  <div className="relative">
                    <div className="absolute -inset-4 bg-saffron/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <div className="relative w-20 h-20 bg-white shadow-xl shadow-gray-200/50 rounded-full flex items-center justify-center text-saffron mb-6 group-hover:scale-110 transition-transform duration-300">
                      <Camera size={36} />
                    </div>
                  </div>
                  <div className="text-center">
                    <label htmlFor="file-upload" className="relative cursor-pointer rounded-md font-extrabold text-xl text-gray-900 hover:text-saffron transition-colors focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-saffron">
                      {imageFile ? imageFile.name : 'Click to upload photo'}
                      <input id="file-upload" name="file-upload" type="file" className="sr-only" accept="image/*" capture="environment" onChange={(e) => setImageFile(e.target.files[0])}/>
                    </label>
                    <p className="mt-2 text-sm text-gray-500 font-medium">or drag and drop here</p>
                    <p className="mt-4 text-xs text-gray-400 font-medium bg-gray-200/50 inline-block px-3 py-1 rounded-full">PNG, JPG up to 10MB</p>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div>
                <label htmlFor="description" className="block text-sm font-bold text-gray-700 mb-2">
                  Additional Details <span className="text-gray-400 font-medium">(Optional)</span>
                </label>
                <textarea
                  id="description"
                  rows={4}
                  placeholder="Explain the problem in your own words..."
                  className="w-full px-5 py-4 bg-gray-50 border-2 border-gray-100 rounded-2xl focus:bg-white focus:ring-0 focus:border-saffron text-gray-900 font-medium transition-all resize-none"
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                />
              </div>
            </div>

            {/* Information Callout */}
            <div className="bg-blue-50/80 rounded-2xl p-5 flex gap-4 border border-blue-100">
              <Info className="text-blue-500 shrink-0 mt-0.5" size={24} />
              <p className="text-sm text-blue-800 font-medium leading-relaxed">
                By submitting this complaint, you agree that the information provided is true. False reporting may lead to account suspension.
              </p>
            </div>

            {/* Submit Button */}
            <div className="pt-6">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full flex justify-center items-center gap-3 py-5 px-6 border border-transparent rounded-2xl shadow-2xl shadow-saffron/30 text-xl font-black text-white bg-gradient-to-r from-saffron to-[#f26513] transition-all focus:outline-none focus:ring-4 focus:ring-saffron/50 ${
                  isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:from-[#f26513] hover:to-[#e55a0f] hover:-translate-y-1'
                }`}
              >
                {isSubmitting ? 'Submitting...' : 'Submit Complaint Now'}
                {!isSubmitting && <ArrowLeft className="rotate-180" size={24} />}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
