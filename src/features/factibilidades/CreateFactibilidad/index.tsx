// IMPORTS
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Grid,
  MenuItem,
  Paper,
  Stack,
  TextField,
  Typography,
  IconButton,
  Tooltip,
} from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { es } from 'date-fns/locale';
import { Delete } from '@mui/icons-material';
import AddIcon from '@mui/icons-material/Add';

import { userService } from '../../../api/users';
import { factibilidadesService } from '../services/FactibilidadesService';
import { CreateFactibilidad } from '../services/FactibilidadesService/types';

import CustomButton from '../../../components/Button';
import AlertaSnackbar from '../../../components/AlertaSnackbar';
import { crearFactibilidadSchemaYup } from './yup';

export default function CrearFactibilidadPage() {
  const navigate = useNavigate();

  const [data, setData] = useState<CreateFactibilidad>({
    proposalId: ' ',
    code: '', sponsorName: '', email: '', feasibilityStatus: 'Pendiente', feasibilityValue: 'SI',
    interest: 'SI', initialEmail: '', documentArrivalDate: '', visitDate: '', feasibilitySentDate: '',
    area: '', patologia: '', productoInvestigacion: '', cdaSentDate: '', comment: '',
    instructionsSummary: '', recruitmentPeriod: '', recruitmentStart: '', recruitmentEnd: '',
    principalInvestigator: '', patientsCommitment: 0, patientsCommitmentICLSR: 0, agents: [], informacionCompleta: false,
  });

  const [investigadores, setInvestigadores] = useState<{ _id: string; name: string }[]>([]);
  const [successOpen, setSuccessOpen] = useState(false);
  const [errorOpen, setErrorOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    const fetchInvestigadores = async () => {
      try {
        const res = await userService.getUsers();
        const filtrados = res.filter((u: any) => u.position === 'Investigador(a)');
        setInvestigadores(filtrados);
      } catch (err) {
        console.error('Error cargando investigadores', err);
      }
    };
    fetchInvestigadores();
  }, []);

  const handleChange = (field: keyof CreateFactibilidad, value: any) => {
    setData((prev) => ({ ...prev, [field]: value }));
  };

  const handleAgentChange = (index: number, field: 'name' | 'email' | 'phone_number', value: string) => {
    const updatedAgents = [...data.agents];
    updatedAgents[index][field] = value;
    handleChange('agents', updatedAgents);
  };

  const handleAddAgent = () => {
    const updatedAgents = [...data.agents, { name: '', email: '', phone_number: '' }];
    handleChange('agents', updatedAgents);
  };

  const handleRemoveAgent = (index: number) => {
    const updatedAgents = [...data.agents];
    updatedAgents.splice(index, 1);
    handleChange('agents', updatedAgents);
  };

  const handleSubmit = async () => {
    try {
      const validatedData = await crearFactibilidadSchemaYup.validate(data, {
        abortEarly: false,
      });

      const normalizeToEmptyString = (value: any): string =>
        typeof value === 'string' ? value : '';

      const normalizedData: CreateFactibilidad = {
        ...validatedData,
        email: normalizeToEmptyString(validatedData.email),
        patologia: normalizeToEmptyString(validatedData.patologia),
        productoInvestigacion: normalizeToEmptyString(validatedData.productoInvestigacion),
        area: normalizeToEmptyString(validatedData.area),
        initialEmail: normalizeToEmptyString(validatedData.initialEmail),
        documentArrivalDate: normalizeToEmptyString(validatedData.documentArrivalDate),
        visitDate: normalizeToEmptyString(validatedData.visitDate),
        feasibilitySentDate: normalizeToEmptyString(validatedData.feasibilitySentDate),
        cdaSentDate: normalizeToEmptyString(validatedData.cdaSentDate),
        recruitmentStart: normalizeToEmptyString(validatedData.recruitmentStart),
        recruitmentEnd: normalizeToEmptyString(validatedData.recruitmentEnd),
        instructionsSummary: normalizeToEmptyString(validatedData.instructionsSummary),
        recruitmentPeriod: normalizeToEmptyString(validatedData.recruitmentPeriod),
        principalInvestigator: normalizeToEmptyString(validatedData.principalInvestigator),
        comment: normalizeToEmptyString(validatedData.comment),
        patientsCommitment: typeof validatedData.patientsCommitment === 'number' ? validatedData.patientsCommitment : 0,
        patientsCommitmentICLSR: typeof validatedData.patientsCommitmentICLSR === 'number' ? validatedData.patientsCommitmentICLSR : 0,
        agents: Array.isArray(validatedData.agents) ? validatedData.agents : [],
      };

      const fixDate = (d?: string) =>
        d && d.trim() !== '' ? new Date(d).toISOString() : undefined;

      const payload: CreateFactibilidad = {
        ...normalizedData,
        proposalId: normalizedData.code || ' ',
        initialEmail: fixDate(normalizedData.initialEmail) || '',
        documentArrivalDate: fixDate(normalizedData.documentArrivalDate) || '',
        visitDate: fixDate(normalizedData.visitDate) || '',
        feasibilitySentDate: fixDate(normalizedData.feasibilitySentDate) || '',
        cdaSentDate: fixDate(normalizedData.cdaSentDate) || '',
        recruitmentStart: fixDate(normalizedData.recruitmentStart) || '',
        recruitmentEnd: fixDate(normalizedData.recruitmentEnd) || '',
        informacionCompleta: Boolean(normalizedData.informacionCompleta),
      };

      await factibilidadesService.createFactibilidad(payload);
      setSuccessMessage('✅ Factibilidad creada correctamente');
      setSuccessOpen(true);
      setTimeout(() => navigate('/factibilidades'), 2000);

    } catch (err: any) {
      if (err.name === 'ValidationError') {
        const fieldErrors: Record<string, string> = {};
        err.inner.forEach((e: any) => {
          if (e.path) fieldErrors[e.path] = e.message;
        });
        setErrors(fieldErrors);
        const mensaje = Object.values(fieldErrors).join(' | ') || '❌ Error de validación';
        setErrorMessage(mensaje);
      } else {
        console.error(err);
        setErrorMessage('❌ Error al crear la factibilidad');
      }
      setErrorOpen(true);
    }
  };

  return (
  <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={es}>
    <Container maxWidth="lg" sx={{ mt: 2 }}>
      <Paper sx={{ p: 4, borderRadius: 2 }}>
        <Typography variant="h6" gutterBottom>Crear Factibilidad</Typography>
        <Stack spacing={3}>
          <Grid container spacing={3}>
            <Grid size={{ xs: 12, md: 4 }}>
              <Tooltip title="Nombre del patrocinador del estudio" arrow placement="top-start">
                <TextField
                  fullWidth
                  label="Nombre Sponsor"
                  value={data.sponsorName}
                  onChange={(e) => handleChange('sponsorName', e.target.value)}
                  error={!!errors['sponsorName']}
                  helperText={errors['sponsorName']}
                />
              </Tooltip>
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <Tooltip title="Código interno asignado por el sponsor o centro" arrow placement="top-start">
                <TextField
                  fullWidth
                  label="Código Estudio"
                  value={data.code}
                  onChange={(e) => handleChange('code', e.target.value)}
                  error={!!errors['code']}
                  helperText={errors['code']}
                />
              </Tooltip>
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <Tooltip title="Área médica relacionada al estudio" arrow placement="top-start">
                <TextField
                  fullWidth
                  select
                  label="Área"
                  value={data.area}
                  onChange={(e) => handleChange('area', e.target.value)}
                  error={!!errors['area']}
                  helperText={errors['area']}
                >
                  <MenuItem value="Hematología">Hematología</MenuItem>
                  <MenuItem value="Oncología">Oncología</MenuItem>
                  <MenuItem value="Otro">Otra</MenuItem>
                </TextField>
              </Tooltip>
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <Tooltip title="Patología o enfermedad que aborda el estudio" arrow placement="top-start">
                <TextField
                  fullWidth
                  label="Patología"
                  value={data.patologia}
                  onChange={(e) => handleChange('patologia', e.target.value)}
                  error={!!errors['patologia']}
                  helperText={errors['patologia']}
                />
              </Tooltip>
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <Tooltip title="Producto en investigación" arrow placement="top-start">
                <TextField
                  fullWidth
                  label="Producto de Investigación"
                  value={data.productoInvestigacion}
                  onChange={(e) => handleChange('productoInvestigacion', e.target.value)}
                  error={!!errors['productoInvestigacion']}
                  helperText={errors['productoInvestigacion']}
                />
              </Tooltip>
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <Tooltip title="Correo de contacto del sponsor" arrow placement="top-start">
                <TextField
                  fullWidth
                  label="Correo de Contacto"
                  value={data.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  error={!!errors['email']}
                  helperText={errors['email']}
                />
              </Tooltip>
            </Grid>
            <Grid size={{ xs: 12 }}>
              <Tooltip title="Título del estudio en español" arrow placement="top-start">
                <TextField
                  fullWidth
                  multiline
                  minRows={3}
                  label="Título del Estudio"
                  value={data.instructionsSummary}
                  onChange={(e) => handleChange('instructionsSummary', e.target.value)}
                  error={!!errors['instructionsSummary']}
                  helperText={errors['instructionsSummary']}
                />
              </Tooltip>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Tooltip title="Fecha de contacto inicial con el sponsor" arrow placement="top-start">
                <TextField
                  fullWidth
                  placeholder='DD/MM/YYYY'
                  type="date"
                  label="Fecha de Contacto Inicial"
                  value={data.initialEmail?.substring(0, 10) || ''}
                  onChange={(e) => handleChange('initialEmail', e.target.value)}
                  error={!!errors['initialEmail']}
                  helperText={errors['initialEmail']}
                  InputLabelProps={{ shrink: true }}
                />
              </Tooltip>

            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Tooltip title="Investigador Principal del centro" arrow placement="top-start">
                <TextField
                  fullWidth
                  select
                  label="Investigador Principal"
                  value={data.principalInvestigator}
                  onChange={(e) => handleChange('principalInvestigator', e.target.value)}
                  error={!!errors['principalInvestigator']}
                  helperText={errors['principalInvestigator']}
                >
                  <MenuItem value="">Seleccione un investigador</MenuItem>
                  {investigadores.map((inv) => (
                    <MenuItem key={inv._id} value={inv.name}>{inv.name}</MenuItem>
                  ))}
                </TextField>
              </Tooltip>
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <Tooltip title="Disponibilidad del centro para participar" arrow placement="top-start">
                <TextField
                  fullWidth
                  select
                  label="Factibilidad"
                  value={data.feasibilityValue}
                  onChange={(e) => handleChange('feasibilityValue', e.target.value)}
                  error={!!errors['feasibilityValue']}
                  helperText={errors['feasibilityValue']}
                >
                  <MenuItem value="SI">SI</MenuItem>
                  <MenuItem value="NO">NO</MenuItem>
                  <MenuItem value="N/A">N/A</MenuItem>
                </TextField>
              </Tooltip>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Tooltip title="Nivel de interés del centro en participar" arrow placement="top-start">
                <TextField
                  fullWidth
                  select
                  label="Interés"
                  value={data.interest}
                  onChange={(e) => handleChange('interest', e.target.value)}
                  error={!!errors['interest']}
                  helperText={errors['interest']}
                >
                  <MenuItem value="SI">SI</MenuItem>
                  <MenuItem value="NO">NO</MenuItem>
                </TextField>
              </Tooltip>
            </Grid>
            {[
              { field: 'visitDate', label: 'Fecha Visita Factibilidad', tooltip: 'Fecha tentativa de visita presencial' },
              { field: 'documentArrivalDate', label: 'Fecha Llegada de Documentos', tooltip: 'Recepción de documentos del estudio' },
              { field: 'feasibilitySentDate', label: 'Fecha Factibilidad Enviada', tooltip: 'Envío del formulario al sponsor' },
              { field: 'cdaSentDate', label: 'CDA Enviado', tooltip: 'Fecha en que se envió el acuerdo de confidencialidad' },
              { field: 'recruitmentStart', label: 'Inicio Reclutamiento', tooltip: 'Fecha tentativa de inicio del reclutamiento' },
              { field: 'recruitmentEnd', label: 'Fin Reclutamiento', tooltip: 'Fecha tentativa de fin del reclutamiento' },
            ].map(({ field, label, tooltip }) => (
              <Grid key={field} size={{ xs: 12, md: 4 }}>
                <Tooltip title={tooltip} arrow placement="top-start">
                  <TextField
                    fullWidth
                    type="date"
                    label={label}
                    value={(data[field as keyof CreateFactibilidad] as string)?.substring(0, 10) || ''}
                    onChange={(e) => handleChange(field as keyof CreateFactibilidad, e.target.value)}
                    error={!!errors[field]}
                    helperText={errors[field]}
                    InputLabelProps={{ shrink: true }}
                  />
                </Tooltip>
              </Grid>
            ))}
            <Grid size={{ xs: 12, md: 6 }}>
              <Tooltip title="Pacientes asignados por el sponsor" arrow placement="top-start">
                <TextField
                  fullWidth
                  type="number"
                  label="Pacientes Asignados"
                  value={data.patientsCommitment}
                  onChange={(e) => handleChange('patientsCommitment', Number(e.target.value))}
                  error={!!errors['patientsCommitment']}
                  helperText={errors['patientsCommitment']}
                />
              </Tooltip>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Tooltip title="Pacientes comprometidos por el centro" arrow placement="top-start">
                <TextField
                  fullWidth
                  type="number"
                  label="Compromiso pacientes (ICLSR)"
                  value={data.patientsCommitmentICLSR}
                  onChange={(e) => handleChange('patientsCommitmentICLSR', Number(e.target.value))}
                  error={!!errors['patientsCommitmentICLSR']}
                  helperText={errors['patientsCommitmentICLSR']}
                />
              </Tooltip>
            </Grid>
            <Grid size={{ xs: 12 }}>
              <Tooltip title="Observaciones generales sobre esta factibilidad" arrow placement="top-start">
                <TextField
                  fullWidth
                  multiline
                  minRows={2}
                  label="Comentario"
                  value={data.comment}
                  onChange={(e) => handleChange('comment', e.target.value)}
                  error={!!errors['comment']}
                  helperText={errors['comment']}
                />
              </Tooltip>
            </Grid>
          </Grid>

         

            {/* REPRESENTANTES */}
            <Box>
              <Typography variant="subtitle1" mb={2}>Representante(s)</Typography>
              {data.agents.map((agent, i) => (
                <Box key={i} display="grid" gridTemplateColumns="repeat(3, 1fr) auto" gap="56px" alignItems="center" mb={2}>
                  <TextField
                    label="Nombre" fullWidth value={agent.name}
                    onChange={(e) => handleAgentChange(i, 'name', e.target.value)}
                  />
                  <TextField
                    label="Email" fullWidth value={agent.email}
                    onChange={(e) => handleAgentChange(i, 'email', e.target.value)}
                  />
                  <TextField
                    label="Teléfono" fullWidth value={agent.phone_number}
                    onChange={(e) => handleAgentChange(i, 'phone_number', e.target.value)}
                  />
                  <IconButton color="error" onClick={() => handleRemoveAgent(i)}>
                    <Delete />
                  </IconButton>
                </Box>
              ))}
              <CustomButton $variant="text" onClick={handleAddAgent} startIcon={<AddIcon />}>
                Agregar Representante
              </CustomButton>
            </Box>

            {/* BOTONES */}
            <Stack direction="row" spacing={2} justifyContent="flex-end">
              <CustomButton $variant="contained" onClick={handleSubmit}>Guardar</CustomButton>
              <CustomButton $variant="outlined" onClick={() => navigate(-1)}>Cancelar</CustomButton>
            </Stack>
          </Stack>
        </Paper>

        <AlertaSnackbar open={successOpen} onClose={() => setSuccessOpen(false)} message={successMessage} severity="success" />
        <AlertaSnackbar open={errorOpen} onClose={() => setErrorOpen(false)} message={errorMessage} severity="error" />
      </Container>
    </LocalizationProvider>
  );
}
