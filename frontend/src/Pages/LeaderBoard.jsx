import React, { useState, useEffect } from "react";
import { FiAward, FiTrendingUp, FiClock, FiCheck, FiX } from "react-icons/fi";

const LeaderBoard = () => {
  const leaderboardData = [
    {
      rank: 1,
      username: "CodeMaster",
      score: 800,
      problems: { A: true, B: true, C: true, D: true, E: true, F: true, G: true, H: true },
      totalTime: "2:45:30",
    },
    {
      rank: 2,
      username: "ByteWarrior",
      score: 700,
      problems: { A: true, B: true, C: true, D: true, E: true, F: true, G: false, H: false },
      totalTime: "3:15:20",
    },
    {
      rank: 3,
      username: "AlgoNinja",
      score: 600,
      problems: { A: true, B: true, C: true, D: true, E: true, F: false, G: false, H: false },
      totalTime: "3:30:45",
    },
    {
      rank: 4,
      username: "DataWizard",
      score: 500,
      problems: { A: true, B: true, C: true, D: true, E: false, F: false, G: false, H: false },
      totalTime: "3:45:15",
    },
    {
      rank: 5,
      username: "BinaryBoss",
      score: 400,
      problems: { A: true, B: true, C: true, D: false, E: false, F: false, G: false, H: false },
      totalTime: "4:00:00",
    },
  ];

  const [timeRemaining, setTimeRemaining] = useState(2 * 60 * 60 + 45 * 60 + 30); 

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining((prevTime) => Math.max(prevTime - 1, 0));
    }, 1000);

    return () => clearInterval(timer); 
  }, []);

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="min-h-screen bg-black px-4 py-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white to-red-500 bg-clip-text text-transparent mb-4">
            Leaderboard
          </h1>
          <p className="text-gray-400 text-lg">
            Track the competition and see who's leading the pack
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
            <div className="flex items-center gap-4">
              <FiAward className="text-red-500 text-3xl" />
              <div>
                <p className="text-gray-400">Total Queries to solve</p>
                <p className="text-2xl font-bold text-white">8</p>
              </div>
            </div>
          </div>
          <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
            <div className="flex items-center gap-4">
              <FiTrendingUp className="text-red-500 text-3xl" />
              <div>
                <p className="text-gray-400">Dialects supported</p>
                <p className="text-2xl font-bold text-white">Oracle,MySQL,Postgres</p>
              </div>
            </div>
          </div>
          <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
            <div className="flex items-center gap-4">
              <FiClock className="text-red-500 text-3xl" />
              <div>
                <p className="text-gray-400">Time Remaining</p>
                <p className="text-2xl font-bold text-white">{formatTime(timeRemaining)}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-900 rounded-xl border border-gray-800 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-800">
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-400">Rank</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-400">Username</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-gray-400">Problems</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-gray-400">Score</th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-gray-400">Time</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {leaderboardData.map((player) => (
                  <tr key={player.rank} className="hover:bg-gray-800/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        {player.rank <= 3 && (
                          <FiAward
                            className={`${
                              player.rank === 1
                                ? "text-yellow-500"
                                : player.rank === 2
                                ? "text-gray-400"
                                : "text-yellow-700"
                            }`}
                          />
                        )}
                        <span className="text-white font-medium">#{player.rank}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-white font-medium">{player.username}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex justify-center gap-2">
                        {Object.entries(player.problems).map(([problem, solved]) => (
                          <div
                            key={problem}
                            className={`w-8 h-8 rounded-md flex items-center justify-center ${
                              solved ? "bg-green-500/20 text-green-500" : "bg-red-500/20 text-red-500"
                            }`}
                          >
                            {solved ? <FiCheck /> : <FiX />}
                          </div>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="text-white font-medium">{player.score}</span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <span className="text-gray-400">{player.totalTime}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="fixed top-0 right-0 w-96 h-96 bg-red-600/10 rounded-full blur-3xl -z-10"></div>
      <div className="fixed bottom-0 left-0 w-96 h-96 bg-red-600/10 rounded-full blur-3xl -z-10"></div>
    </div>
  );
};

export default LeaderBoard;
