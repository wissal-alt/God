import { useState } from 'react';
import { Menu, X, Home, Grid, Sofa, Info, HelpCircle, MessageCircle, Gem, Mail } from 'lucide-react';
import { GlassEffect, GlassFilter } from './GlassEffect';

export default function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      setIsMobileMenuOpen(false);
    }
  };

  const navLinks = [
    { name: 'Home', id: 'hero', icon: Home },
    { name: 'Collections', id: 'collections', icon: Grid },
    { name: 'Products', id: 'products', icon: Sofa },
    { name: 'About', id: 'about', icon: Info },
    { name: 'FAQ', id: 'faq', icon: HelpCircle },
    { name: 'Consultation', id: 'consultation', icon: MessageCircle },
    { name: 'Rare Finds', id: 'rare-finds', icon: Gem },
    { name: 'Contact', id: 'contact', icon: Mail },
  ];

  return (
    <>
      <GlassFilter />
      <nav className="fixed top-0 left-0 right-0 z-50">
        <div className="w-full px-6 lg:px-8">
          <div className="flex items-center h-20">
            <button
              onClick={() => scrollToSection('hero')}
              className="relative z-50 flex-shrink-0 hover:opacity-80 transition-opacity"
            >
              <span className="text-lg lg:text-2xl font-bold text-amber-900 dark:text-amber-400 whitespace-nowrap">
                PGD Wooden House
              </span>
            </button>

            <div className="hidden lg:flex items-center space-x-3 ml-16">
              {navLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <GlassEffect
                    key={link.id}
                    onClick={() => scrollToSection(link.id)}
                    className="rounded-3xl px-5 py-2 hover:px-6 hover:py-2.5"
                  >
                    <span className="text-sm text-gray-900 dark:text-white whitespace-nowrap flex items-center gap-2">
                      <Icon size={16} />
                      {link.name}
                    </span>
                  </GlassEffect>
                );
              })}
            </div>

            <button
              className="lg:hidden text-amber-900 dark:text-white hover:text-amber-700 dark:hover:text-gray-300 transition-colors relative z-50 ml-auto"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="lg:hidden">
            <div className="px-6 py-4 space-y-3">
              {navLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <GlassEffect
                    key={link.id}
                    onClick={() => scrollToSection(link.id)}
                    className="rounded-3xl px-5 py-3 w-full"
                  >
                    <span className="text-sm text-gray-900 dark:text-white flex items-center gap-2">
                      <Icon size={16} />
                      {link.name}
                    </span>
                  </GlassEffect>
                );
              })}
            </div>
          </div>
        )}
      </nav>
    </>
  );
}
