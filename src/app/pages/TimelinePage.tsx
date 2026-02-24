import { motion, AnimatePresence } from 'motion/react';
import { useEffect, useState } from 'react';
import { Briefcase, GraduationCap, Trophy, Lightbulb, MapPin, Calendar } from 'lucide-react';
import { timelineData, groupByYear, TimelineEvent } from '../data/timelineData';
import { ProjectModal, ProjectDetails } from '../components/ProjectModal';
import { useAudio } from '../components/AudioContext';

export const TimelinePage = () => {
  const { changeTrack } = useAudio();
  const [selectedEvent, setSelectedEvent] = useState<ProjectDetails | null>(null);
  const groupedEvents = groupByYear(timelineData);
  const years = Object.keys(groupedEvents).sort((a, b) => Number(b) - Number(a));

  useEffect(() => {
    changeTrack('timeline');
  }, [changeTrack]);

  // HELPER: Smooth scroll function
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

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

  // Gradient colors that change by year (newest to oldest)
  const getYearGradient = (yearIndex: number) => {
    const gradients = [
      'from-blue-500 to-cyan-500',      // Most recent
      'from-cyan-500 to-teal-500',       
      'from-teal-500 to-green-500',      
      'from-green-500 to-emerald-500',   
      'from-emerald-500 to-lime-500',    
      'from-yellow-500 to-amber-500',    
    ];
    return gradients[yearIndex % gradients.length];
  };

  const getYearColor = (yearIndex: number) => {
    const colors = ['blue', 'cyan', 'teal', 'green', 'emerald', 'yellow'];
    return colors[yearIndex % colors.length];
  };

  // Color mapping for events
  const colorMap: Record<string, { bg: string; border: string; text: string; shadow: string }> = {
    blue: { bg: 'bg-blue-500/20', border: 'border-blue-500/50', text: 'text-blue-400', shadow: 'shadow-blue-500/30' },
    cyan: { bg: 'bg-cyan-500/20', border: 'border-cyan-500/50', text: 'text-cyan-400', shadow: 'shadow-cyan-500/30' },
    teal: { bg: 'bg-teal-500/20', border: 'border-teal-500/50', text: 'text-teal-400', shadow: 'shadow-teal-500/30' },
    green: { bg: 'bg-green-500/20', border: 'border-green-500/50', text: 'text-green-400', shadow: 'shadow-green-500/30' },
    emerald: { bg: 'bg-emerald-500/20', border: 'border-emerald-500/50', text: 'text-emerald-400', shadow: 'shadow-emerald-500/30' },
    yellow: { bg: 'bg-yellow-500/20', border: 'border-yellow-500/50', text: 'text-yellow-400', shadow: 'shadow-yellow-500/30' },
    purple: { bg: 'bg-purple-500/20', border: 'border-purple-500/50', text: 'text-purple-400', shadow: 'shadow-purple-500/30' },
  };

  const getColor = (colorName: string) => colorMap[colorName] || colorMap.blue;

  const handleEventClick = (event: TimelineEvent) => {
    const projectDetails: ProjectDetails = {
      title: event.title,
      subtitle: event.company || 'Professional Experience',
      imageUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800',
      tags: event.skills,
      description: event.description,
      date: event.date,
      company: event.company,
      location: event.location,
    };
    setSelectedEvent(projectDetails);
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
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400 bg-clip-text text-transparent">
            Career Timeline
          </h1>
          <p className="text-gray-300 text-xl mb-8 max-w-3xl mx-auto">
            A chronological journey through my professional growth, tracking major milestones, 
            projects, achievements, and learning experiences from 2020 to present.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {years.map((year, index) => {
              const gradient = getYearGradient(index);
              const colorName = getYearColor(index);
              const color = getColor(colorName);
              return (
                <motion.button
                  key={year}
                  onClick={() => scrollToSection(year)}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-4 py-2 ${color.bg} ${color.border} border rounded-lg text-white hover:bg-opacity-30 transition-all cursor-pointer font-semibold`}
                >
                  {year}
                </motion.button>
              );
            })}
          </div>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Dynamic Gradient Vertical Line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 via-cyan-500 via-teal-500 via-green-500 via-emerald-500 to-yellow-500" />

          {/* Events by Year */}
          {years.map((year, yearIndex) => {
            const gradient = getYearGradient(yearIndex);
            const colorName = getYearColor(yearIndex);
            const color = getColor(colorName);
            
            return (
              <div key={year} id={year} className="mb-16 scroll-mt-20">
                {/* Year Label */}
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: false, amount: 0.5 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                  className="flex justify-center mb-12"
                >
                  <div className={`relative z-10 px-6 py-3 bg-gradient-to-r ${gradient} rounded-full shadow-lg`}>
                    <span className="text-white text-2xl font-bold">{year}</span>
                  </div>
                </motion.div>

                {/* Events for this year */}
                {groupedEvents[Number(year)].map((event, eventIndex) => {
                  const Icon = getEventIcon(event.type);
                  const isLeft = eventIndex % 2 === 0;
                  
                  // Use year color for work, purple for study, yellow for achievement, green for project
                  const eventColorName = event.type === 'work' ? colorName : 
                                        event.type === 'study' ? 'purple' : 
                                        event.type === 'achievement' ? 'yellow' : 'green';
                  const eventColor = getColor(eventColorName);

                  return (
                    <motion.div
                      key={event.id}
                      initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: false, amount: 0.3 }}
                      transition={{ delay: eventIndex * 0.1, duration: 0.5 }}
                      className={`relative flex ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'} items-center mb-8 md:mb-12`}
                    >
                      {/* Timeline Dot with Year Color */}
                      <div 
                        className={`absolute left-8 md:left-1/2 -ml-3 w-6 h-6 rounded-full bg-black border-4 shadow-lg z-10 ${color.border.replace('border-', 'border-')}`}
                        style={{ borderColor: colorName === 'blue' ? '#3b82f6' : colorName === 'cyan' ? '#06b6d4' : colorName === 'teal' ? '#14b8a6' : colorName === 'green' ? '#22c55e' : colorName === 'emerald' ? '#10b981' : '#eab308', boxShadow: `0 0 15px ${colorName === 'blue' ? '#3b82f6' : colorName === 'cyan' ? '#06b6d4' : colorName === 'teal' ? '#14b8a6' : colorName === 'green' ? '#22c55e' : colorName === 'emerald' ? '#10b981' : '#eab308'}` }}
                      />

                      {/* Content Card */}
                      <div className={`w-full md:w-5/12 ml-20 md:ml-0 ${isLeft ? 'md:mr-auto md:pr-12' : 'md:ml-auto md:pl-12'}`}>
                        <motion.div
                          whileHover={{ scale: 1.02 }}
                          onClick={() => handleEventClick(event)}
                          className={`cursor-pointer bg-gray-900/50 backdrop-blur-sm border ${eventColor.border} rounded-lg p-6 shadow-xl ${eventColor.shadow} hover:border-opacity-80 transition-all`}
                        >
                          {/* Header */}
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center gap-3">
                              <div className={`p-2 ${eventColor.bg} border ${eventColor.border} rounded-lg`}>
                                <Icon className={`w-5 h-5 ${eventColor.text}`} />
                              </div>
                              <div>
                                <p className={`text-sm ${eventColor.text} font-semibold mb-1`}>
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
                            {event.description.substring(0, 100)}...
                          </p>

                          {/* View Details Button */}
                          <button
                            className={`text-sm ${eventColor.text} hover:text-white font-semibold transition-colors`}
                          >
                            View Details →
                          </button>
                        </motion.div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>

      {/* Event Details Modal */}
      <ProjectModal
        project={selectedEvent}
        onClose={() => setSelectedEvent(null)}
      />
    </motion.div>
  );
};
