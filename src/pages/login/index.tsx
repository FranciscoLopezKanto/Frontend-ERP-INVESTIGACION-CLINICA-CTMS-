import { useState } from 'react'
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import { Alert, Box, IconButton, Snackbar, Stack, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/auth.context';
import { Card, Container, Subtitle, Title } from './styles';
import * as Yup from 'yup';
import { loginSchema } from './validation';
import CustomButton from '../../components/Button';


const Login = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate();
  const { login } = useAuth();
  const [buttonLoading, setButtonLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [errorMessage, setErrorMessage] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [successSnackbarOpen, setSuccessSnackbarOpen] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setButtonLoading(true);
    try {
      await loginSchema.validate({ email, password }, { abortEarly: false });
      setErrors({});

      await login(email, password);

      setSuccessMessage('Inicio de sesión exitoso.');
      setSuccessSnackbarOpen(true);

      setTimeout(() => {
        navigate('/home');
      }, 2000);

    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        const validationErrors: Record<string, string> = {};
        error.inner.forEach(err => {
          if (err.path) validationErrors[err.path] = err.message;
        });
          setErrors(validationErrors);
      }
      else {
        setErrorMessage('Credenciales incorrectas o email no verificado. Intenta nuevamente.');
        setSnackbarOpen(true);
      }
    } finally {
      setButtonLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }

    if (field === 'email') setEmail(value);
    if (field === 'password') setPassword(value);
  };


  return (
    <Container>
      <Card>
        <form onSubmit={handleSubmit}>
          <Title>¡Bienvenido!</Title>
          <Subtitle>Ingresa tus datos para iniciar sesión</Subtitle>

          <Stack spacing={3} marginBottom={2}>
            <TextField
              label="Correo electrónico"
              name="email"
              type="email"
              fullWidth
              value={email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              error={!!errors.email}
              helperText={errors.email}
            />

            <TextField
              label="Contraseña"
              name="password"
              type={showPassword ? 'text' : 'password'}
              fullWidth
              value={password}
              onChange={(e) => handleInputChange('password', e.target.value)}
              error={!!errors.password}
              helperText={errors.password}
              InputProps={{
                endAdornment: (
                  <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                    {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                  </IconButton>
                ),
              }}
            />
          </Stack>

          <CustomButton 
            type='submit' 
            loading={buttonLoading} 
            loadingText='Cargando...' 
            $variant='contained' 
            fullWidth
            disabled={buttonLoading}>
              Iniciar sesión
          </CustomButton>
          <Box display="flex" justifyContent="center" alignItems="center" gap={1} mt={2}>
            <Typography
              component="a"
              href="/recovery-password"
              variant="body2"
              sx={{ textDecoration: 'none', color: 'primary.main', fontWeight: 500 }}
            >
              Recuperar contraseña
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
        <Alert severity="error" variant="filled" onClose={() => setSnackbarOpen(false)}>
          {errorMessage}
        </Alert>
      </Snackbar>
      <Snackbar
        open={successSnackbarOpen}
        autoHideDuration={5000}
        onClose={() => setSuccessSnackbarOpen(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert severity="success" variant="filled" onClose={() => setSuccessSnackbarOpen(false)}>
          {successMessage}
        </Alert>
      </Snackbar>
    </Container>
  )
}

export default Login
