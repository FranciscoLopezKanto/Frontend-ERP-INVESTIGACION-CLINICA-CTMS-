import { useEffect, useState } from 'react';
import {
  Box,
  CircularProgress,
  Container,
  Typography,
  TextField,
  MenuItem,
  Paper,
  Tooltip,
} from '@mui/material';
import PacientesTable from '../components/PacientesTable';
import { pacientesService } from '../services';
import { Paciente } from '../types';
import { useNavigate } from 'react-router-dom';
import CustomButton from '../../../components/Button';
import { EstadoPaciente } from '../components/PacienteForm/enum';


export default function PacientesListPage() {
  const [pacientes, setPacientes] = useState<Paciente[]>([]);
  const [search, setSearch] = useState('');
  const [filtroEstado, setFiltroEstado] = useState('Todos');
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    pacientesService.getAll().then((res) => {
      setPacientes(res.data);
      setLoading(false);
    });
  }, []);

  const pacientesFiltrados = pacientes.filter((p) => {
  const coincideBusqueda =
    p.nombre?.toLowerCase().includes(search.toLowerCase()) ||
    p.codigo?.toLowerCase().includes(search.toLowerCase()) ||
    p.codigoRandomizado?.toLowerCase().includes(search.toLowerCase()) ||
    p.estudioId?.toLowerCase().includes(search.toLowerCase());

  const coincideEstado =
    filtroEstado === 'Todos' || // Aquí usas '' para "Todos"
    p.estado.trim().toLowerCase() === filtroEstado.trim().toLowerCase();

  return coincideBusqueda && coincideEstado;
});


  return (
    <Container maxWidth="lg" sx={{ mt: 3, width: '110%' }}>
      <Paper sx={{ p: 3, borderRadius: 2 }}>
          <Typography variant="h5" fontWeight={'bold'} gutterBottom>
            Pacientes
          </Typography>
          <Typography variant="body2" color="text.secondary" mb={2}>
            Visualiza el estado general de todos los pacientes. Haz clic sobre cualquier fila para acceder al detalle completo.
          </Typography>

          <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
            <Box display="flex" gap={2}>
              <Tooltip title="Puedes buscar por nombre,código estudio, código screaning o código randomizado del paciente.">
                <TextField
                  label="Buscar por código o nombre..."
                  variant="outlined"
                  sx={{ maxWidth: 300 }}
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </Tooltip>
                <TextField
                  label="Filtro"
                  select
                  value={filtroEstado}
                  onChange={(e) => setFiltroEstado(e.target.value)}
                  sx={{ width: 200 }}
                >
                  <MenuItem value="Todos">Todos</MenuItem>
                  {Object.values(EstadoPaciente).map((estado) => (
                    <MenuItem key={estado} value={estado}>
                      {estado}
                    </MenuItem>
                  ))}
                </TextField>
            </Box>

            <CustomButton
              $variant="contained"
              onClick={() => navigate('/pacientes/crear')}
            >
              Ingresar
            </CustomButton>
          </Box>


          {loading ? (
            <CircularProgress />
          ) : (
            <PacientesTable data={pacientesFiltrados} search={''} />
          )}
      </Paper>
    </Container>
  );
}
