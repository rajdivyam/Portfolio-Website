import { FaHandHoldingHeart, FaLaptopCode } from 'react-icons/fa';

/**
 * activities — co-curricular activities data
 */
const activities = [
  {
    id: 1,
    title: 'Blood Donation Camp',
    category: 'Community Service',
    description: 'Volunteered and contributed as a donor in campus blood donation drives, helping raise awareness about health benefits and saving lives.',
    icon: FaHandHoldingHeart,
    color: 'from-red-500 to-rose-500',
    image: '/images/blood-donation.jpg',
    imagePosition: 'object-[center_40%]',
  },
  {
    id: 2,
    title: 'Hackathon Participation',
    category: 'Competitions',
    description: 'Participated in intense 24-36 hour hackathons, collaborating in cross-functional teams to brainstorm, design, and prototype real-world software solutions.',
    icon: FaLaptopCode,
    color: 'from-indigo-500 to-purple-500',
    image: '/images/hackathon.png',
    imagePosition: 'object-center',
  },
];

export default activities;
