import * as Yup from 'yup';

export const changePasswordSchema = Yup.object().shape({
  newPassword: Yup.string()
    .required('Contraseña requerida')
    .min(8, 'Debe tener al menos 8 caracteres')
    .matches(/[A-Z]/, 'Debe contener al menos una letra mayúscula')
    .matches(/[a-z]/, 'Debe contener al menos una letra minúscula')
    .matches(/\d/, 'Debe contener al menos un número')
    .matches(/[!@#$%^&*(),.?":{}|<>_-]/, 'Debe contener al menos un carácter especial'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('newPassword')], 'Las contraseñas no coinciden')
    .required('Confirma tu contraseña'),
});