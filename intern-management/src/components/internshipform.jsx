import React, { useState } from 'react';
import axios from 'axios';

const InternshipForm = () => {
  const [formData, setFormData] = useState({
    internName: '',
    email: '',
    position: '',
    phoneNumber: '',
    address: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3000/api/internships/submit', formData);
      alert('Internship request submitted successfully!');
      setFormData({
        internName: '',
        email: '',
        position: '',
        phoneNumber: '',
        address: '',
      }); // Reset the entire form after submission
    } catch (error) {
      alert('Error submitting internship request');
      console.error(error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-500 to-indigo-600">
      <div className="relative w-full max-w-md p-8 overflow-hidden transition-all duration-300 transform bg-white shadow-2xl rounded-xl hover:scale-105">
        {/* Glow effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-indigo-500 opacity-20 blur-2xl animate-glow"></div>
        <h2 className="mb-6 text-3xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-700">
          Internship Application
        </h2>
        <form onSubmit={handleSubmit} className="relative z-10 space-y-6">
          <div>
            <label htmlFor="internName" className="block text-sm font-medium text-gray-700">
              Intern Name
            </label>
            <input
              type="text"
              id="internName"
              name="internName"
              value={formData.internName}
              onChange={handleChange}
              className="block w-full px-4 py-3 mt-1 transition-all duration-300 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              placeholder="Enter your name"
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="block w-full px-4 py-3 mt-1 transition-all duration-300 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              placeholder="Enter your email"
              required
            />
          </div>
          <div>
            <label htmlFor="position" className="block text-sm font-medium text-gray-700">
              Position
            </label>
            <input
              type="text"
              id="position"
              name="position"
              value={formData.position}
              onChange={handleChange}
              className="block w-full px-4 py-3 mt-1 transition-all duration-300 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              placeholder="Enter the position you're applying for"
              required
            />
          </div>
          <div>
            <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">
              Phone Number
            </label>
            <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              className="block w-full px-4 py-3 mt-1 transition-all duration-300 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              placeholder="Enter your phone number"
              required
            />
          </div>
          <div>
            <label htmlFor="address" className="block text-sm font-medium text-gray-700">
              Address
            </label>
            <textarea
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="block w-full px-4 py-3 mt-1 transition-all duration-300 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              placeholder="Enter your address"
              required
            />
          </div>

          {/* Submit button */}
          <div>
            <button
              type="submit"
              className="w-full px-4 py-3 font-semibold text-white transition-all duration-300 rounded-lg shadow-lg bg-gradient-to-r from-purple-600 to-indigo-700 hover:shadow-xl hover:from-purple-700 hover:to-indigo-800 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
            >
              Submit Application
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InternshipForm;
