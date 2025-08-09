import * as yup from 'yup';

export const factibilidadSchema = yup.object({
  area: yup.string().required('Área es obligatoria'),
  feasibilityValue: yup.string().required('Factibilidad es obligatoria'),
  interest: yup.string().required('Interés es obligatorio'),
  feasibilityStatus: yup
    .string()
    .oneOf(['pendiente', 'en revisión', 'rechazado', 'seleccionado'])
    .required('Estado de factibilidad es obligatorio'),
  initialEmail: yup.string().nullable().required('Fecha de contacto inicial es obligatoria'),
  principalInvestigator: yup.string().required('Investigador principal es obligatorio'),
  instructionsSummary: yup.string().required('Nombre o indicaciones es obligatorio'),
});
