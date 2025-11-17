import { useState, useEffect } from 'react';
import { motion, useMotionValue, useTransform, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import type { SignaturePiece } from '../utils/signaturePiecesParser';

interface CardStackGalleryProps {
  pieces: SignaturePiece[];
}

export default function CardStackGallery({ pieces }: CardStackGalleryProps) {
  const { isDark } = useTheme();
  const [cards, setCards] = useState<SignaturePiece[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [dragDirection, setDragDirection] = useState<'up' | 'down' | null>(null);

  const dragY = useMotionValue(0);
  const rotateX = useTransform(dragY, [-200, 0, 200], [15, 0, -15]);

  const offset = 10;
  const scaleStep = 0.06;
  const dimStep = 0.15;
  const stiff = 170;
  const damp = 26;
  const borderRadius = 12;
  const swipeThreshold = 50;

  const spring = {
    type: 'spring' as const,
    stiffness: stiff,
    damping: damp
  };

  useEffect(() => {
    if (pieces.length > 0) {
      setCards(pieces);
    }
  }, [pieces]);

  const moveToEnd = () => {
    setCards(prev => [...prev.slice(1), prev[0]]);
    setCurrentIndex((prev) => (prev + 1) % pieces.length);
  };

  const moveToStart = () => {
    setCards(prev => [prev[prev.length - 1], ...prev.slice(0, -1)]);
    setCurrentIndex((prev) => (prev - 1 + pieces.length) % pieces.length);
  };

  const handleDragEnd = (_: any, info: any) => {
    const velocity = info.velocity.y;
    const offset = info.offset.y;

    if (Math.abs(offset) > swipeThreshold || Math.abs(velocity) > 500) {
      if (offset < 0 || velocity < 0) {
        setDragDirection('up');
        setTimeout(() => {
          moveToEnd();
          setDragDirection(null);
        }, 150);
      } else {
        setDragDirection('down');
        setTimeout(() => {
          moveToStart();
          setDragDirection(null);
        }, 150);
      }
    }
    dragY.set(0);
  };

  if (cards.length === 0) {
    return null;
  }

  return (
    <div className="relative w-full flex items-center justify-center py-12">
      <motion.button
        onClick={moveToStart}
        className={`absolute left-4 md:left-8 p-3 md:p-4 rounded-full transition-all duration-300 z-20 ${
          isDark
            ? 'bg-[#2a2a2a] hover:bg-amber-900 text-white'
            : 'bg-white hover:bg-amber-900 hover:text-white text-amber-900'
        } shadow-lg`}
        whileHover={{ scale: 1.1, x: -5 }}
        whileTap={{ scale: 0.9 }}
      >
        <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
      </motion.button>

      <motion.button
        onClick={moveToEnd}
        className={`absolute right-4 md:right-8 p-3 md:p-4 rounded-full transition-all duration-300 z-20 ${
          isDark
            ? 'bg-[#2a2a2a] hover:bg-amber-900 text-white'
            : 'bg-white hover:bg-amber-900 hover:text-white text-amber-900'
        } shadow-lg`}
        whileHover={{ scale: 1.1, x: 5 }}
        whileTap={{ scale: 0.9 }}
      >
        <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
      </motion.button>

      <div className="relative w-[430px] md:w-[520px] aspect-[4/3] overflow-visible z-10">
        <ul className="relative w-full h-full m-0 p-0">
          <AnimatePresence>
            {cards.slice(0, 8).map((piece, i) => {
              const isFront = i === 0;
              const brightness = Math.max(0.3, 1 - i * dimStep);
              const baseZ = cards.length - i;

              return (
                <motion.li
                  key={piece.id}
                  className={`absolute w-full h-full list-none overflow-hidden border-2 ${
                    isDark ? 'border-gray-700' : 'border-gray-300'
                  }`}
                  style={{
                    borderRadius: `${borderRadius}px`,
                    cursor: isFront ? 'grab' : 'auto',
                    touchAction: 'none',
                    boxShadow: isFront
                      ? isDark
                        ? '0 25px 50px rgba(0, 0, 0, 0.7)'
                        : '0 25px 50px rgba(0, 0, 0, 0.15)'
                      : isDark
                      ? '0 15px 30px rgba(0, 0, 0, 0.4)'
                      : '0 15px 30px rgba(0, 0, 0, 0.08)',
                    rotateX: isFront ? rotateX : 0,
                    transformPerspective: 1000
                  }}
                  animate={{
                    top: `${i * -offset}%`,
                    scale: 1 - i * scaleStep,
                    filter: `brightness(${brightness})`,
                    zIndex: baseZ,
                    opacity: dragDirection && isFront ? 0 : 1
                  }}
                  exit={{
                    opacity: 0,
                    scale: 0.8,
                    transition: { duration: 0.2 }
                  }}
                  transition={spring}
                  drag={isFront ? 'y' : false}
                  dragConstraints={{ top: 0, bottom: 0 }}
                  dragElastic={0.7}
                  onDrag={(_, info) => {
                    if (isFront) {
                      dragY.set(info.offset.y);
                    }
                  }}
                  onDragEnd={handleDragEnd}
                  whileDrag={
                    isFront
                      ? {
                          zIndex: cards.length + 1,
                          cursor: 'grabbing',
                          scale: 1.05,
                        }
                      : {}
                  }
                >
                  <img
                    src={piece.imageUrl}
                    alt={`Signature piece ${piece.id}`}
                    className="w-full h-full object-cover pointer-events-none select-none"
                    draggable={false}
                  />
                </motion.li>
              );
            })}
          </AnimatePresence>
        </ul>
      </div>

      <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {Array.from({ length: Math.min(pieces.length, 20) }).map((_, i) => (
          <motion.div
            key={i}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === currentIndex % pieces.length
                ? `${isDark ? 'bg-white' : 'bg-amber-900'} w-8`
                : `${isDark ? 'bg-gray-700' : 'bg-gray-300'} w-1.5`
            }`}
            whileHover={{ scale: 1.2 }}
          />
        ))}
      </div>
    </div>
  );
}
