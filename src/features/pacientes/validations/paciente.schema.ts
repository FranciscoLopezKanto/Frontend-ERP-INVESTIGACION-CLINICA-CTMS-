import * as Yup from 'yup';

export const pacienteSchema = Yup.object().shape({
  estudioId: Yup.string().required('El código del estudio es obligatorio'),
  nombre: Yup.string().required('El nombre es obligatorio'),
  rut: Yup.string().optional(),
  edad: Yup.number()
    .transform((value, originalValue) => originalValue === '' ? undefined : value)
    .required('La edad es obligatoria')
    .min(0, 'Edad inválida'),
  estado: Yup.string().required('El estado es obligatorio'),
  fechaIngreso: Yup.date()
  .transform((value, originalValue) => originalValue === '' ? null : value)
  .nullable()
  .notRequired(),

  contacto: Yup.array().of(
    Yup.object().shape({
      nombre: Yup.string().required('Nombre del contacto requerido'),
      telefono: Yup.string().required('Teléfono del contacto requerido'),
      parentesco: Yup.string().required('Parentesco requerido'),
    })
  )
});
