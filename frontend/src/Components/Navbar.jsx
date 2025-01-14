import React, { useState } from 'react';
import { FiMenu, FiX, FiLogOut, FiAward } from 'react-icons/fi';
import { useUserContext } from '../Contexts/userContext';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
 // const [isLeaderboardOpen,setOpen] = useState(false);
  const { user, logUserOut } = useUserContext();

  return (
    <nav className="bg-black border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-red-500 bg-clip-text text-transparent">
              Data Odyssey
            </h1>
          </div>

          <div className="hidden md:flex justify-center flex-1">
            {user.loggedIn && (
              <a
                href="/leaderboard"
                target='_blank'
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white hover:text-red-500 transition-colors"
                onClick={() => setOpen(true)}
              >
                <FiAward className="h-4 w-4" />
                Leaderboard
              </a>
            )}
          </div>

          <div className="hidden md:flex items-center gap-6">
            <h2 className="text-xl font-semibold text-white">
              ProCom<span className="text-red-600">'25</span>
            </h2>
            {user.loggedIn && (
              <button
                onClick={logUserOut}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 transition-colors"
              >
                <FiLogOut className="h-4 w-4" />
                Logout
              </button>
            )}
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
          <div className="flex flex-col items-center gap-4 py-2">
            <h2 className="text-xl font-semibold text-white">
              ProCom<span className="text-red-600">'25</span>
            </h2>
            {user.loggedIn && (
              <>
                <a
                  href="/leaderboard"
                  target='_blank'
                  className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white hover:text-red-500 transition-colors w-full justify-center"
                >
                  <FiAward className="h-4 w-4" />
                  Leaderboard
                </a>
                <button
                  onClick={logUserOut}
                  className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 transition-colors w-full justify-center"
                >
                  <FiLogOut className="h-4 w-4" />
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="h-[1px] bg-gradient-to-r from-red-600/0 via-red-600 to-red-600/0"></div>
    </nav>
  );
};

export default Navbar;
