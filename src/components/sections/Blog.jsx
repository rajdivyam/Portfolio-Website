import { motion } from 'framer-motion';
import { FaClock, FaArrowRight } from 'react-icons/fa';
import SectionHeading from '../ui/SectionHeading';
import GlassCard from '../ui/GlassCard';
import { useTheme } from '../../context/ThemeContext';

const blogPosts = [
  {
    id: 1,
    title: 'Building Scalable React Applications with Advanced Patterns',
    excerpt: 'Explore compound components, render props, and custom hooks for clean, scalable architecture.',
    date: 'Dec 15, 2024',
    readTime: '8 min',
    category: 'React',
  },
  {
    id: 2,
    title: 'Mastering Node.js Performance: Tips for Production',
    excerpt: 'Profiling, clustering, caching strategies, and memory management for high-traffic Node.js apps.',
    date: 'Nov 28, 2024',
    readTime: '12 min',
    category: 'Backend',
  },
  {
    id: 3,
    title: 'The Complete Guide to Modern CSS: Beyond Flexbox & Grid',
    excerpt: 'Container queries, cascade layers, :has() selector, and the future of CSS styling.',
    date: 'Oct 10, 2024',
    readTime: '6 min',
    category: 'CSS',
  },
];

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

/**
 * Blog — blog post cards with read time and categories
 */
export default function Blog() {
  const { theme } = useTheme();

  return (
    <section id="blog" className="section-padding relative">
      <div className="container-custom">
        <SectionHeading
          title="Blog & Insights"
          subtitle="Sharing knowledge and experiences from my development journey."
        />

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {blogPosts.map((post) => (
            <motion.div key={post.id} variants={fadeUp}>
              <GlassCard className="group h-full flex flex-col overflow-hidden">
                {/* Image placeholder */}
                <div className={`h-44 ${
                  theme === 'dark'
                    ? 'bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10'
                    : 'bg-gradient-to-br from-primary/5 via-secondary/3 to-accent/5'
                }`}>
                  <div className="h-full flex items-center justify-center">
                    <span className="text-4xl font-heading font-bold gradient-text opacity-30">
                      {post.category}
                    </span>
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col">
                  {/* Meta */}
                  <div className="flex items-center gap-3 mb-3">
                    <span className={`px-2.5 py-1 rounded-md text-xs font-medium ${
                      theme === 'dark' ? 'bg-primary/10 text-primary' : 'bg-primary/5 text-primary'
                    }`}>{post.category}</span>
                    <span className={`flex items-center gap-1 text-xs ${
                      theme === 'dark' ? 'text-dark-subtle' : 'text-light-subtle'
                    }`}>
                      <FaClock size={10} /> {post.readTime}
                    </span>
                  </div>

                  <h3 className={`font-heading font-semibold mb-2 group-hover:text-primary transition-colors ${
                    theme === 'dark' ? 'text-white' : 'text-light-text'
                  }`}>{post.title}</h3>

                  <p className={`text-sm mb-4 flex-1 ${
                    theme === 'dark' ? 'text-dark-muted' : 'text-light-muted'
                  }`}>{post.excerpt}</p>

                  <div className="flex items-center justify-between mt-auto">
                    <span className={`text-xs ${
                      theme === 'dark' ? 'text-dark-subtle' : 'text-light-subtle'
                    }`}>{post.date}</span>
                    <motion.span
                      className="flex items-center gap-1 text-sm text-primary font-medium"
                      whileHover={{ x: 5 }}
                    >
                      Read More <FaArrowRight size={10} />
                    </motion.span>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
