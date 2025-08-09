import { useState } from 'react';
import { Alert, Box, Snackbar, Stack, TextField, Typography } from '@mui/material';
import { Card, Container } from '../login/styles';
import * as Yup from 'yup';
import CustomButton from '../../components/Button';
import { recoverSchema } from './validation';
import { authService } from '../../api/auth';

const RecoverPassword = () => {
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await recoverSchema.validate({ email }, { abortEarly: false });
      setErrors({});

      await authService.recoverPassword(email);

      setSnackbarMessage('Se ha enviado un correo para recuperar tu contraseña.');
      setSnackbarOpen(true);
      setEmail('');

    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        const validationErrors: Record<string, string> = {};
        error.inner.forEach(err => {
          if (err.path) validationErrors[err.path] = err.message;
        });
        setErrors(validationErrors);
      } else {
        setSnackbarMessage('Ocurrió un error. Intenta nuevamente.');
        setSnackbarOpen(true);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (value: string) => {
    if (errors.email) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors.email;
        return newErrors;
      });
    }
    setEmail(value);
  };

  return (
    <Container>
      <Card>
        <form onSubmit={handleSubmit}>
          <Typography variant="h5" mb={2}>
            ¿Olvidaste tu contraseña?
          </Typography>

          <Typography variant='body2' style={{ marginBottom: 20 }}>
            Ingresa un correo electrónico válido para enviarte un enlace de recuperación.
          </Typography>

          <Stack spacing={3} mb={3}>
            <TextField
              label="Correo electrónico"
              name="email"
              type="email"
              fullWidth
              value={email}
              onChange={(e) => handleChange(e.target.value)}
              error={!!errors.email}
              helperText={errors.email}
            />
          </Stack>

          <CustomButton
            type="submit"
            loading={loading}
            loadingText="Enviando..."
            $variant="contained"
            fullWidth
            disabled={loading}
            style={{ marginBottom: 16 }}
          >
            Enviar
          </CustomButton>

          <Box display="flex" justifyContent="center" alignItems="center" gap={1} mt={2}>
            <Typography variant="body2">¿Ya tienes una cuenta?</Typography>
            <Typography
              component="a"
              href="/"
              variant="body2"
              sx={{ textDecoration: 'none', color: 'primary.main', fontWeight: 500 }}
            >
              Iniciar sesión
            </Typography>
          </Box>

        </form>
      </Card>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={5000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          severity="info"
          variant="filled"
          onClose={() => setSnackbarOpen(false)}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default RecoverPassword;
