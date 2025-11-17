import { useTheme } from '../context/ThemeContext';
import { Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  const { isDark } = useTheme();

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className={`${isDark ? 'bg-[#0a0a1a]' : 'bg-stone-50'} transition-colors duration-300`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="space-y-4">
            <img
              src="/retouch_2025111011403977.png"
              alt="PGD Wooden House Logo"
              className="w-32 h-auto mb-2"
            />
            <p className={`text-sm leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              Crafted with dedication in Jepara, Indonesia.
            </p>
          </div>

          <div className="space-y-4">
            <h4 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-amber-900'}`} style={{ fontFamily: "'DM Serif Text', serif" }}>
              Quick Links
            </h4>
            <nav className="space-y-3">
              {['home', 'collections', 'products', 'about', 'faq', 'consultation', 'rare-finds', 'contact'].map((link) => (
                <button
                  key={link}
                  onClick={() => scrollToSection(link)}
                  className={`block text-sm transition-colors duration-200 capitalize ${
                    isDark
                      ? 'text-gray-400 hover:text-amber-500'
                      : 'text-gray-600 hover:text-amber-900'
                  }`}
                >
                  {link.replace('-', ' ')}
                </button>
              ))}
            </nav>
          </div>

          <div className="space-y-4">
            <h4 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-amber-900'}`} style={{ fontFamily: "'DM Serif Text', serif" }}>
              Contact
            </h4>
            <div className="space-y-3">
              <a href="mailto:info@pgdwoodenhouse.com" className={`flex items-center gap-3 text-sm transition-colors duration-200 ${
                isDark ? 'text-gray-400 hover:text-amber-500' : 'text-gray-600 hover:text-amber-900'
              }`}>
                <Mail className="w-4 h-4" />
                info@pgdwoodenhouse.com
              </a>
              <a href="tel:081328835401" className={`flex items-center gap-3 text-sm transition-colors duration-200 ${
                isDark ? 'text-gray-400 hover:text-amber-500' : 'text-gray-600 hover:text-amber-900'
              }`}>
                <Phone className="w-4 h-4" />
                081328835401
              </a>
              <div className={`flex items-start gap-3 text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>Jepara, Central Java 59431, Indonesia</span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-amber-900'}`} style={{ fontFamily: "'DM Serif Text', serif" }}>
              Business Hours
            </h4>
            <div className={`text-sm space-y-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              <p>Monday - Friday</p>
              <p>9:00 AM - 6:00 PM</p>
              <p className="pt-2">Saturday - Sunday</p>
              <p>Closed</p>
            </div>
          </div>
        </div>

        <div className={`border-t ${isDark ? 'border-gray-800' : 'border-stone-200'} pt-8 pb-6`}>
          <p className={`text-sm text-center ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            © 2025 PGD Wooden House. All rights reserved.
          </p>
        </div>

        <div className={`text-center text-sm ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
          <span>Powered by </span>
          <a
            href="https://wissi.space"
            target="_blank"
            rel="noopener noreferrer"
            className="wissi-glow cursor-pointer hover:opacity-80 transition-opacity"
          >
            Wissi
          </a>
        </div>
      </div>
    </footer>
  );
}
