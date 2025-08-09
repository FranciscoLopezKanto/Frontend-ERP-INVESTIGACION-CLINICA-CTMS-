import React, { createContext, useContext, useEffect, useState } from 'react';
import axiosInstance from '../api/axiosInstance';

// Interfaces
interface User {
  email: string;
  role: string;
  userId: string;
  name?:string;
}

interface AuthContextType {
  user: User | null;
  accessToken: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

// Context
const AuthContext = createContext<AuthContextType | null>(null);

// Exportable hook para usar el contexto
export const useAuth = () => useContext(AuthContext)!;

// ✅ Singleton para actualizar contexto desde afuera (como en axiosInstance)
class AuthController {
  private static _setAccessToken: ((token: string) => void) | null = null;
  private static _setUser: ((user: User | null) => void) | null = null;

  static setAccessTokenSetter(fn: (token: string) => void) {
    AuthController._setAccessToken = fn;
  }

  static setUserSetter(fn: (user: User | null) => void) {
    AuthController._setUser = fn;
  }

  static updateContext(token: string, payload: any) {
    AuthController._setAccessToken?.(token);
    AuthController._setUser?.({
      email: payload.email,
      role: payload.role,
      userId: payload.id || payload._id || payload.userId,
    });
  }
}

export default AuthController;

// ✅ Provider del contexto
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Setter externos disponibles para axiosInstance u otros
  useEffect(() => {
    AuthController.setAccessTokenSetter(setAccessToken);
    AuthController.setUserSetter(setUser);
  }, []);

  const login = async (email: string, password: string) => {
  try {
    console.log('📤 Login payload:', { email, password }); // ✅ aquí, antes de hacer la request

    const response = await axiosInstance.post('/auth/login', { email, password });
    const token = response.data.accessToken;

    localStorage.setItem('token', token);
    setAccessToken(token);

    const payload = JSON.parse(atob(token.split('.')[1]));

    const userInfo = await axiosInstance.get(`/auth/user/${payload.id || payload.userId}`);

    setUser({
      email: payload.email,
      role: payload.role,
      userId: payload.id || payload.userId,
      name: userInfo.data.name,
    });

    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } catch (error: any) {
    console.error('❌ Error al hacer login:', error.response?.data || error.message);

    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    }

    throw new Error('Ocurrió un error al iniciar sesión');
  }
};



  const logout = async () => {
    await axiosInstance.post('/auth/logout');
    localStorage.removeItem('token');
    delete axiosInstance.defaults.headers.common['Authorization'];
    setUser(null);
    setAccessToken(null);
  };

  // Validar token guardado al iniciar la app
  useEffect(() => {
    const token = localStorage.getItem('token');

    const validateAndSetUser = (token: string) => {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        if (payload?.email && payload?.role && (payload?.id || payload?.userId)) {
          setAccessToken(token);
          setUser({
            email: payload.email,
            role: payload.role,
            userId: payload.id || payload.userId,
          });
          axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          return true;
        }
      } catch (error) {
        console.error('Token inválido:', error);
      }
      return false;
    };

    const trySilentRefresh = async () => {
      try {
        const res = await axiosInstance.post('/auth/refresh');
        const newToken = res.data.accessToken;
        if (!newToken) {
          throw new Error('No se recibió un nuevo token');
        }

        localStorage.setItem('token', newToken);
        axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
        const payload = JSON.parse(atob(newToken.split('.')[1]));
        setAccessToken(newToken);
        setUser({
          email: payload.email,
          role: payload.role,
          userId: payload.id || payload.userId,
        });
      } catch (error) {
        setAccessToken(null);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    if (token && validateAndSetUser(token)) {
      setLoading(false);
    } else {
      trySilentRefresh(); // aquí entra si no hay token válido
    }
  }, []);


  return (
    <AuthContext.Provider value={{ user, accessToken, login, logout, loading }}>
      {loading ? (
        <div
          style={{
            display: 'flex',
            height: '100vh',
            justifyContent: 'center',
            alignItems: 'center',
            fontSize: '1.2rem',
            color: '#555',
          }}
        >
          Recuperando sesión...
        </div>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};
