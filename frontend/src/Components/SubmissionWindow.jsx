import React, { useEffect, useState } from 'react';
import { FiClock, FiFileText, FiFlag, FiAlertCircle } from 'react-icons/fi';
import { useUserContext } from '../Contexts/userContext';

const SubmissionWindow = ({ query,dialect, toggleWindow }) => {

  const [status,setStatus] = useState('submitting');
  const {user,socket} = useUserContext();

  const statusChanger =  (queryStatus) => {
    if(queryStatus.email === user.email && queryStatus.status !== status){
      setStatus(prev => queryStatus.status);
    }
  }

  useEffect(()=>{
    socket.on('fileStatusUpdated',statusChanger)
  },[])
        
    return (
    <div className="fixed top-0 right-0 h-screen w-80 bg-gray-900 border-l border-gray-800 shadow-xl overflow-y-auto">
      <div className="p-6 border-b border-gray-800">
        <div className='flex flex-wrap-reverse justify-between'>
          <h2 className="text-xl font-bold text-white mb-2">Submission Details</h2>
          <button onClick={toggleWindow} className='mb-2 hover:text-red-500'>✖</button>
        </div>
        <p className="text-sm text-gray-400">Status: Pending Evaluation</p>
      </div>

      <div className="p-6 space-y-6">
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <FiFileText className="text-red-500 mt-1" />
            <div>
              <p className="text-sm text-gray-400">Team Name</p>
              <p className="text-white font-medium">{user.teamName}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <FiFlag className="text-red-500 mt-1" />
            <div>
              <p className="text-sm text-gray-400">Query </p>
              <p className="text-white font-medium">{query.title} | {user.level} | {dialect}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <FiAlertCircle className="text-red-500 mt-1" />
            <div>
              <p className="text-sm text-gray-400">Query Difficulty</p>
              <p className={`font-medium ${
                query.difficulty === 'Hard' ? 'text-red-500' :
                query.difficulty === 'Easy' ? 'text-green-500' :
                'text-yellow-500'
              }`}>
                {query.difficulty}
              </p>
            </div>
          </div>

         
        </div>

        <div className="bg-gray-800 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-3">
            <FiClock className="text-red-500" />
            <p className="text-sm text-gray-400">Submission Status</p>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className={`w-3 h-3 ${(status === 'submitting' ||status === 'submitted' || status === 'accepted') ? 'bg-green-500' : ( status === 'pending' ? 'bg-orange-500/90' : 'bg-red-500')} rounded-full`}></div>
              <p className="text-sm text-white">{status}</p>
            </div>
            {/* <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-yellow-500 rounded-full animate-pulse"></div>
              <p className="text-sm text-white">Running Tests</p>
            </div> */}
            {/* <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-gray-600 rounded-full"></div>
              <p className="text-sm text-gray-400">Evaluation Pending</p>
            </div> */}
          </div>
        </div>
        { (status !== 'accepted' && status !== 'rejected') &&      
        <div className="flex justify-center">
          <div className="w-8 h-8 border-4 border-red-500 border-t-transparent rounded-full animate-spin"></div>
        </div>}
      </div>

      <div className="absolute bottom-0 right-0 w-64 h-64 bg-red-600/10 rounded-full blur-3xl -z-10"></div>
    </div>
  );
};

export default SubmissionWindow;