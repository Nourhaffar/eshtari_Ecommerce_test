import { useState } from "react";
import { login as apiLogin, register as apiRegister } from "../services/api";
import { AuthContext } from "./AuthContextBase";


export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("eshtari_user");
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const login = async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiLogin(email, password);
      console.log("Login Response:", response); 
      if (response && !response.error) {
        const userData = response.data || response.user || { email, name: "User" }; 
        setUser(userData);
        localStorage.setItem("eshtari_user", JSON.stringify(userData));
        return true;
      } else {
        throw new Error(response.error || "Login failed");
      }
    } catch (err) {
      setError(err.message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const register = async (data) => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiRegister(data);
      console.log("Register Response:", response);
      
      if (response && !response.error) {
        return true;
      } else {
        throw new Error(response.error || "Registration failed");
      }
    } catch (err) {
      setError(err.message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("eshtari_user");
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading, error }}>
      {children}
    </AuthContext.Provider>
  );
};
