import { Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { pacientesService } from '../services';
import FormularioPaciente from '../components/PacienteForm';
import { Paciente } from '../types';
import AlertaSnackbar from '../../../components/AlertaSnackbar';

export default function CrearPacientePage() {
  const navigate = useNavigate();
  const [mensaje, setMensaje] = useState('');
  const [open, setOpen] = useState(false);

  const handleCrear = async (data: Partial<Paciente>) => {
    try {
      await pacientesService.create(data);
      setMensaje('✅ Paciente creado correctamente');
      setOpen(true);
      setTimeout(() => navigate('/pacientes'), 2000);
    } catch (error) {
      console.error('Error al crear paciente:', error);
      setMensaje('❌ Error al crear paciente');
      setOpen(true);
    }
  };

  return (
    <Box p={4}>
      <FormularioPaciente onSubmit={handleCrear} />
      <AlertaSnackbar message={mensaje} open={open} onClose={() => setOpen(false)} />
    </Box>
  );
}
