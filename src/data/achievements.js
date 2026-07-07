import { FaTrophy, FaMedal, FaAward, FaStar, FaCode, FaMicrophone } from 'react-icons/fa';

/**
 * achievements — achievement cards data
 */
const achievements = [
  {
    id: 1,
    title: '3rd Place in Hackathon',
    category: 'Hackathon',
    description: 'Secured 3rd place in a National-level Hackathon at IMS Ghaziabad, demonstrating strong problem-solving, teamwork, and innovation under high pressure.',
    icon: FaTrophy,
    color: 'from-blue-500 to-purple-500',
  },
  {
    id: 2,
    title: 'Anchoring Head for "Epoque"',
    category: 'College Leadership',
    description: 'Led anchoring for "Epoque" (College Annual Fest Party) at Department Level, showcasing confidence, public speaking, and stage presence.',
    icon: FaMicrophone,
    color: 'from-yellow-500 to-orange-500',
  },
  {
    id: 3,
    title: 'Active Technical Contributor',
    category: 'Coding',
    description: 'Successfully deployed Full-stack platforms like Exam Quest and Green Loop using React, Node.js, and MongoDB.',
    icon: FaCode,
    color: 'from-green-500 to-emerald-500',
  },
];

export default achievements;
