import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Box, CircularProgress, Container, Paper, Typography,
  Table, TableBody, TableCell, TableHead, TableRow,
  Snackbar,
  Alert
} from '@mui/material';
import { visitasService } from '../services/backend';
import { Visita } from '../types';
import ModalConfirmacion from '../../../components/ModalConfirmacion';
import GoogleCalendarButton from '../../../components/GoogleCalendar';
import CustomButton from '../../../components/Button';
import { capitaliceFirstLetter, formatFechaChile } from '../utils';
import { TipoVisita } from '../types/enums';
import { useAuth } from '../../../context/auth.context';

export default function DetalleVisitaPage() {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth()
  const navigate = useNavigate();
  const [visita, setVisita] = useState<Visita | null>(null);
  const [loading, setLoading] = useState(true);
  const [openConfirm, setOpenConfirm] = useState(false);
  const direccion = 'Woodrow Wilson 1697, 1720430 La Serena, Coquimbo, Chile';
  const [deleting, setDeleting] = useState(false);
  const [deteleSnackbarOpen, setDeleteSnackbarOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  useEffect(() => {
    const fetchVisita = async () => {
      try {
        const response = await visitasService.getVisitaById(id!);
        setVisita(response.data);
      } catch (error) {
        console.error('Error cargando visita', error);
      } finally {
        setLoading(false);
      }
    };
    fetchVisita();
  }, [id]);
  
  const handleEliminar = async () => {
    if (id) {
      setDeleting(true);
    }
    try {
      await visitasService.deleteVisita(id!);
      setDeleteSnackbarOpen(true);
      setTimeout(() => {
        navigate('/visitas');
      }, 2000);
    }
    catch (error) {
      console.error('Error eliminando visita', error);
    } finally {
      setDeleting(false);
    }
  };

  const handleOpenConfirm = () => {
    if (user?.role !== 'admin') {
      setSnackbarMessage('No tienes permisos para realizar esta acción.');
      setSnackbarOpen(true);
      return;
    }  
    setOpenConfirm(true);
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }

  if (!visita) {
    return <Typography color="error">No se encontró la visita.</Typography>;
  }

  const tipoEntidad = visita.entidad?.tipo;
  const esPaciente = tipoEntidad === TipoVisita.Paciente;
  const tituloEvento = esPaciente
    ? `Visita de paciente ${visita.entidad?.codigoPaciente} del estudio ${visita.entidad?.codigoEstudio || 'N/A'}`
    : `Visita al estudio ${visita.entidad?.codigoEstudio || 'N/A'}`;

  return (
    <Container maxWidth="lg" sx={{ mt: 3 }}>
      <Paper sx={{ p: 4, borderRadius: 2 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
      <Typography variant="h6">Visita - {capitaliceFirstLetter(tipoEntidad || "")}</Typography>
      <Box display="flex" gap={2}>
        <CustomButton $variant="contained" size="large" onClick={() => navigate(`/visitas/${id}/editar`)}>
          Editar
        </CustomButton>
        <CustomButton $variant="outlined" color="danger" onClick={handleOpenConfirm}>
          Eliminar
        </CustomButton>
      </Box>
    </Box>
    <Typography variant="subtitle2" gutterBottom sx={{ fontSize: '0.9rem', mt: -2 }}>
      {formatFechaChile(visita.fechaProgramada)}
    </Typography>

       <Box display="flex" gap={6} mt={2} mb={1} flexWrap="wrap">
      <Box>
        <Typography variant="body2" fontWeight="bold">
          {esPaciente ? 'Nombre del paciente' : 'Nombre del Representante'}
        </Typography>
        <Typography>
          {esPaciente
            ? visita.entidad?.nombre || '-'
            : visita.entidad?.representante || '-'}
        </Typography>
      </Box>

      {esPaciente ? (
        <>
          <Box>
            <Typography variant="body2" fontWeight="bold">
              Código de Screening
            </Typography>
            <Typography>{visita.entidad?.codigoPaciente || 'N/A'}</Typography>
          </Box>

          <Box>
            <Typography variant="body2" fontWeight="bold">
              Código Randomizado
            </Typography>
            <Typography>{visita.entidad?.codigoRandomizado || 'N/A'}</Typography>
          </Box>

      <Box>
        <Typography variant="body2" fontWeight="bold">
          Código de Estudio
        </Typography>
        <Typography>{visita.entidad?.codigoEstudio || 'N/A'}</Typography>
      </Box>
            </>
          ) : (
            <Box>
              <Typography variant="body2" fontWeight="bold">
                Código de Estudio
              </Typography>
              <Typography>{visita.entidad?.codigoEstudio || 'N/A'}</Typography>
            </Box>
          )}

          {!esPaciente && (
            <Box>
              <Typography variant="body2" fontWeight="bold">Institución / Sponsor</Typography>
              <Typography>{visita.entidad?.nombre || '-'}</Typography>
            </Box>
          )}
        </Box>
        <Box bgcolor="#e6f8fa" p={2} borderRadius={1} mb={3}>
          <Typography mb={1} variant="body2" fontWeight="bold">
            Descripción de la visita
          </Typography>
          <Typography variant="body2" sx={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
            {visita.descripcion || 'Sin descripción'}
          </Typography>

        </Box>
        <Box display="flex" gap={6} mt={2} mb={3} flexWrap="wrap">
          <Box>
            <Typography variant="body2" fontWeight="bold">Estado</Typography>
            <Typography>{visita.estado}</Typography>
          </Box>
          <Box>
            <Typography variant="body2" fontWeight="bold">Tomo</Typography>
            <Typography>{visita.numeroTomo ?? 'Sin asignar'}</Typography>
          </Box>

          {!esPaciente && (
            <>
              <Box>
                <Typography variant="body2" fontWeight="bold">Carta confirmación</Typography>
                <Typography>{visita.cartaConfirmacion ? 'Sí' : 'No'}</Typography>
              </Box>
              <Box>
                <Typography variant="body2" fontWeight="bold">FUP</Typography>
                <Typography>{visita.fup ? 'Sí' : 'No'}</Typography>
              </Box>
            </>
          )}
        </Box>
        <Box display="flex" gap={6} mb={3} flexWrap="wrap">
          <Box>
            <Typography variant="body2" fontWeight="bold">Motivo</Typography>
            <Typography>{visita.motivo}</Typography>
          </Box>

          <Box>
            <Typography variant="body2" fontWeight="bold">Detalle</Typography>
            <Typography>{visita.detalle || '-'}</Typography>
          </Box>
        </Box>

        <GoogleCalendarButton
          title={tituloEvento}
          startDate={visita.fechaProgramada}
          description={visita.descripcion || visita.motivo}
          location={direccion}
        />

        {(visita.historial ?? []).length > 0 && (
          <>
            <Typography variant="h6" mt={4} mb={2}>
              Historial de Visitas
            </Typography>
            <Table size="small">
              <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
                <TableRow>
                  <TableCell>Fecha</TableCell>
                  <TableCell>Estado</TableCell>
                  <TableCell>Motivo</TableCell>
                  <TableCell>Detalle</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {visita.historial?.map((v) => (
                  <TableRow
                    key={v.id}
                    hover
                    sx={{ cursor: 'pointer' }}
                    onClick={() => navigate(`/visitas/${v.id}`)}
                  >
                    <TableCell>{new Date(v.fecha).toLocaleDateString('es-CL')}</TableCell>
                    <TableCell>{v.estado}</TableCell>
                    <TableCell>{v.motivo}</TableCell>
                    <TableCell>{v.detalle || '-'}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </>
        )}
      </Paper>

      <ModalConfirmacion
        open={openConfirm}
        onClose={() => setOpenConfirm(false)}
        onConfirm={handleEliminar}
        title="¿Eliminar esta visita?"
        description="Esta acción no se puede deshacer."
        confirmText="Eliminar"
        cancelText="Cancelar"
        loading={deleting}
      />
      <Snackbar
        open={deteleSnackbarOpen}
        autoHideDuration={4000}
        onClose={() => setDeleteSnackbarOpen(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert severity="error" variant="filled" onClose={() => setDeleteSnackbarOpen(false)}>
          Visita eliminada correctamente
        </Alert>
      </Snackbar>
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
    </Container>
  );
}
