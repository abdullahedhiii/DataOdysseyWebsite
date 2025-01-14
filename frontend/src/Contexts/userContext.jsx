import axios from "axios";
import { io } from "socket.io-client";
import React, { createContext, useContext, useState, useEffect } from "react";

const UserContext = createContext();
let socket;

export const UserProvider = ({ children }) => {
    
  const [user, setUser] = useState({teamName: '',email: '',member_count:1,level:1,loggedIn:false});

  
  useEffect(() => {
    if(!socket){
      socket = io('http://localhost:8800', { withCredentials: true });
    }
    console.log('socket set and initialized');
    
    return ()=>{
      console.log('disconnecting socket');
      socket.disconnect();
      socket = null;
    }
     
  },[]);
  const logUserOut = async () => {
    try {
      await axios.get('/api/logout', { withCredentials: true });
      
      setUser({teamName: '',email: '',member_count:1,level:1,loggedIn:false});

      alert('Successfully logged out');
    } catch (err) {
      alert('Error logging out: ' + err.message);
    }
  };

  const logUserIn = async (formData) => {
    
    try{
      const response = await axios.post('/api/login',JSON.stringify(formData),{headers:{ "Content-Type":"application/json"}, withCredentials:true})
      setUser((prev) => ({
          ...response.data,
          loggedIn:true
      }));
      alert('Successfully logged in, welcome ' + response.data.teamName);
    }
    catch(err){
        alert(err.message)
    }
  }
  
  const registerUser = async (formData) => {
    try{
      const response = await axios.post('/api/register',JSON.stringify(formData), { headers : { "Content-Type": "application/json"}});
      alert('Registeration successful, please log in ' + formData.username);
    }
    catch(err){
      alert(err.message);

    }
  }

  return (
    <UserContext.Provider value={{ 
      user, 
      setUser, 
      logUserIn, 
      registerUser,
      logUserOut,
      socket
     }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
    const context = useContext(UserContext);
    if (!context) {
      throw new Error("useUserContext must be used within a UserProvider");
    }  
    return context;
  };
  
