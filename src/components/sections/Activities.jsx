import { motion } from 'framer-motion';
import SectionHeading from '../ui/SectionHeading';
import GlassCard from '../ui/GlassCard';
import activities from '../../data/activities';
import { useTheme } from '../../context/ThemeContext';

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
            return (
              <motion.div
                key={activity.id}
                variants={fadeUp}
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
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
    </section>
  );
}
