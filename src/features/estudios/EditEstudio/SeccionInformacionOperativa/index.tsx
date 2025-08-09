import { Box, Grid, TextField, Tooltip, MenuItem, Typography } from '@mui/material';
import { Estudio } from '../../types';
import { TipoDroga } from '../../enums';
import { UseFormRegister, UseFormSetValue, FieldErrors } from 'react-hook-form';

type Props = {
  form: Estudio;
  handleChange: UseFormSetValue<Estudio>;
  register: UseFormRegister<Estudio>;
  errors: FieldErrors<Estudio>;
};

export default function SeccionInformacionOperativa({
  form,
  register,
  errors,
}: Props) {
  return (
    <Box mt={4}>
      <Typography variant="subtitle1" fontWeight={600} mb={2}>
        Información Operativa
      </Typography>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 3 }}>
          <Tooltip title="Forma farmacéutica de la droga: oral, inyectable, etc.">
            <TextField
              label="Tipo de Droga"
              select
              {...register('tipoDroga')}
              defaultValue={form.tipoDroga || ''}
              fullWidth
              error={!!errors.tipoDroga}
              helperText={errors.tipoDroga?.message}
              InputLabelProps={{ shrink: true }}
            >
              <MenuItem value="">Seleccione...</MenuItem>
              {Object.values(TipoDroga).map((opt) => (
                <MenuItem key={opt} value={opt}>
                  {opt}
                </MenuItem>
              ))}
            </TextField>
          </Tooltip>
        </Grid>

        {[
          ['fase', 'Fase del Estudio'],
          ['siteNumber', 'Site Number'],
          ['comite', 'Comité Ético'],
          ['emailContacto', 'Email de Contacto'],
          ['resolucionAprobatoria', 'Resolución Aprobatoria'],
          ['productoInvestigacion', 'Producto de Investigación'],
          ['pacientesTotales', 'Pacientes Totales'],
          ['patologia', 'Patología'],
          ['protocolo', 'Código del Estudio'],
        ].map(([key, label]) => (
          <Grid size={{ xs: 12, md: 3 }} key={key}>
            <Tooltip title={label}>
              <TextField
                label={label}
                {...register(key as keyof Estudio)}
                defaultValue={form[key as keyof Estudio] || ''}
                fullWidth
                error={!!errors[key as keyof Estudio]}
                helperText={errors[key as keyof Estudio]?.message as string}
                InputLabelProps={{ shrink: true }}
              />
            </Tooltip>
          </Grid>
        ))}

        {[
          ['compromisoPacientes', 'Pacientes Asignados por Sponsor'],
          ['patientsCommitmentICLSR', 'Compromiso Pacientes ICLSR'],
        ].map(([key, label]) => (
          <Grid size={{ xs: 12, md: 3 }} key={key}>
            <Tooltip title={label}>
              <TextField
                label={label}
                type="number"
                {...register(key as keyof Estudio)}
                defaultValue={form[key as keyof Estudio] || ''}
                fullWidth
                error={!!errors[key as keyof Estudio]}
                helperText={errors[key as keyof Estudio]?.message as string}
                InputLabelProps={{ shrink: true }}
              />
            </Tooltip>
          </Grid>
        ))}

        <Grid size={{ xs: 12 }}>
          <Tooltip title="Breve descripción del objetivo principal del estudio clínico.">
            <TextField
              label="Objetivo del Estudio"
              {...register('objetivoEstudio')}
              defaultValue={form.objetivoEstudio || ''}
              fullWidth
              multiline
              rows={3}
              error={!!errors.objetivoEstudio}
              helperText={errors.objetivoEstudio?.message}
              InputLabelProps={{ shrink: true }}
            />
          </Tooltip>
        </Grid>
      </Grid>
    </Box>
  );
}
