import React, { useState, useEffect, FormEvent } from 'react';
import Loader from '../../common/Loader';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Logo from './../../images/logo/logo.png';

const SignIn: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuthentication = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          setLoading(true);
          const response = await axios.post('http://localhost:7070/api/consultant/verifyConsultantIsLogin', {}, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          if (response.data.isAuthenticated) {
            navigate('/clients');
          } else {
            setLoading(false);
          }
        } catch (error) {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    checkAuthentication();
  }, [navigate]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post('http://localhost:7070/api/consultant/login', { email, password });
      localStorage.setItem('token', response.data.token);
      navigate('/clients');
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || error.message || 'An unknown error occurred';
      toast.error(errorMessage, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000, // close after 3 seconds
      });
      setLoading(false);
    }
  };

  return loading ? (
    <Loader />
  ) : (
    <div className="flex items-center justify-center min-h-screen bg-gray-200">
      <div className="w-full max-w-md bg-gray-900 text-white rounded-lg shadow-lg p-8">
        <div className="flex justify-center mb-6">
          <img src={Logo} alt="Logo" className="w-32 h-auto" />
        </div>
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-300">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-300 font-semibold mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-800 text-white"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-300 font-semibold mb-2" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-800 text-white"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 text-white font-bold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
