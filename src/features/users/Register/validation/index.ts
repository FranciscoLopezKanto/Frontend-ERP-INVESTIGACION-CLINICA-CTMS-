import * as Yup from 'yup';
import { validateRut } from '../../../utils';

export const userRegisterSchema = Yup.object().shape({
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
  email: Yup.string().email('Correo inválido').required('Correo requerido'),
  password: Yup.string()
    .min(8, 'La contraseña debe tener al menos 8 caracteres')
    .matches(/[a-zA-Z]/, 'La contraseña debe contener al menos una letra')
    .matches(/\d/, 'La contraseña debe contener al menos un número')
    .matches(/[!@#$%^&*(),.?":{}|<>_-]/, 'Debe contener al menos un carácter especial')
    .required('Contraseña requerida'),
  age: Yup.number().min(0, 'Edad inválida').required('Edad requerida'),
  rut: Yup.string()
      .matches(/^(\d{1,2}\.?\d{3}\.?\d{3}-[\dkK])$/, 'Formato de RUT inválido')
      .test('rut-valido', 'RUT inválido', value => !!value && validateRut(value))
      .required('RUT requerido'),
  phone: Yup.string().min(8, 'Debe tener al menos 8 dígitos').required('Teléfono requerido'),
  address: Yup.string().matches(/^[A-Z]/, 'Debe comenzar con mayúscula'),
  birthdate: Yup.date()
  .transform((value, originalValue) => originalValue === '' ? null : value)
  .nullable()
  .required('Fecha de nacimiento requerida'),
  area: Yup.string().matches(/^[A-Z]/, 'Debe comenzar con mayúscula'),
  position: Yup.string().matches(/^[A-Z]/, 'Debe comenzar con mayúscula'),
  role: Yup.string().required('Rol requerido'),
  date_incorporation: Yup.date()
  .transform((value, originalValue) => originalValue === '' ? null : value)
  .nullable()
  .required('Fecha de incorporación requerida'),
});