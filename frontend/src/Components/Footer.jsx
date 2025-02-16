import React from 'react';
import { FiGithub, FiMail, FiLinkedin, FiCheck,FiHeart} from 'react-icons/fi';

const Footer = () => {
  return (
    <footer className="bg-black border-t border-gray-800">
      <div className="h-[1px] bg-gradient-to-r from-red-600/0 via-red-600 to-red-600/0"></div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-white to-red-500 bg-clip-text text-transparent">
              Data Odyssey
            </h2>
            <p className="text-gray-400">
              Where querying meets competition. Challenge yourself and rise through the ranks.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Developed By</h3>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
                <FiCheck className="text-red-500" />
                <span>Abdullah Edhi</span>
              </div>
              <div className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
                <FiCheck className="text-red-500" />
                <span>Taha Khan</span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Connect With Us</h3>
            <div className="flex flex-wrap gap-4">
              <a
                href="#"
                className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
              >
                <FiGithub className="text-xl" />
                <span>GitHub</span>
              </a>
              <a
                href="#"
                className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
              >
                <FiLinkedin className="text-xl" />
                <span>LinkedIn</span>
              </a>
              <a
                href="#"
                className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
              >
                <FiMail className="text-xl" />
                <span>Email</span>
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} Data Odyssey. All rights reserved.
            </p>
            <div className="flex items-center gap-2">
              <span className="text-gray-400 text-sm">Made with</span>
              <FiHeart className="text-red-500" />
              <span className="text-gray-400 text-sm">for ProCom'25</span>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-72 h-72 bg-red-600/10 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-red-600/10 rounded-full blur-3xl -z-10"></div>
    </footer>
  );
};

export default Footer;