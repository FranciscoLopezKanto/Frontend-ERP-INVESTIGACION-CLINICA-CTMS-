import { Paper, Typography, Divider, Grid, Container, Box } from '@mui/material';
import { useParams } from 'react-router-dom';
import { ActivityComments } from '../Comments';
import { useEffect, useState } from 'react';
import { activitiesService } from '../../../api/activities';
import { useLoading } from '../../../context/loading.context';
import { getRoleLabel } from '../../utils';
import fonts from '../../../types/fonts';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export const ActivityDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [activity, setActivity] = useState<any>(null);
  const { showLoading , hideLoading } = useLoading();
  const navigate = useNavigate();
  
  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;
      showLoading();
      try {
        const data = await activitiesService.getActivityDetails(id);
        setActivity(data);
      } catch (error) {
        console.error('Error al cargar detalles de la actividad:', error);
      } finally {
        hideLoading();
      }
    };
    fetchData();
  }, [id, showLoading, hideLoading]);

  if (!activity) return null;

  return (
    <Container maxWidth="lg" sx={{ mt: 3, width: '110%' }}>
      <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            cursor: 'pointer',
          }}
          onClick={() => navigate(-1)}
        >
          <ArrowBackIcon sx={{ mr: 1 }}/>
          <Typography variant="body1" fontWeight={fonts.weight.medium} >
            Volver
          </Typography>
        </Box>
      <Paper elevation= {0} sx={{ p: 4, maxWidth: 1000, width: '100%', position: 'relative' }}>
        <Typography
          variant="caption"
          sx={{ position: 'absolute', top: 16, right: 16, color: 'text.secondary' }}
        >
          {new Date(activity?.createdAt).toLocaleString('es-CL')}
        </Typography>

        {/* Título principal */}
        <Typography variant="h5" gutterBottom fontFamily={fonts.family.heading} mb={4}>
          Detalle de Actividad
        </Typography>

        {/* Nombre y acción */}
        <Typography variant="subtitle1" sx={{ mb: 2 }} fontFamily={fonts.family.body} fontWeight={fonts.weight.medium}>
          <strong>{activity.user?.name}</strong>, realizó un(a) <strong>{activity?.action} </strong>.
        </Typography> 

        {/* Área, cargo y rol alineados en fila */}
        <Grid container spacing={2} sx={{ mb: 2 }}>
          <Grid size={12}>
            <Typography variant="body1">
              Pertenece al área de <strong>{activity.user?.area}</strong> -
              Cargo de <strong>{activity.user?.position} </strong> -
              Rol de <strong>{getRoleLabel(activity.user?.role)}</strong> en el sistema.
            </Typography>
          </Grid>
        </Grid>

        <Divider sx={{ my: 3 }} />

        {/* Comentarios */}
        <ActivityComments activityId={activity._id} comments={activity.comments}/>
      </Paper>
    </Container>
  );
};
