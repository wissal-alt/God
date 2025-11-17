import { createContext, useContext, useState, ReactNode } from 'react';
import type { Product } from '../utils/csvParser';

interface CategoryModalState {
  isOpen: boolean;
  categoryName: string | null;
  products: Product[];
  selectedProduct: Product | null;
}

interface CategoryContextType {
  modalState: CategoryModalState;
  openCategoryModal: (categoryName: string, products: Product[]) => void;
  closeCategoryModal: () => void;
  selectProduct: (product: Product) => void;
  clearSelectedProduct: () => void;
}

const CategoryContext = createContext<CategoryContextType | undefined>(undefined);

export function CategoryProvider({ children }: { children: ReactNode }) {
  const [modalState, setModalState] = useState<CategoryModalState>({
    isOpen: false,
    categoryName: null,
    products: [],
    selectedProduct: null,
  });

  const openCategoryModal = (categoryName: string, products: Product[]) => {
    setModalState({
      isOpen: true,
      categoryName,
      products,
      selectedProduct: null,
    });
  };

  const closeCategoryModal = () => {
    setModalState({
      isOpen: false,
      categoryName: null,
      products: [],
      selectedProduct: null,
    });
  };

  const selectProduct = (product: Product) => {
    setModalState(prev => ({
      ...prev,
      selectedProduct: product,
    }));
  };

  const clearSelectedProduct = () => {
    setModalState(prev => ({
      ...prev,
      selectedProduct: null,
    }));
  };

  return (
    <CategoryContext.Provider
      value={{
        modalState,
        openCategoryModal,
        closeCategoryModal,
        selectProduct,
        clearSelectedProduct,
      }}
    >
      {children}
    </CategoryContext.Provider>
  );
}

export function useCategoryModal() {
  const context = useContext(CategoryContext);
  if (!context) {
    throw new Error('useCategoryModal must be used within CategoryProvider');
  }
  return context;
}
