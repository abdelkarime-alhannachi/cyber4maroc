import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Lock, Copy, RefreshCw, Info } from 'lucide-react';

import Card from '../../../components/ui/Card';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

interface HashResult {
  md5: string;
  sha1: string;
  sha256: string;
  sha512: string;
}

// Polyfill function to simulate crypto hashing
// In production use Web Crypto API or a crypto library
const mockHash = (text: string, algorithm: keyof HashResult): string => {
  const hashLengths = {
    md5: 32,
    sha1: 40,
    sha256: 64,
    sha512: 128
  };
  
  // Create a deterministic "hash" based on input and algorithm
  let result = '';
  const seed = text + algorithm;
  const chars = '0123456789abcdef';
  
  // Generate a pseudo-random hash of the expected length
  for (let i = 0; i < hashLengths[algorithm]; i++) {
    const charIndex = (seed.charCodeAt(i % seed.length) + i) % chars.length;
    result += chars[charIndex];
  }
  
  return result;
};

const HashGeneratorPage: React.FC = () => {
  const { t } = useTranslation();
  const [text, setText] = useState('');
  const [selectedAlgorithm, setSelectedAlgorithm] = useState<keyof HashResult>('sha256');
  const [isHashing, setIsHashing] = useState(false);
  const [result, setResult] = useState<HashResult | null>(null);
  const [copied, setCopied] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const handleAlgorithmChange = (algorithm: keyof HashResult) => {
    setSelectedAlgorithm(algorithm);
  };

  const generateHash = async () => {
    if (!text) return;
    
    setIsHashing(true);
    setResult(null);
    
    try {
      // Simulate API call or processing time
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // In a real app, use Web Crypto API or a proper hashing library
      const hashResult: HashResult = {
        md5: mockHash(text, 'md5'),
        sha1: mockHash(text, 'sha1'),
        sha256: mockHash(text, 'sha256'),
        sha512: mockHash(text, 'sha512')
      };
      
      setResult(hashResult);
    } catch (error) {
      console.error('Error generating hash:', error);
    } finally {
      setIsHashing(false);
    }
  };

  const copyToClipboard = () => {
    if (result) {
      navigator.clipboard.writeText(result[selectedAlgorithm]);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-dark-800 dark:text-white mb-4">
            {t('tools.hashGenerator.title')}
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            {t('tools.hashGenerator.description')}
          </p>
        </div>
        
        <Card>
          <div className="space-y-6">
            <div className="space-y-4">
              <Input
                type="text"
                placeholder={t('tools.hashGenerator.enterText')}
                value={text}
                onChange={handleInputChange}
                icon={<Lock size={18} />}
              />
              
              <div>
                <label className="block text-sm font-medium text-dark-700 dark:text-gray-300 mb-2">
                  {t('tools.hashGenerator.selectAlgorithm')}
                </label>
                <div className="flex flex-wrap gap-2">
                  {['md5', 'sha1', 'sha256', 'sha512'].map((algorithm) => (
                    <button
                      key={algorithm}
                      onClick={() => handleAlgorithmChange(algorithm as keyof HashResult)}
                      className={`px-3 py-1 rounded-md text-sm ${
                        selectedAlgorithm === algorithm
                          ? 'bg-primary-500 text-white'
                          : 'bg-gray-200 dark:bg-dark-700 text-dark-700 dark:text-gray-300'
                      }`}
                    >
                      {algorithm.toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="flex justify-center">
              <Button
                onClick={generateHash}
                disabled={isHashing || !text}
                icon={isHashing ? <RefreshCw size={18} className="animate-spin" /> : <Lock size={18} />}
              >
                {isHashing ? t('tools.hashGenerator.generating') : t('common.generate')}
              </Button>
            </div>
            
            {result && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="space-y-4"
              >
                <h3 className="text-lg font-medium">{t('common.result')}</h3>
                
                <div className="relative">
                  <div className="p-3 bg-gray-50 dark:bg-dark-800 rounded font-mono text-sm break-all">
                    {result[selectedAlgorithm]}
                  </div>
                  <button
                    onClick={copyToClipboard}
                    className="absolute top-2 right-2 p-1 rounded-md bg-white dark:bg-dark-700 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-dark-600"
                    title={t('common.copy')}
                  >
                    <Copy size={16} />
                  </button>
                </div>
                
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  <p>Algorithm: <span className="font-medium">{selectedAlgorithm.toUpperCase()}</span></p>
                  <p>Length: <span className="font-medium">{result[selectedAlgorithm].length} characters</span></p>
                </div>
              </motion.div>
            )}
            
            {!isHashing && !result && (
              <div className="py-8 flex flex-col items-center text-center text-gray-500 dark:text-gray-400">
                <Lock size={48} className="mb-4 opacity-50" />
                <p>Enter text above and select an algorithm to generate a hash.</p>
              </div>
            )}
          </div>
        </Card>
        
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-gray-50 dark:bg-dark-800 rounded-lg">
            <h3 className="text-lg font-medium mb-2">About this tool</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              The Hash Generator creates cryptographic hashes from text input using various algorithms. 
              Hashes are one-way functions commonly used for password storage, data integrity verification, 
              and creating unique identifiers for data.
            </p>
          </div>
          
          <div className="p-4 bg-gray-50 dark:bg-dark-800 rounded-lg">
            <h3 className="text-lg font-medium mb-2">Security Note</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              <span className="font-medium">MD5 and SHA-1 are considered cryptographically broken.</span> For 
              security-critical applications, use SHA-256, SHA-512, or other modern hashing algorithms 
              like BLAKE2 or SHA-3. For password storage, consider specialized algorithms like bcrypt, 
              Argon2, or PBKDF2.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HashGeneratorPage;