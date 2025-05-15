import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { MapPin, Globe, Info, Copy, Server } from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

import Card from '../../../components/ui/Card';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

interface GeoResult {
  ip: string;
  location: {
    country: string;
    region: string;
    city: string;
    lat: number;
    lng: number;
    timezone: string;
  };
  isp: string;
  asn?: number;
}

const IpGeolocationPage: React.FC = () => {
  const { t } = useTranslation();
  const [ip, setIp] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<GeoResult | null>(null);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);
  const [showMap, setShowMap] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIp(e.target.value);
    setError('');
  };

  const isValidIp = (ip: string) => {
    // Basic IPv4 validation - more comprehensive regex would be used in production
    const ipv4Regex = /^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/;
    if (!ipv4Regex.test(ip)) return false;
    
    const parts = ip.split('.');
    for (const part of parts) {
      const num = parseInt(part, 10);
      if (num < 0 || num > 255) return false;
    }
    
    return true;
  };

  // Mock lookup function - In a real app, this would call an API
  const lookupIp = async () => {
    if (!ip) {
      setError('Please enter an IP address');
      return;
    }

    if (!isValidIp(ip)) {
      setError('Please enter a valid IP address');
      return;
    }

    setIsLoading(true);
    setResult(null);
    setShowMap(false);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock data - in a real app this would come from a geolocation API
      const mockResults: Record<string, GeoResult> = {
        '8.8.8.8': {
          ip: '8.8.8.8',
          location: {
            country: 'United States',
            region: 'California',
            city: 'Mountain View',
            lat: 37.4056,
            lng: -122.0775,
            timezone: 'America/Los_Angeles'
          },
          isp: 'Google LLC',
          asn: 15169
        },
        '1.1.1.1': {
          ip: '1.1.1.1',
          location: {
            country: 'Australia',
            region: 'Queensland',
            city: 'Brisbane',
            lat: -27.4698,
            lng: 153.0251,
            timezone: 'Australia/Brisbane'
          },
          isp: 'Cloudflare, Inc',
          asn: 13335
        }
      };
      
      if (ip in mockResults) {
        setResult(mockResults[ip]);
      } else {
        // Generate random location for any other IP
        const lat = (Math.random() * 180) - 90;
        const lng = (Math.random() * 360) - 180;
        
        setResult({
          ip: ip,
          location: {
            country: 'Unknown',
            region: 'Unknown',
            city: 'Unknown',
            lat,
            lng,
            timezone: 'Unknown'
          },
          isp: 'Unknown'
        });
      }
      
      // Delay map rendering to ensure it initializes properly
      setTimeout(() => setShowMap(true), 100);
    } catch (error) {
      setError('An error occurred while looking up the IP');
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = () => {
    if (result) {
      navigator.clipboard.writeText(JSON.stringify(result, null, 2));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // Detect user's IP on load
  useEffect(() => {
    const detectIp = async () => {
      try {
        // In a real app, we'd use an API like ipify
        // For this demo, just set a placeholder
        setIp('8.8.8.8');
      } catch (error) {
        console.error('Error detecting IP:', error);
        setIp('');
      }
    };
    
    detectIp();
  }, []);

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-dark-800 dark:text-white mb-4">
            {t('tools.ipGeo.title')}
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            {t('tools.ipGeo.description')}
          </p>
        </div>
        
        <Card>
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-grow">
                <Input
                  type="text"
                  placeholder={t('tools.ipGeo.enterIp')}
                  value={ip}
                  onChange={handleInputChange}
                  error={error}
                  icon={<Globe size={18} />}
                />
              </div>
              <Button
                onClick={lookupIp}
                disabled={isLoading}
                icon={<MapPin size={18} />}
              >
                {isLoading ? t('tools.ipGeo.lookingUp') : t('common.search')}
              </Button>
            </div>
            
            {isLoading && (
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
                {showMap && (
                  <div className="rounded-lg overflow-hidden border border-gray-200 dark:border-dark-700">
                    <MapContainer 
                      center={[result.location.lat, result.location.lng]} 
                      zoom={5} 
                      scrollWheelZoom={false}
                    >
                      <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                      />
                      <Marker position={[result.location.lat, result.location.lng]}>
                        <Popup>
                          {result.ip}<br/>
                          {result.location.city}, {result.location.country}
                        </Popup>
                      </Marker>
                    </MapContainer>
                  </div>
                )}
                
                <div>
                  <h3 className="text-lg font-medium mb-4">IP Information</h3>
                  
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-3 bg-gray-50 dark:bg-dark-800 rounded">
                        <span className="text-sm text-gray-500 dark:text-gray-400">IP Address</span>
                        <p className="font-mono text-sm">{result.ip}</p>
                      </div>
                      
                      <div className="p-3 bg-gray-50 dark:bg-dark-800 rounded">
                        <span className="text-sm text-gray-500 dark:text-gray-400">ISP</span>
                        <p className="font-mono text-sm">{result.isp}</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="p-3 bg-gray-50 dark:bg-dark-800 rounded">
                        <span className="text-sm text-gray-500 dark:text-gray-400">{t('tools.ipGeo.country')}</span>
                        <p className="font-mono text-sm">{result.location.country}</p>
                      </div>
                      
                      <div className="p-3 bg-gray-50 dark:bg-dark-800 rounded">
                        <span className="text-sm text-gray-500 dark:text-gray-400">{t('tools.ipGeo.region')}</span>
                        <p className="font-mono text-sm">{result.location.region}</p>
                      </div>
                      
                      <div className="p-3 bg-gray-50 dark:bg-dark-800 rounded">
                        <span className="text-sm text-gray-500 dark:text-gray-400">{t('tools.ipGeo.city')}</span>
                        <p className="font-mono text-sm">{result.location.city}</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-3 bg-gray-50 dark:bg-dark-800 rounded">
                        <span className="text-sm text-gray-500 dark:text-gray-400">{t('tools.ipGeo.timezone')}</span>
                        <p className="font-mono text-sm">{result.location.timezone}</p>
                      </div>
                      
                      <div className="p-3 bg-gray-50 dark:bg-dark-800 rounded">
                        <span className="text-sm text-gray-500 dark:text-gray-400">{t('tools.ipGeo.coordinates')}</span>
                        <p className="font-mono text-sm">{result.location.lat}, {result.location.lng}</p>
                      </div>
                    </div>
                    
                    {result.asn && (
                      <div className="p-3 bg-gray-50 dark:bg-dark-800 rounded">
                        <span className="text-sm text-gray-500 dark:text-gray-400">ASN</span>
                        <p className="font-mono text-sm">AS{result.asn}</p>
                      </div>
                    )}
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
            
            {!isLoading && !result && (
              <div className="py-8 flex flex-col items-center text-center text-gray-500 dark:text-gray-400">
                <Server size={48} className="mb-4 opacity-50" />
                <p>Enter an IP address above and click Search to get geolocation information.</p>
                <p className="text-sm mt-2">Try example IPs: 8.8.8.8 or 1.1.1.1</p>
              </div>
            )}
          </div>
        </Card>
        
        <div className="mt-8 p-4 bg-gray-50 dark:bg-dark-800 rounded-lg">
          <h3 className="text-lg font-medium mb-2">About this tool</h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            The IP Geolocation tool helps you locate IP addresses on a map and provides 
            detailed information about their geographic location, service provider, and network. 
            This can be useful for network troubleshooting, security analysis, and understanding 
            the origin of network traffic.
          </p>
        </div>
      </div>
    </div>
  );
};

export default IpGeolocationPage;