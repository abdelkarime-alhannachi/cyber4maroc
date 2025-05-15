import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import Layout from './components/layout/Layout';

// Pages
import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';

// Security Tools
import SecurityToolsPage from './pages/tools/security/SecurityToolsPage';
import UrlScannerPage from './pages/tools/security/UrlScannerPage';
import IpGeolocationPage from './pages/tools/security/IpGeolocationPage';

// Developer Tools
import DeveloperToolsPage from './pages/tools/developer/DeveloperToolsPage';
import HashGeneratorPage from './pages/tools/developer/HashGeneratorPage';
import Base64Page from './pages/tools/developer/Base64Page';

// Web Reconnaissance
import WebToolsPage from './pages/tools/web/WebToolsPage';

function App() {
  return (
    <ThemeProvider>
      <Layout>
        <Routes>
          {/* Main routes */}
          <Route path="/" element={<HomePage />} />
          
          {/* Security Tools */}
          <Route path="/tools/security" element={<SecurityToolsPage />} />
          <Route path="/tools/security/url-scanner" element={<UrlScannerPage />} />
          <Route path="/tools/security/ip-geolocation" element={<IpGeolocationPage />} />
          
          {/* Developer Tools */}
          <Route path="/tools/developer" element={<DeveloperToolsPage />} />
          <Route path="/tools/developer/hash-generator" element={<HashGeneratorPage />} />
          <Route path="/tools/developer/base64" element={<Base64Page />} />
          
          {/* Web Reconnaissance */}
          <Route path="/tools/web" element={<WebToolsPage />} />
          
          {/* 404 */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Layout>
    </ThemeProvider>
  );
}

export default App;