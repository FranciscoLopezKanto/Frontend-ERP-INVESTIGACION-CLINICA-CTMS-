import { Snackbar, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useSessionExpired } from '../../context/session-expired.context';

const SessionExpiredSnackbar = () => {
  const { show } = useSessionExpired();
  const navigate = useNavigate();

  useEffect(() => {
    if (show) {
      setTimeout(() => {
        navigate('/');
      }, 3000); 
    }
  }, [show, navigate]);

  return (
    <Snackbar
      open={show}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      autoHideDuration={3000}
    >
      <Alert severity="error" variant="filled">
        Tu sesión ha caducado. Por favor inicia sesión nuevamente.
      </Alert>
    </Snackbar>
  );
};

export default SessionExpiredSnackbar;
