import React from 'react';
import { createBrowserRouter, RouterProvider, Route, Outlet } from 'react-router-dom';
import LandingPage from './Pages/LandingPage';
import Login from './Pages/Login';
import Navbar from './Components/Navbar';
import LeaderBoard from './Pages/LeaderBoard';
import QueryPage from './Pages/QueryPage';
import Footer from './Components/Footer';
import Banner from './Components/Banner';

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
  return (
    <div className="min-h-screen w-full flex flex-col">
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
