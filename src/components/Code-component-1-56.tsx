import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Progress } from './ui/progress';
import { Clock, Mic, MicOff, Play, Pause, ChevronLeft, ChevronRight, Save } from 'lucide-react';

const QuestionsPage = ({ module, section, onComplete, onSaveAnswer, userAnswers }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [timeLeft, setTimeLeft] = useState(900); // 15 minutes default
  const [answers, setAnswers] = useState(userAnswers || {});
  const [isRecording, setIsRecording] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  // Get questions based on module and section
  const getQuestions = () => {
    const questionSets = {
      speaking: {
        'self-intro': [
          { id: 1, type: 'speaking', question: 'Introduce yourself in 60 seconds. Include your name, background, and career goals.', timeLimit: 60 },
          { id: 2, type: 'speaking', question: 'Describe your greatest strength and how it has helped you professionally.', timeLimit: 90 },
          { id: 3, type: 'speaking', question: 'Tell us about a challenging project you completed successfully.', timeLimit: 120 },
          { id: 4, type: 'speaking', question: 'Where do you see yourself in the next 5 years?', timeLimit: 90 },
          { id: 5, type: 'speaking', question: 'Why should we hire you for this position?', timeLimit: 90 }
        ],
        'hr-questions': [
          { id: 1, type: 'speaking', question: 'Tell me about a time when you had to work under pressure.', timeLimit: 120 },
          { id: 2, type: 'speaking', question: 'Describe a situation where you had to work with a difficult colleague.', timeLimit: 120 },
          { id: 3, type: 'speaking', question: 'What motivates you in your work?', timeLimit: 90 },
          { id: 4, type: 'speaking', question: 'How do you handle criticism or feedback?', timeLimit: 90 },
          { id: 5, type: 'speaking', question: 'Describe your ideal work environment.', timeLimit: 90 }
        ]
      },
      writing: {
        'email-writing': [
          { id: 1, type: 'writing', question: 'Write a professional email requesting a meeting with your manager to discuss a new project proposal. Include a clear subject line and appropriate salutation.', wordLimit: 200 },
          { id: 2, type: 'writing', question: 'Compose an email to a client apologizing for a delayed delivery and proposing a solution.', wordLimit: 250 },
          { id: 3, type: 'writing', question: 'Write a follow-up email after a job interview, thanking the interviewer and reiterating your interest.', wordLimit: 180 },
          { id: 4, type: 'writing', question: 'Draft an email to your team announcing a change in project timeline and explaining the reasons.', wordLimit: 220 }
        ],
        'essay-writing': [
          { id: 1, type: 'writing', question: 'Write an essay on "The Impact of Remote Work on Professional Communication." Structure your response with an introduction, body paragraphs, and conclusion.', wordLimit: 500 },
          { id: 2, type: 'writing', question: 'Discuss the importance of emotional intelligence in leadership. Provide examples to support your arguments.', wordLimit: 450 },
          { id: 3, type: 'writing', question: 'Analyze the role of technology in modern workplace communication. What are the benefits and challenges?', wordLimit: 400 }
        ]
      },
      listening: {
        'audio-comprehension': [
          { id: 1, type: 'listening', question: 'Listen to the audio clip about quarterly sales performance. What was the percentage increase in sales compared to last quarter?', audioUrl: '/placeholder-audio.mp3', options: ['15%', '22%', '18%', '25%'], correct: 2 },
          { id: 2, type: 'listening', question: 'Based on the presentation, what are the three main challenges mentioned for the upcoming project?', audioUrl: '/placeholder-audio.mp3', type: 'text' },
          { id: 3, type: 'listening', question: 'What recommendation did the speaker make regarding team communication?', audioUrl: '/placeholder-audio.mp3', options: ['Daily standup meetings', 'Weekly reports', 'Monthly reviews', 'Quarterly assessments'], correct: 0 }
        ],
        'fill-blanks': [
          { id: 1, type: 'listening', question: 'Fill in the missing words from the audio: "The project deadline has been moved to _____ due to _____."', audioUrl: '/placeholder-audio.mp3', blanks: 2 },
          { id: 2, type: 'listening', question: 'Complete the sentence: "Our main objective is to _____ customer satisfaction by _____."', audioUrl: '/placeholder-audio.mp3', blanks: 2 }
        ]
      },
      nonverbal: {
        'eye-contact': [
          { id: 1, type: 'nonverbal', question: 'Watch the video clip. Rate the speaker\'s eye contact effectiveness on a scale of 1-5 and explain your reasoning.', videoUrl: '/placeholder-video.mp4' },
          { id: 2, type: 'nonverbal', question: 'Observe the interaction. What does the person\'s eye contact pattern suggest about their confidence level?', videoUrl: '/placeholder-video.mp4' }
        ],
        'body-language': [
          { id: 1, type: 'nonverbal', question: 'Analyze the presenter\'s posture and gestures. What message are they conveying through their body language?', videoUrl: '/placeholder-video.mp4' },
          { id: 2, type: 'nonverbal', question: 'Identify three positive and three negative body language cues displayed in this video.', videoUrl: '/placeholder-video.mp4' }
        ]
      }
    };

    return questionSets[module?.id]?.[section?.id] || questionSets.speaking['self-intro'];
  };

  const questions = getQuestions();

  useEffect(() => {
    // Set timer based on section duration
    const duration = section?.duration || '15 min';
    const minutes = parseInt(duration);
    setTimeLeft(minutes * 60);
  }, [section]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  const handleAnswerChange = (value) => {
    const questionId = `${module?.id}_${section?.id}_${questions[currentQuestion].id}`;
    const newAnswers = { ...answers, [questionId]: value };
    setAnswers(newAnswers);
    onSaveAnswer(questionId, value);
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmit = () => {
    onComplete();
  };

  const renderQuestionInput = (question) => {
    const questionId = `${module?.id}_${section?.id}_${question.id}`;
    const currentAnswer = answers[questionId] || '';

    switch (question.type) {
      case 'speaking':
        return (
          <div className="space-y-6">
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-red-600 dark:text-red-400">Audio Recording</span>
                <span className="text-sm text-muted-foreground">
                  Time Limit: {question.timeLimit}s
                </span>
              </div>
              
              <div className="flex items-center justify-center space-x-4">
                <Button
                  onClick={() => setIsRecording(!isRecording)}
                  className={`w-16 h-16 rounded-full ${
                    isRecording 
                      ? 'bg-red-500 hover:bg-red-600' 
                      : 'bg-blue-500 hover:bg-blue-600'
                  } text-white`}
                >
                  {isRecording ? <MicOff className="w-8 h-8" /> : <Mic className="w-8 h-8" />}
                </Button>
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">
                    {isRecording ? 'Recording in progress...' : 'Click to start recording'}
                  </p>
                  {isRecording && (
                    <motion.div
                      className="w-3 h-3 bg-red-500 rounded-full mx-auto mt-2"
                      animate={{ opacity: [1, 0.3, 1] }}
                      transition={{ duration: 1, repeat: Infinity }}
                    />
                  )}
                </div>
              </div>
            </div>
            
            <Textarea
              placeholder="Optional: Write notes about your response here..."
              value={currentAnswer}
              onChange={(e) => handleAnswerChange(e.target.value)}
              className="min-h-[100px] bg-white/10 border-white/20"
            />
          </div>
        );

      case 'writing':
        return (
          <div className="space-y-4">
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Word limit: {question.wordLimit} words</span>
              <span>Current: {currentAnswer.split(' ').filter(word => word.length > 0).length} words</span>
            </div>
            <Textarea
              placeholder="Type your response here..."
              value={currentAnswer}
              onChange={(e) => handleAnswerChange(e.target.value)}
              className="min-h-[300px] bg-white/10 border-white/20"
            />
          </div>
        );

      case 'listening':
        return (
          <div className="space-y-6">
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-blue-600 dark:text-blue-400">Audio Player</span>
                <span className="text-sm text-muted-foreground">
                  Replays left: 2
                </span>
              </div>
              
              <div className="flex items-center justify-center space-x-4">
                <Button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="w-12 h-12 rounded-full bg-blue-500 hover:bg-blue-600 text-white"
                >
                  {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
                </Button>
                <div className="flex-1 h-2 bg-white/20 rounded-full">
                  <motion.div 
                    className="h-full bg-blue-500 rounded-full"
                    initial={{ width: '0%' }}
                    animate={{ width: isPlaying ? '100%' : '0%' }}
                    transition={{ duration: 30, ease: 'linear' }}
                  />
                </div>
              </div>
            </div>

            {question.options ? (
              <div className="space-y-3">
                {question.options.map((option, index) => (
                  <label
                    key={index}
                    className="flex items-center space-x-3 p-4 rounded-lg bg-white/5 hover:bg-white/10 cursor-pointer transition-colors"
                  >
                    <input
                      type="radio"
                      name={`question_${question.id}`}
                      value={option}
                      checked={currentAnswer === option}
                      onChange={(e) => handleAnswerChange(e.target.value)}
                      className="w-4 h-4"
                    />
                    <span>{option}</span>
                  </label>
                ))}
              </div>
            ) : (
              <Textarea
                placeholder="Type your answer here..."
                value={currentAnswer}
                onChange={(e) => handleAnswerChange(e.target.value)}
                className="min-h-[150px] bg-white/10 border-white/20"
              />
            )}
          </div>
        );

      case 'nonverbal':
        return (
          <div className="space-y-6">
            <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-purple-600 dark:text-purple-400">Video Player</span>
                <span className="text-sm text-muted-foreground">
                  Duration: 2:30
                </span>
              </div>
              
              <div className="aspect-video bg-black/20 rounded-lg flex items-center justify-center mb-4">
                <div className="text-center text-muted-foreground">
                  <Play className="w-16 h-16 mx-auto mb-2" />
                  <p>Video will play here</p>
                </div>
              </div>

              <div className="flex items-center justify-center space-x-4">
                <Button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="bg-purple-500 hover:bg-purple-600 text-white"
                >
                  {isPlaying ? <Pause className="w-5 h-5 mr-2" /> : <Play className="w-5 h-5 mr-2" />}
                  {isPlaying ? 'Pause' : 'Play'}
                </Button>
              </div>
            </div>

            <Textarea
              placeholder="Describe your observations about the non-verbal communication in the video..."
              value={currentAnswer}
              onChange={(e) => handleAnswerChange(e.target.value)}
              className="min-h-[200px] bg-white/10 border-white/20"
            />
          </div>
        );

      default:
        return (
          <Textarea
            placeholder="Type your answer here..."
            value={currentAnswer}
            onChange={(e) => handleAnswerChange(e.target.value)}
            className="min-h-[200px] bg-white/10 border-white/20"
          />
        );
    }
  };

  return (
    <div className="min-h-screen py-20 px-6 relative z-10">
      <div className="max-w-4xl mx-auto">
        {/* Header with Timer and Progress */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
            <div>
              <h1 className="text-2xl md:text-3xl mb-2">{section?.title}</h1>
              <p className="text-muted-foreground">
                Question {currentQuestion + 1} of {questions.length}
              </p>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2">
                <Clock className="w-5 h-5 text-orange-400" />
                <span className={`text-lg ${timeLeft < 300 ? 'text-red-400' : 'text-foreground'}`}>
                  {formatTime(timeLeft)}
                </span>
              </div>
              
              <Button
                variant="outline"
                size="sm"
                className="bg-white/10 border-white/20"
              >
                <Save className="w-4 h-4 mr-2" />
                Auto-saved
              </Button>
            </div>
          </div>

          <Progress value={progress} className="h-2" />
        </motion.div>

        {/* Question Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.4 }}
          >
            <Card className="bg-white/10 backdrop-blur-sm border border-white/20 mb-8">
              <CardContent className="p-8">
                <div className="mb-8">
                  <h2 className="text-xl mb-4">
                    {questions[currentQuestion]?.question}
                  </h2>
                </div>

                {renderQuestionInput(questions[currentQuestion])}
              </CardContent>
            </Card>
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex justify-between items-center"
        >
          <Button
            onClick={prevQuestion}
            disabled={currentQuestion === 0}
            variant="outline"
            className="bg-white/10 border-white/20 disabled:opacity-50"
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            Previous
          </Button>

          <div className="flex gap-2">
            {questions.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentQuestion(index)}
                className={`w-8 h-8 rounded-full transition-all ${
                  index === currentQuestion
                    ? 'bg-blue-500 text-white'
                    : index < currentQuestion
                    ? 'bg-green-500 text-white'
                    : 'bg-white/20 text-muted-foreground hover:bg-white/30'
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>

          {currentQuestion === questions.length - 1 ? (
            <Button
              onClick={handleSubmit}
              className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white"
            >
              Submit Assessment
            </Button>
          ) : (
            <Button
              onClick={nextQuestion}
              className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white"
            >
              Next
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default QuestionsPage;