import Copyright from '@/components/Copyright/Copyright';
import { useAuth } from '@/hooks/useAuth';
import { Rating } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useFormik } from 'formik';
import { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { useParams } from 'react-router-dom';
import * as yup from 'yup';
import { useCreateReviewMutation } from '@/features/user/reviews/reviewsApiSlice';
import { getDate } from '@/utils/getDate';

const validations = yup.object({
  rate: yup.number().min(0).max(5).required('First Name is required'),
  review: yup.string().min(10).max(200).required('Message is required'),
});

export default function ReviewsForm() {
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
      date: getDate(),
    },
    validationSchema: validations,
    onSubmit: async values => {
      await createReview(values);
      console.log(values);
    },
  });

  return (
    <Container component='main' maxWidth='sm'>
      <Toaster position='bottom-left' reverseOrder={false} />
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}>
        <Typography component='h1' variant='h5'>
          Write Review
        </Typography>
        <Box component='form' noValidate onSubmit={formik.handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography component='legend'>Your Rating for this product</Typography>
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
            add your review
          </Button>
        </Box>
      </Box>
      <Copyright sx={{ mt: 5 }} />
    </Container>
  );
}
