import React from 'react';
import { FiArrowRight, FiLock, FiAward, FiTrendingUp, FiUsers } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
    const navigate = useNavigate();

    return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          <div className="flex-1 text-white">
            <h1 className="text-5xl lg:text-7xl font-bold mb-6">
              Level Up Your <span className="text-red-600">Data Retrieval</span> Skills
            </h1>
            <p className="text-gray-400 text-lg mb-8 max-w-xl">
              Join the ultimate SQL competition and sharpen your database query skills.
              Experience intense battles, unlock achievements, and rise through the leaderboard.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              <div className="flex items-center gap-3">
                <FiAward className="text-red-600 text-2xl" />
                <span className="text-lg">Competitive Queries</span>
              </div>
              <div className="flex items-center gap-3">
                <FiTrendingUp className="text-red-600 text-2xl" />
                <span className="text-lg">Climb the Leaderboard</span>
              </div>
              <div className="flex items-center gap-3">
                <FiLock className="text-red-600 text-2xl" />
                <span className="text-lg">Multiple SQL dialects</span>
              </div>
              <div className="flex items-center gap-3">
                <FiUsers className="text-red-600 text-2xl" />
                <span className="text-lg">Compete with Top Players</span>
              </div>
            </div>

          </div>

          <div className="flex-1">
            <div className="relative">
              <div className="w-full h-[500px] bg-gradient-to-br from-red-600/20 to-transparent rounded-lg overflow-hidden">
                <img 
                  src="/images/main.png" 
                  alt="SQL Competition"
                  className="w-full h-full object-cover mix-blend-overlay"
                />
              </div>
              <div className="absolute -top-4 -right-4 w-72 h-72 bg-red-600/10 rounded-full blur-3xl -z-10"></div>
              <div className="absolute -bottom-4 -left-4 w-72 h-72 bg-red-600/10 rounded-full blur-3xl -z-10"></div>
            </div>
          </div>
        </div>

        <div className="mt-16 text-center">
          <h2 className="text-4xl font-semibold text-white mb-6">Why Join the Competition?</h2>
          <p className="text-lg text-gray-400 mb-8 max-w-3xl mx-auto">
            Whether you're a beginner or an expert, this SQL competition is designed to improve your skills in solving real-world database problems. Compete against the best and climb the leaderboard to earn recognition in the tech community.
          </p>
          <div className="flex justify-center gap-8">
            <button className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
             onClick={() => navigate("/login")}
            >
              Start Competing
            </button>
            <button className="px-6 py-3 border border-red-600 text-red-600 rounded-lg hover:bg-red-600/10 transition-colors"
             onClick={() => window.open("/documents/Rules.pdf", "_blank")}
            >
              Read the Rules
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
