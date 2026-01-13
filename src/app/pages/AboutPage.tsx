import { motion } from 'motion/react';
import { useEffect } from 'react';
import { Heart, Globe, Music, Book, TrendingUp, AlertTriangle, Target, Zap, Code, Coffee, Gamepad2, Camera, Mountain, Cpu, Wrench, Sparkles } from 'lucide-react';
import { useAudio } from '../components/AudioContext';

export const AboutPage = () => {
  const { changeTrack } = useAudio();

  useEffect(() => {
    changeTrack('about');
  }, [changeTrack]);

  const interests = [
    { icon: Music, label: 'Electronic Music', color: 'purple', level: 95 },
    { icon: Book, label: 'Sci-Fi Novels', color: 'pink', level: 80 },
    { icon: Globe, label: 'Travel & Culture', color: 'cyan', level: 75 },
    { icon: Zap, label: 'Hackathons', color: 'yellow', level: 90 },
    { icon: Code, label: 'Open Source', color: 'emerald', level: 100 },
    { icon: Coffee, label: 'Coffee Brewing', color: 'orange', level: 70 },
    { icon: Gamepad2, label: 'Gaming', color: 'green', level: 85 },
    { icon: Camera, label: 'Photography', color: 'red', level: 65 },
    { icon: Mountain, label: 'Hiking', color: 'teal', level: 60 },
    { icon: Cpu, label: 'Hardware Tinkering', color: 'indigo', level: 95 },
  ];

  const languages = [
    { name: 'English', level: 100, color: 'cyan' },
    { name: 'Spanish', level: 85, color: 'blue' },
    { name: 'Mandarin', level: 60, color: 'purple' },
    { name: 'Japanese', level: 35, color: 'pink' },
  ];

  const traits = [
    { label: 'Analytical Thinking', icon: Cpu },
    { label: 'Problem Solver', icon: Wrench },
    { label: 'Creative Innovator', icon: Sparkles },
    { label: 'Detail-Oriented', icon: Target },
  ];

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
      className="min-h-screen bg-gradient-to-b from-emerald-950/10 via-teal-950/20 to-black relative overflow-hidden"
    >
      {/* Hero Section with Portrait */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent">
              The Human Behind the Code
            </h1>
            <p className="text-gray-400 text-xl max-w-3xl mx-auto">
              More than just lines of code and circuits - I'm passionate about creating technology that makes a difference
            </p>
          </motion.div>

          {/* Portrait and Bio Section */}
          <div className="grid lg:grid-cols-3 gap-8 mb-16">
            {/* Portrait */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-1"
            >
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-500"></div>
                <div className="relative">
                  <img
                    src="https://images.unsplash.com/photo-1747811854184-95f49a6d024d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBwb3J0cmFpdCUyMGVuZ2luZWVyfGVufDF8fHx8MTc2ODI3NDEyNXww&ixlib=rb-4.1.0&q=80&w=1080"
                    alt="Professional Portrait"
                    className="w-full aspect-[3/4] object-cover rounded-2xl"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent rounded-2xl"></div>
                </div>
              </div>
            </motion.div>

            {/* Bio */}
            <motion.div
              initial={{ x: -30, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-2 bg-gradient-to-br from-teal-900/30 to-emerald-900/30 backdrop-blur-sm border border-emerald-500/30 rounded-xl p-8"
            >
              <Heart className="w-12 h-12 text-emerald-400 mb-4" />
              <h2 className="text-3xl font-bold text-white mb-4">Who I Am</h2>
              <p className="text-gray-300 mb-4 text-lg">
                I'm an engineer at heart, driven by curiosity and a passion for solving complex problems. 
                My journey spans robotics, software development, and IoT, but what truly excites me is 
                the intersection where hardware meets intelligent software.
              </p>
              <p className="text-gray-300 mb-6 text-lg">
                When I'm not coding or tinkering with robots, you'll find me exploring new technologies, 
                contributing to open source, or mentoring aspiring engineers.
              </p>

              {/* Engineer Traits */}
              <div className="grid grid-cols-2 gap-3 mt-6">
                {traits.map((trait, index) => {
                  const Icon = trait.icon;
                  return (
                    <motion.div
                      key={trait.label}
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: false }}
                      transition={{ delay: index * 0.1, type: 'spring', stiffness: 200 }}
                      className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-3 hover:border-emerald-400 hover:bg-emerald-500/20 transition-all cursor-pointer"
                    >
                      <Icon className="w-5 h-5 text-emerald-400" />
                      <span className="text-sm text-gray-300 font-medium">{trait.label}</span>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          </div>

          {/* Interests and Languages Grid */}
          <div className="grid lg:grid-cols-2 gap-8 mb-16">
            {/* Interests with Level Bars */}
            <motion.div
              initial={{ x: -30, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.6 }}
              className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 backdrop-blur-sm border border-purple-500/30 rounded-xl p-8"
            >
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                <Sparkles className="w-6 h-6 text-purple-400" />
                Interests & Hobbies
              </h3>
              <div className="space-y-4">
                {interests.map((interest, index) => {
                  const Icon = interest.icon;
                  return (
                    <motion.div
                      key={interest.label}
                      initial={{ x: -50, opacity: 0 }}
                      whileInView={{ x: 0, opacity: 1 }}
                      viewport={{ once: false }}
                      transition={{ delay: index * 0.05, duration: 0.5 }}
                      whileHover={{ scale: 1.02, x: 5 }}
                      className="cursor-pointer"
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <div className={`p-2 bg-${interest.color}-500/20 border border-${interest.color}-500/40 rounded-lg`}>
                          <Icon className={`w-4 h-4 text-${interest.color}-400`} />
                        </div>
                        <span className="text-sm text-gray-300 font-medium flex-1">{interest.label}</span>
                        <span className={`text-xs text-${interest.color}-400 font-semibold`}>{interest.level}%</span>
                      </div>
                      <div className="h-2 bg-gray-800 rounded-full overflow-hidden border border-gray-700 ml-[52px]">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${interest.level}%` }}
                          viewport={{ once: false }}
                          transition={{ delay: index * 0.05 + 0.2, duration: 1, ease: 'easeOut' }}
                          className={`h-full bg-gradient-to-r from-${interest.color}-600 to-${interest.color}-400 rounded-full`}
                        />
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>

            {/* Languages with Progress Bars */}
            <motion.div
              initial={{ x: 30, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.6 }}
              className="bg-gradient-to-br from-emerald-900/30 to-teal-900/30 backdrop-blur-sm border border-emerald-500/30 rounded-xl p-8"
            >
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                <Globe className="w-6 h-6 text-emerald-400" />
                Languages
              </h3>
              <div className="space-y-6">
                {languages.map((lang, index) => (
                  <motion.div
                    key={lang.name}
                    initial={{ x: -50, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    viewport={{ once: false }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                  >
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-300 font-medium">{lang.name}</span>
                      <span className={`text-${lang.color}-400 text-sm font-semibold`}>{lang.level}%</span>
                    </div>
                    <div className="h-3 bg-gray-800 rounded-full overflow-hidden border border-gray-700">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${lang.level}%` }}
                        viewport={{ once: false }}
                        transition={{ delay: index * 0.1 + 0.2, duration: 1, ease: 'easeOut' }}
                        className={`h-full bg-gradient-to-r from-${lang.color}-500 to-${lang.color}-400 rounded-full shadow-lg shadow-${lang.color}-500/50`}
                      />
                    </div>
                  </motion.div>
                ))}
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
              className="bg-emerald-900/20 border-2 border-emerald-500/50 rounded-xl p-6 hover:border-emerald-400 transition-all"
            >
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="w-6 h-6 text-emerald-400" />
                <h3 className="text-2xl font-bold text-emerald-400">Strengths</h3>
              </div>
              <ul className="space-y-2">
                {swotData.strengths.map((item, index) => (
                  <li key={index} className="flex items-start gap-2 text-gray-300">
                    <span className="text-emerald-400 mt-1">✓</span>
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
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
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
                className="bg-gradient-to-r from-emerald-900/20 to-teal-900/20 backdrop-blur-sm border border-emerald-500/30 rounded-xl p-6 hover:border-emerald-400 transition-all"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-3xl font-bold text-emerald-400">{log.year}</h3>
                  <Book className="w-6 h-6 text-emerald-400" />
                </div>
                <p className="text-lg text-white mb-4">{log.summary}</p>
                <div className="space-y-2">
                  {log.highlights.map((highlight, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <span className="text-emerald-400 mt-1">▸</span>
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
