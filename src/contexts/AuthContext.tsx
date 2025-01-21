import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

// Define the AuthContext type
interface AuthContextType {
  isLoggedIn: boolean;
  user: { name: string; email: string; _id: string } | null;
  logout: () => Promise<void>;
}

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:3001";
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<{ name: string; email: string; _id: string } | null>(null);

  const fetchAuthStatus = async () => {
    try {
      console.log("Checking auth status...");
      const response = await axios.get(`${BACKEND_URL}/auth/status`, {
        withCredentials: true,
      });
      console.log("Auth status response:", response.data);
      setIsLoggedIn(response.data.loggedIn);
      setUser(response.data.loggedIn ? response.data.user : null);
    } catch (error) {
      console.error("Error checking auth status:", error);
      setIsLoggedIn(false);
      setUser(null);
    }
  };

  useEffect(() => {
    // Check auth status when the app loads
    fetchAuthStatus();
  
    // Check auth status on window focus (e.g., after OAuth redirect)
    const handleFocus = () => fetchAuthStatus();
    window.addEventListener("focus", handleFocus);
  
    return () => window.removeEventListener("focus", handleFocus);
  }, []);

  const logout = async () => {
    try {
      await axios.get(`${BACKEND_URL}/auth/logout`, { withCredentials: true });
      setIsLoggedIn(false);
      setUser(null);
      window.location.href = "/"; // Redirect after state update
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
