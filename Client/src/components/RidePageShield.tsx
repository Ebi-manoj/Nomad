import { ShieldAlert } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export function FeatureAccessDenied() {
  const navigate = useNavigate();

  return (
    <div className="relative h-screen w-full flex justify-center items-center bg-gradient-to-br from-gray-50 via-white to-white overflow-hidden">
      {/* Background Blur Animation */}
      <motion.div
        className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1542382156909-9ae37b3f56fd?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1243')] bg-cover bg-center blur-[60px] opacity-70 "
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Glassmorphic Card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="relative z-10 backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl shadow-2xl p-10 text-center max-w-md mx-auto"
      >
        <div className="flex justify-center mb-6">
          <div className="bg-red-500/20 p-4 rounded-full">
            <ShieldAlert className="text-red-400" size={42} />
          </div>
        </div>

        <h2 className="text-2xl font-semibold text-black mb-3">
          Access Restricted
        </h2>

        <p className="text-gray-400 text-sm leading-relaxed mb-6">
          Ride features are currently unavailable for your account.
          <br />
          Please verify your documents to enable ride access.
        </p>

        <button
          onClick={() => navigate('/profile')}
          className="w-full bg-black cursor-pointer text-white font-medium py-3 rounded-xl hover:bg-gray-700 backdrop-blur-md transition-all duration-300"
        >
          Verify Now
        </button>
      </motion.div>
    </div>
  );
}
