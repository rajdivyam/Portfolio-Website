import { motion } from 'framer-motion';
import SectionHeading from '../ui/SectionHeading';
import GlassCard from '../ui/GlassCard';
import services from '../../data/services';
import { useTheme } from '../../context/ThemeContext';

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

/**
 * Services — service offerings in a grid with gradient icons
 */
export default function Services() {
  const { theme } = useTheme();

  return (
    <section id="services" className="section-padding relative">
      <div className="container-custom">
        <SectionHeading
          title="Services"
          subtitle="What I can do for you — from concept to deployment."
        />

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div key={service.id} variants={fadeUp}>
                <GlassCard className="p-6 h-full text-center group">
                  {/* Number */}
                  <span className={`absolute top-4 right-4 text-5xl font-heading font-bold ${
                    theme === 'dark' ? 'text-white/[0.03]' : 'text-black/[0.03]'
                  }`}>
                    {String(index + 1).padStart(2, '0')}
                  </span>

                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center mx-auto mb-5 transition-transform group-hover:scale-110 group-hover:rotate-3`}>
                    <Icon className="text-2xl text-white" />
                  </div>

                  <h3 className={`font-heading font-semibold mb-3 ${
                    theme === 'dark' ? 'text-white' : 'text-light-text'
                  }`}>{service.title}</h3>

                  <p className={`text-sm leading-relaxed ${
                    theme === 'dark' ? 'text-dark-muted' : 'text-light-muted'
                  }`}>{service.description}</p>
                </GlassCard>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
