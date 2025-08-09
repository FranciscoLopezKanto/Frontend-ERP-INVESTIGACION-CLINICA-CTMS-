import axios from 'axios';
import AuthController from '../context/auth.context';
import { getSessionExpiredTrigger } from '../features/utils';

const baseURL = import.meta.env.VITE_API_BASE_URL;

if (!baseURL) {
  throw new Error('VITE_API_BASE_URL is not defined');
}

const axiosInstance = axios.create({
  baseURL: baseURL,
  withCredentials: true,
});

// 🔐 Interceptor para agregar token a todas las requests
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token && !config.headers['Authorization']) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

// 🔁 Interceptor de respuesta para manejar refresh token
axiosInstance.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;

    const isLoginOrRefresh =
      originalRequest.url?.includes('/auth/login') ||
      originalRequest.url?.includes('/auth/refresh');

    if (error.response?.status === 401 && !originalRequest._retry && !isLoginOrRefresh) {
      originalRequest._retry = true;
      try {
        const refreshResponse = await axiosInstance.post('/auth/refresh');
        const newToken = refreshResponse.data.accessToken;

        localStorage.setItem('token', newToken);
        axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
        originalRequest.headers['Authorization'] = `Bearer ${newToken}`;

        const payload = JSON.parse(atob(newToken.split('.')[1]));
        AuthController.updateContext(newToken, payload);

        return axiosInstance(originalRequest);
      } catch (refreshError) {
        const trigger = getSessionExpiredTrigger();
        if (trigger) trigger();
        return Promise.reject({
          code: 'REFRESH_TOKEN_FAILED',
          message: 'No se pudo renovar la sesión',
        });
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
