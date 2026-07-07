import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiPlus, FiMinus } from 'react-icons/fi';
import SectionHeading from '../ui/SectionHeading';
import faq from '../../data/faq';
import { useTheme } from '../../context/ThemeContext';

/**
 * FAQ — accordion-style FAQ section with smooth expand/collapse
 */
export default function FAQ() {
  const [openId, setOpenId] = useState(null);
  const { theme } = useTheme();

  const toggle = (id) => setOpenId(openId === id ? null : id);

  return (
    <section id="faq" className="section-padding relative">
      <div className="container-custom max-w-3xl">
        <SectionHeading
          title="FAQ"
          subtitle="Frequently asked questions about my work and services."
        />

        <div className="space-y-3">
          {faq.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
            >
              <div className={`rounded-2xl overflow-hidden transition-colors ${
                theme === 'dark'
                  ? 'bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.05]'
                  : 'bg-white/60 border border-black/[0.04] hover:bg-white/80 shadow-sm'
              } backdrop-blur-xl`}>
                {/* Question */}
                <button
                  onClick={() => toggle(item.id)}
                  className="w-full flex items-center justify-between gap-4 p-5 text-left"
                  aria-expanded={openId === item.id}
                >
                  <span className={`font-heading font-semibold ${
                    theme === 'dark' ? 'text-white' : 'text-light-text'
                  }`}>{item.question}</span>
                  <motion.div
                    animate={{ rotate: openId === item.id ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className={`shrink-0 w-8 h-8 rounded-lg flex items-center justify-center ${
                      openId === item.id
                        ? 'bg-primary/20 text-primary'
                        : theme === 'dark' ? 'bg-white/5 text-dark-muted' : 'bg-black/5 text-light-muted'
                    }`}
                  >
                    {openId === item.id ? <FiMinus size={16} /> : <FiPlus size={16} />}
                  </motion.div>
                </button>

                {/* Answer */}
                <AnimatePresence>
                  {openId === item.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <p className={`px-5 pb-5 text-sm leading-relaxed ${
                        theme === 'dark' ? 'text-dark-muted' : 'text-light-muted'
                      }`}>
                        {item.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
