import { ROLE_OPTIONS } from "../../types/const";

export const formatDate = (date?: string | Date) => {
  if (!date) return '-';
  const d = new Date(date);
  return d.toLocaleDateString('es-CL', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
};

export const toInputDateFormat = (date?: string | Date) => {
  if (!date) return '';
  return new Date(date).toISOString().slice(0, 10);
};


export const convertToISO = (input: string) => {
  const [day, month, year] = input.split('-');
  return `${year}-${month}-${day}`;
};

export const capitalizeWords = (str: string) =>
  str
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');


let trigger: (() => void) | null = null;

export const setSessionExpiredTrigger = (fn: () => void) => {
  trigger = fn;
};

export const getSessionExpiredTrigger = () => trigger;

export const getRoleLabel = (value: string | undefined) => {
  return ROLE_OPTIONS.find(opt => opt.value === value)?.label || value || '-';
};

export const validateRut = (rut: string): boolean => {
  rut = rut.replace(/\./g, '').replace('-', '');
  const cuerpo = rut.slice(0, -1);
  const dv = rut.slice(-1).toUpperCase();

  let suma = 0;
  let multiplo = 2;

  for (let i = cuerpo.length - 1; i >= 0; i--) {
    suma += parseInt(cuerpo[i]) * multiplo;
    multiplo = multiplo < 7 ? multiplo + 1 : 2;
  }

  const dvEsperado = 11 - (suma % 11);
  const dvCalculado =
    dvEsperado === 11 ? '0' : dvEsperado === 10 ? 'K' : dvEsperado.toString();

  return dv === dvCalculado;
};