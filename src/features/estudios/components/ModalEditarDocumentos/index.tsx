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

interface Documento {
  nombre: string;
  version?: string | null;
  fecha?: string | null;
  url?: string | null;
}

interface Props {
  open: boolean;
  onClose: () => void;
  estudioId: string;
  documentosIniciales: Documento[];
  onDocumentosActualizados?: () => void;
}

// ✅ Validación con Yup
const schema = yup.object({
  documentos: yup
    .array()
    .of(
      yup.object({
        nombre: yup.string().required('Nombre requerido'),
        version: yup
          .string()
          .nullable()
          .transform((value) => (value === '' ? undefined : value)),
        fecha: yup
          .string()
          .nullable()
          .transform((value) => (value === '' ? undefined : value)),
        url: yup
          .string()
          .nullable()
          .transform((value) => (value === '' ? undefined : value))
          .notRequired()
          .test(
            'is-valid-url',
            'Debe ser una URL válida (https://...)',
            (value) => {
              if (!value || value.trim() === '') return true;
              try {
                new URL(value);
                return true;
              } catch {
                return false;
              }
            }
          ),
      })
    )
    .min(1, 'Debe haber al menos un documento')
    .required(),
});


export default function ModalEditarDocumentos({
  open,
  onClose,
  estudioId,
  documentosIniciales,
  onDocumentosActualizados,
}: Props) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<{ documentos: Documento[] }>({
     defaultValues: {
      documentos: documentosIniciales.map((doc) => ({
        nombre: doc.nombre || '',
        version: doc.version || '',
        fecha: doc.fecha || '',
        url: doc.url || '',
      })),
    },
    resolver: yupResolver(schema),
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'documentos',
  });

  const onSubmit = async (data: { documentos: Documento[] }) => {
    try {
      const documentosLimpios = data.documentos.map(
        ({ nombre, version, fecha, url }) => ({
          nombre,
          version: version?.trim() || undefined,
          fecha: fecha?.trim() || undefined,
          url: url?.trim() || undefined,
        })
      );


      await estudiosService.updateDocumentos(estudioId, {
        documentos: documentosLimpios,
      });

      onDocumentosActualizados?.();
      onClose();
    } catch (err) {
      console.error('❌ Error al guardar documentos', err);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Editar Documentos del Estudio</DialogTitle>
      <DialogContent dividers>
        {fields.map((field, i) => (
          <Grid container spacing={2} alignItems="center" key={field.id} mb={1}>
            <Grid size={{ xs: 12, sm: 3 }}>
              <Controller
                name={`documentos.${i}.nombre`}
                control={control}
                render={({ field }) => (
                  <TextField
                    label="Nombre"
                    fullWidth
                    {...field}
                    error={!!errors?.documentos?.[i]?.nombre}
                    helperText={errors?.documentos?.[i]?.nombre?.message}
                  />
                )}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 2 }}>
              <Controller
                name={`documentos.${i}.version`}
                control={control}
                render={({ field }) => (
                  <TextField label="Versión" fullWidth {...field} />
                )}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 3 }}>
              <Controller
                name={`documentos.${i}.fecha`}
                control={control}
                render={({ field }) => (
                  <TextField
                    label="Fecha"
                    type="date"
                    InputLabelProps={{ shrink: true }}
                    fullWidth
                    {...field}
                  />
                )}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 3 }}>
              <Controller
                name={`documentos.${i}.url`}
                control={control}
                render={({ field }) => (
                  <TextField
                    label="URL (opcional)"
                    fullWidth
                    {...field}
                    error={!!errors?.documentos?.[i]?.url}
                    helperText={
                      errors?.documentos?.[i]?.url?.message || 'Ej: https://ejemplo.com'
                    }
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
          onClick={() =>
            append({ nombre: '', version: '', fecha: '', url: '' })
          }
          startIcon={<AddIcon />}
        >
          Agregar Documento
        </CustomButton>
      </DialogContent>
      <DialogActions>
        <CustomButton $variant="outlined" onClick={onClose}>
          Cancelar
        </CustomButton>
       <CustomButton
          $variant="contained"
          onClick={handleSubmit(onSubmit, (errors) => {
            console.warn('❌ Errores del formulario:', errors);
          })}
        >
          Guardar cambios
        </CustomButton>
      </DialogActions>
    </Dialog>
  );
}
