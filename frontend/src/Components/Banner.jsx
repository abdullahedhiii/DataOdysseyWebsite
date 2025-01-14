import React, { useState, useEffect } from 'react';
import { FiCalendar, FiClock, FiUsers, FiAward, FiAlertCircle } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const Banner = ({ competitionDate = "2024-02-21T09:00:00" }) => {
    const navigate = useNavigate();
    const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = new Date(competitionDate) - new Date();
      
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      }
    };

    const timer = setInterval(calculateTimeLeft, 1000);
    calculateTimeLeft();

    return () => clearInterval(timer);
  }, [competitionDate]);

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="max-w-4xl w-full space-y-8">
        <div className="bg-red-600/10 border border-red-600/20 rounded-lg p-4 flex items-center gap-3">
          <FiAlertCircle className="text-red-500 flex-shrink-0" />
          <p className="text-red-500 text-sm">
            No active competition at the moment. Please wait for the upcoming event.
          </p>
        </div>

        <div className="bg-gray-900 rounded-2xl border border-gray-800 overflow-hidden">
          <div className="bg-gradient-to-r from-red-600/10 via-red-600/5 to-transparent p-6 border-b border-gray-800">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
              ProCom'25 - Data Odyssey
            </h1>
            <p className="text-gray-400">
              Get ready for the ultimate SQL competition
            </p>
          </div>

          <div className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-red-600/10 flex items-center justify-center">
                  <FiCalendar className="text-red-500 text-xl" />
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Competition Date</p>
                  <p className="text-white font-medium">
                    {new Date(competitionDate).toLocaleDateString('en-US', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-red-600/10 flex items-center justify-center">
                  <FiClock className="text-red-500 text-xl" />
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Start Time</p>
                  <p className="text-white font-medium">
                    {new Date(competitionDate).toLocaleTimeString('en-US', {
                      hour: '2-digit',
                      minute: '2-digit',
                      hour12: true
                    })}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gray-800/50 rounded-xl p-6">
              <h2 className="text-white font-semibold mb-4 flex items-center gap-2">
                <FiAward className="text-red-500" />
                Competition Starts In
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-gray-900 rounded-lg p-4 text-center">
                  <p className="text-3xl font-bold text-white mb-1">{timeLeft.days}</p>
                  <p className="text-gray-400 text-sm">Days</p>
                </div>
                <div className="bg-gray-900 rounded-lg p-4 text-center">
                  <p className="text-3xl font-bold text-white mb-1">{timeLeft.hours}</p>
                  <p className="text-gray-400 text-sm">Hours</p>
                </div>
                <div className="bg-gray-900 rounded-lg p-4 text-center">
                  <p className="text-3xl font-bold text-white mb-1">{timeLeft.minutes}</p>
                  <p className="text-gray-400 text-sm">Minutes</p>
                </div>
                <div className="bg-gray-900 rounded-lg p-4 text-center">
                  <p className="text-3xl font-bold text-white mb-1">{timeLeft.seconds}</p>
                  <p className="text-gray-400 text-sm">Seconds</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-red-600/10 flex items-center justify-center">
                  <FiUsers className="text-red-500 text-xl" />
                </div>
                <div>
                  <p className="text-white font-medium">Team Registration</p>
                  <p className="text-gray-400 text-sm">2-3 members per team</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-red-600/10 flex items-center justify-center">
                  <FiAward className="text-red-500 text-xl" />
                </div>
                <div>
                  <p className="text-white font-medium">Prize Pool</p>
                  <p className="text-gray-400 text-sm">Exciting prizes for top teams</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        
      </div>

      <div className="fixed top-0 right-0 w-96 h-96 bg-red-600/10 rounded-full blur-3xl -z-10"></div>
      <div className="fixed bottom-0 left-0 w-96 h-96 bg-red-600/10 rounded-full blur-3xl -z-10"></div>
    </div>
  );
};

export default Banner;