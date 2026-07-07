/**
 * projects — portfolio project data
 * Replace images with your actual project screenshots
 */
const projects = [
  {
    id: 1,
    title: 'Code Craft',
    description: 'Code Craft is a comprehensive MERN-stack platform built for students to practice programming, prepare for placements, and conduct role-specific mock interviews with interactive feedback.',
    image: null,
    category: 'Featured',
    tags: ['MongoDB', 'Express.js', 'React', 'Node.js', 'Tailwind CSS', 'Monaco Editor', 'JavaScript'],
    features: ['Coding practice sandbox', 'Placement preparation modules', 'Role-specific mock interviews', 'Interactive performance feedback'],
    challenges: 'Designing secure code execution environment and organizing dynamic role-specific question banks.',
    github: 'https://github.com/rajdivyam',
    demo: 'https://codecraft-frontend-two.vercel.app/',
    featured: true,
  },
  {
    id: 2,
    title: 'Exam Quest',
    description: 'Exam Quest is a web-based examination support system that provides secure access to previous exam papers, academic resources, and efficient exam management in a centralized platform.',
    image: null,
    category: 'Featured',
    tags: ['React', 'Node.js', 'Express.js', 'MongoDB', 'JavaScript', 'HTML', 'CSS'],
    features: ['Secure access to papers', 'Academic resource center', 'Efficient exam management', 'Centralized dashboard'],
    challenges: 'Ensuring efficient storage, retrieval, and access control of exam resources.',
    github: 'https://github.com/rajdivyam',
    demo: 'https://demo.com',
    featured: true,
  },
  {
    id: 3,
    title: 'Green Loop',
    description: 'Green Loop is a web-based platform focused on recycling e-waste and promoting environmental sustainability.',
    image: null,
    category: 'Featured',
    tags: ['React', 'Node.js', 'MongoDB', 'JavaScript', 'HTML', 'CSS'],
    features: ['E-waste recycling portal', 'Sustainability resource tools', 'User-centric web interface', 'Interactive platform'],
    challenges: 'Designing user engagement loops for active recycling and ecological metrics calculation.',
    github: 'https://github.com/rajdivyam',
    demo: 'https://demo.com',
    featured: true,
  },
];

export const projectCategories = ['All', 'Featured', 'Web', 'AI/ML'];

export default projects;
