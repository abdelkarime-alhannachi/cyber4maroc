import React from 'react';
import { motion } from 'framer-motion';

interface CardProps {
  children: React.ReactNode;
  title?: string;
  icon?: React.ReactNode;
  className?: string;
  onClick?: () => void;
  interactive?: boolean;
}

const Card: React.FC<CardProps> = ({
  children,
  title,
  icon,
  className = '',
  onClick,
  interactive = false,
}) => {
  const cardContent = (
    <>
      {(title || icon) && (
        <div className="flex items-center space-x-3 p-4 border-b border-gray-200 dark:border-dark-700">
          {icon && <div className="text-primary-500 dark:text-primary-400">{icon}</div>}
          {title && <h3 className="font-medium text-lg text-dark-800 dark:text-white">{title}</h3>}
        </div>
      )}
      <div className="p-4">{children}</div>
    </>
  );

  if (interactive) {
    return (
      <motion.div
        whileHover={{ y: -4, boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)' }}
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        className={`card ${className} ${onClick ? 'cursor-pointer' : ''}`}
        onClick={onClick}
      >
        {cardContent}
      </motion.div>
    );
  }

  return (
    <div className={`card ${className}`} onClick={onClick}>
      {cardContent}
    </div>
  );
};

export default Card;