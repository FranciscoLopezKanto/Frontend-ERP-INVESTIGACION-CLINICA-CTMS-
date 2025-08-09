import { TextField, MenuItem } from '@mui/material';
import { MotivoVisita } from '../../types/enums';
import {
  BLOQUES_MANANA,
  BLOQUES_TARDE,
  obtenerCuposDisponibles,
  revertirZonaHoraria
} from '../../utils';
import { useState, useEffect } from 'react';
import ModalConfirmacion from '../../../../components/ModalConfirmacion';
import { visitasService } from '../../services/backend';

interface Props {
  motivo: MotivoVisita;
  fecha: string;
  setFecha: (fecha: string) => void;
  paciente: string;
}

export default function SelectorFechaPorMotivo({ motivo, fecha, setFecha }: Props) {
  const [visitas, setVisitas] = useState<any[]>([]);
  const [fechaSeleccionada, setFechaSeleccionada] = useState('');
  const [horaSeleccionada, setHoraSeleccionada] = useState('');
  const [horaOriginal, setHoraOriginal] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [horaPendiente, setHoraPendiente] = useState('');

  const esControlMedico =
    motivo === MotivoVisita.ControlMedicoCiclo ||
    motivo === MotivoVisita.ControlMedicoNoProgramado;

  useEffect(() => {
    if (fecha) {
      const fechaLocal = new Date(fecha);
      const fechaSolo = fechaLocal.toISOString().slice(0, 10);
      const horaSolo = fechaLocal.toISOString().slice(11, 16);
      setFechaSeleccionada(fechaSolo);
      setHoraSeleccionada(horaSolo);
      if (!horaOriginal) {
        setHoraOriginal(horaSolo);  // ✅ Guardamos la hora original solo la primera vez
      }
    } else {
      setFechaSeleccionada('');
      setHoraSeleccionada('');
      setHoraOriginal('');
    }
  }, [fecha, motivo]);

  useEffect(() => {
    if (fechaSeleccionada) {
      visitasService.getVisitsByDate(fechaSeleccionada).then((res) => {
        setVisitas(res.data);
      });
    }
  }, [fechaSeleccionada]);

  const handleHoraChange = (hora: string) => {
    const cupos = obtenerCuposDisponibles(hora, visitas);
    if (cupos.advertencia) {
      setHoraPendiente(hora);
      setModalOpen(true);
    } else {
      confirmarHora(hora);
    }
  };

  const confirmarHora = (hora: string) => {
    const fechaCompleta = new Date(`${fechaSeleccionada}T${hora}`);
    const fechaUTC = new Date(
      fechaCompleta.getTime() - fechaCompleta.getTimezoneOffset() * 60000
    ).toISOString();
    setFecha(fechaUTC);
    setHoraSeleccionada(hora);
  };

  if (esControlMedico) {
    return (
      <>
        <TextField
          label="Seleccionar día"
          type="date"
          fullWidth
          margin="normal"
          InputLabelProps={{ shrink: true }}
          value={fechaSeleccionada}
          onChange={(e) => {
            setFechaSeleccionada(e.target.value);
            setHoraSeleccionada('');
          }}
        />

        {fechaSeleccionada && (
          <TextField
            select
            label="Hora disponible"
            fullWidth
            margin="normal"
            value={horaSeleccionada}
            onChange={(e) => handleHoraChange(e.target.value)}
          >
            {[...BLOQUES_MANANA, ...BLOQUES_TARDE].map((hora) => {
              const cupos = obtenerCuposDisponibles(hora, visitas);
              const pacientesEnHora = visitas
                .filter((v) => {
                  const fecha = revertirZonaHoraria(v.fechaProgramada);
                  return fecha.getHours() === Number(hora.split(':')[0]);
                })
                .map((v) => v.entidad?.nombre || 'Paciente');

              return (
                <MenuItem
                  key={hora}
                  value={hora}
                  disabled={
                    !cupos.disponible &&
                    hora !== horaOriginal
                  } // ✅ Permite siempre volver a la hora original
                >
                  {hora}
                  {pacientesEnHora.length > 0 &&
                    ` - Ocupado por: ${pacientesEnHora.join(', ')}`}
                  {cupos.advertencia ? ' (Último cupo)' : ''}
                </MenuItem>
              );
            })}
          </TextField>
        )}

        <ModalConfirmacion
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          onConfirm={() => {
            confirmarHora(horaPendiente);
            setModalOpen(false);
          }}
          title="Confirmar selección"
          description="Ya hay un cupo utilizado para esta hora. Solo queda 1 restante. ¿Deseas continuar? (Se recomienda consultar con su equipo antes de confirmar)"
          confirmText="Sí, agendar"
          cancelText="Cancelar"
        />
      </>
    );
  }

  return (
    <TextField
      label="Fecha y hora programada"
      type="datetime-local"
      fullWidth
      margin="normal"
      InputLabelProps={{ shrink: true }}
      value={fecha}
      onChange={(e) => setFecha(e.target.value)}
      inputProps={{
        min: `${new Date().toISOString().slice(0, 10)}T07:00`,
      }}
    />
  );
}
