export interface TimelineEvent {
  id: string;
  date: string;
  year: number;
  month: string;
  title: string;
  type: 'work' | 'study' | 'achievement' | 'project';
  description: string;
  skills: string[];
  company?: string;
  location?: string;
}

export const timelineData: TimelineEvent[] = [
  {
    id: '2025-08',
    date: 'Aug 2025',
    year: 2025,
    month: 'August',
    title: 'Senior Robotics Engineer',
    type: 'work',
    description: 'Leading the development of next-generation autonomous systems for industrial automation. Architecting ROS2-based solutions and mentoring a team of 5 engineers.',
    skills: ['ROS2', 'Python', 'C++', 'Leadership', 'System Architecture'],
    company: 'TechCorp Industries',
    location: 'San Francisco, CA',
  },
  {
    id: '2025-06',
    date: 'Jun 2025',
    year: 2025,
    month: 'June',
    title: 'AI Summit Speaker',
    type: 'achievement',
    description: 'Presented research on computer vision applications in robotics to an audience of 500+ industry professionals. Received outstanding speaker award.',
    skills: ['Public Speaking', 'AI/ML', 'Computer Vision'],
  },
  {
    id: '2024-11',
    date: 'Nov 2024',
    year: 2024,
    month: 'November',
    title: 'Open Source Project Launch',
    type: 'project',
    description: 'Released RoboVision - an open-source computer vision library for robotics. Gained 2000+ GitHub stars in the first month.',
    skills: ['Open Source', 'Python', 'OpenCV', 'Documentation'],
  },
  {
    id: '2024-03',
    date: 'Mar 2024',
    year: 2024,
    month: 'March',
    title: 'Robotics Engineer',
    type: 'work',
    description: 'Developed autonomous navigation systems for warehouse robots. Improved efficiency by 40% through path optimization algorithms.',
    skills: ['SLAM', 'Path Planning', 'Sensor Fusion', 'ROS'],
    company: 'AutoMate Robotics',
    location: 'Boston, MA',
  },
  {
    id: '2023-09',
    date: 'Sep 2023',
    year: 2023,
    month: 'September',
    title: 'Master of Science in Robotics',
    type: 'study',
    description: 'Graduated with honors. Thesis: "Deep Reinforcement Learning for Robotic Manipulation". Published in IEEE Robotics Journal.',
    skills: ['Machine Learning', 'Research', 'Academic Writing'],
    company: 'Stanford University',
    location: 'Stanford, CA',
  },
  {
    id: '2023-05',
    date: 'May 2023',
    year: 2023,
    month: 'May',
    title: 'Robotics Competition Winner',
    type: 'achievement',
    description: 'First place in International Robotics Challenge. Led team of 4 to develop innovative solution for disaster response scenarios.',
    skills: ['Team Leadership', 'Problem Solving', 'Robotics'],
  },
  {
    id: '2022-06',
    date: 'Jun 2022',
    year: 2022,
    month: 'June',
    title: 'Research Assistant',
    type: 'work',
    description: 'Conducted research on human-robot interaction. Developed novel algorithms for gesture recognition and published 3 conference papers.',
    skills: ['Research', 'Python', 'Computer Vision', 'HRI'],
    company: 'Robotics Lab - Stanford',
    location: 'Stanford, CA',
  },
  {
    id: '2021-08',
    date: 'Aug 2021',
    year: 2021,
    month: 'August',
    title: 'Software Engineering Intern',
    type: 'work',
    description: 'Built full-stack web applications for industrial IoT monitoring. Gained experience with React, Node.js, and cloud services.',
    skills: ['React', 'Node.js', 'AWS', 'IoT'],
    company: 'Industrial Tech Solutions',
    location: 'Seattle, WA',
  },
  {
    id: '2021-05',
    date: 'May 2021',
    year: 2021,
    month: 'May',
    title: 'Bachelor of Science in Engineering',
    type: 'study',
    description: 'Graduated with distinction in Electrical & Computer Engineering. Senior project: Autonomous Drone Navigation System.',
    skills: ['Engineering Fundamentals', 'Programming', 'Electronics'],
    company: 'MIT',
    location: 'Cambridge, MA',
  },
  {
    id: '2020-12',
    date: 'Dec 2020',
    year: 2020,
    month: 'December',
    title: 'Hackathon Grand Prize',
    type: 'achievement',
    description: 'Won first place at TechHacks 2020 with an IoT solution for smart agriculture. Built hardware and software from scratch in 48 hours.',
    skills: ['IoT', 'Rapid Prototyping', 'Full-Stack'],
  },
];

export const groupByYear = (events: TimelineEvent[]) => {
  const grouped: Record<number, TimelineEvent[]> = {};
  events.forEach((event) => {
    if (!grouped[event.year]) {
      grouped[event.year] = [];
    }
    grouped[event.year].push(event);
  });
  return grouped;
};
