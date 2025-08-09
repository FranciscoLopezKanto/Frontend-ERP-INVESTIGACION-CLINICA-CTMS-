import {
    Typography,
    Stack,
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    IconButton,
    Box,
  } from '@mui/material';
  import FilterListIcon from '@mui/icons-material/FilterList';
import { useNavigate } from 'react-router-dom';
import CustomButton from '../../../../components/Button';
import colors from '../../../../types/colores';
import { EstadoFactibilidad } from '../../enum';
  
  interface Props {
    title: string;
    subtitle?: string;
    search: string;
    onSearchChange: (value: string) => void;
    filtro: string;
    onFiltroChange: (value: string) => void;
  }
  
  export default function TableToolbar({
    title,
    subtitle,
    search,
    onSearchChange,
    filtro,
    onFiltroChange
  }: Props) {
    const navigate = useNavigate();

    return (
      <>
        <Typography variant="h5" fontWeight={'bold'} mb={1}>
          {title}
        </Typography>
        {subtitle && (
          <Typography variant="body2" color="textSecondary" mb={3}>
            {subtitle}
          </Typography>
        )}
        <Stack
          direction="row"
          spacing={2}
          alignItems="center"
          mb={2}
          justifyContent="space-between"
          flexWrap="wrap"
        >
          <Stack direction="row" spacing={2} alignItems="center" flexWrap="wrap">
            <TextField
              label="Buscar por código o nombre..."
              size="small"
              value={search}
              onChange={(e) => onSearchChange(e.target.value)}
            />
            <FormControl size="small" sx={{ minWidth: 200 }}>
              <InputLabel id="filtro-label">Estado</InputLabel>
                <Select
                  labelId="filtro-label"
                  value={filtro}
                  label="Estado"
                  onChange={(e) => onFiltroChange(e.target.value)}
                >
                  <MenuItem value="Todos">Todos</MenuItem>
                  {Object.values(EstadoFactibilidad).map((estado) => (
                    <MenuItem key={estado} value={estado}>{estado}</MenuItem>
                  ))}
                </Select>
            </FormControl>
            <IconButton
              sx={{ color: colors.standardDarkBlue }}
            >
              <FilterListIcon />
            </IconButton>
          </Stack>
          <Box paddingRight={10}>
            <CustomButton
              onClick={() => navigate('/factibilidades/crear')}
              $variant="contained"
              size= 'large'
              color="primary"
            >
              Ingresar
            </CustomButton>
          </Box>
        </Stack>
      </>
    );
  }
  