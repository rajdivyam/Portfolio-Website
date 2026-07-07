import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaPaperPlane, FaCheck, FaUser, FaTag, FaPen } from 'react-icons/fa';
import SectionHeading from '../ui/SectionHeading';
import GlassCard from '../ui/GlassCard';
import personalInfo from '../../data/personalInfo';
import { useTheme } from '../../context/ThemeContext';

/**
 * Contact — premium contact form with validation + contact info cards
 */
export default function Contact() {
  const { theme } = useTheme();
  const [formData, setFormData] = useState({
    name: '', email: '', subject: '', message: '',
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Invalid email';
    if (!formData.subject.trim()) newErrors.subject = 'Subject is required';
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setIsSuccess(true);
    setFormData({ name: '', email: '', subject: '', message: '' });

    setTimeout(() => setIsSuccess(false), 4000);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const inputClasses = (field) => `w-full pl-11 pr-4 py-3.5 rounded-xl text-sm outline-none transition-all duration-300 focus:scale-[1.005] ${
    theme === 'dark'
      ? 'bg-white/[0.03] border border-white/10 text-white placeholder-dark-subtle focus:border-primary/50 focus:bg-white/[0.06] focus:shadow-[0_0_15px_rgba(37,99,235,0.08)]'
      : 'bg-black/[0.02] border border-black/10 text-light-text placeholder-light-subtle focus:border-primary/50 focus:bg-white focus:shadow-[0_0_15px_rgba(37,99,235,0.05)]'
  } ${errors[field] ? 'border-red-500/50' : ''}`;

  const contactInfo = [
    { icon: FaEnvelope, label: 'Email', value: personalInfo.email, href: `mailto:${personalInfo.email}` },
    { icon: FaPhone, label: 'Phone', value: personalInfo.phone, href: `tel:${personalInfo.phone}` },
    { icon: FaMapMarkerAlt, label: 'Location', value: personalInfo.location, href: 'https://maps.app.goo.gl/6eKbE3TuFZfjYiDz8' },
  ];

  return (
    <section id="contact" className="section-padding relative">
      <div className="container-custom">
        <SectionHeading
          title="Get In Touch"
          subtitle="Have a project in mind? Let's work together to create something amazing."
        />

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 max-w-6xl mx-auto">
          {/* Contact Form */}
          <div className="lg:col-span-3">
            <GlassCard className="p-8">
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="contact-name" className={`block text-xs font-semibold uppercase tracking-wider text-left mb-2 ${
                      theme === 'dark' ? 'text-dark-muted' : 'text-light-muted'
                    }`}>Name</label>
                    <div className="relative flex items-center">
                      <span className={`absolute left-4 ${theme === 'dark' ? 'text-dark-subtle' : 'text-light-subtle'}`}>
                        <FaUser size={13} />
                      </span>
                      <input
                        id="contact-name"
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="John Doe"
                        className={inputClasses('name')}
                        style={{ paddingLeft: '2.75rem' }}
                      />
                    </div>
                    {errors.name && <p className="text-red-400 text-xs mt-1 text-left">{errors.name}</p>}
                  </div>
                  <div>
                    <label htmlFor="contact-email" className={`block text-xs font-semibold uppercase tracking-wider text-left mb-2 ${
                      theme === 'dark' ? 'text-dark-muted' : 'text-light-muted'
                    }`}>Email</label>
                    <div className="relative flex items-center">
                      <span className={`absolute left-4 ${theme === 'dark' ? 'text-dark-subtle' : 'text-light-subtle'}`}>
                        <FaEnvelope size={13} />
                      </span>
                      <input
                        id="contact-email"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="john@example.com"
                        className={inputClasses('email')}
                        style={{ paddingLeft: '2.75rem' }}
                      />
                    </div>
                    {errors.email && <p className="text-red-400 text-xs mt-1 text-left">{errors.email}</p>}
                  </div>
                </div>

                <div>
                  <label htmlFor="contact-subject" className={`block text-xs font-semibold uppercase tracking-wider text-left mb-2 ${
                    theme === 'dark' ? 'text-dark-muted' : 'text-light-muted'
                  }`}>Subject</label>
                  <div className="relative flex items-center">
                    <span className={`absolute left-4 ${theme === 'dark' ? 'text-dark-subtle' : 'text-light-subtle'}`}>
                      <FaTag size={13} />
                    </span>
                    <input
                      id="contact-subject"
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="Project Inquiry"
                      className={inputClasses('subject')}
                      style={{ paddingLeft: '2.75rem' }}
                    />
                  </div>
                  {errors.subject && <p className="text-red-400 text-xs mt-1 text-left">{errors.subject}</p>}
                </div>

                <div>
                  <label htmlFor="contact-message" className={`block text-xs font-semibold uppercase tracking-wider text-left mb-2 ${
                    theme === 'dark' ? 'text-dark-muted' : 'text-light-muted'
                  }`}>Message</label>
                  <div className="relative">
                    <span className={`absolute left-4 top-4 ${theme === 'dark' ? 'text-dark-subtle' : 'text-light-subtle'}`}>
                      <FaPen size={13} />
                    </span>
                    <textarea
                      id="contact-message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell me about your project..."
                      rows={5}
                      className={`${inputClasses('message')} resize-none`}
                      style={{ paddingLeft: '2.75rem', paddingTop: '0.85rem' }}
                    />
                  </div>
                  {errors.message && <p className="text-red-400 text-xs mt-1 text-left">{errors.message}</p>}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`group relative w-full overflow-hidden font-heading font-semibold px-8 py-4 rounded-xl text-sm transition-all duration-300 flex items-center justify-center gap-2.5 cursor-pointer select-none active:scale-[0.98] ${
                    theme === 'dark'
                      ? 'bg-white text-dark-bg hover:bg-white/90 hover:shadow-[0_8px_30px_rgba(255,255,255,0.15)] border-none'
                      : 'bg-dark-bg text-white hover:bg-dark-bg/90 hover:shadow-[0_8px_30px_rgba(15,23,42,0.2)] border-none'
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <motion.span
                        className="w-4 h-4 border-2 border-current border-t-transparent rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 0.8, ease: 'linear' }}
                      />
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <FaPaperPlane className="text-current transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" size={13} />
                      <span>Send Message</span>
                    </>
                  )}
                </button>

                {/* Success Message */}
                <AnimatePresence>
                  {isSuccess && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="flex items-center gap-2 text-green-400 text-sm font-medium"
                    >
                      <FaCheck /> Message sent successfully! I'll get back to you soon.
                    </motion.div>
                  )}
                </AnimatePresence>
              </form>
            </GlassCard>
          </div>

          {/* Contact Info */}
          <div className="lg:col-span-2 space-y-4">
            {contactInfo.map((info) => {
              const Icon = info.icon;
              const Wrapper = info.href ? 'a' : 'div';
              const wrapperProps = info.href ? { href: info.href, target: '_blank', rel: 'noopener noreferrer' } : {};

              return (
                <motion.div
                  key={info.label}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                >
                  <Wrapper {...wrapperProps}>
                    <GlassCard className="p-5 flex items-center gap-4" glowColor="rgba(6, 182, 212, 0.12)">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center shrink-0">
                        <Icon className="text-primary text-lg" />
                      </div>
                      <div>
                        <p className={`text-xs font-medium uppercase tracking-wider mb-1 ${
                          theme === 'dark' ? 'text-dark-subtle' : 'text-light-subtle'
                        }`}>{info.label}</p>
                        <p className={`text-sm font-medium ${
                          theme === 'dark' ? 'text-white' : 'text-light-text'
                        }`}>{info.value}</p>
                      </div>
                    </GlassCard>
                  </Wrapper>
                </motion.div>
              );
            })}

            {/* Map Placeholder */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <a
                href="https://maps.app.goo.gl/6eKbE3TuFZfjYiDz8"
                target="_blank"
                rel="noopener noreferrer"
                className="block group"
              >
                <GlassCard className="p-1 overflow-hidden h-48 transition-all duration-300 group-hover:border-primary/30 group-hover:shadow-[0_0_25px_rgba(37,99,235,0.15)]">
                  <div className={`w-full h-full rounded-xl flex items-center justify-center transition-colors duration-300 ${
                    theme === 'dark'
                      ? 'bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 group-hover:from-primary/10 group-hover:via-secondary/10'
                      : 'bg-gradient-to-br from-primary/3 via-secondary/3 to-accent/3 group-hover:from-primary/8 group-hover:via-secondary/8'
                  }`}>
                    <div className="text-center">
                      <FaMapMarkerAlt className="text-3xl text-primary/40 group-hover:text-primary transition-colors duration-300 mx-auto mb-2" />
                      <p className={`text-sm transition-colors duration-300 ${
                        theme === 'dark' ? 'text-dark-subtle group-hover:text-white' : 'text-light-subtle group-hover:text-light-text'
                      }`}>{personalInfo.location}</p>
                      <span className="inline-block text-[10px] text-primary/60 font-semibold tracking-wider uppercase mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">View on Google Maps</span>
                    </div>
                  </div>
                </GlassCard>
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
