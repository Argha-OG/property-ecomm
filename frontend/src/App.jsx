import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './layouts/Layout';
import Home from './pages/Home';
import PropertyDetails from './pages/PropertyDetails';
import Buy from './pages/Buy';
import Rent from './pages/Rent';
import NewLaunch from './pages/NewLaunch';
import About from './pages/About';
import Contact from './pages/Contact';
import Login from './pages/Login';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/buy" element={<Buy />} />
          <Route path="/rent" element={<Rent />} />
          <Route path="/new-launch" element={<NewLaunch />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/property/:id" element={<PropertyDetails />} />
          {/* Add more routes here later */}
          <Route path="*" element={<div className="h-[50vh] flex items-center justify-center text-slate-500">Page not found</div>} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
