import axios from '../../../api/axiosInstance';
import { Estudio, Agente, Documento } from '../types';

const baseUrl = `${import.meta.env.VITE_API_BASE_URL}/studies`;


export const estudiosService = {
  async getAll(): Promise<Estudio[]> {
    try {
      const res = await axios.get(baseUrl);
      return res.data;
    } catch (error: any) {
      handleAxiosError(error, 'getAll');
      throw error;
    }
  },
  async updateAgentes(id: string, agentes: Agente[]): Promise<Estudio> {
  try {
    console.log('📤 Enviando agentes:', JSON.stringify(agentes, null, 2));
    const res = await axios.patch(`${baseUrl}/${id}/agentes`, { agentes });
    return res.data;
  } catch (error: any) {
    console.error('❌ Error al actualizar agentes');

    if (error.response) {
      console.error('🔴 Error del servidor (response.data):', error.response.data);
      console.error('📟 Status:', error.response.status);
      console.error('📎 Headers:', error.response.headers);
      console.error('📦 Payload enviado:', { agentes });
    } else if (error.request) {
      console.error('🟡 La petición fue hecha pero no hubo respuesta:', error.request);
    } else {
      console.error('🔵 Error configurando la petición:', error.message);
    }

    handleAxiosError(error, 'updateAgentes');
    throw error;
  }
},

 async updateEquipo(id: string, dto: { equipo: any[] }): Promise<Estudio> {
  const res = await axios.patch(`${baseUrl}/${id}/equipo`, dto);
  return res.data;
}
,

  async updateDocumentos(id: string, payload: { documentos: Documento[] }): Promise<Estudio> {
  const res = await axios.patch(`${baseUrl}/${id}/documentos`, payload);
  return res.data;
}
,


  async getById(id: string): Promise<Estudio> {
    try {
      const res = await axios.get(`${baseUrl}/${id}`);
      return res.data;
    } catch (error: any) {
      handleAxiosError(error, 'getById');
      throw error;
    }
  },
  async create(data: Partial<Estudio>): Promise<Estudio> {
  try {
    const payload = {
      ...data,
      tipoEnrolamiento: 'StartUp', 
    };
    const res = await axios.post(`${baseUrl}/manual`, payload);
    return res.data;
  } catch (error: any) {
    handleAxiosError(error, 'create');
    throw error;
  }
},

async update(id: string, data: Partial<Estudio>): Promise<Estudio> {
  try {
    const payload = {
      ...data,
      tipoEnrolamiento: 'StartUp', // <-- valor por defecto
    };
    const res = await axios.patch(`${baseUrl}/${id}`, payload);
    return res.data;
  } catch (error: any) {
    handleAxiosError(error, 'update');
    throw error;
  }
},

  async remove(id: string): Promise<void> {
    try {
      await axios.delete(`${baseUrl}/${id}`);
    } catch (error: any) {
      handleAxiosError(error, 'remove');
      throw error;
    }
  },
};

function handleAxiosError(error: any, methodName: string) {
  if ((error)) {
    console.error(`❌ Axios error - estudiosService.${methodName}:`, {
      message: error.message,
      code: error.code,
      url: error.config?.url,
      method: error.config?.method,
      stack: error.stack,
    });
  } else {
    console.error(`❌ Error inesperado - estudiosService.${methodName}:`, error);
  }
}
