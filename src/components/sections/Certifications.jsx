import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaExternalLinkAlt, FaCertificate } from 'react-icons/fa';
import { HiXMark } from 'react-icons/hi2';
import SectionHeading from '../ui/SectionHeading';
import GlassCard from '../ui/GlassCard';
import certifications from '../../data/certifications';
import { useTheme } from '../../context/ThemeContext';

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

/**
 * Certifications — animated certificate cards with view lightbox modals
 */
export default function Certifications() {
  const { theme } = useTheme();
  const [selectedCert, setSelectedCert] = useState(null);

  return (
    <section id="certifications" className="section-padding relative">
      <div className="container-custom">
        <SectionHeading
          title="Certifications"
          subtitle="Professional certifications that validate my expertise."
        />

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {certifications.map((cert) => (
            <motion.div
              key={cert.id}
              variants={fadeUp}
              onClick={() => setSelectedCert(cert)}
              className="cursor-pointer group h-full"
            >
              <GlassCard className="group h-full flex flex-col overflow-hidden hover:border-primary/30 transition-all duration-300" glowColor="rgba(124, 58, 237, 0.12)">
                {/* Certificate Image Preview */}
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-black/20 border-b border-white/5">
                  <img
                    src={cert.image}
                    alt={cert.title}
                    className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-bg/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="px-4 py-2 rounded-full bg-primary text-white text-xs font-semibold tracking-wide shadow-md flex items-center gap-1.5">
                      Open Preview <FaExternalLinkAlt size={10} />
                    </span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-secondary/20 to-accent/20 flex items-center justify-center shrink-0">
                      <FaCertificate className="text-secondary text-sm" />
                    </div>
                    <div className="text-left">
                      <h3 className={`font-heading font-semibold text-base transition-colors group-hover:text-primary ${
                        theme === 'dark' ? 'text-white' : 'text-light-text'
                      }`}>{cert.title}</h3>
                      <p className="text-primary text-xs font-semibold mt-0.5">{cert.issuer}</p>
                    </div>
                  </div>

                  <p className={`text-sm mb-6 flex-1 text-left ${
                    theme === 'dark' ? 'text-dark-muted' : 'text-light-muted'
                  }`}>{cert.description}</p>

                  <div className="flex items-center justify-between mt-auto pt-3 border-t border-white/5">
                    <span className={`text-xs ${
                      theme === 'dark' ? 'text-dark-subtle' : 'text-light-subtle'
                    }`}>{cert.date}</span>
                    <span className="text-xs text-primary font-semibold flex items-center gap-1 group-hover:underline">
                      Verify Credential
                    </span>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Lightbox / Modal */}
      <AnimatePresence>
        {selectedCert && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-black/85 backdrop-blur-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedCert(null)}
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
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-secondary/20 to-accent/20 flex items-center justify-center">
                    <FaCertificate className="text-secondary" />
                  </div>
                  <div className="text-left">
                    <h3 className={`font-heading font-semibold text-lg md:text-xl ${
                      theme === 'dark' ? 'text-white' : 'text-light-text'
                    }`}>{selectedCert.title}</h3>
                    <p className="text-primary text-sm font-medium">{selectedCert.issuer} • {selectedCert.date}</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedCert(null)}
                  className={`p-2 rounded-lg transition-colors ${
                    theme === 'dark' ? 'hover:bg-white/10 text-white/70' : 'hover:bg-black/10 text-black/70'
                  }`}
                >
                  <HiXMark size={24} />
                </button>
              </div>

              {/* Modal Body */}
              <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6">
                {/* Description */}
                <p className={`text-base text-left ${
                  theme === 'dark' ? 'text-dark-muted' : 'text-light-muted'
                }`}>{selectedCert.description}</p>

                {/* Certificate Render */}
                <div className="relative w-full h-[55vh] min-h-[350px] bg-black/20 rounded-xl overflow-hidden flex items-center justify-center border border-white/5">
                  {selectedCert.credentialUrl.endsWith('.pdf') ? (
                    <iframe
                      src={selectedCert.credentialUrl}
                      className="w-full h-full border-none bg-white"
                      title={selectedCert.title}
                    />
                  ) : (
                    // Google Drive Link
                    <div className="text-center p-8 flex flex-col items-center justify-center gap-4">
                      <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-2">
                        <FaCertificate size={32} />
                      </div>
                      <h4 className={`text-lg font-semibold ${theme === 'dark' ? 'text-white' : 'text-light-text'}`}>
                        Secure External Verification Link
                      </h4>
                      <p className={`text-sm max-w-md ${theme === 'dark' ? 'text-dark-muted' : 'text-light-muted'}`}>
                        This certification is verified externally via Google Drive. Click the button below to view the official verified certificate.
                      </p>
                      <a
                        href={selectedCert.credentialUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-2 px-6 py-3 rounded-full bg-primary text-white font-medium hover:bg-primary-light hover:shadow-[0_0_15px_rgba(37,99,235,0.3)] transition-all duration-300 flex items-center gap-2"
                      >
                        Open Certificate <FaExternalLinkAlt size={12} />
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
