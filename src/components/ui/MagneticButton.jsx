import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { useTheme } from '../../context/ThemeContext';

/**
 * MagneticButton — button with GSAP magnetic pull and ripple effect
 */
export default function MagneticButton({
  children,
  className = '',
  variant = 'primary',
  href,
  onClick,
  download,
  target,
  rel,
  ...props
}) {
  const btnRef = useRef(null);
  const [ripple, setRipple] = useState(null);

  const handleMouseMove = (e) => {
    if (!btnRef.current) return;
    const rect = btnRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    gsap.to(btnRef.current, {
      x: x * 0.3,
      y: y * 0.3,
      duration: 0.3,
      ease: 'power2.out',
    });
  };

  const handleMouseLeave = () => {
    if (!btnRef.current) return;
    gsap.to(btnRef.current, {
      x: 0,
      y: 0,
      duration: 0.5,
      ease: 'elastic.out(1, 0.3)',
    });
  };

  const handleClick = (e) => {
    const rect = btnRef.current.getBoundingClientRect();
    setRipple({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
    setTimeout(() => setRipple(null), 600);
    onClick?.(e);
  };



  const { theme } = useTheme();

  const baseClasses = "group relative overflow-hidden font-heading font-medium px-8 py-3.5 rounded-full text-sm transition-all duration-300 flex items-center gap-2.5 justify-center shadow-sm cursor-pointer select-none active:scale-[0.98] w-full sm:w-auto min-w-[160px]";

  const variants = {
    primary: theme === 'dark'
      ? "bg-white text-dark-bg hover:bg-white/90 hover:shadow-[0_8px_30px_rgba(255,255,255,0.15)] border-none font-semibold"
      : "bg-dark-bg text-white hover:bg-dark-bg/90 hover:shadow-[0_8px_30px_rgba(15,23,42,0.2)] border-none font-semibold",
    secondary: theme === 'dark'
      ? "bg-white/[0.05] border border-white/10 text-white hover:bg-white/[0.1] hover:border-white/20"
      : "bg-black/[0.04] border border-black/10 text-light-text hover:bg-black/[0.08] hover:border-black/20",
    outline: theme === 'dark'
      ? "bg-transparent border border-white/20 text-white hover:bg-white/5 hover:border-white/40"
      : "bg-transparent border border-black/20 text-light-text hover:bg-black/5 hover:border-black/40"
  };

  const Tag = href ? 'a' : 'button';
  const linkProps = href ? { href, target, rel, download } : {};

  return (
    <motion.div
      ref={btnRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="inline-block"
      whileTap={{ scale: 0.95 }}
    >
      <Tag
        className={`${baseClasses} ${variants[variant] || variants.primary} ${className}`}
        onClick={handleClick}
        {...linkProps}
        {...props}
      >
        {children}

        {/* Ripple effect */}
        {ripple && (
          <span
            className="absolute rounded-full bg-white/30 animate-ping"
            style={{
              left: ripple.x - 10,
              top: ripple.y - 10,
              width: 20,
              height: 20,
            }}
          />
        )}
      </Tag>
    </motion.div>
  );
}
