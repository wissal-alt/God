import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, X, ShoppingCart, ArrowLeft } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useCategoryModal } from '../context/CategoryContext';
import type { Product } from '../utils/csvParser';
import RelatedProducts from './RelatedProducts';

interface ProductModalProps {
  product: Product;
  allProducts: Product[];
  onClose: () => void;
  onNavigate: (direction: 'prev' | 'next') => void;
  showBackButton?: boolean;
}

export default function ProductModal({ product, allProducts, onClose, onNavigate, showBackButton = false }: ProductModalProps) {
  const { isDark } = useTheme();
  const { clearSelectedProduct } = useCategoryModal();
  const [imageError, setImageError] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product>(product);

  const handleBack = () => {
    clearSelectedProduct();
  };

  useEffect(() => {
    setSelectedProduct(product);
    setImageError(false);
  }, [product]);

  const currentIndex = allProducts.findIndex(p => p.name === selectedProduct.name);
  const hasPrev = allProducts.length > 1 && currentIndex > 0;
  const hasNext = allProducts.length > 1 && currentIndex < allProducts.length - 1;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    console.log('Add to cart:', product.name);
  };

  const handleNavigate = (e: React.MouseEvent, direction: 'prev' | 'next') => {
    e.stopPropagation();
    onNavigate(direction);
  };

  const handleRelatedProductClick = (relatedProduct: Product) => {
    setSelectedProduct(relatedProduct);
    setImageError(false);
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 animate-fade-in"
      onClick={onClose}
    >
      <div
        className={`${isDark ? 'bg-[#2a2a2a]' : 'bg-white'} rounded-3xl shadow-2xl animate-scale-in relative overflow-y-auto`}
        onClick={e => e.stopPropagation()}
        style={{ width: '1200px', maxHeight: '90vh', maxWidth: '90vw' }}
      >
        {showBackButton && (
          <button
            onClick={handleBack}
            className={`sticky top-4 left-4 z-20 p-2 rounded-full ${
              isDark
                ? 'bg-[#1a1a1a] hover:bg-[#3a3a3a] text-white'
                : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
            } transition-all shadow-lg`}
          >
            <ArrowLeft size={24} />
          </button>
        )}

        <button
          onClick={onClose}
          className={`sticky top-4 float-right mr-4 z-20 p-2 rounded-full ${
            isDark
              ? 'bg-[#1a1a1a] hover:bg-[#3a3a3a] text-white'
              : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
          } transition-all shadow-lg`}
        >
          <X size={24} />
        </button>

        <button
          onClick={(e) => handleNavigate(e, 'prev')}
          disabled={!hasPrev}
          className={`fixed left-4 top-1/2 -translate-y-1/2 z-30 w-14 h-14 rounded-full transition-all flex items-center justify-center ${
            hasPrev
              ? isDark
                ? 'bg-[#3a3a3a] hover:bg-amber-900 text-white shadow-xl'
                : 'bg-white hover:bg-amber-900 hover:text-white shadow-xl'
              : isDark
              ? 'bg-[#1a1a1a] text-gray-600 cursor-not-allowed'
              : 'bg-gray-100 text-gray-400 cursor-not-allowed'
          }`}
        >
          <ChevronLeft size={28} />
        </button>

        <button
          onClick={(e) => handleNavigate(e, 'next')}
          disabled={!hasNext}
          className={`fixed right-4 top-1/2 -translate-y-1/2 z-30 w-14 h-14 rounded-full transition-all flex items-center justify-center ${
            hasNext
              ? isDark
                ? 'bg-[#3a3a3a] hover:bg-amber-900 text-white shadow-xl'
                : 'bg-white hover:bg-amber-900 hover:text-white shadow-xl'
              : isDark
              ? 'bg-[#1a1a1a] text-gray-600 cursor-not-allowed'
              : 'bg-gray-100 text-gray-400 cursor-not-allowed'
          }`}
        >
          <ChevronRight size={28} />
        </button>

        <div className="flex p-10">
          <div className="w-1/2 flex flex-col gap-6 pr-6">
            <div className={`rounded-2xl overflow-hidden ${isDark ? 'bg-[#1a1a1a]' : 'bg-gray-100'} aspect-square w-full`}>
              {!imageError ? (
                <img
                  src={selectedProduct.imageUrl}
                  alt={selectedProduct.name}
                  className="w-full h-full object-cover"
                  onError={() => setImageError(true)}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  Image not available
                </div>
              )}
            </div>

            <div className="flex gap-3 justify-center">
              {[0, 1, 2, 3].map((index) => (
                <button
                  key={index}
                  className={`w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 border-2 transition-all ${
                    isDark
                      ? 'border-[#3a3a3a] hover:border-amber-900'
                      : 'border-gray-200 hover:border-amber-900'
                  }`}
                >
                  {!imageError ? (
                    <img
                      src={selectedProduct.imageUrl}
                      alt={`thumbnail-${index}`}
                      className="w-full h-full object-cover"
                      onError={() => setImageError(true)}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">
                      No image
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>

          <div className={`w-1/2 flex flex-col pl-6`}>
            <h2
              className={`text-4xl font-bold ${isDark ? 'text-white' : 'text-amber-900'} mb-6`}
              style={{ fontFamily: "'DM Serif Text', serif" }}
            >
              {selectedProduct.name}
            </h2>

            <div className="mb-8">
              <span
                className={`inline-block px-5 py-2 rounded-full text-sm font-medium ${
                  isDark
                    ? 'bg-[#3a3a3a] text-gray-300'
                    : 'bg-amber-50 text-amber-900'
                }`}
              >
                {selectedProduct.category}
              </span>
            </div>

            <div
              className={`text-lg leading-relaxed ${
                isDark ? 'text-gray-300' : 'text-gray-600'
              } mb-8 flex-1`}
            >
              {selectedProduct.description.split('\n').map((paragraph, index) => (
                paragraph.trim() && (
                  <p key={index} className="mb-4">
                    {paragraph}
                  </p>
                )
              ))}
            </div>

            <div className="flex gap-4 mt-6">
              <button
                onClick={handleAddToCart}
                className="flex-1 bg-amber-900 text-white px-8 py-4 rounded-xl hover:bg-amber-800 transition-all duration-150 shadow-md hover:shadow-lg flex items-center justify-center gap-2 text-base font-medium"
              >
                <ShoppingCart size={20} />
                Add to Cart
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  console.log('Buy now:', product.name);
                }}
                className={`flex-1 px-8 py-4 rounded-xl text-base font-medium transition-all duration-150 shadow-md hover:shadow-lg ${
                  isDark
                    ? 'bg-[#3a3a3a] text-white hover:bg-[#4a4a4a]'
                    : 'bg-gray-200 text-amber-900 hover:bg-gray-300'
                }`}
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>

        <div className={`w-full border-t ${isDark ? 'border-[#3a3a3a]' : 'border-gray-200'} mt-8`}>
          <RelatedProducts
            currentProduct={selectedProduct}
            allProducts={allProducts}
            onProductClick={handleRelatedProductClick}
          />
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes scaleIn {
          from {
            transform: scale(0.97);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }

        .animate-fade-in {
          animation: fadeIn 0.15s ease-out;
        }

        .animate-scale-in {
          animation: scaleIn 0.15s ease-out;
        }
      `}</style>
    </div>
  );
}
