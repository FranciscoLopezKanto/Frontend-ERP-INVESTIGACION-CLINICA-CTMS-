import {
    Popover, Box, Typography, List, ListItem, ListItemText  } from '@mui/material'
  import WarningAmberIcon from '@mui/icons-material/WarningAmber'
  
  interface NotificationPopoverProps {
    anchorEl: HTMLElement | null
    onClose: () => void
    open: boolean
    id: string
    alertas: { estudioId: string; mensaje: string; estudioNombre: string }[]
  }
  
  export const NotificationPopover = ({ anchorEl, onClose, open, id, alertas }: NotificationPopoverProps) => (
    <Popover
      id={id}
      open={open}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      PaperProps={{ sx: { width: 360, maxHeight: 400 } }}
    >
      <Box p={2}>
        <Typography variant="h6" gutterBottom>Alertas Generales</Typography>
        <List dense sx={{ maxHeight: 340, overflowY: 'auto' }}>
          {alertas.map((alerta, i) => (
            <ListItem key={`${alerta.estudioId}-${i}`}>
              <WarningAmberIcon color="warning" sx={{ mr: 1 }} />
              <ListItemText primary={`[${alerta.estudioNombre}] ${alerta.mensaje}`} />
            </ListItem>
          ))}
        </List>
      </Box>
    </Popover>
  )
  
  