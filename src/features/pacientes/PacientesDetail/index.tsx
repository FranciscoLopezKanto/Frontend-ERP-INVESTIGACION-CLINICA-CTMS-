import {
  Box,
  Typography,
  Grid,
  CircularProgress,
  Tooltip,
} from '@mui/material';
import { startCase, toLower } from 'lodash';
import ConsentimientosPaciente from '../components/Consentimientos';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { pacientesService } from '../services';
import {  Consentimiento, Paciente } from '../types';
import ModalConfirmacion from '../../../components/ModalConfirmacion';
import { useAuth } from '../../../context/auth.context';
import { formatearFechaLarga, obtenerEdadMostrable } from '../components/const';
import CustomButton from '../../../components/Button';
import { Snackbar, Alert } from '@mui/material';

export default function DetallePacientePage() {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [paciente, setPaciente] = useState<Paciente | null>(null);
  const [openModal, setOpenModal] = useState(false);
  const [] = useState<Consentimiento[] | null>(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const handleEliminar = async () => {
    try {
      await pacientesService.delete(id!);
      navigate('/pacientes');
    } catch (error) {
      console.error('Error eliminando paciente:', error);
    }
  };

  const fetchPaciente = async () => {
    try {
      const res = await pacientesService.getById(id!);
      setPaciente(res.data);
    } catch (error) {
      console.error('Error cargando paciente:', error);
    }
  };

  const handleOpenModal = () => {
    if (user?.role !== 'admin') {
      setSnackbarMessage('No tienes permisos para realizar esta acción.');
      setSnackbarOpen(true);
      return;
    }
    setOpenModal(true);
  };

  useEffect(() => {
    if (id) fetchPaciente();
  }, [id]);
  useEffect(() => {
    if (id) fetchPaciente();
  }, [id]);

  if (!paciente) return <CircularProgress />;

  return (
    <Box p={4}>
      {/* Encabezado */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
        <Typography variant="h5">
          Paciente {' '}
          {paciente.codigoRandomizado ? (
            <Tooltip title="Código de randomización asignado al paciente">
              <span style={{ fontWeight: 'bold' }}>{paciente.codigoRandomizado}</span>
            </Tooltip>
          ) : paciente.codigo ? (
            <Tooltip title="Código de screening asignado al paciente">
              <span style={{ fontWeight: 'bold' }}>{paciente.codigo}</span>
            </Tooltip>
          ) : (
            <span style={{ fontWeight: 'bold' }}>{paciente.nombre}</span>
          )}{' '}
          del Estudio {paciente.estudioId || 'N/A'}
        </Typography>
        <Box display="flex" gap={2}>
          <CustomButton $variant="contained" size="large" onClick={() => navigate(`/pacientes/${id}/editar`)}>
            Editar
          </CustomButton>
          <CustomButton $variant="outlined" color="danger" onClick={handleOpenModal}>
            Eliminar
          </CustomButton>
        </Box>
      </Box>

      {/* Información principal */}
      <Box border="1px solid #00bcd4" borderRadius={2} p={3} mb={3}>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 4 }}>
            <Tooltip title="Nombre completo del paciente">
              <Typography variant="subtitle2" color="text.secondary">Nombre Completo</Typography>
            </Tooltip>
            <Typography variant="body2">{paciente.nombre}</Typography>
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <Tooltip title="Edad calculada según la fecha de nacimiento">
              <Typography variant="subtitle2" color="text.secondary">Edad</Typography>
            </Tooltip>
            <Typography variant="body2">
              {obtenerEdadMostrable(paciente.fechaNacimiento)}
            </Typography>
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <Tooltip title="Estado actual del paciente dentro del estudio">
              <Typography variant="subtitle2" color="text.secondary">Estado Actual</Typography>
            </Tooltip>
            <Typography variant="body2">
              {paciente.estado ? startCase(toLower(paciente.estado)) : '-'}
            </Typography>
          </Grid>

          <Grid size={12}>
            <Box border="1px solid #00bcd4" borderRadius={1} p={2}>
              <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                <Tooltip title="Personas de contacto para este paciente">
                  <Typography variant="subtitle2">CONTACTOS</Typography>
                </Tooltip>
              </Box>

              {(paciente.contacto && paciente.contacto.length > 0) ? (
                <Box display="flex" flexDirection="column" gap={2}>
                  {paciente.contacto.map((c, index) => (
                    <Grid container spacing={2} key={index}>
                      <Grid size={{ xs: 12, md: 4 }}>
                        <Tooltip title="Nombre del contacto">
                          <Typography variant="subtitle2" color="text.secondary">Nombre</Typography>
                        </Tooltip>
                        <Typography variant="body2">{c.nombre || '-'}</Typography>
                      </Grid>
                      <Grid size={{ xs: 12, md: 4 }}>
                        <Tooltip title="Teléfono del contacto">
                          <Typography variant="subtitle2" color="text.secondary">Teléfono</Typography>
                        </Tooltip>
                        <Typography variant="body2">{c.telefono || '-'}</Typography>
                      </Grid>
                      <Grid size={{ xs: 12, md: 4 }}>
                        <Tooltip title="Relación del contacto con el paciente">
                          <Typography variant="subtitle2" color="text.secondary">Parentesco</Typography>
                        </Tooltip>
                        <Typography variant="body2">{c.parentesco || '-'}</Typography>
                      </Grid>
                    </Grid>
                  ))}
                </Box>
              ) : (
                <Typography variant="body2">Sin contactos registrados.</Typography>
              )}
            </Box>
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <Tooltip title="Código asignado si el paciente ha sido randomizado en el estudio">
              <Typography variant="subtitle2" color="text.secondary">Código Randomización</Typography>
            </Tooltip>
            <Typography variant="body2">{paciente.codigoRandomizado || 'No Asignado'}</Typography>
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <Tooltip title="Identificador del estudio en el que participa el paciente">
              <Typography variant="subtitle2" color="text.secondary">Código del Estudio</Typography>
            </Tooltip>
            <Typography variant="body2">{paciente.estudioId || 'No Asignado'}</Typography>
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <Tooltip title="Dirección de residencia del paciente">
              <Typography variant="subtitle2" color="text.secondary">Residencia</Typography>
            </Tooltip>
            <Typography variant="body2">{paciente.residencia || 'No Definida'}</Typography>
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <Tooltip title="Rama a la que fue asignado el paciente dentro del estudio">
              <Typography variant="subtitle2" color="text.secondary">Rama</Typography>
            </Tooltip>
            <Typography variant="body2">{paciente.rama || 'No Definido'}</Typography>
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <Tooltip title="Condición de alergias del paciente">
              <Typography variant="subtitle2" color="text.secondary">Alergias</Typography>
            </Tooltip>
            <Typography variant="body2">{paciente.alergia || 'No Definida'}</Typography>
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <Tooltip title="Información sobre traslado o transporte especial del paciente">
              <Typography variant="subtitle2" color="text.secondary">Traslado</Typography>
            </Tooltip>
            <Typography variant="body2">{paciente.traslado || 'No Definido'}</Typography>
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <Tooltip title="Código de screening asignado al paciente">
              <Typography variant="subtitle2" color="text.secondary">Código de Screening</Typography>
            </Tooltip>
            <Typography variant="body2">{paciente.codigo || 'No Asignado'}</Typography>
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <Tooltip title="Número de tomos del paciente">
              <Typography variant="subtitle2" color="text.secondary">Número de Tomos</Typography>
            </Tooltip>
            <Typography variant="body2">{paciente.numerodeTomos || 'No Definido'}</Typography>
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <Tooltip title="RUT del paciente">
              <Typography variant="subtitle2" color="text.secondary">RUT</Typography>
            </Tooltip>
            <Typography variant="body2">
              {paciente.rut || 'No Definido'}
            </Typography>
          </Grid>
        
          <Grid size={12}>
            <Tooltip title="Observaciones clínicas o administrativas relacionadas al paciente">
              <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                Observaciones
              </Typography>
            </Tooltip>
            <Box
              border="1px solid #ccc"
              borderRadius={1}
              p={2}
              minHeight={80}
              bgcolor="#fafafa"
            >
              <Typography variant="body2">
                {paciente.observaciones || 'Sin comentarios registrados.'}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>

      {/* Datos de seguimiento */}
      <Box border="1px solid #00bcd4" borderRadius={2} p={2}>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 4 }}>
            <Tooltip title="Fecha en que se realizó la randomización del paciente">
              <Typography variant="subtitle2" color="text.secondary">Fecha de Randomización</Typography>
            </Tooltip>
            <Typography variant="body2">
              {formatearFechaLarga(paciente.fechaRandomizacion)}
            </Typography>
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <Tooltip title="Fecha en que el paciente ingresó al screening">
              <Typography variant="subtitle2" color="text.secondary">Fecha de Screening</Typography>
            </Tooltip>
            <Typography variant="body2">
              {formatearFechaLarga(paciente.fechaIngreso)}
            </Typography>
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <Tooltip title="Última visita registrada del paciente">
              <Typography variant="subtitle2" color="text.secondary">Última visita</Typography>
            </Tooltip>
            <Typography variant="body2">
              {formatearFechaLarga(paciente.ultimaVisita)}
            </Typography>
          </Grid>
        </Grid>

      </Box>

      {/* Consentimientos */}
      <ConsentimientosPaciente
        consentimientos={paciente.consentimientos}
        subidoPor={user?.email || 'desconocido@centro.cl'}
        onAgregar={async (nuevo) => {
          await pacientesService.agregarConsentimiento(paciente._id, {
            ...nuevo,
            subidoPor: user?.email || 'desconocido@centro.cl',
          });
          await fetchPaciente();
        }}
        onEditar={async (version, actualizado) => {
          await pacientesService.editarConsentimiento(paciente._id, version, {
            ...actualizado,
            subidoPor: user?.email || 'desconocido@centro.cl',
          });
          await fetchPaciente();
        }}
        onEliminar={async (version) => {
          await pacientesService.eliminarConsentimiento(paciente._id, version);
          await fetchPaciente();
        }}
      />

      <ModalConfirmacion
        open={openModal}
        onClose={() => setOpenModal(false)}
        onConfirm={handleEliminar}
      />

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={() => setSnackbarOpen(false)} severity="warning" variant="filled">
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}
