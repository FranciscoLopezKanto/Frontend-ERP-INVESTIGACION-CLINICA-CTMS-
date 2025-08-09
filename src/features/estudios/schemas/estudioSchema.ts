import * as Yup from 'yup';

export const yupSchemaEditarEstudio = Yup.object({
  investigadorPrincipal: Yup.string().required('El investigador principal es obligatorio'),
  area: Yup.string().required('El área del estudio es obligatoria'),
  sponsor: Yup.string().required('El sponsor es obligatorio'),
  estado: Yup.string().required('El estado del estudio es obligatorio'),
  titulo: Yup.string().required('El título del estudio es obligatorio'),

  tipoDroga: Yup.string().required('El tipo de droga es obligatorio'),
  fase: Yup.string().required('La fase del estudio es obligatoria'),
  siteNumber: Yup.string().required('El Site Number es obligatorio'),
  comite: Yup.string().required('El comité ético es obligatorio'),
  emailContacto: Yup.string().email('Correo inválido').optional(),
  resolucionAprobatoria: Yup.string().optional(),
  productoInvestigacion: Yup.string().required('El producto en investigación es obligatorio'),
  patologia: Yup.string().required('La patología es obligatoria'),
  protocolo: Yup.string().required('El código del estudio es obligatorio'),

  pacientesTotales: Yup.number()
  .transform((value, originalValue) => originalValue === '' ? undefined : value)
  .min(0, 'Debe ser mayor o igual a 0')
  .nullable()
  .optional(),

compromisoPacientes: Yup.number()
  .transform((value, originalValue) => originalValue === '' ? undefined : value)
  .min(0, 'Debe ser mayor o igual a 0')
  .nullable()
  .optional(),

patientsCommitmentICLSR: Yup.number()
  .transform((value, originalValue) => originalValue === '' ? undefined : value)
  .min(0, 'Debe ser mayor o igual a 0')
  .nullable()
  .optional(),

  objetivoEstudio: Yup.string().optional(),

  // Fechas como string o null
  recruitmentStart: Yup.string().nullable(),
  recruitmentEnd: Yup.string().nullable(),
  fechaSeleccion: Yup.string().nullable(),

  llegadaPaqueteInicial: Yup.string().nullable(),
  sometimientoInicial: Yup.string().nullable(),
  fechaAprobacionSometimiento: Yup.string().nullable(),
  siteReady: Yup.string().nullable(),
  visitaInicio: Yup.string().nullable(),
  primerScreening: Yup.string().nullable(),
  primerPacienteEnrolado: Yup.string().nullable(),
  primerFci: Yup.string().nullable(),
  primeraVisita: Yup.string().nullable(),
  ultimaVisita: Yup.string().nullable(),
  visitaCierre: Yup.string().nullable(),
  inicioReclutamiento: Yup.string().nullable(),
  cierreReclutamiento: Yup.string().nullable(),
  fechaCierreEstudio: Yup.string().nullable(),

  observaciones: Yup.string().nullable(),
});
