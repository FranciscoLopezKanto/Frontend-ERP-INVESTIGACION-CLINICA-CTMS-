export interface EventoDocumento {
  descripcion: string;
  fecha: string;
  estado: 'completo' | 'pendiente';
  detalle?: string;
}

export interface Documento {
  tipo: string;
  version: string;
  estado: 'pendiente' | 'aprobado' | 'rechazado';
  fecha: string;
  timeline: EventoDocumento[];
  relacionadoCon?: string[]; // IDs de documentos relacionados
}

export interface Alerta {
  estudioId: string;
  mensaje: string;
}

export interface Estudio {
  id: string;
  nombre: string;
  documentos: Documento[];
  alertas: Alerta[];
}
