import { motion } from 'framer-motion';
import { FaSun, FaMoon } from 'react-icons/fa';
import { useTheme } from '../../context/ThemeContext';

/**
 * ThemeToggle — animated dark/light mode switch
 */
export default function ThemeToggle({ className = '' }) {
  const { theme, toggleTheme } = useTheme();

  return (
    <motion.button
      onClick={toggleTheme}
      className={`relative w-10 h-10 rounded-xl flex items-center justify-center transition-colors duration-300 ${
        theme === 'dark'
          ? 'bg-white/10 hover:bg-white/20 text-yellow-400'
          : 'bg-black/5 hover:bg-black/10 text-indigo-600'
      } ${className}`}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9, rotate: 180 }}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    >
      <motion.div
        key={theme}
        initial={{ rotate: -90, opacity: 0, scale: 0 }}
        animate={{ rotate: 0, opacity: 1, scale: 1 }}
        exit={{ rotate: 90, opacity: 0, scale: 0 }}
        transition={{ duration: 0.3 }}
      >
        {theme === 'dark' ? <FaSun size={18} /> : <FaMoon size={18} />}
      </motion.div>
    </motion.button>
  );
}
