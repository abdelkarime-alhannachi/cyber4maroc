import React from 'react';

interface InputProps {
  type?: 'text' | 'email' | 'password' | 'number' | 'url';
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  id?: string;
  name?: string;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  icon?: React.ReactNode;
  className?: string;
}

const Input: React.FC<InputProps> = ({
  type = 'text',
  placeholder,
  value,
  onChange,
  label,
  id,
  name,
  error,
  required = false,
  disabled = false,
  icon,
  className = '',
}) => {
  const inputId = id || `input-${Math.random().toString(36).substring(2, 9)}`;

  return (
    <div className="space-y-2 w-full">
      {label && (
        <label 
          htmlFor={inputId} 
          className="block text-sm font-medium text-dark-700 dark:text-gray-300"
        >
          {label} {required && <span className="text-accent-500">*</span>}
        </label>
      )}
      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400">
            {icon}
          </div>
        )}
        <input
          type={type}
          id={inputId}
          name={name}
          value={value}
          onChange={onChange}
          disabled={disabled}
          required={required}
          placeholder={placeholder}
          className={`input ${icon ? 'pl-10' : ''} ${error ? 'border-accent-500 focus:ring-accent-500' : ''} ${className}`}
        />
      </div>
      {error && <p className="text-accent-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default Input;