import React,{useEffect} from 'react';
import axios from 'axios';
import { createBrowserRouter, RouterProvider, Outlet,useNavigate } from 'react-router-dom';
import LandingPage from './Pages/LandingPage';
import Login from './Pages/Login';
import Navbar from './Components/Navbar';
import LeaderBoard from './Pages/LeaderBoard';
import QueryPage from './Pages/QueryPage';
import Footer from './Components/Footer';
import Banner from './Components/Banner';
import { useUserContext } from './Contexts/userContext';

const Layout = () => {
  return (
    <>
      <Navbar />
      <Outlet /> 
      <Footer/>
    </>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <LandingPage />, 
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "leaderboard",
        element: <LeaderBoard/>
      },
      {
        path: "competition",
        element: <QueryPage/>
      },
      {
        path: "upcomingCompetition",
        element: <Banner/>
      }
    ],
  },
]);

const App = () => {
  const {user,setUser} = useUserContext();
  
  useEffect(() => {
    
    axios.get('/api/check-session', { withCredentials: true })
      .then(response => {
        setUser((prev) => ({
          ...response.data,
          loggedIn:true
      }));
      console.log('context state ',user);
      console.log('user session recovered' ,response.data);
      alert('session recovered , welcome ' + response.data.teamName);

      })
      .catch(err => {
       // console.log('Not logged in or session expired', err);
      });
  }, []);

  return (
    <div className="min-h-screen w-full flex flex-col">
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
