import { motion } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';

/**
 * SectionHeading — reusable section title with gradient text and animated underline
 */
export default function SectionHeading({ title, subtitle, className = '' }) {
  const { theme } = useTheme();

  return (
    <motion.div
      className={`text-center mb-16 ${className}`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <motion.h2
        className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-4"
      >
        <span className="gradient-text">{title}</span>
      </motion.h2>

      {subtitle && (
        <p className={`text-lg max-w-2xl mx-auto ${
          theme === 'dark' ? 'text-dark-muted' : 'text-light-muted'
        }`}>
          {subtitle}
        </p>
      )}

      {/* Animated gradient underline */}
      <motion.div
        className="mt-6 mx-auto h-1 rounded-full bg-gradient-to-r from-primary via-secondary to-accent"
        initial={{ width: 0 }}
        whileInView={{ width: 80 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
      />
    </motion.div>
  );
}
