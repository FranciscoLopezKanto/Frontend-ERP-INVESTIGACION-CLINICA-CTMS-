import axios from '../axiosInstance';
import { IUser, IUpdateUser } from './types';

export const userService = {
  async getUsers(): Promise<IUser[] | []> {
    try {
      const response = await axios.get('/auth/users');
      return response.data;
    } catch (error: any) {
      console.error('❌ Error al obtener todos los usuarios:', error.response?.data || error.message);
      return [];
    }
  },
  
  async getUserById(_id: string): Promise<IUser | null> {
    try {
      const response = await axios.get(`/auth/user/${_id}`);
      return response.data;
    } catch (error: any) { 
      if (error.response?.status === 401) {
        console.warn('Token expirado al buscar usuario. Se intentará refrescar.');
      } else {
        console.error('❌ Error al obtener usuario por ID:', error);
      }
      return null;
    }
  },
    async updateDocument(_id: string, document: any): Promise<IUser | null> {
    try {
      const response = await axios.patch(`/auth/user/${_id}/documents`, document);
      return response.data;
    } catch (error: any) {
      console.error(`❌ Error al actualizar documento (${document.name}):`, error.response?.data || error.message);
      return null;
    }
  },


  async getUserByEmail(email: string): Promise<IUser | null> {
    try {
      const response = await axios.get('/auth/user', {
        params: { email }
      });
      return response.data;
    } catch (error: any) {
      if (error.response?.status === 401) {
        console.warn('Token expirado al buscar usuario. Se intentará refrescar.');
      } else {
        console.error('❌ Error al obtener usuario por email:', error);
      }
      return null;
    }
  },

  async updateUser(_id: string, updateData: IUpdateUser): Promise<IUser | null> {
    try {
      const response = await axios.put(`/auth/user/edit/${_id}`, updateData);
      return response.data;
    } catch (error: any) {
      console.error(`❌ Error al actualizar usuario (${_id}):`, error.response?.data || error.message);
      return null;
    }
  },

  async deleteUser(_id: string): Promise<string | null> {
    try {
      const response = await axios.delete(`/auth/user/${_id}`);
      return response.data;
    } catch (error: any) {
      console.error(`❌ Error al eliminar usuario (${_id}):`, error.response?.data || error.message);
      return null;
    }
  },
};
