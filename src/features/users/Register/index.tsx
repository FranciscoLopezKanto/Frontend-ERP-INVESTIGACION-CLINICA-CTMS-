import { Alert, Grid, Paper, Snackbar, Stack, Typography } from "@mui/material"
import { Container, Subtitle, Title } from "../../../pages/login/styles"
import CustomButton from "../../../components/Button"
import { useEffect, useState } from "react";
import * as Yup from 'yup';
import { userRegisterSchema } from "./validation"
import { authService } from "../../../api/auth";
import { IAuthRegisterContext, ISplitName } from "../../../api/auth/types";
import { useNavigate } from "react-router-dom";
import { StyledTextField } from "../Profile/styles";
import PhoneInput from "react-phone-input-2";
import axios from "axios";
import { useLoading } from "../../../context/loading.context";
import { AREA_OPTIONS, POSITION_OPTIONS, ROLE_OPTIONS } from "../../../types/const";

export const RegisterUser = () => {
    const [buttonLoading, setButtonLoading] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [errorSnackbarOpen, setErrorSnackbarOpen] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [formValues, setFormValues] = useState<IAuthRegisterContext>({
        name: '',
        email: '',
        password: '',
        age: 18,
        rut: '',
        phone: '',
        address: '',
        birthdate: '',
        area: AREA_OPTIONS[0],
        position: POSITION_OPTIONS[0],
        role: ROLE_OPTIONS[0].value,
        date_incorporation: '',
    });
    const [successSnackbarOpen, setSuccessSnackbarOpen] = useState(false);
    const navigate = useNavigate();
    const { showLoading , hideLoading } = useLoading();
    const [ formName, setFormName ] = useState<ISplitName>({
        firstName: '',
        lastName: '',
        secondLastName: ''
    });

    useEffect(() => {
        showLoading();
        setTimeout(() => {
        hideLoading();
        }, 1000);
    }, []);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault(); 
        setButtonLoading(true);
        setErrors({});
        try {

            await userRegisterSchema.validate(
            { ...formValues, ...formName },
            { abortEarly: false }
            );

            // Unir el nombre completo
            const fullName = `${formName.firstName} ${formName.lastName} ${formName.secondLastName}`.trim();

            await authService.register({
            ...formValues,
            name: fullName,
            age: Number(formValues.age),
            });

            setSuccessMessage('Registro exitoso.');
            setSuccessSnackbarOpen(true);
            setTimeout(() => {
                navigate('/colaboradores');
            }, 2000);

        } catch (error) { 
            if (error instanceof Yup.ValidationError) {
                const validationErrors: Record<string, string> = {};
                error.inner.forEach(err => {
                    if (err.path) validationErrors[err.path] = err.message;
                });
                setErrors(validationErrors);
            }
            else if (axios.isAxiosError(error)) {
                const errorMessage = error.response?.data?.message;
                setErrorMessage(errorMessage || 'Ocurrió un error en el registro');
                setErrorSnackbarOpen(true);

            }
            else {
                setErrorMessage('Ocurrió un error inesperado');
                setErrorSnackbarOpen(true);
            }
        }
        finally {
            setButtonLoading(false);
        }
    }

    const handleInputChange = (field: string, value: string) => {
        if (errors[field]) {
        setErrors((prev) => {
            const newErrors = { ...prev };
            delete newErrors[field];
            return newErrors;
        });
        }
        setFormValues((prev) => ({ ...prev, [field]: value }));
    };

    
    return (
      <Container>
        <Paper elevation={0} sx={{ padding: 4, maxWidth: 800, width: '100%', paddingTop: 12, borderRadius: 2 }}>
            <form onSubmit={handleSubmit}>
                <Title>Crear nueva cuenta</Title>
                <Subtitle>Ingresa los datos del nuevo colaborador</Subtitle>
    
                <Stack spacing={3} marginBottom={3}>
                    <Grid container spacing={3}>
                        <Grid size={6}>
                            <StyledTextField 
                                label="Nombre" 
                                name="firstName" 
                                value={formName.firstName} 
                                onChange={(e) => setFormName(prev => ({ ...prev, firstName: e.target.value }))}
                                fullWidth 
                                onKeyDown={(e) => {
                                    if (e.key === ' ') e.preventDefault();
                                }}
                                error={!!errors.firstName}
                                helperText={errors.firstName}
                            />
                        </Grid>   
                        <Grid size={6}>
                            <StyledTextField 
                                label="Apellido Paterno" 
                                name="lastName" 
                                value={formName.lastName} 
                                onChange={(e) => setFormName(prev => ({ ...prev, lastName: e.target.value }))}
                                fullWidth 
                                onKeyDown={(e) => {
                                    if (e.key === ' ') e.preventDefault(); 
                                }}
                                error={!!errors.lastName}
                                helperText={errors.lastName}
                            />
                            </Grid>

                            <Grid size={6}>
                            <StyledTextField 
                                label="Apellido Materno" 
                                name="secondLastName" 
                                value={formName.secondLastName} 
                                onChange={(e) => setFormName(prev => ({ ...prev, secondLastName: e.target.value }))}
                                fullWidth 
                                onKeyDown={(e) => {
                                    if (e.key === ' ') e.preventDefault(); 
                                }}
                                error={!!errors.secondLastName}
                                helperText={errors.secondLastName}
                            />
                            </Grid>         
                    </Grid>
                    <Grid container spacing={2}>
                        <Grid size={6}>
                            <StyledTextField
                                label="Correo electrónico"
                                name="email"
                                value={formValues.email}
                                onChange={(e) => handleInputChange('email', e.target.value)}
                                fullWidth
                                error={!!errors.email}
                                helperText={errors.email}
                            />
                        </Grid>

                        <Grid size={6}>
                            <StyledTextField
                            label="Contraseña"
                            name="password"
                            type="password"
                            value={formValues.password}
                            onChange={(e) => handleInputChange('password', e.target.value)}
                            fullWidth
                            />
                        </Grid>
                        <Grid size={6}>
                            <StyledTextField 
                            label="Edad" 
                            name="age" 
                            type="number" 
                            value={formValues.age} 
                            onChange={(e) => handleInputChange('age', e.target.value)} 
                            fullWidth 
                            InputLabelProps={{ shrink: true }}
                            error={!!errors.age}
                            helperText={errors.age}
                            />
                        </Grid>

                        <Grid size={6}>
                            <StyledTextField 
                            label="RUT" 
                            name="rut" 
                            value={formValues.rut} 
                            onChange={(e) => handleInputChange('rut', e.target.value)} 
                            fullWidth 
                            error={!!errors.rut}
                            helperText={errors.rut}
                            />
                        </Grid>
                        <Grid size={6}>
                            <PhoneInput
                            specialLabel='Teléfono'
                            inputStyle={{ width: '100%', height: '56px', borderRadius: '4px', border: '1px solid #ccc' }}
                            country={'cl'}
                            value={formValues.phone}
                            onChange={(value) => setFormValues(prev => ({ ...prev, phone: `+${value}` }))}
                            />
                        </Grid>

                        <Grid size={6}>
                            <StyledTextField 
                            label="Dirección" 
                            name="address" 
                            value={formValues.address} 
                            onChange={(e) => handleInputChange('address', e.target.value)} 
                            fullWidth 
                            error={!!errors.address}
                            helperText={errors.address}
                            />
                        </Grid>
                        <Grid size={6}>
                            <StyledTextField
                            label="Fecha de nacimiento"
                            name="birthdate"
                            type="date"
                            value={formValues.birthdate}
                            onChange={(e) => handleInputChange('birthdate', e.target.value)}
                            fullWidth
                            InputLabelProps={{ shrink: true }}
                            error={!!errors.birthdate}
                            helperText={errors.birthdate}
                            />
                        </Grid>

                        <Grid size={6}>
                            <StyledTextField
                            select
                            label="Área"
                            name="area"
                            value={formValues.area}
                            onChange={(e) => handleInputChange('area', e.target.value)}
                            fullWidth
                            SelectProps={{ native: true }}
                            InputLabelProps={{ shrink: true }}
                            placeholder='Selecciona un área'
                            >
                            {AREA_OPTIONS.map((option) => (
                                <option key={option} value={option}>
                                {option}
                                </option>
                            ))}
                            </StyledTextField>
                        </Grid>

                        <Grid size={6}>
                            <StyledTextField
                            select
                            label="Cargo"
                            name="position"
                            value={formValues.position}
                            onChange={(e) => handleInputChange('position', e.target.value)}
                            fullWidth
                            SelectProps={{ native: true }}
                            InputLabelProps={{ shrink: true }}
                            placeholder='Selecciona un cargo'
                            >
                            {POSITION_OPTIONS.map((option) => (
                                <option key={option} value={option}>
                                {option}
                                </option>
                            ))}
                            </StyledTextField>
                        </Grid>  

                        <Grid size={6}>
                            <StyledTextField 
                                select
                                label="Rol" 
                                name="role" 
                                value={formValues.role} 
                                onChange={(e) => handleInputChange('role', e.target.value)} 
                                fullWidth 
                                placeholder="Selecciona un rol"
                                SelectProps={{ native: true }}
                                error={!!errors.role}
                                helperText={errors.role}
                            >
                                {ROLE_OPTIONS.map((option) => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </StyledTextField>

                        </Grid>
                        <Grid size={6}>
                            <StyledTextField
                            label="Fecha de incorporación"
                            name="date_incorporation"
                            type="date"
                            value={formValues.date_incorporation}
                            onChange={(e) => handleInputChange('date_incorporation', e.target.value)}
                            fullWidth
                            InputLabelProps={{ shrink: true }}
                            error={!!errors.date_incorporation}
                            helperText={errors.date_incorporation}
                            />
                        </Grid>                      
                    </Grid>
                    {formValues.role === 'admin' ? (
                        <Typography variant="body2" color="info.main" mt={1}>
                            Rol de Administrador: Tiene acceso total a todas las funcionalidades del sistema.
                        </Typography>
                        ) : (
                        <Typography variant="body2" color="warning.main" mt={1}>
                            Rol de Usuario: Tiene acceso limitado. No podrá registrar ni editar colaboradores, ni visualizar o registrar pacientes. En futuras versiones, se implementarán permisos más detallados por usuario.
                        </Typography>
                    )}

                </Stack>

                <Stack spacing={1.5}>
                    <CustomButton 
                        type="submit" 
                        $variant="contained"
                        loading={buttonLoading}
                        loadingText="Cargando..." 
                        fullWidth 
                        disabled={buttonLoading}
                    >
                        Registrar
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
            <Alert severity="success" variant="filled" onClose={() => setSuccessSnackbarOpen(false)}>
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
            {errorMessage}
            </Alert>
        </Snackbar>
      </Container>  
    )
}