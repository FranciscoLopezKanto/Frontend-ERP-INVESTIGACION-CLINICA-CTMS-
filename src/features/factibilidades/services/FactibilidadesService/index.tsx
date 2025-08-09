import axios from '../../../../api/axiosInstance';
import { Factibilidad } from './types'; 

export const factibilidadesService = {
  getFactibilidades: () => axios.get<Factibilidad[]>('/feasibilities'),

  getFactibilidadById: (id: string) => axios.get<Factibilidad>(`/feasibilities/${id}`),

  createFactibilidad: (data: Partial<Factibilidad>) => axios.post('/feasibilities', data),

  updateFactibilidad: (id: string, data: Partial<Factibilidad>) =>
    axios.put(`/feasibilities/${id}`, data),
  deleteFactibilidad: (id: string) => axios.delete(`/feasibilities/${id}`)
};
