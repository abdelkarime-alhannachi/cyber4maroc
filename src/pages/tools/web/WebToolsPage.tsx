import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Globe, 
  Search, 
  Shield, 
  FileText, 
  Settings
} from 'lucide-react';

import Card from '../../../components/ui/Card';

const WebToolsPage: React.FC = () => {
  const { t } = useTranslation();

  const webTools = [
    {
      icon: <Globe size={24} />,
      title: 'Subdomain Enumeration',
      description: 'Discover and map subdomains associated with a primary domain.',
      to: '/tools/web/subdomain-enum',
      implemented: false
    },
    {
      icon: <FileText size={24} />,
      title: 'Robots.txt Analyzer',
      description: 'Analyze robots.txt files to review disallowed paths and security implications.',
      to: '/tools/web/robots-analyzer',
      implemented: false
    },
    {
      icon: <Shield size={24} />,
      title: 'CSP Evaluator',
      description: 'Evaluate Content Security Policies (CSP) for security effectiveness.',
      to: '/tools/web/csp-evaluator',
      implemented: false
    }
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-dark-800 dark:text-white mb-4">
          {t('menu.webTools')}
        </h1>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Tools for web reconnaissance, discovery, and analysis of website security configurations.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {webTools.map((tool, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="opacity-60"
          >
            <Link to="#">
              <Card interactive={false} className="h-full">
                <div className="flex flex-col h-full">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-warning-100 dark:bg-warning-900 rounded-full flex items-center justify-center text-warning-500 dark:text-warning-300 mr-4">
                      {tool.icon}
                    </div>
                    <h3 className="text-xl font-medium">{tool.title}</h3>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">{tool.description}</p>
                  <div className="mt-auto">
                    <span className="inline-block px-3 py-1 text-xs font-medium bg-gray-200 dark:bg-dark-700 text-gray-700 dark:text-gray-300 rounded-full">
                      Coming Soon
                    </span>
                  </div>
                </div>
              </Card>
            </Link>
          </motion.div>
        ))}
      </div>
      
      <div className="mt-12 text-center">
        <div className="inline-flex items-center justify-center p-6 bg-gray-50 dark:bg-dark-800 rounded-lg">
          <div className="flex flex-col items-center">
            <Settings size={48} className="text-gray-400 dark:text-gray-500 mb-4" />
            <h3 className="text-xl font-medium text-dark-800 dark:text-white mb-2">More Tools Coming Soon</h3>
            <p className="text-gray-600 dark:text-gray-400 max-w-md">
              We're actively developing additional web reconnaissance tools to help you discover and analyze website security configurations.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WebToolsPage;