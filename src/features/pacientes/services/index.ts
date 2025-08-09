import axios from '../../../api/axiosInstance';
import { Paciente } from '../types';

export const pacientesService = {
  getAll: async () => {
    try {
      const response = await axios.get<Paciente[]>('/patients');
      return response;
    } catch (error: any) {
      console.error('❌ Error al obtener pacientes:', {
        message: error?.response?.data?.message || error.message,
        status: error?.response?.status,
        url: error?.config?.url,
      });
      throw error; // re-lanzamos por si el frontend quiere manejarlo también
    }
  },
  
  async getByScreeningCode(codigo: string) {
    try {
      const response = await axios.get<Paciente>(`/patients/screening/${codigo}`); // usamos codigo de screening 
      return response.data;
    } catch (error: any) {
      console.error('❌ Error al obtener paciente por código de screening:', {
        message: error?.response?.data?.message || error.message,
        status: error?.response?.status,
        url: error?.config?.url,
      });
      throw error; // re-lanzamos por si el frontend quiere manejarlo también
    }
  },
 
  getById: (id: string) => axios.get<Paciente>(`/patients/${id}`),

  getByEstudio: (estudioId: string) =>
    axios.get<Paciente[]>(`/patients/study/${estudioId}`),

  create: (data: Partial<Paciente>) => axios.post(`/patients`, data),

  update: (id: string, data: Partial<Paciente>) =>
    axios.patch(`/patients/${id}`, data),

  delete: (id: string) => axios.delete(`/patients/${id}`),

  randomizar: (id: string) =>
    axios.patch(`/patients/${id}/randomize`, {}),

  actualizarConsentimiento: (
    id: string,
    consentimientoFirmado: boolean,
    urlConsentimiento?: string
  ) =>
    axios.patch(`/patients/${id}/consents`, {
      consentimientoFirmado,
      urlConsentimiento,
    }),
  
  agregarConsentimiento: (
  id: string,
  data: {
    version: string;
    fechaFirma?: string;
    fechaImplementacion?: string; // ← ¡AGREGAR ESTO!
    url?: string;
    subidoPor: string;
  }
) => axios.patch(`/patients/${id}/consents`, data),


  // NUEVO: Editar consentimiento por versión
  editarConsentimiento: (
    id: string,
    version: string,
    data: {
      version: string;
    fechaFirma?: string;
    fechaImplementacion?: string; // ← ¡AGREGAR ESTO!
    url?: string;
    subidoPor: string;
    }
  ) => axios.patch(`/patients/${id}/consents/${version}`, data),

  // NUEVO: Eliminar consentimiento por versión
  eliminarConsentimiento: (id: string, version: string) =>
    axios.delete(`/patients/${id}/consents/${version}`),
  
};
