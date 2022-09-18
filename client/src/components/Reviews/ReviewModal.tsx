import Copyright from '@/components/Copyright/Copyright';
import { useCreateReviewMutation } from '@/features/user/reviews/reviewsApiSlice';
import { useAuth } from '@/hooks/useAuth';
import AddIcon from '@mui/icons-material/Add';
import { CircularProgress, Rating } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import * as yup from 'yup';

const validations = yup.object({
  rate: yup.number().min(0).max(5).required('First Name is required'),
  review: yup.string().min(10).max(200).required('Message is required'),
});

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '90%',
  maxWidth: 600,
  bgcolor: 'background.paper',
  border: 'none',
  boxShadow: 24,
  borderRadius: 4,
  justifyContent: 'center',
  p: 4,
};

export default function ReviewModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const auth = useAuth();
  const [disabledButton, setDisabledButton] = useState(false);
  const params = useParams();
  const [createReview, { data, isLoading, isSuccess, error, isError }] = useCreateReviewMutation();

  const formik = useFormik({
    initialValues: {
      id_product: params.id,
      id_user: auth.id,
      review: '',
      rate: 0,
    },
    validationSchema: validations,
    onSubmit: async values => {
      setDisabledButton(true);
      await createReview(values);
      formik.resetForm();
      handleClose();
    },
  });

  return (
    <>
      <Button
        onClick={handleOpen}
        color='secondary'
        variant='outlined'
        size='small'
        startIcon={<AddIcon />}>
        add
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
            {/* <Toaster position='bottom-left' reverseOrder={false} /> */}
            <CssBaseline />
            <Box
              sx={{
                marginTop: 1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
              }}>
              <Typography component='h1' variant='h5'>
                Review this product
              </Typography>
              <Box component='form' noValidate onSubmit={formik.handleSubmit} sx={{ mt: 3 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Typography component='legend'>Your Rating</Typography>
                    <Rating
                      size='large'
                      id='rate'
                      name='rate'
                      value={formik.values.rate}
                      onChange={formik.handleChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id='review'
                      name='review'
                      label='Review'
                      type='text'
                      multiline
                      minRows={5}
                      maxRows={10}
                      value={formik.values.review}
                      onChange={formik.handleChange}
                      error={formik.touched.review && Boolean(formik.errors.review)}
                      helperText={formik.touched.review && formik.errors.review}
                    />
                  </Grid>
                  <Grid item xs={12}></Grid>
                </Grid>
                <Button
                  disabled={disabledButton}
                  type='submit'
                  fullWidth
                  variant='contained'
                  color='secondary'
                  sx={{ mt: 3, mb: 2 }}>
                  {isLoading ? <CircularProgress size={20} color='secondary' /> : 'review'}
                </Button>
              </Box>
            </Box>
          </Container>
          <Copyright sx={{ mt: 5 }} />
        </Box>
      </Modal>
    </>
  );
}
