import { RolEquipo } from "../../types";

export function traducirPositionToRolEquipo(position: string): RolEquipo | undefined {
  switch (position) {
    case 'Investigador(a)':
      return RolEquipo.investigadorPrincipal;
    case 'Coordinador(a)':
      return RolEquipo.Coordinador;
    case 'Data Entry':
      return RolEquipo.DataEntry;
    case 'Regulatorio':
      return RolEquipo.Regulatorio;
    case 'Enfermero(a) Clínico(a)':
    case 'Enfermero':
    case 'Enfermero(a) Clinico(a)':
      return RolEquipo.Enfermero;
    case 'Tens':
    case 'Jefatura Tens':
      return RolEquipo.Tens;
    default:
      return undefined;
  }
}


/**
 * Si quieres también una función inversa, para mostrar en UI el label del RolEquipo
 */
export function mostrarRolEquipoLabel(rol: RolEquipo): string {
  switch (rol) {
    case RolEquipo.investigadorPrincipal:
      return 'Investigador Principal';
    case RolEquipo.SubInvestigador:
      return 'SubInvestigador';
    case RolEquipo.Coordinador:
      return 'Coordinador';
    case RolEquipo.DataEntry:
      return 'Data Entry';
    case RolEquipo.Regulatorio:
      return 'Regulatorio';
    case RolEquipo.Enfermero:
      return 'Enfermero/a Clínico(a)';
    case RolEquipo.Tens:
      return 'Tens';
    default:
      return rol;
  }
}
