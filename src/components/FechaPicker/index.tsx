import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { es } from 'date-fns/locale/es';

interface Props {
  value: string | null;
  onChange: (value: string | null) => void;
  label?: string;
}

export default function FechaNacimientoPicker({ value, onChange, label = 'Fecha de nacimiento' }: Props) {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={es}>
      <DatePicker
        label={label}
        disableFuture
        openTo="year"
        views={['year', 'month', 'day']}
        value={value ? new Date(value) : null}
        onChange={(date) => {
          const iso = date?.toISOString() ?? null;
          onChange(iso);
        }}
        slotProps={{ textField: { fullWidth: true } }}
      />
    </LocalizationProvider>
  );
}
