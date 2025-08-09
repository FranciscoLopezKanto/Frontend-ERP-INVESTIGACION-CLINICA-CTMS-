import { useState, useEffect } from 'react';
import { Box, TextField, Paper, Grid, Snackbar, Alert, Typography } from '@mui/material';
import { userService } from '../../../api/users';
import { useAuth } from '../../../context/auth.context';
import { IUser } from '../../../api/users/types';
import { StyledTextField, Title } from './styles';
import CustomButton from '../../../components/Button';
import { capitalizeWords, getRoleLabel, toInputDateFormat } from '../../utils';
import 'react-phone-input-2/lib/material.css';
import PhoneInput from 'react-phone-input-2';
import { userProfileSchema } from './validation';
import * as Yup from 'yup';
import { useLoading } from '../../../context/loading.context';
import { AREA_OPTIONS, POSITION_OPTIONS } from '../../../types/const';
import { DocumentEditableCard } from '../components/Docs';
import { authService } from '../../../api/auth';

export const UserProfile = () => {
  const { user , accessToken, loading } = useAuth();
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState<Partial<IUser>>({
    email: '',
    name: '',
    age: 0,
    rut: '',
    address: '',
    phone: '',
    birthdate: '',
    area: '',
    position: '',
    role: '',
    date_incorporation: '',
    password: '',
  });
  const [originalData, setOriginalData] = useState<Partial<IUser> | null>(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [ changeSnackbarOpen, setChangeSnackbarOpen ] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [buttonLoading, setButtonLoading] = useState(false);
  const { showLoading , hideLoading } = useLoading();
  const [formName, setFormName] = useState({
    firstName: '',
    lastName: '',
    secondLastName: ''
  });
  const [changeLoading, setChangeLoading] = useState(false);

  useEffect(() => {
    if (!loading && accessToken && user?.email) {
      userService.getUserByEmail(user.email).then((data: IUser | null) => {
        const cleanData = {
          ...data,
          birthdate: toInputDateFormat(data?.birthdate),
          date_incorporation: toInputDateFormat(data?.date_incorporation),
        };
        setFormData(cleanData);
        setOriginalData(cleanData);
        setFormName({
          firstName: data?.name.split(' ')[0] || '',
          lastName: data?.name.split(' ')[1] || '',
          secondLastName: data?.name.split(' ')[2] || ''
        });

      }).catch((err) => {
        console.warn('Error al obtener el usuario:', err);
      });
    }
  }, [loading, accessToken, user?.email]);

  useEffect(() => {
    showLoading();
    setTimeout(() => {
      hideLoading();
    }, 1000);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    const capitalizeFields = ['name', 'area', 'position'];
    const newValue = capitalizeFields.includes(name)
      ? capitalizeWords(value)
      : value;

    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    };
    
    setFormData({ ...formData, [name]: newValue });
    };

  const handleSave = async () => {
    setButtonLoading(true);
    try {
      await userProfileSchema.validate({...formData, ...formName}, { abortEarly: false });
      if (user?.userId) {
        const fullName = `${formName.firstName} ${formName.lastName} ${formName.secondLastName}`.trim();
        await userService.updateUser(user.userId, {
          ...formData,
          name: fullName,
        });
        setOriginalData(formData);
        const updatedFormData = { ...formData, name: fullName };
        setFormData(updatedFormData);
      }
      setEditMode(false);
      setSnackbarOpen(true);
      setErrors({});
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        const validationErrors: Record<string, string> = {};
        error.inner.forEach(err => {
          if (err.path) validationErrors[err.path] = err.message;
        });
        setErrors(validationErrors);
      }
    }
    finally {
      setButtonLoading(false);
    }
  };

  const handleCancel = async () => {
    if (originalData) {
      const [firstName = '', lastName = '', secondLastName = ''] = (originalData?.name || '').split(' ');
      setFormName({ firstName, lastName, secondLastName });
      setFormData(originalData);
    }
    setEditMode(false);
  }

  const handleChangePassword = async () => {
    setChangeLoading(true);
    if (!user?.email) return;

    try {
      await authService.requestChangePassword(user.email);
      setChangeSnackbarOpen(true);
    } catch (err) {
      console.error('Error al solicitar cambio de contraseña:', err);
    } finally {
      setChangeLoading(false);
    }
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
      <Paper elevation={0} sx={{ padding: 4, maxWidth: 800, width: '100%' }}>
        <Title> Perfil | {formData?.name} </Title>

        <Grid container spacing={2}>
          <Grid size={12}>
            <StyledTextField
              label="Correo electrónico"
              name="email"
              value={formData.email}
              onChange={handleChange}
              fullWidth
              disabled={!editMode}
              error={!!errors.email}
              helperText={errors.email}
            />
          </Grid>

          <Grid size={6}>
            <TextField
              label="Contraseña"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              fullWidth
              disabled={true}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>

          <Grid size={6} alignContent={'center'} >
            <CustomButton onClick={handleChangePassword} loading={changeLoading} loadingText='Solicitando...'> Cambiar contraseña </CustomButton>
          </Grid>

          {!editMode ? (
            <Grid size={6}>
              <StyledTextField
                label="Nombre completo"
                name="name"
                value={formData.name}
                fullWidth
                disabled
                InputLabelProps={{ shrink: true }}
                error={!!errors.name}
                helperText={errors.name}
              />
            </Grid>
          ) : (
            <>
              <Grid size={6}>
                <StyledTextField
                  label="Nombre"
                  name="firstName"
                  value={formName.firstName}
                  onChange={(e) => setFormName(prev => ({ ...prev, firstName: e.target.value }))}
                  fullWidth
                  InputLabelProps={{ shrink: true }}
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
                  InputLabelProps={{ shrink: true }}
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
                  InputLabelProps={{ shrink: true }}
                  error={!!errors.secondLastName}
                  helperText={errors.secondLastName}
                />
              </Grid>
            </>
          )}
          <Grid size={6}>
            <StyledTextField 
              label="Edad" 
              name="age" 
              type="number" 
              value={formData.age} 
              onChange={handleChange} 
              fullWidth 
              disabled={!editMode} 
              InputLabelProps={{ shrink: true }}
              error={!!errors.age}
              helperText={errors.age}
            />
          </Grid>

          <Grid size={6}>
            <StyledTextField 
              label="RUT" 
              name="rut" 
              value={formData.rut} 
              onChange={handleChange} 
              fullWidth 
              disabled={!editMode} 
              error={!!errors.rut}
              helperText={errors.rut}
            />
          </Grid>
          <Grid size={6}>
            <PhoneInput
              specialLabel='Teléfono'
              inputStyle={{ width: '100%', height: '56px', borderRadius: '4px', border: '1px solid #ccc' }}
              country={'cl'}
              value={formData.phone}
              onChange={(value) => setFormData(prev => ({ ...prev, phone: `+${value}` }))}
              disabled={!editMode}
            />
          </Grid>

          <Grid size={6}>
            <StyledTextField 
              label="Dirección" 
              name="address" 
              value={formData.address} 
              onChange={handleChange} 
              fullWidth 
              disabled={!editMode} 
              error={!!errors.address}
              helperText={errors.address}
            />
          </Grid>

          <Grid size={6}>
            <StyledTextField
              label="Fecha de nacimiento"
              name="birthdate"
              type="date"
              value={formData.birthdate}
              onChange={handleChange}
              fullWidth
              InputLabelProps={{ shrink: true }}
              disabled={!editMode}
              error={!!errors.birthdate}
              helperText={errors.birthdate}
            />
          </Grid>

          <Grid size={6}>
            <StyledTextField
              select
              label="Área"
              name="area"
              value={formData.area}
              onChange={handleChange}
              fullWidth
              disabled={!editMode}
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
              value={formData.position}
              onChange={handleChange}
              fullWidth
              disabled={!editMode}
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
            <TextField label="Rol" name="role" value={getRoleLabel(formData.role)} onChange={handleChange} fullWidth disabled={true} />
          </Grid>
          <Grid size={6}>
            <StyledTextField
              label="Fecha de incorporación"
              name="date_incorporation"
              type="date"
              value={formData.date_incorporation}
              onChange={handleChange}
              fullWidth
              InputLabelProps={{ shrink: true }}
              disabled={!editMode}
              error={!!errors.date_incorporation}
              helperText={errors.date_incorporation}
            />
          </Grid>
        </Grid>

        {editMode ? (
          <Box mt={3} display="flex" gap={2}>
            <CustomButton $variant="contained" size='medium' onClick={handleSave} loading={buttonLoading} loadingText='Guardando...'>Guardar</CustomButton>
            <CustomButton $variant="outlined" size='medium' onClick={handleCancel}>Cancelar</CustomButton>
          </Box>
        ) : (
          <Box mt={3}>
            <CustomButton $variant='contained' size='medium' onClick={() => setEditMode(true)}>Editar</CustomButton>
          </Box>
        )}
      {formData.requiredDocuments && formData.requiredDocuments.length > 0 && (
        <Box mt={5}>
          <Typography variant="h6" mb={2}>Documentos requeridos</Typography>
          <Grid container spacing={3} mt={5}>
            {formData.requiredDocuments.map((doc) => (
              <Grid  size={6}
              key={doc.name}>
                <DocumentEditableCard
                  name={doc.name}
                  url={doc.url}
                  createdAt={doc.createdAt}
                  expirationDate={doc.expirationDate}
                  notApplicable={doc.notApplicable}
                  onSave={async (updatedDoc) => {
                    if (!user?.userId) return;
                    try {
                      const updated = await userService.updateDocument(user.userId, updatedDoc);
                      if (updated?.requiredDocuments) {
                        setFormData((prev) => ({ ...prev, requiredDocuments: updated.requiredDocuments }));
                        setSnackbarOpen(true);
                      }
                    } catch (error) {
                      console.error('Error actualizando documento:', error);
                    }
                  }}
                />
              </Grid>
            ))}
          </Grid>
        </Box>
      )}

      </Paper>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={5000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert severity="info" variant="filled" onClose={() => setSnackbarOpen(false)}>
          Perfil actualizado con éxito
        </Alert>
      </Snackbar>
      <Snackbar
        open={changeSnackbarOpen}
        autoHideDuration={5000}
        onClose={() => setChangeSnackbarOpen(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert severity="info" variant="filled" onClose={() => setChangeSnackbarOpen(false)}>
          Se ha enviado un correo para cambiar la contraseña
        </Alert>
      </Snackbar>
    </Box>
  );
};