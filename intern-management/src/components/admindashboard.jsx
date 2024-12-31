import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
  const [internships, setInternships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchInternships = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/internships');
        setInternships(response.data);
      } catch (err) {
        setError('Error fetching internships');
      } finally {
        setLoading(false);
      }
    };

    fetchInternships();
  }, []);

  const handleAction = async (id, status) => {
    const message = prompt(`Enter a message for the intern (${status}):`);
    if (message === null) return; // User canceled the prompt

    try {
      await axios.patch(`http://localhost:3000/api/internships/${id}`, { status, message });
      setInternships(prevInternships =>
        prevInternships.map(intern =>
          intern._id === id ? { ...intern, status } : intern
        )
      );
    } catch (err) {
      setError('Error updating internship status');
    }
  };

  // Handle loading and error states
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="w-12 h-12 border-t-2 border-b-2 border-indigo-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-xl text-red-600">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8 bg-gradient-to-r from-purple-50 to-indigo-50">
      <div className="max-w-6xl mx-auto">
        <h2 className="mb-8 text-4xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-700">
          Admin Dashboard
        </h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {internships.map((intern) => (
            <div
              key={intern._id}
              className="relative p-6 overflow-hidden transition-shadow duration-300 bg-white border border-gray-300 shadow-lg rounded-xl hover:shadow-xl"
            >
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-indigo-500 opacity-20 blur-2xl animate-glow"></div>
              <div className="relative z-10 flex flex-col space-y-4">
                <h3 className="text-xl font-semibold text-indigo-900">{intern.internName}</h3>
                <p className="text-gray-600">{intern.email}</p>
                <div
                  className={`inline-block px-4 py-2 rounded-full text-sm font-semibold ${
                    intern.status === 'pending'
                      ? 'bg-yellow-100 text-yellow-800'
                      : intern.status === 'accepted'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  }`}
                >
                  {intern.status}
                </div>
                {intern.status === 'pending' && (
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleAction(intern._id, 'accepted')}
                      className="flex-1 px-4 py-2 text-white transition-colors duration-300 bg-green-600 border border-green-600 rounded-lg hover:bg-green-700 hover:border-green-700"
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => handleAction(intern._id, 'rejected')}
                      className="flex-1 px-4 py-2 text-white transition-colors duration-300 bg-red-600 border border-red-600 rounded-lg hover:bg-red-700 hover:border-red-700"
                    >
                      Reject
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;