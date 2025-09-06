import React from 'react';
import { motion } from 'motion/react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { ArrowLeft, Clock, Target, AlertCircle, CheckCircle, HelpCircle } from 'lucide-react';

const RulesPage = ({ module, section, onContinue, onBack }) => {
  const getRulesData = () => {
    const baseRules = {
      timeLimit: section?.duration || '15 min',
      totalQuestions: section?.questions || 5,
      sectionTitle: section?.title || 'Assessment Section',
      maxMarks: (section?.questions || 5) * 10
    };

    const moduleSpecificRules = {
      speaking: {
        guidelines: [
          'Speak clearly and at a moderate pace',
          'Maintain good posture and eye contact with the camera',
          'Avoid filler words like "um", "uh", "like"',
          'Take a moment to think before responding',
          'Keep your responses within the given time limit'
        ],
        tips: [
          'Test your microphone before starting',
          'Choose a quiet environment',
          'Practice speaking for 30-60 seconds on various topics',
          'Focus on fluency over perfection'
        ]
      },
      writing: {
        guidelines: [
          'Write in clear, complete sentences',
          'Use proper grammar and punctuation',
          'Organize your thoughts logically',
          'Stay within the word limit for each question',
          'Proofread your responses before submitting'
        ],
        tips: [
          'Plan your response structure before writing',
          'Use varied sentence structures',
          'Check for spelling and grammar errors',
          'Ensure your writing is professional and appropriate'
        ]
      },
      listening: {
        guidelines: [
          'Listen carefully to the entire audio clip',
          'You can replay audio clips up to 2 times',
          'Take notes while listening if needed',
          'Answer based only on what you hear',
          'Pay attention to tone and context'
        ],
        tips: [
          'Use good quality headphones or speakers',
          'Minimize background noise',
          'Focus on key information and main ideas',
          'Practice active listening techniques'
        ]
      },
      nonverbal: {
        guidelines: [
          'Observe video clips carefully',
          'Pay attention to body language, gestures, and facial expressions',
          'Consider the context of the interaction',
          'Answer based on visual cues only',
          'Note the relationship between verbal and non-verbal communication'
        ],
        tips: [
          'Watch for micro-expressions and subtle cues',
          'Consider cultural context in non-verbal communication',
          'Focus on overall body language patterns',
          'Practice observing non-verbal cues in daily interactions'
        ]
      }
    };

    return {
      ...baseRules,
      ...moduleSpecificRules[module?.id] || moduleSpecificRules.speaking
    };
  };

  const rulesData = getRulesData();

  return (
    <div className="min-h-screen py-20 px-6 relative z-10">
      <div className="max-w-4xl mx-auto">
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
            Back to Sections
          </Button>
        </motion.div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl mb-4">{rulesData.sectionTitle}</h1>
          <p className="text-xl text-muted-foreground">
            Please read the rules and guidelines carefully before starting your assessment
          </p>
        </motion.div>

        {/* Assessment Overview */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
        >
          <Card className="bg-white/10 backdrop-blur-sm border border-white/20">
            <CardContent className="p-6 text-center">
              <Clock className="w-8 h-8 mx-auto mb-3 text-blue-400" />
              <h3 className="text-lg mb-2">Time Limit</h3>
              <p className="text-2xl text-blue-400">{rulesData.timeLimit}</p>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-sm border border-white/20">
            <CardContent className="p-6 text-center">
              <Target className="w-8 h-8 mx-auto mb-3 text-green-400" />
              <h3 className="text-lg mb-2">Questions</h3>
              <p className="text-2xl text-green-400">{rulesData.totalQuestions}</p>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-sm border border-white/20">
            <CardContent className="p-6 text-center">
              <CheckCircle className="w-8 h-8 mx-auto mb-3 text-purple-400" />
              <h3 className="text-lg mb-2">Max Marks</h3>
              <p className="text-2xl text-purple-400">{rulesData.maxMarks}</p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Rules and Guidelines */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Guidelines */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Card className="h-full bg-white/10 backdrop-blur-sm border border-white/20">
              <CardContent className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <AlertCircle className="w-6 h-6 text-orange-400" />
                  <h3 className="text-xl">Assessment Guidelines</h3>
                </div>
                <ul className="space-y-3">
                  {rulesData.guidelines.map((guideline, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
                      className="flex items-start gap-3"
                    >
                      <div className="w-2 h-2 bg-orange-400 rounded-full mt-2 flex-shrink-0" />
                      <span className="text-muted-foreground">{guideline}</span>
                    </motion.li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </motion.div>

          {/* Tips */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Card className="h-full bg-white/10 backdrop-blur-sm border border-white/20">
              <CardContent className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <HelpCircle className="w-6 h-6 text-cyan-400" />
                  <h3 className="text-xl">Helpful Tips</h3>
                </div>
                <ul className="space-y-3">
                  {rulesData.tips.map((tip, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: 0.6 + index * 0.1 }}
                      className="flex items-start gap-3"
                    >
                      <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2 flex-shrink-0" />
                      <span className="text-muted-foreground">{tip}</span>
                    </motion.li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Important Notes */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mb-12"
        >
          <Card className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 backdrop-blur-sm border border-yellow-400/30">
            <CardContent className="p-8">
              <div className="flex items-center gap-3 mb-4">
                <AlertCircle className="w-6 h-6 text-yellow-400" />
                <h3 className="text-xl text-yellow-400">Important Notes</h3>
              </div>
              <div className="space-y-2 text-foreground">
                <p>• Once you start the assessment, the timer will begin automatically</p>
                <p>• You cannot pause or restart the assessment once started</p>
                <p>• Ensure stable internet connection throughout the assessment</p>
                <p>• Your responses will be auto-saved as you progress</p>
                <p>• You will receive detailed feedback upon completion</p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Continue Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center"
        >
          <Button
            onClick={onContinue}
            size="lg"
            className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white px-12 py-6 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
          >
            I Understand, Let's Start!
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default RulesPage;