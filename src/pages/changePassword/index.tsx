import { useEffect, useState } from 'react';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { Alert, IconButton, Paper, Snackbar, Stack, TextField } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { Container, Subtitle, Title } from '../login/styles'; 
import * as Yup from 'yup';
import CustomButton from '../../components/Button';
import { changePasswordSchema } from '../../features/users/Password/validation';
import { useLoading } from '../../context/loading.context';
import { authService } from '../../api/auth';

const RecoveryPasswordChange = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [buttonLoading, setButtonLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [successMessage, setSuccessMessage] = useState('');
  const [successSnackbarOpen, setSuccessSnackbarOpen] = useState(false);
  const navigate = useNavigate();
  const { showLoading , hideLoading } = useLoading();
  const { token } = useParams();
  const [errorToken, setErrorToken] = useState('');
  const [errorSnackbarOpen, setErrorSnackbarOpen] = useState(false);

  useEffect(() => {
    showLoading();
    setTimeout(() => {
      hideLoading();
    }, 1000);
  }, []);

  const handleInputChange = (field: string, value: string) => {
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }

    if (field === 'newPassword') setNewPassword(value);
    if (field === 'confirmPassword') setConfirmPassword(value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setButtonLoading(true);

    try {
      await changePasswordSchema.validate({ newPassword, confirmPassword }, { abortEarly: false });
      await authService.resetPassword({
        newPassword,
        confirmPassword,
        token: token || '',
      });
      
      setErrors({});

      setSuccessMessage('Contraseña actualizada correctamente. Redirigiendo...');
      setSuccessSnackbarOpen(true);

      setTimeout(async () => {
        navigate('/');
      }, 2000);
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        const validationErrors: Record<string, string> = {};
        error.inner.forEach((err) => {
          if (err.path) validationErrors[err.path] = err.message;
        });
        setErrors(validationErrors);
      } else {
        setErrorToken('Token inválido o expirado. Por favor, solicita un nuevo cambio de contraseña.');
        setErrorSnackbarOpen(true);
      }
    } finally {
      setButtonLoading(false);
    }
  };

  return (
    <Container>
      <Paper elevation={1} sx={{ p: 6, borderRadius: 2 }}>
        <form onSubmit={handleSubmit}>
          <Title>Crear nueva contraseña</Title>
          <Subtitle>Ingresa una nueva contraseña</Subtitle>

          <Stack spacing={3} marginBottom={3}>
            <TextField
              label="Nueva contraseña"
              type={showPassword ? 'text' : 'password'}
              fullWidth
              value={newPassword}
              onChange={(e) => handleInputChange('newPassword', e.target.value)}
              error={!!errors.newPassword}
              helperText={errors.newPassword}
              InputProps={{
                endAdornment: (
                  <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                    {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                  </IconButton>
                ),
              }}
            />

            <TextField
              label="Confirmar contraseña"
              type={showConfirmPassword ? 'text' : 'password'}
              fullWidth
              value={confirmPassword}
              onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword}
              InputProps={{
                endAdornment: (
                  <IconButton onClick={() => setShowConfirmPassword(!showConfirmPassword)} edge="end">
                    {showConfirmPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                  </IconButton>
                ),
              }}
            />
          </Stack>

          <Stack spacing={1.5}>
            <CustomButton
              type="submit"
              loading={buttonLoading}
              loadingText="Guardando..."
              $variant="contained"
              fullWidth
            >
              Guardar
            </CustomButton>
            <CustomButton
              $variant="outlined"
              fullWidth
              onClick={() => navigate('/me')}
            >
              Cancelar
            </CustomButton>
          </Stack>
        </form>
      </Paper>

      <Snackbar
        open={successSnackbarOpen}
        autoHideDuration={5000}
        onClose={() => setSuccessSnackbarOpen(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert severity="info" variant="filled" onClose={() => setSuccessSnackbarOpen(false)}>
          {successMessage}
        </Alert>
      </Snackbar>
      <Snackbar
        open={errorSnackbarOpen}
        autoHideDuration={5000}
        onClose={() => setErrorSnackbarOpen(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert severity="error" variant="filled" onClose={() => setErrorSnackbarOpen(false)}>
          {errorToken}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default RecoveryPasswordChange;
