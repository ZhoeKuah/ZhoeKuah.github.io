import { motion } from 'motion/react';
import { useEffect, useState } from 'react';
import { Cpu, Code, Trophy } from 'lucide-react';
import { SmartCard } from '../components/SmartCard';
import { ProjectCarousel } from '../components/ProjectCarousel';
import { ProjectModal } from '../components/ProjectModal';
import { useAudio } from '../components/AudioContext';
// IMPORT DATA
import { hardwareProjects, softwareProjects, achievements, ProjectItem } from '../data/projectsData';

export const ProjectsPage = () => {
  const { changeTrack } = useAudio();
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  useEffect(() => {
    changeTrack('projects');
  }, [changeTrack]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

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
              <motion.button
                onClick={() => scrollToSection('hardware')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 bg-gray-700/30 border-2 border-gray-500 rounded-lg text-gray-300 hover:border-gray-400 hover:text-white transition-all cursor-pointer"
              >
                Hardware Projects
              </motion.button>
              <motion.button
                onClick={() => scrollToSection('software')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 bg-blue-500/20 border-2 border-blue-500 rounded-lg text-blue-400 hover:border-blue-400 hover:text-blue-300 transition-all cursor-pointer"
              >
                Software Projects
              </motion.button>
              <motion.button
                onClick={() => scrollToSection('achievements')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 bg-cyan-500/20 border-2 border-cyan-500 rounded-lg text-cyan-400 hover:border-cyan-400 hover:text-cyan-300 transition-all cursor-pointer"
              >
                Achievements
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Hardware Section */}
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
              <h2 className="text-4xl font-bold text-gray-200">Hardware Projects</h2>
            </div>
            <p className="text-gray-400 text-lg">Mechanical engineering meets cutting-edge electronics</p>
            <div className="mt-4 h-1 w-24 bg-gradient-to-r from-gray-500 to-transparent rounded-full" />
          </motion.div>

          <ProjectCarousel onSlideClick={(index) => setSelectedProject(hardwareProjects[index])}>
            {hardwareProjects.map((project, index) => (
              <SmartCard key={index} {...project} variant="hardware" />
            ))}
          </ProjectCarousel>
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
                <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Software Projects</span>
              </h2>
            </div>
            <p className="text-gray-400 text-lg font-mono">{'> Building digital solutions with modern tech stacks'}</p>
            <div className="mt-4 h-1 w-24 bg-gradient-to-r from-blue-500 via-cyan-500 to-transparent rounded-full shadow-lg shadow-blue-500/50" />
          </motion.div>

          <ProjectCarousel onSlideClick={(index) => setSelectedProject(softwareProjects[index])}>
            {softwareProjects.map((project, index) => (
              <SmartCard key={index} {...project} variant="software" />
            ))}
          </ProjectCarousel>
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
                <span className="bg-gradient-to-r from-cyan-400 to-teal-400 bg-clip-text text-transparent">Achievements & Recognition</span>
              </h2>
            </div>
            <p className="text-gray-400 text-lg">Milestones and contributions that made an impact</p>
            <div className="mt-4 h-1 w-24 bg-gradient-to-r from-cyan-500 to-transparent rounded-full shadow-lg shadow-cyan-500/50" />
          </motion.div>

          <ProjectCarousel onSlideClick={(index) => setSelectedProject(achievements[index])}>
            {achievements.map((achievement, index) => (
              <SmartCard key={index} {...achievement} variant="achievement" />
            ))}
          </ProjectCarousel>
        </div>
      </section>

      {/* Project Modal */}
      <ProjectModal
        project={selectedProject as any}
        onClose={() => setSelectedProject(null)}
      />
    </motion.div>
  );
};