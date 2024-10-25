import React, { useState, useEffect } from 'react';

function ClientModal({ isOpen, onClose, onSave, clientData }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    industry: '',
    password: ''
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (clientData) {
      setFormData({
        name: clientData.name || '',
        email: clientData.email || '',
        phoneNumber: clientData.mobile_number || '',
        industry: clientData.industry || '',
        password: ''
      });
    }
  }, [clientData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = 'Name is required';

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!emailPattern.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    if (!formData.phoneNumber) {
      newErrors.phoneNumber = 'Phone number is required';
    } else if (!/^\d{10}$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = 'Phone number must be 10 digits';
    }

    if (!clientData && !formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password && formData.password.length < 5) {
      newErrors.password = 'Password must be at least 5 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSave(formData);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">
          {clientData ? 'Edit Client' : 'Create New Client'}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="block mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
              required
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
          </div>
          <div className="mb-3">
            <label className="block mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
              required
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
          </div>
          <div className="mb-3">
            <label className="block mb-1">Phone Number</label>
            <input
              type="text"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
              required
            />
            {errors.phoneNumber && (
              <p className="text-red-500 text-sm">{errors.phoneNumber}</p>
            )}
          </div>
          <div className="mb-3">
            <label className="block mb-1">Industry</label>
            <input
              type="text"
              name="industry"
              value={formData.industry}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
            />
          </div>
          <div className="mb-3">
            <label className="block mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
              required={!clientData}
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password}</p>
            )}
          </div>
          <div className="flex justify-between">
            <button
              type="button"
              className="bg-gray-500 text-white px-4 py-2 rounded"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              {clientData ? 'Update' : 'Create'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ClientModal;
