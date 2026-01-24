import { motion } from 'motion/react';
import { useEffect } from 'react';
import { Heart, Globe, Music, Book, TrendingUp, AlertTriangle, Target, Zap, Code, Coffee, Gamepad2, Camera, Mountain, Cpu, Wrench, Sparkles, Languages } from 'lucide-react';
import { useAudio } from '../components/AudioContext';

// [FIX 1] Lookup Table to make sure Tailwind generates the colors correctly
// This fixes the "White Border" issue.
const swotStyles = {
  emerald: {
    border: 'border-emerald-500/30',
    hover: 'hover:border-emerald-500/60',
    text: 'text-emerald-400',
    bullet: 'text-emerald-500',
    icon: 'text-emerald-400',
  },
  red: {
    border: 'border-red-500/30',
    hover: 'hover:border-red-500/60',
    text: 'text-red-400',
    bullet: 'text-red-500',
    icon: 'text-red-400',
  },
  blue: {
    border: 'border-blue-500/30',
    hover: 'hover:border-blue-500/60',
    text: 'text-blue-400',
    bullet: 'text-blue-500',
    icon: 'text-blue-400',
  },
  yellow: {
    border: 'border-yellow-500/30',
    hover: 'hover:border-yellow-500/60',
    text: 'text-yellow-400',
    bullet: 'text-yellow-500',
    icon: 'text-yellow-400',
  },
};

// Helper Component: Circular Progress
const LanguageRing = ({ language, level, color, delay }: { language: string, level: number, color: string, delay: number }) => {
  const radius = 30;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (level / 100) * circumference;

  const getColor = (c: string) => {
    const colors: Record<string, string> = {
      cyan: '#22d3ee', blue: '#3b82f6', purple: '#a855f7', pink: '#ec4899', emerald: '#10b981', red: '#ef4444', green: '#22c55e', orange: '#f97316'
    };
    return colors[c] || '#fff';
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative w-24 h-24 flex items-center justify-center">
        <svg className="w-full h-full transform -rotate-90">
          <circle cx="48" cy="48" r={radius} stroke="#1f2937" strokeWidth="6" fill="transparent" />
          <motion.circle
            cx="48" cy="48" r={radius}
            stroke={getColor(color)}
            strokeWidth="6"
            fill="transparent"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            whileInView={{ strokeDashoffset }}
            viewport={{ once: true }}
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

// Helper Component: Hexagon Card
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

// [FIX 2] SwotCard using the Lookup Table + h-full for alignment
const SwotCard = ({ title, items, icon: Icon, color }: { title: string, items: string[], icon: any, color: keyof typeof swotStyles }) => {
  const style = swotStyles[color]; // Get the correct static classes

  return (
    <motion.div 
      whileHover={{ y: -5 }}
      // 'h-full' forces this card to stretch to the height of its neighbor
      // 'flex flex-col' allows the content to space out evenly
      className={`h-full flex flex-col bg-gray-900/30 border ${style.border} p-6 rounded-xl ${style.hover} transition-all duration-300`}
    >
      <div className="flex items-center gap-3 mb-4 shrink-0">
        <Icon className={`w-5 h-5 ${style.icon}`} />
        <h3 className={`text-xl font-bold ${style.text}`}>{title}</h3>
      </div>
      <ul className="space-y-3 flex-grow">
        {items.map((item, i) => (
          <li key={i} className="text-gray-400 text-sm flex items-start gap-2">
            <span className={`${style.bullet} mt-1.5 shrink-0`}>•</span> 
            <span className="leading-relaxed">{item}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
};

export const AboutPage = () => {
  const { changeTrack } = useAudio();

  useEffect(() => {
    changeTrack('about');
  }, [changeTrack]);

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

  const swotData = {
    strengths: [
      'Practical Reasoning over Raw Theory',
      'Structured System Clarity',
      'Intellectual Honesty & Limitation Analysis', 
      'Evidence-Based Decision Making'
    ],
    weaknesses: [
      'Analysis Paralysis (Over-Optimization)', 
      'Aversion to Ambiguity', 
      'Propensity for Detailed Justification'
    ],
    opportunities: [
      'Complex Systems Engineering Roles', 
      'Technical Consulting & Auditing', 
      'R&D Documentation Bridging'
    ],
    threats: [
      'Speed-over-Quality Environments', 
      'Generic AI Content Saturation', 
      'Devaluation of Deep Technical Writing'
    ],
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
      {/* Hero Section */}
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
             <motion.div className="lg:col-span-1" initial={{ opacity:0, scale:0.9 }} whileInView={{ opacity:1, scale:1 }}>
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-2xl blur opacity-40 group-hover:opacity-75 transition duration-500"></div>
                <img
                    src="images/about/portrait.jpeg"
                    alt="Portrait"
                    className="relative w-full aspect-[3/4] object-cover rounded-2xl shadow-2xl"
                  />
              </div>
            </motion.div>

            <motion.div className="lg:col-span-2 bg-gray-900/50 backdrop-blur-md border border-gray-800 rounded-2xl p-8 flex flex-col justify-center">
              <Heart className="w-10 h-10 text-emerald-400 mb-6" />
              <h2 className="text-3xl font-bold text-white mb-4">Who I Am</h2>
              <p className="text-gray-300 text-lg leading-relaxed mb-6">
                I am an engineering professional who prioritizes <span className="text-emerald-400">structured reasoning</span> and practical application over raw theory. 
                My approach is defined by a rigorous focus on the <span className="text-blue-400">"why"</span> behind system design—whether justifying a specific control logic or analyzing the limitations of a motion planner.
              </p>
              <p className="text-gray-300 text-lg leading-relaxed mb-6">
                I believe technical documentation should be human and accessible, bridging the gap between academic standards and real-world system challenges.
              </p>
              
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

          <div className="grid lg:grid-cols-12 gap-8 mb-20">
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
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {interests.map((interest, i) => (
                  <InterestHex key={i} {...interest} index={i} />
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SWOT Matrix */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-black/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-2">SWOT Analysis</h2>
            <p className="text-gray-400">Strategic self-assessment & "Sparring Partner" Rigor</p>
          </div>
          {/* [FIX 3] Flattened the Grid. No more vertical columns. 
              This ensures Row 1 (S & W) are equal height, and Row 2 (O & T) are equal height. */}
          <div className="grid md:grid-cols-2 gap-6">
             <SwotCard title="Strengths (Internal)" items={swotData.strengths} icon={TrendingUp} color="emerald" />
             <SwotCard title="Weaknesses (Internal)" items={swotData.weaknesses} icon={AlertTriangle} color="red" />
             <SwotCard title="Opportunities (External)" items={swotData.opportunities} icon={Target} color="blue" />
             <SwotCard title="Threats (External)" items={swotData.threats} icon={Zap} color="yellow" />
          </div>
        </div>
      </section>

      {/* Developer Log */}
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