export function capitaliceFirstLetter(texto: string): string {
  if (!texto) return '';
  return texto.charAt(0).toUpperCase() + texto.slice(1);
}
export function revertirZonaHoraria(fechaIso: string): Date {
  const fechaUTC = new Date(fechaIso);
  return new Date(fechaUTC.getTime() + fechaUTC.getTimezoneOffset() * 60000);
}


export function formatFechaChile(fechaIso: string): string {
  const fechaUTC = new Date(fechaIso);
  const fechaSinCambio = new Date(fechaUTC.getTime() + fechaUTC.getTimezoneOffset() * 60000);

  const opcionesFecha = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  } as const;

  const opcionesHora = {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  } as const;

  const fecha = fechaSinCambio.toLocaleDateString('es-CL', opcionesFecha);
  const hora = fechaSinCambio.toLocaleTimeString('es-CL', opcionesHora);

  // Capitaliza el primer carácter del día de la semana
  const fechaCapitalizada = fecha.charAt(0).toUpperCase() + fecha.slice(1);

  return `${fechaCapitalizada} a las ${hora}`;
}
export const BLOQUES_MANANA = ['09:00', '10:00', '11:00', '12:00'];
export const BLOQUES_TARDE = ['14:00', '15:00', '16:00', '17:00'];

export function obtenerCuposDisponibles(hora: string, visitas: any[]) {
  const [h] = hora.split(':').map(Number);

  const visitasEnBloque = visitas.filter((v) => {
    const fecha = revertirZonaHoraria(v.fechaProgramada);  // ✅ Aquí aplicas el helper
    return fecha.getHours() === h;
  }).length;

  if (BLOQUES_MANANA.includes(hora)) {
    return {
      disponible: visitasEnBloque === 0,
      advertencia: false,
      visitasEnBloque,
    };
  } else if (BLOQUES_TARDE.includes(hora)) {
    return {
      disponible: visitasEnBloque < 2,
      advertencia: visitasEnBloque === 1,
      visitasEnBloque,
    };
  }

  return { disponible: false, advertencia: false, visitasEnBloque };
}
