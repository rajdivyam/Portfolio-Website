import { motion } from 'framer-motion';
import { FaProjectDiagram, FaGlobe, FaBriefcase, FaCode, FaCertificate } from 'react-icons/fa';
import AnimatedCounter from '../ui/AnimatedCounter';
import GlassCard from '../ui/GlassCard';
import personalInfo from '../../data/personalInfo';
import { useTheme } from '../../context/ThemeContext';

const stats = [
  { label: 'Projects Completed', target: personalInfo.stats.projects, suffix: '+', icon: FaProjectDiagram },
  { label: 'Coding Profiles', target: personalInfo.stats.platforms, suffix: '', icon: FaGlobe },
  { label: 'Internships Done', target: personalInfo.stats.internships, suffix: '', icon: FaBriefcase },
  { label: 'Technologies Used', target: personalInfo.stats.technologies, suffix: '+', icon: FaCode },
  { label: 'Certifications', target: personalInfo.stats.certificates, suffix: '', icon: FaCertificate },
];

/**
 * Statistics — animated counter cards with gradient icons
 */
export default function Statistics() {
  const { theme } = useTheme();

  return (
    <section className="section-padding relative">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <GlassCard className="p-8 md:p-12">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
              {stats.map((stat) => (
                <AnimatedCounter
                  key={stat.label}
                  target={stat.target}
                  suffix={stat.suffix}
                  label={stat.label}
                  icon={stat.icon}
                />
              ))}
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </section>
  );
}
