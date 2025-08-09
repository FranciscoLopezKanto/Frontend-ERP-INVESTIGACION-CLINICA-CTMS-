import { EstadoVisita } from './enums';

export interface Visita {
  observaciones?: string;
  _id: string;
  id?: string;
  tipo: 'paciente' | 'sponsor' | 'regulatorio';
  fechaProgramada: string;
  fechaReal?: string;
  estado: EstadoVisita;
  motivo: string;
  descripcion?: string;
  cartaConfirmacion?: boolean;
  fup?: boolean;

  entidad?: {
    tipo: 'paciente' | 'sponsor' | 'regulatorio';
    nombre: string;
    codigoPaciente?: string;
    codigoEstudio?: string; // Código del estudio asociado screening
    codigoRandomizado?: string; // Nuevo campo opcional randomizado codigo
    representante?: string;
  };

  documentosAdjuntos?: string[];
  historial?: {
    id: string;
    fecha: string;
    estado: EstadoVisita | string;
    motivo: string;
    detalle?: string;
  }[];

  creadoPor?: string;
  creadoEn?: string;
  numeroTomo?: number;
  detalle?: string;
}
