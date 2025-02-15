import React,{useEffect} from 'react';
import axios from 'axios';
import { createBrowserRouter, RouterProvider, Outlet,useNavigate, useLocation } from 'react-router-dom';
import LandingPage from './Pages/LandingPage';
import Login from './Pages/Login';
import Navbar from './Components/Navbar';
import LeaderBoard from './Pages/LeaderBoard';
import QueryPage from './Pages/QueryPage';
import Footer from './Components/Footer';
import Banner from './Components/Banner';
import { useUserContext } from './Contexts/userContext';
import Management from './Pages/Management';

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
      },
      {
        path : "manageCompetition",
        element : <Management/>
      }
    ],
  },
]);
const PUBLIC_PAGES = ["/manageCompetition", "/login", "/"]; 

const App = () => {
  const { user, setUser } = useUserContext();
  const currentPath = window.location.pathname; 
  useEffect(() => {
    if (!user.loggedIn && PUBLIC_PAGES.includes(currentPath)) return; 
    axios.get("/api/check-session", { withCredentials: true })
      .then(response => {
        setUser(prev => ({
          ...response.data,
          loggedIn: true,
        }));
      })
      .catch(err => {
      });
  }, [currentPath]); 

  return (
    <div className="min-h-screen w-full flex flex-col">
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
