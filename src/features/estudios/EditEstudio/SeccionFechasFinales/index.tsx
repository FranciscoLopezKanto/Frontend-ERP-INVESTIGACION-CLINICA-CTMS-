import { Box, Grid, Tooltip, Typography } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { Estudio } from '../../types';
import { UseFormSetValue } from 'react-hook-form';

type Props = {
  form: Estudio;
  handleChange: UseFormSetValue<Estudio>;
};

export default function SeccionFechasFinales({ form, handleChange }: Props) {
  const camposFechasFinales: [keyof Estudio, string, string][] = [
    ['inicioReclutamiento', 'Inicio Reclutamiento', 'Fecha en que se comienza oficialmente a reclutar pacientes.'],
    ['cierreReclutamiento', 'Cierre Reclutamiento', 'Fecha en que se cierra el proceso de reclutamiento de pacientes.'],
    ['fechaCierreEstudio', 'Cierre Oficial Estudio', 'Fecha oficial del cierre del estudio clínico.'],
    ['fechaSeleccion', 'Fecha de Selección', 'Fecha en que el centro fue seleccionado para participar en el estudio.'],
  ];

  return (
    <Box mt={4}>
      <Typography variant="subtitle1" fontWeight={600} mb={2}>
        Fechas Operativas Finales
      </Typography>
      <Grid container spacing={2}>
        {camposFechasFinales.map(([key, label, tooltip]) => (
          <Grid size={{ xs: 12, md: 3 }} key={key}>
            <Tooltip title={tooltip}>
              <DatePicker
                label={label}
                value={
                  form[key] !== undefined && form[key] !== null
                    ? new Date(form[key] as string)
                    : null
                }
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
