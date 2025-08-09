import { useEffect, useState } from 'react';
import {
  Box,
  CircularProgress,
  Container,
  Typography,
  TextField,
  MenuItem,
  Paper,
} from '@mui/material';
import EstudiosTable from '../components/EstudiosTable';
import { estudiosService } from '../services/';
import { Estudio } from '../types';
import { useNavigate, useLocation } from 'react-router-dom';
import CustomButton from '../../../components/Button';
import { EstadoEstudio } from '../enums';

const ESTADOS = ['Todos', ...Object.values(EstadoEstudio)];

export default function EstudiosListPage() {
  const [estudios, setEstudios] = useState<Estudio[]>([]);
  const [filtroEstado, setFiltroEstado] = useState('Todos');
  const [loading, setLoading] = useState(true);

  const location = useLocation();
  const busquedaInicial = location.state?.busquedaInicial ?? '';
  const [search, setSearch] = useState(busquedaInicial);

  const navigate = useNavigate();

  useEffect(() => {
    estudiosService.getAll().then((res) => {
      setEstudios(res);
      setLoading(false);
    });
  }, []);

  const estudiosFiltrados = estudios.filter((e) => {
    const texto = search.toLowerCase();
    const coincideBusqueda =
      e.protocolo?.toLowerCase().includes(texto) ||
      e.patologia?.toLowerCase().includes(texto) ||
      e.investigadorPrincipal?.toLowerCase().includes(texto);

    const coincideEstado =
      filtroEstado === 'Todos' ||
      e.estado?.toLowerCase() === filtroEstado.toLowerCase();

    return coincideBusqueda && coincideEstado;
  });

  return (
    <Container maxWidth="lg" sx={{ mt: 3, width: '110%' }}>
      <Paper sx={{ p: 3, borderRadius: 2 }}>
        <Typography variant="h5" fontWeight={600} gutterBottom>
          Investigaciones Clínicas
        </Typography>
        <Typography variant="body2" color="text.secondary" mb={2}>
          Visualiza el estado general de todos los estudios clínicos. Haz clic sobre cualquier fila para acceder al detalle completo.
        </Typography>

        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3} flexWrap="wrap" gap={2}>
          <Box display="flex" gap={2} flexWrap="wrap">
            <TextField
              label="Buscar por código, patología o investigador"
              variant="outlined"
              sx={{ width: 500 }}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <TextField
              label="Filtro"
              select
              value={filtroEstado}
              onChange={(e) => setFiltroEstado(e.target.value)}
              sx={{ width: 200 }}
            >
              {ESTADOS.map((estado) => (
                <MenuItem key={estado} value={estado}>
                  {estado}
                </MenuItem>
              ))}
            </TextField>
          </Box>

          <CustomButton
            $variant="contained"
            size="large"
            onClick={() => navigate('/investigaciones/crear')}
          >
            Ingresar
          </CustomButton>
        </Box>

        {loading ? (
          <CircularProgress />
        ) : (
          <EstudiosTable estudios={estudiosFiltrados} />
        )}
      </Paper>
    </Container>
  );
}
