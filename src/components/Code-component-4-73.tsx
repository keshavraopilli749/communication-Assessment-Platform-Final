import React from 'react';
import { motion } from 'motion/react';
import { Button } from './ui/button';
import { Home, BookOpen, HelpCircle, TrendingUp, LogIn, User } from 'lucide-react';

const Header = ({ currentPage, onNavigate, user, onSignOut, isDark }) => {
  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'modules', label: 'Modules', icon: BookOpen },
    { id: 'performance', label: 'Performance', icon: TrendingUp },
    { id: 'help', label: 'Help', icon: HelpCircle },
  ];

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 right-0 z-40 backdrop-blur-md border-b border-white/10"
      style={{
        background: isDark 
          ? 'rgba(20, 20, 30, 0.8)' 
          : 'rgba(255, 255, 255, 0.8)',
      }}
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => onNavigate('home')}
          >
            <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-lg flex items-center justify-center">
              <span className="text-white text-lg">C</span>
            </div>
            <span className="text-xl bg-gradient-to-r from-purple-600 to-cyan-600 bg-clip-text text-transparent">
              CommQuest
            </span>
          </motion.div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const IconComponent = item.icon;
              const isActive = currentPage === item.id || 
                (item.id === 'modules' && ['sections', 'rules', 'questions', 'results'].includes(currentPage));
              
              return (
                <motion.button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                    isActive
                      ? 'bg-purple-600 text-white'
                      : 'text-muted-foreground hover:text-foreground hover:bg-white/10'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <IconComponent className="w-4 h-4" />
                  <span>{item.label}</span>
                </motion.button>
              );
            })}
          </nav>

          {/* User Section */}
          <div className="flex items-center gap-4">
            {user ? (
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-white" />
                  </div>
                  <span className="hidden sm:inline text-foreground">{user.name}</span>
                </div>
                <Button
                  onClick={onSignOut}
                  variant="outline"
                  size="sm"
                  className="bg-white/10 border-white/20 hover:bg-white/20"
                >
                  Sign Out
                </Button>
              </div>
            ) : (
              <Button
                onClick={() => onNavigate('auth')}
                className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white"
              >
                <LogIn className="w-4 h-4 mr-2" />
                Sign In
              </Button>
            )}
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden mt-4 flex justify-center gap-2">
          {navItems.map((item) => {
            const IconComponent = item.icon;
            const isActive = currentPage === item.id || 
              (item.id === 'modules' && ['sections', 'rules', 'questions', 'results'].includes(currentPage));
            
            return (
              <motion.button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition-all duration-300 ${
                  isActive
                    ? 'bg-purple-600 text-white'
                    : 'text-muted-foreground hover:text-foreground hover:bg-white/10'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <IconComponent className="w-4 h-4" />
                <span className="text-xs">{item.label}</span>
              </motion.button>
            );
          })}
        </div>
      </div>
    </motion.header>
  );
};

export default Header;