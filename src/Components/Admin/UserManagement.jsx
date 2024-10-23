import React, { useEffect, useState } from 'react'
import { adminAxios } from '../../Utils/Config'; 
import { adminendpoints } from '../../Service/endpoints/adminAxios';
import { useNavigate } from 'react-router-dom'; 

function UserManagement() {
    const [clients, setClients] = useState([]);
    const navigate = useNavigate();
    
    useEffect(() => {
      const fetchClients = async () => {
        try {
          const response = await adminAxios.get(adminendpoints.userlist); 
          setClients(response.data); 
        } catch (error) {
          console.error('Error fetching users:', error);
          toast.error('Error fetching users');
        }
      };
  
      fetchClients();
    }, []);
  
    const handleEdit = (clientId) => {
      navigate(`/admin/clients/edit/${clientId}`);
    };
  
    const handleDelete = (clientId) => {
     
      if (window.confirm('Are you sure you want to delete this client?')) {
        clientAxios.delete(`/delete/${clientId}`)
          .then(() => {
            setClients(clients.filter(client => client.id !== clientId));
          })
          .catch((error) => {
            console.error('Error deleting client:', error);
          });
      }
    };
  
    const handleCreate = () => {
      navigate('/admin/clients/create');
    };
  
    return (
      <div className="p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">User Management</h1>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            onClick={handleCreate}
          >
            Create New User
          </button>
        </div>
  
        <table className="min-w-full bg-white border border-gray-300 shadow-lg rounded-lg overflow-hidden">
  <thead className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
    <tr>
      <th className="py-3 px-6 text-left">#</th>
      <th className="py-3 px-6 text-left">Client Name</th>
      <th className="py-3 px-6 text-left">Email</th>
      <th className="py-3 px-6 text-left">Phone</th>
      <th className="py-3 px-6 text-center">Actions</th>
    </tr>
  </thead>
  <tbody className="text-gray-700 text-sm font-light">
    {clients?.length > 0 ? (
      clients.map((client, index) => (
        <tr key={client.id} className="border-b border-gray-200 hover:bg-gray-50 transition duration-300 ease-in-out">
          <td className="py-3 px-6 text-left whitespace-nowrap">{index + 1}</td>
          <td className="py-3 px-6 text-left">{client.name}</td>
          <td className="py-3 px-6 text-left">{client.email}</td>
          <td className="py-3 px-6 text-left">{client.mobile_number}</td>
          <td className="py-3 px-6 text-center">
            <button
              className="bg-blue-500 text-white py-1 px-3 rounded-full hover:bg-blue-600 transition duration-200 mr-2"
              onClick={() => handleEdit(client.id)}
            >
              Edit
            </button>
            <button
              className="bg-red-500 text-white py-1 px-3 rounded-full hover:bg-red-600 transition duration-200"
              onClick={() => handleDelete(client.id)}
            >
              Delete
            </button>
          </td>
        </tr>
      ))
    ) : (
      <tr>
        <td className="py-3 px-6 text-center" colSpan="5">
          No clients found
        </td>
      </tr>
    )}
  </tbody>
</table>

      </div>
    );
}

export default UserManagement

