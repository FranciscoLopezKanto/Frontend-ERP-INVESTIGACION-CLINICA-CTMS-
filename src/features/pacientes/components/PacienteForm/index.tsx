import {
  Box,
  Typography,
  Button,
  Grid,
  TextField,
  CircularProgress,
  IconButton,
  MenuItem,
  Tooltip,
  Autocomplete,
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { pacientesService } from '../../services';
import { Paciente } from '../../types';
import { Plus, Trash2 } from 'lucide-react';
import { EstadoPaciente, EstadoPacienteLabel } from './enum';
import { calcularEdad } from '../const';
import FechaNacimientoPicker from '../../../../components/FechaPicker';
import CustomButton from '../../../../components/Button';
import { estudiosService } from '../../../estudios/services';

interface FormularioPacienteProps {
  onSubmit?: (data: Partial<Paciente>) => void;
  initialData?: Partial<Paciente>;
}

export default function FormularioPaciente({ onSubmit, initialData }: FormularioPacienteProps) {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [estudios, setEstudios] = useState<{ _id: string; protocolo: string }[]>([]);

  const [formData, setFormData] = useState<Partial<Paciente>>(initialData ?? { contacto: [], numerodeTomos: 0 });


  useEffect(() => {
  estudiosService.getAll()
    .then((res) => setEstudios(res)) // si ya es un array
    .catch((err) => console.error('Error al cargar estudios', err));
}, []);

  useEffect(() => {
    if (!id) {
      setLoading(false);
      return;
    }
    
    pacientesService.getById(id)
      .then((res) => setFormData(res.data))
      .catch((err) => console.error('Error al cargar paciente', err))
      .finally(() => setLoading(false));
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const { name, type } = e.target;
  const value = type === 'number' ? e.target.valueAsNumber : e.target.value;

  setFormData((prev) => ({
    ...prev,
    [name]:
      value === undefined ||
      (type === 'number' && typeof value === 'number' && isNaN(value))
        ? ''
        : value,
  }));
};

function formatearRut(rut: string) {
  // Solo números y k/K para DV
  rut = rut.replace(/[^0-9kK]/g, '');

  // Limitar a máximo 9 caracteres (8 dígitos + DV)
  rut = rut.slice(0, 9);

  const cuerpo = rut.slice(0, -1);
  const dv = rut.slice(-1);
  const cuerpoFormateado = cuerpo.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  return `${cuerpoFormateado}-${dv}`;
}


  const handleContactoChange = (index: number, field: string, value: string) => {
    const nuevosContactos = [...(formData.contacto || [])];
    nuevosContactos[index] = {
      ...nuevosContactos[index],
      [field]: value,
    };
    setFormData((prev) => ({
      ...prev,
      contacto: nuevosContactos,
    }));
  };

  const toDateInputFormat = (value: string | undefined) =>
    value ? new Date(value).toISOString().split('T')[0] : '';

  const agregarContacto = () => {
    setFormData((prev) => ({
      ...prev,
      contacto: [...(prev.contacto || []), { nombre: '', telefono: '', parentesco: '' }],
    }));
  };

  const eliminarContacto = (index: number) => {
    const nuevosContactos = [...(formData.contacto || [])];
    nuevosContactos.splice(index, 1);
    setFormData((prev) => ({
      ...prev,
      contacto: nuevosContactos,
    }));
  };


  if (loading) return <CircularProgress />;

  return (
    <Box p={4}>
      <Typography variant="h5" mb={4}>{id ? 'Editar paciente' : 'Nuevo paciente'}</Typography>
      <Box border="1px solid #00bcd4" borderRadius={2} p={3} mb={3}>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 4 }}>
            <Tooltip title="Nombre completo del paciente">
              <TextField fullWidth label="Nombre" name="nombre" value={formData.nombre ?? ''} onChange={handleChange} />
            </Tooltip>
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <FechaNacimientoPicker
              value={formData.fechaNacimiento ?? null}
              onChange={(val) =>
                setFormData((prev) => ({
                  ...prev,
                  fechaNacimiento: val ?? undefined,
                }))
              }
            />
            {formData.fechaNacimiento && (
              <Typography variant="body2" mt={1}>
                Edad: {calcularEdad(formData.fechaNacimiento)} años
              </Typography>
            )}
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <Tooltip title="Estado actual del paciente en el estudio">
              <TextField
                select
                fullWidth
                label="Estado Actual"
                name="estado"
                value={formData.estado ?? ''}
                onChange={handleChange}
              >
                {Object.values(EstadoPaciente).map((estado) => (
                  <MenuItem key={estado} value={estado}>
                    {EstadoPacienteLabel[estado]}
                  </MenuItem>
                ))}
              </TextField>
            </Tooltip>
          </Grid>

          {/* Contactos */}
          <Grid size={12}>
            <Box border="1px solid #00bcd4" borderRadius={1} p={2}>
              <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                <Typography variant="subtitle2">CONTACTOS</Typography>
                <Button onClick={agregarContacto} size="small" startIcon={<Plus size={16} />}>Agregar</Button>
              </Box>
              <Grid container spacing={2}>
                {(formData.contacto || []).map((c, index) => (
                  <Grid key={index} container spacing={2} alignItems="center">
                    <Grid size={{ xs: 12, md: 4 }}>
                      <TextField
                        fullWidth
                        label="Nombre"
                        value={c.nombre}
                        onChange={(e) => handleContactoChange(index, 'nombre', e.target.value)}
                      />
                    </Grid>
                    <Grid size={{ xs: 12, md: 4 }}>
                      <TextField
                        fullWidth
                        label="Teléfono"
                        value={c.telefono}
                        onChange={(e) => handleContactoChange(index, 'telefono', e.target.value)}
                      />
                    </Grid>
                    <Grid size={{ xs: 12, md: 3 }}>
                      <TextField
                        fullWidth
                        label="Parentesco"
                        value={c.parentesco}
                        onChange={(e) => handleContactoChange(index, 'parentesco', e.target.value)}
                      />
                    </Grid>
                    <Grid size={{ xs: 12, md: 1 }}>
                      <IconButton onClick={() => eliminarContacto(index)} color="error">
                        <Trash2 size={18} />
                      </IconButton>
                    </Grid>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Grid>

          {/* Campos con Tooltips */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Tooltip title="Código asignado si el paciente fue randomizado">
              <TextField fullWidth label="Código Randomización" name="codigoRandomizado" value={formData.codigoRandomizado ?? ''} onChange={handleChange} />
            </Tooltip>
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <Tooltip title="">
              <Autocomplete
                fullWidth
                options={estudios}
                getOptionLabel={(option) => option.protocolo || ''}
                value={estudios.find(e => e._id === formData.estudioId) || null}
                onChange={(_, newValue) =>
                  setFormData(prev => ({
                    ...prev,
                    estudioId: newValue?.protocolo || ''
                  }))
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Código del estudio"
                    error={!formData.estudioId}
                    helperText={!formData.estudioId ? 'El código del estudio es obligatorio' : ''}
                  />
                )}
              />
            </Tooltip>
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <Tooltip title="Lugar de residencia del paciente">
              <TextField fullWidth label="Residencia" name="residencia" value={formData.residencia ?? ''} onChange={handleChange} />
            </Tooltip>
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <Tooltip title="Rama del estudio a la que pertenece el paciente">
              <TextField fullWidth label="Rama" name="rama" value={formData.rama ?? ''} onChange={handleChange} />
            </Tooltip>
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <Tooltip title="Indica si el paciente tiene alguna alergia conocida (Sí o No)">
              <TextField
                select
                fullWidth
                label="Alergias"
                name="alergia"
                value={formData.alergia ?? ''}
                onChange={handleChange}
              >
                <MenuItem value="Sí">Sí</MenuItem>
                <MenuItem value="No">No</MenuItem>
              </TextField>
            </Tooltip>
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <Tooltip title="Indica si el paciente requiere traslado o transporte especial">
              <TextField fullWidth label="Traslado" name="traslado" value={formData.traslado ?? ''} onChange={handleChange} />
            </Tooltip>
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <Tooltip title="Código de screening asignado al paciente">
              <TextField fullWidth type="string" label="Código Screaning" name="codigo" value={formData.codigo ?? ''} onChange={handleChange} />
            </Tooltip>
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <Tooltip title="Número de tomos del paciente">
              <TextField
                fullWidth
                type="number"
                label="Número de Tomos"
                name="numerodeTomos" 
                value={formData.numerodeTomos ?? ''}
                onChange={handleChange}
                inputProps={{ min: 0 }}
              />
            </Tooltip>
          </Grid>
          
          <Grid size={{ xs: 12, md: 4 }}>
            <Tooltip title = "Rut del paciente">
              <TextField
                fullWidth
                label="RUT"
                name="rut"
                value={formData.rut ?? ''}
                onChange={(e) => {
                  const rutIngresado = e.target.value;
                  const rutFormateado = formatearRut(rutIngresado);
                  setFormData((prev) => ({ ...prev, rut: rutFormateado }));
                }}
              />
            </Tooltip>
          </Grid>

          <Grid size={12}>
            <Tooltip title="Notas u observaciones generales sobre el paciente">
              <TextField
                fullWidth
                label="Observaciones"
                name="observaciones"
                multiline
                minRows={5}
                value={formData.observaciones ?? ''}
                onChange={handleChange}
              />
            </Tooltip>
          </Grid>
        </Grid>
      </Box>

      {/* Fechas clave */}
      <Box border="1px solid #00bcd4" borderRadius={2} p={2} mb={3}>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 4 }}>
            <Tooltip title="Fecha en que se ingresó al screening">
              <TextField
                fullWidth
                type="date"
                label="Fecha de Screening"
                name="fechaIngreso"
                InputLabelProps={{ shrink: true }}
                value={toDateInputFormat(formData.fechaIngreso)}
                onChange={handleChange}
              />
            </Tooltip>
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <Tooltip title="Fecha de randomización del paciente">
              <TextField
                fullWidth
                type="date"
                label="Fecha de Randomización"
                name="fechaRandomizacion"
                InputLabelProps={{ shrink: true }}
                value={toDateInputFormat(formData.fechaRandomizacion)}
                onChange={handleChange}
              />
            </Tooltip>
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <Tooltip title="Fecha de la última visita del paciente">
              <TextField
                fullWidth
                type="date"
                label="Última Visita"
                name="ultimaVisita"
                InputLabelProps={{ shrink: true }}
                value={toDateInputFormat(formData.ultimaVisita)}
                onChange={handleChange}
              />
            </Tooltip>
          </Grid>
        </Grid>
      </Box>

      <Box display="flex" gap={2}>
        <CustomButton
          $variant="contained"
          onClick={() => onSubmit && onSubmit(formData)}
        >
          {id ? 'Guardar cambios' : 'Crear paciente'}
        </CustomButton>

        <CustomButton $variant="outlined" onClick={() => navigate(-1)}>
          Cancelar
        </CustomButton>
      </Box>
    </Box>
  );
}