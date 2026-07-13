import { createContext, useContext, useState } from "react";
const AuthContext=createContext();

 

export const AuthProvider=({children})=>{
    const [token, setToken] = useState(localStorage.getItem("token"));

  const login = (logindata) => {
     localStorage.setItem("token",logindata.token);
     localStorage.setItem("id",logindata.user.id)
     localStorage.setItem("id",logindata.user.name);
     setToken(logindata.token)
  };

  const logout = () => {
    localStorage.clear();
    setToken(null);
  };
  return(
    <AuthContext.Provider value={{login,logout,token}}>
        {children}
    </AuthContext.Provider>
  );
}
export const useAuth = () => useContext(AuthContext);