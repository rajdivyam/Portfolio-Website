import {
  FaLaptopCode, FaPaintBrush, FaServer, FaPlug,
  FaMobileAlt, FaRocket, FaBug, FaCloud, FaDatabase,
} from 'react-icons/fa';

/**
 * services — services offered data
 */
const services = [
  {
    id: 1,
    title: 'Full Stack Development',
    description: 'End-to-end web application development using modern technologies like React, Node.js, and cloud services.',
    icon: FaLaptopCode,
    color: 'from-blue-500 to-indigo-500',
  },
  {
    id: 2,
    title: 'Frontend Development',
    description: 'Building beautiful, responsive, and performant user interfaces with React, Next.js, and modern CSS.',
    icon: FaPaintBrush,
    color: 'from-purple-500 to-pink-500',
  },
  {
    id: 3,
    title: 'Backend Development',
    description: 'Scalable server-side solutions with Node.js, Express, and microservices architecture.',
    icon: FaServer,
    color: 'from-green-500 to-teal-500',
  },
  {
    id: 4,
    title: 'REST API Development',
    description: 'Designing and building robust, well-documented RESTful APIs with authentication and rate limiting.',
    icon: FaPlug,
    color: 'from-orange-500 to-amber-500',
  },
  {
    id: 5,
    title: 'Responsive Design',
    description: 'Pixel-perfect responsive websites that look stunning on every device from mobile to 4K screens.',
    icon: FaMobileAlt,
    color: 'from-cyan-500 to-blue-500',
  },
  {
    id: 6,
    title: 'Performance Optimization',
    description: 'Improving web performance with code splitting, lazy loading, caching, and Core Web Vitals optimization.',
    icon: FaRocket,
    color: 'from-red-500 to-rose-500',
  },
  {
    id: 7,
    title: 'Bug Fixing & Debugging',
    description: 'Identifying and resolving complex bugs, memory leaks, and performance bottlenecks in existing codebases.',
    icon: FaBug,
    color: 'from-yellow-500 to-orange-500',
  },
  {
    id: 8,
    title: 'Database Design',
    description: 'Designing efficient database schemas, optimizing queries, and implementing data migration strategies.',
    icon: FaDatabase,
    color: 'from-violet-500 to-purple-500',
  },
];

export default services;
