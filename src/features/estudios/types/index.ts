// Documentos requeridos (forma consistente con backend)
export interface Documento {
  nombre: string;
  version?: string;
  fecha?: string;
  _id?: string; // ID opcional para identificar el documento
}
export interface Agente {
  name: string;
  email: string;
  phone_number?: string;
}

export interface RequiredDocument {
  name: string;
  expirationDate?: string;
  notApplicable?: boolean;
  _id?: string;
  createdAt?: string;
  updatedAt?: string;
}

// Monitores
export interface Agent {
  name: string;
  email: string;
  phone_number?: string;
}

// Staff
export interface Equipo {
  id: string;
  _id?: string;
  nombre: string;
  rol?: RolEquipo;
  email?: string;
  area?: string;
  
}

// Usuario del sistema
export interface Usuario {
  _id: string;
  name: string;
  email: string;
  rut: string;
  area: string;
  position: string; // Puede ser 'Investigador(a)', 'Coordinador(a)', etc.
  role: string;
  phone?: string;
  birthdate?: string;
  address?: string;
  date_incorporation?: string;
  requiredDocuments?: RequiredDocument[];
}
export interface Estudio {
  tipoEnrolamiento?: string; // StartUp, Enrolamiento, PostEnrolamiento
  _id: string;
  protocolo: string;
  titulo: string;
  patologia: string;
  productoInvestigacion: string;
  moleculaInvestigacion?: string;

  area: string;
  sponsor: string;
  fase: string;
  siteNumber: string;
  estado: string;
  tipoDroga: string; // <- requerido, sin ?
  comite: string;     // <- requerido, sin ?
  investigadorPrincipal: string;
  emailContacto: string;
  resolucionAprobatoria: string;

  pacientesTotales: number;
  compromisoPacientes: number;
  patientsCommitmentICLSR: number;
  objetivoEstudio: string;
  observaciones: string;

  recruitmentStart: string | null;
  recruitmentEnd: string | null;

  llegadaPaqueteInicial?: string | null;
  sometimientoInicial?: string | null;
  fechaAprobacionSometimiento?: string | null;
  siteReady?: string | null;
  visitaInicio?: string | null;
  primerFci?: string | null;
  primeraVisita?: string | null;
  inicioReclutamiento?: string | null;
  primerScreening?: string | null;
  primerPacienteEnrolado?: string | null;
  ultimaVisita?: string | null;
  cierreReclutamiento?: string | null;
  visitaCierre?: string | null;
  fechaCierreEstudio?: string | null;
  fechaSeleccion: string | null;

  duracionEstudio?: number;

  agentes: Agent[];
  equipo?: Equipo[];
  documentos?: Documento[];
  proposalId?: string;

  createdAt?: string;
  updatedAt?: string;
  __v?: number;
}

// Enum del rol de equipo
export enum RolEquipo {
  Coordinador = 'Coordinador(a)',
  SubInvestigador = 'SubInvestigador',
  investigadorPrincipal = 'Investigador Principal',
  AsistenteInvestigador = 'Asistente de Investigador',
  DirectorCalidad = 'Director de Calidad',
  Enfermero = 'Enfermero(a) Clinico(a)',
  JefaturaTens = 'Jefatura Tens',
  JefaturaEnfermeria = 'Jefatura Enfermería',
  JefaturaCoordinador = 'Jefatura Coordinador',
  JefaturaSubInvestigador = 'Jefatura SubInvestigador',
  MiembroFundador = 'Miembro Fundador',
  JefaturaInvestigadorPrincipal = 'Jefatura Investigador Principal',
  Monitor = 'Monitor',
  Regulatorio = 'Regulatorio',
  DataManager = 'Data Manager',
  DataEntry = 'Data Entry',
  Tens = 'Tens',
  Asistente = 'Asistente',
  Otro = 'otro'
  
}