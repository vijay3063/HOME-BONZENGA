import React, { createContext, useContext, useEffect, useState } from "react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import usersData from "@/data/users.json";

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: "ADMIN" | "MANAGER" | "VENDOR" | "CUSTOMER" | "BEAUTICIAN";
  status: string;
  avatar?: string;
  vendor?: {
    id: string;
    shopName: string;
    status: string;
  };
  name?: string; // 👈 computed for convenience
}

interface RegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone?: string;
  role: "CUSTOMER" | "VENDOR" | "BEAUTICIAN";
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean; // ✅ renamed from 'loading' to 'isLoading'
  login: (email: string, password: string) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
  refreshToken: () => Promise<void>;
  getDashboardPath: () => string;
  redirectToDashboard: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Check for stored user data
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const userData = JSON.parse(storedUser);
        setUser(userData);
      } catch (error) {
        console.error("Failed to parse stored user data:", error);
        localStorage.removeItem("user");
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // Find user in static JSON data
      const userData = usersData.find(user => user.email === email && user.password === password);
      
      if (!userData) {
        toast.error("Invalid email or password");
        throw new Error("Invalid credentials");
      }

      // Map role from JSON to our interface
      const roleMapping = {
        "admin": "ADMIN",
        "manager": "MANAGER", 
        "vendor": "VENDOR",
        "beautician": "BEAUTICIAN",
        "user": "CUSTOMER"
      } as const;

      // Create user object
      const user: User = {
        id: `static-${userData.role}-${Date.now()}`,
        email: userData.email,
        firstName: userData.firstName,
        lastName: userData.lastName,
        role: roleMapping[userData.role as keyof typeof roleMapping],
        status: "ACTIVE",
        name: `${userData.firstName} ${userData.lastName}`
      };

      // Store user data
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", "static-demo-token");
      setUser(user);
      toast.success("Login successful");
      
      // Always redirect to home page first after login
      navigate("/");
    } catch (err) {
      console.error(err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (data: RegisterData) => {
    setIsLoading(true);
    try {
      const res = await fetch("http://localhost:3001/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Registration failed");
      }

      const result = await res.json();
      localStorage.setItem("user", JSON.stringify(result.user));
      localStorage.setItem("token", result.accessToken);
      setUser(result.user);
      toast.success("Registration successful");
    } catch (err) {
      toast.error("Registration failed");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    toast.success("Logged out");
  };

  const refreshToken = async () => {
    try {
      const storedUser = localStorage.getItem("user");
      if (storedUser) setUser(JSON.parse(storedUser));
    } catch (err) {
      logout();
      throw err;
    }
  };

  const getDashboardPath = (userRole?: string) => {
    const role = userRole || user?.role;
    if (!role) return '/';
    
    switch (role) {
      case 'ADMIN':
        return '/admin';
      case 'MANAGER':
        return '/manager';
      case 'VENDOR':
        return '/vendor';
      case 'BEAUTICIAN':
        return '/beautician';
      case 'CUSTOMER':
      default:
        return '/customer';
    }
  };

  const redirectToDashboard = () => {
    const dashboardPath = getDashboardPath();
    navigate(dashboardPath);
  };

  return (
    <AuthContext.Provider
      value={{ user, isLoading, login, register, logout, refreshToken, getDashboardPath, redirectToDashboard }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
};
