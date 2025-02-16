import LeaderBoard from "../Pages/LeaderBoard";

const EndPage = () => {
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center px-4 py-8">
      <div className="max-w-7xl w-full text-center space-y-6">
        <h1 className="text-4xl font-bold text-red-600">Competition Ended 🚀</h1>
        <p className="text-lg text-gray-300">
          Thank you for participating! Check the leaderboard below.
        </p>
        
        <div className="mt-6 w-full max-w-4xl mx-auto">
          <LeaderBoard />
        </div>
      </div>
    </div>
  );
};

export default EndPage;
