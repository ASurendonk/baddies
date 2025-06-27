import { useCallback } from 'react';
import { Modal as MUIModal, Box, IconButton } from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import { useIsMobile } from "../hooks/useIsMobile.ts";

interface ModalProps {
  open: boolean;
  onClose(): void;
  children: React.ReactNode;
}

const Modal = ({ open, onClose, children }: ModalProps) => {
  const theme = useTheme();
  const isMobile = useIsMobile();

  const handleClose = useCallback(() => {
    onClose();
  }, [onClose]);

  return (
    <MUIModal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          height: isMobile ? '100%' : 'auto',
          width: isMobile ? '100%' : 600,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          overflowY: 'auto',
        }}
      >
        <IconButton
          sx={{ position: 'absolute', top: 8, right: 8 }}
          onClick={handleClose}
        >
          <CloseIcon sx={{ color: theme.palette.common.black }} />
        </IconButton>
        {children}
      </Box>
    </MUIModal>
  );
};

export default Modal;
