import { motion, AnimatePresence } from 'motion/react';
import { useEffect, useState } from 'react';
import { Briefcase, GraduationCap, Trophy, Lightbulb, MapPin, Calendar } from 'lucide-react';
import { timelineData, groupByYear, TimelineEvent } from '../data/timelineData';
import { useAudio } from '../components/AudioContext';

export const TimelinePage = () => {
  const { changeTrack } = useAudio();
  const [expandedEvent, setExpandedEvent] = useState<string | null>(null);
  const groupedEvents = groupByYear(timelineData);
  const years = Object.keys(groupedEvents).sort((a, b) => Number(b) - Number(a));

  useEffect(() => {
    changeTrack('timeline');
  }, [changeTrack]);

  const getEventIcon = (type: TimelineEvent['type']) => {
    switch (type) {
      case 'work':
        return Briefcase;
      case 'study':
        return GraduationCap;
      case 'achievement':
        return Trophy;
      case 'project':
        return Lightbulb;
    }
  };

  const getEventColor = (type: TimelineEvent['type']) => {
    switch (type) {
      case 'work':
        return 'blue';
      case 'study':
        return 'purple';
      case 'achievement':
        return 'yellow';
      case 'project':
        return 'green';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 100 }}
      transition={{ duration: 0.5, ease: 'easeInOut' }}
      className="min-h-screen py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-black via-gray-950 to-black"
    >
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            Career Timeline
          </h1>
          <p className="text-gray-300 text-xl mb-8 max-w-3xl mx-auto">
            A chronological journey through my professional growth, tracking major milestones, 
            projects, achievements, and learning experiences from 2020 to present.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {['2025', '2024', '2023', '2022', '2021', '2020'].map((year) => (
              <motion.a
                key={year}
                href={`#${year}`}
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 bg-blue-500/20 border border-blue-500/50 rounded-lg text-blue-400 hover:border-blue-400 hover:bg-blue-500/30 transition-all"
              >
                {year}
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 via-purple-500 to-cyan-500" />

          {/* Events by Year */}
          {years.map((year, yearIndex) => (
            <div key={year} id={year} className="mb-16 scroll-mt-20">
              {/* Year Label */}
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: false, amount: 0.5 }}
                transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                className="flex justify-center mb-12"
              >
                <div className="relative z-10 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full shadow-lg shadow-blue-500/50">
                  <span className="text-white text-2xl font-bold">{year}</span>
                </div>
              </motion.div>

              {/* Events for this year */}
              {groupedEvents[Number(year)].map((event, eventIndex) => {
                const Icon = getEventIcon(event.type);
                const color = getEventColor(event.type);
                const isExpanded = expandedEvent === event.id;
                const isLeft = eventIndex % 2 === 0;

                return (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: false, amount: 0.3 }}
                    transition={{ delay: eventIndex * 0.1, duration: 0.5 }}
                    className={`relative flex ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'} items-center mb-8 md:mb-12`}
                  >
                    {/* Timeline Dot */}
                    <div className="absolute left-8 md:left-1/2 -ml-3 w-6 h-6 rounded-full bg-black border-4 border-blue-500 shadow-lg shadow-blue-500/50 z-10" />

                    {/* Content Card */}
                    <div className={`w-full md:w-5/12 ml-20 md:ml-0 ${isLeft ? 'md:mr-auto md:pr-12' : 'md:ml-auto md:pl-12'}`}>
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        onClick={() => setExpandedEvent(isExpanded ? null : event.id)}
                        className={`cursor-pointer bg-gray-900/50 backdrop-blur-sm border border-${color}-500/30 rounded-lg p-6 shadow-xl shadow-${color}-500/10 hover:shadow-${color}-500/30 hover:border-${color}-500/60 transition-all`}
                      >
                        {/* Header */}
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <div className={`p-2 bg-${color}-500/20 border border-${color}-500/50 rounded-lg`}>
                              <Icon className={`w-5 h-5 text-${color}-400`} />
                            </div>
                            <div>
                              <p className={`text-sm text-${color}-400 font-semibold mb-1`}>
                                <Calendar className="inline w-3 h-3 mr-1" />
                                {event.date}
                              </p>
                              <h3 className="text-xl font-bold text-white">
                                {event.title}
                              </h3>
                            </div>
                          </div>
                        </div>

                        {/* Company/Location */}
                        {event.company && (
                          <div className="flex items-center gap-2 mb-3 text-sm text-gray-400">
                            <span className="font-semibold">{event.company}</span>
                            {event.location && (
                              <>
                                <span>•</span>
                                <span className="flex items-center gap-1">
                                  <MapPin className="w-3 h-3" />
                                  {event.location}
                                </span>
                              </>
                            )}
                          </div>
                        )}

                        {/* Description Preview */}
                        <p className="text-gray-300 text-sm mb-4">
                          {isExpanded ? event.description : `${event.description.substring(0, 100)}...`}
                        </p>

                        {/* Skills */}
                        <AnimatePresence>
                          {isExpanded && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3 }}
                              className="overflow-hidden"
                            >
                              <div className="pt-4 border-t border-gray-700">
                                <p className="text-sm text-gray-400 mb-2 font-semibold">Key Skills:</p>
                                <div className="flex flex-wrap gap-2">
                                  {event.skills.map((skill) => (
                                    <span
                                      key={skill}
                                      className={`px-3 py-1 bg-${color}-500/10 border border-${color}-500/30 rounded-full text-xs text-${color}-400`}
                                    >
                                      {skill}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>

                        {/* Read More Button */}
                        <button
                          className={`mt-3 text-sm text-${color}-400 hover:text-${color}-300 font-semibold transition-colors`}
                        >
                          {isExpanded ? 'Show Less' : 'Read More →'}
                        </button>
                      </motion.div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};