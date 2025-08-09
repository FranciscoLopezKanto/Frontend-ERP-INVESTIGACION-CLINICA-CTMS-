import axios from '../../../api/axiosInstance';
import { Visita } from '../types';

const API_URL = `${import.meta.env.VITE_API_BASE_URL}/visits`;

export const visitasService = {
  async getVisitas(): Promise<{ data: Visita[] }> {
    const response = await axios.get(API_URL);
    return response;
  },

  async getVisitaById(id: string): Promise<{ data: Visita }> {
    const response = await axios.get(`${API_URL}/${id}`);
    return response;
  },

  async createVisita(payload: Partial<Visita>) {
    return axios.post(API_URL, payload);
  },

  async updateEstado(id: string, estado: string, numeroTomo?: number) {
    return axios.patch(`${API_URL}/${id}/status`, {
      estado,
      numeroTomo,
    });
  },
  async deleteVisita(id: string) {
    return axios.delete(`${API_URL}/${id}`);
  },

  async getVisitasPorReferencia(referenciaId: string, tipo?: string) {
    const params = tipo ? `?tipo=${tipo}` : '';
    return axios.get(`${API_URL}/totales/${referenciaId}${params}`);
  },

  async updateVisita(id: string, payload: Partial<Visita>) {
    return axios.patch(`${API_URL}/${id}`, payload);
  },

  async getVisitsByStudy(estudioId: string) {
    return axios.get(`${API_URL}/search/by-study?estudioId=${estudioId}`);
  },

  async getVisitsByPatient(pacienteId: string) {
    return axios.get(`${API_URL}/search/by-patient?pacienteId=${pacienteId}`);
  },

  async getVisitsByDate(fecha: string) {
    return axios.get(`${API_URL}/search/by-date?fecha=${fecha}`); 
    
  }
};
    