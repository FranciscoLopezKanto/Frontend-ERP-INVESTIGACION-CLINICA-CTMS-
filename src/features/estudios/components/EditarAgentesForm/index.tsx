import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  TextField,
  Grid,
} from '@mui/material';
import { Delete } from '@mui/icons-material';
import { useForm, useFieldArray, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { estudiosService } from '../../services';
import CustomButton from '../../../../components/Button';
import AddIcon from '@mui/icons-material/Add';

interface Agente {
  name: string;
  email: string;
  phone_number?: string | null;
}

interface Props {
  open: boolean;
  onClose: () => void;
  estudioId: string;
  agentesIniciales: Agente[];
  onAgentesActualizados?: () => void;
}

const schema = yup.object({
  agents: yup
    .array()
    .of(
      yup.object({
        name: yup.string().required('Nombre requerido'),
        email: yup.string().email('Email inválido').required('Email requerido'),
        phone_number: yup
          .string()
          .notRequired()
          .nullable()
          .test(
            'is-valid-phone',
            'Debe tener formato +569XXXXXXXX',
            (value) => {
              if (!value || value.trim() === '') return true;
              return /^\+569\d{8}$/.test(value);
            }
          ),
      })
    )
    .min(1, 'Debe haber al menos un monitor')
    .required(),
});

export default function ModalEditarAgentes({
  open,
  onClose,
  estudioId,
  agentesIniciales,
  onAgentesActualizados,
}: Props) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<{ agents: Agente[] }>({
    defaultValues: { agents: agentesIniciales },
    resolver: yupResolver(schema),
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'agents',
  });

  const onSubmit = async (data: { agents: Agente[] }) => {
    try {
      const agentesFiltrados = data.agents.map(({ name, email, phone_number }) => ({
        name,
        email,
        phone_number:
          phone_number && phone_number.trim() !== '' && /^\+569\d{8}$/.test(phone_number)
            ? phone_number
            : 'No definido',
      }));

      await estudiosService.updateAgentes(estudioId, agentesFiltrados);
      onAgentesActualizados?.();
      onClose();
    } catch (err) {
      console.error('Error al guardar agentes', err);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Editar Monitores del Estudio</DialogTitle>
      <DialogContent dividers>
        {fields.map((field, i) => (
          <Grid container spacing={2} alignItems="center" key={field.id} mb={1}>
            <Grid size={{ xs: 12, sm: 4 }}>
              <Controller
                name={`agents.${i}.name`}
                control={control}
                render={({ field }) => (
                  <TextField
                    label="Nombre"
                    fullWidth
                    {...field}
                    error={!!errors?.agents?.[i]?.name}
                    helperText={errors?.agents?.[i]?.name?.message}
                  />
                )}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 4 }}>
              <Controller
                name={`agents.${i}.email`}
                control={control}
                render={({ field }) => (
                  <TextField
                    label="Email"
                    fullWidth
                    {...field}
                    error={!!errors?.agents?.[i]?.email}
                    helperText={errors?.agents?.[i]?.email?.message}
                  />
                )}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 3 }}>
              <Controller
                name={`agents.${i}.phone_number`}
                control={control}
                render={({ field }) => (
                  <TextField
                    label="Teléfono"
                    fullWidth
                    {...field}
                    error={!!errors?.agents?.[i]?.phone_number}
                    helperText={errors?.agents?.[i]?.phone_number?.message || 'Ej:+56912345678 o en blanco'}
                  />
                )}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 1 }}>
              <IconButton color="error" onClick={() => remove(i)}>
                <Delete />
              </IconButton>
            </Grid>
          </Grid>
        ))}

        <CustomButton
          $variant="text"
          onClick={() => append({ name: '', email: '', phone_number: '+569' })}
          startIcon={<AddIcon />}
        >
          Agregar Monitor
        </CustomButton>
      </DialogContent>
      <DialogActions>
        <CustomButton $variant="outlined" onClick={onClose}>
          Cancelar
        </CustomButton>
        <CustomButton $variant="contained" onClick={handleSubmit(onSubmit)}>
          Guardar cambios
        </CustomButton>
      </DialogActions>
    </Dialog>
  );
}
