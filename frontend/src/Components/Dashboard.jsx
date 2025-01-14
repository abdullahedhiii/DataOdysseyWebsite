import React from 'react';
import { FiX, FiClock, FiCheckCircle, FiXCircle, FiLoader } from 'react-icons/fi';
import { useUserContext } from '../Contexts/userContext';

const Dashboard = ({onClose}) => {
  const {user} = useUserContext();
  const dummySubmissions = [
    {
      id: 1,
      queryTitle: "Complex Join Operations",
      difficulty: "Hard",
      status: "Accepted",
      submittedAt: "2024-01-14T14:30:00"
    },
    {
      id: 2,
      queryTitle: "Data Aggregation Query",
      difficulty: "Medium",
      status: "Wrong Answer",
      submittedAt: "2024-01-14T14:15:00"
    },
    {
      id: 3,
      queryTitle: "Basic Select Query",
      difficulty: "Easy",
      status: "Wrong Answer",
      submittedAt: "2024-01-14T14:00:00"
    }
  ];

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Accepted':
        return <FiCheckCircle className="text-green-500" />;
      case 'Wrong Answer':
        return <FiXCircle className="text-red-500" />;
      default:
        return null;
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Hard':
        return 'text-red-500 bg-red-500/10';
      case 'Medium':
        return 'text-yellow-500 bg-yellow-500/10';
      case 'Easy':
        return 'text-green-500 bg-green-500/10';
      default:
        return 'text-gray-500 bg-gray-500/10';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };


  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-gray-900 rounded-xl border border-gray-800 w-full max-w-3xl max-h-[80vh] overflow-hidden">
        <div className="p-6 border-b border-gray-800 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white">{user.teamName}'s submissions</h2>
            <p className="text-gray-400 text-sm mt-1">Track your team's progress and submission history</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <FiX className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(80vh-100px)]">
          <div className="space-y-4">
            { dummySubmissions.map((submission) => (
              <div
                key={submission.id}
                className="bg-gray-800/50 rounded-lg p-4 hover:bg-gray-800 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <h3 className="text-white font-medium">{submission.queryTitle}</h3>
                    <div className="flex items-center gap-4">
                      <span className={`text-sm px-2 py-1 rounded-full ${getDifficultyColor(submission.difficulty)}`}>
                        {submission.difficulty}
                      </span>
                      <div className="flex items-center gap-2 text-sm text-gray-400">
                        <FiClock className="w-4 h-4" />
                        {formatDate(submission.submittedAt)}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {getStatusIcon(submission.status)}
                    <span className={`text-sm font-medium ${
                      submission.status === 'Accepted' ? 'text-green-500' :
                      submission.status === 'Wrong Answer' ? 'text-red-500' :
                      'text-yellow-500'
                    }`}>
                      {submission.status}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {dummySubmissions.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-400">No submissions yet</p>
            </div>
          )}
        </div>

        <div className="p-6 border-t border-gray-800 bg-gray-900/50">
          <div className="flex justify-between items-center text-sm text-gray-400">
            <p>Total Submissions: {(dummySubmissions.length)}</p>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-md transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>

      <div className="fixed top-0 right-0 w-96 h-96 bg-red-600/10 rounded-full blur-3xl -z-10"></div>
      <div className="fixed bottom-0 left-0 w-96 h-96 bg-red-600/10 rounded-full blur-3xl -z-10"></div>
    </div>
  );
};

export default Dashboard;