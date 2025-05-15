import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShieldCheck, Code, Globe, ArrowRight, Lock, Search } from 'lucide-react';

import Button from '../components/ui/Button';
import Card from '../components/ui/Card';

const HomePage: React.FC = () => {
  const { t } = useTranslation();

  const toolCategories = [
    {
      icon: <ShieldCheck size={24} />,
      title: t('menu.securityTools'),
      description: 'Analyze URLs, detect phishing, scan ports, and more.',
      to: '/tools/security',
      color: 'bg-primary-500'
    },
    {
      icon: <Code size={24} />,
      title: t('menu.devTools'),
      description: 'Generate hashes, encode/decode text, analyze tokens and headers.',
      to: '/tools/developer',
      color: 'bg-success-500'
    },
    {
      icon: <Globe size={24} />,
      title: t('menu.webTools'),
      description: 'Enumerate subdomains, analyze robots.txt, evaluate security policies.',
      to: '/tools/web',
      color: 'bg-warning-500'
    }
  ];

  const featuredTools = [
    {
      icon: <Search size={20} />,
      title: t('tools.urlScanner.title'),
      description: t('tools.urlScanner.description'),
      to: '/tools/security/url-scanner',
    },
    {
      icon: <Globe size={20} />,
      title: t('tools.ipGeo.title'),
      description: t('tools.ipGeo.description'),
      to: '/tools/security/ip-geolocation',
    },
    {
      icon: <Lock size={20} />,
      title: t('tools.hashGenerator.title'),
      description: t('tools.hashGenerator.description'),
      to: '/tools/developer/hash-generator',
    },
    {
      icon: <Code size={20} />,
      title: t('tools.base64.title'),
      description: t('tools.base64.description'),
      to: '/tools/developer/base64',
    }
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-primary-950 to-primary-900 text-white py-20">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            {/* Background pattern */}
            <svg width="100%" height="100%">
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1"/>
              </pattern>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
          </div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <motion.h1 
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              {t('pages.home.title')}
            </motion.h1>
            
            <motion.p 
              className="text-xl md:text-2xl font-light mb-4 text-primary-200"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {t('pages.home.subtitle')}
            </motion.p>
            
            <motion.p 
              className="text-lg mb-8 text-gray-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              {t('pages.home.description')}
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row justify-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <Button 
                size="lg" 
                variant="accent"
                icon={<ArrowRight size={20} />}
              >
                <Link to="/tools/security">
                  {t('pages.home.getStarted')}
                </Link>
              </Button>
              
              <Button 
                size="lg" 
                variant="secondary"
              >
                <Link to="/tools/security">
                  {t('pages.home.exploreTools')}
                </Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Tool Categories */}
      <section className="py-16 bg-gray-50 dark:bg-dark-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-dark-800 dark:text-white mb-4">
              {t('menu.tools')}
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Comprehensive suite of cybersecurity tools to protect, analyze, and secure your digital assets.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {toolCategories.map((category, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link to={category.to}>
                  <Card interactive className="h-full">
                    <div className="flex flex-col items-center text-center">
                      <div className={`w-16 h-16 ${category.color} rounded-full flex items-center justify-center text-white mb-4`}>
                        {category.icon}
                      </div>
                      <h3 className="text-xl font-semibold mb-2">{category.title}</h3>
                      <p className="text-gray-600 dark:text-gray-400">{category.description}</p>
                    </div>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Tools */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-dark-800 dark:text-white mb-4">
              {t('pages.home.featuredTools')}
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Our most popular tools to help you secure and analyze your digital assets.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredTools.map((tool, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link to={tool.to}>
                  <Card interactive className="h-full">
                    <div className="flex flex-col">
                      <div className="flex items-center mb-4">
                        <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center text-primary-500 dark:text-primary-300 mr-3">
                          {tool.icon}
                        </div>
                        <h3 className="text-lg font-medium">{tool.title}</h3>
                      </div>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">{tool.description}</p>
                    </div>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary-600 to-primary-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to enhance your cybersecurity?</h2>
          <p className="text-lg text-primary-100 mb-8 max-w-2xl mx-auto">
            Start using our comprehensive suite of professional cybersecurity tools to protect your digital assets.
          </p>
          <Button 
            size="lg" 
            variant="accent"
            icon={<ArrowRight size={20} />}
          >
            <Link to="/tools/security">
              Get Started Now
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default HomePage;