import { useState, useRef, useEffect } from 'react';
import { Mail, Github, Linkedin, Send, CheckCircle, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';

interface FeedbackMessage {
  id: string;
  message: string;
  timestamp: number;
}

const FEEDBACK_KEY = 'portfolio_feedback';
const DISCORD_WEBHOOK_URL = 'https://discord.com/api/webhooks/1476124111141863485/flKUPtbU-A_9GeAQE5Oqbe8C6PPauSNsk6ybp7kvqQbH9rOHW86N1RdzxrB1WZCUNMj6';

export const ContactFooter = () => {
  const currentYear = new Date().getFullYear();
  const [message, setMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [showBubble, setShowBubble] = useState(false);
  const [showError, setShowError] = useState(false);
  const [sentCount, setSentCount] = useState(0);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Dynamic word limit based on container size
  const [wordLimit, setWordLimit] = useState(100);

  // Calculate word limit based on container size
  useEffect(() => {
    const calculateWordLimit = () => {
      if (containerRef.current) {
        const height = containerRef.current.offsetHeight;
        // Rough estimate: ~15 words per 50px height
        const limit = Math.floor((height / 50) * 15);
        setWordLimit(Math.max(50, Math.min(200, limit)));
      }
    };

    calculateWordLimit();
    window.addEventListener('resize', calculateWordLimit);
    return () => window.removeEventListener('resize', calculateWordLimit);
  }, []);

  // Count words
  const wordCount = message.trim() ? message.trim().split(/\s+/).length : 0;
  const isOverLimit = wordCount > wordLimit;

  // Save feedback to localStorage
  const saveFeedback = (msg: string) => {
    const newFeedback: FeedbackMessage = {
      id: Date.now().toString(),
      message: msg,
      timestamp: Date.now(),
    };

    const existing = localStorage.getItem(FEEDBACK_KEY);
    const feedbacks: FeedbackMessage[] = existing ? JSON.parse(existing) : [];
    feedbacks.unshift(newFeedback); // Add to beginning
    
    // Keep only last 100 messages
    const trimmed = feedbacks.slice(0, 100);
    localStorage.setItem(FEEDBACK_KEY, JSON.stringify(trimmed));
  };

  // Send message to Discord webhook
  const sendToDiscord = async (msg: string) => {
    if (!DISCORD_WEBHOOK_URL) {
      console.warn('Discord webhook not configured');
      return false;
    }

    try {
      const response = await fetch(DISCORD_WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: `📢 **New Portfolio Feedback**\n\n${msg}\n\n_Sent at ${new Date().toLocaleString()}_`,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to send to Discord');
      }

      return true;
    } catch (error) {
      console.error('Discord webhook error:', error);
      return false;
    }
  };

  const handleSend = async () => {
    if (!message.trim() || isOverLimit || isSending) return;

    setIsSending(true);
    setShowError(false);

    try {
      // Send to Discord
      await sendToDiscord(message.trim());

      // Save locally as backup
      saveFeedback(message.trim());
      setSentCount(prev => prev + 1);
      setShowBubble(true);
      setMessage('');

      // Hide bubble after animation
      setTimeout(() => setShowBubble(false), 2000);
    } catch (error) {
      console.error('Error sending message:', error);
      setShowError(true);
      // Still save to localStorage as fallback
      saveFeedback(message.trim());
      setTimeout(() => setShowError(false), 3000);
    } finally {
      setIsSending(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && e.ctrlKey) {
      handleSend();
    }
  };

  return (
    <footer className="bg-black border-t border-blue-500/20 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8">
          {/* About */}
          <div>
            <h3 className="text-xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              The Engineer's Terminal
            </h3>
            <p className="text-gray-400 text-sm">
              Building the future through innovative engineering solutions.
              Specializing in robotics, IoT, and full-stack development.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="text-gray-400 hover:text-blue-400 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/projects" className="text-gray-400 hover:text-blue-400 transition-colors">
                  Projects
                </Link>
              </li>
              <li>
                <Link to="/timeline" className="text-gray-400 hover:text-blue-400 transition-colors">
                  Timeline
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-blue-400 transition-colors">
                  About
                </Link>
              </li>
            </ul>
          </div>

          {/* Connect - Message Box */}
          <div ref={containerRef}>
            <h3 className="text-lg font-semibold mb-4 text-white">Connect & Feedback</h3>
            
            {/* Social Links */}
            <div className="flex space-x-4 mb-4">
              <a
                href="mailto:kuahzh@gmail.com"
                className="p-2 bg-blue-500/10 border border-blue-500/30 rounded-lg hover:bg-blue-500/20 hover:border-blue-500/50 transition-all"
                aria-label="Email"
              >
                <Mail className="w-5 h-5 text-blue-400" />
              </a>
              <a
                href="https://github.com/ZhoeKuah"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-blue-500/10 border border-blue-500/30 rounded-lg hover:bg-blue-500/20 hover:border-blue-500/50 transition-all"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5 text-blue-400" />
              </a>
            </div>

            {/* Message Box */}
            <div className="relative">
              <textarea
                ref={textareaRef}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Send a message or feedback..."
                className="w-full h-24 bg-gray-900/50 border border-gray-700 rounded-lg p-3 text-sm text-gray-300 placeholder-gray-500 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/30 resize-none transition-all"
                disabled={isSending}
              />
              
              {/* Word count indicator */}
              <div className={`absolute bottom-2 right-2 text-xs ${isOverLimit ? 'text-red-400' : 'text-gray-500'}`}> 
                {wordCount}/{wordLimit}
              </div>
            </div>

            {/* Send Button */}
            <motion.button
              onClick={handleSend}
              disabled={!message.trim() || isOverLimit || isSending}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`mt-3 w-full py-2 px-4 rounded-lg font-medium flex items-center justify-center gap-2 transition-all ${
                !message.trim() || isOverLimit || isSending
                  ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                  : 'bg-blue-500 hover:bg-blue-600 text-white shadow-lg shadow-blue-500/30'
              }`}
            >
              {isSending ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                />
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Send Message</span>
                </>
              )}
            </motion.button>

            {/* Floating Bubble Animation - Success */}
            <AnimatePresence>
              {showBubble && (
                <motion.div
                  initial={{ opacity: 0, y: 20, scale: 0.5 }}
                  animate={{ opacity: 1, y: -60, scale: 1 }}
                  exit={{ opacity: 0, y: -80, scale: 0.8 }}
                  transition={{ duration: 0.6, ease: 'easeOut' }}
                  className="absolute left-1/2 -translate-x-1/2 z-10"
                >
                  <div className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-4 py-2 rounded-full shadow-lg flex items-center gap-2">
                    <CheckCircle className="w-4 h-4" />
                    <span className="text-sm font-medium">Sent!</span>
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 rotate-45 w-3 h-3 bg-cyan-500" />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Error Bubble */}
            <AnimatePresence>
              {showError && (
                <motion.div
                  initial={{ opacity: 0, y: 20, scale: 0.5 }}
                  animate={{ opacity: 1, y: -60, scale: 1 }}
                  exit={{ opacity: 0, y: -80, scale: 0.8 }}
                  transition={{ duration: 0.6, ease: 'easeOut' }}
                  className="absolute left-1/2 -translate-x-1/2 z-10"
                >
                  <div className="bg-gradient-to-r from-red-500 to-orange-500 text-white px-4 py-2 rounded-full shadow-lg flex items-center gap-2">
                    <AlertCircle className="w-4 h-4" />
                    <span className="text-sm font-medium">Saved Locally</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Feedback count */}
            {sentCount > 0 && (
              <p className="text-xs text-gray-500 mt-2 text-center">
                {sentCount} message{sentCount > 1 ? 's' : ''} sent
              </p>
            )}
            
            <p className="text-sm text-gray-400 mt-3">
              kuahzh@gmail.com
            </p>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-blue-500/20 text-center text-sm text-gray-500">
          <p>© {currentYear} The Engineer's Terminal. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
