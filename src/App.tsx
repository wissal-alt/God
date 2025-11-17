import { ThemeProvider } from './context/ThemeContext';
import { CategoryProvider } from './context/CategoryContext';
import Navigation from './components/Navigation';
import ThemeToggle from './components/ThemeToggle';
import Hero from './components/Hero';
import Collections from './components/Collections';
import Products from './components/Products';
import About from './components/About';
import FAQ from './components/FAQ';
import Consultation from './components/Consultation';
import RareFinds from './components/RareFinds';
import Contact from './components/Contact';
import Footer from './components/Footer';
import CategoryProductsModal from './components/CategoryProductsModal';

function App() {
  return (
    <ThemeProvider>
      <CategoryProvider>
        <div className="min-h-screen bg-white dark:bg-[#111133] transition-colors duration-300">
          <Navigation />
          <ThemeToggle />
          <Hero />
          <Collections />
          <Products />
          <About />
          <FAQ />
          <Consultation />
          <RareFinds />
          <Contact />
          <Footer />
          <CategoryProductsModal />
        </div>
      </CategoryProvider>
    </ThemeProvider>
  );
}

export default App;
