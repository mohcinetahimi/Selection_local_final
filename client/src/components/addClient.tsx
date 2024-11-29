import React, { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import Loader from '../common/Loader';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



interface FormData {
    fullName: string;
    email: string;
    appointmentDate: string;
    appointmentTime: string;
    note: string;
    language: string;
    clientFullName: string;
    street: string;
    city: string;
    postalCode: string;
    phone1: string;
    phone2: string;
    hasExtraFreezer: boolean;
    currentState: string;
    hasSpaceForExtraFreezer: boolean;
    meatBudget: number;
}

const AddClient: React.FC = () => {
    const [formData, setFormData] = useState<FormData>({
        fullName: '',
        email: '',
        appointmentDate: '',
        appointmentTime: '',
        note: '',
        language: 'Francais',
        clientFullName: '',
        street: '',
        city: '',
        postalCode: '',
        phone1: '',
        phone2: '',
        hasExtraFreezer: false,
        currentState: 'Vide',
        hasSpaceForExtraFreezer: false,
        meatBudget: 0,
    });
    const [loading, setLoading] = useState<boolean>(false);
    const navigate = useNavigate();


    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setLoading(true);
        const token = localStorage.getItem('token');
        try {
            let DataToSend = {
                fullName: formData.fullName,
                email: formData.email,
                appointment: {
                    date: formData.appointmentDate,
                    time: formData.appointmentTime
                },
                note: formData.note,
                language: formData.language,
                clients: [{
                    fullName: formData.clientFullName
                }],
                address: {
                    street: formData.street,
                    city: formData.city,
                    postalCode: formData.postalCode
                },
                phoneNumbers: {
                    phone1: formData.phone1,
                    phone2: formData.phone2
                },
                freezer: {
                    hasExtraFreezer: formData.hasExtraFreezer,
                    currentState: formData.currentState,
                    hasSpaceForExtraFreezer: formData.hasSpaceForExtraFreezer
                },
                weeklyBudget: {
                    meat: formData.meatBudget
                }
            }
            await axios.post('http://localhost:7070/api/consultant/addclient', DataToSend, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            toast.success("Client created successfully!", {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 3000,
            });

            navigate('/Clients');
        } catch (error: any) {
            setLoading(false);
            const errorMessage = error.response?.data?.message || error.message || 'An unknown error occurred';
            toast.error(errorMessage, {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 3000, // close after 3 seconds
            });
        }
    };

    if (loading) {
        return <Loader></Loader>;
    }

    return (
        <div className="max-w-7xl mx-auto mt-10 px-4">
            <h2 className="text-2xl font-bold mb-6">Add Client</h2>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Left Column */}
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium">Full Name</label>
                        <input
                            type="text"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleChange}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Client 2 Full Name</label>
                        <input
                            type="text"
                            name="clientFullName"
                            value={formData.clientFullName}
                            onChange={handleChange}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium">Appointment Date</label>
                        <input
                            type="date"
                            name="appointmentDate"
                            value={formData.appointmentDate}
                            onChange={handleChange}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Appointment Time</label>
                        <input
                            type="time"
                            name="appointmentTime"
                            value={formData.appointmentTime}
                            onChange={handleChange}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Note</label>
                        <textarea
                            name="note"
                            value={formData.note}
                            onChange={handleChange}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                            required
                        ></textarea>
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Language</label>
                        <select
                            name="language"
                            value={formData.language}
                            onChange={handleChange}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                            required
                        >
                            <option value="Francais">Francais</option>
                            <option value="Anglais">Anglais</option>
                        </select>
                    </div>

                </div>
                {/* Right Column */}
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium">Street</label>
                        <input
                            type="text"
                            name="street"
                            value={formData.street}
                            onChange={handleChange}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium">City</label>
                        <input
                            type="text"
                            name="city"
                            value={formData.city}
                            onChange={handleChange}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Postal Code</label>
                        <input
                            type="text"
                            name="postalCode"
                            value={formData.postalCode}
                            onChange={handleChange}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Phone 1</label>
                        <input
                            type="text"
                            name="phone1"
                            value={formData.phone1}
                            onChange={handleChange}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Phone 2</label>
                        <input
                            type="text"
                            name="phone2"
                            value={formData.phone2}
                            onChange={handleChange}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                        />
                    </div>
                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            name="hasExtraFreezer"
                            checked={formData.hasExtraFreezer}
                            onChange={handleChange}
                            className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                        />
                        <label className="ml-2 text-sm font-medium">Has Extra Freezer</label>
                    </div>
                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            name="hasSpaceForExtraFreezer"
                            checked={formData.hasSpaceForExtraFreezer}
                            onChange={handleChange}
                            className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                        />
                        <label className="ml-2 text-sm font-medium">Has Space for Extra Freezer</label>
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Current Freezer State</label>
                        <select
                            name="currentState"
                            value={formData.currentState}
                            onChange={handleChange}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                            required
                        >
                            <option value="Empty">Empty</option>
                            <option value="half">half</option>
                            <option value="Full">Full</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Meat Budget weekly</label>
                        <input
                            type="number"
                            name="meatBudget"
                            value={formData.meatBudget}
                            onChange={handleChange}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                            required
                        />
                    </div>

                </div>
                <button
                    type="submit"
                    className="col-span-1 md:col-span-2 py-2 px-4 bg-blue-600 text-white font-bold rounded-md hover:bg-blue-700"
                >
                    Add Client
                </button>
            </form>
        </div>
    );
};

export default AddClient;
