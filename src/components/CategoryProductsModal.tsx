import { X, Eye } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useCategoryModal } from '../context/CategoryContext';
import ProductModal from './ProductModal';
import type { Product } from '../utils/csvParser';

export default function CategoryProductsModal() {
  const { isDark } = useTheme();
  const { modalState, selectProduct, closeCategoryModal } = useCategoryModal();

  if (!modalState.isOpen || !modalState.categoryName) {
    return null;
  }

  if (modalState.selectedProduct) {
    return (
      <ProductModal
        product={modalState.selectedProduct}
        allProducts={modalState.products}
        onClose={closeCategoryModal}
        onNavigate={(direction) => {
          const currentIndex = modalState.products.findIndex(p => p.name === modalState.selectedProduct?.name);
          let newIndex;

          if (direction === 'prev') {
            newIndex = currentIndex === 0 ? modalState.products.length - 1 : currentIndex - 1;
          } else {
            newIndex = currentIndex === modalState.products.length - 1 ? 0 : currentIndex + 1;
          }

          selectProduct(modalState.products[newIndex]);
        }}
        showBackButton={true}
      />
    );
  }

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 animate-fade-in"
      onClick={closeCategoryModal}
    >
      <div
        className={`${isDark ? 'bg-[#2a2a2a]' : 'bg-white'} rounded-3xl shadow-2xl animate-scale-in relative overflow-hidden flex flex-col max-h-[90vh]`}
        onClick={e => e.stopPropagation()}
        style={{ width: '1000px', maxWidth: '90vw' }}
      >
        <button
          onClick={closeCategoryModal}
          className={`absolute top-4 right-4 z-20 p-2 rounded-full ${
            isDark
              ? 'bg-[#1a1a1a] hover:bg-[#3a3a3a] text-white'
              : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
          } transition-all shadow-lg`}
        >
          <X size={24} />
        </button>

        <div className="px-8 py-6 border-b" style={{ borderColor: isDark ? '#3a3a3a' : '#e5e7eb' }}>
          <h2
            className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-amber-900'}`}
            style={{ fontFamily: "'DM Serif Text', serif" }}
          >
            {modalState.categoryName}
          </h2>
          <p className={`text-sm mt-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            {modalState.products.length} product{modalState.products.length !== 1 ? 's' : ''}
          </p>
        </div>

        <div className="overflow-y-auto flex-1 p-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {modalState.products.map((product, index) => (
              <div
                key={`${product.name}-${index}`}
                className={`group ${isDark ? 'bg-[#1a1a1a]' : 'bg-gray-50'} rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-150`}
              >
                <div className={`aspect-square relative overflow-hidden ${isDark ? 'bg-[#0a0a0a]' : 'bg-gray-200'}`}>
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                    loading="lazy"
                  />
                </div>
                <div className="p-4">
                  <h3
                    className={`text-base ${isDark ? 'text-white' : 'text-amber-900'} mb-3 line-clamp-2 min-h-[3rem]`}
                    style={{ fontFamily: "'DM Serif Text', serif" }}
                  >
                    {product.name}
                  </h3>
                  <button
                    onClick={() => selectProduct(product)}
                    className={`w-full ${isDark ? 'bg-amber-900 hover:bg-amber-800 text-white' : 'bg-amber-900 hover:bg-amber-800 text-white'} px-4 py-2.5 rounded-xl transition-all duration-150 flex items-center justify-center gap-2 text-sm font-medium`}
                  >
                    <Eye size={16} />
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
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
