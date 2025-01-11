import axios from "axios";
import React, { createContext, useContext, useState } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    
  const [user, setUser] = useState({teamName: '',email: '',member_count:1,level:1,loggedIn:false});

  const logUserIn = async (formData) => {
    console.log('received ', formData);
    
    try{
      const response = await axios.post('/api/login',JSON.stringify(formData),{headers:{ "Content-Type":"application/json"}, withCredentials:true})
      console.log(response.data,response.cookie);
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
      registerUser }}>
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
  
