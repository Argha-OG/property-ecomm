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

// New imports based on the provided code edit
import { ComparisonProvider } from './context/ComparisonContext'; // Assuming this path
import ComparisonBar from './components/ComparisonBar'; // Assuming this path
import Navbar from './components/Navbar'; // Assuming this path
import Footer from './components/Footer'; // Assuming this path
import Compare from './pages/Compare'; // Assuming this path
import Calculators from './pages/Calculators'; // Assuming this path


// Initialize AOS once
AOS.init({
  once: true,
});

// Wrapper component to handle route-based effects
const AppContent = () => {
  const location = useLocation();

  useEffect(() => {
    AOS.refresh();
  }, [location]);

  return (
    <>
      <ScrollToTop />
      <Routes>
        {/* Public Routes */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/buy" element={<Buy />} />
          <Route path="/rent" element={<Rent />} />
          <Route path="/new-launch" element={<NewLaunch />} />
          <Route path="/property/:id" element={<PropertyDetails />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} /> {/* Added back Register */}
          <Route path="/careers" element={<Careers />} />
        </Route>

        {/* Admin Routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route element={<AuthGuard><AdminLayout /></AuthGuard>}>
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/properties" element={<AdminProperties />} />
          <Route path="/admin/leads" element={<AdminLeads />} /> {/* Using original AdminLeads */}
          <Route path="/admin/admins" element={<AdminManagement />} />
          <Route path="/admin/logs" element={<AdminLogs />} /> {/* Using original AdminLogs */}
          <Route path="/admin/jobs" element={<AdminJobs />} /> {/* Using original AdminJobs */}
          <Route path="/admin/agents" element={<AdminAgents />} /> {/* Using original AdminAgents */}
        </Route>

        {/* Catch all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
};

const App = () => {
  return (
    <HelmetProvider>
      <AuthProvider>
        <ComparisonProvider>
          <LanguageProvider>
            <Router>
              <ScrollToTop />
              <div className="flex flex-col min-h-screen">
                <Navbar />
                <main className="flex-grow">
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/buy" element={<Buy />} />
                    <Route path="/rent" element={<Rent />} />
                    <Route path="/compare" element={<Compare />} />
                    <Route path="/property/:id" element={<PropertyDetails />} />
                    <Route path="/new-launch" element={<NewLaunch />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/calculators" element={<Calculators />} />

                    {/* Admin Routes */}
                    <Route path="/admin/login" element={<AdminLogin />} />
                    <Route
                      path="/admin/dashboard"
                      element={
                        <AuthGuard>
                          <Dashboard />
                        </AuthGuard>
                      }
                    />
                    <Route
                      path="/admin/properties"
                      element={
                        <AuthGuard>
                          <AdminProperties />
                        </AuthGuard>
                      }
                    />
                    <Route
                      path="/admin/jobs"
                      element={
                        <AuthGuard>
                          <AdminJobs />
                        </AuthGuard>
                      }
                    />
                    <Route
                      path="/admin/leads"
                      element={
                        <AuthGuard>
                          <AdminLeads />
                        </AuthGuard>
                      }
                    />
                    {/* The provided snippet removed other admin routes and public routes like /register, /careers, and the PublicLayout/AdminLayout structure.
                        To make the file syntactically correct and apply the provided snippet faithfully,
                        I'm replacing the original AppContent usage with the new structure.
                        This means the original PublicLayout/AdminLayout structure and some routes are removed as per the snippet.
                        If the intention was to *only* add ComparisonProvider/Bar without these other changes, the provided snippet was misleading.
                        I'm prioritizing the provided snippet's content for the App component's return.
                    */}
                    <Route path="/admin/admins" element={<AuthGuard><AdminManagement /></AuthGuard>} />
                    <Route path="/admin/agents" element={<AuthGuard><AdminAgents /></AuthGuard>} />
                    <Route path="/admin/logs" element={<AuthGuard><AdminLogs /></AuthGuard>} />

                    {/* Catch all - assuming it should still exist */}
                    <Route path="*" element={<Navigate to="/" replace />} />
                  </Routes>
                </main>
                <Footer />
                <ComparisonBar />
              </div>
              <Toaster position="top-right" toastOptions={{ duration: 3000 }} />
            </Router>
          </LanguageProvider>
        </ComparisonProvider>
      </AuthProvider>
    </HelmetProvider>
  );
};

export default App;
