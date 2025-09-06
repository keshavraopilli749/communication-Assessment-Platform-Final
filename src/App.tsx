import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

// Components
import AnimatedBackground from './components/AnimatedBackground';
import Header from './components/Header';
import ThemeToggle from './components/ThemeToggle';
import Hero from './components/Hero';
import ModulesPage from './components/ModulesPage';
import PerformancePage from './components/PerformancePage';
import HelpPage from './components/HelpPage';
import AuthPage from './components/AuthPage';
import TrustedStudents from './components/TrustedStudents';
import Footer from './components/Footer';
import Chatbot from './components/Chatbot';
import SectionList from './components/SectionList';
import RulesPage from './components/RulesPage';
import QuestionsPage from './components/QuestionsPage';
import ResultsPage from './components/ResultsPage';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [currentModule, setCurrentModule] = useState(null);
  const [currentSection, setCurrentSection] = useState(null);
  const [isDark, setIsDark] = useState(false);
  const [userAnswers, setUserAnswers] = useState({});
  const [user, setUser] = useState(null);

  // Initialize theme and user
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    }

    const savedUser = localStorage.getItem('commquest_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const toggleTheme = () => {
    setIsDark(!isDark);
    if (!isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  // Navigation functions
  const handleNavigation = (page) => {
    // Reset module/section state when navigating to main pages
    if (['home', 'modules', 'performance', 'help', 'auth'].includes(page)) {
      setCurrentModule(null);
      setCurrentSection(null);
    }
    setCurrentPage(page);
  };

  const navigateToModule = (module) => {
    setCurrentModule(module);
    setCurrentSection(null); // Reset section when entering module
    setCurrentPage('sections');
  };

  const navigateToRules = (section) => {
    setCurrentSection(section);
    setCurrentPage('rules');
  };

  const navigateToQuestions = () => {
    setCurrentPage('questions');
  };

  const navigateToResults = () => {
    setCurrentPage('results');
  };

  const navigateHome = () => {
    setCurrentPage('home');
    setCurrentModule(null);
    setCurrentSection(null);
  };

  const handleAuth = (userData) => {
    setUser(userData);
    setCurrentPage('home');
  };

  const handleSignOut = () => {
    setUser(null);
    localStorage.removeItem('commquest_user');
    setCurrentPage('home');
  };

  const saveAnswer = (questionId, answer) => {
    setUserAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <AnimatedBackground isDark={isDark} />
      
      {/* Header Navigation */}
      <Header 
        currentPage={currentPage}
        onNavigate={handleNavigation}
        user={user}
        onSignOut={handleSignOut}
        isDark={isDark}
      />
      
      {/* Theme Toggle */}
      <ThemeToggle isDark={isDark} toggleTheme={toggleTheme} />
      
      {/* Main Content - Fixed positioning to prevent layout shift */}
      <div className="relative w-full">
        <AnimatePresence mode="wait">
          {currentPage === 'home' && (
            <motion.div
              key="home"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="w-full"
            >
              <Hero />
              <div id="modules">
                <ModulesPage onModuleClick={navigateToModule} />
              </div>
              <TrustedStudents />
              <Footer />
            </motion.div>
          )}

          {currentPage === 'modules' && (
            <motion.div
              key="modules"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="w-full"
            >
              <ModulesPage onModuleClick={navigateToModule} />
              <Footer />
            </motion.div>
          )}

          {currentPage === 'performance' && (
            <motion.div
              key="performance"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="w-full"
            >
              <PerformancePage user={user} />
              <Footer />
            </motion.div>
          )}

          {currentPage === 'help' && (
            <motion.div
              key="help"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="w-full"
            >
              <HelpPage />
              <Footer />
            </motion.div>
          )}

          {currentPage === 'auth' && (
            <motion.div
              key="auth"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="w-full"
            >
              <AuthPage 
                onAuth={handleAuth}
                onBack={navigateHome}
              />
            </motion.div>
          )}

          {currentPage === 'sections' && (
            <motion.div
              key="sections"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="w-full"
            >
              <SectionList 
                module={currentModule} 
                onSectionClick={navigateToRules}
                onBack={() => handleNavigation('modules')}
              />
            </motion.div>
          )}

          {currentPage === 'rules' && (
            <motion.div
              key="rules"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="w-full"
            >
              <RulesPage 
                module={currentModule}
                section={currentSection}
                onContinue={navigateToQuestions}
                onBack={() => setCurrentPage('sections')}
              />
            </motion.div>
          )}

          {currentPage === 'questions' && (
            <motion.div
              key="questions"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="w-full"
            >
              <QuestionsPage 
                module={currentModule}
                section={currentSection}
                onComplete={navigateToResults}
                onSaveAnswer={saveAnswer}
                userAnswers={userAnswers}
              />
            </motion.div>
          )}

          {currentPage === 'results' && (
            <motion.div
              key="results"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="w-full"
            >
              <ResultsPage 
                module={currentModule}
                section={currentSection}
                userAnswers={userAnswers}
                onRetry={() => setCurrentPage('questions')}
                onNextSection={() => setCurrentPage('sections')}
                onHome={navigateHome}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Chatbot */}
      <Chatbot isDark={isDark} />
    </div>
  );
}