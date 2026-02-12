import React from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
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

import ErrorBoundary from './components/ErrorBoundary';

import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <Router>
          <Toaster position="top-right" toastOptions={{ duration: 3000 }} />
          <Routes>
            {/* Public Routes */}
            <Route element={<PublicLayout><Outlet /></PublicLayout>}>
              <Route path="/" element={<Home />} />
              <Route path="/buy" element={<Buy />} />
              <Route path="/rent" element={<Rent />} />
              <Route path="/new-launch" element={<NewLaunch />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/careers" element={<Careers />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/property/:id" element={<PropertyDetails />} />
            </Route>

            {/* Admin Routes */}
            <Route path="/admin" element={
              <AuthGuard>
                <AdminLayout />
              </AuthGuard>
            }>
              <Route index element={<React.Fragment><Dashboard /></React.Fragment>} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="properties" element={<AdminProperties />} />
              <Route path="leads" element={<AdminLeads />} />
              <Route path="agents" element={<AdminAgents />} />
              <Route path="jobs" element={<AdminJobs />} />
              <Route path="logs" element={<AdminLogs />} />
            </Route>

            {/* Fallback */}
            <Route path="*" element={<div className="h-[50vh] flex items-center justify-center text-slate-500">Page not found</div>} />
          </Routes>
        </Router>
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;
