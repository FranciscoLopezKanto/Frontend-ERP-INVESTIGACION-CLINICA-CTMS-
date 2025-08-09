import {
  Box,
  Container,
  Paper,
  Typography,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Stack,
  Divider
} from "@mui/material";
import { useEffect, useState } from "react";
import { ActivitiesPagination, ActivityCard } from "./styles"; // estilos personalizados con tus colores
import colors from "../../../types/colores";
import fonts from "../../../types/fonts";
import { useNavigate } from "react-router-dom";
import { activitiesService } from "../../../api/activities";

interface Activity {
  id: number;
  user: string;
  action: string;
  timestamp: string; // formato ISO o fecha legible
}

export const ListActivities = () => {
  const [search, setSearch] = useState('');
  const [sortOrder, setSortOrder] = useState<'desc' | 'asc'>('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const navigate = useNavigate();
  const [activities, setActivities] = useState<Activity[]>([]);

  useEffect(() => {
  const fetchActivities = async () => {
    const data = await activitiesService.getActivities();

    // Mapea los datos para usar los campos correctos
    const parsed = data.map((a: any) => ({
      id: a._id,
      user: a.user?.name || 'Usuario desconocido', 
      action: a.action,
      timestamp: a.createdAt, // o a.updatedAt si prefieres
    }));

    setActivities(parsed);
  };

  fetchActivities();
}, []);

  const filtered = activities.filter((a) =>
    a.user.toLowerCase().includes(search.toLowerCase())
    || a.action.toLowerCase().includes(search.toLowerCase())
    
  );

  const sorted = filtered.sort((a, b) => {
    const t1 = new Date(a.timestamp).getTime();
    const t2 = new Date(b.timestamp).getTime();
    return sortOrder === 'desc' ? t2 - t1 : t1 - t2;
  });

  const totalPages = Math.ceil(sorted.length / itemsPerPage);
  const paginated = sorted.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  useEffect(() => {
    setCurrentPage(1); // reset al buscar
  }, [search, sortOrder]);

  return (
    <Container maxWidth="lg" sx={{ mt: 3, width: '110%' }}>
      <Paper elevation={0} sx={{ p: 3, borderRadius: 2 }}>
        <Typography variant="h5" fontWeight={'bold'} mb={1}>Ver actividad</Typography>
        <Typography variant="body2" color="textSecondary" mb={3}>
          Visualiza el estado general de todas las actividades y acciones realizadas en el sistema. Haz clic en una fila para ver el detalle completo.
        </Typography>

        <Stack direction="row" spacing={2} mb={3}>
          <TextField
            label="Buscar por colaborador..."
            variant="outlined"
            size="small"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <FormControl size="small" sx={{ minWidth: 200 }}>
            <InputLabel>Ordenar</InputLabel>
            <Select
              value={sortOrder}
              label="Ordenar"
              onChange={(e) => setSortOrder(e.target.value as 'desc' | 'asc')}
            >
              <MenuItem value="desc">Más reciente</MenuItem>
              <MenuItem value="asc">Más antiguo</MenuItem>
            </Select>
          </FormControl>
        </Stack>

        {paginated.map((activity) => (
          <ActivityCard key={activity.id} onClick={() => navigate(`/actividades/${activity.id}`)} >
            <Typography fontFamily={fonts.family.body} fontSize={fonts.size.base} fontWeight={fonts.weight.semiBold}>{activity.user}</Typography>
            <Typography fontFamily={fonts.family.body} fontSize={fonts.size.sm} variant="body2" sx={{ textAlign: 'justify', mx: 0.5 }}>{activity.action}</Typography>
            <Divider sx={{ my: 1 , borderColor: colors.standardBlue}} />
            <Typography variant="caption" color="text.secondary">
              {new Date(activity.timestamp).toLocaleString('es-CL')}
            </Typography>
          </ActivityCard>
        ))}

        <Box mt={3} display="flex" justifyContent="center">
          <ActivitiesPagination
            count={totalPages}
            page={currentPage}
            onChange={(_, val) => setCurrentPage(val)}
          />
        </Box>
      </Paper>
    </Container>
  );
};