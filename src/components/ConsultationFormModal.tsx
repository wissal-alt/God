import { X } from 'lucide-react';
import { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { supabase } from '../lib/supabaseClient';

interface ConsultationFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  isDarkMode: boolean;
}

export default function ConsultationFormModal({ isOpen, onClose, isDarkMode }: ConsultationFormModalProps) {
  const { isDark } = useTheme();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const { error: submitError } = await supabase
        .from('consultation_submissions')
        .insert([
          {
            first_name: formData.firstName,
            last_name: formData.lastName || null,
            phone: formData.phone,
            email: formData.email,
            message: formData.message,
          },
        ]);

      if (submitError) throw submitError;

      setIsSubmitted(true);
      setFormData({
        firstName: '',
        lastName: '',
        phone: '',
        email: '',
        message: '',
      });

      setTimeout(() => {
        onClose();
        setIsSubmitted(false);
      }, 3000);
    } catch (err) {
      setError('Something went wrong. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className={`${isDark ? 'bg-[#1a1a2a]' : 'bg-white'} rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto`}>
        <div className={`${isDark ? 'bg-[#252540]' : 'bg-amber-50'} px-8 py-6 flex items-center justify-between border-b ${isDark ? 'border-amber-900/30' : 'border-amber-100'}`}>
          <h2 className={`text-2xl font-semibold ${isDark ? 'text-white' : 'text-amber-900'}`} style={{ fontFamily: "'DM Serif Text', serif" }}>
            Share Your Vision
          </h2>
          <button
            onClick={onClose}
            className={`p-1 rounded-lg transition-colors ${isDark ? 'hover:bg-amber-900/30 text-gray-400 hover:text-white' : 'hover:bg-amber-100 text-gray-600 hover:text-amber-900'}`}
          >
            <X size={24} />
          </button>
        </div>

        <div className="p-8">
          {isSubmitted ? (
            <div className="text-center py-12">
              <div className="mb-6">
                <div className={`w-16 h-16 rounded-full ${isDark ? 'bg-amber-900/20' : 'bg-amber-50'} flex items-center justify-center mx-auto`}>
                  <svg className="w-8 h-8 text-amber-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
              <h3 className={`text-2xl font-semibold ${isDark ? 'text-white' : 'text-amber-900'} mb-3`} style={{ fontFamily: "'DM Serif Text', serif" }}>
                Thank You!
              </h3>
              <p className={`text-lg ${isDark ? 'text-gray-300' : 'text-gray-700'} leading-relaxed`}>
                Thank you for sharing your vision with us! We've received your message and will reach out soon to begin bringing your dream to life.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <label className={`block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                    First Name <span className="text-amber-600">*</span>
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="What should we call you?"
                    required
                    className={`w-full px-4 py-3 rounded-xl border ${isDark ? 'bg-[#111133] border-amber-900/30 text-white placeholder-gray-500 focus:border-amber-700' : 'bg-white border-amber-200 text-gray-900 placeholder-gray-400 focus:border-amber-400'} focus:outline-none focus:ring-2 focus:ring-amber-600/30 transition-all`}
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Your family name"
                    className={`w-full px-4 py-3 rounded-xl border ${isDark ? 'bg-[#111133] border-amber-900/30 text-white placeholder-gray-500 focus:border-amber-700' : 'bg-white border-amber-200 text-gray-900 placeholder-gray-400 focus:border-amber-400'} focus:outline-none focus:ring-2 focus:ring-amber-600/30 transition-all`}
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <label className={`block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                    Phone <span className="text-amber-600">*</span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="How can we reach you?"
                    required
                    className={`w-full px-4 py-3 rounded-xl border ${isDark ? 'bg-[#111133] border-amber-900/30 text-white placeholder-gray-500 focus:border-amber-700' : 'bg-white border-amber-200 text-gray-900 placeholder-gray-400 focus:border-amber-400'} focus:outline-none focus:ring-2 focus:ring-amber-600/30 transition-all`}
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                    Email <span className="text-amber-600">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Your email address"
                    required
                    className={`w-full px-4 py-3 rounded-xl border ${isDark ? 'bg-[#111133] border-amber-900/30 text-white placeholder-gray-500 focus:border-amber-700' : 'bg-white border-amber-200 text-gray-900 placeholder-gray-400 focus:border-amber-400'} focus:outline-none focus:ring-2 focus:ring-amber-600/30 transition-all`}
                  />
                </div>
              </div>

              <div>
                <label className={`block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                  Your Vision <span className="text-amber-600">*</span>
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Share your vision with us... What would you love to create? Describe your dream space, style preferences, and how you imagine using this piece in your home."
                  required
                  rows={5}
                  className={`w-full px-4 py-3 rounded-xl border ${isDark ? 'bg-[#111133] border-amber-900/30 text-white placeholder-gray-500 focus:border-amber-700' : 'bg-white border-amber-200 text-gray-900 placeholder-gray-400 focus:border-amber-400'} focus:outline-none focus:ring-2 focus:ring-amber-600/30 transition-all resize-none`}
                />
              </div>

              {error && (
                <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-700">
                  {error}
                </div>
              )}

              <div className="flex gap-3 pt-6">
                <button
                  type="button"
                  onClick={onClose}
                  className={`flex-1 px-6 py-3 rounded-xl font-medium transition-all ${isDark ? 'bg-gray-800 hover:bg-gray-700 text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-900'}`}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`flex-1 px-6 py-3 rounded-xl font-medium transition-all transform hover:-translate-y-0.5 ${isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-lg'} bg-amber-900 hover:bg-amber-800 text-white`}
                >
                  {isLoading ? 'Sending...' : 'Let\'s Create Together'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
