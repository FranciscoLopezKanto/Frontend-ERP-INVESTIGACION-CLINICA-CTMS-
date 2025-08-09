import {
  Typography,
  Stack,
  TextField,
  IconButton,
  Box,
  Menu,
  MenuItem
} from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import { useNavigate } from 'react-router-dom';
import CustomButton from '../../../../components/Button';
import { useState } from 'react';
import colors from '../../../../types/colores';

interface Props {
  title: string;
  subtitle?: string;
  search: string;
  onSearchChange: (value: string) => void;
  orden: string;
  onOrdenChange: (value: string) => void;
}

export default function TableToolbar({
  title,
  subtitle,
  search,
  onSearchChange,
  orden,
  onOrdenChange
}: Props) {
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleOrden = (value: string) => {
    onOrdenChange(value);
    handleClose();
  };

  return (
    <>
      <Typography variant="h5" fontWeight={'bold'} mb={1}>{title}</Typography>
      {subtitle && (
        <Typography variant="body2" color="textSecondary" mb={3}>{subtitle}</Typography>
      )}

      <Stack direction="row" spacing={2} alignItems="center" mb={2} justifyContent="space-between" flexWrap="wrap">
        <Stack direction="row" spacing={2} alignItems="center" flexWrap="wrap">
          <TextField
            label="Buscar por nombre o correo..."
            size="small"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
          />

          <Box>
            <IconButton onClick={handleClick} sx = {{ color: colors.standardDarkBlue}}>
              <FilterListIcon />
            </IconButton>
            <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
              <MenuItem onClick={() => handleOrden('az')}>Ordenar nombre A-Z</MenuItem>
              <MenuItem onClick={() => handleOrden('za')}>Ordenar nombre Z-A</MenuItem>
            </Menu>
          </Box>

          <Typography variant="body2">Orden actual: {orden === 'az' ? 'A-Z' : orden === 'za' ? 'Z-A' : 'Sin orden'}</Typography>
        </Stack>

        <Box paddingRight={10}>
          <CustomButton
            onClick={() => navigate('/colaboradores/register')}
            $variant="contained"
            size='large'
            color="primary"
          >
            Crear cuenta 
          </CustomButton>
        </Box>
      </Stack>
    </>
  );
}
