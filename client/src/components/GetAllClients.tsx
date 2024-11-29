import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Loader from '../common/Loader';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


// Define TypeScript interfaces for client data
interface Address {
  street: string;
  city: string;
  postalCode: string;
}

interface Appointment {
  date: string;
  time: string;
}

interface Client {
  _id: string;
  fullName: string;
  address: Address;
  appointment: Appointment;
  beenConsulted: boolean;
  commandId: string;
}

const GetAllClients: React.FC = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchClients = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get('http://localhost:7070/api/consultant/getallclients', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        setClients(response.data.clients);
      } catch (error: any) {
        const errorMessage = error.response?.data?.message || error.message || 'An unknown error occurred';
        toast.error(errorMessage, {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 3000, // close after 3 seconds
        });
      } finally {
        setLoading(false);
      }
    };

    fetchClients();
  }, [navigate]);

  const handleViewCommand = (commandId: string) => {
    navigate(`/commandInfo/${commandId}`);
  };
  const handleConsult = (clientId: string) => {
    navigate(`/createCommand/${clientId}`);
  };

  const handleViewProfile = (clientId: string) => {
    navigate(`/client/${clientId}`);
  };

  return loading ? (<Loader></Loader>) : (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">All Clients</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="py-2 px-4 border-b">Full Name</th>
              <th className="py-2 px-4 border-b">Address</th>
              <th className="py-2 px-4 border-b">Appointment</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {clients.map((client) => (
              <tr
                key={client._id}
                className={`${client.beenConsulted ? 'bg-green-100' : 'bg-red-100'}`}
              >
                <td className="py-2 px-4 border-b">{client.fullName}</td>
                <td className="py-2 px-4 border-b">
                  {client.address.street}, {client.address.city}, {client.address.postalCode}
                </td>
                <td className="py-2 px-4 border-b">
                  {new Date(client.appointment.date).toLocaleDateString()} - {client.appointment.time}
                </td>
                <td className="py-2 px-4 border-b space-x-2">
                  {!client.beenConsulted && (<>

                    <button
                      onClick={() => handleConsult(client._id)}
                      className="bg-red-500 text-white py-1 px-3 rounded"
                    >
                      Consult
                    </button>


                  </>

                  )}
                  {client.beenConsulted && (
                    <button
                      onClick={() => handleViewCommand(client.commandId)}
                      className="bg-green-500 text-white py-1 px-3 rounded" >
                      View Command
                    </button>
                  )}
                  <button
                    onClick={() => handleViewProfile(client._id)}
                    className="bg-blue-500 text-white py-1 px-3 rounded"
                  >
                    View Profile
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default GetAllClients;
