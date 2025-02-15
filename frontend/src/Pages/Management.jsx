import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FiCalendar, FiClock, FiEdit3 } from 'react-icons/fi';

const Management = () => {
    const [competitionName, setCompetitionName] = useState('Data Odyssey');
    const [competitionDate, setCompetitionDate] = useState('2025-02-19');
    const [startTime, setStartTime] = useState('09:00');
    const [endTime, setEndTime] = useState('12:00');
    const [secretKey, setKey] = useState('');
    const [error,setError] = useState('');
    
    useEffect(() => {
        const fetchTimings = async () => {
           try{
              const response = await axios.get(`/api/getCompetitionTimings`);
           //   console.log('request response' ,response.data);

              setCompetitionName(response.data.competitionName);
              setCompetitionDate(response.data.competitionDate);
              setStartTime(response.data.startTime);
              setEndTime(response.data.endTime);
           }   
           catch(err){

           }
        }
        fetchTimings()
    },[]);

    const handleSubmit = async(e) => {
        e.preventDefault();
        console.log('Competition Details:', {
            competitionName,
            competitionDate,
            startTime,
            endTime,secretKey
        });
        try{
            const response =await axios.post(`/api/updateTimings`,{competitionName,competitionDate,startTime,endTime,secretKey});
            if(!response.data.sucesss){
                setError(response.data.message)
            }
        }
        catch(err){
           
        }
    };

    return (
        <div className="min-h-screen bg-black flex items-center justify-center px-4">
            <div className="max-w-lg w-full bg-gray-900 p-6 rounded-2xl border border-gray-800">
                <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                    <FiEdit3 className="text-red-500" /> Set Competition Timings
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                     <div>
                        <label className="text-gray-400 block mb-1">Your secret key</label>
                        <input
                            type="password"
                            value={secretKey}
                            onChange={(e) =>{ setKey(e.target.value) ;setError('')}}
                            className="w-full p-2 bg-gray-800 text-white rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                        
                        />
                    </div>
                    <div>
                        <label className="text-gray-400 block mb-1">Competition Name</label>
                        <input
                            type="text"
                            value={competitionName}
                            onChange={(e) => {setCompetitionName(e.target.value)  ;setError('')}}
                            className="w-full p-2 bg-gray-600 text-white rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                            readOnly
                        />
                    </div>
                    <div>
                        <label className="text-gray-400 block mb-1">Competition Date</label>
                        <div className="flex items-center gap-2">
                            <FiCalendar className="text-red-500" />
                            <input
                                type="date"
                                value={competitionDate}
                                onChange={(e) => {setCompetitionDate(e.target.value)  ;setError('')}}
                                className="w-full p-2 bg-gray-600 text-white rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                                readOnly
                            />
                        </div>
                    </div>

                    <div>
                        <label className="text-gray-400 block mb-1">Start Time</label>
                        <div className="flex items-center gap-2">
                            <FiClock className="text-red-500" />
                            <input
                                type="time"
                                value={startTime}
                                onChange={(e) => {setStartTime(e.target.value)  ;setError('')}}
                                className="w-full p-2 bg-gray-800 text-white rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="text-gray-400 block mb-1">End Time</label>
                        <div className="flex items-center gap-2">
                            <FiClock className="text-red-500" />
                            <input
                                type="time"
                                value={endTime}
                                onChange={(e) => {setEndTime(e.target.value)  ;setError('')}}
                                className="w-full p-2 bg-gray-800 text-white rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                            />
                        </div>
                    </div>

                    <button type="submit" className="w-full bg-red-600 text-white p-2 rounded-lg font-semibold hover:bg-red-700 transition">
                        Save Competition Details
                    </button>
                    {error !== ''  && <p className='rounded-lg text-red-600 px-2 py-2 bg-white'>{error}</p>}
                </form>
            </div>
        </div>
    );
};

export default Management;
