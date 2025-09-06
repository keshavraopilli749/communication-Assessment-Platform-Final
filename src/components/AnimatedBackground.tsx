import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';

const AnimatedBackground = ({ isDark }) => {
  const [currentQuote, setCurrentQuote] = useState(0);

  const quotes = [
    "Communication is the key to success in every interview.",
    "Confidence starts with clear and effective communication.",
    "Master your words, master your future.",
    "Every great conversation begins with preparation.",
    "Your voice is your most powerful tool."
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % quotes.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [quotes.length]);

  const lightGradient = "from-violet-200 via-pink-200 to-blue-200";
  const darkGradient = "from-violet-900 via-purple-800 to-indigo-900";

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Animated Gradient Background */}
      <motion.div
        className={`absolute inset-0 bg-gradient-to-br ${isDark ? darkGradient : lightGradient}`}
        animate={{
          background: isDark 
            ? [
                "linear-gradient(45deg, #581c87, #7c3aed, #3730a3)",
                "linear-gradient(45deg, #7c3aed, #3730a3, #581c87)",
                "linear-gradient(45deg, #3730a3, #581c87, #7c3aed)"
              ]
            : [
                "linear-gradient(45deg, #ddd6fe, #fce7f3, #dbeafe)",
                "linear-gradient(45deg, #fce7f3, #dbeafe, #ddd6fe)",
                "linear-gradient(45deg, #dbeafe, #ddd6fe, #fce7f3)"
              ]
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "linear"
        }}
      />

      {/* Floating Orbs */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className={`absolute rounded-full blur-xl ${
            isDark 
              ? 'bg-gradient-to-r from-cyan-400/20 to-purple-400/20' 
              : 'bg-gradient-to-r from-purple-300/30 to-pink-300/30'
          }`}
          style={{
            width: `${Math.random() * 200 + 100}px`,
            height: `${Math.random() * 200 + 100}px`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            x: [0, Math.random() * 100 - 50, 0],
            y: [0, Math.random() * 100 - 50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: Math.random() * 10 + 15,
            repeat: Infinity,
            ease: "easeInOut",
            delay: Math.random() * 5,
          }}
        />
      ))}

      {/* Motivational Quotes */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-center z-10">
        <motion.div
          key={currentQuote}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="max-w-2xl mx-auto px-6"
        >
          <p className={`text-lg italic ${
            isDark ? 'text-white/80' : 'text-gray-700'
          }`}>
            "{quotes[currentQuote]}"
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default AnimatedBackground;