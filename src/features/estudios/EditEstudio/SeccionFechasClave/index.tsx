import { Box, Grid, Tooltip, Typography } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { Estudio } from '../../types';
import { UseFormSetValue } from 'react-hook-form';

type Props = {
  form: Estudio;
  handleChange: UseFormSetValue<Estudio>;
};

export default function SeccionFechasClave({ form, handleChange }: Props) {
  const camposFechasClave: [keyof Estudio, string, string][] = [
    ['llegadaPaqueteInicial', 'Llegada Paquete Inicial', 'Fecha en que se recibe el paquete de documentos iniciales del estudio.'],
    ['sometimientoInicial', 'Sometimiento Inicial', 'Fecha en la que se envía la documentación al comité ético.'],
    ['fechaAprobacionSometimiento', 'Aprobación Sometimiento Inicial', 'Fecha en que el comité ético aprueba formalmente el estudio.'],
    ['siteReady', 'Site Ready', 'Fecha en que el sitio se declara preparado para iniciar el estudio.'],
    ['visitaInicio', 'Visita de Inicio', 'Fecha de la visita de inicio (SIV).'],
    ['primerScreening', 'Primer Screening', 'Fecha del primer paciente evaluado para entrar al estudio.'],
    ['primerPacienteEnrolado', 'Primer Paciente Enrolado', 'Fecha del primer paciente enrolado formalmente en el estudio.'],
    ['primerFci', 'Primer FCI', 'Fecha en que se firmó el primer consentimiento informado.'],
    ['primeraVisita', 'Primera Visita', 'Primera visita efectiva de un paciente enrolado.'],
    ['ultimaVisita', 'Última Visita', 'Fecha en que se realiza la última visita del último paciente.'],
    ['visitaCierre', 'Visita de Cierre', 'Fecha de la visita de cierre del estudio en el centro.'],
  ];

  return (
    <Box mt={4}>
      <Typography variant="subtitle1" fontWeight={600} mb={2}>
        Fechas Clave
      </Typography>
      <Grid container spacing={2}>
        {camposFechasClave.map(([key, label, tooltip]) => (
          <Grid size={{ xs: 12, md: 3 }} key={key}>
            <Tooltip title={tooltip}>
              <DatePicker
                label={label}
                value={form[key] ? new Date(form[key] as string) : null}
                onChange={(date) =>
                  handleChange(key, date ? date.toISOString() : null)
                }
                slotProps={{
                  textField: {
                    fullWidth: true,
                    InputLabelProps: { shrink: true },
                  },
                }}
              />
            </Tooltip>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
