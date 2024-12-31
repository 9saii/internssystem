import React, { useState } from 'react';
import axios from 'axios'; 


const InternshipForm = () => {
  const [formData, setFormData] = useState({
    internName: '',
    email: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3000/api/internships/submit', formData);
      alert('Internship request submitted');

    } catch (error) {
      alert('Error submitting internship request');
      console.log(error)
    }
  };

  return (
    <div className="max-w-lg p-6 mx-auto mt-10 border border-gray-300 rounded-lg shadow-lg">
      <h2 className="mb-4 text-2xl font-semibold text-center">Internship Application Form</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="internName" className="block text-gray-700">Intern Name</label>
          <input
            type="text"
            id="internName"
            name="internName"
            className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Enter your name"
            value={formData.internName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <button
          type="submit"
          className="w-full py-3 text-white transition duration-300 bg-indigo-600 rounded-lg hover:bg-indigo-700"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default InternshipForm;