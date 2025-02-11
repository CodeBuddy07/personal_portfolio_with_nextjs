import { motion } from "framer-motion";

export default function BlogSkeleton() {
  return (
    <motion.div
      initial={{ opacity: 0.5 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
      className="w-full max-w-3xl mx-auto p-6 bg-white dark:bg-gray-900 rounded-lg shadow-md min-h-screen"
    >
      <div className="animate-pulse">

        <div className="w-full h-60 bg-gray-300 dark:bg-gray-700 rounded-md mb-4"></div>


        <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded-md w-3/4 mb-3"></div>


        <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded-md w-1/3 mb-4"></div>

        <div className="space-y-2">
          <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded-md w-full"></div>
          <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded-md w-5/6"></div>
          <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded-md w-3/4"></div>
        </div>
      </div>
    </motion.div>
  );
}
