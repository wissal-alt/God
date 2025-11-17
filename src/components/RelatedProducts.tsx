import { useState, useEffect, useRef } from 'react';
import { useTheme } from '../context/ThemeContext';
import type { Product } from '../utils/csvParser';

interface RelatedProductsProps {
  currentProduct: Product;
  allProducts: Product[];
  onProductClick: (product: Product) => void;
}

export default function RelatedProducts({ currentProduct, allProducts, onProductClick }: RelatedProductsProps) {
  const { isDark } = useTheme();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [isAnimating, setIsAnimating] = useState(true);

  const relatedProducts = allProducts.filter(p => p.category === currentProduct.category && p.name !== currentProduct.name);

  if (relatedProducts.length === 0) return null;

  const duplicatedProducts = [...relatedProducts, ...relatedProducts];

  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    let lastScrollPosition = 0;

    const scroll = () => {
      if (isAnimating) {
        const maxScroll = carousel.scrollWidth / 2;
        carousel.scrollLeft += 1;

        if (carousel.scrollLeft >= maxScroll - 5) {
          carousel.scrollLeft = 0;
        }
      }
    };

    const interval = setInterval(scroll, 30);
    return () => clearInterval(interval);
  }, [isAnimating]);

  return (
    <div className="p-8">
      <h3
        className={`text-2xl ${isDark ? 'text-white' : 'text-amber-900'} mb-6 text-center`}
        style={{ fontFamily: "'DM Serif Text', serif" }}
      >
        You May Also Love
      </h3>

      <div
        ref={carouselRef}
        className="flex gap-4 overflow-x-hidden scroll-smooth"
        onMouseEnter={() => setIsAnimating(false)}
        onMouseLeave={() => setIsAnimating(true)}
      >
        {duplicatedProducts.map((product, index) => (
          <div
            key={index}
            className={`flex-shrink-0 w-48 h-48 group relative overflow-hidden rounded-xl ${
              isDark ? 'bg-[#1a1a1a]' : 'bg-gray-100'
            } cursor-pointer shadow-md hover:shadow-xl transition-shadow duration-300`}
            onClick={() => onProductClick(product)}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <img
              src={product.imageUrl}
              alt={product.name}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            />

            <div
              className={`absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent transition-opacity duration-300 ${
                hoveredIndex === index ? 'opacity-100' : 'opacity-0'
              }`}
            />

            <div
              className={`absolute bottom-0 left-0 right-0 p-3 text-white text-sm font-medium transition-all duration-300 ${
                hoveredIndex === index ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
              }`}
              style={{ fontFamily: "'DM Serif Text', serif" }}
            >
              <p className="line-clamp-2 text-center">{product.name}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
