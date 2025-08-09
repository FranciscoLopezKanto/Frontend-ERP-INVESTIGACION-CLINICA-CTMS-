// EditarEstudioPage/index.tsx COMPLETO con compatibilidad Yup + Estudio sin error
import {
  Container,
  Box,
  CircularProgress,
  Typography,
  TextField,
} from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import AlertaSnackbar from '../../../components/AlertaSnackbar';
import CustomButton from '../../../components/Button';
import StepperEstadoEstudio from '../utils/StepperEstadoEstudio';
import SeccionInformacionPrincipal from './SeccionInformacionPrincipal';
import SeccionInformacionOperativa from './SeccionInformacionOperativa';
import SeccionFechasClave from './SeccionFechasClave';
import SeccionFechasFinales from './SeccionFechasFinales';
import useEditarEstudio from './useEditarEstudio';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { yupSchemaEditarEstudio } from '../schemas/estudioSchema';
import { useEffect } from 'react';
import { Estudio } from '../types';
import { EstadoEstudio } from '../enums';

export default function EditarEstudioPage() {
  const {
    form,
    usuarios,
    loading,
    successOpen,
    errorOpen,
    successMessage,
    errorMessage,
    setSuccessOpen,
    setErrorOpen,
    navigate,
    handleSubmit: submitToBackend,
  } = useEditarEstudio();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<Estudio>({
    resolver: yupResolver(yupSchemaEditarEstudio as any),
    mode: 'onBlur',
  });

  useEffect(() => {
    if (form) {
      Object.entries(form).forEach(([key, value]) => {
        setValue(key as keyof Estudio, value);
      });
    }
  }, [form, setValue]);

  if (loading || !form) return <CircularProgress />;

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Container sx={{ width: '110%' }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
          <Typography variant="h5" fontWeight={600}>
            {form.protocolo} - Estudio Clínico
          </Typography>
          <CustomButton $variant="outlined" onClick={() => navigate(-1)}>
            Cancelar
          </CustomButton>
        </Box>

        <Typography variant="body2" color="text.secondary" mb={3}>
          {form.patologia}
        </Typography>

        <StepperEstadoEstudio estadoActual={form.estado as EstadoEstudio} />

        <form onSubmit={handleSubmit(submitToBackend)}>
          <SeccionInformacionPrincipal
            form={form}
            handleChange={setValue}
            usuarios={usuarios}
            register={register}
            errors={errors}
          />
          <SeccionInformacionOperativa
            form={form}
            handleChange={setValue}
            register={register}
            errors={errors}
          />
          <SeccionFechasClave form={form} handleChange={setValue} />
          <SeccionFechasFinales form={form} handleChange={setValue} />

          {/* Comentarios */}
          <Box mt={4}>
            <Typography variant="subtitle1" fontWeight={600} mb={2}>
              Comentarios
            </Typography>
            <TextField
              label="Comentarios"
              {...register('observaciones')}
              fullWidth
              multiline
              rows={4}
              error={!!errors.observaciones}
              helperText={errors.observaciones?.message}
              InputLabelProps={{ shrink: true }}
            />
          </Box>

          <Box mt={4}>
            <CustomButton type="submit" $variant="contained">
              Guardar Cambios
            </CustomButton>
          </Box>
        </form>

        <AlertaSnackbar
          open={successOpen}
          onClose={() => setSuccessOpen(false)}
          message={successMessage}
          severity="success"
        />

        <AlertaSnackbar
          open={errorOpen}
          onClose={() => setErrorOpen(false)}
          message={errorMessage}
          severity="error"
        />
      </Container>
    </LocalizationProvider>
  );
}
