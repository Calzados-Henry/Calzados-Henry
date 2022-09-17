import React, { useEffect } from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import { RootState } from '../../../../store';
import { useAuth } from '@/hooks/useAuth';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Copyright from '../../../../components/Copyright/Copyright';
import { FieldArray, useFormik, FormikProvider } from 'formik';
import * as yup from 'yup';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { getSizes } from '@/features/sizes/sizesSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useGetCategoriesQuery, useGetSeasonsQuery } from '@/features';
import axios from 'axios';


/* VALIDACIONES */
const validations = yup.array({
  categories[0].category: yup.string().required('Please, type at least one category'),
  description: yup.string().required('Description is required'),
  category: yup
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
  const { data: seasons, error: errorS, isLoading: isLoadingS, isError: isErrorS, isSuccess: isSuccessS, currentData: currentDataS } = useGetSeasonsQuery()

  useEffect(() => {
    dispatch(getSizes())
  }, [])
  /* HOOKS */
  const auth = useAuth()
  const formik = useFormik({
    initialValues: {  //!import correcto de los size y las categories
      categories: [
        {
          category: ""
        }
      ], //! ver que esté cambiado category ->  id_category
    },
    validationSchema: validations,
    onSubmit: values => {
      console.log(values)
    },
  })

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
          {/* Category */}
          <Grid item xs={12} sm={12}>
            <InputLabel id='category'>Category</InputLabel>
            <Select
              fullWidth
              id='id_category'
              labelId='id_category'
              name='id_category'
              label='Category'
              value={formik.values.categories}
              onChange={formik.handleChange}
              error={formik.touched.categories && Boolean(formik.errors.categories)}>
              {categories?.map((c: any) => {
                return (
                  <MenuItem value={c.id}>{c.category}</MenuItem>
                )
              })}
            </Select>
          </Grid>
          {/* details */}
          <Grid>
            <FieldArray name="categories">
              {({ push, remove }) => (
                <React.Fragment>
                  <Grid item>
                    <Typography variant="body2">Category</Typography>
                  </Grid>
                  {formik.values.categories.map((_, index) => (
                    <Grid container item>
                      <Grid xs={8} item>
                        <TextField
                          fullWidth
                          label="Stock"
                          name={`categories[${index}].stock`}
                          onChange={formik.handleChange}
                        />
                      </Grid>
                      <Grid item>
                        <Button variant="contained" onClick={() => remove(index)}>Delete</Button>
                      </Grid>
                    </Grid>
                  ))}
                  <Grid item>
                    <Button variant="contained" onClick={() => push({ category: '' })} >Add Size</Button>
                  </Grid>
                </React.Fragment>
              )}
            </FieldArray>
          </Grid>
          {/* END */}
          <Grid item xs={12}>
            {/* <FormControlLabel
                control={<Checkbox value='allowExtraEmails' color='primary' />}
                label='I want to receive inspiration, marketing promotions and updates via email.'
              /> */}
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
        <Copyright sx={{ mt: 5 }} />
      </Container >
    </FormikProvider >
  )
}
