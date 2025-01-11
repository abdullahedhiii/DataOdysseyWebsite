import axios from "axios";
import React, { createContext, useContext, useState } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    
  const [user, setUser] = useState({userName:'',email:'',level:0, loggedIn: false});

  const logUserIn = (formData) => {
    console.log('received ', formData);
    
    axios
    .post('/api/login',JSON.stringify(formData),{headers:{ "Content-Type":"application/json"}, withCredentials:true})
    .then(res => {
        console.log(res,res.cookie);
        
        setUser({...res.data,loggedIn:true});
        alert('Successfully logged in, welcome ' + res.data.userName);
    })
    .catch(err => {
        alert(err.message)
    })
  }
  
  const registerUser = (formData) => {
    axios
    .post('/api/register',JSON.stringify(formData), { headers : { "Content-Type": "application/json"}})
    .then(res => {
        alert('Registeration successful, please log in ' + formData.username);
    })
    .catch(err => {
        alert(err.message);
    })
  }

  return (
    <UserContext.Provider value={{ user, setUser, logUserIn, registerUser }}>
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
  
