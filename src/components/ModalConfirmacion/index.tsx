import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';
import CustomButton from '../Button';

interface ModalConfirmacionProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  loading?: boolean;
}

export default function ModalConfirmacion({
  open,
  onClose,
  onConfirm,
  title = '¿Estás seguro?',
  description = 'Esta acción no se puede deshacer.',
  confirmText = 'Confirmar',
  cancelText = 'Cancelar',
  loading = false,
}: ModalConfirmacionProps) {
  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{description}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <CustomButton onClick={onClose} $variant="outlined">{cancelText} </CustomButton>
        <CustomButton onClick={onConfirm} $variant="contained" loading={loading} loadingText='Eliminando...'>
          {confirmText}
        </CustomButton>
      </DialogActions>
    </Dialog>
  );
}
