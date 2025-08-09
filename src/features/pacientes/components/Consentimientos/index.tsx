import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Box,
  Chip,
  Link,
  Button,
  TextField,
  IconButton,
  Snackbar,
  Alert
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import { useState } from 'react';
import colors from '../../../../types/colores';

type Consentimiento = {
  version: string;
  fechaFirma?: string;
  fechaImplementacion?: string;
  url: string;
};

type Props = {
  consentimientos: Consentimiento[];
  subidoPor: string;
  onAgregar: (nuevo: Consentimiento) => void;
  onEditar: (version: string, updated: Consentimiento) => void;
  onEliminar: (version: string) => void;
};

export default function ConsentimientosPaciente({ consentimientos, onAgregar, onEditar, onEliminar }: Props) {
  const [editando, setEditando] = useState<string | null>(null);
  const [form, setForm] = useState<Partial<Consentimiento>>({});
  const [nuevo, setNuevo] = useState<Consentimiento | null>(null);
  const [alerta, setAlerta] = useState<{ open: boolean; message: string; severity: 'success' | 'error' }>({ open: false, message: '', severity: 'success' });

  const formatearFechaLarga = (fecha?: string) => {
    if (!fecha) return '';
    const opciones: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long', year: 'numeric' };
    return new Date(fecha).toLocaleDateString('es-CL', opciones);
  };

  const handleEditClick = (c: Consentimiento) => {
    setEditando(c.version);
    setForm({
      version: c.version,
      url: c.url,
      fechaFirma: c.fechaFirma ?? '',
      fechaImplementacion: c.fechaImplementacion ?? ''
    });
  };

  const handleSaveEdit = () => {
    if (form.version?.trim() === '' || !form.version)
      return setAlerta({ open: true, message: 'Debe completar los campos requeridos minimos (versión)', severity: 'error' });

    if (editando) {
      const payload: Consentimiento = {
        version: form.version?.trim() || '',
        url: form.url?.trim() || '',
        ...(form.fechaFirma ? { fechaFirma: form.fechaFirma } : {}),
        ...(form.fechaImplementacion ? { fechaImplementacion: form.fechaImplementacion } : {})
      };
      try {
        onEditar(editando, payload);
        setEditando(null);
        setAlerta({ open: true, message: 'Consentimiento editado exitosamente', severity: 'success' });
      } catch (error) {
        setAlerta({ open: true, message: 'Error al editar consentimiento', severity: 'error' });
      }
    }
  };

  const handleSaveNuevo = () => {
    if (!nuevo?.version || nuevo.version.trim() === '') {
      return setAlerta({
        open: true,
        message: 'Debe completar los campos requeridos mínimos (versión)',
        severity: 'error'
      });
    }

    const isValidDate = (fecha: string | undefined) => {
      const date = new Date(fecha ?? '');
      return !isNaN(date.getTime());
    };

    const payload: Consentimiento = {
      version: nuevo.version.trim(),
      url: nuevo.url?.trim() || '',
      ...(isValidDate(nuevo.fechaFirma) ? { fechaFirma: nuevo.fechaFirma } : {}),
      ...(isValidDate(nuevo.fechaImplementacion) ? { fechaImplementacion: nuevo.fechaImplementacion } : {})
    };

    try {
      onAgregar(payload);
      setNuevo(null);
      setAlerta({
        open: true,
        message: 'Consentimiento agregado exitosamente',
        severity: 'success'
      });
    } catch (error) {
      setAlerta({
        open: true,
        message: 'Error al agregar consentimiento',
        severity: 'error'
      });
    }
  };
  const estadoChip = () => {
    if (consentimientos.length === 0) {
      return <Chip label="Sin consentimientos" color="error" />;
    }
    const ultimo = consentimientos[consentimientos.length - 1];
    if (!ultimo.fechaFirma) {
      return <Chip label={`Pendiente firma: ${ultimo.version}`} color="warning" />;
    }
    return <Chip label={`Firmado: ${ultimo.version}`} color="success" />;
  };

  return (
    <>
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Box display="flex" alignItems="center" gap={2}>
            <Typography variant="subtitle1">Consentimientos informados</Typography>
            {estadoChip()}
          </Box>
        </AccordionSummary>
        <AccordionDetails>
          {!nuevo && (
            <Button
              variant="outlined"
              onClick={() =>
                setNuevo({
                  version: '',
                  fechaFirma: '',
                  fechaImplementacion: '',
                  url: ''
                })
              }
              sx={{ mb: 2 }}
            >
              + Nueva versión
            </Button>
          )}

          {nuevo && (
            <Box mb={2} p={2} border="2px dashed #ccc" borderRadius={2}>
              <TextField
                label="Versión"
                value={nuevo.version}
                onChange={(e) => setNuevo({ ...nuevo, version: e.target.value })}
                fullWidth
              />
              <TextField
                label="Fecha de firma"
                type="date"
                InputLabelProps={{ shrink: true }}
                value={nuevo.fechaFirma?.split('T')[0] || ''}
                onChange={(e) => setNuevo({ ...nuevo, fechaFirma: e.target.value })}
                fullWidth
                sx={{ mt: 1 }}
              />
              <TextField
                label="Fecha de implementación"
                type="date"
                InputLabelProps={{ shrink: true }}
                value={nuevo.fechaImplementacion?.split('T')[0] || ''}
                onChange={(e) => setNuevo({ ...nuevo, fechaImplementacion: e.target.value })}
                fullWidth
                sx={{ mt: 1 }}
              />
              <TextField
                label="URL del documento"
                value={nuevo.url}
                onChange={(e) => setNuevo({ ...nuevo, url: e.target.value })}
                fullWidth
                sx={{ mt: 1 }}
              />
              <Box mt={2} display="flex" gap={2}>
                <Button
                  variant="contained"
                  color="success"
                  onClick={handleSaveNuevo}
                  startIcon={<SaveIcon />}
                >
                  Guardar
                </Button>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => setNuevo(null)}
                  startIcon={<CancelIcon />}
                >
                  Cancelar
                </Button>
              </Box>
            </Box>
          )}

          {consentimientos.map(({ version, fechaFirma, fechaImplementacion, url }) => {
            const estaFirmado = !!fechaFirma;
            const backgroundColor = estaFirmado ? '#e8f5e9' : '#fff3e0';

            return (
              <Box
                key={version}
                mb={2}
                p={2}
                border="1px solid #ccc"
                borderRadius={2}
                bgcolor={backgroundColor}
              >
                {editando === version ? (
                  <Box display="flex" flexDirection="column" gap={1}>
                    <TextField label="Versión" value={form.version} onChange={(e) => setForm({ ...form, version: e.target.value })} />
                    <TextField label="Fecha de Firma" type="date" InputLabelProps={{ shrink: true }}
                      value={form.fechaFirma?.split('T')[0]} onChange={(e) => setForm({ ...form, fechaFirma: e.target.value })} />
                    <TextField label="Fecha de Implementación" type="date" InputLabelProps={{ shrink: true }}
                      value={form.fechaImplementacion?.split('T')[0]} onChange={(e) => setForm({ ...form, fechaImplementacion: e.target.value })} />
                    <TextField label="URL del Documento" value={form.url} onChange={(e) => setForm({ ...form, url: e.target.value })} />
                    <Box mt={1}>
                      <Button variant="contained" sx={{ background: colors.standardDarkBlue }} onClick={handleSaveEdit} startIcon={<SaveIcon />}>
                        Guardar
                      </Button>
                    </Box>
                  </Box>
                ) : (
                  <Box display="flex" justifyContent="space-between">
                    <Box>
                      <Typography><strong>Versión:</strong> {version}</Typography>
                      <Typography><strong>Fecha firma:</strong> {formatearFechaLarga(fechaFirma) || '❌ No firmada'}</Typography>
                      <Typography><strong>Fecha implementación:</strong> {formatearFechaLarga(fechaImplementacion) || '—'}</Typography>
                      <Typography>
                        <strong>Documento:</strong>{' '}
                        {url && url.trim() !== '' ? (
                          <Link href={url} target="_blank" rel="noopener noreferrer">Ver</Link>
                        ) : (
                          '❌ No subido'
                        )}
                      </Typography>
                    </Box>
                    <Box>
                      <IconButton sx={{ color: colors.standardDarkBlue }} onClick={() => handleEditClick({ version, fechaFirma, fechaImplementacion, url })}><EditIcon /></IconButton>
                      <IconButton onClick={() => onEliminar(version)}><DeleteIcon color="error" /></IconButton>
                    </Box>
                  </Box>
                )}
              </Box>
            );
          })}
        </AccordionDetails>
      </Accordion>

      <Snackbar
        open={alerta.open}
        autoHideDuration={4000}
        onClose={() => setAlerta({ ...alerta, open: false })}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert severity={alerta.severity} variant="filled" onClose={() => setAlerta({ ...alerta, open: false })}>
          {alerta.message}
        </Alert>
      </Snackbar>
    </>
  );
}