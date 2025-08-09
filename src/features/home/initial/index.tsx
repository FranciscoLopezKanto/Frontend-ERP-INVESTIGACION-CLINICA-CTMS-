import { useEffect, useState } from 'react';
import { Container, Grid, Typography, Paper, CircularProgress } from '@mui/material';
import {
  Chart as ChartJS,
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip as ChartTooltip,
  Legend,
} from 'chart.js';
import { Pie, Bar } from 'react-chartjs-2';

ChartJS.register(ArcElement, BarElement, CategoryScale, LinearScale, ChartTooltip, Legend);

import {
  getAllEstudios,
  getAllPacientes,
  getAllVisitas,
  getAllFactibilidades,
} from '../services';
import { Estudio } from '../../estudios/types';
import { Paciente } from '../../pacientes/types';
import { Visita } from '../../visitas/types';
import { Factibilidad } from '../../factibilidades/services/FactibilidadesService/types';

export default function PantallaInicio() {
    
  const [loading, setLoading] = useState(true);
  const [estudios, setEstudios] = useState<Estudio[]>([]);
    const [pacientes, setPacientes] = useState<Paciente[]>([]);
    const [visitas, setVisitas] = useState<Visita[]>([]);
    const [factibilidades, setFactibilidades] = useState<Factibilidad[]>([]);

  useEffect(() => {
  const fetchData = async () => {
    try {
      const [e, p, v, f] = await Promise.all([
        getAllEstudios(),            // devuelve Estudio[]
        getAllPacientes(),           // AxiosResponse<Paciente[]>
        getAllVisitas(),             // { data: Visita[] }
        getAllFactibilidades(),      // AxiosResponse<Factibilidad[]>
      ]);

      setEstudios(e);               // ✅ Estudio[]
      setPacientes(p.data);         // ✅ Paciente[]
      setVisitas(v.data);           // ✅ Visita[]
      setFactibilidades(f.data);    // ✅ Factibilidad[]
    } catch (error) {
      console.error('Error cargando datos:', error);
    } finally {
      setLoading(false);
    }
  };

  fetchData();
}, []);

  if (loading) return <CircularProgress />;
  const estudiosPorEstado = estudios.reduce((acc: any, est: any) => {
  acc[est.estado] = (acc[est.estado] || 0) + 1;
  return acc;
}, {});

const factibilidadesPorSponsor = factibilidades.reduce((acc: any, f: any) => {
  acc[f.sponsorName] = (acc[f.sponsorName] || 0) + 1;
  return acc;
}, {});

const estudiosPorDoctor = estudios.reduce((acc: any, est: any) => {
  acc[est.investigadorPrincipal] = (acc[est.investigadorPrincipal] || 0) + 1;
  return acc;
}, {});

const estudiosPorArea = estudios.reduce((acc: any, est: any) => {
  acc[est.area] = (acc[est.area] || 0) + 1;
  return acc;
}, {});

const pacientesPorEstado = pacientes.reduce((acc: any, pac: any) => {
  acc[pac.estado] = (acc[pac.estado] || 0) + 1;
  return acc;
}, {});

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Dashboard Clínico
      </Typography>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 3 }}>

          <Paper sx={{ p: 3, textAlign: 'center' }}>
            <Typography variant="subtitle1">Estudios</Typography>
            <Typography variant="h5">{estudios.length}</Typography>
          </Paper>
        </Grid>
        <Grid size={{ xs: 12, md: 3 }}>
          <Paper sx={{ p: 3, textAlign: 'center' }}>
            <Typography variant="subtitle1">Pacientes</Typography>
            <Typography variant="h5">{pacientes.length}</Typography>
          </Paper>
        </Grid>
        <Grid size={{ xs: 12, md: 3 }}>
          <Paper sx={{ p: 3, textAlign: 'center' }}>
            <Typography variant="subtitle1">Visitas</Typography>
            <Typography variant="h5">{visitas.length}</Typography>
          </Paper>
        </Grid>
        <Grid size={{ xs: 12, md: 3 }}>
          <Paper sx={{ p: 3, textAlign: 'center' }}>
            <Typography variant="subtitle1">Factibilidades</Typography>
            <Typography variant="h5">{factibilidades.length}</Typography>
          </Paper>
        </Grid>

        {/* Gráfico: Estudios por Estado */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>Estudios por Estado</Typography>
            <Bar
              data={{
                labels: Object.keys(estudiosPorEstado),
                datasets: [
                  {
                    label: 'Cantidad',
                    data: Object.values(estudiosPorEstado),
                    backgroundColor: 'rgba(54, 162, 235, 0.6)',
                  },
                ],
              }}
              options={{ responsive: true, plugins: { legend: { display: false } } }}
            />
          </Paper>
        </Grid>

        {/* Gráfico: Pacientes por Estado */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>Pacientes por Estado</Typography>
            <Pie
              data={{
                labels: Object.keys(pacientesPorEstado),
                datasets: [
                  {
                    label: 'Pacientes',
                    data: Object.values(pacientesPorEstado),
                    backgroundColor: [
                      'rgba(255, 99, 132, 0.6)',
                      'rgba(54, 162, 235, 0.6)',
                      'rgba(255, 206, 86, 0.6)',
                      'rgba(75, 192, 192, 0.6)',
                      'rgba(153, 102, 255, 0.6)',
                      'rgba(255, 159, 64, 0.6)',
                    ],
                  },
                ],
              }}
              options={{ responsive: true }}
            />
          </Paper>
        </Grid>
        {/* Gráfico: Factibilidades por Sponsor */}
<Grid size={{ xs: 12, md: 6 }}>
  <Paper sx={{ p: 3 }}>
    <Typography variant="h6" gutterBottom>Factibilidades por Sponsor</Typography>
    <Bar
      data={{
        labels: Object.keys(factibilidadesPorSponsor),
        datasets: [{
          label: 'Factibilidades',
          data: Object.values(factibilidadesPorSponsor),
          backgroundColor: 'rgba(255, 159, 64, 0.6)',
        }]
      }}
      options={{ responsive: true }}
    />
  </Paper>
</Grid>

{/* Gráfico: Estudios por Doctor */}
<Grid size={{ xs: 12, md: 6 }}>
  <Paper sx={{ p: 3 }}>
    <Typography variant="h6" gutterBottom>Estudios por Investigador</Typography>
    <Bar
      data={{
        labels: Object.keys(estudiosPorDoctor),
        datasets: [{
          label: 'Estudios',
          data: Object.values(estudiosPorDoctor),
          backgroundColor: 'rgba(75, 192, 192, 0.6)',
        }]
      }}
      options={{ responsive: true }}
    />
  </Paper>
</Grid>

{/* Gráfico: Estudios por Área */}
<Grid size={{ xs: 12, md: 6 }}>
  <Paper sx={{ p: 3 }}>
    <Typography variant="h6" gutterBottom>Estudios por Área</Typography>
    <Pie
      data={{
        labels: Object.keys(estudiosPorArea),
        datasets: [{
          label: 'Estudios',
          data: Object.values(estudiosPorArea),
          backgroundColor: [
            'rgba(153, 102, 255, 0.6)',
            'rgba(255, 206, 86, 0.6)',
            'rgba(54, 162, 235, 0.6)',
            'rgba(255, 99, 132, 0.6)',
          ]
        }]
      }}
      options={{ responsive: true }}
    />
  </Paper>
</Grid>

      </Grid>
    </Container>
  );
}
