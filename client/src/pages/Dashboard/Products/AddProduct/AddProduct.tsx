import React, { useRef, useState } from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Input from '@mui/material/Input';
import Paper from '@mui/material/Paper';
import InputLabel from '@mui/material/InputLabel';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Copyright from '../../../../components/Copyright/Copyright';
import { Field, useFormik } from 'formik';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

/* VALIDACIONES */
const validations = yup.object({
  name: yup.string().required('Name is required'),
  description: yup.string().required('Description is required'),
  buy_price: yup
    .number()
    .positive('This value is positive value')
    .min(0, 'This value is not < 0')
    .required('This camp is require'),
  sell_price: yup
    .number()
    .positive('This value is positive value')
    .moreThan(yup.ref('buy_price'), `The value sell must be greater than buy price`)
    .required('This camp is require'),
  images: yup.mixed().required(),
  // images: yup
  //   .mixed()
  //   .required('A file is required')
  //   .test('fileSize', 'File too large', value => value && value.size <= FILE_SIZE)
  //   .test(
  //     'fileFormat',
  //     'Unsupported Format',
  //     value => value && SUPPORTED_FORMATS.includes(value.type),
  //   ),
});

/* COMPONENT */
export default function AddProduct() {
  const [fieldValue, setFieldValue] = useState<any>();
  /* HOOKS */
  const formik = useFormik({
    initialValues: {
      name: '',
      description: '',
      gender: '',
      season: '',
      buy_price: 0,
      sell_price: 0,
      category: '',
      size: '',
      images: [],
    },
    validationSchema: validations,
    onSubmit: values => {
      alert(
        JSON.stringify(
          {
            values,
          },
          null,
          2,
        ),
      );
    },
  });

  return (
    <Container component='main' maxWidth='xs'>
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}>
        <Typography component='h1' variant='h5'>
          Create Product
        </Typography>
        <Box component='form' noValidate onSubmit={formik.handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            {/* NAME */}
            <Grid item xs={12} sm={12}>
              <InputLabel id='name'>Title Product</InputLabel>
              <TextField
                autoComplete='given-name'
                name='name'
                required
                fullWidth
                id='name'
                label='Name'
                autoFocus
                value={formik.values.name}
                onChange={formik.handleChange}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
              />
            </Grid>
            {/* DESCRIPTION */}
            <Grid item xs={12} sm={12}>
              <InputLabel id='description'>Product description</InputLabel>
              <TextField
                required
                fullWidth
                id='description'
                name='description'
                label='Description'
                autoComplete='family-name'
                multiline
                rows={5}
                value={formik.values.description}
                onChange={formik.handleChange}
                error={formik.touched.description && Boolean(formik.errors.description)}
                helperText={formik.touched.description && formik.errors.description}
              />
            </Grid>
            {/* GENDER */}
            <Grid item xs={6} sm={6}>
              <InputLabel id='gender'>Gender</InputLabel>
              <Select
                fullWidth
                id='gender'
                labelId='gender'
                name='gender'
                label='Gender'
                value={formik.values.gender}
                onChange={formik.handleChange}
                error={formik.touched.gender && Boolean(formik.errors.gender)}>
                <MenuItem value={'unisex'}>Unisex</MenuItem>
                <MenuItem value={'male'}>Male</MenuItem>
                <MenuItem value={'female'}>Female</MenuItem>
              </Select>
            </Grid>
            {/* SEASON */}
            <Grid item xs={6} sm={6}>
              <InputLabel id='season'>Season</InputLabel>
              <Select
                fullWidth
                id='season'
                labelId='season'
                name='season'
                label='Season'
                value={formik.values.season}
                onChange={formik.handleChange}
                error={formik.touched.season && Boolean(formik.errors.season)}>
                <MenuItem value={'spring'}>Spring</MenuItem>
                <MenuItem value={'summer'}>Summer</MenuItem>
                <MenuItem value={'fall'}>Fall</MenuItem>
                <MenuItem value={'winter'}>Winter</MenuItem>
              </Select>
            </Grid>
            {/* Buy Price */}
            <Grid item xs={6} sm={6}>
              <TextField
                required
                fullWidth
                name='buy_price'
                id='buy_price'
                label='Buy Price'
                type='number'
                value={formik.values.buy_price}
                onChange={formik.handleChange}
                error={formik.touched.buy_price && Boolean(formik.errors.buy_price)}
                helperText={formik.touched.buy_price && formik.errors.buy_price}
              />
            </Grid>
            {/* Sell Price */}
            <Grid item xs={6} sm={6}>
              <TextField
                required
                fullWidth
                name='sell_price'
                id='sell_price'
                label='Sell Price'
                type='number'
                value={formik.values.sell_price}
                onChange={formik.handleChange}
                error={formik.touched.sell_price && Boolean(formik.errors.sell_price)}
                helperText={formik.touched.sell_price && formik.errors.sell_price}
              />
            </Grid>
            {/* Section */}
            <Container>
              <Typography mt={2} component='h1' variant='h6' textAlign='center'>
                Details
              </Typography>
            </Container>
            {/* Category */}
            <Grid item xs={6} sm={6}>
              <InputLabel id='category'>Category</InputLabel>
              <Select
                fullWidth
                id='category'
                labelId='category'
                name='category'
                label='Category'
                value={formik.values.category}
                onChange={formik.handleChange}
                error={formik.touched.category && Boolean(formik.errors.category)}>
                <MenuItem value={'sport'}>sport</MenuItem>
                <MenuItem value={'casual'}>casual</MenuItem>
                <MenuItem value={'sandals'}>sandals</MenuItem>
                <MenuItem value={'winter'}>Winter</MenuItem>
              </Select>
            </Grid>
            {/* Sizes */}
            <Grid item xs={6} sm={6}>
              <InputLabel id='size'>Size</InputLabel>
              <Select
                fullWidth
                id='size'
                labelId='size'
                name='size'
                label='Size'
                value={formik.values.size}
                onChange={formik.handleChange}
                error={formik.touched.size && Boolean(formik.errors.size)}>
                <MenuItem value={36}>36</MenuItem>
                <MenuItem value={37}>37</MenuItem>
                <MenuItem value={38}>38</MenuItem>
                <MenuItem value={39}>39</MenuItem>
              </Select>
            </Grid>
            {/* IMAGES */}
            <Grid item xs={12} sm={12}>
              {/* <Button fullWidth variant='outlined' color='inherit' component='label'>
                Upload Images
                <input
                  hidden
                  accept='image/*'
                  type='file'
                  id='images'
                  name='images'
                  multiple
                  onChange={formik.handleChange}
                />
              </Button> */}
              {/* {console.log(formik.values)} */}
            </Grid>
            {/* Images Test */}
            <Grid item xs={12} sm={12}>
              <Button fullWidth variant='outlined' color='inherit' component='label'>
                Upload Images
                <input
                  accept='image/*'
                  type='file'
                  id='images'
                  name='images'
                  multiple
                  onChange={event => setFieldValue(event.target.files)}
                />
              </Button>
            </Grid>
            {/* END */}
            <Grid item xs={12}>
              {/* <FormControlLabel
                control={<Checkbox value='allowExtraEmails' color='primary' />}
                label='I want to receive inspiration, marketing promotions and updates via email.'
              /> */}
            </Grid>
          </Grid>

          <Button type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2 }}>
            Create Product
          </Button>
          <Grid container justifyContent='flex-end'>
            <Grid item>
              {/* <Link href='#' variant='body2'>
                No hay categorias
              </Link> */}
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright sx={{ mt: 5 }} />
    </Container>
  );
}
