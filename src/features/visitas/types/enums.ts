export enum EstadoVisita {
  Pendiente = 'Pendiente',
  Agendada = 'Agendada',
  Reagendada = 'Reagendada',
  Confirmada = 'Confirmada',
  Cancelada = 'Cancelada',
  Realizada = 'Realizada',
  Ingresada = 'Ingresada'
}
export enum MotivoVisita {
  LabLocales = 'Laboratorio Local',
  LabCentral = 'Laboratorio Central',
  Imagenes = 'Imágenes',
  ControlMedicoCiclo = 'Control Médico - Ciclo',
  ControlMedicoNoProgramado = 'Control Médico - No Programado',
  Otro = 'Otro'
}
export enum TipoVisita {
  Paciente = 'paciente',
  Sponsor = 'sponsor',
  Regulatorio = 'regulatorio'
}
export const TipoVisitaLabel: Record<TipoVisita, string> = {
  [TipoVisita.Paciente]: 'Visita de paciente',
  [TipoVisita.Sponsor]: 'Visita de patrocinador',
  [TipoVisita.Regulatorio]: 'Visita de ente regulatorio'
};

export const MotivoVisitaLabel: Record<MotivoVisita, string> = {
  [MotivoVisita.LabLocales]: 'Laboratorio Local',
  [MotivoVisita.LabCentral]: 'Laboratorio Central',
  [MotivoVisita.Imagenes]: 'Imágenes',
  [MotivoVisita.ControlMedicoCiclo]: 'Control Médico - Ciclo',
  [MotivoVisita.ControlMedicoNoProgramado]: 'Control Médico - No Programado',
  [MotivoVisita.Otro]: 'Otro'
};

export enum MotivoVisita2 {
  Monitoreo = 'Monitoreo',
  Auditoria = 'Auditoría',
  VisitaInicial = 'Visita Inicial',
  VisitaCierre = 'Visita de Cierre',
  Otro = 'Otro'
}

export const MotivoVisita2Label: Record<MotivoVisita2, string> = {
  [MotivoVisita2.Monitoreo]: 'Monitoreo',
  [MotivoVisita2.Auditoria]: 'Auditoría',
  [MotivoVisita2.VisitaInicial]: 'Visita Inicial',
  [MotivoVisita2.VisitaCierre]: 'Visita de Cierre',
  [MotivoVisita2.Otro]: 'Otro'
}