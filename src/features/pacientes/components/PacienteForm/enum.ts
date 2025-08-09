export enum EstadoPaciente {
  Invitacion = 'Invitación',
  Screening = 'Screening',
  Randomizacion = 'Randomización',
  Tratamiento = 'Tratamiento',
  ExtensionTratamiento = 'Extensión de Tratamiento',
  EOT = 'EOT', // End of Treatment
  Seguimiento = 'Seguimiento', // o Survival Follow-Up (SFU)
  Otros = 'Otros', // Para casos especiales o no definidos
  FallaScreening = 'Falla de Screening',
}

// Labels visibles para mostrar en UI
export const EstadoPacienteLabel: Record<EstadoPaciente, string> = {
  [EstadoPaciente.Otros]: 'Otros (Casos Especiales o No Definidos)',
  [EstadoPaciente.FallaScreening]: 'Falla de Screening (Exclusion)',
  [EstadoPaciente.Invitacion]: 'Invitación',
  [EstadoPaciente.Screening]: 'Screening',
  [EstadoPaciente.Randomizacion]: 'Randomización',
  [EstadoPaciente.Tratamiento]: 'Tratamiento',
  [EstadoPaciente.ExtensionTratamiento]: 'Extensión de Tratamiento',
  [EstadoPaciente.EOT]: 'End of Treatment',
  [EstadoPaciente.Seguimiento]: 'Seguimiento',
};
