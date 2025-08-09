import { Box, Typography } from '@mui/material';

export default function LeyendaEtapas() {
  return (
    <Box display="flex" justifyContent="center" mt={6} mb={4} gap={4}>
      <Box display="flex" alignItems="center" gap={1}>
        <Box sx={{ width: 16, height: 16, borderRadius: '50%', backgroundColor: '#81C784' }} />
        <Typography variant="body2">Completado</Typography>
      </Box>
      <Box display="flex" alignItems="center" gap={1}>
        <Box sx={{ width: 16, height: 16, borderRadius: '50%', backgroundColor: '#FFB74D' }} />
        <Typography variant="body2">En Proceso</Typography>
      </Box>
      <Box display="flex" alignItems="center" gap={1}>
        <Box sx={{ width: 16, height: 16, borderRadius: '50%', backgroundColor: '#E0E0E0' }} />
        <Typography variant="body2">Pendiente</Typography>
      </Box>
    </Box>
  );
}