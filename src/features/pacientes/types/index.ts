export interface Paciente {
  _id: string;
  rut?: string; // RUT del paciente, opcional
  estudioId: string;
  nombre: string;
  numerodeTomos?:number

  fechaNacimiento?: string; // YYYY-MM-DD
  
  contacto: {
    nombre: string;
    telefono: string;
    parentesco: string;
  }[];
  
  contactoNombre?: string;
  contactoTelefono?: string;

  codigo?: string; // screening
  codigoRandomizado?: string;

  estaRandomizado: boolean;
  fechaRandomizacion?: string;

  estado: string;
  fechaIngreso?: string;
  ultimaVisita?: string;

  rama?: string;
  patologia?: string;

  centro?: string; // por defecto 204
  vendedorKit?: string;
  traslado?: string;

  observaciones?: string;
  falloScreening: boolean;
  fechaFalloScreening?: string;

  alergia?: string;
  alergiaDescripcion?: string; //mas adelante
  
  residencia?: string; // por defecto  La Serena

  consentimientoFirmado: boolean;
  urlConsentimiento?: string;

  createdAt?: string;
  updatedAt?: string;
  __v?: number;
  
  consentimientos: Consentimiento[];

}
export interface Consentimiento {
  version: string;
  fechaFirma?: string;
  fechaImplementacion?: string;
  url: string;
  subidoPor: string;
}