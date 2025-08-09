import { Tooltip, Typography } from '@mui/material';

interface FechaFormateadaProps {
  label: string;
  fecha: string | null | undefined;
  tooltip?: string;
}

export const formatearFechaLarga = (fecha: string): string => {
  const parsed = new Date(fecha);
  if (isNaN(parsed.getTime())) return '—';

  return parsed.toLocaleDateString('es-CL', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
};

// ✅ Componente principal
export default function FechaFormateada({ label, fecha, tooltip }: FechaFormateadaProps) {
  if (!fecha) return null;

  const contenido = (
    <Typography>
      <strong>{label}:</strong> {formatearFechaLarga(fecha)}
    </Typography>
  );

  return tooltip ? <Tooltip title={tooltip}>{contenido}</Tooltip> : contenido;
}

// ✅ Componente adicional exportado para mostrar un período con dos fechas
interface PeriodoFechasFormateadasProps {
  label: string;
  desde?: string | null;
  hasta?: string | null;
  tooltip?: string;
}

export const PeriodoFechasFormateadas = ({
  label,
  desde,
  hasta,
  tooltip,
}: PeriodoFechasFormateadasProps) => {
  const desdeTexto = desde ? `Desde el ${formatearFechaLarga(desde)}` : '';
  const hastaTexto = hasta ? `Hasta el ${formatearFechaLarga(hasta)}` : '';
  const contenidoTexto = `${desdeTexto} ${hastaTexto}`.trim();

  if (!contenidoTexto) return null;

  const contenido = (
    <Typography  sx={{ whiteSpace: 'nowrap' }}>
      <strong>{label}:</strong> {contenidoTexto}
    </Typography>
  );

  return tooltip ? <Tooltip title={tooltip}>{contenido}</Tooltip> : contenido;
};
