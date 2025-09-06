import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Card, CardContent, CardHeader } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';
import { HelpCircle, Search, MessageSquare, BookOpen, Video, Mail } from 'lucide-react';

const HelpPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const faqData = [
    {
      question: 'How do I get started with CommQuest?',
      answer: 'Getting started is easy! Simply sign up for an account, choose a communication module that interests you, and begin your first assessment. Each module has multiple sections to help you improve specific skills.'
    },
    {
      question: 'What types of assessments are available?',
      answer: 'We offer four main types: Speaking Skills (interviews, presentations), Writing Practice (emails, essays), Listening Tests (comprehension, note-taking), and Non-Verbal Communication (body language, eye contact).'
    },
    {
      question: 'How is my performance evaluated?',
      answer: 'Our AI-powered system analyzes your responses across multiple criteria like clarity, grammar, fluency, and appropriateness. You receive detailed feedback with specific improvement suggestions.'
    },
    {
      question: 'Can I retake assessments?',
      answer: 'Yes! You can retake any assessment to track your improvement over time. We recommend waiting at least a day between attempts to practice the suggestions from your previous feedback.'
    },
    {
      question: 'How long does each assessment take?',
      answer: 'Assessment times vary by section, typically ranging from 8-25 minutes. The exact duration is shown before you start each section, so you can plan accordingly.'
    },
    {
      question: 'Is my data secure and private?',
      answer: 'Absolutely. We use industry-standard encryption to protect your data. Your assessment responses and personal information are never shared with third parties without your explicit consent.'
    },
    {
      question: 'Can I track my progress over time?',
      answer: 'Yes! Your Performance Dashboard shows detailed analytics including scores over time, module progress, strengths, areas for improvement, and achievements earned.'
    },
    {
      question: 'What devices can I use CommQuest on?',
      answer: 'CommQuest works on all modern devices - desktop computers, laptops, tablets, and smartphones. For speaking assessments, ensure your device has a working microphone.'
    },
    {
      question: 'Do you offer certificates?',
      answer: 'Yes! Upon completing modules and achieving certain scores, you can earn digital certificates that you can add to your LinkedIn profile or resume.'
    },
    {
      question: 'How can I get help during an assessment?',
      answer: 'Each assessment includes helpful tips and guidelines. If you need immediate assistance, use our chatbot (CommBot) or contact support through this help page.'
    }
  ];

  const helpCategories = [
    {
      title: 'Getting Started',
      icon: BookOpen,
      topics: ['Account Setup', 'First Assessment', 'Navigation Guide', 'Module Overview']
    },
    {
      title: 'Assessments',
      icon: HelpCircle,
      topics: ['Taking Tests', 'Understanding Scores', 'Retaking Assessments', 'Technical Requirements']
    },
    {
      title: 'Performance',
      icon: Video,
      topics: ['Dashboard Overview', 'Progress Tracking', 'Certificates', 'Improvement Tips']
    },
    {
      title: 'Technical Support',
      icon: MessageSquare,
      topics: ['Browser Requirements', 'Audio/Video Issues', 'Account Problems', 'Bug Reports']
    }
  ];

  const filteredFAQs = faqData.filter(faq => 
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleContactSubmit = (e) => {
    e.preventDefault();
    // In a real app, this would send to your support system
    alert('Thank you for contacting us! We\'ll respond within 24 hours.');
    setContactForm({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="min-h-screen pt-32 pb-20 px-6 relative z-10">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl mb-4">Help & Support</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Find answers to common questions or get in touch with our support team
          </p>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="max-w-2xl mx-auto mb-12"
        >
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Search for help topics, FAQs, or keywords..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 py-4 text-lg bg-white/10 border-white/20 rounded-xl"
            />
          </div>
        </motion.div>

        {/* Help Categories */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
        >
          {helpCategories.map((category, index) => {
            const IconComponent = category.icon;
            return (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <Card className="h-full bg-white/10 backdrop-blur-sm border border-white/20 hover:border-white/40 transition-all duration-300 cursor-pointer">
                  <CardContent className="p-6 text-center">
                    <IconComponent className="w-12 h-12 mx-auto mb-4 text-purple-400" />
                    <h3 className="text-lg mb-3">{category.title}</h3>
                    <ul className="space-y-2">
                      {category.topics.map((topic) => (
                        <li key={topic} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                          {topic}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* FAQ Section */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:col-span-2"
          >
            <Card className="bg-white/10 backdrop-blur-sm border border-white/20">
              <CardHeader>
                <h2 className="text-2xl">Frequently Asked Questions</h2>
                <p className="text-muted-foreground">
                  {searchQuery ? `Showing ${filteredFAQs.length} results for "${searchQuery}"` : 'Common questions and answers'}
                </p>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="space-y-4">
                  {filteredFAQs.map((faq, index) => (
                    <AccordionItem
                      key={index}
                      value={`item-${index}`}
                      className="border border-white/10 rounded-lg px-4"
                    >
                      <AccordionTrigger className="text-left hover:no-underline">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground leading-relaxed">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
                
                {filteredFAQs.length === 0 && searchQuery && (
                  <div className="text-center py-8 text-muted-foreground">
                    <HelpCircle className="w-16 h-16 mx-auto mb-4 opacity-50" />
                    <p className="text-lg mb-2">No results found</p>
                    <p>Try searching with different keywords or contact our support team</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Card className="bg-white/10 backdrop-blur-sm border border-white/20">
              <CardHeader>
                <h3 className="text-xl flex items-center gap-2">
                  <Mail className="w-5 h-5" />
                  Contact Support
                </h3>
                <p className="text-muted-foreground text-sm">
                  Can't find what you're looking for? Send us a message.
                </p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleContactSubmit} className="space-y-4">
                  <div>
                    <label className="text-sm mb-2 block">Name</label>
                    <Input
                      value={contactForm.name}
                      onChange={(e) => setContactForm({...contactForm, name: e.target.value})}
                      placeholder="Your name"
                      className="bg-white/10 border-white/20"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="text-sm mb-2 block">Email</label>
                    <Input
                      type="email"
                      value={contactForm.email}
                      onChange={(e) => setContactForm({...contactForm, email: e.target.value})}
                      placeholder="your.email@example.com"
                      className="bg-white/10 border-white/20"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="text-sm mb-2 block">Subject</label>
                    <Input
                      value={contactForm.subject}
                      onChange={(e) => setContactForm({...contactForm, subject: e.target.value})}
                      placeholder="Brief description of your issue"
                      className="bg-white/10 border-white/20"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="text-sm mb-2 block">Message</label>
                    <Textarea
                      value={contactForm.message}
                      onChange={(e) => setContactForm({...contactForm, message: e.target.value})}
                      placeholder="Describe your issue in detail..."
                      rows={5}
                      className="bg-white/10 border-white/20 resize-none"
                      required
                    />
                  </div>
                  
                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white"
                  >
                    Send Message
                  </Button>
                </form>
                
                <div className="mt-6 pt-6 border-t border-white/10 text-center text-sm text-muted-foreground">
                  <p>📧 hello@commquest.com</p>
                  <p>📞 +1 (555) 123-4567</p>
                  <p>🕒 Response time: Within 24 hours</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default HelpPage;