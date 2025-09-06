import React from 'react';
import { motion } from 'motion/react';
import ModulesGrid from './ModulesGrid';

const ModulesPage = ({ onModuleClick }) => {
  return (
    <div className="min-h-screen pt-32 pb-20 px-6 relative z-10">
      <div className="max-w-7xl mx-auto">
        {/* Simple Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl mb-4">
            Communication Modules
          </h1>
          <p className="text-lg text-muted-foreground">
            Choose a module to start your assessment
          </p>
        </motion.div>

        {/* Modules Grid Only */}
        <ModulesGrid onModuleClick={onModuleClick} />
      </div>
    </div>
  );
};

export default ModulesPage;