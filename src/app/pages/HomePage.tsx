import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowRight, Code, Briefcase, User } from 'lucide-react';
import { useEffect } from 'react';
import { useAudio } from '../components/AudioContext';

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

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-12 items-center">
          {/* Left Side - Profile */}
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-center md:text-left"
          >
            <div className="w-48 h-48 mx-auto md:mx-0 mb-6 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 p-1 shadow-2xl shadow-blue-500/50">
              <div className="w-full h-full rounded-full bg-gray-900 flex items-center justify-center">
                <User className="w-20 h-20 text-blue-400" />
              </div>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
              The Engineer's Terminal
            </h1>
            <p className="text-xl text-gray-400 mb-6">
              Innovating at the intersection of hardware and software
            </p>
            <div className="flex flex-wrap gap-2 justify-center md:justify-start">
              {['ROS2', 'Python', 'C++', 'IoT', 'AI/ML'].map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1 bg-blue-500/20 border border-blue-500/50 rounded-full text-sm text-blue-400"
                >
                  {skill}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Right Side - Interactive Element */}
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="relative"
          >
            <div className="bg-gray-900/50 backdrop-blur-sm border border-blue-500/30 rounded-lg p-6 shadow-xl shadow-blue-500/20">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
              </div>
              <div className="font-mono text-sm">
                <div className="text-gray-500">$ whoami</div>
                <div className="text-blue-400">Senior Engineer | Problem Solver | Tech Enthusiast</div>
                <div className="text-gray-500 mt-2">$ cat skills.txt</div>
                <div className="text-cyan-400">→ Robotics & Automation</div>
                <div className="text-cyan-400">→ Full-Stack Development</div>
                <div className="text-cyan-400">→ IoT & Embedded Systems</div>
                <div className="text-gray-500 mt-2">$ status</div>
                <div className="text-green-400">Ready for new challenges_<span className="animate-pulse">|</span></div>
              </div>
            </div>
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