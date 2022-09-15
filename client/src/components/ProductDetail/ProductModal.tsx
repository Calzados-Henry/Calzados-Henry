import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import styles from './ProductModal.module.css';
import Sizes from './sizes/Sizes';
import Cant from './cant/Cant';
import Ratings from './ratings/Ratings';
import Photos from './photos/Photos';
import { useNavigate } from 'react-router-dom';
import Description from './description/Description';
import { PublicRoutes } from '../../routes/routes';

export default function ProductModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const navigate = useNavigate();
  const navigateHandled = () => {
    navigate(`${PublicRoutes.products}/12`);
    handleClose();
  };

  return (
    <div>Modal</div>
    );
  }
  
  {/* <Button onClick={handleOpen}>Open modal</Button>
  <Modal
    keepMounted
    open={open}
    onClose={handleClose}
    aria-labelledby='keep-mounted-modal-title'
    aria-describedby='keep-mounted-modal-description'>
    <Box className={styles.modal}>
      <Box className={styles.in_modal}>
        <Grid container spacing={2}>
          <Grid
            item
            xs={12}
            height={40}
            sx={{ display: 'grid', justifyContent: 'flex-end', width: '100%' }}>
            <Button onClick={handleClose} sx={{ color: 'gray' }}>
              ✗close
            </Button>
          </Grid>
          <Grid item xs={8}>
            <Box sx={{ display: 'flex', justifyContent: 'center' }} className={styles.box}>
              <Photos></Photos>
            </Box>
          </Grid>
          <Grid item xs={4}>
            <Box className={styles.box}>
              <Description></Description>
              <Sizes></Sizes>
              <Cant></Cant>
              <AddCartButton></AddCartButton>
              <Ratings></Ratings>
              <Box sx={{ display: 'grid' }}>
                <Button
                  size='large'
                  onClick={navigateHandled}
                  variant='outlined'
                  color='inherit'>
                  More Details
                </Button>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  </Modal>
</div> */}