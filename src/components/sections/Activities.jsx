import { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionHeading from '../ui/SectionHeading';
import GlassCard from '../ui/GlassCard';
import activities from '../../data/activities';
import { useTheme } from '../../context/ThemeContext';
import { FaTimes } from 'react-icons/fa';

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring', stiffness: 100, damping: 15 } },
};

/**
 * Activities — showcases co-curricular involvements with hover interactions and gradient accent rings
 */
export default function Activities() {
  const { theme } = useTheme();
  const [lightbox, setLightbox] = useState(null); // { gallery, currentIndex }

  const openLightbox = useCallback((gallery) => {
    if (gallery && gallery.length > 0) {
      setLightbox({ gallery, currentIndex: 0 });
    }
  }, []);

  const closeLightbox = useCallback(() => {
    setLightbox(null);
  }, []);



  // Keyboard: Escape to close
  useEffect(() => {
    if (!lightbox) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') closeLightbox();
    };
    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [lightbox, closeLightbox]);

  return (
    <section id="activities" className="section-padding relative overflow-hidden">
      {/* Background ambient glows */}
      <div className="absolute top-1/3 left-1/4 -translate-x-1/2 w-72 h-72 rounded-full bg-primary/10 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 translate-x-1/2 w-72 h-72 rounded-full bg-secondary/10 blur-[100px] pointer-events-none" />

      <div className="container-custom relative z-10">
        <SectionHeading
          title="Co-curricular Activities"
          subtitle="My contributions and active participations outside the classroom."
        />

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto"
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {activities.map((activity) => {
            const Icon = activity.icon;
            const hasGallery = activity.gallery && activity.gallery.length > 0;
            return (
              <motion.div
                key={activity.id}
                variants={fadeUp}
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                onClick={() => hasGallery && openLightbox(activity.gallery)}
                style={{ cursor: hasGallery ? 'pointer' : 'default' }}
              >
                <GlassCard className="h-full relative overflow-hidden group hover:border-primary/30 transition-all duration-300 flex flex-col">
                  {/* Activity Image Banner */}
                  {activity.image && (
                    <div className="relative h-64 w-full overflow-hidden">
                      <img
                        src={activity.image}
                        alt={activity.title}
                        className={`w-full h-full object-cover ${activity.imagePosition || 'object-center'} group-hover:scale-105 transition-transform duration-700 ease-out`}
                      />
                      <div className={`absolute inset-0 bg-gradient-to-t ${
                        theme === 'dark' ? 'from-dark-surface via-transparent' : 'from-light-surface via-transparent'
                      } to-transparent opacity-80`} />
                      {/* Gallery indicator badge */}
                      {hasGallery && (
                        <div className="absolute top-4 right-4 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/50 backdrop-blur-md border border-white/10 text-white text-xs font-medium shadow-lg">
                          <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          {activity.gallery.length} Photos
                        </div>
                      )}
                    </div>
                  )}

                  {/* Subtle inner background gradient hover effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/[0.01] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                  <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-4 relative z-10">
                    <div className="flex flex-col sm:flex-row items-start gap-5">
                      {/* Icon container with hover animation */}
                      <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${activity.color} flex items-center justify-center shrink-0 shadow-lg shadow-black/10 group-hover:scale-110 transition-transform duration-300`}>
                        <Icon className="text-2xl text-white" />
                      </div>

                      <div className="space-y-3">
                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold tracking-wide ${
                          theme === 'dark'
                            ? 'bg-white/10 text-dark-muted border border-white/5'
                            : 'bg-black/5 text-light-muted border border-black/5'
                        }`}>
                          {activity.category}
                        </span>
                        <h3 className={`font-heading text-xl font-bold ${
                          theme === 'dark' ? 'text-white' : 'text-light-text'
                        }`}>
                          {activity.title}
                        </h3>
                        <p className={`text-base leading-relaxed ${
                          theme === 'dark' ? 'text-dark-muted' : 'text-light-muted'
                        }`}>
                          {activity.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* ─── Lightbox Modal ─── */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-black/85 backdrop-blur-xl"
              onClick={closeLightbox}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            {/* Close button */}
            <button
              onClick={closeLightbox}
              className="absolute top-6 right-6 z-50 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300 hover:scale-110 shadow-lg"
              aria-label="Close gallery"
            >
              <FaTimes className="text-xl" />
            </button>

            {/* All images grid */}
            <motion.div
              className="relative z-40 w-full max-w-6xl max-h-[90vh] overflow-y-auto flex flex-col sm:flex-row items-center justify-center gap-6"
              initial={{ scale: 0.85, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.85, opacity: 0, y: 30 }}
              transition={{ type: 'spring', stiffness: 200, damping: 25 }}
              onClick={(e) => e.stopPropagation()}
            >
              {lightbox.gallery.map((photo, idx) => (
                <motion.div
                  key={idx}
                  className="flex flex-col items-center gap-3"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1, type: 'spring', stiffness: 200, damping: 20 }}
                >
                  <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-black/50 border border-white/10 bg-black/40">
                    <img
                      src={photo.src}
                      alt={photo.caption}
                      className="max-h-[75vh] w-auto max-w-[85vw] sm:max-w-[42vw] object-contain"
                    />
                  </div>
                  <p className="text-white/80 text-base font-medium text-center">
                    {photo.caption}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
