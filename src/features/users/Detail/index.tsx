import { useEffect, useState } from 'react';
import { Box, Paper, Grid, Snackbar, Alert, Dialog, DialogActions, Typography } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { IUser } from '../../../api/users/types';
import { userService } from '../../../api/users';
import { StyledTextField, Title } from '../Profile/styles';
import CustomButton from '../../../components/Button';
import PhoneInput from 'react-phone-input-2';
import { userDetailSchema } from './validation';
import { toInputDateFormat, capitalizeWords } from '../../utils';
import * as Yup from 'yup';
import { useLoading } from '../../../context/loading.context';
import { CustomDialogContent, CustomDialogTitle } from '../../../components/Sidebar/styles';
import { AREA_OPTIONS, POSITION_OPTIONS, ROLE_OPTIONS } from '../../../types/const';
import { DocumentEditableCard } from '../components/Docs';
import { useAuth } from '../../../context/auth.context';

export const UserDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
 
  const [formData, setFormData] = useState<Partial<IUser>>({});
  const [originalData, setOriginalData] = useState<Partial<IUser> | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [editMode, setEditMode] = useState(false);
  const [buttonLoading, setButtonLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [ deteleSnackbarOpen , setDeleteSnackbarOpen ] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const { showLoading , hideLoading } = useLoading();
  const [deleting, setDeleting] = useState(false);
  const [formName, setFormName] = useState({
    firstName: '',
    lastName: '',
    secondLastName: ''
  });

  useEffect(() => {
    if (id) {
      userService.getUserById(id).then((data) => {
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
        
        console.log('Usuario obtenido:', cleanData);
      }).catch((err) => {
        console.error('Error al obtener usuario:', err);
      });
    }
  }, [id]);

    useEffect(() => {
        showLoading();
        setTimeout(() => {
            hideLoading();
        }, 1000);
    }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const capitalizeFields = ['name', 'area', 'position'];
    const newValue = capitalizeFields.includes(name) ? capitalizeWords(value) : value;

    setFormData(prev => ({ ...prev, [name]: newValue }));
    if (errors[name]) {
      setErrors(prev => {
        const copy = { ...prev };
        delete copy[name];
        return copy;
      });
    }
  };

  const handleSave = async () => {
    setButtonLoading(true);
    try {
      await userDetailSchema.validate({ ...formData, ...formName }, { abortEarly: false });
      if (id) {
        const fullName = `${formName.firstName} ${formName.lastName} ${formName.secondLastName}`.trim();
        await userService.updateUser(id, {
          ...formData,
          name: fullName,
        });
        const updatedFormData = { ...formData, name: fullName };
        setFormData(updatedFormData);
        setOriginalData(formData);
        setSnackbarOpen(true);
        setEditMode(false);
      }
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        const validationErrors: Record<string, string> = {};
        error.inner.forEach(err => {
          if (err.path) validationErrors[err.path] = err.message;
        });
        setErrors(validationErrors);
      }
    } finally {
      setButtonLoading(false);
    }
  };

  const handleCancel = () => {
    if (originalData) {
      const [firstName = '', lastName = '', secondLastName = ''] = (originalData?.name || '').split(' ');
      setFormName({ firstName, lastName, secondLastName });
      setFormData(originalData);
    }
    setEditMode(false);
  };

  const handleDelete = async () => {
    if (id) {
    setDeleting(true); 
    try {
      await userService.deleteUser(id);
      setDeleteSnackbarOpen(true);
      setTimeout(() => {
        navigate('/colaboradores');
      }, 2000);
    } catch (err) {
      console.error('Error al eliminar:', err);
    } finally {
      setDeleting(false); 
    }
  }
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
      <Paper elevation={0} sx={{ padding: 4, maxWidth: 800, width: '100%' }}>
        <Title> Colaborador | {formData?.name} </Title>

        <Grid container spacing={2}>
          <Grid size={12}>
            <StyledTextField label="Correo electrónico" name="email" value={formData.email} onChange={handleChange} fullWidth InputLabelProps={{ shrink: true }} disabled={!editMode} error={!!errors.email} helperText={errors.email}/>
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
                  onKeyDown={(e) => {
                    if (e.key === ' ') e.preventDefault(); 
                  }}
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
                  onKeyDown={(e) => {
                    if (e.key === ' ') e.preventDefault(); 
                  }}
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
                  onKeyDown={(e) => {
                    if (e.key === ' ') e.preventDefault(); 
                  }}
                  InputLabelProps={{ shrink: true }}
                  error={!!errors.secondLastName}
                  helperText={errors.secondLastName}
                />
              </Grid>
            </>
          )}
          <Grid size={6}>
            <StyledTextField label="Edad" name="age" type="number" value={formData.age} onChange={handleChange} fullWidth InputLabelProps={{ shrink: true }} disabled={!editMode} error={!!errors.age} helperText={errors.age}/>
          </Grid>

          <Grid size={6}>
            <StyledTextField label="RUT" name="rut" value={formData.rut} onChange={handleChange} fullWidth InputLabelProps={{ shrink: true }} disabled={!editMode} error={!!errors.rut} helperText={errors.rut}/>
          </Grid>
          <Grid size={6}>
            <PhoneInput country="cl" value={formData.phone} onChange={(value) => setFormData(prev => ({ ...prev, phone: `+${value}` }))} disabled={!editMode} inputStyle={{ width: '100%', height: '56px', borderRadius: '4px', border: '1px solid #ccc' }} />
          </Grid>

          <Grid size={6}>
            <StyledTextField label="Dirección" name="address" value={formData.address} onChange={handleChange} fullWidth InputLabelProps={{ shrink: true }} disabled={!editMode} error={!!errors.address} helperText={errors.address}/>
          </Grid>
          <Grid size={6}>
            <StyledTextField label="Fecha de nacimiento" name="birthdate" type="date" value={formData.birthdate} onChange={handleChange} fullWidth InputLabelProps={{ shrink: true }} disabled={!editMode} error={!!errors.birthdate} helperText={errors.birthdate}/>
          </Grid>

          <Grid size={6}>
            <StyledTextField select label="Área" name="area" value={formData.area} onChange={handleChange} fullWidth SelectProps={{ native: true }} disabled={!editMode}>
              {AREA_OPTIONS.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </StyledTextField>
          </Grid>
          <Grid size={6}>
            <StyledTextField select label="Cargo" name="position" value={formData.position} onChange={handleChange} fullWidth SelectProps={{ native: true }} disabled={!editMode}>
              {POSITION_OPTIONS.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </StyledTextField>
          </Grid>

          <Grid size={6}>
            <StyledTextField
              select
              label="Rol"
              name="role"
              value={formData.role || ''}
              onChange={handleChange}
              fullWidth
              SelectProps={{ native: true }}
              InputLabelProps={{ shrink: true }}
              disabled={!editMode}
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
            <StyledTextField label="Fecha de incorporación" name="date_incorporation" type="date" value={formData.date_incorporation} onChange={handleChange} fullWidth InputLabelProps={{ shrink: true }} disabled={!editMode} error={!!errors.date_incorporation} helperText={errors.date_incorporation}/>
          </Grid>
          {editMode && (
            formData.role === 'admin' ? (
              <Typography variant="body2" color="info.main" mt={1}>
                Rol de Administrador: Tiene acceso total a todas las funcionalidades del sistema, incluyendo gestión de usuarios y pacientes.
              </Typography>
            ) : (
              <Typography variant="body2" color="warning.main" mt={1}>
                Rol de Usuario: Tiene acceso limitado. No podrá registrar ni editar colaboradores, ni visualizar o registrar pacientes. En futuras versiones, se implementarán permisos más detallados por usuario.
              </Typography>
            )
          )} 
        </Grid>

        <Box mt={3} display="flex" gap={2}>
          {editMode ? (
            <>
              <CustomButton $variant="contained" onClick={handleSave} loading={buttonLoading} loadingText="Guardando...">Guardar</CustomButton>
              <CustomButton $variant="outlined" onClick={handleCancel}>Cancelar</CustomButton>
            </>
          ) : (
            <>
              <CustomButton $variant="contained" onClick={() => setEditMode(true)}>Editar</CustomButton>
              <CustomButton $variant="outlined" color="danger" onClick={() => setDeleteDialogOpen(true)}>Eliminar</CustomButton>
            </>
          )}
        </Box>

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

      <Snackbar open={snackbarOpen} autoHideDuration={4000} onClose={() => setSnackbarOpen(false)} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
        <Alert severity="info" variant="filled" onClose={() => setSnackbarOpen(false)}>Usuario actualizado correctamente</Alert>
      </Snackbar>

      <Snackbar open={deteleSnackbarOpen} autoHideDuration={4000} onClose={() => setDeleteSnackbarOpen(false)} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
        <Alert severity="error" variant="filled" onClose={() => setDeleteSnackbarOpen(false)}>Usuario eliminado correctamente</Alert>
      </Snackbar>

      <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)} fullWidth>
        <CustomDialogTitle>¿Estás seguro?</CustomDialogTitle>
        <CustomDialogContent>Esta acción eliminará permanentemente al usuario.</CustomDialogContent>
        <DialogActions>
          <CustomButton $variant="outlined" onClick={() => setDeleteDialogOpen(false)}>Cancelar</CustomButton>
          <CustomButton $variant="contained" loading={deleting} loadingText='Eliminando...' onClick={handleDelete}>Eliminar</CustomButton>
        </DialogActions>
      </Dialog>
    </Box>
  );
};
