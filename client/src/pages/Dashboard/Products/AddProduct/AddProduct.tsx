import React, { useEffect, useRef, useState } from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import { RootState } from '../../../../store';
import { useAuth } from '@/hooks/useAuth';
import Divider from '@mui/material/Divider';

// import FormControlLabel from '@mui/material/FormControlLabel';
// import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Input from '@mui/material/Input';
import Paper from '@mui/material/Paper';
import InputLabel from '@mui/material/InputLabel';
// import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Copyright from '../../../../components/Copyright/Copyright';
import { Field, FieldArray, useFormik, validateYupSchema, FormikProvider, setNestedObjectValues } from 'formik';
import * as yup from 'yup';
// import { useNavigate } from 'react-router-dom';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
// import { createAsyncThunk } from '@reduxjs/toolkit';
import { getSizes } from '@/features/sizes/sizesSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useGetCategoriesQuery, useGetProductQuery } from '@/features';
import axios from 'axios';
import DeleteProduct from './DeleteProduct'
import UpdateStock from './StockUpdate';
import { Endpoint } from '@/routes/routes';
/* VALIDACIONES */
const validations = yup.object({
  name: yup.string().required('Name is required'),
  description: yup.string().required('Description is required'),
  buy_price: yup
    .number()
    .positive('This value is positive value')
    .min(0, 'This value is not < 0')
    .required('This camp is required'),
  sell_price: yup
    .number()
    .positive('This value is positive value')
    .moreThan(yup.ref('buy_price'), `The value sell must be greater than buy price`)
    .required('This camp is require')
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
// 
/* COMPONENT */
// const isLoggedIn = useSelector((state: IRootState) => state.user.loggedIn)
export default function AddProduct() {
  const dispatch = useDispatch()
  const sizes: any = useSelector((state: RootState) => state.sizes)
  const { data: categories, error: errorC, isLoading: isLoadingC, isError: isErrorC, isSuccess: isSuccessC, currentData: currentDataC } = useGetCategoriesQuery()

  useEffect(() => {
    dispatch(getSizes())
  }, [])
  /* HOOKS */
  const auth = useAuth()
  const formik = useFormik({
    initialValues: {  //!import correcto de los size y las categories
      id_category: '', //! ver que esté cambiado category ->  id_category
      name: '',
      description: '',
      gender: '',
      season: '',
      buy_price: 0,
      sell_price: 0,
      details: {
        id_color: 1, //!   id color ver como registrar
        size: [{ id: "", stock: 0 }]  //!sizes : ver que se envie un id y un stock en total 
      },
      file: []
    },
    validationSchema: validations,
    onSubmit: values => {
      handleFormSubmit(values)
      console.log(values)
    },
  });
  const handleFormSubmit = async (values: any) => {
    const formData = new FormData()
    formData.append("body", JSON.stringify(values))
    if (values.file) {
      for (let filo of values.file) {
        formData.append("image", filo)
        console.log(filo);
      }
      console.log(formData)
    }
    const prueba = await fetch(Endpoint.postProduct, { method: "POST", body: formData, headers: { "Authorization": `bearer ${auth.token}` } });
    console.log(prueba)
  }

  return (
    <FormikProvider value={formik}>
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
          <Divider style={{ width: '100%' }} variant='middle' />
          <Box component='form' noValidate onSubmit={formik.handleSubmit} method='POST' action={Endpoint.postProduct} encType='multipart/form-data' sx={{ mt: 3 }}>
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
                  <MenuItem value={'Unisex'}>Unisex</MenuItem>
                  <MenuItem value={'Male'}>Male</MenuItem>
                  <MenuItem value={'Female'}>Female</MenuItem>
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
                  <MenuItem value={'Spring'}>Spring</MenuItem>
                  <MenuItem value={'Summer'}>Summer</MenuItem>
                  <MenuItem value={'Autumn'}>Autumn</MenuItem>
                  <MenuItem value={'Winter'}>Winter</MenuItem>
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
              <Grid item xs={12} sm={12}>
                <InputLabel id='category'>Category</InputLabel>
                <Select
                  fullWidth
                  id='id_category'
                  labelId='id_category'
                  name='id_category'
                  label='Category'
                  value={formik.values.id_category}
                  onChange={formik.handleChange}
                  error={formik.touched.id_category && Boolean(formik.errors.id_category)}>
                  {categories?.map((c: any) => {
                    return (
                      <MenuItem value={c.id}>{c.category}</MenuItem>
                    )
                  })}
                </Select>
              </Grid>
              {/* details */}
              <Grid pl={2}>
                <FieldArray name="details.size">
                  {({ push, remove }) => (
                    <React.Fragment>
                      <Grid item>
                        <Typography variant="body2">Size</Typography>
                      </Grid>
                      {formik.values.details.size.map((_, index) => (
                        <Grid mb={1} container item>
                          <Grid item>
                            <Select size='medium' fullWidth onChange={formik.handleChange} name={`details.size[${index}].id`}>
                              {sizes.sizes.map((s: any) => {
                                return (
                                  <MenuItem value={s.id}>{s.size}</MenuItem>
                                )
                              })}
                            </Select>
                          </Grid>
                          <Grid ml={1} item>
                            <TextField
                              type='number'
                              fullWidth
                              size='medium'
                              label="Stock"
                              name={`details.size[${index}].stock`}
                              onChange={formik.handleChange}
                            />
                          </Grid>
                          <Grid display='flex' alignItems="center"
                            justifyContent="center" ml={2} item>
                            <Button fullWidth size='large' variant="contained" onClick={() => remove(index)}>Delete</Button>
                          </Grid>
                        </Grid>
                      ))}
                      <Grid mt={2} item>
                        <Button fullWidth variant="contained" onClick={() => push({ id: "", stock: 0 })} >Add Size</Button>
                      </Grid>
                    </React.Fragment>
                  )}
                </FieldArray>
              </Grid>
              {/* IMAGES */}
              <Grid item xs={12} sm={12}>
                <>
                  <Button fullWidth variant='outlined' color='inherit' component='label'>
                    Upload Images
                    <input
                      hidden
                      type='file'
                      id='file'
                      name='file'
                      multiple
                      onChange={(event: any) => {
                        formik.setFieldValue("file", event.target.files)
                      }}
                    />
                  </Button>
                  {console.log(formik.values)}
                </>
              </Grid>
              {/* Images Test */}
              <Grid item xs={12} sm={12}>
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
      <DeleteProduct />
      <UpdateStock />
    </FormikProvider>
  )
}