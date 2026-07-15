 import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [role, setRole] = useState(localStorage.getItem("role"));
  const [id, setId] = useState(localStorage.getItem("id"));
  const [name, setName] = useState(localStorage.getItem("name"));

  const login = (loginData, userRole) => {
    localStorage.setItem("token", loginData.token);
    localStorage.setItem("role", userRole);

    if (userRole === "user") {
      localStorage.setItem("id", loginData.user.id);
      localStorage.setItem("name", loginData.user.name);

      setId(loginData.user.id);
      setName(loginData.user.name);
    } else {
      localStorage.setItem("id", loginData.admin.id);
      localStorage.setItem("name", loginData.admin.name);

      setId(loginData.admin.id);
      setName(loginData.admin.name);
    }

    setToken(loginData.token);
    setRole(userRole);
  };

  const logout = () => {
    localStorage.clear();

    setToken(null);
    setRole(null);
    setId(null);
    setName(null);
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        role,
        id,
        name,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);