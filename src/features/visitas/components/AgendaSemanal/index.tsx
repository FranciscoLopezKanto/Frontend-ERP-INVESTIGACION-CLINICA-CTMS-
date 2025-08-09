import {
  Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, Typography, Box,
  IconButton, Button, Chip
} from '@mui/material';
import { Visita } from '../../types';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import TodayIcon from '@mui/icons-material/Today';
import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { revertirZonaHoraria } from '../../utils';

interface Props {
  visitas: Visita[];
}

export default function AgendaSemanal({ visitas }: Props) {
  const [offset, setOffset] = useState(0);
  const navigate = useNavigate();

  const inicioSemana = useMemo(() => {
    const d = new Date();
    d.setDate(d.getDate() - ((d.getDay() + 6) % 7) + offset * 7); // lunes
    d.setHours(0, 0, 0, 0);
    return d;
  }, [offset]);

  const finSemana = new Date(inicioSemana);
  finSemana.setDate(inicioSemana.getDate() + 6);
  finSemana.setHours(23, 59, 59, 999);

  const semanaLabel = `${inicioSemana.toLocaleDateString('es-CL', {
    day: '2-digit', month: 'short', year: 'numeric'
  })} al ${finSemana.toLocaleDateString('es-CL', {
    day: '2-digit', month: 'short', year: 'numeric'
  })}`;

  const visitasSemana = visitas.filter((v) => {
    const fecha = new Date(v.fechaProgramada);
    return fecha >= inicioSemana && fecha <= finSemana;
  });

  const getEstadoChip = (estado: string) => {
    const color =
      estado === 'Confirmada' ? 'success' :
      estado === 'Cancelada' ? 'error' :
      estado === 'Reagendada' ? 'warning' :
      estado === 'Ingresada' ? 'info' :
      estado === 'Realizada' ? 'success' :
      'default';

    return <Chip label={estado} color={color} size="small" />;
  };

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
        <Typography variant="h6">Agenda semanal de visitas</Typography>
        <Box display="flex" alignItems="center" gap={1}>
          <IconButton onClick={() => setOffset(offset - 1)}>
            <ArrowBackIosNewIcon fontSize="small" />
          </IconButton>
          <Typography variant="body2">Semana del {semanaLabel}</Typography>
          <IconButton onClick={() => setOffset(offset + 1)}>
            <ArrowForwardIosIcon fontSize="small" />
          </IconButton>
          {offset !== 0 && (
            <Button onClick={() => setOffset(0)} startIcon={<TodayIcon />} size="small">
              Hoy
            </Button>
          )}
        </Box>
      </Box>

      {/* Leyenda de colores */}
      <Box display="flex" gap={4} mb={2}>
        <Box display="flex" alignItems="center" gap={1}>
          <Box width={16} height={16} bgcolor="rgba(102, 187, 106, 0.5)" borderRadius={1} />
          <Typography variant="body2">Paciente</Typography>
        </Box>
        <Box display="flex" alignItems="center" gap={1}>
          <Box width={16} height={16} bgcolor="rgba(66, 165, 245, 0.5)" borderRadius={1} />
          <Typography variant="body2">Patrocinador</Typography>
        </Box>
        <Box display="flex" alignItems="center" gap={1}>
          <Box width={16} height={16} bgcolor="rgba(171, 71, 188, 0.5)" borderRadius={1} />
          <Typography variant="body2">Regulatorio</Typography>
        </Box>
      </Box>

      <TableContainer component={Paper}>
        <Table size="small">
          <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
            <TableRow>
              <TableCell><strong>Tipo</strong></TableCell>
              <TableCell><strong>Codigo Estudio</strong></TableCell>
              <TableCell><strong>Motivo</strong></TableCell>
              <TableCell><strong>Detalle</strong></TableCell>
              <TableCell><strong>Día</strong></TableCell>
              <TableCell><strong>Hora inicio</strong></TableCell>
              <TableCell><strong>Hora fin</strong></TableCell>
              <TableCell><strong>Estado</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {[...visitasSemana]
                .sort((a, b) => new Date(a.fechaProgramada).getTime() - new Date(b.fechaProgramada).getTime())
                .map((v, i) => {
                const fecha = revertirZonaHoraria(v.fechaProgramada);
                const horaInicio = fecha.toLocaleTimeString('es-CL', { hour: '2-digit', minute: '2-digit' });
                const horaFin = new Date(fecha.getTime() + 60 * 60 * 1000).toLocaleTimeString('es-CL', { hour: '2-digit', minute: '2-digit' });
                const dia = fecha.toLocaleDateString('es-CL', { weekday: 'long', day: '2-digit', month: 'short' });


                const tipo = v.entidad?.tipo;
                let bgColor = tipo === 'paciente'
                    ? 'rgba(102, 187, 106, 0.2)'
                    : tipo === 'sponsor'
                    ? 'rgba(66, 165, 245, 0.2)'
                    : tipo === 'regulatorio'
                    ? 'rgba(171, 71, 188, 0.2)'
                    : 'transparent';

                if (v.estado === 'Ingresada') {
                    bgColor = tipo === 'paciente'
                    ? 'rgba(18, 214, 28, 0.4)'
                    : tipo === 'sponsor'
                    ? 'rgba(9, 127, 224, 0.4)'
                    : tipo === 'regulatorio'
                    ? 'rgba(156, 13, 182, 0.4)'
                    : 'rgba(200,200,200,0.4)';
                }

                return (
                    <TableRow
                    key={i}
                    sx={{ backgroundColor: bgColor, cursor: 'pointer' }}
                    onClick={() => navigate(`/visitas/${v._id}`)}
                    >
                    <TableCell>{v.entidad?.nombre || v.entidad?.representante || 'Sin nombre'}</TableCell>
                    <TableCell>{v.entidad?.codigoEstudio || v.entidad?.codigoPaciente || '-'}</TableCell>
                    <TableCell>{v.motivo}</TableCell>
                    <TableCell>{v.detalle || '-'}</TableCell>
                    <TableCell>{dia}</TableCell>
                    <TableCell>{horaInicio}</TableCell>
                    <TableCell>{horaFin}</TableCell>
                    <TableCell>{getEstadoChip(v.estado)}</TableCell>
                    </TableRow>
                );
                })}
            </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
