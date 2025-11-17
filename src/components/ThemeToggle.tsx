import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { GlassEffect } from './GlassEffect';

export default function ThemeToggle() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <div className="fixed top-24 right-6 z-40">
      <GlassEffect
        onClick={toggleTheme}
        className="rounded-full p-3 w-12 h-12 flex items-center justify-center"
      >
        <span className="text-gray-900 dark:text-white">
          {isDark ? <Sun size={20} /> : <Moon size={20} />}
        </span>
      </GlassEffect>
    </div>
  );
}
