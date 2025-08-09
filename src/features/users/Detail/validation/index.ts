import * as Yup from 'yup';
import { validateRut } from '../../../utils';

export const userDetailSchema = Yup.object().shape({
  name: Yup.string().min(2, 'Debe tener al menos 2 caracteres').matches(/^[A-Z]/, 'Debe comenzar con mayúscula').required('Nombre requerido'),
  firstName: Yup.string().min(2,'Debe tener al menos 2 caracteres').matches(/^[A-Z]/, 'Debe comenzar con mayúscula').required('El nombre es obligatorio'),
  lastName: Yup.string().min(2,'Debe tener al menos 2 caracteres').matches(/^[A-Z]/, 'Debe comenzar con mayúscula').required('El apellido paterno es obligatorio'),
  secondLastName: Yup.string()
  .optional()
  .notRequired()
  .test(
    'secondLastName-format',
    'Debe tener al menos 2 caracteres y comenzar con mayúscula',
    value => {
      if (!value) return true; // no validar si está vacío
      return /^[A-Z][a-zA-Z]{1,}$/.test(value);
    }
  ),
  age: Yup.number().min(0, 'Edad inválida').required('Edad requerida'),
  rut: Yup.string()
    .matches(/^(\d{1,2}\.?\d{3}\.?\d{3}-[\dkK])$/, 'Formato de RUT inválido')
    .test('rut-valido', 'RUT inválido', value => !!value && validateRut(value))
    .required('RUT requerido'),
  phone: Yup.string().min(8, 'Debe tener al menos 8 dígitos').required('Teléfono requerido'),
  email: Yup.string().email('Correo inválido').required('Correo requerido'),
  address: Yup.string().matches(/^[A-Z]/, 'Debe comenzar con mayúscula'),
  birthdate: Yup.date().required('Fecha de nacimiento requerida'),
  area: Yup.string().matches(/^[A-Z]/, 'Debe comenzar con mayúscula'),
  position: Yup.string().matches(/^[A-Z]/, 'Debe comenzar con mayúscula'),
  role: Yup.string().required('Rol requerido'),
  date_incorporation: Yup.date().required('Fecha de incorporación requerida'),
});
