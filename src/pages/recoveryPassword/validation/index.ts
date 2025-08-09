import * as Yup from 'yup';

export const recoverSchema = Yup.object().shape({
  email: Yup.string().email('Correo inválido').required('El correo es requerido'),
});