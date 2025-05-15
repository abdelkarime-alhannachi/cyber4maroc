import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Globe, 
  Search, 
  Shield, 
  Server, 
  Database
} from 'lucide-react';

import Card from '../../../components/ui/Card';

const SecurityToolsPage: React.FC = () => {
  const { t } = useTranslation();

  const securityTools = [
    {
      icon: <Search size={24} />,
      title: t('tools.urlScanner.title'),
      description: t('tools.urlScanner.description'),
      to: '/tools/security/url-scanner',
      implemented: true
    },
    {
      icon: <Shield size={24} />,
      title: 'Phishing Detection',
      description: 'AI-powered phishing detection system to identify fraudulent websites.',
      to: '/tools/security/phishing-detection',
      implemented: false
    },
    {
      icon: <Server size={24} />,
      title: 'Port Scanner',
      description: 'Basic security port scanner to check for open ports and vulnerabilities.',
      to: '/tools/security/port-scanner',
      implemented: false
    },
    {
      icon: <Database size={24} />,
      title: 'DNS & Whois Lookup',
      description: 'Comprehensive DNS records and Whois information lookup.',
      to: '/tools/security/dns-whois',
      implemented: false
    },
    {
      icon: <Globe size={24} />,
      title: t('tools.ipGeo.title'),
      description: t('tools.ipGeo.description'),
      to: '/tools/security/ip-geolocation',
      implemented: true
    }
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-dark-800 dark:text-white mb-4">
          {t('menu.securityTools')}
        </h1>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Comprehensive set of tools to analyze security threats, detect vulnerabilities, and protect your digital assets.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {securityTools.map((tool, index) => (
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
                    <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center text-primary-500 dark:text-primary-300 mr-4">
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

export default SecurityToolsPage;