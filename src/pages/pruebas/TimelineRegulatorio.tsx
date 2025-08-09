import {
    Timeline, TimelineItem, TimelineSeparator, TimelineConnector,
    TimelineContent, TimelineDot
  } from '@mui/lab'
import { Tooltip, Typography, Box } from '@mui/material'
  
  interface Evento {
    descripcion: string
    fecha: string
    estado: 'completo' | 'pendiente'
    detalle?: string
  }
  
  interface TimelineRegulatorioProps {
    eventos: Evento[]
  }
  
  export const TimelineRegulatorio = ({ eventos }: TimelineRegulatorioProps) => (
    <Timeline position="left" sx={{ pr: 6 }}>
      {eventos.map((evento, i) => (
        <TimelineItem key={i}>
          <TimelineSeparator>
            <TimelineDot color={evento.estado === 'completo' ? 'success' : 'grey'} />
            {i < eventos.length - 1 && <TimelineConnector />}
          </TimelineSeparator>
          <TimelineContent>
            <Tooltip title={evento.detalle || `Detalle no especificado para \"${evento.descripcion}\"`} placement="right">
              <Box>
                <Typography fontWeight={600}>{evento.descripcion}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {evento.fecha || 'Pendiente'}
                </Typography>
              </Box>
            </Tooltip>
          </TimelineContent>
        </TimelineItem>
      ))}
    </Timeline>
  )
  