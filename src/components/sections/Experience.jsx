import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaExternalLinkAlt } from 'react-icons/fa';
import { HiXMark } from 'react-icons/hi2';
import SectionHeading from '../ui/SectionHeading';
import GlassCard from '../ui/GlassCard';
import experience from '../../data/experience';
import { useTheme } from '../../context/ThemeContext';

/**
 * Experience — vertical animated timeline with alternating cards
 */
export default function Experience() {
  const { theme } = useTheme();
  const [selectedCertificate, setSelectedCertificate] = useState(null);

  return (
    <section id="experience" className="section-padding relative">
      <div className="container-custom">
        <SectionHeading
          title="Experience"
          subtitle="My professional journey and contributions."
        />

        {/* Experience Cards */}
        <div className="max-w-4xl mx-auto space-y-8">
          {experience.map((item, index) => (
            <motion.div
              key={item.id}
              className="w-full"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <GlassCard className="p-6 md:p-8 hover:border-primary/20 transition-all duration-300 w-full">
                <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-center w-full">
                  {/* Certificate Left Side */}
                  {item.certificateUrl && (
                    <div
                      className="w-full md:w-[45%] shrink-0 relative rounded-xl overflow-hidden bg-black/20 border border-white/5 aspect-[16/10] cursor-pointer group/cert"
                      onClick={() => setSelectedCertificate(item.certificateUrl)}
                    >
                      <img
                        src={item.certificateUrl}
                        alt={`${item.company} Certificate`}
                        className="w-full h-full object-cover object-center transition-transform duration-500 group-hover/cert:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-dark-bg/70 to-transparent opacity-0 group-hover/cert:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <span className="px-4 py-1.5 rounded-full bg-primary text-white text-xs font-semibold tracking-wide shadow-md flex items-center gap-1.5">
                          Open Preview <FaExternalLinkAlt size={10} />
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Text Details Right Side */}
                  <div className="flex-1 text-left w-full">
                    {/* Type Badge */}
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium mb-3 ${
                      item.type === 'internship' ? 'bg-primary/10 text-primary' :
                      item.type === 'freelance' ? 'bg-secondary/10 text-secondary' :
                      item.type === 'training' ? 'bg-accent/10 text-accent' :
                      'bg-green-500/10 text-green-400'
                    }`}>
                      {item.type === 'opensource' ? 'Open Source' : item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                    </span>

                    <h3 className={`text-lg md:text-xl font-heading font-semibold mb-1 ${
                      theme === 'dark' ? 'text-white' : 'text-light-text'
                    }`}>{item.role}</h3>

                    <p className="text-primary text-sm font-medium mb-1">{item.company}</p>
                    <p className={`text-xs mb-3 ${
                      theme === 'dark' ? 'text-dark-subtle' : 'text-light-subtle'
                    }`}>{item.duration} • {item.location}</p>

                    <p className={`text-sm mb-4 leading-relaxed ${
                      theme === 'dark' ? 'text-dark-muted' : 'text-light-muted'
                    }`}>{item.description}</p>

                    {/* Technologies */}
                    <div className="flex flex-wrap gap-1.5">
                      {item.technologies.map((tech) => (
                        <span
                          key={tech}
                          className={`px-2 py-1 rounded-md text-xs ${
                            theme === 'dark'
                              ? 'bg-white/5 text-dark-muted'
                              : 'bg-black/5 text-light-muted'
                          }`}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox / Modal */}
      <AnimatePresence>
        {selectedCertificate && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-black/85 backdrop-blur-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedCertificate(null)}
            />

            {/* Modal Content */}
            <motion.div
              className={`relative w-full max-w-4xl max-h-[90vh] overflow-hidden rounded-2xl border ${
                theme === 'dark'
                  ? 'bg-dark-surface/95 border-white/10'
                  : 'bg-white/95 border-black/10 shadow-2xl'
              } flex flex-col z-10`}
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between p-6 border-b border-white/5">
                <div className="flex items-center gap-3">
                  <div className="text-left">
                    <h3 className={`font-heading font-semibold text-lg md:text-xl ${
                      theme === 'dark' ? 'text-white' : 'text-light-text'
                    }`}>Internship Certificate</h3>
                    <p className="text-primary text-sm font-medium">Codec Technologies</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedCertificate(null)}
                  className={`p-2 rounded-lg transition-colors ${
                    theme === 'dark' ? 'hover:bg-white/10 text-white/70' : 'hover:bg-black/10 text-black/70'
                  }`}
                >
                  <HiXMark size={24} />
                </button>
              </div>

              {/* Modal Body */}
              <div className="flex-1 overflow-y-auto p-6 flex flex-col items-center justify-center">
                {/* Certificate Render */}
                <div className="relative w-full h-[60vh] min-h-[350px] bg-black/20 rounded-xl overflow-hidden flex items-center justify-center border border-white/5">
                  <img
                    src={selectedCertificate}
                    alt="Internship Certificate"
                    className="w-full h-full object-contain bg-white"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
