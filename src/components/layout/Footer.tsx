import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';

const Footer: React.FC = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white dark:bg-dark-900 border-t border-gray-200 dark:border-dark-700 mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Link to="/" className="flex items-center mb-4">
              <div className="w-8 h-8 mr-2">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="32" height="32">
                  <path fill="currentColor" className="text-primary-500" d="M50 5C25.2 5 5 25.2 5 50s20.2 45 45 45 45-20.2 45-45S74.8 5 50 5zm0 10c19.3 0 35 15.7 35 35S69.3 85 50 85 15 69.3 15 50s15.7-35 35-35zm0 10c-13.8 0-25 11.2-25 25s11.2 25 25 25 25-11.2 25-25-11.2-25-25-25zm0 10c8.3 0 15 6.7 15 15s-6.7 15-15 15-15-6.7-15-15 6.7-15 15-15zm0 10c-2.8 0-5 2.2-5 5s2.2 5 5 5 5-2.2 5-5-2.2-5-5-5z"/>
                  <path fill="currentColor" className="text-primary-500" d="M85 50c0-2.8-2.2-5-5-5s-5 2.2-5 5 2.2 5 5 5 5-2.2 5-5z"/>
                </svg>
              </div>
              <span className="text-xl font-bold text-primary-900 dark:text-primary-300">
                {t('common.appName')}
              </span>
            </Link>
            <p className="text-dark-700 dark:text-gray-400 text-sm mb-4">
              Your Complete Cybersecurity Toolkit
            </p>
          </div>
          
          <div>
            <h3 className="text-dark-800 dark:text-white font-medium mb-4">{t('menu.securityTools')}</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/tools/security/url-scanner" className="text-dark-700 dark:text-gray-400 hover:text-primary-500 dark:hover:text-primary-400 text-sm">
                  {t('tools.urlScanner.title')}
                </Link>
              </li>
              <li>
                <Link to="/tools/security/ip-geolocation" className="text-dark-700 dark:text-gray-400 hover:text-primary-500 dark:hover:text-primary-400 text-sm">
                  {t('tools.ipGeo.title')}
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-dark-800 dark:text-white font-medium mb-4">{t('menu.devTools')}</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/tools/developer/hash-generator" className="text-dark-700 dark:text-gray-400 hover:text-primary-500 dark:hover:text-primary-400 text-sm">
                  {t('tools.hashGenerator.title')}
                </Link>
              </li>
              <li>
                <Link to="/tools/developer/base64" className="text-dark-700 dark:text-gray-400 hover:text-primary-500 dark:hover:text-primary-400 text-sm">
                  {t('tools.base64.title')}
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-dark-800 dark:text-white font-medium mb-4">{t('common.about')}</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-dark-700 dark:text-gray-400 hover:text-primary-500 dark:hover:text-primary-400 text-sm">
                  {t('common.about')}
                </Link>
              </li>
              <li>
                <Link to="/help" className="text-dark-700 dark:text-gray-400 hover:text-primary-500 dark:hover:text-primary-400 text-sm">
                  {t('common.help')}
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-200 dark:border-dark-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-dark-700 dark:text-gray-400 text-sm">
            &copy; {currentYear} Cyber4maroc. {t('common.appName')}
          </p>
          <p className="text-dark-700 dark:text-gray-400 text-sm flex items-center mt-4 md:mt-0">
            Made with <Heart size={16} className="text-accent-500 mx-1" /> for Morocco
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;