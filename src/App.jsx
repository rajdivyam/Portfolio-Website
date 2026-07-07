import { useState, useCallback } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import ScrollToTop from './components/layout/ScrollToTop';
import Loader from './components/layout/Loader';
import CustomCursor from './components/ui/CustomCursor';
import ParticleBackground from './components/ui/ParticleBackground';
import CommandPalette from './components/ui/CommandPalette';
import Home from './pages/Home';
import NotFound from './pages/NotFound';

/**
 * App — root component with routing, theme, cursor, and particles
 */
export default function App() {
  const [loading, setLoading] = useState(true);

  const handleLoadComplete = useCallback(() => {
    setLoading(false);
  }, []);

  return (
    <ThemeProvider>
      <BrowserRouter>
        {/* Custom Cursor */}
        <CustomCursor />

        {/* Particle Background */}
        <ParticleBackground />

        {/* Command Palette */}
        <CommandPalette />

        {/* Loading Screen */}
        <AnimatePresence>
          {loading && <Loader onComplete={handleLoadComplete} />}
        </AnimatePresence>

        {/* Main Content */}
        {!loading && (
          <>
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
            <Footer />
            <ScrollToTop />
          </>
        )}
      </BrowserRouter>
    </ThemeProvider>
  );
}
