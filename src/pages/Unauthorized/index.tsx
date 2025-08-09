// src/pages/UnauthorizedPage.tsx
import { Box, Typography, Stack } from '@mui/material';
import LockPersonIcon from '@mui/icons-material/LockPerson';
import { useNavigate } from 'react-router-dom';
import CustomButton from '../../components/Button';
import { useEffect } from 'react';
import { useLoading } from '../../context/loading.context';

const UnauthorizedPage = () => {
  const navigate = useNavigate();
  const { showLoading , hideLoading } = useLoading();

  useEffect(() => {
      showLoading();
      setTimeout(() => {
        hideLoading();
      }, 1000);
    }, []);

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleGoHome = () => {
    navigate('/home');
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
      textAlign="center"
      p={4}
    >
      <LockPersonIcon sx={{ fontSize: 100, color: 'error.main', mb: 2 }} />
      <Typography variant="h4" gutterBottom>
        Acceso denegado
      </Typography>
      <Typography variant="subtitle1" color="text.secondary" mb={4}>
        No tienes permisos para acceder a esta página.
      </Typography>

      <Stack direction="row" spacing={2}>
        <CustomButton $variant="outlined" size='medium' onClick={handleGoBack}>
          Volver
        </CustomButton>
        <CustomButton $variant="contained" size='medium' onClick={handleGoHome}>
          Ir al inicio
        </CustomButton>
      </Stack>
    </Box>
  );
};

export default UnauthorizedPage;
