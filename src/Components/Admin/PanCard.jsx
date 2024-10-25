import React, { useState } from 'react';
import axios from 'axios';
import { panAxios } from '../../Utils/Config';
import { adminendpoints } from '../../Service/endpoints/adminAxios';

function PanCard() {
  const [pan, setPan] = useState('');
  const [validationResult, setValidationResult] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  const handlePanChange = (e) => {
    setPan(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setValidationResult(null);
    setErrorMessage('');

    try {
      const response = await panAxios.post(adminendpoints.validatePan,{ pan: pan.trim() },
      );
      setValidationResult(response.data);
    } catch (error) {
      if (error.response && error.response.data) {
        setErrorMessage(error.response.data.message || 'PAN validation failed.');
      } else {
        setErrorMessage('An error occurred. Please try again.');
      }
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 p-6">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">PAN Card Validation</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <label htmlFor="pan" className="block text-sm font-medium text-gray-700">
            Enter PAN Number:
          </label>
          <input
            type="text"
            id="pan"
            value={pan}
            onChange={handlePanChange}
            placeholder="ABCDE1234F"
            maxLength="10"
            required
            className="w-full border border-gray-300 rounded-md p-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
          <button
            type="submit"
            className="w-full py-2 px-4 bg-indigo-600 text-white rounded-md font-semibold hover:bg-indigo-700 focus:outline-none"
          >
            Validate
          </button>
        </form>

        {errorMessage && (
          <p className="mt-4 text-red-500 text-center">{errorMessage}</p>
        )}

        {validationResult && (
          <div className="mt-6 bg-gray-50 p-4 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Validation Result:</h3>
            <p className="text-sm text-gray-700">Status: <span className="font-medium">{validationResult.statusMsg}</span></p>
            {validationResult.result && (
              <div className="mt-4 space-y-2 text-sm text-gray-700">
                <p><strong>PAN:</strong> {validationResult.data.pan_number}</p>
                <p><strong>Name:</strong> {validationResult.data.name}</p>
                <p><strong>DOB Match:</strong> {validationResult.data.dob_match}</p>
                <p><strong>PAN Active:</strong> {validationResult.data.pan_active}</p>
                <p><strong>Aadhaar Seeding Status:</strong> {validationResult.data.aadhaar_seeding_status}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default PanCard;
