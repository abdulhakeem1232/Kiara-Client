import React, { useEffect, useState } from 'react';
import { adminAxios } from '../../Utils/Config'; 
import { adminendpoints } from '../../Service/endpoints/adminAxios';
import UserModal from './UserModal';
import ConfirmModal from './ConfirmModal';
import { toast } from 'sonner';

function UserManagement() {
  const [users, setUsers] = useState([]);
  const [clients, setClients] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null); 
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false); 
  const [userToDelete, setUserToDelete] = useState(null); 

  const fetchUsers = async () => {
    try {
      const response = await adminAxios.get(adminendpoints.userlist); 
      const clients=await adminAxios.get(adminendpoints.clientlist);
      setClients(clients.data)
      setUsers(response.data);
      console.log(response.data); 
    } catch (error) {
      console.error('Error fetching users:', error);
      toast.error('Error fetching users');
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleEdit = (userId) => {
    const user = users.find((u) => u.id === userId);
    setSelectedUser(user);
    setIsModalOpen(true); 
  };

  const handleDelete = (userId) => {
    setUserToDelete(userId); 
    setIsConfirmModalOpen(true); 
  };

  const confirmDelete = () => {
    if (userToDelete) {
      adminAxios.delete(`${adminendpoints.deletUser}/${userToDelete}`)
        .then(() => {
          setUsers(users.filter(user => user.id !== userToDelete));
          setUserToDelete(null); 
        })
        .catch((error) => {
          console.error('Error deleting user:', error);
        });
    }
    setIsConfirmModalOpen(false); 
  };
  const handleCreate = () => {
    setSelectedUser(null); 
    setIsModalOpen(true); 
  };

  const handleSave = async(formData) => {
    if (selectedUser) {
       let response = await adminAxios.put(`${adminendpoints.updateuser}/${selectedUser.id}`, formData)
       await fetchUsers();
    } else {
      let response = await adminAxios.post(adminendpoints.createuser, formData) 
     if(response.data.success==false){
      toast.error(response.data.message)
      return;
    }
      await fetchUsers();
    }
    setIsModalOpen(false);  
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
  <thead className="bg-gray-300 text-gray-600 uppercase text-sm leading-normal">
    <tr>
      <th className="py-3 px-6 text-left">Sl.No</th>
      <th className="py-3 px-6 text-left">USER Name</th>
      <th className="py-3 px-6 text-left">Email</th>
      <th className="py-3 px-6 text-left">Phone</th>
      <th className="py-3 px-6 text-center">Actions</th>
    </tr>
  </thead>
  <tbody className="text-gray-700 text-sm font-light">
    {users?.length > 0 ? (
      users.map((user, index) => (
        <tr key={user.id} className="border-b border-gray-200 hover:bg-gray-50 transition duration-300 ease-in-out">
          <td className="py-3 px-6 text-left whitespace-nowrap">{index + 1}</td>
          <td className="py-3 px-6 text-left">{user.name}</td>
          <td className="py-3 px-6 text-left">{user.email}</td>
          <td className="py-3 px-6 text-left">{user.mobile_number}</td>
          <td className="py-3 px-6 text-center">
            <button
              className="bg-blue-500 text-white py-1 px-3 rounded-full hover:bg-blue-600 transition duration-200 mr-2"
              onClick={() => handleEdit(user.id)}
            >
              Edit
            </button>
            <button
              className="bg-red-500 text-white py-1 px-3 rounded-full hover:bg-red-600 transition duration-200"
              onClick={() => handleDelete(user.id)}
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

<UserModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
        userData={selectedUser}
        clients={clients}
      />

       <ConfirmModal
        isOpen={isConfirmModalOpen}
        onClose={() => setIsConfirmModalOpen(false)}
        onConfirm={confirmDelete} 
        clientName={userToDelete ? users.find(user => user.id === userToDelete)?.name : ''} 
      />
    </div>
  );
}

export default UserManagement;
