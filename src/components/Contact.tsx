import { Mail, Phone, Instagram, Clock, MessageCircle, Video, AtSign } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export default function Contact() {
  const { isDark } = useTheme();

  const contactCards = [
    {
      icon: Mail,
      label: 'Email',
      contact: 'info@pgdwoodenhouse.com',
      slogan: 'We read every message with care',
      href: 'mailto:info@pgdwoodenhouse.com',
    },
    {
      icon: Phone,
      label: 'Phone',
      contact: '081328835401',
      slogan: 'Call us, we\'re here to help',
      href: 'tel:+62081328835401',
    },
    {
      icon: Instagram,
      label: 'Instagram',
      contact: '@pgdwooden_house',
      slogan: 'Follow our craft journey',
      href: 'https://www.instagram.com/pgdwooden_house/',
    },
    {
      icon: MessageCircle,
      label: 'WhatsApp',
      contact: '081328835401',
      slogan: 'Quick replies, personal touch',
      href: 'https://wa.me/62081328835401',
    },
    {
      icon: Video,
      label: 'TikTok',
      contact: '@pgdwooden_house',
      slogan: 'Watch our creations come alive',
      href: 'https://www.tiktok.com/@pgdwooden_house?_t=8pYO5GHMvy6&_r=1',
    },
    {
      icon: AtSign,
      label: 'Threads',
      contact: '@pgdwooden_house',
      slogan: 'Join the conversation',
      href: 'https://www.threads.com/@pgdwooden_house',
    },
  ];

  return (
    <section id="contact" className={`py-16 bg-gradient-to-br from-stone-50 to-amber-50 dark:from-[#111133] dark:to-[#111133]`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <Mail className="w-12 h-12 text-amber-900 dark:text-white" strokeWidth={1.5} />
          </div>
          <h2
            className="text-4xl md:text-5xl text-amber-900 dark:text-white mb-4"
            style={{ fontFamily: "'DM Serif Text', serif" }}
          >
            Let's Connect
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Reach out anytime, we're here to listen, advise, and bring your vision to life.
          </p>
        </div>

        <div className="flex justify-center mb-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-3xl">
            {contactCards.map((card, index) => (
              <a
                key={index}
                href={card.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`group relative aspect-square ${isDark ? 'bg-[#2a2a2a]' : 'bg-white'} rounded-xl shadow-md hover:shadow-xl transition-all duration-300 flex flex-col items-center justify-center p-5 hover:-translate-y-1`}
              >
                <div className={`w-12 h-12 ${isDark ? 'bg-amber-900/20' : 'bg-amber-50'} rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300`}>
                  <card.icon className={`${isDark ? 'text-amber-400' : 'text-amber-900'} w-6 h-6`} strokeWidth={1.5} />
                </div>
                <h3
                  className={`text-base font-bold ${isDark ? 'text-white' : 'text-amber-900'} mb-2 text-center leading-tight`}
                  style={{ fontFamily: "'DM Serif Text', serif" }}
                >
                  {card.label}
                </h3>
                <p className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-2 text-center leading-tight`}>
                  {card.contact}
                </p>
                <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'} text-center italic leading-tight`}>
                  {card.slogan}
                </p>
              </a>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-5 gap-6 mb-16">
          <div className={`lg:col-span-1 ${isDark ? 'bg-[#2a2a2a]' : 'bg-white'} rounded-2xl shadow-md px-5 py-4 flex flex-col items-center justify-center text-center h-fit`}>
            <div className={`w-10 h-10 ${isDark ? 'bg-amber-900/20' : 'bg-amber-50'} rounded-xl flex items-center justify-center mb-2`}>
              <Clock className={`${isDark ? 'text-amber-400' : 'text-amber-900'} w-5 h-5`} strokeWidth={1.5} />
            </div>
            <h3
              className={`text-base font-bold ${isDark ? 'text-white' : 'text-amber-900'} mb-2`}
              style={{ fontFamily: "'DM Serif Text', serif" }}
            >
              Work Hours
            </h3>
            <div className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'} space-y-0.5`}>
              <p className="font-medium">Monday - Saturday</p>
              <p className="font-semibold">08:00 AM – 05:00 PM</p>
              <p className={`${isDark ? 'text-gray-400' : 'text-gray-500'} text-xs mt-1`}>Closed Sundays</p>
            </div>
          </div>

          <div className={`lg:col-span-4 ${isDark ? 'bg-[#2a2a2a]' : 'bg-white'} rounded-2xl shadow-md overflow-hidden`}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3963.28928919002!2d110.70198757356034!3d-6.6109321646220796!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e711f545adc396f%3A0x3b9ca057e83e9d4c!2sPGD%20WOODEN%20HOUSE!5e0!3m2!1sen!2sdz!4v1763291661790!5m2!1sen!2sdz"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: '480px', display: 'block' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600 dark:text-gray-300">
            &copy; {new Date().getFullYear()} PGD Wooden House. Crafted with dedication in Jepara, Indonesia.
          </p>
        </div>
      </div>
    </section>
  );
}
