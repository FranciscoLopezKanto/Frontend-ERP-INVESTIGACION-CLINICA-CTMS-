import { TextField, Tooltip } from '@mui/material';

interface FechaFormateadaCampoProps {
  label: string;
  fecha?: string | null;
  tooltip?: string;
}

interface PeriodoFechasCampoProps {
  label: string;
  desde?: string | null;
  hasta?: string | null;
  tooltip?: string;
}

const formatearFechaLarga = (fecha: string): string => {
  const parsed = new Date(fecha);
  if (isNaN(parsed.getTime())) return '—';
  return parsed.toLocaleDateString('es-CL', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
};

// ✅ Campo para UNA sola fecha
export default function FechaFormateadaCampo({ label, fecha, tooltip }: FechaFormateadaCampoProps) {
  const valor = fecha ? formatearFechaLarga(fecha) : 'No registrada';

  const campo = (
    <TextField
      label={label}
      value={valor}
      fullWidth
      InputProps={{ readOnly: true }}
    />
  );

  return tooltip ? <Tooltip title={tooltip} arrow>{campo}</Tooltip> : campo;
}

// ✅ Campo para PERÍODO (desde - hasta)
export function PeriodoFechasCampo({ label, desde, hasta, tooltip }: PeriodoFechasCampoProps) {
  const desdeTexto = desde ? `Desde el ${formatearFechaLarga(desde)}` : '';
  const hastaTexto = hasta ? `hasta el ${formatearFechaLarga(hasta)}` : '';
  const texto = [desdeTexto, hastaTexto].filter(Boolean).join(' ') || 'No registrado';

  const campo = (
    <TextField
      label={label}
      value={texto}
      fullWidth
      InputProps={{ readOnly: true }}
    />
  );

  return tooltip ? <Tooltip title={tooltip} arrow>{campo}</Tooltip> : campo;
}
