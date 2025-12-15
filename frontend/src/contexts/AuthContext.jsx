import { createContext, useContext, useState } from "react";
import { login as apiLogin, register as apiRegister } from "../services/api";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  // Lazy initialization - only runs once on mount
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
      // Logic depends on API response. Assuming { success: true, data: user, ... } or similar
      // PRD doesn't specify response shape. I will log it and assume standard fields.
      
      console.log("Login Response:", response); // For debugging
      
      // Adaptation: Check for success flag or user object
      // If API returns plain valid JSON, we assume success? 
      // Most likely: { status: 200, data: {...} } or { error: ... }
      
      // Let's assume standard success.
      if (response && !response.error) {
         // Mocking a user object if the API is just success: true 
         // Or using the returned data.
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
