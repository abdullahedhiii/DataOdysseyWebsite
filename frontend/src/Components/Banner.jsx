import React, { useState, useEffect } from 'react';
import { FiCalendar, FiClock, FiUsers, FiAward } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { io } from 'socket.io-client';
import axios from 'axios';
const socket = io("http://localhost:8800");

const Banner = () => {
    const navigate = useNavigate();
    const [competitionDetails, setCompetitionDetails] = useState({
        competitionName: "ProCom'25 - Data Odyssey",
        competitionDate: "2025-02-19T09:00:00",
        startTime: "09:00 AM",
        endTime: "12:00 PM"
    });
    const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
    
    const formatTime = (timeString) => {
        const [hours, minutes] = timeString.split(':');
        const h = parseInt(hours, 10);
        const suffix = h >= 12 ? 'PM' : 'AM';
        const formattedHours = h % 12 || 12; // Convert 24-hour to 12-hour format
        return `${formattedHours}:${minutes} ${suffix}`;
    };


    useEffect(() => {
      const fetchTimings = async () => {
         try{
            const response = await axios.get(`/api/getCompetitionTimings`);
            const data = response.data;
            console.log('bannerr ',response.data);
            const formattedDate = `${data.competitionDate.split('T')[0]}T${data.startTime}`;
            const formattedStart =formatTime(response.data.startTime);
            const formattedEnd = formatTime(response.data.endTime);
            setCompetitionDetails({
                ...data,
                startTime : formattedStart,
                endTime : formattedEnd,
                competitionDate: formattedDate
            });
         }   
         catch(err){

         }
      }
      fetchTimings()
  },[]);

    useEffect(() => {
      socket.on("competitionTimingsUpdated", (data) => {
          console.log("Updated competition timings received:", data);
            const formattedDate = `${data.competitionDate}T${data.startTime}`;
  
          setCompetitionDetails({
              ...data,
              competitionDate: formattedDate
          });
      });
  
      return () => {
          socket.off("competitionTimingsUpdated");
      };
  }, []);
  

    useEffect(() => {
        const calculateTimeLeft = () => {
            const difference = new Date(competitionDetails.competitionDate) - new Date();
            if (difference <= 0) {
                clearInterval(timer);
                navigate('/competition');
            } else {
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
    }, [competitionDetails.competitionDate, navigate]);

    return (
        <div className="min-h-screen bg-black flex items-center justify-center px-4">
            <div className="max-w-4xl w-full space-y-8">
                <div className="bg-gray-900 rounded-2xl border border-gray-800 overflow-hidden">
                    <div className="bg-gradient-to-r from-red-600/10 via-red-600/5 to-transparent p-6 border-b border-gray-800">
                        <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                            {competitionDetails.competitionName}
                        </h1>
                        <p className="text-gray-400">Get ready for the ultimate SQL competition</p>
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
                                        {new Date(competitionDetails.competitionDate).toLocaleDateString('en-US', {
                                            weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
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
                                    <p className="text-white font-medium">{competitionDetails.startTime}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-lg bg-red-600/10 flex items-center justify-center">
                                    <FiClock className="text-red-500 text-xl" />
                                </div>
                                <div>
                                    <p className="text-gray-400 text-sm">End Time</p>
                                    <p className="text-white font-medium">{competitionDetails.endTime}</p>
                                </div>
                            </div>
                        </div>
                        <div className="bg-gray-800/50 rounded-xl p-6">
                            <h2 className="text-white font-semibold mb-4 flex items-center gap-2">
                                <FiAward className="text-red-500" />
                                Competition Starts In
                            </h2>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {Object.entries(timeLeft).map(([unit, value]) => (
                                    <div key={unit} className="bg-gray-900 rounded-lg p-4 text-center">
                                        <p className="text-3xl font-bold text-white mb-1">{value}</p>
                                        <p className="text-gray-400 text-sm">{unit.charAt(0).toUpperCase() + unit.slice(1)}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Banner;