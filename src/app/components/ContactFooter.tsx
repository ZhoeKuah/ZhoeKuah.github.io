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
const RATE_LIMIT_KEY = 'feedback_rate_limit';
const RATE_LIMIT_MESSAGES = 5; // Max 5 messages
const RATE_LIMIT_WINDOW = 3600000; // per hour (ms)
const MAX_RETRIES = 3;
const RETRY_DELAY = 1000; // 1 second between retries

export const ContactFooter = () => {
  const currentYear = new Date().getFullYear();
  const [message, setMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [showBubble, setShowBubble] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
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

  // Check rate limit
  const checkRateLimit = (): { allowed: boolean; remaining: number; message: string } => {
    const now = Date.now();
    const rateData = localStorage.getItem(RATE_LIMIT_KEY);
    
    if (!rateData) {
      localStorage.setItem(RATE_LIMIT_KEY, JSON.stringify({
        count: 1,
        resetTime: now + RATE_LIMIT_WINDOW,
      }));
      return { allowed: true, remaining: RATE_LIMIT_MESSAGES - 1, message: '' };
    }

    const { count, resetTime } = JSON.parse(rateData);

    if (now > resetTime) {
      // Reset window
      localStorage.setItem(RATE_LIMIT_KEY, JSON.stringify({
        count: 1,
        resetTime: now + RATE_LIMIT_WINDOW,
      }));
      return { allowed: true, remaining: RATE_LIMIT_MESSAGES - 1, message: '' };
    }

    if (count >= RATE_LIMIT_MESSAGES) {
      const minutesLeft = Math.ceil((resetTime - now) / 60000);
      return {
        allowed: false,
        remaining: 0,
        message: `Rate limited. Try again in ${minutesLeft} minute${minutesLeft > 1 ? 's' : ''}.`,
      };
    }

    // Increment count
    localStorage.setItem(RATE_LIMIT_KEY, JSON.stringify({
      count: count + 1,
      resetTime,
    }));

    return { allowed: true, remaining: RATE_LIMIT_MESSAGES - count - 1, message: '' };
  };

  // Save feedback to localStorage
  const saveFeedback = (msg: string, sent: boolean = true) => {
    const newFeedback: FeedbackMessage = {
      id: Date.now().toString(),
      message: msg,
      timestamp: Date.now(),
    };

    const existing = localStorage.getItem(FEEDBACK_KEY);
    const feedbacks: FeedbackMessage[] = existing ? JSON.parse(existing) : [];
    feedbacks.unshift(newFeedback);
    
    // Keep only last 100 messages
    const trimmed = feedbacks.slice(0, 100);
    localStorage.setItem(FEEDBACK_KEY, JSON.stringify(trimmed));
  };

  // Send message to Discord webhook with retry logic
  const sendToDiscord = async (msg: string, retryCount = 0): Promise<boolean> => {
    const webhookUrl = import.meta.env.VITE_DISCORD_WEBHOOK;

    if (!webhookUrl) {
      console.warn('Discord webhook not configured');
      return false;
    }

    try {
      const embed = {
        title: '📢 New Portfolio Feedback',
        description: msg,
        color: 0x0ea5e9, // cyan-500
        timestamp: new Date().toISOString(),
        footer: {
          text: 'Portfolio Feedback System',
        },
        fields: [
          {
            name: 'Status',
            value: '✅ Received',
            inline: true,
          },
        ],
      };

      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          embeds: [embed],
          username: 'Portfolio Feedback',
          avatar_url: 'https://cdn.discordapp.com/embed/avatars/0.png',
        }),
      });

      if (!response.ok) {
        if (response.status === 429) {
          // Rate limited by Discord
          const retryAfter = response.headers.get('Retry-After');
          const delay = retryAfter ? parseInt(retryAfter) * 1000 : RETRY_DELAY;
          
          if (retryCount < MAX_RETRIES) {
            await new Promise(resolve => setTimeout(resolve, delay));
            return sendToDiscord(msg, retryCount + 1);
          }
        }
        throw new Error(`Discord API error: ${response.status}`);
      }

      return true;
    } catch (error) {
      console.error('Discord webhook error:', error);
      
      // Retry on network errors
      if (retryCount < MAX_RETRIES && error instanceof TypeError) {
        await new Promise(resolve => setTimeout(resolve, RETRY_DELAY * (retryCount + 1)));
        return sendToDiscord(msg, retryCount + 1);
      }
      
      return false;
    }
  };

  const handleSend = async () => {
    if (!message.trim() || isOverLimit || isSending) return;

    // Check rate limit
    const rateLimit = checkRateLimit();
    if (!rateLimit.allowed) {
      setErrorMessage(rateLimit.message);
      setShowError(true);
      setTimeout(() => setShowError(false), 3000);
      return;
    }

    setIsSending(true);
    setShowError(false);
    setErrorMessage('');

    try {
      // Send to Discord
      const discordSuccess = await sendToDiscord(message.trim());

      // Always save locally as backup
      saveFeedback(message.trim(), discordSuccess);

      setSentCount(prev => prev + 1);
      setShowBubble(true);
      setMessage('');

      // Hide bubble after animation
      setTimeout(() => setShowBubble(false), 2000);

      if (!discordSuccess) {
        setErrorMessage('Saved locally. Discord delivery failed.');
        setShowError(true);
        setTimeout(() => setShowError(false), 3000);
      }
    } catch (error) {
      console.error('Error sending message:', error);
      setErrorMessage('Saved locally. Try again later.');
      setShowError(true);
      // Still save to localStorage as fallback
      saveFeedback(message.trim(), false);
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
                className="w-full h-24 bg-gray-900/50 border border-gray-700 rounded-lg p-3 text-sm text-gray-300 placeholder-gray-500 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20 resize-none"
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
                  <div className="bg-gradient-to-r from-red-500 to-orange-500 text-white px-4 py-2 rounded-full shadow-lg flex items-center gap-2 max-w-xs">
                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                    <span className="text-sm font-medium truncate">{errorMessage || 'Saved Locally'}</span>
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