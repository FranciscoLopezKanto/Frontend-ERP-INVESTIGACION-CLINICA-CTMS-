import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import esLocale from '@fullcalendar/core/locales/es';
import { Box, Typography } from '@mui/material';
import { Visita } from '../../types';
import { useNavigate } from 'react-router-dom';

type Props = {
  visitas: Visita[];
};

export default function VisitasCalendar({ visitas }: Props) {
  const navigate = useNavigate();

  const eventos = visitas.map((v) => {
    const fechaUTC = new Date(v.fechaProgramada);
    const fechaSinCambio = new Date(fechaUTC.getTime() + fechaUTC.getTimezoneOffset() * 60000);
    const tipo = v.entidad?.tipo;
    const nombre = v.entidad?.nombre || 'Sin nombre';
    const representante = v.entidad?.representante || '—';
    const hora = fechaSinCambio.toLocaleTimeString('es-CL', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    });

    const esPaciente = tipo === 'paciente';
    const esSponsor = tipo === 'sponsor';

    const labelTipo = esPaciente
      ? 'Paciente'
      : esSponsor
      ? 'Sponsor'
      : 'Regulatorio';

    return {
      title: `${nombre}`,
      start: fechaSinCambio.toISOString(), 
      backgroundColor: esPaciente
        ? '#66bb6a'
        : esSponsor
        ? '#42a5f5'
        : '#ab47bc',
      extendedProps: {
        id: v._id,
        tipo,
        motivo: v.motivo,
        descripcion: v.descripcion,
        estado: v.estado,
        detalle: v.detalle,
        nombre,
        representante,
        hora,
        labelTipo,
      },
    };
  });

  return (
    <>
      {/* Leyenda de colores */}
      <Box display="flex" justifyContent="start" gap={4} mb={2}>
        <Box display="flex" alignItems="center" gap={1}>
          <Box width={16} height={16} bgcolor="#66bb6a" borderRadius={1} />
          <Typography variant="body2">Paciente</Typography>
        </Box>
        <Box display="flex" alignItems="center" gap={1}>
          <Box width={16} height={16} bgcolor="#42a5f5" borderRadius={1} />
          <Typography variant="body2">Patrocinador</Typography>
        </Box>
        <Box display="flex" alignItems="center" gap={1}>
          <Box width={16} height={16} bgcolor="#ab47bc" borderRadius={1} />
          <Typography variant="body2">Regulatorio</Typography>
        </Box>
      </Box>

      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        locale={esLocale}
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay',
        }}
        height="auto"
        events={eventos}
        eventClick={(info) => {
          const visitaId = info.event.extendedProps.id;
          if (visitaId) navigate(`/visitas/${visitaId}`);
        }}
        eventDidMount={(info) => {
          const {
            nombre,
            representante,
            motivo,
            descripcion,
            detalle,
            estado,
            hora,
            labelTipo,
            tipo,
          } = info.event.extendedProps;

          const tooltip =
            tipo === 'paciente'
              ? `${labelTipo}: ${nombre}\nHora: ${hora}\nMotivo: ${motivo}\nDetalle: ${detalle}\nEstado: ${estado}\nDescripción: ${descripcion || '—'}`
              : `${labelTipo}: ${nombre}\nRepresentante: ${representante}\nHora: ${hora}\nMotivo: ${motivo}\nDetalle: ${detalle}\nEstado: ${estado}\nDescripción: ${descripcion || '—'}`;

          info.el.setAttribute('title', tooltip);

          // Estilo adicional para estado "Ingresada"
          if (estado === 'Ingresada') {
            info.el.style.border = '3px solid #2e7d32'; // borde verde más oscuro
            info.el.style.boxSizing = 'border-box'; // asegura que el tamaño no se rompa
          }
        }} 
      />
      {/* Capitalizar nombre del mes en título */}
      <style>
        {`
          .fc-toolbar-title {
            text-transform: capitalize;
          }
        `}
      </style>
    </>
  );
}
