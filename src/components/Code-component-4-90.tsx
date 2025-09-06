import React from 'react';
import { motion } from 'motion/react';
import { Card, CardContent, CardHeader } from './ui/card';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import { TrendingUp, Trophy, Target, Clock, Star, Award, BarChart3 } from 'lucide-react';

const PerformancePage = ({ user }) => {
  // Mock performance data - in real app, this would come from API
  const performanceData = {
    overallScore: 87,
    completedAssessments: 12,
    totalTimeSpent: '4h 32m',
    streak: 7,
    recentScores: [
      { module: 'Speaking', section: 'Self Introduction', score: 92, date: '2024-01-15' },
      { module: 'Writing', section: 'Email Writing', score: 85, date: '2024-01-14' },
      { module: 'Listening', section: 'Audio Comprehension', score: 88, date: '2024-01-13' },
      { module: 'Non-Verbal', section: 'Eye Contact', score: 83, date: '2024-01-12' },
    ],
    moduleProgress: [
      { name: 'Speaking Skills', progress: 85, level: 'Advanced', color: 'from-orange-500 to-red-500' },
      { name: 'Writing Practice', progress: 72, level: 'Intermediate', color: 'from-blue-500 to-cyan-500' },
      { name: 'Listening Tests', progress: 90, level: 'Expert', color: 'from-green-500 to-emerald-500' },
      { name: 'Non-Verbal Cues', progress: 68, level: 'Intermediate', color: 'from-purple-500 to-pink-500' },
    ],
    achievements: [
      { title: 'First Assessment', description: 'Completed your first assessment', icon: '🎯', earned: true },
      { title: 'Week Streak', description: '7 days of continuous practice', icon: '🔥', earned: true },
      { title: 'High Scorer', description: 'Scored above 90% in any module', icon: '⭐', earned: true },
      { title: 'Well Rounded', description: 'Complete all four modules', icon: '🎖️', earned: false },
      { title: 'Expert Level', description: 'Reach expert level in any module', icon: '👑', earned: false },
    ],
    weakAreas: [
      'Grammar usage in formal writing',
      'Maintaining eye contact during presentations',
      'Speaking pace consistency'
    ],
    strengths: [
      'Clear articulation and pronunciation',
      'Professional email structure',
      'Active listening skills'
    ]
  };

  const getScoreColor = (score) => {
    if (score >= 85) return 'text-green-400';
    if (score >= 70) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getLevelBadge = (level) => {
    const badgeColors = {
      'Beginner': 'bg-gray-500',
      'Intermediate': 'bg-yellow-500',
      'Advanced': 'bg-blue-500',
      'Expert': 'bg-green-500'
    };
    return badgeColors[level] || 'bg-gray-500';
  };

  if (!user) {
    return (
      <div className="min-h-screen pt-32 pb-20 px-6 relative z-10 flex items-center justify-center">
        <Card className="bg-white/10 backdrop-blur-sm border border-white/20 p-8 text-center">
          <h2 className="text-2xl mb-4">Authentication Required</h2>
          <p className="text-muted-foreground">
            Please sign in to view your performance analytics and progress tracking.
          </p>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 pb-20 px-6 relative z-10">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl mb-4">Performance Dashboard</h1>
          <p className="text-xl text-muted-foreground">
            Track your communication skills progress and achievements
          </p>
        </motion.div>

        {/* Overview Cards */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
        >
          <Card className="bg-gradient-to-br from-purple-500/20 to-cyan-500/20 backdrop-blur-sm border border-white/20">
            <CardContent className="p-6 text-center">
              <TrendingUp className="w-8 h-8 mx-auto mb-3 text-purple-400" />
              <h3 className="text-lg mb-2">Overall Score</h3>
              <p className={`text-3xl ${getScoreColor(performanceData.overallScore)}`}>
                {performanceData.overallScore}%
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 backdrop-blur-sm border border-white/20">
            <CardContent className="p-6 text-center">
              <Target className="w-8 h-8 mx-auto mb-3 text-green-400" />
              <h3 className="text-lg mb-2">Completed</h3>
              <p className="text-3xl text-green-400">{performanceData.completedAssessments}</p>
              <p className="text-sm text-muted-foreground">Assessments</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 backdrop-blur-sm border border-white/20">
            <CardContent className="p-6 text-center">
              <Clock className="w-8 h-8 mx-auto mb-3 text-blue-400" />
              <h3 className="text-lg mb-2">Time Spent</h3>
              <p className="text-3xl text-blue-400">{performanceData.totalTimeSpent}</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-500/20 to-red-500/20 backdrop-blur-sm border border-white/20">
            <CardContent className="p-6 text-center">
              <Trophy className="w-8 h-8 mx-auto mb-3 text-orange-400" />
              <h3 className="text-lg mb-2">Current Streak</h3>
              <p className="text-3xl text-orange-400">{performanceData.streak}</p>
              <p className="text-sm text-muted-foreground">Days</p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Module Progress */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12"
        >
          <Card className="bg-white/10 backdrop-blur-sm border border-white/20">
            <CardHeader>
              <h3 className="text-xl flex items-center gap-2">
                <BarChart3 className="w-5 h-5" />
                Module Progress
              </h3>
            </CardHeader>
            <CardContent className="space-y-6">
              {performanceData.moduleProgress.map((module, index) => (
                <motion.div
                  key={module.name}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                >
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm">{module.name}</span>
                    <div className="flex items-center gap-2">
                      <Badge className={`${getLevelBadge(module.level)} text-white text-xs`}>
                        {module.level}
                      </Badge>
                      <span className={`text-sm ${getScoreColor(module.progress)}`}>
                        {module.progress}%
                      </span>
                    </div>
                  </div>
                  <Progress value={module.progress} className="h-2" />
                </motion.div>
              ))}
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-sm border border-white/20">
            <CardHeader>
              <h3 className="text-xl flex items-center gap-2">
                <Star className="w-5 h-5" />
                Recent Assessments
              </h3>
            </CardHeader>
            <CardContent className="space-y-4">
              {performanceData.recentScores.map((assessment, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className="flex justify-between items-center p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                >
                  <div>
                    <h4 className="text-sm">{assessment.section}</h4>
                    <p className="text-xs text-muted-foreground">{assessment.module}</p>
                    <p className="text-xs text-muted-foreground">{assessment.date}</p>
                  </div>
                  <div className={`text-lg ${getScoreColor(assessment.score)}`}>
                    {assessment.score}%
                  </div>
                </motion.div>
              ))}
            </CardContent>
          </Card>
        </motion.div>

        {/* Achievements and Insights */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8"
        >
          {/* Achievements */}
          <Card className="bg-white/10 backdrop-blur-sm border border-white/20">
            <CardHeader>
              <h3 className="text-xl flex items-center gap-2">
                <Award className="w-5 h-5" />
                Achievements
              </h3>
            </CardHeader>
            <CardContent className="space-y-3">
              {performanceData.achievements.map((achievement, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  className={`flex items-center gap-3 p-3 rounded-lg transition-all ${
                    achievement.earned 
                      ? 'bg-green-500/20 border border-green-500/30' 
                      : 'bg-white/5 opacity-50'
                  }`}
                >
                  <span className="text-2xl">{achievement.icon}</span>
                  <div>
                    <h4 className="text-sm">{achievement.title}</h4>
                    <p className="text-xs text-muted-foreground">{achievement.description}</p>
                  </div>
                </motion.div>
              ))}
            </CardContent>
          </Card>

          {/* Strengths */}
          <Card className="bg-green-500/10 backdrop-blur-sm border border-green-500/20">
            <CardHeader>
              <h3 className="text-xl flex items-center gap-2 text-green-400">
                <Star className="w-5 h-5" />
                Your Strengths
              </h3>
            </CardHeader>
            <CardContent className="space-y-3">
              {performanceData.strengths.map((strength, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 + index * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <div className="w-2 h-2 bg-green-400 rounded-full flex-shrink-0" />
                  <span className="text-sm">{strength}</span>
                </motion.div>
              ))}
            </CardContent>
          </Card>

          {/* Areas for Improvement */}
          <Card className="bg-orange-500/10 backdrop-blur-sm border border-orange-500/20">
            <CardHeader>
              <h3 className="text-xl flex items-center gap-2 text-orange-400">
                <TrendingUp className="w-5 h-5" />
                Focus Areas
              </h3>
            </CardHeader>
            <CardContent className="space-y-3">
              {performanceData.weakAreas.map((area, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <div className="w-2 h-2 bg-orange-400 rounded-full flex-shrink-0" />
                  <span className="text-sm">{area}</span>
                </motion.div>
              ))}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default PerformancePage;