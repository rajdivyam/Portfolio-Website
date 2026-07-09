import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSearch, FaArrowRight } from 'react-icons/fa';
import { HiCommandLine } from 'react-icons/hi2';
import { useTheme } from '../../context/ThemeContext';
import personalInfo from '../../data/personalInfo';

/**
 * CommandPalette — Ctrl+K / Cmd+K command palette for quick navigation
 */

const sections = [
  { name: 'Home', id: 'hero', emoji: '🏠' },
  { name: 'About', id: 'about', emoji: '👤' },
  { name: 'Skills', id: 'skills', emoji: '🛠️' },
  { name: 'Projects', id: 'projects', emoji: '🚀' },
  { name: 'Experience', id: 'experience', emoji: '💼' },
  { name: 'Certifications', id: 'certifications', emoji: '📜' },
  { name: 'Achievements', id: 'achievements', emoji: '🏆' },
  { name: 'Activities', id: 'activities', emoji: '🎯' },
  { name: 'Services', id: 'services', emoji: '⚙️' },
  { name: 'FAQ', id: 'faq', emoji: '❓' },
  { name: 'Contact', id: 'contact', emoji: '📧' },
];

const actions = [
  { name: 'Download Resume', action: 'resume', emoji: '📄' },
  { name: 'Toggle Theme', action: 'theme', emoji: '🌗' },
  { name: 'GitHub Profile', action: 'github', emoji: '🐙' },
  { name: 'LinkedIn Profile', action: 'linkedin', emoji: '💼' },
];

export default function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef(null);
  const { theme, toggleTheme } = useTheme();

  // Filter results based on query
  const results = useMemo(() => {
    const q = query.toLowerCase();
    const filteredSections = sections.filter((s) => s.name.toLowerCase().includes(q));
    const filteredActions = actions.filter((a) => a.name.toLowerCase().includes(q));
    return [...filteredSections.map(s => ({ ...s, type: 'section' })), ...filteredActions.map(a => ({ ...a, type: 'action' }))];
  }, [query]);

  // Keyboard shortcut to open
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (e.key === 'Escape') setIsOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  // Keyboard navigation
  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => Math.min(prev + 1, results.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => Math.max(prev - 1, 0));
    } else if (e.key === 'Enter' && results[selectedIndex]) {
      executeResult(results[selectedIndex]);
    }
  };

  const executeResult = (result) => {
    setIsOpen(false);
    if (result.type === 'section') {
      const el = document.getElementById(result.id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else if (result.action === 'theme') {
      toggleTheme();
    } else if (result.action === 'resume') {
      window.open('/resume.pdf', '_blank');
    } else if (result.action === 'github') {
      const url = personalInfo.socialLinks.find(s => s.name === 'GitHub')?.url || 'https://github.com/rajdivyam';
      window.open(url, '_blank');
    } else if (result.action === 'linkedin') {
      const url = personalInfo.socialLinks.find(s => s.name === 'LinkedIn')?.url || 'https://linkedin.com';
      window.open(url, '_blank');
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
          />

          {/* Palette Modal */}
          <motion.div
            className="fixed top-[20%] left-1/2 z-[101] w-[90%] max-w-lg"
            initial={{ opacity: 0, y: -20, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: -20, x: '-50%' }}
            transition={{ duration: 0.2 }}
          >
            <div className={`rounded-2xl overflow-hidden shadow-2xl ${
              theme === 'dark'
                ? 'bg-dark-surface/95 border border-white/10'
                : 'bg-white/95 border border-black/10'
            } backdrop-blur-xl`}>
              {/* Search Input */}
              <div className={`flex items-center gap-3 px-5 py-4 border-b ${
                theme === 'dark' ? 'border-white/10' : 'border-black/10'
              }`}>
                <FaSearch className={theme === 'dark' ? 'text-dark-muted' : 'text-light-muted'} />
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Search sections, actions..."
                  value={query}
                  onChange={(e) => { setQuery(e.target.value); setSelectedIndex(0); }}
                  onKeyDown={handleKeyDown}
                  className={`flex-1 bg-transparent outline-none text-base ${
                    theme === 'dark' ? 'text-white placeholder-dark-muted' : 'text-light-text placeholder-light-muted'
                  }`}
                />
                <kbd className={`px-2 py-0.5 rounded text-xs font-mono ${
                  theme === 'dark' ? 'bg-white/10 text-dark-muted' : 'bg-black/5 text-light-muted'
                }`}>ESC</kbd>
              </div>

              {/* Results */}
              <div className="max-h-72 overflow-y-auto py-2">
                {results.map((result, index) => (
                  <button
                    key={result.name}
                    onClick={() => executeResult(result)}
                    className={`w-full flex items-center gap-3 px-5 py-3 text-left transition-colors ${
                      index === selectedIndex
                        ? theme === 'dark' ? 'bg-white/10' : 'bg-primary/10'
                        : 'hover:bg-white/5'
                    }`}
                  >
                    <span className="text-lg">{result.emoji}</span>
                    <span className={`flex-1 font-medium ${
                      theme === 'dark' ? 'text-white' : 'text-light-text'
                    }`}>{result.name}</span>
                    <FaArrowRight className={`text-xs ${
                      theme === 'dark' ? 'text-dark-muted' : 'text-light-muted'
                    }`} />
                  </button>
                ))}

                {results.length === 0 && (
                  <div className={`px-5 py-8 text-center ${
                    theme === 'dark' ? 'text-dark-muted' : 'text-light-muted'
                  }`}>
                    No results found
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className={`flex items-center justify-between px-5 py-3 border-t text-xs ${
                theme === 'dark' ? 'border-white/10 text-dark-subtle' : 'border-black/10 text-light-subtle'
              }`}>
                <div className="flex items-center gap-2">
                  <HiCommandLine />
                  <span>Navigate with ↑ ↓ and Enter</span>
                </div>
                <span>Ctrl + K</span>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
