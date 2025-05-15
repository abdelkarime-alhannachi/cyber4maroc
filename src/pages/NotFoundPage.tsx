import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home } from 'lucide-react';
import Button from '../components/ui/Button';

const NotFoundPage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-6xl md:text-8xl font-bold text-primary-500 dark:text-primary-400 mb-6">404</h1>
          <h2 className="text-2xl md:text-3xl font-semibold text-dark-800 dark:text-white mb-4">
            {t('pages.notFound.title')}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto">
            {t('pages.notFound.description')}
          </p>
          <Button 
            variant="primary"
            size="lg"
            icon={<Home size={20} />}
          >
            <Link to="/">
              {t('pages.notFound.backHome')}
            </Link>
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFoundPage;