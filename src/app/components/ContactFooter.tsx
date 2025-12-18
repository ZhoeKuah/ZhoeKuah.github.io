import { Mail, Github, Linkedin, Twitter } from 'lucide-react';

export const ContactFooter = () => {
  const currentYear = new Date().getFullYear();

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
                <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                  Projects
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                  Timeline
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                  About
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Connect</h3>
            <div className="flex space-x-4 mb-4">
              <a
                href="mailto:engineer@example.com"
                className="p-2 bg-blue-500/10 border border-blue-500/30 rounded-lg hover:bg-blue-500/20 hover:border-blue-500/50 transition-all"
                aria-label="Email"
              >
                <Mail className="w-5 h-5 text-blue-400" />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-blue-500/10 border border-blue-500/30 rounded-lg hover:bg-blue-500/20 hover:border-blue-500/50 transition-all"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5 text-blue-400" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-blue-500/10 border border-blue-500/30 rounded-lg hover:bg-blue-500/20 hover:border-blue-500/50 transition-all"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5 text-blue-400" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-blue-500/10 border border-blue-500/30 rounded-lg hover:bg-blue-500/20 hover:border-blue-500/50 transition-all"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5 text-blue-400" />
              </a>
            </div>
            <p className="text-sm text-gray-400">
              engineer@example.com
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
