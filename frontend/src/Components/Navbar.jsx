import React, { useState } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-black border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-red-500 bg-clip-text text-transparent">
              Data Something
            </h1>
          </div>

          <div className="hidden md:block">
            <h2 className="text-xl font-semibold text-white">
              ProCom<span className="text-red-600">'25</span>
            </h2>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-800 focus:outline-none"
            >
              {isMenuOpen ? (
                <FiX className="h-6 w-6" />
              ) : (
                <FiMenu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <div className="flex items-center justify-center py-2">
            <h2 className="text-xl font-semibold text-white">
              ProCom<span className="text-red-600">'25</span>
            </h2>
          </div>
        </div>
      </div>

      <div className="h-[1px] bg-gradient-to-r from-red-600/0 via-red-600 to-red-600/0"></div>
    </nav>
  );
};

export default Navbar;