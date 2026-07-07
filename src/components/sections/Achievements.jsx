import { motion } from 'framer-motion';
import SectionHeading from '../ui/SectionHeading';
import GlassCard from '../ui/GlassCard';
import achievements from '../../data/achievements';
import { useTheme } from '../../context/ThemeContext';

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5 } },
};

/**
 * Achievements — achievement cards with category icons and gradient backgrounds
 */
export default function Achievements() {
  const { theme } = useTheme();

  return (
    <section id="achievements" className="section-padding relative">
      <div className="container-custom">
        <SectionHeading
          title="Achievements"
          subtitle="Milestones and recognitions from my journey."
        />

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {achievements.map((achievement) => {
            const Icon = achievement.icon;
            return (
              <motion.div key={achievement.id} variants={fadeUp}>
                <GlassCard className="p-6 h-full">
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${achievement.color} flex items-center justify-center shrink-0`}>
                      <Icon className="text-xl text-white" />
                    </div>
                    <div>
                      <span className={`inline-block px-2 py-0.5 rounded text-xs font-medium mb-2 ${
                        theme === 'dark' ? 'bg-white/10 text-dark-muted' : 'bg-black/5 text-light-muted'
                      }`}>
                        {achievement.category}
                      </span>
                      <h3 className={`font-heading font-semibold mb-2 ${
                        theme === 'dark' ? 'text-white' : 'text-light-text'
                      }`}>{achievement.title}</h3>
                      <p className={`text-sm ${
                        theme === 'dark' ? 'text-dark-muted' : 'text-light-muted'
                      }`}>{achievement.description}</p>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
