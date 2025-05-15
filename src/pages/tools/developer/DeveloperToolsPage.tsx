import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Lock, 
  Code, 
  FileJson, 
  Terminal,
  FileText
} from 'lucide-react';

import Card from '../../../components/ui/Card';

const DeveloperToolsPage: React.FC = () => {
  const { t } = useTranslation();

  const devTools = [
    {
      icon: <Lock size={24} />,
      title: t('tools.hashGenerator.title'),
      description: t('tools.hashGenerator.description'),
      to: '/tools/developer/hash-generator',
      implemented: true
    },
    {
      icon: <Code size={24} />,
      title: t('tools.base64.title'),
      description: t('tools.base64.description'),
      to: '/tools/developer/base64',
      implemented: true
    },
    {
      icon: <FileJson size={24} />,
      title: 'JWT Token Analyzer',
      description: 'Decode and analyze JWT tokens to inspect their contents and verify signatures.',
      to: '/tools/developer/jwt-analyzer',
      implemented: false
    },
    {
      icon: <Terminal size={24} />,
      title: 'HTTP Header Inspector',
      description: 'Analyze HTTP headers from websites and identify security issues.',
      to: '/tools/developer/http-headers',
      implemented: false
    },
    {
      icon: <FileText size={24} />,
      title: 'Text/Payload Encoding Tools',
      description: 'Encode and decode text using various formats including URL, HTML and hexadecimal.',
      to: '/tools/developer/text-encoding',
      implemented: false
    }
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-dark-800 dark:text-white mb-4">
          {t('menu.devTools')}
        </h1>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Essential utilities for developers to hash data, encode/decode text, analyze tokens, inspect headers, and more.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {devTools.map((tool, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className={tool.implemented ? '' : 'opacity-60'}
          >
            <Link to={tool.implemented ? tool.to : '#'}>
              <Card interactive={tool.implemented} className="h-full">
                <div className="flex flex-col h-full">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-success-100 dark:bg-success-900 rounded-full flex items-center justify-center text-success-500 dark:text-success-300 mr-4">
                      {tool.icon}
                    </div>
                    <h3 className="text-xl font-medium">{tool.title}</h3>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">{tool.description}</p>
                  {!tool.implemented && (
                    <div className="mt-auto">
                      <span className="inline-block px-3 py-1 text-xs font-medium bg-gray-200 dark:bg-dark-700 text-gray-700 dark:text-gray-300 rounded-full">
                        Coming Soon
                      </span>
                    </div>
                  )}
                </div>
              </Card>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default DeveloperToolsPage;