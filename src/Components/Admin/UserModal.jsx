import React, { useState, useEffect } from 'react';

function UserModal({ isOpen, onClose, onSave, userData, clients = [] }) {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phoneNumber: '',
    client: '',
    password: '',
    panCardNumber: ''
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (userData) {
      setFormData({
        username: userData.name || '',
        email: userData.email || '',
        phoneNumber: userData.mobile_number || '',
        client: userData.client_id || '',
        password: '',
        panCardNumber: userData.panCardNumber || ''
      });
    } else {
      setFormData({
        username: '',
        email: '',
        phoneNumber: '',
        client: '',
        password: '',
        panCardNumber: ''
      });
    }
  }, [userData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.username.trim()) newErrors.username = 'Username is required';

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

    if (!formData.client) {
      newErrors.client = 'Client is required';
    }

    const panCardPattern = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
    if (!formData.panCardNumber) {
      newErrors.panCardNumber = 'PAN card number is required';
    } else if (!panCardPattern.test(formData.panCardNumber)) {
      newErrors.panCardNumber = 'Invalid PAN card format';
    }

    if (!userData && !formData.password) {
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
          {userData ? 'Edit User' : 'Create New User'}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="block mb-1">Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
              required
            />
            {errors.username && <p className="text-red-500 text-sm">{errors.username}</p>}
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
            <label className="block mb-1">Client</label>
            <select
              name="client"
              value={formData.client}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
              required
            >
              <option value="">Select Client</option>
              {clients.length > 0 ? (
                clients.map((client) => (
                  <option key={client.id} value={client.id}>
                    {client.name}
                  </option>
                ))
              ) : (
                <option value="">No Clients Available</option>
              )}
            </select>
            {errors.client && <p className="text-red-500 text-sm">{errors.client}</p>}
          </div>
          <div className="mb-3">
            <label className="block mb-1">PAN Card Number</label>
            <input
              type="text"
              name="panCardNumber"
              value={formData.panCardNumber}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
              required
            />
            {errors.panCardNumber && (
              <p className="text-red-500 text-sm">{errors.panCardNumber}</p>
            )}
          </div>
          <div className="mb-3">
            <label className="block mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
              required={!userData}
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
              {userData ? 'Update' : 'Create'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UserModal;
