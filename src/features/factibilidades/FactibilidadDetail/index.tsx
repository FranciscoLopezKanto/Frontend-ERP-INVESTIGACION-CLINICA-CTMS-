import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Divider,
  Paper,
  Stack,
  Tooltip,
  Typography} from '@mui/material';
import { factibilidadesService } from '../services/FactibilidadesService';
import { Factibilidad } from '../services/FactibilidadesService/types';
import ModalConfirmacion from '../../../components/ModalConfirmacion';
import { startCase, toLower } from 'lodash';
import CustomButton from '../../../components/Button';
import FechaFormateada , { PeriodoFechasFormateadas } from '../components/DateText';
import { Snackbar, Alert } from '@mui/material';
import { useAuth } from '../../../context/auth.context';

export default function FactibilidadDetailPage() {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [data, setData] = useState<Factibilidad | null>(null);
  const [openModal, setOpenModal] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  useEffect(() => {
    if (!id) return;
    const fetch = async () => {
      try {
        const res = await factibilidadesService.getFactibilidadById(id);
        setData(res.data);
      } catch (err) {
        console.error('Error al cargar detalle de factibilidad', err);
        setData(null);
      }
    };
    fetch();
  }, [id]);

  const handleDelete = () => {
    console.log('Eliminando factibilidad:', data?._id);
    setOpenModal(false);
    navigate('/factibilidades');
  };

  const handleOpenModal = () => {
    if (user?.role !== 'admin') {
      setSnackbarMessage('No tienes permisos para realizar esta acción.');
      setSnackbarOpen(true);
      return;
    }
    setOpenModal(true);
  };

  if (!data) return null;


  return (
    <Container maxWidth="lg" sx={{ mt: 3, width: '110%' }}>
      <Paper sx={{ p: 4, borderRadius: 2 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
          <Box>
            <Typography variant="h6" gutterBottom>
              Propuesta - {data.sponsorName}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Código Estudio: {data.code}
            </Typography>
          </Box>
          <Stack direction="row" spacing={2}>
            <CustomButton $variant="contained" onClick={() => navigate(`/factibilidades/${id}/editar`)}>Editar</CustomButton>
            <CustomButton $variant="outlined" color="danger" onClick={handleOpenModal}>Eliminar</CustomButton>
          </Stack>
        </Box>

        <Stack spacing={3}>
          <Box display="grid" gridTemplateColumns="1fr 1fr 1fr" gap={0}>
            <Tooltip title="Evaluación realizada por el centro respecto a su factibilidad de participar en el estudio" arrow placement="top-start">
              <Typography><strong>Factibilidad:</strong> {data.feasibilityValue}</Typography>
            </Tooltip>

            <Tooltip title="Nivel de interés declarado por el centro para participar en el estudio" arrow placement="top-start">
              <Typography><strong>Interés:</strong> {data.interest}</Typography>
            </Tooltip>

            <Tooltip title="Estado actual de revisión o respuesta por parte del centro" arrow placement="top-start">
              <Typography><strong>Estado de la Propuesta:</strong> {data.feasibilityStatus ? startCase(toLower(data.feasibilityStatus)) : 'No definido'}</Typography>
            </Tooltip>
          </Box>

          <Box sx={{ background: '#f1fafa', p: 2, borderRadius: 1 }}>
            <Typography fontWeight={500}>Titulo del Estudio</Typography>
            <Typography color="textSecondary">{data.instructionsSummary || "Sin Titulo"}</Typography>
          </Box>

          <Box display="grid" gridTemplateColumns="1fr 1fr" gap={3} mb={3}>
            <FechaFormateada
              label="Fecha de Contacto Inicial"
              fecha={data.initialEmail}
              tooltip="Fecha en que se recibió el primer correo o comunicación del sponsor."
            />
            <FechaFormateada
              label="Fecha Visita de Factibilidad"
              fecha={data.visitDate}
              tooltip="Fecha en que se realizó la visita presencial o virtual de factibilidad."
            />
            <FechaFormateada
              label="Fecha Llegada de Documentos"
              fecha={data.documentArrivalDate}
              tooltip="Fecha en que el centro recibió el paquete documental del estudio."
            />
            <FechaFormateada
              label="Fecha Factibilidad Enviada"
              fecha={data.feasibilitySentDate}
              tooltip="Fecha en que se respondió formalmente la factibilidad al sponsor."
            />
            <FechaFormateada
              label="CDA Enviado"
              fecha={data.cdaSentDate}
              tooltip="Fecha en que se envió el acuerdo de confidencialidad firmado."
            />
            <Typography><strong>Investigador Principal:</strong> {data.principalInvestigator}</Typography>
            <Tooltip title="Compromiso de pacientes por los cuales nos comprometemos como centro (la meta)">
              <Typography>
                <strong>Compromiso pacientes (ICLSR):</strong> {data.patientsCommitmentICLSR}
              </Typography>
            </Tooltip>
             <Tooltip title="Pacientes asignados por el sponsor">
              <Typography>
                <strong>Pacientes Asignados:</strong> {data.patientsCommitment}
              </Typography>
            </Tooltip>
            <Typography><strong>Área:</strong> {data.area}</Typography>
            <Typography><strong>Patología:</strong> {data.patologia}</Typography>
           <Tooltip title="Tipo de droga, molécula o producto que se está investigando en el estudio" arrow placement="top-start">
              <Typography><strong>Producto de investigación:</strong> {data.productoInvestigacion}</Typography>
           </Tooltip>
            <Typography><strong>Correo de Contacto Sponsor:</strong> {data.email}</Typography>
          </Box>
        <Box display="flex" alignItems="center">
          <PeriodoFechasFormateadas
          label="Periodo de Reclutamiento"
          desde={data.recruitmentStart}
          hasta={data.recruitmentEnd}
          tooltip="Periodo de reclutamiento estimado por el sponsor"
        />
        </Box>

          <Box sx={{ background: '#f1fafa', p: 3, borderRadius: 1 }}>
            <Typography fontWeight={500}>Comentario(s)</Typography>
            <Typography color="textSecondary">{data.comment}</Typography>
          </Box>

          <Divider />

          <Box>
            <Typography variant="h6" gutterBottom>Representante(s)</Typography>
            {data.agents.map((agent, i) => (
              <Box key={i} mb={1} display="grid" gridTemplateColumns="1fr 1fr 1fr" gap={2}>
                <Typography><strong>Nombre:</strong> {agent.name}</Typography>
                <Typography><strong>Email:</strong> {agent.email}</Typography>
                <Typography><strong>Teléfono:</strong> {agent.phone_number}</Typography>
              </Box>
            ))}
          </Box>
          <Divider />
        </Stack>
      </Paper>

      <ModalConfirmacion
        open={openModal}
        onClose={() => setOpenModal(false)}
        onConfirm={handleDelete}
        title="¿Estás seguro de que quieres eliminar esta factibilidad?"
        description="Esta acción no se puede deshacer."
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
    </Container>
  );
}

           
            