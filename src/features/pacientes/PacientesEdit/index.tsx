import { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { pacientesService } from '../services';
import { Paciente } from '../types';
import FormularioPaciente from '../components/PacienteForm';
import AlertaSnackbar from '../../../components/AlertaSnackbar';

export default function PacientesEditPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [paciente, setPaciente] = useState<Paciente | null>(null);
  const [mensaje, setMensaje] = useState('');
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (id) {
      pacientesService.getById(id)
        .then((res) => setPaciente(res.data))
        .catch((error) => {
          console.error('Error al cargar paciente:', error);
          setMensaje('❌ Error al cargar datos del paciente');
          setOpen(true);
        });
    }
  }, [id]);

 const handleEditar = async (data: Partial<Paciente>) => {
  try {
    if (!id) return;

    // 🔧 Limpiar propiedades que no deben enviarse
    const { _id, createdAt, updatedAt, __v, ...rest } = data;

    const payload: Partial<Paciente> = {
      ...rest,
      contacto: (data.contacto || []).map(({ nombre, telefono, parentesco }) => ({
        nombre,
        telefono,
        parentesco,
      })),
      consentimientos: (data.consentimientos || []).map(({ version, fechaFirma, url, subidoPor }) => ({
        version,
        fechaFirma,
        url,
        subidoPor,
      }))
    };
    
    await pacientesService.update(id, payload);
    setMensaje('✅ Paciente actualizado correctamente');
    setOpen(true);
    setTimeout(() => navigate(-1), 2000);
  } catch (error) {
    console.error('Error al actualizar paciente:', error);
    setMensaje('❌ Error al actualizar paciente');
    setOpen(true);
  }
};


  if (!paciente) return null;

  return (
    <Box p={4}>
      <FormularioPaciente initialData={paciente} onSubmit={handleEditar} />
      <AlertaSnackbar message={mensaje} open={open} onClose={() => setOpen(false)} />
    </Box>
  );
}
