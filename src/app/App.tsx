import { useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'motion/react';
import { AudioProvider } from './components/AudioContext';
import { SplashScreen } from './components/SplashScreen';
import { Navbar } from './components/Navbar';
import { ScrollToTop } from './components/ScrollToTop';
import { HomePage } from './pages/HomePage';
import { ProjectsPage } from './pages/ProjectsPage';
import { TimelinePage } from './pages/TimelinePage';
import { AboutPage } from './pages/AboutPage';
import { ContactFooter } from './components/ContactFooter';

function AppContent() {
  const [showSplash, setShowSplash] = useState(true);
  const location = useLocation();

  if (showSplash) {
    return <SplashScreen onEnter={() => setShowSplash(false)} />;
  }

  return (
    <div className="min-h-screen bg-black text-gray-100">
      <ScrollToTop />
      <Navbar />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<HomePage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/timeline" element={<TimelinePage />} />
          <Route path="/about" element={<AboutPage />} />
        </Routes>
      </AnimatePresence>
      <ContactFooter />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AudioProvider>
        <AppContent />
      </AudioProvider>
    </BrowserRouter>
  );
}