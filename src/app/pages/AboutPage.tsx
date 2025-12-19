import { motion } from 'motion/react';
import { useEffect } from 'react';
import { Heart, Globe, Music, Book, TrendingUp, AlertTriangle, Target, Zap } from 'lucide-react';
import { useAudio } from '../components/AudioContext';

export const AboutPage = () => {
  const { changeTrack } = useAudio();

  useEffect(() => {
    changeTrack('about');
  }, [changeTrack]);

  const swotData = {
    strengths: [
      'Strong problem-solving abilities',
      'Full-stack development expertise',
      'Robotics & IoT experience',
      'Quick learner & adaptable',
      'Excellent communication skills',
    ],
    weaknesses: [
      'Perfectionist tendencies',
      'Sometimes overcommit to projects',
      'Need to improve delegation',
      'Can get too detail-oriented',
    ],
    opportunities: [
      'Growing AI/ML industry demand',
      'Remote work possibilities',
      'Open source contributions',
      'Technical leadership roles',
      'Speaking & mentorship',
    ],
    threats: [
      'Rapidly changing technology',
      'Work-life balance challenges',
      'Market competition',
      'Skill obsolescence risk',
    ],
  };

  const developerLogs = [
    {
      year: 2025,
      summary: 'Embracing AI-driven development and expanding leadership skills',
      highlights: [
        'Integrated ML models into production systems',
        'Mentored junior developers',
        'Improved code review practices',
      ],
    },
    {
      year: 2024,
      summary: 'Deep dive into robotics and real-time systems',
      highlights: [
        'Mastered ROS2 ecosystem',
        'Published open source projects',
        'Contributed to industry standards',
      ],
    },
    {
      year: 2023,
      summary: 'Academic excellence and research contributions',
      highlights: [
        'Completed Master\'s degree',
        'Published 3 research papers',
        'Won robotics competition',
      ],
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 100 }}
      transition={{ duration: 0.5, ease: 'easeInOut' }}
      className="min-h-screen bg-gradient-to-b from-cyan-950/10 via-blue-950/20 to-black"
    >
      {/* Hero Section - Human Side */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              The Human Behind the Code
            </h1>
            <p className="text-gray-400 text-xl max-w-3xl mx-auto">
              More than just lines of code and circuits - I'm passionate about creating technology that makes a difference
            </p>
          </motion.div>

          {/* Bio & Interests */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <motion.div
              initial={{ x: -30, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.6 }}
              className="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 backdrop-blur-sm border border-blue-500/30 rounded-xl p-8"
            >
              <Heart className="w-12 h-12 text-cyan-400 mb-4" />
              <h2 className="text-2xl font-bold text-white mb-4">Who I Am</h2>
              <p className="text-gray-300 mb-4">
                I'm an engineer at heart, driven by curiosity and a passion for solving complex problems. 
                My journey spans robotics, software development, and IoT, but what truly excites me is 
                the intersection where hardware meets intelligent software.
              </p>
              <p className="text-gray-300">
                When I'm not coding or tinkering with robots, you'll find me exploring new technologies, 
                contributing to open source, or mentoring aspiring engineers.
              </p>
            </motion.div>

            <motion.div
              initial={{ x: 30, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.6 }}
              className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 backdrop-blur-sm border border-purple-500/30 rounded-xl p-8"
            >
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="flex items-center gap-2 text-gray-300">
                  <Music className="w-5 h-5 text-purple-400" />
                  <span>Electronic Music</span>
                </div>
                <div className="flex items-center gap-2 text-gray-300">
                  <Book className="w-5 h-5 text-pink-400" />
                  <span>Sci-Fi Novels</span>
                </div>
                <div className="flex items-center gap-2 text-gray-300">
                  <Globe className="w-5 h-5 text-cyan-400" />
                  <span>Travel & Culture</span>
                </div>
                <div className="flex items-center gap-2 text-gray-300">
                  <Zap className="w-5 h-5 text-yellow-400" />
                  <span>Hackathons</span>
                </div>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Languages</h3>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">English</span>
                  <span className="text-cyan-400">Native</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Spanish</span>
                  <span className="text-cyan-400">Fluent</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Mandarin</span>
                  <span className="text-cyan-400">Conversational</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SWOT Matrix */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-black/50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-4 text-white">
              SWOT Analysis
            </h2>
            <p className="text-gray-400 text-lg">
              Self-awareness drives continuous improvement
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Strengths */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.5 }}
              className="bg-green-900/20 border-2 border-green-500/50 rounded-xl p-6 hover:border-green-400 transition-all"
            >
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="w-6 h-6 text-green-400" />
                <h3 className="text-2xl font-bold text-green-400">Strengths</h3>
              </div>
              <ul className="space-y-2">
                {swotData.strengths.map((item, index) => (
                  <li key={index} className="flex items-start gap-2 text-gray-300">
                    <span className="text-green-400 mt-1">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Weaknesses */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-red-900/20 border-2 border-red-500/50 rounded-xl p-6 hover:border-red-400 transition-all"
            >
              <div className="flex items-center gap-2 mb-4">
                <AlertTriangle className="w-6 h-6 text-red-400" />
                <h3 className="text-2xl font-bold text-red-400">Weaknesses</h3>
              </div>
              <ul className="space-y-2">
                {swotData.weaknesses.map((item, index) => (
                  <li key={index} className="flex items-start gap-2 text-gray-300">
                    <span className="text-red-400 mt-1">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Opportunities */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-blue-900/20 border-2 border-blue-500/50 rounded-xl p-6 hover:border-blue-400 transition-all"
            >
              <div className="flex items-center gap-2 mb-4">
                <Target className="w-6 h-6 text-blue-400" />
                <h3 className="text-2xl font-bold text-blue-400">Opportunities</h3>
              </div>
              <ul className="space-y-2">
                {swotData.opportunities.map((item, index) => (
                  <li key={index} className="flex items-start gap-2 text-gray-300">
                    <span className="text-blue-400 mt-1">→</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Threats */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-yellow-900/20 border-2 border-yellow-500/50 rounded-xl p-6 hover:border-yellow-400 transition-all"
            >
              <div className="flex items-center gap-2 mb-4">
                <Zap className="w-6 h-6 text-yellow-400" />
                <h3 className="text-2xl font-bold text-yellow-400">Threats</h3>
              </div>
              <ul className="space-y-2">
                {swotData.threats.map((item, index) => (
                  <li key={index} className="flex items-start gap-2 text-gray-300">
                    <span className="text-yellow-400 mt-1">!</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Developer's Log */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              Developer's Log
            </h2>
            <p className="text-gray-400 text-lg">
              Annual reflections on growth and learning
            </p>
          </motion.div>

          <div className="space-y-6">
            {developerLogs.map((log, index) => (
              <motion.div
                key={log.year}
                initial={{ x: index % 2 === 0 ? -30 : 30, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-gradient-to-r from-cyan-900/20 to-blue-900/20 backdrop-blur-sm border border-cyan-500/30 rounded-xl p-6 hover:border-cyan-400 transition-all"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-3xl font-bold text-cyan-400">{log.year}</h3>
                  <Book className="w-6 h-6 text-cyan-400" />
                </div>
                <p className="text-lg text-white mb-4">{log.summary}</p>
                <div className="space-y-2">
                  {log.highlights.map((highlight, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <span className="text-cyan-400 mt-1">▸</span>
                      <span className="text-gray-300">{highlight}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </motion.div>
  );
};