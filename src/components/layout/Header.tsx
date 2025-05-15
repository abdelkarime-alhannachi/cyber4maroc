import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Moon, Sun, Globe } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import Button from '../ui/Button';

const Header: React.FC = () => {
  const { t, i18n } = useTranslation();
  const { theme, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false);

  const languages = [
    { code: 'en', name: t('common.english') },
    { code: 'fr', name: t('common.french') },
    { code: 'ar', name: t('common.arabic') }
  ];

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    setIsLanguageMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    if (isLanguageMenuOpen) {
      setIsLanguageMenuOpen(false);
    }
  };

  const closeMenus = () => {
    setIsMenuOpen(false);
    setIsLanguageMenuOpen(false);
  };

  return (
    <header className="bg-white dark:bg-dark-900 border-b border-gray-200 dark:border-dark-700 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center" onClick={closeMenus}>
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

          {/* Desktop navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-dark-700 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400">
              {t('menu.home')}
            </Link>
            <div className="relative group">
              <span className="text-dark-700 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400 cursor-pointer">
                {t('menu.tools')}
              </span>
              <div className="absolute left-0 mt-2 w-48 bg-white dark:bg-dark-800 rounded-md shadow-lg py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-10">
                <Link 
                  to="/tools/security" 
                  className="block px-4 py-2 text-sm text-dark-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-700"
                >
                  {t('menu.securityTools')}
                </Link>
                <Link 
                  to="/tools/developer" 
                  className="block px-4 py-2 text-sm text-dark-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-700"
                >
                  {t('menu.devTools')}
                </Link>
                <Link 
                  to="/tools/web" 
                  className="block px-4 py-2 text-sm text-dark-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-700"
                >
                  {t('menu.webTools')}
                </Link>
              </div>
            </div>
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            <div className="relative">
              <Button 
                variant="secondary"
                size="sm"
                icon={<Globe size={16} />}
                onClick={() => setIsLanguageMenuOpen(!isLanguageMenuOpen)}
              >
                {languages.find(lang => lang.code === i18n.language)?.code.toUpperCase() || 'EN'}
              </Button>
              
              <AnimatePresence>
                {isLanguageMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-2 w-48 bg-white dark:bg-dark-800 rounded-md shadow-lg py-1 z-10"
                  >
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-dark-700 ${
                          i18n.language === lang.code 
                            ? 'text-primary-500 dark:text-primary-400 font-medium' 
                            : 'text-dark-700 dark:text-gray-300'
                        }`}
                        onClick={() => changeLanguage(lang.code)}
                      >
                        {lang.name}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
            <Button
              variant="secondary"
              size="sm"
              onClick={toggleTheme}
              icon={theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
            >
              {theme === 'dark' ? t('common.lightMode') : t('common.darkMode')}
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="text-dark-800 dark:text-white p-2"
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white dark:bg-dark-900 overflow-hidden"
          >
            <div className="px-4 py-2 space-y-1">
              <Link 
                to="/" 
                className="block px-3 py-2 rounded-md text-base font-medium text-dark-800 dark:text-white hover:bg-gray-100 dark:hover:bg-dark-800"
                onClick={closeMenus}
              >
                {t('menu.home')}
              </Link>
              
              <div>
                <button 
                  className="flex justify-between items-center w-full px-3 py-2 rounded-md text-base font-medium text-dark-800 dark:text-white hover:bg-gray-100 dark:hover:bg-dark-800"
                  onClick={() => {
                    const toolsMenu = document.getElementById('mobile-tools-menu');
                    if (toolsMenu) {
                      toolsMenu.classList.toggle('hidden');
                    }
                  }}
                >
                  <span>{t('menu.tools')}</span>
                  <span>+</span>
                </button>
                <div id="mobile-tools-menu" className="hidden pl-4">
                  <Link 
                    to="/tools/security" 
                    className="block px-3 py-2 rounded-md text-base font-medium text-dark-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-800"
                    onClick={closeMenus}
                  >
                    {t('menu.securityTools')}
                  </Link>
                  <Link 
                    to="/tools/developer" 
                    className="block px-3 py-2 rounded-md text-base font-medium text-dark-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-800"
                    onClick={closeMenus}
                  >
                    {t('menu.devTools')}
                  </Link>
                  <Link 
                    to="/tools/web" 
                    className="block px-3 py-2 rounded-md text-base font-medium text-dark-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-800"
                    onClick={closeMenus}
                  >
                    {t('menu.webTools')}
                  </Link>
                </div>
              </div>
              
              <div className="pt-4 pb-3 border-t border-gray-200 dark:border-dark-700">
                <div className="flex items-center justify-between px-3">
                  <div className="flex items-center">
                    <button
                      onClick={toggleTheme}
                      className="flex items-center px-3 py-2 rounded-md text-base font-medium text-dark-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-800"
                    >
                      {theme === 'dark' ? <Sun size={20} className="mr-2" /> : <Moon size={20} className="mr-2" />}
                      {theme === 'dark' ? t('common.lightMode') : t('common.darkMode')}
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="pt-2 pb-3">
                <div className="flex flex-col px-3 space-y-1">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => changeLanguage(lang.code)}
                      className={`flex items-center px-3 py-2 rounded-md text-base font-medium ${
                        i18n.language === lang.code 
                          ? 'text-primary-500 dark:text-primary-400 bg-gray-100 dark:bg-dark-800' 
                          : 'text-dark-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-800'
                      }`}
                    >
                      <Globe size={20} className="mr-2" />
                      {lang.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;