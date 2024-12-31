// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import InternshipForm from './components/internshipform';
import AdminDashboard from './components/admindashboard';

const App = () => {
  return (
      <Router>
        <Routes>
          <Route path="/" element={<InternshipForm />} />
        <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </Router>
  );
};

export default App;
