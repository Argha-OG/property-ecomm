import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { HelmetProvider } from 'react-helmet-async';
import { Toaster } from 'react-hot-toast';
import { LanguageProvider } from './context/LanguageContext';
import ScrollToTop from './components/ScrollToTop';
import AOS from 'aos';
import 'aos/dist/aos.css'; // Import AOS styles

import AuthGuard from './components/AuthGuard';
import PublicLayout from './layouts/PublicLayout';
import Home from './pages/Home';
import PropertyDetails from './pages/PropertyDetails';
import Buy from './pages/Buy';
import Rent from './pages/Rent';
import NewLaunch from './pages/NewLaunch';
import About from './pages/About';
import Contact from './pages/Contact';
import Careers from './pages/Careers';
import Login from './pages/Login';
import Register from './pages/Register';
import AdminLayout from './layouts/AdminLayout';
import Dashboard from './pages/admin/Dashboard';
import AdminProperties from './pages/admin/Properties';
import AdminLeads from './pages/admin/Leads';
import AdminAgents from './pages/admin/Agents';
import AdminJobs from './pages/admin/Jobs';
import AdminLogs from './pages/admin/Logs';
import AdminLogin from './pages/admin/AdminLogin';
import AdminManagement from './pages/admin/AdminManagement';
import { ComparisonProvider } from './context/ComparisonContext';
import Compare from './pages/Compare';
import Calculators from './pages/Calculators';

// Initialized AOS outside component to prevent re-init
AOS.init({
  once: true,
});

const App = () => {
  return (
    <HelmetProvider>
      <AuthProvider>
        <ComparisonProvider>
          <LanguageProvider>
            <Router>
              <ScrollToTop />
              <Routes>
                {/* Public Routes */}
                <Route element={<PublicLayout />}>
                  <Route path="/" element={<Home />} />
                  <Route path="/buy" element={<Buy />} />
                  <Route path="/rent" element={<Rent />} />
                  <Route path="/compare" element={<Compare />} />
                  <Route path="/property/:id" element={<PropertyDetails />} />
                  <Route path="/new-launch" element={<NewLaunch />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/calculators" element={<Calculators />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/careers" element={<Careers />} />
                </Route>

                {/* Admin Routes */}
                <Route path="/admin/login" element={<AdminLogin />} />

                <Route element={<AuthGuard><AdminLayout /></AuthGuard>}>
                  <Route path="/admin/dashboard" element={<Dashboard />} />
                  <Route path="/admin/properties" element={<AdminProperties />} />
                  <Route path="/admin/leads" element={<AdminLeads />} />
                  <Route path="/admin/admins" element={<AdminManagement />} />
                  <Route path="/admin/logs" element={<AdminLogs />} />
                  <Route path="/admin/jobs" element={<AdminJobs />} />
                  <Route path="/admin/agents" element={<AdminAgents />} />
                </Route>

                {/* Catch all */}
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
              <Toaster position="top-right" toastOptions={{ duration: 3000 }} />
            </Router>
          </LanguageProvider>
        </ComparisonProvider>
      </AuthProvider>
    </HelmetProvider>
  );
};

export default App;
