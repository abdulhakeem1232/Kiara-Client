import React, { useState, useEffect } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../Service/Redux/Slice/authSlice';
import { clientAxios } from '../../Utils/Config';
import { clientendpoints } from '../../Service/endpoints/clientAxios';
import io from 'socket.io-client';

// const socket = io('http://localhost:3001');
const socket = io('https://kiaramt.urbansole.tech', {
  transports: ['websocket']
});


function ClientHome() {
  const [clientDetails, setClientDetails] = useState(null);
  const [error, setError] = useState('');

  const { user,id } = useSelector((state) => state.userData);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fetchClientDetails = async () => {
    try {
      const response = await clientAxios.get(`${clientendpoints.clientData}/${user}`); 
      setClientDetails(response.data.client);
      console.log(response.data);
    } catch (error) {
      setError('Failed to fetch client details');
    }
  };

  useEffect(() => {
    fetchClientDetails();

    socket.on('clientDataUpdated', (updatedData) => {
        if(id==updatedData.id){
            console.log('Client data updated:', updatedData);
            setClientDetails(updatedData); 
        } 
      });

      socket.on('clientDeleted', (clientId) => {
        if(id==clientId){
            console.log('Client data deleted:', clientId);
            handleLogout()
        } 
      });
  

      return () => {
        socket.off('clientDataUpdated');
        socket.off('clientDeleted');
      };
  }, []);

  const handleLogout = () => {
   dispatch(logout())
   navigate('/client')
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h1 className="text-2xl font-semibold text-gray-800 mb-6">Client Dashboard</h1>

        {error && <p className="text-red-500">{error}</p>}

        {clientDetails ? (
          <div className="space-y-4">
            <div>
              <span className="block text-gray-600 font-medium">Name:</span>
              <span className="block text-lg text-gray-800">{clientDetails.name}</span>
            </div>
            <div>
              <span className="block text-gray-600 font-medium">Email:</span>
              <span className="block text-lg text-gray-800">{clientDetails.email}</span>
            </div>
            <div>
              <span className="block text-gray-600 font-medium">Mobile Number:</span>
              <span className="block text-lg text-gray-800">{clientDetails.mobile_number}</span>
            </div>
            <div>
              <span className="block text-gray-600 font-medium">Industry:</span>
              <span className="block text-lg text-gray-800">{clientDetails.industry}</span>
            </div>
          </div>
        ) : (
          <p>Loading client details...</p>
        )}

        <div className="mt-8">
          <button
            className="w-full bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default ClientHome;
