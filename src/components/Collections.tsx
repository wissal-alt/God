import { useState, useEffect } from 'react';
import { Grid } from 'lucide-react';
import CircularGallery from './CircularGallery';
import { parseCategoriesCSV, type Category } from '../utils/categoriesParser';
import { parseProductsCSV, type Product } from '../utils/csvParser';
import { useTheme } from '../context/ThemeContext';
import { useCategoryModal } from '../context/CategoryContext';

export default function Collections() {
  const { isDark } = useTheme();
  const { openCategoryModal } = useCategoryModal();
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      const categoriesData = await parseCategoriesCSV();
      const productsData = await parseProductsCSV();
      setCategories(categoriesData);
      setProducts(productsData);
      setLoading(false);
    }
    loadData();
  }, []);

  const handleCategoryClick = (categoryName: string) => {
    const categoryProducts = products.filter(p => p.category === categoryName);
    openCategoryModal(categoryName, categoryProducts);
  };

  const galleryItems = categories.map(cat => ({
    image: cat.imageUrl,
    text: cat.name,
    onClick: () => handleCategoryClick(cat.name)
  }));

  return (
    <section id="collections" className={`w-full bg-white dark:bg-[#111133] section-transition collections-transition ${isDark ? 'dark' : ''}`}>
      <div className="px-6 lg:px-8 pt-16">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="flex justify-center mb-6">
              <Grid className="w-12 h-12 text-amber-900 dark:text-white" strokeWidth={1.5} />
            </div>
            <h2
              className="text-4xl md:text-5xl text-amber-900 dark:text-white mb-4"
              style={{ fontFamily: "'DM Serif Text', serif" }}
            >
              Curated with Care
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Thoughtfully selected pieces that reflect warmth, craftsmanship, and quiet elegance.
            </p>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center py-24">
          <p className="text-lg text-gray-600 dark:text-gray-300">Loading categories...</p>
        </div>
      ) : (
        <div className="w-full" style={{ height: '700px', position: 'relative' }}>
          <CircularGallery
            items={galleryItems}
            bend={3}
            textColor="#92410e"
            borderRadius={0.05}
            scrollEase={0.02}
            onItemClick={(item) => item.onClick?.()}
          />
        </div>
      )}

      <div className="pb-16"></div>
    </section>
  );
}
