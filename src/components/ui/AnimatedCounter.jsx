import { useCountUp } from '../../hooks/useCountUp';
import { useTheme } from '../../context/ThemeContext';

/**
 * AnimatedCounter — displays a number that counts up when scrolled into view
 */
export default function AnimatedCounter({ target, suffix = '', prefix = '', label, icon: Icon }) {
  const { count, ref } = useCountUp(target, 2000);
  const { theme } = useTheme();

  return (
    <div ref={ref} className="text-center">
      {Icon && (
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 mb-4">
          <Icon className="text-2xl gradient-text" />
        </div>
      )}
      <div className="text-4xl md:text-5xl font-heading font-bold gradient-text mb-2">
        {prefix}{count}{suffix}
      </div>
      <p className={`text-sm uppercase tracking-wider font-medium ${
        theme === 'dark' ? 'text-dark-muted' : 'text-light-muted'
      }`}>
        {label}
      </p>
    </div>
  );
}
