import React, { useState, useEffect } from "react";
import { FiAward, FiTrendingUp, FiClock, FiTarget } from "react-icons/fi";
import { useUserContext } from "../Contexts/userContext";
import axios from "axios";

const LeaderBoard = () => {
  const {user} = useUserContext();
  const tempLeaderboardData = [
    {
      team_id : 10100,
      teamName: "SQL Masters",
      currentLevel: 5,
      queriesSolved: {
        hard: 3,
        medium: 4,
        easy: 2
      },
      submissions: 11,
      totalScore: 800
    },
    {
      team_id:10101,
      teamName: "Query Questers",
      currentLevel: 4,
      queriesSolved: {
        hard: 2,
        medium: 4,
        easy: 2
      },
      submissions:10,
      totalScore: 650
    },
    {
      team_id:10102,
      teamName: "Data Dragons",
      currentLevel: 3,
      queriesSolved: {
        hard: 2,
        medium: 3,
        easy: 2
      },
      submissions:7,
      totalScore: 550
    },
    {
      team_id : 10103,
      teamName: "Schema Slayers",
      currentLevel: 3,
      queriesSolved: {
        hard: 1,
        medium: 3,
        easy: 2
      },
      submissions:9,
      totalScore: 400
    },
    {
      team_id : 10104,
      teamName: "Table Titans",
      currentLevel: 2,
      queriesSolved: {
        hard: 1,
        medium: 2,
        easy: 2
      },
      submissions:14,
      totalScore: 350
    },
  ];

  const [timeRemaining, setTimeRemaining] = useState(2 * 60 * 60 + 45 * 60 + 30); 
  const [leaderboardData,setLeaderBoardData] = useState([]);
  
  const fetchStats = () => {    
    axios
    .get('/api/leaderboardData',{withCredentials:true})
    .then(res=>{
      setLeaderBoardData(res.data.teamData);
    })
    .catch(err=>{
      console.error(err.message);
    })
   }

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining((prevTime) => Math.max(prevTime - 1, 0));
    }, 1000);

    fetchStats();

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
              <FiTarget className="text-red-500 text-3xl" />
              <div>
                <p className="text-gray-400">Levels to cross</p>
                <p className="text-2xl font-bold text-white">8</p>
              </div>
            </div>
          </div>
          <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
            <div className="flex items-center gap-4">
              <FiTrendingUp className="text-red-500 text-3xl" />
              <div>
                <p className="text-gray-400">Total Teams</p>
                <p className="text-2xl font-bold text-white">{leaderboardData.length}</p>
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
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-400">Team Name</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-gray-400">Level</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-red-400">Hard</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-yellow-400">Medium</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-green-400">Easy</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-gray-400">Submissions</th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-gray-400">Total Score</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {leaderboardData.length && leaderboardData.map((team,index) => {                  
                  const isUserTeam = team.team_id === user?.team_id;
                  return (
                    <tr
                      key={(index+1)}
                      className={`hover:bg-gray-800/50 transition-colors ${
                        isUserTeam ? "bg-red-600" : ""
                      }`} // Apply highlight color if team matches user's team_id
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          {(index+1) <= 3 && (
                            <FiAward
                              className={`${
                                (index+1) === 1
                                  ? "text-yellow-500"
                                  : (index+1) === 2
                                  ? "text-gray-400"
                                  : "text-yellow-700"
                              }`}
                            />
                          )}
                          <span className="text-white font-medium">#{(index+1)}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-white font-medium">{team.teamName}</span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className="text-white font-medium">{team.currentLevel}</span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className="text-red-400 font-medium">{team.queriesSolved.Hard}</span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className="text-yellow-400 font-medium">{team.queriesSolved.Medium}</span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className="text-green-400 font-medium">{team.queriesSolved.Easy}</span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className="text-white font-medium">{team.submissions}</span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <span className="text-white font-medium">{team.totalScore}</span>
                      </td>
                    </tr>
                  );
                })}
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