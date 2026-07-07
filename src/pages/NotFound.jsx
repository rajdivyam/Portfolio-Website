import { motion } from 'framer-motion';
import { FaHome } from 'react-icons/fa';
import MagneticButton from '../components/ui/MagneticButton';
import { useTheme } from '../context/ThemeContext';

/**
 * NotFound — animated 404 page with glitch-style text
 */
export default function NotFound() {
  const { theme } = useTheme();

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-primary/10 blur-[120px]" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-secondary/10 blur-[100px]" />

      <div className="text-center relative z-10 px-6">
        {/* Large 404 */}
        <motion.h1
          className="text-[10rem] md:text-[14rem] font-heading font-bold leading-none gradient-text"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          404
        </motion.h1>

        <motion.p
          className={`text-xl md:text-2xl font-heading mb-4 ${
            theme === 'dark' ? 'text-white' : 'text-light-text'
          }`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          Page Not Found
        </motion.p>

        <motion.p
          className={`text-sm mb-8 max-w-md mx-auto ${
            theme === 'dark' ? 'text-dark-muted' : 'text-light-muted'
          }`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          The page you're looking for doesn't exist or has been moved.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <MagneticButton href="/" variant="primary">
            <FaHome size={14} />
            Back to Home
          </MagneticButton>
        </motion.div>

        {/* Floating numbers */}
        {['4', '0', '4'].map((num, i) => (
          <motion.span
            key={i}
            className={`absolute text-6xl font-heading font-bold ${
              theme === 'dark' ? 'text-white/[0.02]' : 'text-black/[0.02]'
            }`}
            style={{
              top: `${20 + i * 25}%`,
              left: `${10 + i * 30}%`,
            }}
            animate={{
              y: [0, -20, 0],
              rotate: [0, 10, -10, 0],
            }}
            transition={{
              duration: 4 + i,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            {num}
          </motion.span>
        ))}
      </div>
    </section>
  );
}
