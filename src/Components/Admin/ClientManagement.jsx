import React, { useEffect, useState } from 'react';
import { adminAxios } from '../../Utils/Config'; 
import { adminendpoints } from '../../Service/endpoints/adminAxios';
import ClientModal from './ClientModal';
import ConfirmModal from './ConfirmModal';
import { toast } from 'sonner';

function ClientManagement() {
  const [clients, setClients] = useState([]);
  const [selectedClient, setSelectedClient] = useState(null); 
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false); 
  const [clientToDelete, setClientToDelete] = useState(null); 

  const fetchClients = async () => {
    try {
      const response = await adminAxios.get(adminendpoints.clientlist); 
      setClients(response.data);
      console.log(response.data);
       
    } catch (error) {
      console.error('Error fetching clients:', error);
      toast.error('Error fetching users');

    }
  };

  useEffect(() => {
    fetchClients();
  }, []);

  const handleEdit = (clientId) => {
    const client = clients.find((c) => c.id === clientId);
    setSelectedClient(client);
    setIsModalOpen(true); 
  };

  const handleDelete = (clientId) => {
    setClientToDelete(clientId); 
    setIsConfirmModalOpen(true); 
  };

  const confirmDelete = () => {
    if (clientToDelete) {
      adminAxios.delete(`${adminendpoints.deletClient}/${clientToDelete}`)
        .then(() => {
          setClients(clients.filter(client => client.id !== clientToDelete));
          setClientToDelete(null); 
        })
        .catch((error) => {
          console.error('Error deleting client:', error);
        });
    }
    setIsConfirmModalOpen(false); 
  };
  const handleCreate = () => {
    setSelectedClient(null); 
    setIsModalOpen(true); 
  };

  const handleSave = async(formData) => {
    if (selectedClient) {
      let response= await adminAxios.put(`${adminendpoints.updateclient}/${selectedClient.id}`, formData)
      console.log(response);
       await fetchClients();
    } else {
    let response= await adminAxios.post(adminendpoints.createclient, formData) 
    console.log(response);
    if(!response.data.success){
      toast.error(response.data.message)
      return;
    }
      await fetchClients();
    }
    setIsModalOpen(false);  
  };
  
  
  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Client Management</h1>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          onClick={handleCreate}
        >
          Create New Client
        </button>
      </div>

      <table className="min-w-full bg-white border border-gray-300 shadow-lg rounded-lg overflow-hidden">
  <thead className="bg-gray-300 text-gray-600 uppercase text-sm leading-normal">
    <tr>
      <th className="py-3 px-6 text-left">Sl.No</th>
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
<ClientModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
        clientData={selectedClient}
      />
       <ConfirmModal
        isOpen={isConfirmModalOpen}
        onClose={() => setIsConfirmModalOpen(false)}
        onConfirm={confirmDelete} 
        clientName={clientToDelete ? clients.find(client => client.id === clientToDelete)?.name : ''} 
      />
    </div>
  );
}

export default ClientManagement;
