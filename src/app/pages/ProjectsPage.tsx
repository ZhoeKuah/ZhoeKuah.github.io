import { motion } from 'motion/react';
import { useEffect } from 'react';
import { Cpu, Code, Trophy } from 'lucide-react';
import { SmartCard } from '../components/SmartCard';
import { useAudio } from '../components/AudioContext';

export const ProjectsPage = () => {
  const { changeTrack } = useAudio();

  useEffect(() => {
    changeTrack('projects');
  }, [changeTrack]);

  const hardwareProjects = [
    {
      title: 'Autonomous Robotic Arm',
      subtitle: 'Six-axis manipulator with ROS2 integration',
      imageUrl: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800',
      tags: ['ROS2', 'Python', 'Computer Vision', 'Arduino'],
      githubUrl: 'https://github.com',
    },
    {
      title: 'IoT Smart Home Hub',
      subtitle: 'Centralized control system for home automation',
      imageUrl: 'https://images.unsplash.com/photo-1558002038-1055907df827?w=800',
      tags: ['ESP32', 'MQTT', 'Node-RED', 'Raspberry Pi'],
      githubUrl: 'https://github.com',
    },
    {
      title: 'Drone Navigation System',
      subtitle: 'GPS-guided autonomous flight controller',
      imageUrl: 'https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=800',
      tags: ['C++', 'GPS', 'IMU', 'PID Control'],
      link: '#',
    },
  ];

  const softwareProjects = [
    {
      title: 'Real-Time Analytics Dashboard',
      subtitle: 'Live data visualization for industrial monitoring',
      imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800',
      tags: ['React', 'Node.js', 'WebSocket', 'D3.js'],
      githubUrl: 'https://github.com',
      link: 'https://example.com',
    },
    {
      title: 'AI-Powered Defect Detection',
      subtitle: 'Computer vision system for quality control',
      imageUrl: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800',
      tags: ['TensorFlow', 'OpenCV', 'Python', 'FastAPI'],
      githubUrl: 'https://github.com',
    },
    {
      title: 'Distributed Task Scheduler',
      subtitle: 'Microservices-based job orchestration platform',
      imageUrl: 'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=800',
      tags: ['Kubernetes', 'Docker', 'Go', 'Redis'],
      githubUrl: 'https://github.com',
    },
  ];

  const achievements = [
    {
      title: 'Best Innovation Award 2024',
      subtitle: 'Recognized for breakthrough in robotic automation',
      imageUrl: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800',
      tags: ['Innovation', 'Robotics', 'Automation'],
    },
    {
      title: 'Open Source Contributor',
      subtitle: 'Active maintainer of 15+ GitHub repositories',
      imageUrl: 'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=800',
      tags: ['Open Source', 'Community', 'Collaboration'],
      githubUrl: 'https://github.com',
    },
    {
      title: 'Patent: Smart Sensor Array',
      subtitle: 'Novel approach to multi-sensor data fusion',
      imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800',
      tags: ['Patent', 'IoT', 'Innovation'],
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
      {/* Hardware Section */}
      <section id="hardware" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-950 to-gray-900 scroll-mt-16">
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

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {hardwareProjects.map((project, index) => (
              <SmartCard
                key={index}
                {...project}
                variant="hardware"
              />
            ))}
          </div>
        </div>
      </section>

      {/* Software Section */}
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

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {softwareProjects.map((project, index) => (
              <SmartCard
                key={index}
                {...project}
                variant="software"
              />
            ))}
          </div>
        </div>
      </section>

      {/* Achievements Section */}
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

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {achievements.map((achievement, index) => (
              <SmartCard
                key={index}
                {...achievement}
                variant="achievement"
              />
            ))}
          </div>
        </div>
      </section>
    </motion.div>
  );
};