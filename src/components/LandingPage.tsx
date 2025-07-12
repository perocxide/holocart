import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-200 via-yellow-100 to-white text-black flex flex-col items-center justify-center font-sans">
      <motion.div
        className="text-center w-4/5 max-w-3xl"
        initial={{ opacity: 0, y: 0 }}
        animate={{ opacity: 1, y: -50 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-6xl font-extrabold mb-4 tracking-wide">Welcome to HoloCart</h1>
      </motion.div>

      <motion.div
        className="text-center w-4/5 max-w-3xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <p className="text-xl leading-relaxed mb-8">
          Real-time collaborative shopping for teams, families, and groups. HoloCart enables multiple users to shop together seamlessly, track budgets, and manage group activities in real-time.
        </p>
      </motion.div>

      <motion.div
        className="text-center w-4/5 max-w-3xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 1 }}
      >
        <ul className="list-disc list-inside text-left space-y-4 text-lg">
          <motion.li whileHover={{ scale: 1.1 }} className="leading-8">Seamless real-time collaboration for group shopping</motion.li>
          <motion.li whileHover={{ scale: 1.1 }} className="leading-8">Advanced budget tracking and cost management</motion.li>
        </ul>
      </motion.div>

      <motion.div
        className="text-center w-4/5 max-w-3xl mt-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 1.5 }}
      >
        <button
          onClick={() => navigate('/dashboard')}
          className="bg-blue-100 hover:bg-blue-200 text-black px-6 py-3 rounded-lg text-lg font-medium shadow-lg transition-transform transform hover:scale-105"
        >
          Explore HoloCart
        </button>
      </motion.div>
    </div>
  );
};

export default LandingPage;
