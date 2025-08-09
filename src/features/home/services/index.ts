import { estudiosService } from '../../estudios/services';
import { pacientesService } from '../../pacientes/services';
import { visitasService } from '../../visitas/services/backend';
import { factibilidadesService } from '../../factibilidades/services/FactibilidadesService';

export const getAllEstudios = estudiosService.getAll;
export const getAllPacientes = pacientesService.getAll;
export const getAllVisitas = visitasService.getVisitas
export const getAllFactibilidades = factibilidadesService.getFactibilidades;
export const getEstudioById = estudiosService.getById;
