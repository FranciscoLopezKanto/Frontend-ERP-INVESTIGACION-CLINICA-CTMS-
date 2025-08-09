import { Box, Typography, Chip, Divider } from '@mui/material'

interface Version {
  version: string
  fecha: string
  motivo: string
  consecuencia?: string
}

interface HistorialDocumentoProps {
  historial: Version[]
  titulo: string
}

export const HistorialDocumento = ({ historial, titulo }: HistorialDocumentoProps) => {
  return (
    <Box p={2}>
      <Typography variant="h6" gutterBottom>
        Historial de versiones: {titulo}
      </Typography>
      {historial.map((ver, idx) => (
        <Box key={idx} mb={2}>
          <Typography variant="subtitle1">
            <Chip label={ver.version} color="primary" size="small" /> – {ver.fecha}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Motivo del cambio: {ver.motivo}
          </Typography>
          {ver.consecuencia && (
            <Typography variant="body2" color="error">
              Consecuencia: {ver.consecuencia}
            </Typography>
          )}
          <Divider sx={{ mt: 1, mb: 1 }} />
        </Box>
      ))}
    </Box>
  )
}
