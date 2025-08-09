import {
  Container,
  Box,
  Typography,
  TextField,
  CircularProgress,
} from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import CustomButton from '../../../components/Button';
import AlertaSnackbar from '../../../components/AlertaSnackbar';
import SeccionInformacionPrincipal from '../EditEstudio/SeccionInformacionPrincipal';
import SeccionInformacionOperativa from '../EditEstudio/SeccionInformacionOperativa';
import SeccionFechasClave from '../EditEstudio/SeccionFechasClave';
import SeccionFechasFinales from '../EditEstudio/SeccionFechasFinales';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { yupSchemaEditarEstudio } from '../schemas/estudioSchema';
import { useEffect, useState } from 'react';
import { Estudio, Usuario } from '../types';
import { useNavigate } from 'react-router-dom';
import { userService } from '../../../api/users';
import { estudiosService } from '../services';

export default function CrearEstudioPage() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<Estudio>({
    resolver: yupResolver(yupSchemaEditarEstudio as any),
    mode: 'onBlur',
    defaultValues: {},
  });

  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [loading, setLoading] = useState(true);
  const [successOpen, setSuccessOpen] = useState(false);
  const [errorOpen, setErrorOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    userService
      .getUsers()
      .then((data) => {
        setUsuarios(data.filter((u) => u.position === 'Investigador(a)'));
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const onSubmit = async (data: Estudio) => {
  try {
    await estudiosService.create(data);
    setSuccessMessage('✅ Estudio creado correctamente');
    setSuccessOpen(true);
    setTimeout(() => {
      navigate('/investigaciones', { state: { busquedaInicial: data.protocolo } });
    }, 2000);
  } catch (err: any) {
    console.error('❌ Error al crear estudio:', err);
    setErrorMessage('❌ Error al crear el estudio');
    setErrorOpen(true);
  }
};

  if (loading) return <CircularProgress />;

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Container sx={{ width: '110%' }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
          <Typography variant="h5" fontWeight={600}>
            Crear Estudio Clínico
          </Typography>
          <CustomButton $variant="outlined" onClick={() => navigate(-1)}>
            Cancelar
          </CustomButton>
        </Box>

        <form onSubmit={handleSubmit(onSubmit)}>
          <SeccionInformacionPrincipal
            form={{} as Estudio}
            handleChange={setValue}
            usuarios={usuarios}
            register={register}
            errors={errors}
          />
          <SeccionInformacionOperativa
            form={{} as Estudio}
            handleChange={setValue}
            register={register}
            errors={errors}
          />
          <SeccionFechasClave form={{} as Estudio} handleChange={setValue} />
          <SeccionFechasFinales form={{} as Estudio} handleChange={setValue} />

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
              Crear Estudio
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
