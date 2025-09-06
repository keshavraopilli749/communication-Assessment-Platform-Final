import React from 'react';
import { motion } from 'motion/react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { ArrowLeft, Clock, Target, Users, Mic, PenTool, Headphones, Eye } from 'lucide-react';

const SectionList = ({ module, onSectionClick, onBack }) => {
  const moduleData = {
    speaking: {
      title: 'Speaking Skills Assessment',
      icon: Mic,
      color: 'from-orange-500 to-red-500',
      sections: [
        { id: 'self-intro', title: 'Self Introduction', questions: 5, duration: '10 min', description: 'Present yourself professionally' },
        { id: 'hr-questions', title: 'HR Questions', questions: 8, duration: '15 min', description: 'Common interview questions' },
        { id: 'group-discussion', title: 'Group Discussion', questions: 6, duration: '12 min', description: 'Collaborative communication' },
        { id: 'extempore', title: 'Extempore Speaking', questions: 4, duration: '8 min', description: 'Impromptu presentations' },
        { id: 'fluency-test', title: 'Fluency Test', questions: 10, duration: '20 min', description: 'Speech clarity and pace' }
      ]
    },
    writing: {
      title: 'Writing Skills Assessment',
      icon: PenTool,
      color: 'from-blue-500 to-cyan-500',
      sections: [
        { id: 'email-writing', title: 'Email Writing', questions: 6, duration: '15 min', description: 'Professional email composition' },
        { id: 'essay-writing', title: 'Essay Writing', questions: 4, duration: '25 min', description: 'Structured essay development' },
        { id: 'grammar-practice', title: 'Grammar Practice', questions: 12, duration: '10 min', description: 'Grammar rules and usage' },
        { id: 'vocabulary-exercise', title: 'Vocabulary Exercise', questions: 15, duration: '12 min', description: 'Word choice and usage' },
        { id: 'report-writing', title: 'Report Writing', questions: 5, duration: '20 min', description: 'Business report structure' }
      ]
    },
    listening: {
      title: 'Listening Skills Assessment',
      icon: Headphones,
      color: 'from-green-500 to-emerald-500',
      sections: [
        { id: 'audio-comprehension', title: 'Audio Comprehension', questions: 8, duration: '15 min', description: 'Understanding spoken content' },
        { id: 'fill-blanks', title: 'Fill in the Blanks', questions: 10, duration: '12 min', description: 'Listening for specific information' },
        { id: 'true-false', title: 'True/False Questions', questions: 12, duration: '10 min', description: 'Fact verification from audio' },
        { id: 'note-taking', title: 'Note Taking', questions: 6, duration: '18 min', description: 'Capturing key information' },
        { id: 'accent-recognition', title: 'Accent Recognition', questions: 8, duration: '14 min', description: 'Understanding different accents' }
      ]
    },
    nonverbal: {
      title: 'Non-Verbal Communication Assessment',
      icon: Eye,
      color: 'from-purple-500 to-pink-500',
      sections: [
        { id: 'eye-contact', title: 'Eye Contact', questions: 6, duration: '10 min', description: 'Maintaining appropriate eye contact' },
        { id: 'body-language', title: 'Body Language', questions: 8, duration: '15 min', description: 'Posture and gestures analysis' },
        { id: 'facial-expressions', title: 'Facial Expressions', questions: 7, duration: '12 min', description: 'Emotional communication' },
        { id: 'hand-gestures', title: 'Hand Gestures', questions: 9, duration: '14 min', description: 'Effective gesture usage' },
        { id: 'personal-space', title: 'Personal Space', questions: 5, duration: '8 min', description: 'Spatial awareness in communication' }
      ]
    }
  };

  const currentModule = moduleData[module?.id] || moduleData.speaking;
  const IconComponent = currentModule.icon;

  return (
    <div className="min-h-screen py-20 px-6 relative z-10">
      <div className="max-w-6xl mx-auto">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <Button
            onClick={onBack}
            variant="outline"
            className="backdrop-blur-sm bg-white/10 border-white/20 hover:bg-white/20"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Modules
          </Button>
        </motion.div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className={`w-20 h-20 mx-auto rounded-full bg-gradient-to-r ${currentModule.color} flex items-center justify-center shadow-lg mb-6`}>
            <IconComponent className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl mb-4">{currentModule.title}</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Choose a section to begin your assessment. Each section focuses on specific skills and provides detailed feedback.
          </p>
        </motion.div>

        {/* Sections Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentModule.sections.map((section, index) => (
            <motion.div
              key={section.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.6, 
                delay: index * 0.1,
                type: "spring",
                stiffness: 100
              }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="group cursor-pointer"
              onClick={() => onSectionClick(section)}
            >
              <Card className="h-full bg-white/10 backdrop-blur-sm border border-white/20 hover:border-white/40 transition-all duration-300 group-hover:shadow-2xl">
                <CardContent className="p-6 space-y-4">
                  {/* Section Header */}
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-xl mb-2 group-hover:text-white transition-colors">
                        {section.title}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {section.description}
                      </p>
                    </div>
                    <motion.div
                      className={`w-12 h-12 rounded-lg bg-gradient-to-r ${currentModule.color} flex items-center justify-center opacity-80 group-hover:opacity-100 transition-opacity`}
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      <Target className="w-6 h-6 text-white" />
                    </motion.div>
                  </div>

                  {/* Section Stats */}
                  <div className="grid grid-cols-2 gap-4 py-4 border-t border-white/10">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Users className="w-4 h-4" />
                      <span>{section.questions} Questions</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="w-4 h-4" />
                      <span>{section.duration}</span>
                    </div>
                  </div>

                  {/* Start Button */}
                  <motion.div
                    className={`w-full py-3 px-6 rounded-lg bg-gradient-to-r ${currentModule.color} text-white opacity-0 group-hover:opacity-100 transition-all duration-300 text-center`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Start Section
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Module Summary */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-16 bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-3xl mb-2 bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                {currentModule.sections.length}
              </div>
              <p className="text-muted-foreground">Total Sections</p>
            </div>
            <div>
              <div className="text-3xl mb-2 bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                {currentModule.sections.reduce((sum, section) => sum + section.questions, 0)}
              </div>
              <p className="text-muted-foreground">Total Questions</p>
            </div>
            <div>
              <div className="text-3xl mb-2 bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                ~{Math.ceil(currentModule.sections.reduce((sum, section) => sum + parseInt(section.duration), 0) / currentModule.sections.length)} min
              </div>
              <p className="text-muted-foreground">Avg. Duration</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SectionList;