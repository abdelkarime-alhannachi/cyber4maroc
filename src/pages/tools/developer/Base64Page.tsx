import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Code, Copy, ArrowUpDown, AlertTriangle, Info } from 'lucide-react';

import Card from '../../../components/ui/Card';
import Button from '../../../components/ui/Button';

const Base64Page: React.FC = () => {
  const { t } = useTranslation();
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
    setError('');
    
    if (mode === 'encode') {
      try {
        const encoded = btoa(e.target.value);
        setOutput(encoded);
      } catch (error) {
        setOutput('');
        // Some characters cannot be encoded directly in btoa
        try {
          // Handle UTF-8 characters properly
          const encoded = btoa(unescape(encodeURIComponent(e.target.value)));
          setOutput(encoded);
        } catch (e) {
          setError('Unable to encode text');
        }
      }
    } else {
      try {
        const decoded = atob(e.target.value);
        setOutput(decoded);
      } catch (error) {
        setOutput('');
        setError(t('tools.base64.invalidBase64'));
      }
    }
  };

  const toggleMode = () => {
    setMode(prevMode => prevMode === 'encode' ? 'decode' : 'encode');
    setInput(output);
    setOutput(input);
    setError('');
  };

  const clearAll = () => {
    setInput('');
    setOutput('');
    setError('');
  };

  const copyToClipboard = () => {
    if (output) {
      navigator.clipboard.writeText(output);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-dark-800 dark:text-white mb-4">
            {t('tools.base64.title')}
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            {t('tools.base64.description')}
          </p>
        </div>
        
        <Card>
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div className="flex space-x-3">
                <button
                  onClick={() => setMode('encode')}
                  className={`px-4 py-2 rounded-md text-sm font-medium ${
                    mode === 'encode'
                      ? 'bg-primary-500 text-white'
                      : 'bg-gray-200 dark:bg-dark-700 text-dark-700 dark:text-gray-300'
                  }`}
                >
                  {t('tools.base64.encode')}
                </button>
                <button
                  onClick={() => setMode('decode')}
                  className={`px-4 py-2 rounded-md text-sm font-medium ${
                    mode === 'decode'
                      ? 'bg-primary-500 text-white'
                      : 'bg-gray-200 dark:bg-dark-700 text-dark-700 dark:text-gray-300'
                  }`}
                >
                  {t('tools.base64.decode')}
                </button>
              </div>
              <div className="flex space-x-2">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={toggleMode}
                  icon={<ArrowUpDown size={16} />}
                >
                  Swap
                </Button>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={clearAll}
                >
                  {t('common.clear')}
                </Button>
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-dark-700 dark:text-gray-300 mb-2">
                  {mode === 'encode' ? t('tools.base64.enterText') : 'Base64 Input'}
                </label>
                <textarea
                  value={input}
                  onChange={handleInputChange}
                  className="w-full h-32 p-3 rounded-md border border-gray-300 dark:border-dark-700 bg-white dark:bg-dark-800 focus:outline-none focus:ring-2 focus:ring-primary-400"
                  placeholder={mode === 'encode' ? 'Text to encode...' : 'Base64 to decode...'}
                ></textarea>
              </div>
              
              {error && (
                <div className="p-3 bg-accent-100 dark:bg-accent-900 text-accent-800 dark:text-accent-200 rounded-md flex items-start">
                  <AlertTriangle size={16} className="mt-0.5 mr-2 flex-shrink-0" />
                  <span>{error}</span>
                </div>
              )}
              
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-sm font-medium text-dark-700 dark:text-gray-300">
                    {t('tools.base64.result')}
                  </label>
                  {output && (
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={copyToClipboard}
                      icon={<Copy size={16} />}
                    >
                      {copied ? t('common.copied') : t('common.copy')}
                    </Button>
                  )}
                </div>
                <div className="w-full h-32 p-3 rounded-md border border-gray-300 dark:border-dark-700 bg-gray-50 dark:bg-dark-800 overflow-auto">
                  <pre className="text-sm font-mono whitespace-pre-wrap break-all">{output}</pre>
                </div>
              </div>
            </div>
          </div>
        </Card>
        
        <div className="mt-8 p-4 bg-gray-50 dark:bg-dark-800 rounded-lg">
          <h3 className="text-lg font-medium mb-2">About Base64</h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
            Base64 is an encoding scheme that represents binary data in ASCII string format. It's commonly used when there's a need to encode binary data that needs to be stored and transferred over media that are designed to deal with text.
          </p>
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            <span className="font-medium">Use cases include:</span>
            <ul className="list-disc list-inside mt-1 ml-2">
              <li>Encoding email attachments (MIME)</li>
              <li>Storing complex data in JSON</li>
              <li>Embedding image data directly in HTML or CSS</li>
              <li>Transferring binary data in environments that only support text</li>
            </ul>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Base64Page;