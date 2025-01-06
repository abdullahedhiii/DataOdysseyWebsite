import React from 'react';
import { createBrowserRouter, RouterProvider, Route, Outlet } from 'react-router-dom';
import LandingPage from './Pages/LandingPage';
import Login from './Pages/Login';
import Navbar from './Components/Navbar';
import LeaderBoard from './Pages/LeaderBoard';
import QueryPage from './Pages/QueryPage';

const Layout = () => {
  return (
    <>
      <Navbar />
      <Outlet /> 
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
