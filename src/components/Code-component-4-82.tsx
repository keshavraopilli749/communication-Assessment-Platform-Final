import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Card, CardContent, CardHeader } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { ScrollArea } from './ui/scroll-area';
import { MessageCircle, Send, X, Bot, User, Minimize2 } from 'lucide-react';

const Chatbot = ({ isDark }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      message: 'Hello! I\'m CommBot, your communication assessment assistant. How can I help you today?',
      timestamp: new Date(),
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Predefined responses for common questions
  const botResponses = {
    greeting: [
      "Hello! Welcome to CommQuest. I'm here to help you with your communication assessment journey.",
      "Hi there! I'm CommBot. What would you like to know about our communication modules?",
      "Greetings! Ready to improve your communication skills? I'm here to guide you!"
    ],
    modules: [
      "We offer four main communication modules: Speaking Skills, Writing Practice, Listening Tests, and Non-Verbal Communication. Each module has multiple sections to help you improve specific areas.",
      "Our platform covers all aspects of communication - verbal, written, listening, and body language. Which area would you like to focus on?"
    ],
    help: [
      "I can help you with:\n• Understanding our assessment modules\n• Navigating the platform\n• Tips for better performance\n• Technical support\n\nWhat specific help do you need?",
      "Here are some things I can assist you with:\n• Module explanations\n• Assessment guidelines\n• Performance tips\n• Platform navigation\n\nHow can I help you today?"
    ],
    speaking: [
      "Our Speaking Skills module includes self-introduction, HR questions, group discussions, extempore speaking, and fluency tests. Each section provides personalized feedback to help improve your verbal communication.",
      "The Speaking module focuses on clarity, fluency, confidence, and articulation. You'll practice with realistic scenarios and get detailed feedback on your performance."
    ],
    writing: [
      "The Writing Practice module covers email writing, essay composition, grammar exercises, and vocabulary building. Perfect for improving your professional written communication.",
      "Our writing assessments help you with structure, grammar, vocabulary, and professional tone. You'll practice real-world writing scenarios."
    ],
    listening: [
      "Listening Tests include audio comprehension, fill-in-the-blanks, true/false questions, and note-taking exercises. These help improve your ability to understand and process spoken information.",
      "The Listening module enhances your comprehension skills through various audio exercises, helping you better understand different accents and speaking speeds."
    ],
    nonverbal: [
      "Non-Verbal Communication focuses on eye contact, body language, facial expressions, and gestures. Learn to read and project the right non-verbal cues.",
      "This module analyzes body language, posture, eye contact, and facial expressions to help you communicate more effectively without words."
    ],
    tips: [
      "Here are some quick tips:\n• Practice regularly for best results\n• Take assessments in a quiet environment\n• Review your feedback carefully\n• Don't rush - quality over speed\n• Use the practice mode before real assessments",
      "Communication tips:\n• Speak clearly and at a moderate pace\n• Maintain good posture and eye contact\n• Listen actively and take notes\n• Practice writing in a professional tone\n• Be confident and authentic"
    ],
    default: [
      "That's an interesting question! While I might not have a specific answer for that, I recommend checking our Help section or contacting our support team for more detailed assistance.",
      "I'm still learning! For complex questions, please visit our Help center or reach out to our support team. Is there something else I can help you with?",
      "I'd love to help more with that specific question. For now, you can explore our modules or check the FAQ section. What else can I assist you with?"
    ]
  };

  const getRandomResponse = (category) => {
    const responses = botResponses[category] || botResponses.default;
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const generateBotResponse = (userMessage) => {
    const message = userMessage.toLowerCase();
    
    if (message.includes('hello') || message.includes('hi') || message.includes('hey')) {
      return getRandomResponse('greeting');
    }
    
    if (message.includes('module') || message.includes('assessment') || message.includes('test')) {
      return getRandomResponse('modules');
    }
    
    if (message.includes('help') || message.includes('support') || message.includes('assist')) {
      return getRandomResponse('help');
    }
    
    if (message.includes('speaking') || message.includes('speech') || message.includes('verbal')) {
      return getRandomResponse('speaking');
    }
    
    if (message.includes('writing') || message.includes('write') || message.includes('essay')) {
      return getRandomResponse('writing');
    }
    
    if (message.includes('listening') || message.includes('audio') || message.includes('hear')) {
      return getRandomResponse('listening');
    }
    
    if (message.includes('body language') || message.includes('gesture') || message.includes('non-verbal') || message.includes('nonverbal')) {
      return getRandomResponse('nonverbal');
    }
    
    if (message.includes('tip') || message.includes('advice') || message.includes('improve')) {
      return getRandomResponse('tips');
    }
    
    return getRandomResponse('default');
  };

  const sendMessage = async () => {
    if (!inputMessage.trim()) return;

    // Add user message
    const userMessage = {
      id: Date.now(),
      type: 'user',
      message: inputMessage.trim(),
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate bot thinking time
    setTimeout(() => {
      const botMessage = {
        id: Date.now() + 1,
        type: 'bot',
        message: generateBotResponse(userMessage.message),
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, Math.random() * 2000 + 1000); // 1-3 seconds delay
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false 
    });
  };

  return (
    <>
      {/* Chat Button */}
      {!isOpen && (
        <motion.button
          onClick={() => setIsOpen(true)}
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
        </motion.button>
      )}

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0, y: 100 }}
            animate={{ 
              opacity: 1, 
              scale: isMinimized ? 0.3 : 1, 
              y: isMinimized ? 50 : 0,
              width: isMinimized ? '200px' : '400px',
              height: isMinimized ? '60px' : '600px'
            }}
            exit={{ opacity: 0, scale: 0, y: 100 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="fixed bottom-6 right-6 z-50 w-[400px] h-[600px] max-w-[90vw] max-h-[80vh]"
          >
            <Card className="w-full h-full bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg border border-white/20 shadow-2xl">
              {/* Header */}
              <CardHeader className="flex flex-row items-center justify-between p-4 border-b">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full bg-gradient-to-r ${
                    isDark ? 'from-cyan-500 to-blue-500' : 'from-purple-500 to-pink-500'
                  } flex items-center justify-center`}>
                    <Bot className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-sm">CommBot</h3>
                    <p className="text-xs text-muted-foreground">
                      {isTyping ? 'Typing...' : 'Online'}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Button
                    onClick={() => setIsMinimized(!isMinimized)}
                    variant="ghost"
                    size="sm"
                    className="w-8 h-8 p-0"
                  >
                    <Minimize2 className="w-4 h-4" />
                  </Button>
                  <Button
                    onClick={() => setIsOpen(false)}
                    variant="ghost"
                    size="sm"
                    className="w-8 h-8 p-0"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </CardHeader>

              {/* Messages */}
              {!isMinimized && (
                <CardContent className="p-0 flex flex-col h-[calc(100%-140px)]">
                  <ScrollArea className="flex-1 p-4">
                    <div className="space-y-4">
                      {messages.map((message) => (
                        <motion.div
                          key={message.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3 }}
                          className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                          <div className={`flex items-start gap-3 max-w-[80%] ${
                            message.type === 'user' ? 'flex-row-reverse' : 'flex-row'
                          }`}>
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                              message.type === 'user' 
                                ? 'bg-gradient-to-r from-purple-500 to-cyan-500' 
                                : isDark 
                                  ? 'bg-gradient-to-r from-cyan-500 to-blue-500'
                                  : 'bg-gradient-to-r from-purple-500 to-pink-500'
                            }`}>
                              {message.type === 'user' ? (
                                <User className="w-4 h-4 text-white" />
                              ) : (
                                <Bot className="w-4 h-4 text-white" />
                              )}
                            </div>
                            
                            <div className={`rounded-lg p-3 ${
                              message.type === 'user'
                                ? 'bg-gradient-to-r from-purple-500 to-cyan-500 text-white'
                                : 'bg-white/50 dark:bg-gray-800/50 text-foreground'
                            }`}>
                              <p className="text-sm whitespace-pre-line">{message.message}</p>
                              <p className={`text-xs mt-1 ${
                                message.type === 'user' ? 'text-white/70' : 'text-muted-foreground'
                              }`}>
                                {formatTime(message.timestamp)}
                              </p>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                      
                      {/* Typing Indicator */}
                      {isTyping && (
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="flex justify-start"
                        >
                          <div className="flex items-start gap-3">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                              isDark 
                                ? 'bg-gradient-to-r from-cyan-500 to-blue-500'
                                : 'bg-gradient-to-r from-purple-500 to-pink-500'
                            }`}>
                              <Bot className="w-4 h-4 text-white" />
                            </div>
                            <div className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-3">
                              <div className="flex gap-1">
                                <motion.div
                                  className="w-2 h-2 bg-muted-foreground rounded-full"
                                  animate={{ opacity: [0.4, 1, 0.4] }}
                                  transition={{ duration: 1, repeat: Infinity, delay: 0 }}
                                />
                                <motion.div
                                  className="w-2 h-2 bg-muted-foreground rounded-full"
                                  animate={{ opacity: [0.4, 1, 0.4] }}
                                  transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
                                />
                                <motion.div
                                  className="w-2 h-2 bg-muted-foreground rounded-full"
                                  animate={{ opacity: [0.4, 1, 0.4] }}
                                  transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
                                />
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                      
                      <div ref={messagesEndRef} />
                    </div>
                  </ScrollArea>

                  {/* Input */}
                  <div className="border-t p-4">
                    <div className="flex gap-2">
                      <Input
                        value={inputMessage}
                        onChange={(e) => setInputMessage(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Type your message..."
                        className="flex-1 bg-white/50 dark:bg-gray-800/50"
                        disabled={isTyping}
                      />
                      <Button
                        onClick={sendMessage}
                        disabled={!inputMessage.trim() || isTyping}
                        size="sm"
                        className="bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600 text-white"
                      >
                        <Send className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              )}
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Chatbot;