import { useEffect, useState } from 'react';
import {
  Box,
  CircularProgress,
  Container,
  Paper
} from '@mui/material';
import TableToolbar from '../components/TableToolbar';
import PropuestasTable from '../components/FactibilidadesTable';
import { factibilidadesService } from '../services/FactibilidadesService';
import { Factibilidad } from '../services/FactibilidadesService/types';

export default function FactibilidadesListPage() {
  const [factibilidades, setFactibilidades] = useState<Factibilidad[]>([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [filtro, setFiltro] = useState('Todos'); 

  const fetchFactibilidades = async () => {
    setLoading(true);
    try {
      const response = await factibilidadesService.getFactibilidades();
      setFactibilidades(response.data);
    } catch (error) {
      console.error('Error cargando datos reales:', error);
      setFactibilidades([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFactibilidades();
  }, []);

  return (
    <Container maxWidth="lg" sx={{ mt: 3, width: '110%' }}>
      <Paper sx={{ p: 3, borderRadius: 2 }}>
        <TableToolbar
          title="Propuestas"
          subtitle="Visualiza la información relevante de las propuestas. Haz clic sobre cualquier fila para acceder al detalle completo."
          search={search}
          onSearchChange={setSearch}
          filtro={filtro}
          onFiltroChange={setFiltro}
        />
        {loading ? (
          <Box display="flex" justifyContent="center" mt={4}>
            <CircularProgress />
          </Box>
        ) : (
          <PropuestasTable
            data={factibilidades}
            filtro={filtro}
            search={search}
          />
        )}
      </Paper>
    </Container>
  );
}
