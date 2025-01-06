import React from 'react';
import { createBrowserRouter, RouterProvider, Route, Outlet } from 'react-router-dom';
import LandingPage from './Pages/LandingPage';
import Login from './Pages/Login';
import Navbar from './Components/Navbar';

// Layout component to wrap common elements like Navbar
const Layout = () => {
  return (
    <>
      <Navbar />
      <Outlet /> {/* Renders the matched route's element */}
    </>
  );
}

// Define the routes
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <LandingPage />, // Default route for the root path
      },
      {
        path: "login",
        element: <Login />,
      },
    ],
  },
]);

const App = () => {
  return (
    <div className="min-h-screen w-full bg-purple-50 flex flex-col">
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
