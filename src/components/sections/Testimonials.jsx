import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaQuoteLeft, FaStar, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import SectionHeading from '../ui/SectionHeading';
import testimonials from '../../data/testimonials';
import { useTheme } from '../../context/ThemeContext';

/**
 * Testimonials — auto-playing slider with glass cards
 */
export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isPaused, setIsPaused] = useState(false);
  const { theme } = useTheme();

  const next = useCallback(() => {
    setDirection(1);
    setCurrent((prev) => (prev + 1) % testimonials.length);
  }, []);

  const prev = () => {
    setDirection(-1);
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  // Auto-play
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [isPaused, next]);

  const variants = {
    enter: (d) => ({ x: d > 0 ? 300 : -300, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (d) => ({ x: d > 0 ? -300 : 300, opacity: 0 }),
  };

  return (
    <section id="testimonials" className="section-padding relative">
      <div className="container-custom">
        <SectionHeading
          title="Testimonials"
          subtitle="What my clients and colleagues have to say."
        />

        <div
          className="max-w-3xl mx-auto relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Testimonial Card */}
          <div className="overflow-hidden min-h-[280px] flex items-center">
            <AnimatePresence custom={direction} mode="wait">
              <motion.div
                key={current}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.4, ease: 'easeInOut' }}
                className="w-full"
              >
                <div className={`rounded-2xl p-8 md:p-10 text-center ${
                  theme === 'dark'
                    ? 'bg-white/[0.05] backdrop-blur-xl border border-white/[0.08]'
                    : 'bg-white/70 backdrop-blur-xl border border-black/[0.06] shadow-lg'
                }`}>
                  <FaQuoteLeft className="text-3xl text-primary/30 mx-auto mb-6" />

                  <p className={`text-lg md:text-xl leading-relaxed mb-6 italic ${
                    theme === 'dark' ? 'text-dark-muted' : 'text-light-muted'
                  }`}>
                    "{testimonials[current].text}"
                  </p>

                  {/* Stars */}
                  <div className="flex justify-center gap-1 mb-4">
                    {[...Array(testimonials[current].rating)].map((_, i) => (
                      <FaStar key={i} className="text-yellow-400" size={14} />
                    ))}
                  </div>

                  {/* Avatar + Name */}
                  <div className="flex items-center justify-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-heading font-bold text-sm">
                      {testimonials[current].name.split(' ').map((n) => n[0]).join('')}
                    </div>
                    <div className="text-left">
                      <h4 className={`font-heading font-semibold ${
                        theme === 'dark' ? 'text-white' : 'text-light-text'
                      }`}>{testimonials[current].name}</h4>
                      <p className={`text-sm ${
                        theme === 'dark' ? 'text-dark-muted' : 'text-light-muted'
                      }`}>{testimonials[current].role}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <motion.button
              onClick={prev}
              className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
                theme === 'dark'
                  ? 'bg-white/5 hover:bg-white/10 text-white'
                  : 'bg-black/5 hover:bg-black/10 text-light-text'
              }`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Previous testimonial"
            >
              <FaChevronLeft size={14} />
            </motion.button>

            {/* Dots */}
            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => { setDirection(index > current ? 1 : -1); setCurrent(index); }}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === current
                      ? 'bg-primary w-6'
                      : theme === 'dark' ? 'bg-white/20' : 'bg-black/20'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>

            <motion.button
              onClick={next}
              className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
                theme === 'dark'
                  ? 'bg-white/5 hover:bg-white/10 text-white'
                  : 'bg-black/5 hover:bg-black/10 text-light-text'
              }`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Next testimonial"
            >
              <FaChevronRight size={14} />
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  );
}
