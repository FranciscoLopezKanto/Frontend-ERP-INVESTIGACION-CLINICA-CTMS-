import {
  Box,
  Typography,
  TextField,
  Checkbox,
  FormControlLabel,
  Paper,
  Tooltip,
} from '@mui/material';
import { useState } from 'react';
import dayjs from 'dayjs';
import CustomButton from '../../../../components/Button';

interface Props {
  name: string;
  url?: string;
  createdAt?: string; 
  expirationDate?: string;
  notApplicable?: boolean;
  onSave: (data: {
    name: string;
    url?: string;
    expirationDate?: string;
    notApplicable?: boolean;
  }) => void;
}

const toDateInputFormat = (isoDate?: string) => {
  return isoDate ? isoDate.split('T')[0] : '';
};

const getExpirationInfo = (dateString?: string) => {
  if (!dateString) return { color: 'grey', message: 'No aplica' };

  const today = dayjs();
  const expiration = dayjs(dateString);
  const monthsDiff = expiration.diff(today, 'month', true);

  if (monthsDiff <= 2) {
    return {
      color: 'red',
      message: `Expira en ${monthsDiff.toFixed(1)} meses – Riesgo alto`,
    };
  }

  if (monthsDiff <= 5) {
    return {
      color: 'orange',
      message: `Expira en ${monthsDiff.toFixed(1)} meses – Riesgo medio`,
    };
  }

  return {
    color: 'green',
    message: `Expira en ${monthsDiff.toFixed(1)} meses – Al día`,
  };
};

export const DocumentEditableCard = ({
  name,
  url,
  createdAt,
  expirationDate,
  notApplicable,
  onSave,
}: Props) => {
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({
    url: url || '',
    createdAt: createdAt || '',
    expirationDate: expirationDate || '',
    notApplicable: notApplicable || false,
  });

  const handleSave = () => {
    const dataToSend = {
      name,
      url: form.url,
      notApplicable: form.notApplicable,
      createdAt: form.createdAt ? dayjs(form.createdAt).toISOString() : undefined,
      expirationDate: form.notApplicable ? undefined : form.expirationDate,
    };

    onSave(dataToSend);
    setEditMode(false);
  };

  const handleCancel = () => {
    setForm({
      url: url || '',
      createdAt: '',
      expirationDate: expirationDate || '',
      notApplicable: notApplicable || false,
    });
    setEditMode(false);
  };

  const handleNotApplicableChange = (checked: boolean) => {
    setForm((prev) => ({
      ...prev,
      notApplicable: checked,
      expirationDate: checked ? '' : prev.expirationDate,
    }));
  };

  const expirationInfo = getExpirationInfo(form.expirationDate);

  const cardContent = (
    <Paper
      sx={{
        p: 3,
        height: '100%',
        cursor: !editMode && form.url ? 'pointer' : 'default',
        transition: 'box-shadow 0.3s',
        '&:hover': {
          boxShadow: !editMode && form.url ? 6 : undefined,
        },
      }}
    >
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h6">{name}</Typography>
        {editMode ? (
          <Box display="flex" gap={2}>
            <CustomButton $variant="contained" onClick={handleSave}>
              Guardar
            </CustomButton>
            <CustomButton $variant="outlined" onClick={handleCancel}>
              Cancelar
            </CustomButton>
          </Box>
        ) : (
          <CustomButton
            $variant="contained"
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              setEditMode(true);
            }}
          >
            Editar
          </CustomButton>
        )}
      </Box>

      <Box display="flex" flexDirection="column" gap={2}>
        {editMode && (
          <TextField
            label="URL del documento"
            fullWidth
            value={form.url}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, url: e.target.value }))
            }
          />
        )}

        <TextField
          label="Fecha de emisión"
          type="date"
          fullWidth
          InputLabelProps={{ shrink: true }}
          disabled={!editMode}
          value={toDateInputFormat(form.createdAt)}
          onChange={(e) =>
            setForm((prev) => ({ ...prev, createdAt: e.target.value }))
          }
        />

        <Tooltip title={expirationInfo.message}>
          <TextField
            label="Fecha de vencimiento"
            type="date"
            fullWidth
            InputLabelProps={{ shrink: true }}
            disabled={!editMode || form.notApplicable}
            value={toDateInputFormat(form.expirationDate)}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, expirationDate: e.target.value }))
            }
            sx={{
              '& .MuiInputBase-input.Mui-disabled': {
                color: !editMode && !form.notApplicable ? expirationInfo.color : 'inherit',
              },
              '& .MuiInputLabel-root': {
                color: !editMode && !form.notApplicable ? expirationInfo.color : undefined,
              },
              '& .MuiOutlinedInput-root.Mui-disabled .MuiOutlinedInput-notchedOutline': {
                borderColor: !editMode && !form.notApplicable ? expirationInfo.color : undefined,
              },
            }}
          />
        </Tooltip>

        <FormControlLabel
          control={
            <Checkbox
              checked={form.notApplicable}
              disabled={!editMode}
              onChange={(e) =>
                handleNotApplicableChange(e.target.checked)
              }
            />
          }
          label="No aplica"
        />
      </Box>
    </Paper>
  );

  if (!editMode && form.url) {
    return (
      <a
        href={form.url}
        target="_blank"
        rel="noopener noreferrer"
        style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}
      >
        {cardContent}
      </a>
    );
  }

  return cardContent;
};
