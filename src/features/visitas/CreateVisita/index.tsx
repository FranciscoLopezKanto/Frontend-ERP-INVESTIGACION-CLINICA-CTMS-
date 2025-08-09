import { useState, useEffect } from 'react';
import {
  Container, Paper, Box, Typography, MenuItem, Select, InputLabel, FormControl,
  TextField
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

import {
  TipoVisita, TipoVisitaLabel,
  EstadoVisita,
  MotivoVisita, MotivoVisitaLabel,
  MotivoVisita2, MotivoVisita2Label
} from '../types/enums';

import { visitasService } from '../services/backend';
import { pacientesService } from '../../pacientes/services';
import { estudiosService } from '../../estudios/services';

import { VisitaPacienteForm } from '../components/VisitaPacienteForm';
import { VisitaRSForm } from '../components/VisitaRSForm';
import SelectorFechaPorMotivo from '../components/SelectorFechaPorMotivo'; // Tu nuevo selector
import AlertaSnackbar from '../../../components/AlertaSnackbar';
import CustomButton from '../../../components/Button';
import { useLoading } from '../../../context/loading.context';
import { Paciente } from '../../pacientes/types';

export default function IngresarVisitaPage() {
  const navigate = useNavigate();
  const { showLoading, hideLoading } = useLoading();

  const [tipoEntidad, setTipoEntidad] = useState<TipoVisita>(TipoVisita.Paciente);
  const [fecha, setFecha] = useState('');
  const [motivo, setMotivo] = useState('');
  const [referenciaId, setReferenciaId] = useState('');
  const [codigoRandomizado, setCodigoRandomizado] = useState('');
  const [codigoEstudio, setCodigoEstudio] = useState('');
  const [nombrePaciente, setNombrePaciente] = useState('');
  const [institucion, setInstitucion] = useState('');
  const [representante, setRepresentante] = useState('');
  const [detalle, setDetalle] = useState('');
  const [esManual, setEsManual] = useState(false);
  const [pacientes, setPacientes] = useState<Paciente[]>([]);
  const [estudios, setEstudios] = useState<{ id: string; codigo: string }[]>([]);
  const [descripcion, setDescripcion] = useState('');

  const [buttonLoading, setButtonLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [successSnackbarOpen, setSuccessSnackbarOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [errorSnackbarOpen, setErrorSnackbarOpen] = useState(false);

  useEffect(() => {
    showLoading();
    setTimeout(() => hideLoading(), 1000);
  }, []);

  useEffect(() => {
    if (tipoEntidad === TipoVisita.Paciente) {
      pacientesService.getAll()
        .then((res) => setPacientes(res.data))
        .catch((err) => console.error('Error al obtener pacientes:', err));
    }
  }, [tipoEntidad]);

  useEffect(() => {
    estudiosService.getAll()
      .then((res) => {
        const adaptado = res.map((estudio) => ({
          id: estudio._id,
          codigo: estudio.protocolo
        }));
        setEstudios(adaptado);
      })
      .catch((err) => console.error('Error al obtener estudios:', err));
  }, []);

  const handleSubmit = async () => {
    if (!fecha || !motivo || (!referenciaId && !codigoEstudio)) {
      setErrorMessage('Por favor completa todos los campos obligatorios.(Fecha, Motivo y Paciente/Estudio)');
      setErrorSnackbarOpen(true);
      return;
    }

    const payload = {
      tipo: tipoEntidad,
      estado: EstadoVisita.Agendada,
      fechaProgramada: fecha, // ✅ Ya viene ajustada del selector
      motivo,
      entidad: {
        tipo: tipoEntidad,
        nombre: tipoEntidad === TipoVisita.Paciente ? nombrePaciente : institucion,
        ...(tipoEntidad === TipoVisita.Paciente
          ? {
              codigoPaciente: referenciaId,
              codigoEstudio: esManual ? codigoEstudio : pacientes.find(p => p.codigo === referenciaId)?.estudioId || '',
              codigoRandomizado: codigoRandomizado,
            }
          : {
              codigoEstudio: referenciaId,
              representante,
            }),
      },
      documentosAdjuntos: [],
      historial: [],
      descripcion: descripcion || '',
      detalle: detalle || '',
    };

    setButtonLoading(true);
    try {
      await visitasService.createVisita(payload);
      setSuccessMessage(`Visita registrada exitosamente.`);
      setSuccessSnackbarOpen(true);
      setTimeout(() => navigate('/visitas'), 2000);
    } catch (error) {
      console.error('Error al crear visita:', error);
      setErrorMessage('Error al registrar la visita. Intenta nuevamente.');
      setErrorSnackbarOpen(true);
    } finally {
      setButtonLoading(false);
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Paper sx={{ p: 4, borderRadius: 2 }}>
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          Ingresar nueva visita
        </Typography>

        <FormControl fullWidth margin="normal">
          <InputLabel id="tipo-visita-label">Tipo de visita</InputLabel>
          <Select
            labelId="tipo-visita-label"
            value={tipoEntidad}
            label="Tipo de visita"
            onChange={(e) => {
              const selected = e.target.value as TipoVisita;
              setTipoEntidad(selected);
              setMotivo('');
              setReferenciaId('');
              setCodigoEstudio('');
              setCodigoRandomizado('');
              setNombrePaciente('');
              setInstitucion('');
              setRepresentante('');
              setEsManual(false);
            }}
          >
            {Object.values(TipoVisita).map((value) => (
              <MenuItem key={value} value={value}>
                {TipoVisitaLabel[value]}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth margin="normal">
          <InputLabel>Motivo</InputLabel>
          <Select
            value={motivo}
            label="Motivo"
            onChange={(e) => {
              setMotivo(e.target.value);
              setFecha('');  // ✅ Limpia la fecha global al cambiar motivo
            }}
          >
            {(tipoEntidad === TipoVisita.Paciente
              ? Object.values(MotivoVisita)
              : Object.values(MotivoVisita2)
            ).map((option) => (
              <MenuItem key={option} value={option}>
                {(tipoEntidad === TipoVisita.Paciente
                  ? MotivoVisitaLabel[option as MotivoVisita]
                  : MotivoVisita2Label[option as MotivoVisita2]
                )}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          label="Detalle"
          fullWidth
          margin="normal"
          value={detalle}
          onChange={(e) => setDetalle(e.target.value)}
        />

        <SelectorFechaPorMotivo 
          key={motivo}
          motivo={motivo as MotivoVisita}
          fecha={fecha}
          setFecha={setFecha} paciente={''}        />

        {tipoEntidad === TipoVisita.Paciente ? (
          <VisitaPacienteForm
            pacientes={pacientes}
            codigoRandomizado={codigoRandomizado}
            setCodigoRandomizado={setCodigoRandomizado}
            nombrePaciente={nombrePaciente}
            setNombrePaciente={setNombrePaciente}
            referenciaId={referenciaId}
            setReferenciaId={setReferenciaId}
            codigoEstudio={codigoEstudio}
            setCodigoEstudio={setCodigoEstudio}
            esManual={esManual}
            setEsManual={setEsManual}
            estudios={estudios}
          />
        ) : (
          <VisitaRSForm
            institucion={institucion}
            setInstitucion={setInstitucion}
            representante={representante}
            setRepresentante={setRepresentante}
            referenciaId={referenciaId}
            setReferenciaId={setReferenciaId}
            estudios={estudios}
          />
        )}
         <TextField
          label="Descripcion adicional"
          fullWidth
          multiline
          rows={6}
          margin="normal"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
        />

        <Box display="flex" justifyContent="flex-end" mt={3}>
          <CustomButton
            $variant="contained"
            loading={buttonLoading}
            loadingText="Ingresando visita..."
            onClick={handleSubmit}
          >
            Ingresar visita
          </CustomButton>
        </Box>
      </Paper>

      <AlertaSnackbar
        open={successSnackbarOpen}
        onClose={() => setSuccessSnackbarOpen(false)}
        message={successMessage}
        severity="success"
      />
      <AlertaSnackbar
        open={errorSnackbarOpen}
        onClose={() => setErrorSnackbarOpen(false)}
        message={errorMessage}
        severity="error"
      />
    </Container>
  );
}
