import { useEffect, useState } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Loader from './common/Loader';
import PageTitle from './components/PageTitle';
import SignIn from './pages/Authentication/SignIn';
import Dashboard from './Dashboard';
import CreateCommand from './pages/CreateCommand';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  const [loading, setLoading] = useState<boolean>(true);
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
          console.log("check auth from app")
          const response = await axios.post('http://localhost:7070/api/consultant/verifyConsultantIsLogin', {}, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          if (response.data.isAuthenticated) {
            setLoading(false);
          } else {
            setLoading(false);
            navigate('/SignIn');
          }
        } catch (error) {
          setLoading(false);
          navigate('/SignIn');
        }
      } else {
        setLoading(false);
        navigate('/SignIn');
      }
    };

    checkAuthentication();
  }, [navigate]);

  return loading ? (
    <>
      <ToastContainer></ToastContainer>
      <Loader />
    </>

  ) : (
    <>
      <ToastContainer></ToastContainer>
      <Routes>
        <Route path="/SignIn" element={<><PageTitle title="Signin SelectionLocal" /><SignIn /></>} />
        <Route path="/CreateCommand/:clientId" element={<> <PageTitle title="Create Command" /> <CreateCommand /></>} />
        <Route path="/*" element={<Dashboard />} />


      </Routes>
    </>

  );
}

export default App;
