// src/components/AdminDashboard.js
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
    try {
      // Update the internship status on the server
      await axios.patch(`http://localhost:3000/api/internships/${id}`, { status });
      // Optimistically update the local state to reflect the status change immediately
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
    return <div className="text-center text-gray-500">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-600">{error}</div>;
  }

  return (
    <div className="max-w-4xl p-6 mx-auto mt-10 border border-gray-300 rounded-lg shadow-lg">
      <h2 className="mb-6 text-3xl font-semibold text-center">Admin Dashboard</h2>
      <ul className="space-y-4">
        {internships.map((intern) => (
          <li key={intern._id} className="flex items-center justify-between p-4 border-b border-gray-200">
            <div>
              <h3 className="text-xl font-semibold">{intern.internName}</h3>
              <p className="text-gray-600">{intern.email}</p>
              <span
                className={`inline-block mt-2 px-4 py-2 rounded-lg text-sm ${
                  intern.status === 'pending'
                    ? 'bg-yellow-500 text-white'
                    : intern.status === 'accepted'
                    ? 'bg-green-500 text-white'
                    : 'bg-red-500 text-white'
                }`}
              >
                {intern.status}
              </span>
            </div>
            <div className="space-x-2">
              <button
                onClick={() => handleAction(intern._id, 'accepted')}
                className="px-4 py-2 text-white bg-green-600 rounded-lg hover:bg-green-700"
              >
                Accept
              </button>
              <button
                onClick={() => handleAction(intern._id, 'rejected')}
                className="px-4 py-2 text-white bg-red-600 rounded-lg hover:bg-red-700"
              >
                Reject
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminDashboard;