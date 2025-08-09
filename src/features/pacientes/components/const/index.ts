export const calcularEdad = (fecha: string): number => {
  const nacimiento = new Date(fecha);
  const hoy = new Date();
  let edad = hoy.getFullYear() - nacimiento.getFullYear();
  const m = hoy.getMonth() - nacimiento.getMonth();
  if (m < 0 || (m === 0 && hoy.getDate() < nacimiento.getDate())) {
    edad--;
  }
  return edad;
};

export const obtenerEdadMostrable = (
  fechaNacimiento?: string,
  edad?: number
): string => {
  if (fechaNacimiento) {
    const edadCalculada = calcularEdad(fechaNacimiento);
    const fechaFormateada = new Date(fechaNacimiento).toLocaleDateString();
    return `${edadCalculada} años (${fechaFormateada})`;
  }

  if (edad !== undefined) {
    return `${edad} años (sin fecha)`;
  }

  return 'Sin registrar';
};

export const formatearFechaLarga = (fecha?: string) => {
  if (!fecha) return '-';
  const opciones: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long', year: 'numeric' };
  return new Date(fecha).toLocaleDateString('es-CL', opciones);
};
