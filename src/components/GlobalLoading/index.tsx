import { Backdrop, CircularProgress } from '@mui/material';
import { useLoading } from '../../context/loading.context';

const GlobalLoading = () => {
  const { isLoading } = useLoading();

  return (
    <Backdrop open={isLoading} sx={{ zIndex: 1300, color: '#fff' }}>
      <CircularProgress color="info" />
    </Backdrop>
  );
};

export default GlobalLoading;
