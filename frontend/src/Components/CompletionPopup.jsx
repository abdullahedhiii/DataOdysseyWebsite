import { motion } from "framer-motion";
import { FiCheckCircle } from "react-icons/fi";
import { useEffect } from "react";

const CompletionPopup = ({ onClose }) => {
  // Prevent scrolling when popup is open
  useEffect(() => {
    document.body.classList.add("overflow-hidden");
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, []);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        className="bg-gray-900 border border-gray-700 rounded-xl p-6 shadow-xl text-white w-96 text-center"
      >
        <FiCheckCircle className="text-green-400 text-5xl mx-auto mb-3" />

        <h2 className="text-xl font-semibold">Congratulations! 🎉</h2>
        <p className="text-gray-300 mt-2">
          You completed all the levels! Check out the leaderboard now!
        </p>

        <button
          onClick={onClose}
          className="mt-4 px-4 py-2 bg-green-500 hover:bg-green-600 text-black font-semibold rounded-lg transition-all"
        >
          OK
        </button>
      </motion.div>
    </div>
  );
};

export default CompletionPopup;
