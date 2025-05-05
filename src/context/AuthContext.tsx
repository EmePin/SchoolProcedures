import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'admin';
  studentId?: string;
  department?: string;
  program?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: Partial<User> & { password: string }) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check for saved user on initial load
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  // In a real app, this would be an API call
  const login = async (email: string, password: string) => {
    // Mock login - in a real app, this would be an API call
    if (email === 'admin@example.com' && password === 'password') {
      const adminUser: User = {
        id: '1',
        name: 'Admin User',
        email: 'admin@example.com',
        role: 'admin',
      };
      setUser(adminUser);
      localStorage.setItem('user', JSON.stringify(adminUser));
    } else if (email === 'student@example.com' && password === 'password') {
      const studentUser: User = {
        id: '2',
        name: 'Student User',
        email: 'student@example.com',
        role: 'student',
        studentId: 'STU-2023-1234',
        department: 'Computer Science',
        program: 'BSc Computer Science',
      };
      setUser(studentUser);
      localStorage.setItem('user', JSON.stringify(studentUser));
    } else {
      throw new Error('Invalid credentials');
    }
  };

  const register = async (userData: Partial<User> & { password: string }) => {
    // Mock registration - in a real app, this would be an API call
    const newUser: User = {
      id: Math.random().toString(36).substring(2, 11),
      name: userData.name || 'New User',
      email: userData.email || '',
      role: 'student',
      studentId: `STU-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
      department: userData.department,
      program: userData.program,
    };
    
    setUser(newUser);
    localStorage.setItem('user', JSON.stringify(newUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const authValues: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isAdmin: user?.role === 'admin',
    login,
    register,
    logout,
  };

  return (
    <AuthContext.Provider value={authValues}>
      {children}
    </AuthContext.Provider>
  );
};