import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  CircularProgress,
  Typography,
  Box,
  Paper,
  Stack,
} from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { authService } from '../../api/auth';
import CustomButton from '../../components/Button';

export const VerifyEmailPage = () => {
  const { token } = useParams();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      authService.verifyEmail(token)
        .then(() => setStatus('success'))
        .catch(() => setStatus('error'));
    } else {
      setStatus('error');
    }
  }, [token]);

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="80vh"
      px={2}
    >
      <Paper elevation={3} sx={{ p: 4, width: '100%', maxWidth: 480, textAlign: 'center' }}>
        {status === 'loading' && <CircularProgress />}
        
        {status === 'success' && (
          <Stack spacing={3} alignItems="center">
            <CheckCircleOutlineIcon color="success" sx={{ fontSize: 50 }} />
            <Typography variant="h6" color="success.main">
              ¡Su cuenta ha sido verificada exitosamente!
            </Typography>
            <CustomButton $variant="contained" onClick={() => navigate('/')}>
              Ir al Inicio de Sesión
            </CustomButton>
          </Stack>
        )}

        {status === 'error' && (
          <Stack spacing={3} alignItems="center">
            <ErrorOutlineIcon color="error" sx={{ fontSize: 50 }} />
            <Typography variant="h6" color="error.main">
              Error al verificar el correo.
            </Typography>
            <CustomButton $variant="outlined" onClick={() => navigate('/')}>
              Volver al Inicio
            </CustomButton>
          </Stack>
        )}
      </Paper>
    </Box>
  );
};
