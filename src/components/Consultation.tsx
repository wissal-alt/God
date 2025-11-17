import { MessageSquare, Ruler, Palette, Sparkles, Check } from 'lucide-react';
import { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { GlowingEffect } from './GlowingEffect';
import ConsultationFormModal from './ConsultationFormModal';

export default function Consultation() {
  const { isDark } = useTheme();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const processSteps = [
    {
      icon: MessageSquare,
      title: 'Share Your Story',
      description: 'Your journey begins with conversation. Tell us about your lifestyle, the atmosphere you dream of, and how each space should feel. The more we understand your world, the more personal your design becomes.',
    },
    {
      icon: Ruler,
      title: 'Design That Fits',
      description: 'Our team visits your space, takes precise measurements, and crafts a layout that truly fits your flow. Every detail is considered — proportions, light, and the way you live each day.',
    },
    {
      icon: Palette,
      title: 'Choose the Details',
      description: 'From fine woods to soft fabrics and timeless finishes, you\'ll explore materials that define your space\'s character. Together, we curate elements that reflect your taste and comfort.',
    },
    {
      icon: Sparkles,
      title: 'From Vision to Reality',
      description: 'Once approved, your design is handcrafted by our artisans and delivered with care. Every curve and finish reflects your individuality — a creation meant to last and inspire.',
    },
  ];

  const benefits = [
    'Gain expert insight into layout, balance, and space harmony.',
    'Feel textures, finishes, and colors in person at our studio.',
    'Visualize your dream interior with detailed 3D renderings.',
    'Get a clear timeline and honest cost estimate before production begins.',
  ];

  return (
    <section id="consultation" className={`py-16 ${isDark ? 'bg-[#111133]' : 'bg-white'}`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2
            className={`text-4xl md:text-5xl ${isDark ? 'text-white' : 'text-amber-900'} mb-4`}
            style={{ fontFamily: "'DM Serif Text', serif" }}
          >
            Your Personal Consultation
          </h2>
          <p className={`text-xl ${isDark ? 'text-gray-300' : 'text-gray-600'} max-w-2xl mx-auto`}>
            A thoughtful process designed to transform your vision into reality
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-20 max-w-4xl mx-auto">
          {processSteps.map((step, index) => (
            <div
              key={index}
              className={`relative ${isDark ? 'bg-[#1a1a2a]' : 'bg-stone-50'} rounded-3xl p-8 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col items-center text-center`}
            >
              <GlowingEffect
                borderWidth={6}
                proximity={100}
                spread={20}
                disabled={false}
                glow={true}
              />
              <div className={`inline-flex items-center justify-center w-16 h-16 ${isDark ? 'bg-amber-900/20 text-amber-400' : 'bg-amber-50 text-amber-900'} rounded-2xl mb-6`}>
                <step.icon size={32} strokeWidth={1.5} />
              </div>
              <h3
                className={`text-xl font-semibold ${isDark ? 'text-white' : 'text-amber-900'} mb-4 leading-tight`}
                style={{ fontFamily: "'DM Serif Text', serif" }}
              >
                {step.title}
              </h3>
              <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'} leading-relaxed text-[15px]`}>
                {step.description}
              </p>
            </div>
          ))}
        </div>

        <div className={`relative ${isDark ? 'bg-[#1a1a2a]' : 'bg-stone-50'} rounded-3xl p-12 mb-12 shadow-lg max-w-3xl mx-auto`}>
          <GlowingEffect
            borderWidth={6}
            proximity={100}
            spread={20}
            disabled={false}
            glow={true}
          />
          <h3
            className={`text-3xl font-semibold ${isDark ? 'text-white' : 'text-amber-900'} mb-8 text-center`}
            style={{ fontFamily: "'DM Serif Text', serif" }}
          >
            Why Choose a Consultation?
          </h3>
          <ul className="space-y-4">
            {benefits.map((benefit, index) => (
              <li key={index} className="flex items-start gap-4">
                <div className={`inline-flex items-center justify-center w-6 h-6 ${isDark ? 'bg-amber-900/30 text-amber-400' : 'bg-amber-100 text-amber-900'} rounded-full flex-shrink-0 mt-1`}>
                  <Check size={16} strokeWidth={2.5} />
                </div>
                <span className={`text-lg leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  {benefit}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="text-center">
          <button
            onClick={() => {
              if (hasSubmitted) {
                alert('We\'ve already received your vision! Our team will contact you soon. We can\'t wait to create something special for you.');
              } else {
                setIsModalOpen(true);
              }
            }}
            className={`${isDark ? 'bg-amber-900 hover:bg-amber-800 text-white' : 'bg-amber-900 hover:bg-amber-800 text-white'} px-10 py-4 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 font-semibold text-lg`}
          >
            {hasSubmitted ? 'Vision Received' : 'Share Your Vision'}
          </button>
        </div>

        <ConsultationFormModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setHasSubmitted(true);
          }}
          isDarkMode={isDark}
        />
      </div>
    </section>
  );
}
