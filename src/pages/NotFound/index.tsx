import { Box, Typography } from '@mui/material';

export default function NotFound() {
  return (
    <Box sx={{ textAlign: 'center', mt: 10 }}>
      <Typography variant="h3" color="info">404</Typography>
      <Typography variant="h5">Página no encontrada</Typography>
      <Typography variant="body1">La URL ingresada no existe o fue removida.</Typography>
    </Box>
  );
}
