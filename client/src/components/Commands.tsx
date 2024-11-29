import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Loader from '../common/Loader';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface Command {
    _id: string;
    orderNumber: string;
    date: string;
    consultantId: string;
    clientId: string;
    clientName: string; // Add clientName to the interface
    note?: string;
    object?: any;
}

const Commands: React.FC = () => {
    const [commands, setCommands] = useState<Command[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCommands = async () => {
            const token = localStorage.getItem('token');
            try {
                const response = await axios.get('http://localhost:7070/api/consultant/getallcommands', {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });
                setCommands(response.data.commands);
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

        fetchCommands();
    }, []);

    const handleViewClient = (clientId: string) => {
        navigate(`/client/${clientId}`);
    };

    const handleViewCommand = (commandId: string) => {
        navigate(`/commandInfo/${commandId}`);
    };

    return loading ? (
        <Loader />
    ) : (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">All Commands</h2>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-300">
                    <thead>
                        <tr className="bg-gray-200 text-left">
                            <th className="py-2 px-4 border-b">Order Number</th>
                            <th className="py-2 px-4 border-b">Client Name</th>
                            <th className="py-2 px-4 border-b">Date</th>
                            <th className="py-2 px-4 border-b">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {commands.map((command) => (
                            <tr
                                key={command._id}
                                className="bg-white hover:bg-gray-100"
                            >
                                <td className="py-2 px-4 border-b">{command.orderNumber}</td>
                                <td className="py-2 px-4 border-b">{command.clientName}</td>
                                <td className="py-2 px-4 border-b">
                                    {new Date(command.date).toLocaleDateString()}
                                </td>
                                <td className="py-2 px-4 border-b space-x-2">
                                    <button
                                        onClick={() => handleViewClient(command.clientId)}
                                        className="bg-blue-500 text-white py-1 px-3 rounded"
                                    >
                                        View Client
                                    </button>
                                    <button
                                        onClick={() => handleViewCommand(command._id)}
                                        className="bg-green-500 text-white py-1 px-3 rounded"
                                    >
                                        View Command
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

export default Commands;
