import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

// Define the AuthContext type
interface AuthContextType {
  isLoggedIn: boolean;
  user: { name: string; email: string; _id: string } | null;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<{ name: string; email: string; _id: string } | null>(null);

  const fetchAuthStatus = async () => {
    try {
      const response = await axios.get("http://localhost:3001/auth/status", {
        withCredentials: true, // Ensure cookies are sent
      });
      setIsLoggedIn(response.data.loggedIn);
      setUser(response.data.loggedIn ? response.data.user : null);
    } catch (error) {
      console.error("Error checking auth status:", error);
      setIsLoggedIn(false);
      setUser(null);
    }
  };

  useEffect(() => {
    fetchAuthStatus(); // Call on component mount
  }, []);

  const logout = async () => {
    try {
      await axios.get("http://localhost:3001/auth/logout", { withCredentials: true });
      setIsLoggedIn(false);
      setUser(null);
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
