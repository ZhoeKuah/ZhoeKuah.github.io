import { motion } from 'motion/react';
import { useEffect, useState } from 'react';
import { Cpu, Code, Trophy } from 'lucide-react';
import { SmartCard } from '../components/SmartCard';
import { ProjectCarousel } from '../components/ProjectCarousel';
import { ProjectModal, ProjectDetails } from '../components/ProjectModal';
import { useAudio } from '../components/AudioContext';

export const ProjectsPage = () => {
  const { changeTrack } = useAudio();
  const [selectedProject, setSelectedProject] = useState<ProjectDetails | null>(null);

  useEffect(() => {
    changeTrack('projects');
  }, [changeTrack]);

  const hardwareProjects: ProjectDetails[] = [
    {
      title: 'Autonomous Robotic Arm',
      subtitle: 'Six-axis manipulator with ROS2 integration',
      imageUrl: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800',
      tags: ['ROS2', 'Python', 'Computer Vision', 'Arduino'],
      githubUrl: 'https://github.com',
      description: 'Developed a fully autonomous 6-DOF robotic arm capable of object detection, path planning, and precise manipulation. Integrated computer vision for real-time object recognition and implemented inverse kinematics for smooth motion control.',
      date: 'January 2024 - March 2024',
      challenges: [
        'Implemented accurate inverse kinematics for 6-axis motion',
        'Integrated ROS2 with custom Python nodes for control',
        'Achieved <5mm positioning accuracy with camera calibration'
      ],
      outcomes: [
        'Successfully demonstrated pick-and-place operations with 95% accuracy',
        'Reduced computation time by 40% through optimization',
        'Published open-source ROS2 package with 500+ GitHub stars'
      ]
    },
    {
      title: 'IoT Smart Home Hub',
      subtitle: 'Centralized control system for home automation',
      imageUrl: 'https://images.unsplash.com/photo-1558002038-1055907df827?w=800',
      tags: ['ESP32', 'MQTT', 'Node-RED', 'Raspberry Pi'],
      githubUrl: 'https://github.com',
      description: 'Created a comprehensive smart home hub using ESP32 microcontrollers and Raspberry Pi, enabling centralized control of lighting, climate, security, and appliances through a custom web interface.',
      date: 'June 2023 - August 2023',
      challenges: [
        'Designed low-power mesh network for 20+ IoT devices',
        'Implemented secure MQTT broker with TLS encryption',
        'Created responsive web dashboard with real-time updates'
      ],
      outcomes: [
        'Reduced home energy consumption by 25%',
        'Achieved 99.8% uptime over 6 months of operation',
        'Featured in MakerFaire 2023'
      ]
    },
    {
      title: 'Drone Navigation System',
      subtitle: 'GPS-guided autonomous flight controller',
      imageUrl: 'https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=800',
      tags: ['C++', 'GPS', 'IMU', 'PID Control'],
      link: '#',
      description: 'Engineered a custom flight controller for autonomous drone navigation using GPS waypoints, IMU sensor fusion, and advanced PID control algorithms for stable flight in various weather conditions.',
      date: 'March 2023 - May 2023',
      challenges: [
        'Implemented Kalman filtering for sensor fusion',
        'Tuned PID parameters for stable flight control',
        'Handled GPS signal loss with INS dead reckoning'
      ],
      outcomes: [
        'Completed 50+ autonomous missions with 100% success rate',
        'Achieved flight time of 25 minutes on single battery',
        'Won first place in university robotics competition'
      ]
    },
    {
      title: 'CNC Laser Engraver',
      subtitle: 'Custom-built precision engraving system',
      imageUrl: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800',
      tags: ['G-Code', 'Stepper Motors', 'Arduino', 'CAD'],
      description: 'Built a high-precision CNC laser engraver from scratch with custom firmware, achieving 0.1mm accuracy for intricate designs on various materials.',
      date: 'October 2022 - December 2022',
      outcomes: [
        'Engraved 100+ custom designs for local businesses',
        'Achieved engraving speed of 800mm/min',
        'Total build cost under $300'
      ]
    },
    {
      title: '3D Printer Upgrade Project',
      subtitle: 'Performance enhancement and automation',
      imageUrl: 'https://images.unsplash.com/photo-1612198188060-c7c2a3b66eae?w=800',
      tags: ['Marlin', 'OctoPrint', 'Sensors', 'Automation'],
      githubUrl: 'https://github.com',
      description: 'Upgraded commercial 3D printer with automatic bed leveling, filament runout detection, and remote monitoring capabilities.',
      date: 'July 2022 - September 2022',
      outcomes: [
        'Reduced print failures by 80%',
        'Enabled remote print monitoring and control',
        'Improved print quality with auto-leveling'
      ]
    },
  ];

  const softwareProjects: ProjectDetails[] = [
    {
      title: 'Real-Time Analytics Dashboard',
      subtitle: 'Live data visualization for industrial monitoring',
      imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800',
      tags: ['React', 'Node.js', 'WebSocket', 'D3.js'],
      githubUrl: 'https://github.com',
      link: 'https://example.com',
      description: 'Developed a real-time analytics dashboard for industrial monitoring, processing 10,000+ data points per second with interactive visualizations and predictive analytics capabilities.',
      date: 'September 2024 - November 2024',
      company: 'TechCorp Industries',
      location: 'San Francisco, CA',
      challenges: [
        'Handled high-frequency data streams without performance degradation',
        'Implemented efficient WebSocket protocol for real-time updates',
        'Created responsive charts that render smoothly on various devices'
      ],
      outcomes: [
        'Improved decision-making speed by 60%',
        'Reduced system downtime by 35% through predictive alerts',
        'Serving 500+ concurrent users across 5 manufacturing facilities'
      ]
    },
    {
      title: 'AI-Powered Defect Detection',
      subtitle: 'Computer vision system for quality control',
      imageUrl: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800',
      tags: ['TensorFlow', 'OpenCV', 'Python', 'FastAPI'],
      githubUrl: 'https://github.com',
      description: 'Built an AI-powered defect detection system using deep learning and computer vision to automate quality control in manufacturing, achieving 98% accuracy in identifying product defects.',
      date: 'May 2024 - August 2024',
      company: 'AutoManu Solutions',
      challenges: [
        'Collected and labeled 50,000+ training images',
        'Optimized model for edge deployment on industrial cameras',
        'Achieved real-time processing at 30 FPS'
      ],
      outcomes: [
        '98% defect detection accuracy vs 85% manual inspection',
        'Reduced inspection time by 75%',
        'Saved company $200K annually in quality costs'
      ]
    },
    {
      title: 'Distributed Task Scheduler',
      subtitle: 'Microservices-based job orchestration platform',
      imageUrl: 'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=800',
      tags: ['Kubernetes', 'Docker', 'Go', 'Redis'],
      githubUrl: 'https://github.com',
      description: 'Architected a distributed task scheduling system capable of orchestrating thousands of concurrent jobs across a Kubernetes cluster with automatic failover and load balancing.',
      date: 'January 2024 - April 2024',
      challenges: [
        'Implemented distributed locking with Redis',
        'Designed fault-tolerant job queue system',
        'Created auto-scaling logic based on queue depth'
      ],
      outcomes: [
        'Processing 100,000+ jobs daily',
        '99.99% job completion rate',
        'Reduced infrastructure costs by 40%'
      ]
    },
    {
      title: 'E-Commerce Platform Backend',
      subtitle: 'Scalable microservices architecture',
      imageUrl: 'https://images.unsplash.com/photo-1557821552-17105176677c?w=800',
      tags: ['Node.js', 'MongoDB', 'Redis', 'AWS'],
      description: 'Designed and implemented a scalable e-commerce backend handling 1M+ daily transactions with payment processing, inventory management, and order fulfillment.',
      date: 'August 2023 - December 2023',
      outcomes: [
        'Handled Black Friday traffic of 10K+ requests/second',
        '99.95% uptime across the year',
        'Processed $5M in transactions'
      ]
    },
  ];

  const achievements: ProjectDetails[] = [
    {
      title: 'Best Innovation Award 2024',
      subtitle: 'Recognized for breakthrough in robotic automation',
      imageUrl: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800',
      tags: ['Innovation', 'Robotics', 'Automation'],
      description: 'Received the Best Innovation Award at the International Robotics Conference 2024 for developing a novel approach to collaborative robot control using reinforcement learning.',
      date: 'March 2024',
      location: 'Boston, MA',
      outcomes: [
        'Presented research to 500+ industry professionals',
        'Featured in 3 major tech publications',
        'Secured $50K in research funding'
      ]
    },
    {
      title: 'Open Source Contributor',
      subtitle: 'Active maintainer of 15+ GitHub repositories',
      imageUrl: 'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=800',
      tags: ['Open Source', 'Community', 'Collaboration'],
      githubUrl: 'https://github.com',
      description: 'Actively maintain and contribute to 15+ open-source projects with a focus on robotics, IoT, and developer tools. Accumulated 10,000+ stars across repositories.',
      date: '2020 - Present',
      outcomes: [
        '10,000+ GitHub stars across projects',
        '500+ pull requests merged',
        'Mentored 50+ new open-source contributors'
      ]
    },
    {
      title: 'Patent: Smart Sensor Array',
      subtitle: 'Novel approach to multi-sensor data fusion',
      imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800',
      tags: ['Patent', 'IoT', 'Innovation'],
      description: 'Filed and granted patent for an innovative multi-sensor data fusion algorithm that improves accuracy by 40% in industrial monitoring applications.',
      date: 'Filed: June 2023, Granted: January 2024',
      outcomes: [
        'Patent granted in US and EU',
        'Licensed to 2 major manufacturers',
        'Featured in IEEE publication'
      ]
    },
    {
      title: 'Hackathon Champion',
      subtitle: '1st place in National Robotics Hackathon',
      imageUrl: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800',
      tags: ['Hackathon', 'Team Lead', 'Innovation'],
      description: 'Led a team of 4 to win first place in a 48-hour robotics hackathon, building an autonomous warehouse robot from scratch.',
      date: 'November 2023',
      location: 'Seattle, WA',
      outcomes: [
        'Defeated 30+ competing teams',
        'Built working prototype in 48 hours',
        'Won $10K prize and mentorship'
      ]
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 100 }}
      transition={{ duration: 0.5, ease: 'easeInOut' }}
      className="min-h-screen"
    >
      {/* Intro Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-black via-gray-950 to-gray-900">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Project Portfolio
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              A comprehensive showcase of my engineering work spanning hardware innovations, 
              software solutions, and notable achievements in the tech industry.
            </p>
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <motion.a
                href="#hardware"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 bg-gray-700/30 border-2 border-gray-500 rounded-lg text-gray-300 hover:border-gray-400 hover:text-white transition-all"
              >
                Hardware Projects
              </motion.a>
              <motion.a
                href="#software"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 bg-blue-500/20 border-2 border-blue-500 rounded-lg text-blue-400 hover:border-blue-400 hover:text-blue-300 transition-all"
              >
                Software Projects
              </motion.a>
              <motion.a
                href="#achievements"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 bg-cyan-500/20 border-2 border-cyan-500 rounded-lg text-cyan-400 hover:border-cyan-400 hover:text-cyan-300 transition-all"
              >
                Achievements
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Hardware Section with Carousel */}
      <section id="hardware" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-900 to-gray-900 scroll-mt-16">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-gray-700/30 border-2 border-gray-500 rounded-lg">
                <Cpu className="w-8 h-8 text-gray-400" />
              </div>
              <h2 className="text-4xl font-bold text-gray-200">
                Hardware Projects
              </h2>
            </div>
            <p className="text-gray-400 text-lg">
              Mechanical engineering meets cutting-edge electronics
            </p>
            <div className="mt-4 h-1 w-24 bg-gradient-to-r from-gray-500 to-transparent rounded-full" />
          </motion.div>

          <ProjectCarousel
            onSlideClick={(index) => setSelectedProject(hardwareProjects[index])}
          >
            {hardwareProjects.map((project, index) => (
              <SmartCard
                key={index}
                {...project}
                variant="hardware"
              />
            ))}
          </ProjectCarousel>
        </div>
      </section>

      {/* Software Section with Carousel */}
      <section id="software" className="py-20 px-4 sm:px-6 lg:px-8 bg-black scroll-mt-16">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-blue-500/20 border-2 border-blue-500 rounded-lg shadow-lg shadow-blue-500/50">
                <Code className="w-8 h-8 text-blue-400" />
              </div>
              <h2 className="text-4xl font-bold font-mono">
                <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                  Software Projects
                </span>
              </h2>
            </div>
            <p className="text-gray-400 text-lg font-mono">
              {'> Building digital solutions with modern tech stacks'}
            </p>
            <div className="mt-4 h-1 w-24 bg-gradient-to-r from-blue-500 via-cyan-500 to-transparent rounded-full shadow-lg shadow-blue-500/50" />
          </motion.div>

          <ProjectCarousel
            onSlideClick={(index) => setSelectedProject(softwareProjects[index])}
          >
            {softwareProjects.map((project, index) => (
              <SmartCard
                key={index}
                {...project}
                variant="software"
              />
            ))}
          </ProjectCarousel>
        </div>
      </section>

      {/* Achievements Section with Carousel */}
      <section id="achievements" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-black to-cyan-950/20 scroll-mt-16">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-cyan-500/20 border-2 border-cyan-500 rounded-lg shadow-lg shadow-cyan-500/50">
                <Trophy className="w-8 h-8 text-cyan-400" />
              </div>
              <h2 className="text-4xl font-bold">
                <span className="bg-gradient-to-r from-cyan-400 to-teal-400 bg-clip-text text-transparent">
                  Achievements & Recognition
                </span>
              </h2>
            </div>
            <p className="text-gray-400 text-lg">
              Milestones and contributions that made an impact
            </p>
            <div className="mt-4 h-1 w-24 bg-gradient-to-r from-cyan-500 to-transparent rounded-full shadow-lg shadow-cyan-500/50" />
          </motion.div>

          <ProjectCarousel
            onSlideClick={(index) => setSelectedProject(achievements[index])}
          >
            {achievements.map((achievement, index) => (
              <SmartCard
                key={index}
                {...achievement}
                variant="achievement"
              />
            ))}
          </ProjectCarousel>
        </div>
      </section>

      {/* Project Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </motion.div>
  );
};
