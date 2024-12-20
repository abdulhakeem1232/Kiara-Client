import React, { useState, useEffect } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../Service/Redux/Slice/authSlice';
import { userAxios } from '../../Utils/Config';
import { userendpoints } from '../../Service/endpoints/userAxios';
import io from 'socket.io-client';

// const socket = io('http://localhost:3001');
const socket = io('https://kiaramt.urbansole.tech', {
  transports: ['websocket'],
  reconnectionAttempts: 5 
});


function ClientHome() {
  const [userDetails, setUserDetails] = useState(null);
  const [error, setError] = useState('');

  const { user,id } = useSelector((state) => state.userData);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fetchUserDetails = async () => {
    try {
      const response = await userAxios.get(`${userendpoints.userData}/${user}`); 
      setUserDetails(response.data.user);
      console.log('w',response.data);
    } catch (error) {
      setError('Failed to fetch user details');
    }
  };

  useEffect(() => {
    fetchUserDetails();

    socket.on('userDataUpdated', (updatedData) => {
        if(id==updatedData.id){
            console.log('user data updated:', updatedData);
            setUserDetails(updatedData); 
        } 
      });

      
    socket.on('userDeleted', (userId) => {
        if(id==userId){
            console.log('user data deleted:', userId);
            handleLogout()
        } 
      });
  

      return () => {
        socket.off('userDataUpdated');
      };
  }, []);

  const handleLogout = () => {
   dispatch(logout())
   navigate('/')
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h1 className="text-2xl font-semibold text-gray-800 mb-6">User Dashboard</h1>

        {error && <p className="text-red-500">{error}</p>}

        {userDetails ? (
          <div className="space-y-4">
            <div>
              <span className="block text-gray-600 font-medium">Name:</span>
              <span className="block text-lg text-gray-800">{userDetails.name}</span>
            </div>
            <div>
              <span className="block text-gray-600 font-medium">Email:</span>
              <span className="block text-lg text-gray-800">{userDetails.email}</span>
            </div>
            <div>
              <span className="block text-gray-600 font-medium">Mobile Number:</span>
              <span className="block text-lg text-gray-800">{userDetails.mobile_number}</span>
            </div>
            <div>
              <span className="block text-gray-600 font-medium">Industry:</span>
              <span className="block text-lg text-gray-800">{userDetails.client_id}</span>
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
