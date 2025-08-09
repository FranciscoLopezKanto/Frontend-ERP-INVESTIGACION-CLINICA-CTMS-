import { Grid, TextField, Tooltip, Typography, Box, MenuItem } from '@mui/material';
import { Estudio, Usuario } from '../../types';
import { AreasEstudio, EstadoEstudio } from '../../enums';
import { UseFormRegister, UseFormSetValue, FieldErrors } from 'react-hook-form';

type Props = {
  form: Estudio;
  usuarios: Usuario[];
  handleChange: UseFormSetValue<Estudio>;
  register: UseFormRegister<Estudio>;
  errors: FieldErrors<Estudio>;
};

export default function SeccionInformacionPrincipal({
  form,
  usuarios,
  register,
  errors,
}: Props) {
  return (
    <Box mb={3}>
      <Typography variant="subtitle1" fontWeight={600} mb={2}>
        Información Principal
      </Typography>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 3 }}>
          <Tooltip title="Investigador(a) responsable del estudio en el centro.">
            <TextField
              label="Investigador Principal"
              select
              {...register('investigadorPrincipal')}
              defaultValue={form.investigadorPrincipal || ''}
              fullWidth
              error={!!errors.investigadorPrincipal}
              helperText={errors.investigadorPrincipal?.message}
              InputLabelProps={{ shrink: true }}
            >
              <MenuItem value="">Seleccione...</MenuItem>
              {usuarios.map((u) => (
                <MenuItem key={u._id} value={u.name}>
                  {u.name}
                </MenuItem>
              ))}
            </TextField>
          </Tooltip>
        </Grid>

        <Grid size={{ xs: 12, md: 3 }}>
          <Tooltip title="Área médica o unidad a la que pertenece el estudio.">
            <TextField
              label="Área"
              select
              {...register('area')}
              defaultValue={form.area || ''}
              fullWidth
              error={!!errors.area}
              helperText={errors.area?.message}
              InputLabelProps={{ shrink: true }}
            >
              <MenuItem value="">Seleccione...</MenuItem>
              {Object.values(AreasEstudio).map((area) => (
                <MenuItem key={area} value={area}>
                  {area}
                </MenuItem>
              ))}
            </TextField>
          </Tooltip>
        </Grid>

        <Grid size={{ xs: 12, md: 3 }}>
          <Tooltip title="Sponsor o laboratorio responsable del estudio.">
            <TextField
              label="Sponsor"
              {...register('sponsor')}
              defaultValue={form.sponsor || ''}
              fullWidth
              error={!!errors.sponsor}
              helperText={errors.sponsor?.message}
              InputLabelProps={{ shrink: true }}
            />
          </Tooltip>
        </Grid>

        <Grid size={{ xs: 12, md: 3 }}>
          <Tooltip title="Estado operativo actual del estudio.">
            <TextField
              label="Estado Actual"
              select
              {...register('estado')}
              defaultValue={form.estado || ''}
              fullWidth
              error={!!errors.estado}
              helperText={errors.estado?.message}
              InputLabelProps={{ shrink: true }}
            >
              <MenuItem value="">Seleccione...</MenuItem>
              {Object.values(EstadoEstudio).map((estado) => (
                <MenuItem key={estado} value={estado}>
                  {estado}
                </MenuItem>
              ))}
            </TextField>
          </Tooltip>
        </Grid>

        <Grid size={{ xs: 12 }}>
          <Tooltip title="Título completo del protocolo del estudio.">
            <TextField
              label="Título del Estudio"
              {...register('titulo')}
              defaultValue={form.titulo || ''}
              fullWidth
              multiline
              rows={3}
              error={!!errors.titulo}
              helperText={errors.titulo?.message}
              InputLabelProps={{ shrink: true }}
            />
          </Tooltip>
        </Grid>
      </Grid>
    </Box>
  );
}
