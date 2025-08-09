import { Button } from '@mui/material';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

interface GoogleCalendarButtonProps {
  title: string;
  startDate: string; // formato ISO (ej: 2025-06-01T14:30:00.000Z)
  description: string;
  location?: string;
}

export default function GoogleCalendarButton({ title, startDate, description, location }: GoogleCalendarButtonProps) {
  const formatDateForGoogle = (dateStr: string) => {
    const start = new Date(dateStr);
    const end = new Date(start.getTime() + 60 * 60 * 1000); // duración estimada: 1 hora
    const format = (d: Date) =>
      d.toISOString().replace(/[-:]|\.\d{3}/g, '').slice(0, 15) + 'Z';
    return `${format(start)}/${format(end)}`;
  };

  const url = `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
    title
  )}&dates=${formatDateForGoogle(startDate)}&details=${encodeURIComponent(description)}${location ? `&location=${encodeURIComponent(location)}` : ''}`;

  return (
    <Button
      variant="outlined"
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      startIcon={<CalendarTodayIcon />}
      sx={{ mt: 2 }}
    >
      Agendar en Google Calendar
    </Button>
  );
}
