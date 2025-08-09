import { useEffect, useState } from 'react';
import {
  Box,
  CircularProgress,
  Container,
  Paper,
  Typography,
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Tooltip,
  IconButton,
  Checkbox,
  ListItemText
} from '@mui/material';
import VisitasCalendar from '../components/VisitasCalendar';
import AgendaSemanal from '../components/AgendaSemanal';
import FilterListIcon from '@mui/icons-material/FilterList';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import TableChartIcon from '@mui/icons-material/TableChart';
import RefreshIcon from '@mui/icons-material/Refresh';
import VisitasTable from '../components/VisitasTable';
import { visitasService } from '../services/backend';
import { Visita } from '../types';
import { useNavigate } from 'react-router-dom';
import CustomButton from '../../../components/Button';
import colors from '../../../types/colores';
import { EstadoVisita } from '../types/enums';

export default function VisitasListPage() {
  const [visitas, setVisitas] = useState<Visita[]>([]);
  const [vista, setVista] = useState<'tabla' | 'calendario' | 'agenda'>('tabla');
  const [ordenAscendente, setOrdenAscendente] = useState(false);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [filtroEstado, setFiltroEstado] = useState<string[]>(Object.values(EstadoVisita));
  const [filtroTipo, setFiltroTipo] = useState('Todos');

  const navigate = useNavigate();

  const ordenarPorFecha = (arr: Visita[], asc: boolean) => {
    return [...arr].sort((a, b) =>
      asc
        ? a.fechaProgramada.localeCompare(b.fechaProgramada)
        : b.fechaProgramada.localeCompare(a.fechaProgramada)
    );
  };

  const fetchVisitas = async () => {
    setLoading(true);
    try {
      const response = await visitasService.getVisitas();
      const sorted = ordenarPorFecha(response.data, false);
      setVisitas(sorted);
    } catch (error) {
      console.error('Error cargando visitas:', error);
      setVisitas([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVisitas();
  }, []);

  const toggleVista = () => {
    setVista((prev) =>
      prev === 'tabla' ? 'calendario' : prev === 'calendario' ? 'agenda' : 'tabla'
    );
  };

  const iconoVista =
    vista === 'tabla'
      ? <CalendarMonthIcon />
      : vista === 'calendario'
      ? <FilterListIcon />
      : <TableChartIcon />;

  // ✅ Filtro aplicado a todas las vistas:
  const visitasFiltradas = visitas.filter((v) => {
    const coincideBusqueda =
      v.entidad?.representante?.toLowerCase().includes(search.toLowerCase()) ||
      v.entidad?.nombre?.toLowerCase().includes(search.toLowerCase()) ||
      v.entidad?.tipo?.toLowerCase().includes(search.toLowerCase()) ||
      v.entidad?.codigoPaciente?.toLowerCase().includes(search.toLowerCase()) ||
      v.estado?.toLowerCase().includes(search.toLowerCase()) ||
      v.detalle?.toLowerCase().includes(search.toLowerCase()) ||
      v.motivo?.toLowerCase().includes(search.toLowerCase()) ||
      v.entidad?.codigoRandomizado?.toLowerCase().includes(search.toLowerCase()) ||
      v.descripcion?.toLowerCase().includes(search.toLowerCase()) ||
      v.entidad?.codigoEstudio?.toLowerCase().includes(search.toLowerCase()) ||
      v.tipo?.toLowerCase().includes(search.toLowerCase());

    const coincideEstado = filtroEstado.includes(v.estado);
    const coincideTipo = filtroTipo === 'Todos' || v.tipo === filtroTipo;

    return coincideBusqueda && coincideEstado && coincideTipo;
  });

  return (
    <Container maxWidth="lg" sx={{ mt: 3, width: '110%' }}>
      <Paper sx={{ p: 3, borderRadius: 2 }}>
        <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={2}>
          <Box>
            <Typography variant="h5" fontWeight={'bold'}>Visitas</Typography>
            <Typography variant="body2" color="text.secondary">
              Visualiza todas las visitas próximas y pasadas, tanto de pacientes como patrocinadores y entes regulatorios.
            </Typography>
          </Box>
        </Box>

        <Box display="flex" flexDirection="row" gap="10px" mb={3} flexWrap="wrap">
          <TextField
            sx={{ minWidth: 300 }}
            label="Buscar por paciente, estudio , motivo, estado o detalle..."
            variant="outlined"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <FormControl sx={{ minWidth: 224 }} >
            <InputLabel>Estado</InputLabel>
            <Select
              label="Estado"
              multiple
              value={filtroEstado}
              onChange={(e) => {
                const value = e.target.value as string[];
                if (value.includes('Todos')) {
                  if (filtroEstado.length === Object.values(EstadoVisita).length) {
                    setFiltroEstado([]);
                  } else {
                    setFiltroEstado(Object.values(EstadoVisita));
                  }
                } else {
                  setFiltroEstado(value);
                }
              }}
              renderValue={(selected) =>
                selected.length === 0
                  ? 'Todos'
                  : selected.length === Object.values(EstadoVisita).length
                  ? 'Todos'
                  : `${selected.length} seleccionados`
              }
              MenuProps={{
                PaperProps: {
                  style: {
                    maxHeight: 220,
                  },
                },
              }}
            >
              <MenuItem value="Todos" dense>
                <Checkbox
                  checked={filtroEstado.length === Object.values(EstadoVisita).length}
                  indeterminate={
                    filtroEstado.length > 0 &&
                    filtroEstado.length < Object.values(EstadoVisita).length
                  }
                />
                <ListItemText primary="Todos" />
              </MenuItem>
              {Object.values(EstadoVisita).map((estado) => (
                <MenuItem key={estado} value={estado} dense>
                  <Checkbox checked={filtroEstado.includes(estado)} />
                  <ListItemText primary={estado} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl sx={{ minWidth: 224 }}>
            <InputLabel>Tipo de visita</InputLabel>
            <Select
              label="Tipo de visita"
              value={filtroTipo}
              onChange={(e) => setFiltroTipo(e.target.value)}
            >
              <MenuItem value="Todos">Todos</MenuItem>
              <MenuItem value="paciente">Visita de paciente</MenuItem>
              <MenuItem value="regulador">Visita regulatoria</MenuItem>
              <MenuItem value="sponsor">Visita de patrocinador</MenuItem>
            </Select>
          </FormControl>

          <Tooltip title={ordenAscendente ? 'Orden ascendente' : 'Orden descendente'}>
            <IconButton
              onClick={() => {
                const nuevoOrden = !ordenAscendente;
                setOrdenAscendente(nuevoOrden);
                setVisitas((prev) => ordenarPorFecha(prev, nuevoOrden));
              }}
              sx={{ color: colors.standardDarkBlue }}
            >
              <FilterListIcon />
            </IconButton>
          </Tooltip>

          <Box display="flex" alignItems="center" gap={1}>
            <Tooltip title="Actualizar visitas">
              <IconButton 
                onClick={fetchVisitas}
                sx={{ color: colors.standardDarkBlue }}  
              >
                <RefreshIcon />
              </IconButton>
            </Tooltip>
            <CustomButton $variant="contained" size='large' onClick={() => navigate('/visitas/crear')}>
              Ingresar
            </CustomButton>
            <Tooltip title={
              vista === 'tabla' ? 'Ver calendario' :
              vista === 'calendario' ? 'Ver agenda semanal' :
              'Ver tabla'
            }>
              <IconButton onClick={toggleVista} sx={{ color: colors.standardDarkBlue }}>
                {iconoVista}
              </IconButton>
            </Tooltip>
          </Box>
        </Box>

        {loading ? (
          <Box display="flex" justifyContent="center" mt={4}>
            <CircularProgress />
          </Box>
        ) : vista === 'calendario' ? (
          <VisitasCalendar visitas={visitasFiltradas} />
        ) : vista === 'agenda' ? (
          <AgendaSemanal visitas={visitasFiltradas} />
        ) : (
          <VisitasTable
            data={visitasFiltradas}
            filtro={filtroEstado}
            filtroTipo={filtroTipo}
            search={search}
          />
        )}
      </Paper>
    </Container>
  );
}
