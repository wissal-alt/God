import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Sofa, Eye, ShoppingCart } from 'lucide-react';
import { parseProductsCSV, type Product } from '../utils/csvParser';
import { useTheme } from '../context/ThemeContext';
import ProductModal from './ProductModal';

const PRODUCTS_PER_PAGE = 12;

const CATEGORIES = [
  'All',
  'Sofas',
  'Side Chairs',
  'Armchairs',
  'Sideboards',
  'Outdoor Lounge Beds',
  'Sofa Sets & Sectionals',
  'Designer Dining Sets',
  'TV Consoles',
  'Bedside Cabinets',
  'Dining Sets',
  'Side Tables',
  'Coffee Table',
  'Dinning Tables',
  'Bed Frames',
];

export default function Products() {
  const { isDark } = useTheme();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  useEffect(() => {
    async function loadProducts() {
      const data = await parseProductsCSV();
      setProducts(data);
      setLoading(false);
    }
    loadProducts();
  }, []);

  const row1 = CATEGORIES.slice(0, 6);
  const row2 = CATEGORIES.slice(6, 10);
  const row3 = CATEGORIES.slice(10, 15);

  const filteredProducts = selectedCategory === 'All'
    ? products
    : products.filter(p => p.category === selectedCategory);

  const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);
  const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
  const displayedProducts = filteredProducts.slice(startIndex, startIndex + PRODUCTS_PER_PAGE);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      window.scrollTo({ top: document.getElementById('products')?.offsetTop, behavior: 'smooth' });
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      window.scrollTo({ top: document.getElementById('products')?.offsetTop, behavior: 'smooth' });
    }
  };

  const handlePageClick = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: document.getElementById('products')?.offsetTop, behavior: 'smooth' });
  };

  const handleViewDetails = (product: Product) => {
    setSelectedProduct(product);
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
  };

  const handleNavigateProduct = (direction: 'prev' | 'next') => {
    if (!selectedProduct) return;

    const currentIndex = filteredProducts.findIndex(p => p.name === selectedProduct.name);
    let newIndex;

    if (direction === 'prev') {
      newIndex = currentIndex === 0 ? filteredProducts.length - 1 : currentIndex - 1;
    } else {
      newIndex = currentIndex === filteredProducts.length - 1 ? 0 : currentIndex + 1;
    }

    setSelectedProduct(filteredProducts[newIndex]);
  };

  const handleAddToCart = (product: Product, e: React.MouseEvent) => {
    e.stopPropagation();
    console.log('Add to cart:', product.name);
  };

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisible = 7;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 4) {
        for (let i = 1; i <= 5; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 3) {
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 4; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push('...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      }
    }

    return pages;
  };

  if (loading) {
    return (
      <section id="products" className={`py-16 bg-gradient-to-br from-stone-50 to-amber-50 dark:from-[#111133] dark:to-[#111133] section-transition products-transition ${isDark ? 'dark' : ''}`}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center">
            <p className={`text-lg ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>Loading products...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="products" className={`py-16 bg-gradient-to-br from-stone-50 to-amber-50 dark:from-[#111133] dark:to-[#111133] section-transition products-transition ${isDark ? 'dark' : ''}`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <Sofa className="w-12 h-12 text-amber-900 dark:text-white" strokeWidth={1.5} />
          </div>
          <h2
            className="text-4xl md:text-5xl text-amber-900 dark:text-white mb-4"
            style={{ fontFamily: "'DM Serif Text', serif" }}
          >
            Crafted for Your Home
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-8">
            Furniture made with intention, built to serve, comfort, and accompany your daily life.
          </p>
        </div>

        <div className="mb-12 space-y-2">
          <div className="flex flex-wrap justify-center gap-2">
            {row1.map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryChange(category)}
                className={`px-4 py-1.5 text-sm rounded-full transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-amber-900 text-white shadow-md'
                    : 'bg-white dark:bg-[#2a2a2a] text-gray-700 dark:text-gray-300 hover:bg-amber-50 dark:hover:bg-[#3a3a3a] hover:text-amber-900 dark:hover:text-white shadow-sm'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
          <div className="flex flex-wrap justify-center gap-2">
            {row2.map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryChange(category)}
                className={`px-4 py-1.5 text-sm rounded-full transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-amber-900 text-white shadow-md'
                    : 'bg-white dark:bg-[#2a2a2a] text-gray-700 dark:text-gray-300 hover:bg-amber-50 dark:hover:bg-[#3a3a3a] hover:text-amber-900 dark:hover:text-white shadow-sm'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
          <div className="flex flex-wrap justify-center gap-2">
            {row3.map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryChange(category)}
                className={`px-4 py-1.5 text-sm rounded-full transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-amber-900 text-white shadow-md'
                    : 'bg-white dark:bg-[#2a2a2a] text-gray-700 dark:text-gray-300 hover:bg-amber-50 dark:hover:bg-[#3a3a3a] hover:text-amber-900 dark:hover:text-white shadow-sm'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="text-center py-12">
            <p className={`text-lg ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>No products found in this category.</p>
          </div>
        ) : (
          <>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-12">
              {displayedProducts.map((product, index) => (
                <div
                  key={`${product.name}-${index}`}
                  className={`group ${isDark ? 'bg-[#2a2a2a]' : 'bg-white'} rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500`}
                >
                  <div className={`aspect-square relative overflow-hidden ${isDark ? 'bg-[#1a1a1a]' : 'bg-gray-100'}`}>
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className={`absolute top-4 right-4 ${isDark ? 'bg-[#2a2a2a]/90' : 'bg-white/90'} backdrop-blur-sm px-3 py-1 rounded-full`}>
                      <span className={`text-xs font-medium ${isDark ? 'text-gray-300' : 'text-amber-900'}`}>{product.category}</span>
                    </div>
                  </div>
                  <div className="p-5">
                    <h3
                      className={`text-lg ${isDark ? 'text-white' : 'text-amber-900'} mb-2 line-clamp-2 min-h-[3.5rem]`}
                      style={{ fontFamily: "'DM Serif Text', serif" }}
                    >
                      {product.name}
                    </h3>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleViewDetails(product)}
                        className={`flex-1 ${isDark ? 'bg-[#1a1a1a] border-white text-white hover:bg-white hover:text-amber-900' : 'bg-white border-amber-900 text-amber-900 hover:bg-amber-900 hover:text-white'} border-2 px-4 py-2.5 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 text-sm font-medium`}
                      >
                        <Eye size={16} />
                        View Details
                      </button>
                      <button
                        onClick={(e) => handleAddToCart(product, e)}
                        className="flex-1 bg-amber-900 text-white px-4 py-2.5 rounded-xl hover:bg-amber-800 transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-2 text-sm font-medium"
                      >
                        <ShoppingCart size={16} />
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2">
                <button
                  onClick={handlePrevPage}
                  disabled={currentPage === 1}
                  className={`p-2 rounded-lg transition-all ${
                    currentPage === 1
                      ? `${isDark ? 'bg-[#2a2a2a]' : 'bg-gray-200'} ${isDark ? 'text-gray-600' : 'text-gray-400'} cursor-not-allowed`
                      : `${isDark ? 'bg-[#2a2a2a] text-white hover:bg-amber-900' : 'bg-white text-amber-900 hover:bg-amber-900 hover:text-white'} shadow-md`
                  }`}
                >
                  <ChevronLeft size={20} />
                </button>

                {getPageNumbers().map((page, index) => (
                  <button
                    key={index}
                    onClick={() => typeof page === 'number' && handlePageClick(page)}
                    disabled={page === '...'}
                    className={`min-w-[40px] px-4 py-2 rounded-lg transition-all ${
                      page === currentPage
                        ? 'bg-amber-900 text-white shadow-md'
                        : page === '...'
                        ? `${isDark ? 'bg-transparent text-gray-600' : 'bg-transparent text-gray-400'} cursor-default`
                        : `${isDark ? 'bg-[#2a2a2a] text-gray-300 hover:bg-[#3a3a3a] hover:text-white' : 'bg-white text-gray-700 hover:bg-amber-50 hover:text-amber-900'} shadow-sm`
                    }`}
                  >
                    {page}
                  </button>
                ))}

                <button
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages}
                  className={`p-2 rounded-lg transition-all ${
                    currentPage === totalPages
                      ? `${isDark ? 'bg-[#2a2a2a]' : 'bg-gray-200'} ${isDark ? 'text-gray-600' : 'text-gray-400'} cursor-not-allowed`
                      : `${isDark ? 'bg-[#2a2a2a] text-white hover:bg-amber-900' : 'bg-white text-amber-900 hover:bg-amber-900 hover:text-white'} shadow-md`
                  }`}
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          allProducts={filteredProducts}
          onClose={handleCloseModal}
          onNavigate={handleNavigateProduct}
        />
      )}
    </section>
  );
}
