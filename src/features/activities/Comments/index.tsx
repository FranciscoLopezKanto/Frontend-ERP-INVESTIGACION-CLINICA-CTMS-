import { Box, Typography, TextField, Stack, IconButton, Paper } from '@mui/material';
import { useEffect, useState } from 'react';
import fonts from '../../../types/fonts';
import SendIcon from '@mui/icons-material/Send';
import colors from '../../../types/colores';
import { commentsService } from '../../../api/comments';
import { useAuth } from '../../../context/auth.context';
import { transparentize } from 'polished';

interface Props {
  activityId: number;
  comments?: any[];
}

export const ActivityComments = ({ activityId, comments }: Props) => {
  const [comentario, setComentario] = useState('');
  const [comentarios, setComentarios] = useState<any[]>([]);
  const {user} = useAuth();
  const userId = user?.userId || '';

  const fetchComments = async () => {
    try {
      const response = await commentsService.getCommentsByActivity(activityId.toString());
      setComentarios(response);
    } catch (error) {
      console.error('Error al obtener comentarios:', error);
    }
  }

  useEffect(() => {
    setComentarios(comments || []);
  }, [comments]);

  const handleAgregar = async () => {
    if (!comentario.trim()) return;

    try {
      const newComment = await commentsService.createComment({
        activity: activityId.toString(),
        user: userId, 
        content: comentario,
      });

      setComentarios((prev) => [newComment, ...prev]);
      setComentario('');
      await fetchComments(); 
    } catch (error) {
      console.error('Error al agregar comentario:', error);
    }
  };

  return (
    <Box>
      <Typography variant='h6' fontFamily={fonts.family.heading} gutterBottom>Comentarios</Typography>

      <Paper 
        sx={{ 
          p: 2, 
          mb: 2, 
          bgcolor: transparentize(0.9, colors.greenBlueStandard), 
          borderRadius: 2,
          maxHeight: '540px',
          display: 'flex',
          flexDirection: 'column',
        }}>
        <Box
          sx={{
            flexGrow: 1,
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column-reverse',
            pr: 1,
          }}
        >
          {comentarios.map((c, idx) => (
            <Box 
              key={idx} 
              sx={{ 
                bgcolor: transparentize(0.8, colors.deepBlue), 
                p: 2, 
                m: 1, 
                borderRadius: 2, 
                display: 'flex',
                flexDirection: 'column', 
              }}>
              <Typography fontSize={fonts.size.sm} fontWeight={fonts.weight.semiBold}>
                {c.user?.name || user?.name || 'Tú'}
              </Typography>
              <Typography variant="body2" fontSize={fonts.size.xs} sx={{ textAlign: 'justify', mx: 0.5 }}>{c.content || c}</Typography>
              <Typography
                fontSize={fonts.size.xs}
                sx= { { display: 'flex', justifyContent: 'flex-end', color: 'text.secondary' } }
              >
                {new Date(c.createdAt).toLocaleString('es-CL')}
              </Typography>
            </Box>
          ))}
        </Box>

        <Stack direction="row" spacing={2} mt={2} mb={2} p={2}>
          <TextField
            fullWidth
            label="Agregar comentario"
            value={comentario}
            onChange={(e) => setComentario(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleAgregar();
            }}
            sx= {{
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
                backgroundColor: transparentize(0.9, colors.greenBlueStandard),
                '& fieldset': {
                  borderColor: colors.deepBlue,   
                  borderWidth: '2px',                 
                },
                '&:hover fieldset': {
                  borderColor: colors.deepBlue,
                },
                '&.Mui-focused fieldset': {
                  borderColor: colors.deepBlueV2,  // ✅ Al enfocar el input
                  borderWidth: '2px',
                },
              },
            }}
          />
          <IconButton 
            onClick={handleAgregar}
            sx={{ color: colors.standardBlue }}
            >
            <SendIcon />
          </IconButton>
        </Stack>
      </Paper>
    </Box>
  );
};