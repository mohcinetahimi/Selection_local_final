import { useEffect, useState } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './css/style.css';
import './css/satoshi.css';
import 'jsvectormap/dist/css/jsvectormap.css';
import 'flatpickr/dist/flatpickr.min.css';





import Loader from './common/Loader';
import PageTitle from './components/PageTitle';
import GetAllClients from './components/GetAllClients';
import DefaultLayout from './layout/DefaultLayout';
import Welcome from './components/Welcome';
import AddClient from './components/addClient';
import ClientProfile from './components/ClientProfile';
import Commands from './components/Commands';
import ConsultCommand from './pages/ConsultCommad';
import Products from './pages/Products';

//import CommandInfo from './pages/CommandInfo';


function Dashboard() {
  const [loading, setLoading] = useState<boolean>(false);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    const checkAuthentication = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const response = await axios.post('http://localhost:7070/api/consultant/verifyConsultantIsLogin', {}, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          if (response.data.isAuthenticated) {
            setLoading(false);
          } else {
            navigate('/SignIn');
          }
        } catch (error) {
          navigate('/SignIn');
        }
      } else {
        navigate('/SignIn');
      }
    };

    checkAuthentication();
  }, [navigate]);

  return loading ? (
    <Loader />
  ) : (
    <DefaultLayout>
      <Routes>
        <Route index element={
          <>
            <PageTitle title="Welcome To Dashboard" />
            <Welcome />
          </>
        }
        />
        <Route
          path="/Clients"
          element={
            <>
              <PageTitle title="Clients" />
              <GetAllClients></GetAllClients>
            </>
          }
        />
        <Route
          path="/AddClient"
          element={
            <>
              <PageTitle title="Add Client" />
              <AddClient />
            </>
          }
        />
        <Route
          path="/Client/:clientId"
          element={
            <>
              <PageTitle title="Client Profile" />
              <ClientProfile />
            </>
          }
        />
        <Route
          path="/Commands"
          element={
            <>
              <PageTitle title="All Commands" />
              <Commands />
            </>
          }
        />
        <Route
          path="/Products"
          element={
            <>
              <PageTitle title="Products" />
              <Products />
            </>
          }
        />
        
        
        <Route
          path="/CommandInfo/:commandId"
          element={
            <>
              <PageTitle title="Command Info" />
              <ConsultCommand></ConsultCommand>
              <br />
            </>
          }
        />
        
        


      </Routes>
    </DefaultLayout>
  );
}

export default Dashboard;
