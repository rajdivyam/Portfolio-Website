import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionHeading from '../ui/SectionHeading';
import GlassCard from '../ui/GlassCard';
import skillsData from '../../data/skills';
import { useTheme } from '../../context/ThemeContext';

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

/**
 * Skills — categorized skill cards with animated progress bars
 */
export default function Skills() {
  const [activeCategory, setActiveCategory] = useState(0);
  const { theme } = useTheme();
  const categories = skillsData.categories;

  return (
    <section id="skills" className="section-padding relative">
      <div className="container-custom">
        <SectionHeading
          title="Skills & Expertise"
          subtitle="Technologies and tools I use to bring ideas to life."
        />

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((cat, index) => (
            <motion.button
              key={cat.name}
              onClick={() => setActiveCategory(index)}
              className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                activeCategory === index
                  ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-lg shadow-primary/20'
                  : theme === 'dark'
                    ? 'bg-white/5 text-dark-muted hover:bg-white/10 hover:text-white'
                    : 'bg-black/5 text-light-muted hover:bg-black/10 hover:text-light-text'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {cat.name}
            </motion.button>
          ))}
        </div>

        {/* Skills Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
            variants={stagger}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            {categories[activeCategory].skills.map((skill) => {
              const Icon = skill.icon;
              return (
                <motion.div key={skill.name} variants={fadeUp}>
                  <GlassCard className="p-5 group">
                    <div className="flex items-center gap-4 mb-4">
                      <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${categories[activeCategory].color} bg-opacity-10 flex items-center justify-center transition-transform group-hover:scale-110`}>
                        <Icon className="text-xl text-white" />
                      </div>
                      <div className="flex-1">
                        <h4 className={`font-heading font-semibold text-sm ${
                          theme === 'dark' ? 'text-white' : 'text-light-text'
                        }`}>{skill.name}</h4>
                        <span className={`text-xs ${
                          theme === 'dark' ? 'text-dark-muted' : 'text-light-muted'
                        }`}>{skill.level}%</span>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className={`h-1.5 rounded-full overflow-hidden ${
                      theme === 'dark' ? 'bg-white/10' : 'bg-black/10'
                    }`}>
                      <motion.div
                        className={`h-full rounded-full bg-gradient-to-r ${categories[activeCategory].color}`}
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.2, ease: 'easeOut' }}
                      />
                    </div>
                  </GlassCard>
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
