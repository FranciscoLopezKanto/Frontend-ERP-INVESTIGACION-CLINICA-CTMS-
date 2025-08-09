import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box, Container, Grid, MenuItem, Paper, Stack, TextField,
  Typography, IconButton, RadioGroup, FormControlLabel, Radio,
  Tooltip,
} from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { es } from 'date-fns/locale';
import { Delete } from '@mui/icons-material';
import { factibilidadesService } from '../services/FactibilidadesService';
import { useForm, Controller, useFieldArray } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Factibilidad } from '../services/FactibilidadesService/types';
import { userService } from '../../../api/users';
import CustomButton from '../../../components/Button';
import AddIcon from '@mui/icons-material/Add';
import AlertaSnackbar from '../../../components/AlertaSnackbar';
import ModalConfirmacion from '../../../components/ModalConfirmacion';

const onError = (errors: any) => {
  console.warn("Errores de validación:", errors);
};

export default function EditarFactibilidadPage() {
  const { id } = useParams();
  const [successOpen, setSuccessOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [errorOpen, setErrorOpen] = useState(false);
  const navigate = useNavigate();
  const [data, setData] = useState<Factibilidad | null>(null);
  const [investigadores, setInvestigadores] = useState<{ _id: string; name: string }[]>([]);
  const schema = yup.object({
  area: yup.string().required('Área es obligatoria'),
  patologia: yup.string().required('Patología es obligatoria'),
  feasibilityValue: yup.string().required('Factibilidad es obligatoria'),
  interest: yup.string().required('Interés es obligatorio'),
  feasibilityStatus: yup
    .string()
    .oneOf(['Pendiente', 'En Revisión', 'No Seleccionado', 'Seleccionado'])
    .required('Estado de factibilidad es obligatorio'),
  initialEmail: yup.string().required('Fecha de contacto inicial es obligatoria'),
  principalInvestigator: yup.string().required('Investigador principal es obligatorio'),
  comment: yup.string().optional(),
  instructionsSummary: yup.string().optional(),
  feasibilitySentDate: yup.string().optional(),
  recruitmentStart: yup.string().optional(),
  recruitmentEnd: yup.string().optional(),
  patientsCommitmentICLSR: yup.number().min(0).optional(),
  patientsCommitment: yup.number().min(0).optional(),
  documentArrivalDate: yup.string().optional(),
  productoInvestigacion: yup.string().optional(),
  email: yup.string().email('Email inválido').optional(),
  recruitmentPeriod: yup.string().optional(),
  visitDate: yup.string().optional(),
  cdaSentDate: yup.string().optional(),
  agents: yup
    .array()
    .of(
      yup.object({
        name: yup.string().required('Nombre requerido'),
        email: yup.string().email().required('Email requerido'),
        phone_number: yup.string().optional(),
      })
    )
    .optional(),
});
  const [formularioPendiente, setFormularioPendiente] = useState<any | null>(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const verificarAntesDeGuardar = (data: any) => {
    if (data.feasibilityStatus === 'Seleccionado') {
      setFormularioPendiente(data); // guardamos temporalmente
      setShowConfirmModal(true);    // pedimos confirmación
    } else {
      onSubmit(data); // si no es seleccionado, enviamos directo
    }
  };


  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      area: '',
      patologia: '',
      feasibilityValue: '',
      interest: '',
      feasibilityStatus: 'Pendiente',
      initialEmail: '',
      principalInvestigator: '',
      comment: '',
      instructionsSummary: '',
      feasibilitySentDate: '',
      patientsCommitmentICLSR: 0,
      patientsCommitment: 0,
      documentArrivalDate: '',
      productoInvestigacion: '',
      email: '',
      recruitmentStart: '',
      recruitmentEnd: '',
      recruitmentPeriod: '',
      visitDate: '',
      cdaSentDate: '',
      agents: [],
    }
  });

  const { fields, append, remove } = useFieldArray({ control, name: 'agents' });

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await factibilidadesService.getFactibilidadById(id!);
        const fact = res.data;

        const resUsers = await userService.getUsers();
        const investigadoresFiltrados = resUsers.filter((u: any) => u.position === "Investigador(a)");
        setInvestigadores(investigadoresFiltrados);

        if (!investigadoresFiltrados.map(u => u.name).includes(fact.principalInvestigator ?? '')) {
          fact.principalInvestigator = '';
        }

        fact.interest ??= 'NO';
        fact.feasibilityValue ??= 'SI';
        fact.feasibilityStatus ??= 'Pendiente';

        setData(fact);
        reset(fact);
      } catch (err) {
        console.error('Error cargando datos', err);
      }
    };

    fetch();
  }, [id, reset]);


  const onSubmit = async (formValues: any) => {
  if (!id) return;

  try {
    const {
      _id,
      __v,
      createdAt,
      updatedAt,
      ...rest
    } = formValues;

    const cleanData = {
      ...rest,
      agents: Array.isArray(rest.agents)
        ? rest.agents.map((agent: any) => {
            const { _id, ...restAgent } = agent;
            return restAgent;
          })
        : [],
      patientsCommitment: Number(rest.patientsCommitment) || 0,
      patientsCommitmentICLSR: Number(rest.patientsCommitmentICLSR) || 0,
      recruitmentStart: rest.recruitmentStart instanceof Date
        ? rest.recruitmentStart.toISOString()
        : rest.recruitmentStart ?? null,
      recruitmentEnd: rest.recruitmentEnd instanceof Date
        ? rest.recruitmentEnd.toISOString()
        : rest.recruitmentEnd ?? null,
    };
    await factibilidadesService.updateFactibilidad(id, cleanData);

    setSuccessMessage('✅ Factibilidad editada correctamente');
    setSuccessOpen(true);

    setTimeout(() => {
      navigate(`/factibilidades/${id}`);
    }, 2000);

  } catch (err: any) {
    console.error('❌ Error de validación:', err?.response?.data?.message || err.message);
    setErrorMessage(`❌ Error al validar la factibilidad`);
    setErrorOpen(true);
  }
};


  if (!data) return null;

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={es}>
      <Container maxWidth="lg" sx={{ mt: 2 }}>
        <Paper sx={{ p: 4, borderRadius: 2 }}>
          <Typography variant="h6" gutterBottom>
            Propuesta - {data.sponsorName} - En edición
          </Typography>
          <form onSubmit={handleSubmit(verificarAntesDeGuardar, onError)}>
            <Grid container spacing={7} mt={2}>
              <Grid size={12}>
                <Box display="flex" flexDirection="column" gap="33px">
                  {/* DATOS BÁSICOS */}
                  <Box display="flex" gap={7}>
                    <Grid size={12}><TextField label="Nombre" fullWidth value={data.sponsorName} disabled /></Grid>
                    <Grid size={12}>
                      <Controller name="area" control={control} render={({ field }) => (
                        <TextField select label="Área" fullWidth {...field} error={!!errors.area}>
                          <MenuItem value="Hematología">Hematología</MenuItem>
                          <MenuItem value="Oncología">Oncología</MenuItem>
                          <MenuItem value="Otro">Otro</MenuItem>
                        </TextField>
                      )} />
                    </Grid>
                    <Grid size={12}>
                      <Controller name="patologia" control={control} render={({ field }) => (
                        <TextField label="Patología" fullWidth {...field} error={!!errors.patologia} />
                      )} />
                    </Grid>
                  </Box>

                  {/* FACTIBILIDAD + INTERÉS */}
                  <Box display="flex" gap={7}>
                    <Grid size={12}><TextField label="Código Estudio" fullWidth value={data.code} disabled /></Grid>
                    <Grid size={12}>
                      <Controller name="feasibilityValue" control={control} render={({ field }) => (
                        <TextField select label="Factibilidad" fullWidth {...field} error={!!errors.feasibilityValue}>
                          <MenuItem value="SI">SI</MenuItem>
                          <MenuItem value="NO">NO</MenuItem>
                          <MenuItem value="N/A">N/A</MenuItem>
                        </TextField>
                      )} />
                    </Grid>
                    <Grid size={12}>
                      <Controller name="interest" control={control} render={({ field }) => (
                        <TextField select label="Interés" fullWidth {...field} error={!!errors.interest}>
                          <MenuItem value="SI">SI</MenuItem>
                          <MenuItem value="NO">NO</MenuItem>
                        </TextField>
                      )} />
                    </Grid>
                    
                  </Box>
                  
                  {/* ESTADO + PRODUCTO */}
                  <Box display="flex" justifyContent="space-between" alignItems="center" gap={4} width="100%">
                    <Box>
                      <Typography fontWeight={500} mb={1}>Estado del proceso</Typography>
                      <Controller
                        name="feasibilityStatus"
                        control={control}
                        render={({ field }) => (
                          <RadioGroup row {...field}>
                            <FormControlLabel
                              value="Pendiente"
                              control={<Radio />}
                              label={
                                <Tooltip title="Estado base. Solo se ha ingresado la propuesta.">
                                  <span>Pendiente</span>
                                </Tooltip>
                              }
                            />
                            <FormControlLabel
                              value="En Revisión"
                              control={<Radio />}
                              label={
                                <Tooltip title="Se está revisando internamente y llenando información.">
                                  <span>En revisión</span>
                                </Tooltip>
                              }
                            />
                            <FormControlLabel
                              value="No Seleccionado"
                              control={<Radio />}
                              label={
                                <Tooltip title="Se revisó, pero el sponsor no seleccionó al centro.">
                                  <span>No Seleccionado</span>
                                </Tooltip>
                              }
                            />
                            <FormControlLabel
                              value="Seleccionado"
                              control={<Radio />}
                              label={
                                <Tooltip title="El centro fue elegido por el sponsor. Esto crea automáticamente una investigación.">
                                  <span>Seleccionado</span>
                                </Tooltip>
                              }
                            />
                          </RadioGroup>
                        )}
                      />
                    </Box>
                    <Box>
                      <Tooltip title="Tipo de droga, molécula o producto que se está investigando en el estudio" arrow placement="top-start">
                        <Box>
                          <Controller name="productoInvestigacion" control={control} render={({ field }) => (
                            <TextField label="Producto de investigación" fullWidth sx={{ width: "246px" }} {...field} />
                          )} />
                        </Box>
                      </Tooltip>
                    </Box>
                  </Box>

                  {/* CONTACTO + FECHA + INVESTIGADOR */}
                  <Box display="flex" gap={7}>
                    <Grid size={12}>
                      <Controller name="email" control={control} render={({ field }) => (
                        <TextField label="Contacto (Email)" fullWidth {...field} error={!!errors.email} />
                      )} />
                    </Grid>
                    <Grid size={12}>
                      <Controller name="initialEmail" control={control} render={({ field }) => (
                        <DatePicker label="Contacto inicial" value={field.value ? new Date(field.value) : null}
                          onChange={(date) => field.onChange(date?.toISOString() || '')}
                          slotProps={{ textField: { fullWidth: true } }}
                        />
                      )} />
                    </Grid>
                    <Grid size={12}>
                      <Controller name="principalInvestigator" control={control} render={({ field }) => (
                        <TextField select label="Investigador Principal" fullWidth {...field}>
                          <MenuItem value="">Seleccione un investigador</MenuItem>
                          {investigadores.map(({ _id, name }) => (
                            <MenuItem key={_id} value={name}>{name}</MenuItem>
                          ))}
                        </TextField>
                      )} />
                    </Grid>
                  </Box>
                  <Box display="flex" gap={7}>
                    <Tooltip title="Pacientes comprometidos al estudio de parte del centro" arrow>
                      <Grid size={12}>
                        <Controller name="patientsCommitmentICLSR" control={control} render={({ field }) => (
                          <TextField
                            label="Compromiso pacientes (ICLSR)"
                            type="number"
                            inputProps={{ min: 0 }}
                            fullWidth
                            {...field}
                          />
                        )} />
                      </Grid>
                    </Tooltip>

                    <Tooltip title="Pacientes asignados por el sponsor" arrow>
                      <Grid size={12}>
                        <Controller name="patientsCommitment" control={control} render={({ field }) => (
                          <TextField
                            label="Pacientes Asignados"
                            type="number"
                            inputProps={{ min: 0 }}
                            fullWidth
                            {...field}
                          />
                        )} />
                      </Grid>
                    </Tooltip>
                  </Box>
                  {/* INSTRUCCIONES */}
                  <Controller name="instructionsSummary" control={control} render={({ field }) => (
                    <TextField label="Titulo del Estudio" fullWidth multiline minRows={3}
                      sx={{ background: '#f1fafa' }} {...field} />
                  )} />

                  {/* FECHAS VARIAS */}
                  <Box display="flex" gap={7}>
                    {([
                      'visitDate',
                      'documentArrivalDate',
                      'feasibilitySentDate'
                    ] as const).map((fieldName, i) => (
                      <Grid size={12} key={i}>
                        <Controller name={fieldName} control={control} render={({ field }) => (
                          <DatePicker label={fieldName === 'visitDate' ? 'Fecha visita' : fieldName === 'documentArrivalDate' ? 'Fecha llegada documentos' : 'Fecha factibilidad enviada'}
                            value={field.value ? new Date(field.value) : null}
                            onChange={(date) => field.onChange(date?.toISOString() || '')}
                            slotProps={{ textField: { fullWidth: true } }}
                          />
                        )} />
                      </Grid>
                    ))}
                  </Box>

                  {/* MÁS FECHAS + NUMÉRICO */}
                  <Box display="flex" gap={7}>
                    <Grid size={12}>
                      <Controller name="cdaSentDate" control={control} render={({ field }) => (
                        <DatePicker label="CDA enviado" value={field.value ? new Date(field.value) : null}
                          onChange={(date) => field.onChange(date?.toISOString() || '')}
                          slotProps={{ textField: { fullWidth: true } }}
                        />
                      )} />
                    </Grid>
                    <Grid size={12}>
                      <Controller name="recruitmentStart" control={control} render={({ field }) => (
                        <DatePicker label="Inicio de Reclutamiento" value={field.value ? new Date(field.value) : null}
                          onChange={(date) => field.onChange(date?.toISOString() || '')}
                          slotProps={{ textField: { fullWidth: true } }}
                        />
                      )} />
                    </Grid>
                    <Grid size={12}>
                      <Controller name="recruitmentEnd" control={control} render={({ field }) => (
                        <DatePicker label="Fin de Reclutamiento" value={field.value ? new Date(field.value) : null}
                          onChange={(date) => field.onChange(date?.toISOString() || '')}
                          slotProps={{ textField: { fullWidth: true } }}
                        />
                      )} />
                    </Grid>
                  </Box>

                  {/* AGENTES / REPRESENTANTES */}
                  <Box>
                    <Typography variant="subtitle1" mb={2} gutterBottom>Representante(s)</Typography>
                    {fields.map((_, i) => (
                      <Box key={i} display="grid" gridTemplateColumns="repeat(3, 1fr) auto" gap="56px" alignItems="center" mb={2}>
                        <Controller name={`agents.${i}.name`} control={control}
                          render={({ field }) => <TextField label="Nombre" fullWidth {...field} />} />
                        <Controller name={`agents.${i}.email`} control={control}
                          render={({ field }) => <TextField label="Email" fullWidth {...field} />} />
                        <Controller name={`agents.${i}.phone_number`} control={control}
                          render={({ field }) => <TextField label="Teléfono" fullWidth {...field} />} />
                        <IconButton color="error" onClick={() => remove(i)}><Delete /></IconButton>
                      </Box>
                    ))}
                    <CustomButton $variant="text" onClick={() => append({ name: '', email: '', phone_number: '' })}
                      startIcon={<AddIcon />}>Agregar Representante</CustomButton>
                  </Box>

                  {/* COMENTARIO */}
                  <Controller name="comment" control={control} render={({ field }) => (
                    <TextField label="Comentario" fullWidth multiline minRows={2} {...field} />
                  )} />
                </Box>
              </Grid>
            </Grid>

            <Stack direction="row" spacing={2} justifyContent="flex-end" mt={4}>
              <CustomButton $variant="contained" type="submit">Guardar</CustomButton>
              <CustomButton $variant="outlined" onClick={() => navigate(-1)}>Cancelar</CustomButton>
            </Stack>
          </form>
        </Paper>
      </Container>
      <AlertaSnackbar
        open={errorOpen}
        onClose={() => setErrorOpen(false)}
        message={errorMessage}
        severity="error"
      />

      <AlertaSnackbar
        open={successOpen}
        onClose={() => setSuccessOpen(false)}
        message={successMessage}
        severity="success"
      />
      <ModalConfirmacion
        open={showConfirmModal}
        onClose={() => {
          setShowConfirmModal(false);
          setFormularioPendiente(null);
        }}
        onConfirm={() => {
          if (formularioPendiente) {
            onSubmit(formularioPendiente);
          }
          setShowConfirmModal(false);
          setFormularioPendiente(null);
        }}
        title="¿Crear investigación clínica?"
        description="Al marcar esta factibilidad como 'Seleccionado', se creará automáticamente un estudio con estos datos. ¿Deseas continuar? (Si esta Factibilidad ya tiene un estudio asociado, No se creara un nuevo estudio.)"
        confirmText="Sí, crear estudio"
        cancelText="Cancelar"
      />


    </LocalizationProvider>
  );
}