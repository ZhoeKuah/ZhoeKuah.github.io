import { useState } from 'react';
//
// 1. CHANGE BrowserRouter to HashRouter
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'motion/react';
import { AudioProvider } from './components/AudioContext';
import { SplashScreen } from './components/SplashScreen';
import { Navbar } from './components/Navbar';
import { ScrollToTop } from './components/ScrollToTop';
import { CustomCursor } from './components/CustomCursor';
import { SpotifyWidget } from './components/SpotifyWidget';
import { HomePage } from './pages/HomePage';
import { ProjectsPage } from './pages/ProjectsPage';
import { TimelinePage } from './pages/TimelinePage';
import { AboutPage } from './pages/AboutPage';
import { ContactFooter } from './components/ContactFooter';

function AppContent() {
  const [showSplash, setShowSplash] = useState(true);
  const location = useLocation();

  return (
    <div className="min-h-screen bg-black text-gray-100">
      {/* 2. MOVED CustomCursor HERE so it is always visible, even on Splash Screen */}
      <CustomCursor />
      <ScrollToTop />

      <AnimatePresence mode="wait">
        {showSplash ? (
          <SplashScreen key="splash" onEnter={() => setShowSplash(false)} />
        ) : (
          <>
            <Navbar />
            <SpotifyWidget />
            <AnimatePresence mode="wait">
              <Routes location={location} key={location.pathname}>
                <Route path="/" element={<HomePage />} />
                <Route path="/projects" element={<ProjectsPage />} />
                <Route path="/timeline" element={<TimelinePage />} />
                <Route path="/about" element={<AboutPage />} />
              </Routes>
            </AnimatePresence>
            <ContactFooter />
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function App() {
  return (
    // 3. WRAP with HashRouter to fix GitHub Pages 404 errors
    <HashRouter>
      <AudioProvider>
        <AppContent />
      </AudioProvider>
    </HashRouter>
  );
}
