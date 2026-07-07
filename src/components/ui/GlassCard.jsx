import { useRef } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';

/**
 * GlassCard — reusable glassmorphism card with mouse-tracking glow effect
 */
export default function GlassCard({
  children,
  className = '',
  glowColor = 'rgba(37, 99, 235, 0.15)',
  hover = true,
  ...props
}) {
  const cardRef = useRef(null);
  const { theme } = useTheme();

  const handleMouseMove = (e) => {
    if (!cardRef.current || !hover) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    cardRef.current.style.setProperty('--mouse-x', `${x}px`);
    cardRef.current.style.setProperty('--mouse-y', `${y}px`);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      className={`relative overflow-hidden rounded-2xl ${
        theme === 'dark'
          ? 'bg-white/[0.05] border border-white/[0.08]'
          : 'bg-white/70 border border-black/[0.06] shadow-lg shadow-black/[0.03]'
      } backdrop-blur-xl transition-colors duration-500 ${className}`}
      style={{
        '--glow-color': glowColor,
      }}
      whileHover={hover ? {
        y: -4,
        transition: { duration: 0.3, ease: 'easeOut' },
      } : {}}
      {...props}
    >
      {/* Mouse-tracking glow */}
      {hover && (
        <div
          className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background: `radial-gradient(300px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), var(--glow-color), transparent 60%)`,
          }}
        />
      )}
      {children}
    </motion.div>
  );
}
