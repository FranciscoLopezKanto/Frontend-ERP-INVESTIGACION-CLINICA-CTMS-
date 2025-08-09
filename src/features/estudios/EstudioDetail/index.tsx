import {
  Box, Typography, Container, CircularProgress, Grid, TextField,
  Tooltip
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { estudiosService } from '../services';
import { Estudio } from '../types';
import CustomButton from '../../../components/Button';
import EditIcon from '@mui/icons-material/Edit';

import StepperEstadoEstudio from '../utils/StepperEstadoEstudio';
import LeyendaEtapas from '../utils/LeyendaEtapas';
import StaffInvestigacion from '../utils//StaffInvestigacion';
import Monitores from '../utils/Monitores';
import DocumentosEstudio from '../utils/DocumentosEstudio';
import ModalEditarAgentes from '../components/EditarAgentesForm';
import ModalEditarDocumentos from '../components/ModalEditarDocumentos';
import AsignarEquipoModal from '../components/ModalAsignarEquipos';
import { EstadoEstudio } from '../enums';
import FechaFormateadaCampo, { PeriodoFechasCampo } from '../components/FechaFormateadaCampo';
import ModalConfirmacion from '../../../components/ModalConfirmacion';

export default function DetalleEstudioPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [estudio, setEstudio] = useState<Estudio | null>(null);
  const [loading, setLoading] = useState(true);
  const [openEquipoModal, setOpenEquipoModal] = useState(false);
  const [openAgentesModal, setOpenAgentesModal] = useState(false);
  const [openDocsModal, setOpenDocsModal] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);
  
  const fetchEstudio = async () => {
    if (id) {
      const res = await estudiosService.getById(id);
      setEstudio(res);
    }
  };

  useEffect(() => {
    fetchEstudio().finally(() => setLoading(false));
  }, [id]);

  const handleGuardarEquipo = async (equipoNuevo: any[]) => {
    if (!id) return;
    const equipoLimpio = equipoNuevo.map(({ _id, requiredDocuments, ...rest }) => ({
      ...rest,
      requiredDocuments: (requiredDocuments || []).map((doc: any) => {
        const { _id, ...docLimpio } = doc;
        return docLimpio;
      }),
    }));
    await estudiosService.updateEquipo(id, { equipo: equipoLimpio });
    await fetchEstudio();
    setOpenEquipoModal(false);
  };
  const handleEliminar = async () => {
    if (!estudio) return;
    try {
      setLoadingDelete(true);
      await estudiosService.remove(estudio._id);
      navigate('/investigaciones');
    } catch (error) {
      console.error('Error al eliminar estudio:', error);
      alert('❌ Error al eliminar el estudio');
    } finally {
      setLoadingDelete(false);
      setOpenModal(false);
    }
  };

  if (loading || !estudio) return <CircularProgress />;

  return (
    <Container id="detalle-estudio" sx={{ width: '110%' }}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h5" fontWeight={600}>
          {estudio.protocolo} - Estudio Clínico
        </Typography>
        <Box display="flex" gap={2}>
          <CustomButton
            $variant="outlined"
            color="danger"
            onClick={() => setOpenModal(true)}
          >
            Eliminar
          </CustomButton>

          <CustomButton
            $variant="contained"
            onClick={() => navigate(`/investigaciones/${id}/editar`)}
            startIcon={<EditIcon />}
          >
            Editar
          </CustomButton>
        </Box>
      </Box>

      <Typography variant="body2" color="text.secondary" mb={3}>
        {estudio.patologia}
      </Typography>

      <StepperEstadoEstudio estadoActual={estudio.estado as EstadoEstudio} />

      <LeyendaEtapas />

      {/* Información Principal */}
      <Box mb={4}>
        <Typography variant="subtitle1" fontWeight={600} mb={2}>
          Información Principal
        </Typography>
        <Grid container spacing={2} mb={3}>
          <Grid size={{ xs: 12, md: 3 }}>
            <TextField label="Investigador Principal" value={estudio.investigadorPrincipal} fullWidth InputProps={{ readOnly: true }} />
          </Grid>
          <Grid size={{ xs: 12, md: 3 }}>
            <TextField label="Área" value={estudio.area} fullWidth InputProps={{ readOnly: true }} />
          </Grid>
          <Grid size={{ xs: 12, md: 3 }}>
            <TextField label="Sponsor" value={estudio.sponsor} fullWidth InputProps={{ readOnly: true }} />
          </Grid>
          <Grid size={{ xs: 12, md: 3 }}>
            <TextField label="Estado Actual" value={estudio.estado} fullWidth InputProps={{ readOnly: true }} />
          </Grid>
        </Grid>
        <Typography variant="subtitle1" fontWeight={'bold'} mb={1}>
          Título del Estudio
        </Typography>
        <TextField value={estudio.titulo || 'Sin título'} fullWidth multiline rows={4} InputProps={{ readOnly: true }} />
      </Box>

   
      {/* Información Operativa */}
      <Box mt={4}>
        <Typography variant="subtitle1" fontWeight={600} mb={2}>
          Información Operativa
        </Typography>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 3 }}>
            <Tooltip title="Fase clínica del estudio, como Fase I, II, III o IV. (Fase 1 por defecto si no se especifico)">
              <TextField label="Fase" value={estudio.fase || 'No definido'} fullWidth InputProps={{ readOnly: true }} />
            </Tooltip>
          </Grid>
          <Grid size={{ xs: 12, md: 3 }}>
            <Tooltip title="Forma farmacéutica de la droga: oral, inyectable, etc. Oral por defecto si no se especifico">
              <TextField label="Tipo de Droga" value={estudio.tipoDroga || 'No definido'} fullWidth InputProps={{ readOnly: true }} />
            </Tooltip>
          </Grid>
          <Grid size={{ xs: 12, md: 3 }}>
            <Tooltip title="Identificador único del centro asignado por el sponsor. 204 por defecto si no se especifico">
              <TextField label="Site Number" value={estudio.siteNumber || 'No registrada'} fullWidth InputProps={{ readOnly: true }} />
            </Tooltip>
          </Grid>
          <Grid size={{ xs: 12, md: 3 }}>
            <Tooltip title="Nombre del comité ético que supervisa el estudio.">
              <TextField label="Comité Ético" value={estudio.comite || 'No registrada'} fullWidth InputProps={{ readOnly: true }} />
            </Tooltip>
          </Grid>

          <Grid size={{ xs: 12, md: 3 }}>
            <Tooltip title="Cantidad de pacientes randomizados que el sponsor asignó al centro.">
              <TextField label="Pacientes Asignados por Sponsor" value={estudio.compromisoPacientes || 'No registrado'} fullWidth InputProps={{ readOnly: true }} />
            </Tooltip>
          </Grid>
          <Grid size={{ xs: 12, md: 3 }}>
            <Tooltip title="Cantidad de pacientes randomizados comprometidos por ICLSR como una meta interna del centro.">
              <TextField label="Compromiso Pacientes ICLSR" value={estudio.patientsCommitmentICLSR || 'No registrado'} fullWidth InputProps={{ readOnly: true }} />
            </Tooltip>
          </Grid>
          <Grid size={{ xs: 12, md: 3 }}>
            <Tooltip title="Correo de contacto del estudio en el centro.">
              <TextField label="Email de Contacto" value={estudio.emailContacto || 'No registrada'} fullWidth InputProps={{ readOnly: true }} />
            </Tooltip>
          </Grid>
          <Grid size={{ xs: 12, md: 3 }}>
            <Tooltip title="Número o código de resolución entregado por el comité.">
              <TextField label="Resolución Aprobatoria" value={estudio.resolucionAprobatoria || 'No registrada'} fullWidth InputProps={{ readOnly: true }} />
            </Tooltip>
          </Grid>
          <Grid size={{ xs: 12, md: 3 }}>
            <Tooltip title="Nombre o código de la droga en investigación.">
              <TextField label="Producto de Investigación" value={estudio.productoInvestigacion || 'No registrado'} fullWidth InputProps={{ readOnly: true }} />
            </Tooltip>
          </Grid>
          <Grid size={{ xs: 12, md: 3 }}>
            <Tooltip title="Total de pacientes randomizados de la investigación Actualmente.">
              <TextField label="Pacientes Randomizados Actuales" value={estudio.pacientesTotales || 'No registrado'} fullWidth InputProps={{ readOnly: true }} />
            </Tooltip>
          </Grid>
          <Grid size={{ xs: 12, md: 3 }}>
            <Tooltip title="Enfermedad o condición a la que está orientado el estudio.">
              <TextField label="Patología" value={estudio.patologia || 'No registrada'} fullWidth InputProps={{ readOnly: true }} />
            </Tooltip>
          </Grid>
          <Grid size={{ xs: 12, md: 3 }}>
            <Tooltip title="Código de identificación del estudio entregado por el sponsor.">
              <TextField label="Código del Estudio" value={estudio.protocolo || 'No registrada'} fullWidth InputProps={{ readOnly: true }} />
            </Tooltip>
          </Grid>

          {/* 🆕 Periodo de Reclutamiento */}
          <Grid size={{ xs: 12, md: 6 }}>
            <PeriodoFechasCampo
              label="Período de Reclutamiento Programado"
              desde={estudio.recruitmentStart}
              hasta={estudio.recruitmentEnd}
              tooltip="Rango que abarca desde el inicio hasta el fin del proceso de reclutamiento de pacientes asignado por el sponsor en la factibilidad."
            />
          </Grid>


          <Grid size={{ xs: 12 }}>
            <Tooltip title="Breve descripción del objetivo principal del estudio clínico.">
              <TextField
                label="Objetivo del Estudio"
                value={estudio.objetivoEstudio || 'No definido'}
                fullWidth
                multiline
                rows={3}
                InputProps={{ readOnly: true }}
              />
            </Tooltip>
          </Grid>
        </Grid>
      </Box>

      {/* Fechas Clave */}
      <Box mt={6} mb={4}>
        <Typography variant="subtitle1" fontWeight={600} mb={2}>
          Fechas Clave
        </Typography>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 3 }}>
            <FechaFormateadaCampo label="Llegada Paquete Inicial" fecha={estudio.llegadaPaqueteInicial} tooltip="Fecha en que se recibe el paquete de documentos iniciales del estudio." />
          </Grid>
          <Grid size={{ xs: 12, md: 3 }}>
            <FechaFormateadaCampo label="Sometimiento Inicial" fecha={estudio.sometimientoInicial} tooltip="Fecha en la que se envía la documentación al comité ético." />
          </Grid>
          <Grid size={{ xs: 12, md: 3 }}>
            <FechaFormateadaCampo label="Aprobación Sometimiento Inicial" fecha={estudio.fechaAprobacionSometimiento} tooltip="Fecha en que el comité ético aprueba formalmente el estudio." />
          </Grid>
          <Grid size={{ xs: 12, md: 3 }}>
            <FechaFormateadaCampo label="Site Ready" fecha={estudio.siteReady} tooltip="Fecha en que el sitio se declara preparado para iniciar el estudio." />
          </Grid>
          <Grid size={{ xs: 12, md: 3 }}>
            <FechaFormateadaCampo label="Visita de Inicio" fecha={estudio.visitaInicio} tooltip="Fecha de la visita de inicio (SIV)." />
          </Grid>
          <Grid size={{ xs: 12, md: 3 }}>
            <FechaFormateadaCampo label="Primer Screening" fecha={estudio.primerScreening} tooltip="Fecha del primer paciente evaluado para entrar al estudio." />
          </Grid>
          <Grid size={{ xs: 12, md: 3 }}>
            <FechaFormateadaCampo label="Primer Paciente Enrolado" fecha={estudio.primerPacienteEnrolado} tooltip="Fecha del primer paciente enrolado formalmente en el estudio." />
          </Grid>
          <Grid size={{ xs: 12, md: 3 }}>
            <FechaFormateadaCampo label="Primer FCI" fecha={estudio.primerFci} tooltip="Fecha en que se firmó el primer consentimiento informado." />
          </Grid>
          <Grid size={{ xs: 12, md: 3 }}>
            <FechaFormateadaCampo label="Primera Visita" fecha={estudio.primeraVisita} tooltip="Primera visita efectiva de un paciente enrolado." />
          </Grid>
          <Grid size={{ xs: 12, md: 3 }}>
            <FechaFormateadaCampo label="Última Visita" fecha={estudio.ultimaVisita} tooltip="Fecha en que se realiza la última visita del último paciente." />
          </Grid>
          <Grid size={{ xs: 12, md: 3 }}>
            <FechaFormateadaCampo label="Visita de Cierre" fecha={estudio.visitaCierre} tooltip="Fecha en que se realiza la visita de cierre del estudio." />
          </Grid>
        </Grid>
      </Box>

      {/* Fechas Operativas Finales */}
      <Box mt={4} mb={4}>
        <Typography variant="subtitle1" fontWeight={600} mb={2}>
          Fechas Operativas Finales
        </Typography>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 3 }}>
            <FechaFormateadaCampo label="Inicio Reclutamiento" fecha={estudio.inicioReclutamiento} tooltip="Fecha en que se comienza oficialmente a reclutar pacientes." />
          </Grid>
          <Grid size={{ xs: 12, md: 3 }}>
            <FechaFormateadaCampo label="Cierre Reclutamiento" fecha={estudio.cierreReclutamiento} tooltip="Fecha en que se cierra el proceso de reclutamiento de pacientes." />
          </Grid>
          <Grid size={{ xs: 12, md: 3 }}>
            <FechaFormateadaCampo label="Cierre Oficial Estudio" fecha={estudio.fechaCierreEstudio} tooltip="Fecha oficial del cierre del estudio clínico." />
          </Grid>
          <Grid size={{ xs: 12, md: 3 }}>
            <FechaFormateadaCampo
              label="Fecha de Selección"
              fecha={estudio.fechaSeleccion || estudio.createdAt}
              tooltip="Fecha en que el centro fue seleccionado para participar en el estudio."
            />
          </Grid>
        </Grid>
      </Box>


      <Grid container spacing={3} mb={3} direction="column">
        <StaffInvestigacion equipo={estudio.equipo ?? []} onClickEditar={() => setOpenEquipoModal(true)} />
        <Monitores agentes={estudio.agentes ?? []} onClickEditar={() => setOpenAgentesModal(true)} />
        <DocumentosEstudio documentos={estudio.documentos ?? []} onClickEditar={() => setOpenDocsModal(true)} />
      </Grid>

      <Box mb={4}>
        <Typography variant="subtitle1" fontWeight={600} mb={2}>Observaciones</Typography>
        <TextField fullWidth multiline rows={3} value={estudio.observaciones || '-'} InputProps={{ readOnly: true }} />
      </Box>

      <AsignarEquipoModal
        open={openEquipoModal}
        onClose={() => setOpenEquipoModal(false)}
        onGuardar={handleGuardarEquipo}
        equipoActual={(estudio.equipo ?? []).map((miembro) => ({
          id: (miembro as any).id || (miembro as any)._id || '',
          nombre: miembro.nombre || '',
          rol: typeof miembro.rol === 'string' ? miembro.rol : (miembro.rol ? String(miembro.rol) : ''),
          email: (miembro as any).email || '',
          requiredDocuments: (miembro as any).requiredDocuments || [],
        }))}
      />

      <ModalEditarAgentes
        open={openAgentesModal}
        onClose={() => setOpenAgentesModal(false)}
        estudioId={estudio._id}
        agentesIniciales={(estudio.agentes || []).map(a => ({ ...a, phone_number: a.phone_number ?? '' }))}
        onAgentesActualizados={fetchEstudio}
      />

      <ModalEditarDocumentos
        open={openDocsModal}
        onClose={() => setOpenDocsModal(false)}
        estudioId={estudio._id}
        documentosIniciales={estudio.documentos ?? []}
        onDocumentosActualizados={fetchEstudio}
      />

      <ModalConfirmacion
        open={openModal}
        onClose={() => setOpenModal(false)}
        onConfirm={handleEliminar}
        title="¿Deseas eliminar este estudio?"
        description="Esta acción eliminará permanentemente el estudio. ¿Estás seguro?"
        confirmText="Eliminar Estudio"
        cancelText="Cancelar"
        loading={loadingDelete}
      />

    </Container>
  );
}
