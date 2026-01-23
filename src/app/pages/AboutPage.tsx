import { motion } from 'motion/react';
import { useEffect } from 'react';
import { Heart, Globe, Music, Book, TrendingUp, AlertTriangle, Target, Zap, Code, Coffee, Gamepad2, Camera, Mountain, Cpu, Wrench, Sparkles, Languages } from 'lucide-react';
import { useAudio } from '../components/AudioContext';

//
// Helper Component: Circular Progress (Donut Chart) for Languages
const LanguageRing = ({ language, level, color, delay }: { language: string, level: number, color: string, delay: number }) => {
  const radius = 30;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (level / 100) * circumference;

  const getColor = (c: string) => {
    const colors: Record<string, string> = {
      cyan: '#22d3ee', blue: '#3b82f6', purple: '#a855f7', pink: '#ec4899', emerald: '#10b981'
    };
    return colors[c] || '#fff';
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative w-24 h-24 flex items-center justify-center">
        {/* Background Circle */}
        <svg className="w-full h-full transform -rotate-90">
          <circle cx="48" cy="48" r={radius} stroke="#1f2937" strokeWidth="6" fill="transparent" />
          {/* Progress Circle */}
          <motion.circle
            cx="48" cy="48" r={radius}
            stroke={getColor(color)}
            strokeWidth="6"
            fill="transparent"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            whileInView={{ strokeDashoffset }}
            viewport={{ once: true }} // Only animate once
            transition={{ duration: 1.5, delay, ease: "easeOut" }}
            strokeLinecap="round"
          />
        </svg>
        <span className="absolute text-xl font-bold text-white">{level}%</span>
      </div>
      <span className="text-sm font-medium text-gray-300">{language}</span>
    </div>
  );
};

// Helper Component: Hexagon Card for Interests
const InterestHex = ({ icon: Icon, label, color, index }: { icon: any, label: string, color: string, index: number }) => (
  <motion.div
    initial={{ scale: 0, opacity: 0 }}
    whileInView={{ scale: 1, opacity: 1 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.05, type: 'spring' }}
    whileHover={{ scale: 1.1, rotate: 5 }}
    className="flex flex-col items-center justify-center p-4 bg-gray-900/50 border border-gray-700 hover:border-emerald-500/50 rounded-2xl transition-all group"
  >
    <div className={`p-3 rounded-xl bg-gray-800 group-hover:bg-${color}-500/20 transition-colors mb-2`}>
      <Icon className={`w-6 h-6 text-gray-400 group-hover:text-${color}-400 transition-colors`} />
    </div>
    <span className="text-xs text-gray-400 font-medium text-center">{label}</span>
  </motion.div>
);

