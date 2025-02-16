import React, { useState,useEffect } from 'react';
import { FiMail, FiLock, FiUser, FiArrowRight } from 'react-icons/fi';
import axios from 'axios';
import { useUserContext } from '../Contexts/userContext';
import { useNavigate } from 'react-router-dom';
import CompletionPopup from '../Components/CompletionPopup';

const Login = () => {

  const [isLogin, setIsLogin] = useState(true);
  const [showPopup, setShowPopup] = useState(false); 

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    username: ''
  });
  const {user, logUserIn, registerUser} = useUserContext();
  
  useEffect(() => {
    if(user.level > 8) {
      setShowPopup(true);
    }
    else if(user.loggedIn) navigate("/competition");
    // if(user.loggedIn) navigate("/upcomingCompetition");
  },[user,user.loggedIn])

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
        // const response = isLogin ? await axios.post('/api/login',formData) : await axios.post('/api/register',formData);
        isLogin ? logUserIn(formData) : registerUser(formData);
        if(!isLogin){
          setIsLogin(true);
        }
        //else navigate("/competition")
    }
    catch(err){
      isLogin ?  window.alert('log in fail') : window.alert('registration failed');
     }
     setFormData({
      email: '',
      password: '',
      username: ''
     })
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="max-w-md w-full space-y-8">
      {showPopup && <CompletionPopup onClose={() => {setShowPopup(false); navigate('/leaderboard') }} />}

        <div className="text-center">
          <h2 className="text-4xl font-bold text-white">
            {isLogin ? 'Welcome Back' : 'Join the Competition'}
          </h2>
          <p className="mt-2 text-gray-400">
            {isLogin 
              ? 'Enter your credentials to access your account' 
              : 'Create your account and start competing'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="space-y-4">
            {!isLogin && (
              <div>
                <label htmlFor="username" className="sr-only">
                  Username
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiUser className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="username"
                    name="username"
                    type="text"
                    required
                    className="block w-full pl-10 pr-3 py-3 border border-gray-700 rounded-lg bg-gray-900 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
                    placeholder="Username"
                    value={formData.username}
                    onChange={handleChange}
                  />
                </div>
              </div>
            )}

            <div>
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiMail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="block w-full pl-10 pr-3 py-3 border border-gray-700 rounded-lg bg-gray-900 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
                  placeholder="Email address"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiLock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="block w-full pl-10 pr-3 py-3 border border-gray-700 rounded-lg bg-gray-900 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          {isLogin && (
            <div className="flex items-center justify-end">
              <button
                type="button"
                className="text-sm text-red-600 hover:text-red-500"
              >
                Forgot your password?
              </button>
            </div>
          )}

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent rounded-lg text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
            >
              {isLogin ? 'Sign in' : 'Sign up'}
              <span className="absolute inset-y-0 right-0 flex items-center p-3">
                <FiArrowRight className="h-5 w-5 text-red-50 group-hover:text-red-400" />
              </span>
            </button>
          </div>
        </form>

        <div className="text-center">
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-sm text-gray-400 hover:text-white transition-colors"
          >
            {isLogin 
              ? "Don't have an account? Sign up" 
              : "Already have an account? Sign in"}
          </button>
        </div>

        <div className="absolute top-0 right-0 w-72 h-72 bg-red-600/10 rounded-full blur-3xl -z-10"></div>
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-red-600/10 rounded-full blur-3xl -z-10"></div>
      </div>
    </div>
  );
};

export default Login;