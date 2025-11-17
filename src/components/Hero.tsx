import { useTheme } from '../context/ThemeContext';
import { useEffect, useRef } from 'react';
import { Hand } from 'lucide-react';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'spline-viewer': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        url: string;
      };
    }
  }
}

export default function Hero() {
  const { isDark } = useTheme();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      const viewer = containerRef.current.querySelector('spline-viewer') as any;
      if (viewer && viewer.addEventListener) {
        viewer.addEventListener('load', () => {
          if (viewer.setZoom) {
            viewer.setZoom(1.5);
          }
        });
      }
    }
  }, []);

  return (
    <section
      id="hero"
      className={`relative h-screen flex items-center justify-center overflow-hidden section-transition hero-transition ${isDark ? 'dark' : ''}`}
      style={{ backgroundColor: isDark ? '#111133' : '#f5f5f4' }}
    >
      <div
        ref={containerRef}
        className="absolute inset-0 w-full"
        style={{
          height: '150%',
          top: '-25%',
          pointerEvents: 'auto',
          touchAction: 'none'
        }}
      >
        <spline-viewer
          url="https://prod.spline.design/lFVyA870Kl2RZZcX/scene.splinecode"
          style={{
            width: '100%',
            height: '100%',
            display: 'block',
            pointerEvents: 'auto',
            touchAction: 'none',
            transform: 'scale(1.6)',
            transformOrigin: 'center center'
          }}
        />
      </div>

      <div className="relative z-20 max-w-4xl mx-auto px-6 text-center flex flex-col items-center pointer-events-none">
        <div className="mb-8">
          <img
            src="/retouch_2025111011403977.png"
            alt="PGD Wooden House Logo"
            className="w-auto h-32 md:h-40 lg:h-48 object-contain drop-shadow-2xl"
            style={{ filter: 'drop-shadow(0 0 40px rgba(0, 0, 0, 0.4))' }}
          />
        </div>

        <p
          className="text-lg md:text-xl lg:text-2xl text-gray-800 dark:text-white leading-relaxed max-w-3xl font-semibold"
          style={{ fontFamily: "'Radley', serif" }}
        >
          Crafting timeless furniture in Jepara since decades. Every piece tells a story of human touch and devotion
        </p>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 pointer-events-none">
        <div className="flex flex-col items-center gap-2">
          <Hand className="w-6 h-6 text-amber-900 dark:text-amber-600 animate-drag-gesture" />
          <div className="animate-pulse text-amber-900 dark:text-amber-600 text-xs font-medium">Drag</div>
        </div>
      </div>
    </section>
  );
}
