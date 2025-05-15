import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Search, AlertTriangle, CheckCircle, Copy, XCircle, Info } from 'lucide-react';

import Card from '../../../components/ui/Card';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

interface ScanResult {
  url: string;
  status: 'safe' | 'suspicious' | 'malicious';
  score: number;
  details: {
    protocol: string;
    domain: string;
    tld: string;
    hasHttps: boolean;
    hasSuspiciousParams: boolean;
    hasMaliciousKeywords: boolean;
  };
}

const UrlScannerPage: React.FC = () => {
  const { t } = useTranslation();
  const [url, setUrl] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [result, setResult] = useState<ScanResult | null>(null);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(e.target.value);
    setError('');
  };

  const isValidUrl = (url: string) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  // Mock scan function - In a real app, this would call an API
  const scanUrl = async () => {
    if (!url) {
      setError('Please enter a URL');
      return;
    }

    if (!isValidUrl(url)) {
      setError('Please enter a valid URL');
      return;
    }

    setIsScanning(true);
    setResult(null);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const urlObj = new URL(url);
      
      // Analyze URL (simplified mock logic)
      const hasSuspiciousParams = /password|token|key|secret/i.test(url);
      const hasMaliciousKeywords = /phishing|hack|crack|free\-?account/i.test(url);
      const hasHttps = urlObj.protocol === 'https:';
      
      let status: 'safe' | 'suspicious' | 'malicious';
      let score: number;
      
      if (hasMaliciousKeywords) {
        status = 'malicious';
        score = Math.floor(Math.random() * 30);
      } else if (hasSuspiciousParams || !hasHttps) {
        status = 'suspicious';
        score = 30 + Math.floor(Math.random() * 40);
      } else {
        status = 'safe';
        score = 70 + Math.floor(Math.random() * 30);
      }
      
      setResult({
        url,
        status,
        score,
        details: {
          protocol: urlObj.protocol,
          domain: urlObj.hostname,
          tld: urlObj.hostname.split('.').pop() || '',
          hasHttps,
          hasSuspiciousParams,
          hasMaliciousKeywords
        }
      });
    } catch (error) {
      setError('An error occurred while scanning the URL');
    } finally {
      setIsScanning(false);
    }
  };

  const copyToClipboard = () => {
    if (result) {
      navigator.clipboard.writeText(JSON.stringify(result, null, 2));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-dark-800 dark:text-white mb-4">
            {t('tools.urlScanner.title')}
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            {t('tools.urlScanner.description')}
          </p>
        </div>
        
        <Card>
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-grow">
                <Input
                  type="url"
                  placeholder={t('tools.urlScanner.enterUrl')}
                  value={url}
                  onChange={handleInputChange}
                  error={error}
                  icon={<Search size={18} />}
                />
              </div>
              <Button
                onClick={scanUrl}
                disabled={isScanning}
                icon={<Search size={18} />}
              >
                {isScanning ? t('tools.urlScanner.scanning') : t('common.scan')}
              </Button>
            </div>
            
            {isScanning && (
              <div className="flex justify-center items-center py-8">
                <motion.div
                  className="w-12 h-12 border-4 border-primary-300 border-t-primary-600 rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                />
              </div>
            )}
            
            {result && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="space-y-6"
              >
                <div className="flex items-center justify-between p-4 rounded-lg bg-gray-50 dark:bg-dark-800">
                  <div className="flex items-center">
                    {result.status === 'safe' && (
                      <CheckCircle size={24} className="text-success-500 mr-2" />
                    )}
                    {result.status === 'suspicious' && (
                      <AlertTriangle size={24} className="text-warning-500 mr-2" />
                    )}
                    {result.status === 'malicious' && (
                      <XCircle size={24} className="text-accent-500 mr-2" />
                    )}
                    
                    <span className="font-medium">
                      {result.status === 'safe' && t('tools.urlScanner.safeUrl')}
                      {result.status === 'suspicious' && t('tools.urlScanner.suspiciousUrl')}
                      {result.status === 'malicious' && t('tools.urlScanner.maliciousUrl')}
                    </span>
                  </div>
                  
                  <div className="flex items-center">
                    <span className="text-sm mr-2">{t('tools.urlScanner.securityScore')}:</span>
                    <div className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-white" 
                      style={{
                        backgroundColor: result.score > 70 
                          ? '#38B000' 
                          : result.score > 30 
                            ? '#FFB400' 
                            : '#E63946'
                      }}
                    >
                      {result.score}
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-4">Analysis Results</h3>
                  
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-3 bg-gray-50 dark:bg-dark-800 rounded">
                        <span className="text-sm text-gray-500 dark:text-gray-400">URL</span>
                        <p className="font-mono text-sm truncate" title={result.url}>{result.url}</p>
                      </div>
                      
                      <div className="p-3 bg-gray-50 dark:bg-dark-800 rounded">
                        <span className="text-sm text-gray-500 dark:text-gray-400">Domain</span>
                        <p className="font-mono text-sm">{result.details.domain}</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="p-3 bg-gray-50 dark:bg-dark-800 rounded">
                        <span className="text-sm text-gray-500 dark:text-gray-400">Protocol</span>
                        <p className="font-mono text-sm">{result.details.protocol}</p>
                      </div>
                      
                      <div className="p-3 bg-gray-50 dark:bg-dark-800 rounded">
                        <span className="text-sm text-gray-500 dark:text-gray-400">TLD</span>
                        <p className="font-mono text-sm">{result.details.tld}</p>
                      </div>
                      
                      <div className="p-3 bg-gray-50 dark:bg-dark-800 rounded">
                        <span className="text-sm text-gray-500 dark:text-gray-400">HTTPS</span>
                        <p className="font-mono text-sm">
                          {result.details.hasHttps ? 'Yes' : 'No'}
                        </p>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <h4 className="font-medium">Security Checks</h4>
                      
                      <div className="p-3 bg-gray-50 dark:bg-dark-800 rounded flex items-center">
                        {result.details.hasHttps ? (
                          <CheckCircle size={18} className="text-success-500 mr-2" />
                        ) : (
                          <XCircle size={18} className="text-accent-500 mr-2" />
                        )}
                        <span>HTTPS Encryption</span>
                      </div>
                      
                      <div className="p-3 bg-gray-50 dark:bg-dark-800 rounded flex items-center">
                        {!result.details.hasSuspiciousParams ? (
                          <CheckCircle size={18} className="text-success-500 mr-2" />
                        ) : (
                          <AlertTriangle size={18} className="text-warning-500 mr-2" />
                        )}
                        <span>Suspicious Parameters</span>
                      </div>
                      
                      <div className="p-3 bg-gray-50 dark:bg-dark-800 rounded flex items-center">
                        {!result.details.hasMaliciousKeywords ? (
                          <CheckCircle size={18} className="text-success-500 mr-2" />
                        ) : (
                          <XCircle size={18} className="text-accent-500 mr-2" />
                        )}
                        <span>Malicious Keywords</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={copyToClipboard}
                    icon={<Copy size={16} />}
                  >
                    {copied ? t('common.copied') : t('common.copy')}
                  </Button>
                </div>
              </motion.div>
            )}
            
            {!isScanning && !result && (
              <div className="py-8 flex flex-col items-center text-center text-gray-500 dark:text-gray-400">
                <Info size={48} className="mb-4 opacity-50" />
                <p>Enter a URL above and click Scan to analyze it for security threats.</p>
              </div>
            )}
          </div>
        </Card>
        
        <div className="mt-8 p-4 bg-gray-50 dark:bg-dark-800 rounded-lg">
          <h3 className="text-lg font-medium mb-2">About this tool</h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            The URL Scanner analyzes web addresses to identify potential security threats and 
            malicious content. It checks for HTTPS encryption, suspicious parameters, and 
            keywords commonly associated with malicious websites. This tool helps you make 
            informed decisions before visiting unknown websites.
          </p>
        </div>
      </div>
    </div>
  );
};

export default UrlScannerPage;