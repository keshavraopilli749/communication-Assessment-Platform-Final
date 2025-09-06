import React from 'react';
import { motion } from 'motion/react';
import { Card, CardContent } from './ui/card';
import { Mic, PenTool, Headphones, Eye } from 'lucide-react';

const ModulesGrid = ({ onModuleClick }) => {
  const modules = [
    {
      id: 'speaking',
      title: 'Speaking Skills',
      subtitle: 'Verbal Communication & Fluency',
      icon: Mic,
      description: 'Practice interviews, presentations, and conversations',
      gradient: 'from-orange-500 to-red-500',
      bgColor: 'bg-orange-50 dark:bg-orange-900/20'
    },
    {
      id: 'writing',
      title: 'Writing Practice',
      subtitle: 'Written Communication & Grammar',
      icon: PenTool,
      description: 'Improve emails, essays, and professional writing',
      gradient: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20'
    },
    {
      id: 'listening',
      title: 'Listening Tests',
      subtitle: 'Comprehension & Analysis',
      icon: Headphones,
      description: 'Enhance understanding and interpretation skills',
      gradient: 'from-green-500 to-emerald-500',
      bgColor: 'bg-green-50 dark:bg-green-900/20'
    },
    {
      id: 'nonverbal',
      title: 'Non-Verbal Cues',
      subtitle: 'Body Language & Presence',
      icon: Eye,
      description: 'Master gestures, posture, and facial expressions',
      gradient: 'from-purple-500 to-pink-500',
      bgColor: 'bg-purple-50 dark:bg-purple-900/20'
    }
  ];

  return (
    <div id="modules" className="py-20 px-6 relative z-10">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl mb-6">
            Choose Your Learning Path
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Select a communication module to begin your assessment and receive personalized feedback
          </p>
        </motion.div>

        {/* Modules Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {modules.map((module, index) => {
            const IconComponent = module.icon;
            
            return (
              <motion.div
                key={module.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.6, 
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 100
                }}
                viewport={{ once: true }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="group cursor-pointer"
                onClick={() => onModuleClick(module)}
              >
                <Card className={`h-full ${module.bgColor} border-2 border-transparent hover:border-white/30 transition-all duration-300 backdrop-blur-sm`}>
                  <CardContent className="p-8 text-center space-y-6">
                    {/* Icon */}
                    <motion.div
                      className={`w-16 h-16 mx-auto rounded-full bg-gradient-to-r ${module.gradient} flex items-center justify-center shadow-lg`}
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ duration: 0.6 }}
                    >
                      <IconComponent className="w-8 h-8 text-white" />
                    </motion.div>

                    {/* Title */}
                    <div>
                      <h3 className="text-xl mb-2">{module.title}</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        {module.subtitle}
                      </p>
                    </div>

                    {/* Description */}
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {module.description}
                    </p>

                    {/* Start Button */}
                    <motion.div
                      className={`w-full py-3 px-6 rounded-lg bg-gradient-to-r ${module.gradient} text-white opacity-0 group-hover:opacity-100 transition-all duration-300`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Start Assessment
                    </motion.div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
        >
          {[
            { number: "10K+", label: "Students Trained" },
            { number: "95%", label: "Success Rate" },
            { number: "500+", label: "Practice Questions" },
            { number: "24/7", label: "AI Support" }
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6 + index * 0.1, type: "spring" }}
              viewport={{ once: true }}
              className="space-y-2"
            >
              <div className="text-3xl md:text-4xl bg-gradient-to-r from-purple-600 to-cyan-600 bg-clip-text text-transparent">
                {stat.number}
              </div>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default ModulesGrid;