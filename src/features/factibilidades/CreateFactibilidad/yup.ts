import * as yup from 'yup';

export const crearFactibilidadSchemaYup = yup.object({
  proposalId: yup.string().required('ID de propuesta requerido'),
  code: yup.string().required('Código del Estudio requerido'),
  sponsorName: yup.string().required('Nombre del Sponsor requerido'),

  patologia: yup.string().optional().nullable().transform(v => v === '' ? undefined : v),
  productoInvestigacion: yup.string().optional().nullable().transform(v => v === '' ? undefined : v),
  email: yup.string().email('Correo inválido').optional().nullable().transform(v => v === '' ? undefined : v),

  feasibilityStatus: yup
    .mixed<'Pendiente' | 'En Revisión' | 'No Seleccionado' | 'Seleccionado'>()
    .oneOf(['Pendiente', 'En Revisión', 'No Seleccionado', 'Seleccionado'])
    .required('Estado requerido'),

  feasibilityValue: yup.string().oneOf(['SI', 'NO', 'N/A']).required('Requerido'),
  interest: yup.string().oneOf(['SI', 'NO']).required('Requerido'),

  initialEmail: yup.string().optional().nullable().transform(v => v === '' ? undefined : v),
  documentArrivalDate: yup.string().optional().nullable().transform(v => v === '' ? undefined : v),
  visitDate: yup.string().optional().nullable().transform(v => v === '' ? undefined : v),
  feasibilitySentDate: yup.string().optional().nullable().transform(v => v === '' ? undefined : v),
  area: yup.string().optional().nullable().transform(v => v === '' ? undefined : v),
  cdaSentDate: yup.string().optional().nullable().transform(v => v === '' ? undefined : v),

  recruitmentStart: yup.string().optional().nullable().transform(v => v === '' ? undefined : v),
  recruitmentEnd: yup.string().optional().nullable().transform(v => v === '' ? undefined : v),

  patientsCommitmentICLSR: yup
    .number()
    .transform((v, o) => o === '' || o === null ? undefined : v)
    .optional(),

  patientsCommitment: yup
    .number()
    .transform((v, o) => o === '' || o === null ? undefined : v)
    .optional(),

  speciality: yup.string().optional().nullable().transform(v => v === '' ? undefined : v),
  comment: yup.string().optional().nullable().transform(v => v === '' ? undefined : v),
  instructionsSummary: yup.string().optional().nullable().transform(v => v === '' ? undefined : v),
  recruitmentPeriod: yup.string().optional().nullable().transform(v => v === '' ? undefined : v),
  principalInvestigator: yup.string().required('Investigador principal requerido').nullable().transform(v => v === '' ? undefined : v),
  agents: yup
    .array()
    .of(
      yup.object({
        name: yup.string().required('Nombre requerido'),
        email: yup.string().email('Correo inválido').required('Email requerido'),
        phone_number: yup.string().required('Teléfono requerido'),
      })
    )
    .optional(),

  estadoProceso: yup
    .string()
    .oneOf(['pendiente', 'en revisión', 'seleccionado', 'no seleccionado'])
    .optional(),

  informacionCompleta: yup.boolean().required('Campo requerido'),
});
