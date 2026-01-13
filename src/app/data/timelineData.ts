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
    id: '2025-11',
    date: 'Nov 2025',
    year: 2025,
    month: 'November',
    title: 'Portfolio Development',
    type: 'work',
    description: 'Designed and deployed a personal engineering portfolio to showcase technical documentation and project milestones. Implemented CI/CD pipelines for automated deployment.',
    skills: ['React', 'TypeScript', 'GitHub Actions', 'Web Development'],
  },
  {
    id: '2025-09',
    date: 'Sep 2025',
    year: 2025,
    month: 'September',
    title: 'FEA & CAM Optimization Project',
    type: 'study',
    description: 'Conducted Finite Element Analysis (FEA) on vehicle brake assemblies and steering knuckles. Utilized Altair SimLab for component optimization and SolidWorks CAM for manufacturing process simulation.',
    skills: ['Altair SimLab', 'SolidWorks CAM', 'FEA', 'Mechanical Design'],
    location: 'Academic Coursework',
  },
  {
    id: '2025-05',
    date: 'May 2025',
    year: 2025,
    month: 'August',
    title: 'Final Year Project (Dual Dobot CR10 Motion Planning Research)',
    type: 'project',
    description: 'Developing an automated gold lead pre-tinning process using a dual Dobot CR10 robot arm system. Focused on system coordination, motion planning analysis, and sim-to-real gap validation.',
    skills: ['ROS 2', 'MoveIt 2', 'RViz', 'Dobot CR10', 'Python', 'Solidworks'],
    location: 'Academic Lab',
  },
  {
    id: '2024-11',
    date: 'November 2024 - May 2025',
    year: 2024,
    month: 'November',
    title: 'Industrial Trainee - Process Engineer',
    type: 'work',
    description: '6 Months of Internship at Plexus Manufacturing Sdn. Bhd. Focused on process optimization, workflow analysis, and implementation of lean manufacturing principles to enhance production efficiency.',
    skills: ['Process Engineering', 'Communication', 'Robotic Arm'],
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
    id: '2021-04',
    date: 'May 2021',
    year: 2021,
    month: 'May',
    title: 'Foundation in Engineering',
    type: 'study',
    description: 'Graduated with distinction in Foundation of Engineering program.',
    skills: ['Engineering Fundamentals', 'Programming', 'Electronics'],
    company: 'Asia Pacific University',
    location: 'Kuala Lumpur, Malaysia',
  },
  {
    id: '2020-06',
    date: 'March 2020',
    year: 2020,
    month: 'March',
    title: 'Sijil Pelajaran Malaysia (SPM)',
    type: 'study',
    description: 'Graduated from SMK Bandar Baru Sungai Long',
    skills: ['7A', 'Semi-Science'],
    company: 'SMK Bandar Baru Sungai Long',
    location: 'Selangor, Malaysia',
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
