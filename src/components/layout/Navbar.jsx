import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiMenuAlt3, HiX } from 'react-icons/hi';
import { useScrollProgress } from '../../hooks/useScrollProgress';
import ThemeToggle from '../ui/ThemeToggle';
import { useTheme } from '../../context/ThemeContext';
import personalInfo from '../../data/personalInfo';

const navLinks = [
  { name: 'Home', id: 'hero' },
  { name: 'About', id: 'about' },
  { name: 'Skills', id: 'skills' },
  { name: 'Projects', id: 'projects' },
  { name: 'Experience', id: 'experience' },
  { name: 'Contact', id: 'contact' },
];

/**
 * Navbar — sticky glass navigation with scroll progress bar and mobile drawer
 */
export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const progress = useScrollProgress();
  const { theme } = useTheme();

  // Handle scroll effects (navbar shrink + active section detection)
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Detect active section based on scroll position (centered around top 30% of viewport)
      const scrollPosition = window.scrollY + window.innerHeight * 0.3;

      let currentSection = 'hero';
      for (const link of navLinks) {
        const el = document.getElementById(link.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            currentSection = link.id;
          }
        }
      }
      setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Trigger once on mount
    handleScroll();

    // Trigger after a short delay to account for lazy-loaded components rendering
    const timer = setTimeout(handleScroll, 1000);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timer);
    };
  }, []);

  const scrollTo = (id) => {
    setMobileOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      {/* Scroll Progress Bar */}
      <div className="fixed top-0 left-0 right-0 z-[60] h-[3px]">
        <motion.div
          className="h-full bg-gradient-to-r from-primary via-secondary to-accent"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Navbar */}
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? theme === 'dark'
              ? 'bg-dark-bg/80 backdrop-blur-2xl border-b border-white/5 py-3'
              : 'bg-light-bg/80 backdrop-blur-2xl border-b border-black/5 py-3'
            : 'py-5'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <div className="container-custom flex items-center justify-between">
          {/* Logo */}
          <motion.button
            onClick={() => scrollTo('hero')}
            className="flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-heading font-bold text-sm">
              {personalInfo.initials}
            </div>
            <span className={`font-heading font-bold text-lg hidden sm:block ${
              theme === 'dark' ? 'text-white' : 'text-light-text'
            }`}>
              {personalInfo.firstName}
              <span className="gradient-text">.</span>
            </span>
          </motion.button>

          {/* Desktop Links */}
          <div className={`hidden lg:flex items-center gap-6 px-4 py-1.5 rounded-full ${
            theme === 'dark'
              ? 'bg-white/[0.03] border border-white/[0.08]'
              : 'bg-black/[0.03] border border-black/[0.06]'
          }`}>
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className={`relative px-5 py-2 rounded-full text-sm font-semibold tracking-wider transition-all duration-300 ${
                  activeSection === link.id
                    ? theme === 'dark'
                      ? 'text-white'
                      : 'text-light-text'
                    : theme === 'dark'
                      ? 'text-dark-muted hover:text-white'
                      : 'text-light-muted hover:text-light-text'
                }`}
              >
                {link.name}
                {activeSection === link.id && (
                  <motion.div
                    layoutId="activeNav"
                    className={`absolute inset-0 rounded-full ${
                      theme === 'dark'
                        ? 'bg-white/[0.08] shadow-[0_0_20px_rgba(139,92,246,0.15)]'
                        : 'bg-black/[0.05] shadow-sm'
                    }`}
                    transition={{ type: 'spring', duration: 0.5, bounce: 0.2 }}
                  />
                )}
                {activeSection === link.id && (
                  <motion.div
                    layoutId="activeNavDot"
                    className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-primary"
                    transition={{ type: 'spring', duration: 0.5, bounce: 0.2 }}
                  />
                )}
              </button>
            ))}
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                const event = new KeyboardEvent('keydown', {
                  key: 'k',
                  ctrlKey: true,
                  metaKey: true,
                  bubbles: true
                });
                window.dispatchEvent(event);
              }}
              className={`hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-mono transition-all duration-300 hover:scale-105 active:scale-95 ${
                theme === 'dark'
                  ? 'text-dark-muted bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20'
                  : 'text-light-muted bg-black/5 border border-black/10 hover:bg-black/10 hover:border-black/20'
              }`}
              title="Open Command Palette (Ctrl+K)"
            >
              <span className={theme === 'dark' ? 'text-dark-subtle' : 'text-light-subtle'}>⌘K</span>
            </button>
            <ThemeToggle />

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className={`lg:hidden w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
                theme === 'dark'
                  ? 'bg-white/10 hover:bg-white/20 text-white'
                  : 'bg-black/5 hover:bg-black/10 text-light-text'
              }`}
              aria-label="Toggle navigation menu"
            >
              {mobileOpen ? <HiX size={20} /> : <HiMenuAlt3 size={20} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              className={`fixed top-0 right-0 z-45 h-full w-72 lg:hidden ${
                theme === 'dark'
                  ? 'bg-dark-surface/95 border-l border-white/10'
                  : 'bg-white/95 border-l border-black/10'
              } backdrop-blur-xl`}
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            >
              <div className="p-6 pt-20 space-y-2">
                {navLinks.map((link, index) => (
                  <motion.button
                    key={link.id}
                    onClick={() => scrollTo(link.id)}
                    className={`block w-full text-left px-4 py-3 rounded-xl text-base font-medium transition-colors ${
                      activeSection === link.id
                        ? 'bg-primary/20 text-primary'
                        : theme === 'dark'
                          ? 'text-dark-muted hover:bg-white/5 hover:text-white'
                          : 'text-light-muted hover:bg-black/5 hover:text-light-text'
                    }`}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    {link.name}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
