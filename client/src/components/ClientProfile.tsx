import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

interface Client {
  _id: string;
  fullName: string;
  appointment: {
    date: string;
    time: string;
  };
  email: string;
  note: string;
  language: string;
  clients: { fullName: string }[];
  address: {
    street: string;
    city: string;
    postalCode: string;
  };
  phoneNumbers: {
    phone1: string;
    phone2?: string;
  };
  freezer: {
    hasExtraFreezer: boolean;
    currentState: string;
    hasSpaceForExtraFreezer: boolean;
  };
  weeklyBudget: {
    meat: number;
  };
  beenConsulted: boolean;
  commandId: string | null;
  consultantId: string | null;
}

const ClientProfile: React.FC = () => {
  const { clientId } = useParams<{ clientId: string }>();
  const [client, setClient] = useState<Client | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchClient = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get(`http://localhost:7070/api/consultant/getClientById/${clientId}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        setClient(response.data);
      } catch (error) {
        navigate('/');
      }
    };

    if (clientId) {
      fetchClient();
    }
  }, [clientId, navigate]);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {client ? (
        <div className="bg-white shadow-md rounded-lg p-6 border border-gray-300">
          <h1 className="text-2xl font-semibold mb-6 text-gray-800">Client Profile</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex justify-between border-b border-gray-200 pb-2">
                <span className="font-medium text-gray-700">Full Name:</span>
                <span className="text-gray-600">{client.fullName}</span>
              </div>
              <div className="flex justify-between border-b border-gray-200 pb-2">
                <span className="font-medium text-gray-700">email:</span>
                <span className="text-gray-600">{client.email}</span>
              </div>
              <div className="flex justify-between border-b border-gray-200 pb-2">
                <span className="font-medium text-gray-700">Appointment Date:</span>
                <span className="text-gray-600">{new Date(client.appointment.date).toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between border-b border-gray-200 pb-2">
                <span className="font-medium text-gray-700">Appointment Time:</span>
                <span className="text-gray-600">{client.appointment.time}</span>
              </div>
              <div className="flex justify-between border-b border-gray-200 pb-2">
                <span className="font-medium text-gray-700">Note:</span>
                <span className="text-gray-600">{client.note}</span>
              </div>
              <div className="flex justify-between border-b border-gray-200 pb-2">
                <span className="font-medium text-gray-700">Language:</span>
                <span className="text-gray-600">{client.language}</span>
              </div>
              <div className="flex justify-between border-b border-gray-200 pb-2">
                <span className="font-medium text-gray-700">Address:</span>
                <span className="text-gray-600">{client.address.street}, {client.address.city}, {client.address.postalCode}</span>
              </div>
              <div className="flex justify-between border-b border-gray-200 pb-2">
                <span className="font-medium text-gray-700">Phone Numbers:</span>
                <span className="text-gray-600">{client.phoneNumbers.phone1}{client.phoneNumbers.phone2 ? `, ${client.phoneNumbers.phone2}` : ''}</span>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between border-b border-gray-200 pb-2">
                <span className="font-medium text-gray-700">Freezer Status:</span>
                <span className="text-gray-600">{client.freezer.hasExtraFreezer ? 'Has extra freezer' : 'No extra freezer'}</span>
              </div>
              <div className="flex justify-between border-b border-gray-200 pb-2">
                <span className="font-medium text-gray-700">Freezer State:</span>
                <span className="text-gray-600">{client.freezer.currentState}</span>
              </div>
              <div className="flex justify-between border-b border-gray-200 pb-2">
                <span className="font-medium text-gray-700">Freezer Space:</span>
                <span className="text-gray-600">{client.freezer.hasSpaceForExtraFreezer ? 'Space available for extra freezer' : 'No space for extra freezer'}</span>
              </div>
              <div className="flex justify-between border-b border-gray-200 pb-2">
                <span className="font-medium text-gray-700">Weekly Budget for Meat:</span>
                <span className="text-gray-600">${client.weeklyBudget.meat}</span>
              </div>
              <div className="flex justify-between border-b border-gray-200 pb-2">
                <span className="font-medium text-gray-700">Been Consulted:</span>
                <span className="text-gray-600">{client.beenConsulted ? 'Yes' : 'No'}</span>
              </div>
              <div className="flex justify-between border-b border-gray-200 pb-2">
                <span className="font-medium text-gray-700">Command ID:</span>
                <span className="text-gray-600">{client.commandId || 'N/A'}</span>
              </div>
              <div className="flex justify-between border-b border-gray-200 pb-2">
                <span className="font-medium text-gray-700">Consultant ID:</span>
                <span className="text-gray-600">{client.consultantId || 'N/A'}</span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p className="text-gray-500">Loading...</p>
      )}
    </div>
  );
};

export default ClientProfile;
