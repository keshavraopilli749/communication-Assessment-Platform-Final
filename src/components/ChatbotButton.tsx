import React from 'react';
import { motion } from 'motion/react';
import { MessageCircle } from 'lucide-react';

const ChatbotButton = ({ isDark }) => {
  const handleChatClick = () => {
    alert('Chatbot coming soon: CommBot 🤖');
  };

  return (
    <motion.button
      onClick={handleChatClick}
      className={`fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full shadow-lg backdrop-blur-sm border-2 transition-all duration-300 ${
        isDark 
          ? 'bg-gradient-to-r from-cyan-500 to-blue-500 border-cyan-400/50 hover:shadow-cyan-500/25' 
          : 'bg-gradient-to-r from-purple-500 to-pink-500 border-purple-400/50 hover:shadow-purple-500/25'
      }`}
      whileHover={{ 
        scale: 1.1,
        boxShadow: isDark 
          ? '0 20px 40px rgba(34, 211, 238, 0.3)' 
          : '0 20px 40px rgba(168, 85, 247, 0.3)'
      }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, scale: 0, y: 100 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ 
        delay: 1, 
        type: "spring", 
        stiffness: 200, 
        damping: 15 
      }}
    >
      {/* Pulsing Ring */}
      <motion.div
        className={`absolute inset-0 rounded-full border-2 ${
          isDark ? 'border-cyan-400' : 'border-purple-400'
        }`}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.5, 0, 0.5]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      {/* Icon */}
      <motion.div
        animate={{ rotate: [0, 5, -5, 0] }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="flex items-center justify-center w-full h-full"
      >
        <MessageCircle className="w-8 h-8 text-white" />
      </motion.div>

      {/* Notification Dot */}
      <motion.div
        className={`absolute -top-1 -right-1 w-4 h-4 rounded-full ${
          isDark ? 'bg-cyan-400' : 'bg-purple-400'
        }`}
        animate={{
          scale: [1, 1.3, 1],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </motion.button>
  );
};

export default ChatbotButton;