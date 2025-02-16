import { Link, useRouteError } from "react-router-dom";
import { motion } from "framer-motion";

const ErrorPage = () => {
  const error = useRouteError(); // Get error details (if available)

  return (
    <div className="h-screen flex flex-col justify-center items-center bg-gray-900 text-white text-center">
      <motion.h1
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="text-6xl font-bold text-red-500"
      >
        404
      </motion.h1>
      <p className="text-lg mt-2 text-gray-400">
        {error?.statusText || "Oops! Page not found."}
      </p>

      <Link
        to="/"
        className="mt-4 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition-all"
      >
        Go Home
      </Link>
    </div>
  );
};

export default ErrorPage;
