import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowRight, Code, Briefcase, User } from 'lucide-react';
import { useEffect } from 'react';
import { useAudio } from '../components/AudioContext';
//import { CosmicBackground } from '../components/CosmicBackground';

export const HomePage = () => {
  const { changeTrack } = useAudio();

  useEffect(() => {
    changeTrack('home');
  }, [changeTrack]);

  const navCards = [
    {
      title: 'Explore Projects',
      description: 'Dive into my hardware, software, and achievement portfolio',
      icon: Briefcase,
      link: '/projects',
      gradient: 'from-blue-500 to-cyan-500',
    },
    {
      title: 'View Timeline',
      description: 'Journey through my career milestones and experiences',
      icon: Code,
      link: '/timeline',
      gradient: 'from-purple-500 to-pink-500',
    },
    {
      title: 'About & Audit',
      description: 'Discover the person behind the projects',
      icon: User,
      link: '/about',
      gradient: 'from-green-500 to-teal-500',
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
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-black via-blue-950/20 to-black">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzNiODJmNiIgc3Ryb2tlLW9wYWNpdHk9IjAuMSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-20" />
          
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-5 gap-12 md:gap-16 items-center">
          {/* Left Side - Profile */}
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="md:col-span-2 flex flex-col gap-8 items-center md:items-start w-full"
          >
            {/* Portrait Section */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              whileHover={{ scale: 1.05 }}
              className="flex justify-center md:justify-start"
            >
              <motion.div
                animate={{
                  boxShadow: [
                    '0 0 20px rgba(59, 130, 246, 0.3)',
                    '0 0 40px rgba(59, 130, 246, 0.5)',
                    '0 0 20px rgba(59, 130, 246, 0.3)'
                  ]
                }}
                transition={{ duration: 4, repeat: Infinity }}
                className="w-56 h-56 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 p-1 shadow-2xl shadow-blue-500/50"
              >
                <div className="w-full h-full rounded-full bg-gray-900 flex items-center justify-center overflow-hidden">
                  <img src="/images/about/portrait.jpeg" alt="Portrait" className="w-full h-full object-cover" />
                </div>
              </motion.div>
            </motion.div>

            {/* Content Section */}
            <div className="flex flex-col w-full gap-4">
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="text-center md:text-left"
              >
                <h1 className="text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
                  The Engineer's Terminal
                </h1>
              </motion.div>

              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.6 }}
                className="text-gray-300 text-lg text-center md:text-left leading-relaxed"
              >
                Innovating at the intersection of hardware and software. Robotics engineer passionate about building intelligent systems.
              </motion.p>
            </div>
          </motion.div>

          {/* Right Side - Interactive Element */}
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="md:col-span-3 relative"
          >
            <div className="bg-gray-900/50 backdrop-blur-sm border border-emerald-500/30 rounded-lg p-6 shadow-xl shadow-emerald-500/20">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-emerald-500" />
              </div>
              <div className="font-mono text-sm space-y-3">
                <div>
                  <span className="text-gray-500">$ </span>
                  <span className="text-white">whoami</span>
                </div>
                <div className="text-emerald-400 ml-4">
                  Senior Engineer | Problem Solver | Tech Enthusiast
                </div>

                <div className="mt-4">
                  <span className="text-gray-500">$ </span>
                  <span className="text-white">cat ~/profile/info.txt</span>
                </div>
                <div className="ml-4 space-y-1">
                  <div className="text-cyan-400">Role: Senior Engineer</div>
                  <div className="text-teal-400">Focus: Robotics & Systems</div>
                  <div className="text-blue-400">Expertise: ROS2, Python, C++</div>
                </div>

                <div className="mt-4">
                  <span className="text-gray-500">$ </span>
                  <span className="text-white">cat ~/skills/robotics.txt</span>
                </div>
                <div className="ml-4 space-y-1">
                  <div className="text-cyan-400">→ ROS2 (Robot Operating System)</div>
                  <div className="text-teal-400">→ Gazebo Simulation & Testing</div>
                  <div className="text-blue-400">→ Computer Vision & SLAM</div>
                </div>
                
                <div className="mt-4">
                  <span className="text-gray-500">$ </span>
                  <span className="text-white">ls -la ~/stack/</span>
                </div>
                <div className="ml-4 space-y-1">
                  <div className="text-yellow-400">drwxr-xr-x Python</div>
                  <div className="text-blue-400">drwxr-xr-x C++</div>
                  <div className="text-orange-400">drwxr-xr-x HTML/CSS/JS</div>
                  <div className="text-green-400">drwxr-xr-x Node.js</div>
                  <div className="text-purple-400">drwxr-xr-x React</div>
                </div>

                <div className="mt-4">
                  <span className="text-gray-500">$ </span>
                  <span className="text-white">quick-skills --show-all</span>
                </div>
                <div className="ml-4 space-y-1">
                  <div className="text-yellow-400">• ROS2 • Python • C++</div>
                  <div className="text-purple-400">• IoT • AI/ML</div>
                </div>

                <div className="mt-4">
                  <span className="text-gray-500">$ </span>
                  <span className="text-white">./deploy_innovation.sh</span>
                </div>
                <div className="ml-4 text-emerald-400">
                  <motion.span
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    ✓ Ready for new challenges
                  </motion.span>
                  <span className="animate-pulse">_</span>
                </div>
              </div>
            </div>

            {/* Code snippet decoration */}
            <motion.div
              animate={{ 
                y: [0, -10, 0],
                rotate: [0, 2, 0]
              }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -top-8 -right-8 bg-gray-800 border border-emerald-500/50 rounded-lg p-3 shadow-lg text-xs font-mono hidden lg:block"
            >
              <div className="text-purple-400">{'<Code>'}</div>
              <div className="text-emerald-400 ml-2">passion++;</div>
              <div className="text-purple-400">{'</Code>'}</div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Navigation Cards Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-black to-gray-950">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Choose Your Path
            </h2>
            <p className="text-gray-400 text-lg">
              Explore different facets of my engineering journey
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {navCards.map((card, index) => {
              const Icon = card.icon;
              return (
                <motion.div
                  key={card.title}
                  initial={{ y: 50, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: false, amount: 0.3 }}
                  transition={{ delay: index * 0.2, duration: 0.6 }}
                >
                  <Link to={card.link}>
                    <motion.div
                      whileHover={{ scale: 1.05, y: -10 }}
                      whileTap={{ scale: 0.98 }}
                      className="group relative h-full bg-gray-900/50 backdrop-blur-sm border border-blue-500/30 rounded-xl p-8 overflow-hidden transition-all duration-300 hover:border-blue-500/60 hover:shadow-2xl hover:shadow-blue-500/30"
                    >
                      {/* Gradient overlay */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${card.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
                      
                      <div className="relative z-10">
                        <div className={`w-16 h-16 rounded-lg bg-gradient-to-br ${card.gradient} p-0.5 mb-6`}>
                          <div className="w-full h-full rounded-lg bg-gray-900 flex items-center justify-center">
                            <Icon className="w-8 h-8 text-blue-400" />
                          </div>
                        </div>
                        
                        <h3 className="text-2xl font-bold mb-3 text-white group-hover:text-blue-400 transition-colors">
                          {card.title}
                        </h3>
                        
                        <p className="text-gray-400 mb-6">
                          {card.description}
                        </p>
                        
                        <div className="flex items-center text-blue-400 group-hover:text-cyan-400 transition-colors">
                          <span className="mr-2">Explore</span>
                          <ArrowRight className="w-5 h-5 transform group-hover:translate-x-2 transition-transform" />
                        </div>
                      </div>
                    </motion.div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </motion.div>
  );
};