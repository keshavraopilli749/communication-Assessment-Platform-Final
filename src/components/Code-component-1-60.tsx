import React from 'react';
import { motion } from 'motion/react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import { Trophy, Target, Clock, CheckCircle, XCircle, TrendingUp, RotateCcw, ArrowRight, Home, Star } from 'lucide-react';

const ResultsPage = ({ module, section, userAnswers, onRetry, onNextSection, onHome }) => {
  // Generate mock results based on module type
  const generateResults = () => {
    const baseResults = {
      totalQuestions: section?.questions || 5,
      timeUsed: '12:45',
      totalTime: section?.duration || '15 min',
      overallScore: Math.floor(Math.random() * 30) + 70, // 70-100%
    };

    const moduleSpecificResults = {
      speaking: {
        correctAnswers: Math.floor(baseResults.totalQuestions * 0.8),
        fluencyScore: 85,
        clarity: 78,
        pace: 82,
        confidence: 88,
        suggestions: [
          'Reduce use of filler words ("um", "uh")',
          'Maintain consistent eye contact',
          'Vary your tone for better engagement',
          'Practice speaking at a slightly slower pace'
        ],
        strengths: [
          'Clear articulation',
          'Good volume control',
          'Natural gestures'
        ]
      },
      writing: {
        correctAnswers: Math.floor(baseResults.totalQuestions * 0.75),
        grammarScore: 92,
        vocabulary: 86,
        structure: 79,
        clarity: 84,
        suggestions: [
          'Use more transitional phrases between paragraphs',
          'Vary sentence structure for better flow',
          'Proofread for minor punctuation errors',
          'Consider more specific examples to support arguments'
        ],
        strengths: [
          'Excellent grammar usage',
          'Professional tone',
          'Clear logical flow'
        ]
      },
      listening: {
        correctAnswers: Math.floor(baseResults.totalQuestions * 0.85),
        comprehension: 88,
        attention: 82,
        noteTaking: 76,
        accuracy: 90,
        suggestions: [
          'Practice taking structured notes while listening',
          'Focus on identifying key themes early',
          'Listen for signal words that indicate important information',
          'Improve ability to distinguish between main ideas and details'
        ],
        strengths: [
          'High accuracy rate',
          'Good focus duration',
          'Strong fact retention'
        ]
      },
      nonverbal: {
        correctAnswers: Math.floor(baseResults.totalQuestions * 0.77),
        observation: 81,
        interpretation: 75,
        bodyLanguage: 83,
        facialExpressions: 79,
        suggestions: [
          'Study micro-expressions for better accuracy',
          'Consider cultural context in interpretations',
          'Practice identifying incongruence between verbal and non-verbal cues',
          'Improve recognition of subtle emotional indicators'
        ],
        strengths: [
          'Good posture assessment',
          'Strong gesture recognition',
          'Solid eye contact evaluation'
        ]
      }
    };

    return {
      ...baseResults,
      ...moduleSpecificResults[module?.id] || moduleSpecificResults.speaking
    };
  };

  const results = generateResults();

  const getScoreColor = (score) => {
    if (score >= 85) return 'text-green-400';
    if (score >= 70) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getScoreBadge = (score) => {
    if (score >= 90) return { label: 'Excellent', color: 'bg-green-500' };
    if (score >= 80) return { label: 'Good', color: 'bg-blue-500' };
    if (score >= 70) return { label: 'Average', color: 'bg-yellow-500' };
    return { label: 'Needs Improvement', color: 'bg-red-500' };
  };

  const scoreCard = getScoreBadge(results.overallScore);

  return (
    <div className="min-h-screen py-20 px-6 relative z-10">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="flex justify-center mb-6">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
              className={`w-20 h-20 rounded-full ${scoreCard.color} flex items-center justify-center`}
            >
              <Trophy className="w-10 h-10 text-white" />
            </motion.div>
          </div>
          
          <h1 className="text-4xl md:text-5xl mb-4">Assessment Complete!</h1>
          <p className="text-xl text-muted-foreground">
            {section?.title} - {module?.title}
          </p>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-6"
          >
            <Badge className={`${scoreCard.color} text-white text-lg px-6 py-2`}>
              {scoreCard.label}
            </Badge>
          </motion.div>
        </motion.div>

        {/* Overall Score */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12"
        >
          <Card className="bg-gradient-to-r from-purple-500/20 to-cyan-500/20 backdrop-blur-sm border border-white/20">
            <CardContent className="p-8 text-center">
              <h2 className="text-2xl mb-6">Overall Performance</h2>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div>
                  <div className={`text-4xl mb-2 ${getScoreColor(results.overallScore)}`}>
                    {results.overallScore}%
                  </div>
                  <p className="text-sm text-muted-foreground">Overall Score</p>
                </div>
                <div>
                  <div className="text-2xl mb-2 text-foreground">
                    {results.correctAnswers}/{results.totalQuestions}
                  </div>
                  <p className="text-sm text-muted-foreground">Correct Answers</p>
                </div>
                <div>
                  <div className="text-2xl mb-2 text-foreground">
                    {results.timeUsed}
                  </div>
                  <p className="text-sm text-muted-foreground">Time Used</p>
                </div>
                <div>
                  <div className="text-2xl mb-2 text-foreground">
                    {results.totalTime}
                  </div>
                  <p className="text-sm text-muted-foreground">Total Time</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Detailed Scores */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12"
        >
          {/* Skills Breakdown */}
          <Card className="bg-white/10 backdrop-blur-sm border border-white/20">
            <CardContent className="p-8">
              <h3 className="text-xl mb-6 flex items-center gap-2">
                <Target className="w-5 h-5" />
                Skills Breakdown
              </h3>
              
              <div className="space-y-6">
                {Object.entries(results).filter(([key]) => 
                  !['totalQuestions', 'timeUsed', 'totalTime', 'overallScore', 'correctAnswers', 'suggestions', 'strengths'].includes(key)
                ).map(([skill, score], index) => (
                  <motion.div
                    key={skill}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                  >
                    <div className="flex justify-between items-center mb-2">
                      <span className="capitalize">{skill.replace(/([A-Z])/g, ' $1').trim()}</span>
                      <span className={getScoreColor(score)}>{score}%</span>
                    </div>
                    <Progress value={score} className="h-2" />
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Performance Summary */}
          <Card className="bg-white/10 backdrop-blur-sm border border-white/20">
            <CardContent className="p-8">
              <h3 className="text-xl mb-6 flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Performance Summary
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-400 mt-1" />
                  <div>
                    <h4 className="text-sm mb-1">Questions Answered Correctly</h4>
                    <p className="text-2xl text-green-400">{results.correctAnswers}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-red-400 mt-1" />
                  <div>
                    <h4 className="text-sm mb-1">Questions Missed</h4>
                    <p className="text-2xl text-red-400">{results.totalQuestions - results.correctAnswers}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-blue-400 mt-1" />
                  <div>
                    <h4 className="text-sm mb-1">Time Efficiency</h4>
                    <p className="text-2xl text-blue-400">
                      {Math.round((parseInt(results.timeUsed.split(':')[0]) * 60 + parseInt(results.timeUsed.split(':')[1])) / 
                      (parseInt(results.totalTime) * 60) * 100)}%
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Strengths and Suggestions */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12"
        >
          {/* Strengths */}
          <Card className="bg-green-500/10 backdrop-blur-sm border border-green-500/20">
            <CardContent className="p-8">
              <h3 className="text-xl mb-6 flex items-center gap-2 text-green-400">
                <Star className="w-5 h-5" />
                Your Strengths
              </h3>
              
              <ul className="space-y-3">
                {results.strengths?.map((strength, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                    className="flex items-center gap-3"
                  >
                    <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                    <span>{strength}</span>
                  </motion.li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Improvement Suggestions */}
          <Card className="bg-orange-500/10 backdrop-blur-sm border border-orange-500/20">
            <CardContent className="p-8">
              <h3 className="text-xl mb-6 flex items-center gap-2 text-orange-400">
                <TrendingUp className="w-5 h-5" />
                Areas for Improvement
              </h3>
              
              <ul className="space-y-3">
                {results.suggestions?.map((suggestion, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                    className="flex items-start gap-3"
                  >
                    <div className="w-2 h-2 bg-orange-400 rounded-full mt-2 flex-shrink-0" />
                    <span className="text-sm">{suggestion}</span>
                  </motion.li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Button
            onClick={onRetry}
            variant="outline"
            size="lg"
            className="bg-white/10 border-white/20 hover:bg-white/20 px-8 py-6"
          >
            <RotateCcw className="w-5 h-5 mr-2" />
            Retry Section
          </Button>
          
          <Button
            onClick={onNextSection}
            size="lg"
            className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white px-8 py-6"
          >
            Next Section
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
          
          <Button
            onClick={onHome}
            variant="outline"
            size="lg"
            className="bg-white/10 border-white/20 hover:bg-white/20 px-8 py-6"
          >
            <Home className="w-5 h-5 mr-2" />
            Back to Home
          </Button>
        </motion.div>

        {/* Motivational Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="text-center mt-16 p-8 bg-gradient-to-r from-purple-500/10 to-cyan-500/10 rounded-2xl border border-white/10"
        >
          <h3 className="text-xl mb-4">Keep Improving!</h3>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Communication skills improve with practice. Continue working on the suggested areas and 
            retake assessments to track your progress over time.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default ResultsPage;