export const AboutPage = () => {
  const { changeTrack } = useAudio();

  useEffect(() => {
    changeTrack('about');
  }, [changeTrack]);

  // Combined Tech & Personal Interests
  const interests = [
    { icon: Cpu, label: 'Robotics', color: 'cyan' },
    { icon: Code, label: 'Open Source', color: 'emerald' },
    { icon: Zap, label: 'Hackathons', color: 'yellow' },
    { icon: Book, label: 'Sci-Fi Lit', color: 'pink' },
    { icon: Music, label: 'Synthwave', color: 'purple' },
    { icon: Coffee, label: 'Pour Over', color: 'orange' },
    { icon: Gamepad2, label: 'Gaming', color: 'green' },
    { icon: Mountain, label: 'Hiking', color: 'teal' },
    { icon: Globe, label: 'Travel', color: 'blue' },
    { icon: Camera, label: 'Photo', color: 'red' },
  ];

  const languages = [
    { name: 'Mandarin', level: 100, color: 'red' },
    { name: 'English', level: 100, color: 'cyan' },
    { name: 'Malay', level: 60, color: 'green' },
    { name: 'Japanese', level: 30, color: 'pink' },
  ];

  const traits = [
    { label: 'Analytical Thinking', icon: Cpu },
    { label: 'Problem Solver', icon: Wrench },
    { label: 'Creative Innovator', icon: Sparkles },
    { label: 'Detail-Oriented', icon: Target },
  ];

  // ... (Keep existing SWOT and Developer Log data as is) ...
  const swotData = {
    strengths: ['Problem-solving', 'Full-stack Dev', 'Robotics & IoT', 'Quick Learner', 'Communication'],
    weaknesses: ['Perfectionism', 'Overcommitting', 'Delegation', 'Hyper-focus'],
    opportunities: ['AI/ML Demand', 'Remote Work', 'Open Source', 'Leadership', 'Mentorship'],
    threats: ['Tech Velocity', 'Burnout Risk', 'Competition', 'Obsolescence'],
  };

  const developerLogs = [
    { year: 2025, summary: 'AI Integration & Leadership', highlights: ['Masters Degree', 'IEEE Papers', 'Github User'] },
    { year: 2024, summary: 'Robotics Deep Dive', highlights: ['Internship', 'Industry Standards'] },
    { year: 2023, summary: 'Research & Academia', highlights: ['Competition Attendent', 'Project Maniac'] },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 100 }}
      transition={{ duration: 0.5, ease: 'easeInOut' }}
      className="min-h-screen bg-gradient-to-b from-emerald-950/10 via-teal-950/20 to-black relative overflow-hidden"
    >
      {/* Hero Section (Portrait & Bio) - Kept mostly same but cleaned up */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div className="text-center mb-16" initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }}>
            <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent">
              The Human Behind the Code
            </h1>
            <p className="text-gray-400 text-xl max-w-3xl mx-auto">
              Robotics Engineer. Open Source Advocate. Coffee Enthusiast.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8 mb-20">
             {/* Portrait */}
             <motion.div className="lg:col-span-1" initial={{ opacity:0, scale:0.9 }} whileInView={{ opacity:1, scale:1 }}>
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-2xl blur opacity-40 group-hover:opacity-75 transition duration-500"></div>
                <img
                    src="https://images.unsplash.com/photo-1747811854184-95f49a6d024d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080"
                    alt="Portrait"
                    className="relative w-full aspect-[3/4] object-cover rounded-2xl shadow-2xl"
                  />
              </div>
            </motion.div>

            {/* Bio Card */}
            <motion.div className="lg:col-span-2 bg-gray-900/50 backdrop-blur-md border border-gray-800 rounded-2xl p-8 flex flex-col justify-center">
              <Heart className="w-10 h-10 text-emerald-400 mb-6" />
              <h2 className="text-3xl font-bold text-white mb-4">Who I Am</h2>
              <p className="text-gray-300 text-lg leading-relaxed mb-6">
                I'm an engineer driven by the friction between hardware constraints and software possibilities. 
                My work spans <span className="text-emerald-400">ROS2 robotics</span>, <span className="text-blue-400">IoT systems</span>, 
                and modern web architecture.
              </p>
              
              {/* Traits Grid (Compact) */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-auto">
                {traits.map((trait, i) => (
                  <div key={i} className="flex flex-col items-center p-3 bg-gray-800/50 rounded-lg border border-gray-700/50">
                    <trait.icon className="w-6 h-6 text-emerald-400 mb-2" />
                    <span className="text-xs text-gray-400 text-center font-medium">{trait.label}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* NEW SECTION: The "Command Center" Layout */}
          <div className="grid lg:grid-cols-12 gap-8 mb-20">
            
            {/* 1. Languages (The Gauges) - Spans 4 columns */}
            <motion.div 
              className="lg:col-span-4 bg-gray-900/40 border border-gray-800 rounded-2xl p-8 flex flex-col items-center"
              initial={{ x: -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-3 mb-8 w-full">
                <div className="p-2 bg-blue-500/10 rounded-lg"><Languages className="w-6 h-6 text-blue-400" /></div>
                <h3 className="text-xl font-bold text-white">Communication</h3>
              </div>
              
              <div className="grid grid-cols-2 gap-x-4 gap-y-8">
                {languages.map((lang, i) => (
                  <LanguageRing key={lang.name} language={lang.name} level={lang.level} color={lang.color} delay={i * 0.1} />
                ))}
              </div>
            </motion.div>

            {/* 2. Interests (The Grid) - Spans 8 columns */}
            <motion.div 
              className="lg:col-span-8 bg-gray-900/40 border border-gray-800 rounded-2xl p-8"
              initial={{ x: 50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-3 mb-8">
                <div className="p-2 bg-purple-500/10 rounded-lg"><Sparkles className="w-6 h-6 text-purple-400" /></div>
                <h3 className="text-xl font-bold text-white">Interests & Hobbies</h3>
              </div>

              {/* The Hex Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {interests.map((interest, i) => (
                  <InterestHex key={i} {...interest} index={i} />
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SWOT Matrix (Kept Clean) */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-black/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-2">SWOT Analysis</h2>
            <p className="text-gray-400">Strategic self-assessment</p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-6">
               <SwotCard title="Strengths" items={swotData.strengths} icon={TrendingUp} color="emerald" />
               <SwotCard title="Weaknesses" items={swotData.weaknesses} icon={AlertTriangle} color="red" />
            </div>
            <div className="space-y-6">
               <SwotCard title="Opportunities" items={swotData.opportunities} icon={Target} color="blue" />
               <SwotCard title="Threats" items={swotData.threats} icon={Zap} color="yellow" />
            </div>
          </div>
        </div>
      </section>

      {/* Developer Log (Kept Clean) */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-12 text-center">Developer's Log</h2>
          <div className="relative border-l-2 border-gray-800 ml-4 space-y-12">
            {developerLogs.map((log, i) => (
              <div key={i} className="relative pl-8">
                <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-black border-2 border-emerald-500"></div>
                <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6 hover:border-emerald-500/30 transition-colors">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-2xl font-bold text-emerald-400">{log.year}</h3>
                  </div>
                  <h4 className="text-lg text-white font-medium mb-3">{log.summary}</h4>
                  <div className="flex flex-wrap gap-2">
                    {log.highlights.map((h, j) => (
                      <span key={j} className="px-3 py-1 bg-emerald-500/10 text-emerald-400 text-xs rounded-full border border-emerald-500/20">
                        {h}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </motion.div>
  );
};

// Small Helper for SWOT to reduce code duplication
const SwotCard = ({ title, items, icon: Icon, color }: any) => (
  <motion.div 
    whileHover={{ y: -5 }}
    className={`bg-gray-900/30 border border-${color}-500/30 p-6 rounded-xl hover:border-${color}-500/60 transition-colors`}
  >
    <div className="flex items-center gap-3 mb-4">
      <Icon className={`w-5 h-5 text-${color}-400`} />
      <h3 className={`text-xl font-bold text-${color}-400`}>{title}</h3>
    </div>
    <ul className="space-y-2">
      {items.map((item: string, i: number) => (
        <li key={i} className="text-gray-400 text-sm flex items-start gap-2">
          <span className={`text-${color}-500 mt-1`}>•</span> {item}
        </li>
      ))}
    </ul>
  </motion.div>
);