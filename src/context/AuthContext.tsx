import { createContext, ReactNode, useState, useContext, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from 'react-router-dom';

// Define the shape of the context value
export interface AuthContextType {
  user: any;
  loginUser:  (username: string, password: string) => Promise<void>;
  logOutUser: () => void;
 
}

// Create a placeholder for default value to avoid undefined
const defaultAuthContext: AuthContextType = {
  user: null,
  loginUser: async () => {},
  logOutUser: () => {},
 
};

// Create the context with a default value
const AuthContext = createContext<AuthContextType>(defaultAuthContext);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<any>(() => localStorage.getItem('authTokens') ? jwtDecode(localStorage.getItem('authTokens')!) : null);
  const [authTokens, setAuthTokens] = useState<any>(() => localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')!) : null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const loginUser = async (username: string, password: string) => {
    const response = await fetch('http://127.0.0.1:8000/api/token/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });
    const data = await response.json();

    if (response.status === 200) {
      setAuthTokens(data);
      setUser(jwtDecode(data.access));
      localStorage.setItem('authTokens', JSON.stringify(data));
      navigate('/');
    } else {
      alert('Incorrect username or password');
    }
  };

  const logOutUser = () => {
    setAuthTokens(null);
    setUser(null);
    localStorage.removeItem('authTokens');
    navigate('/login');
  };

  const updateToken = async () => {
    console.log('updating token');
    const response = await fetch('http://127.0.0.1:8000/api/token/refresh/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ refresh: authTokens?.refresh }),
    });

    const data = await response.json();

    if (response.status === 200) {
      setAuthTokens(data);
      setUser(jwtDecode(data.access));
      localStorage.setItem('authTokens', JSON.stringify(data));
    } else {
      logOutUser();
    }

    if(loading){
      setLoading(false);
    }
  };

  useEffect(() => {
    if (loading && authTokens) {
      updateToken();
    }
  
    const fourMinutes = 1000 * 60 * 4;
    const interval = setInterval(() => {
      if (authTokens) {
        updateToken();
      }
    }, fourMinutes);
  
    return () => clearInterval(interval);
  }, [authTokens, loading]);
  




  return (
    <AuthContext.Provider value={{ user, loginUser, logOutUser }}>
      {loading ? null : children}
    </AuthContext.Provider>
  );
};

// Custom hook for using the AuthContext
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;
