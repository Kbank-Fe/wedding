import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';

type LoadingOverlayProps = {
  open: boolean;
  text?: string;
  onClose: () => void;
};

const SetLoadingOverlay = ({ open, text, onClose }: LoadingOverlayProps) => {
  return (
    <>
      <Backdrop
        open={open}
        sx={(theme) => ({
          color: 'var(--gray1)',
          zIndex: theme.zIndex.drawer + 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 2,
        })}
        onClick={onClose}
      >
        <CircularProgress color="inherit" />
        {text && <Typography variant="h6">{text}</Typography>}
      </Backdrop>
    </>
  );
};

export default SetLoadingOverlay;
