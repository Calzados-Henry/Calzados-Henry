import Copyright from '@/components/Copyright/Copyright';
import { useAuth } from '@/hooks/useAuth';
import EditIcon from '@mui/icons-material/Edit';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import React, { useState } from 'react';
import AccountInfo from './AccountInfo';
import PersonalInfo from './PersonalInfo';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '90%',
  minWidth: 400,
  maxWidth: 800,
  bgcolor: 'background.paper',
  border: 'none',
  boxShadow: 24,
  borderRadius: 4,
  justifyContent: 'center',
  p: 4,
};

export default function ProfileModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const auth = useAuth();
  const [disabledButton, setDisabledButton] = useState(false);

  return (
    <>
      <Button
        onClick={handleOpen}
        color='secondary'
        variant='outlined'
        size='small'
        startIcon={<EditIcon />}>
        edit
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'>
        <Box sx={style}>
          <Container component='main' maxWidth='sm'>
            <Box display={'flex'} justifyContent={'flex-end'}>
              <Button color='secondary' onClick={handleClose}>
                close
              </Button>
            </Box>
            <CssBaseline />
            <Box
              sx={{
                marginTop: 1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
              }}>
              <Typography component='h1' variant='h5' gutterBottom>
                Update Your Info
              </Typography>

              <PersonalInfo handleClose={handleClose} />
              <AccountInfo handleClose={handleClose} />
            </Box>
          </Container>
          <Copyright sx={{ mt: 5 }} />
        </Box>
      </Modal>
    </>
  );
}
