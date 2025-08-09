import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Box,
  Typography,
  Paper,
  ListItem,
  ListItemButton,
  ListItemText,
  Grid,
  IconButton,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Divider
} from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import NotificationsIcon from '@mui/icons-material/Notifications'
import { useState } from 'react'
import { estudios } from './data'
import { Documento } from './types'
import { NotificationPopover } from '../../components/NotificationPopover'
import { TimelineRegulatorio } from './TimelineRegulatorio'

const DashboardRegulatorio = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [expandedId, setExpandedId] = useState<string | false>(false)
  const [documentoSeleccionado, setDocumentoSeleccionado] = useState<Documento | null>(null)

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => setAnchorEl(null)
  const open = Boolean(anchorEl)
  const id = open ? 'notificaciones-popover' : undefined

  const alertasGlobales = estudios.flatMap(estudio =>
    estudio.alertas.map(alerta => ({ ...alerta, estudioNombre: estudio.nombre }))
  )

  const getUltimaVersion = (docs: Documento[]) =>
    docs.sort((a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime())[0]

  const getVersionesPorTipo = (tipo: string) =>
    estudios.flatMap(e => e.documentos).filter(doc => doc.tipo === tipo)

  return (
    <Box p={3}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h4">Dashboard Regulatorio</Typography>
        <IconButton color="inherit" onClick={handleClick} aria-describedby={id}>
          <NotificationsIcon />
        </IconButton>
      </Box>

      <NotificationPopover
        id={id||""}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        alertas={alertasGlobales}
      />

      <Grid container spacing={2} mt={2}>
        <Grid size={{ xs: 12, md: 3 }}>
          {estudios.map((estudio) => (
            <Accordion
              key={estudio.id}
              expanded={expandedId === estudio.id}
              onChange={() => setExpandedId(prev => prev === estudio.id ? false : estudio.id)}
            >
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography fontWeight={600}>{estudio.nombre}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                {Array.from(new Set(estudio.documentos.map(d => d.tipo))).map(tipo => {
                  const docsTipo = estudio.documentos.filter(d => d.tipo === tipo)
                  const ultima = getUltimaVersion(docsTipo)
                  return (
                    <ListItem key={tipo} disablePadding>
                      <ListItemButton onClick={() => setDocumentoSeleccionado(ultima)}>
                        <ListItemText
                          primary={`${tipo} (Última versión: ${ultima.version})`}
                          secondary={`Estado: ${ultima.estado} | Fecha: ${ultima.fecha}`}
                        />
                      </ListItemButton>
                    </ListItem>
                  )
                })}
              </AccordionDetails>
            </Accordion>
          ))}
        </Grid>

        <Grid size={{xs: 12, md: 9}}>
          {documentoSeleccionado && (
            <Paper elevation={3} sx={{ p: 3, width: '100%' }}>
              <Typography variant="h6" mb={2}>Hoja de Vida - {documentoSeleccionado.tipo}</Typography>

              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel>Versión</InputLabel>
                <Select
                  value={documentoSeleccionado.version}
                  label="Versión"
                  onChange={(e) => {
                    const nueva = getVersionesPorTipo(documentoSeleccionado.tipo).find(v => v.version === e.target.value)
                    if (nueva) setDocumentoSeleccionado(nueva)
                  }}
                >
                  {getVersionesPorTipo(documentoSeleccionado.tipo).map((doc, i) => (
                    <MenuItem key={i} value={doc.version}>{doc.version}</MenuItem>
                  ))}
                </Select>
              </FormControl>

              <Box mb={3}>
                <Typography variant="subtitle1" fontWeight={600} gutterBottom>Detalle del proceso:</Typography>
                <Typography variant="body2" color="text.secondary" sx={{ whiteSpace: 'pre-line' }}>
                  {
                    documentoSeleccionado.timeline.map((etapa) => {
                      const tipo =
                        etapa.descripcion.toLowerCase().includes('recepción')
                          ? '📩 Paquete recibido por centro'
                          : etapa.descripcion.toLowerCase().includes('presentación')
                          ? '📤 Presentación a comité'
                          : etapa.descripcion.toLowerCase().includes('respuesta') && etapa.detalle?.toLowerCase().includes('corrección')
                          ? '🟠 Observaciones por corregir'
                          : etapa.descripcion.toLowerCase().includes('respuesta') && etapa.detalle?.toLowerCase().includes('rechaza')
                          ? '🔴 Rechazado'
                          : etapa.descripcion.toLowerCase().includes('respuesta')
                          ? '🟢 Aprobado sin observaciones'
                          : ''

                      return `• ${etapa.descripcion}${tipo ? ' (' + tipo + ')' : ''}: ${etapa.detalle || 'Sin detalle'}\n`
                    }).join('')
                  }
                </Typography>
              </Box>

              <Divider sx={{ mb: 2 }} />
              <TimelineRegulatorio eventos={documentoSeleccionado.timeline} />
            </Paper>
          )}
        </Grid>
      </Grid>
    </Box>
  )
}

export default DashboardRegulatorio
