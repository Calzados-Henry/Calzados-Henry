import React, { useEffect } from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import { useAuth } from '@/hooks/useAuth';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Copyright from '../../../../../components/Copyright/Copyright';
import { FieldArray, useFormik, FormikProvider } from 'formik';
import * as yup from 'yup';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { getColors } from '@/features/colors/getColorsSlice';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { ArrayInterpolation } from '@emotion/react';
import { ColorI } from '../../../../../../../api/src/types';
import { RootState } from '../../../../../store';
import Loader from '@/app/Loader';
import Divider from '@mui/material/Divider';

/* VALIDACIONES */

/* COMPONENT */
// const isLoggedIn = useSelector((state: IRootState) => state.user.loggedIn)
export default function addColor() {
  const dispatch = useDispatch();
  const colors: any = useSelector((state: RootState) => state.colors.colors);
  useEffect(() => {
    dispatch(getColors());
  }, []);

  console.log(colors);
  const colorsTraidas: Array<string> = colors.map((c: ColorI) => c.color.toString());
  const validations = yup.object({
    colors: yup
      .array(
        yup.object({
          color: yup
            .string()
            .required()
            .min(1, 'Insert a valid color')
            .max(15)
            .notOneOf(colorsTraidas, 'You cannot add exitent colors'),
        }),
      )
      .min(1)
      .max(3)
      .required('Please, type at least one color'),
  });
  /* HOOKS */
  const formik = useFormik({
    initialValues: {
      //!import correcto de los color y las colors
      colors: [
        {
          color: '',
        },
      ], //! ver que esté cambiado color ->  id_color
    },
    validationSchema: validations,
    onSubmit: values => {
      console.log(formik);
      console.log(values);
    },
  });
  if (!colors.length) {
    return <Loader size={25} />;
  } else {
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
            {/* color */}
            <Typography component='h1' variant='h5'>
              Create Color
            </Typography>
            <Divider style={{ width: '100%' }} variant='middle' />
            <Box
              component='form'
              noValidate
              onSubmit={formik.handleSubmit}
              method='POST'
              action='http://localhost:3001/products'
              encType='multipart/form-data'
              sx={{ mt: 3 }}>
              <Grid>
                <FieldArray name='colors'>
                  {({ push, remove }) => (
                    <React.Fragment>
                      <Grid item>
                        <Typography variant='body2'>Color</Typography>
                      </Grid>
                      {formik.values.colors.map((_, index) => (
                        <Grid container spacing={2} item>
                          <Grid xs={8} item>
                            <TextField
                              size='small'
                              fullWidth
                              name={`colors[${index}].color`}
                              onChange={formik.handleChange}
                              error={formik.touched.colors && Boolean(formik.errors.colors)}
                            />
                          </Grid>
                          <Grid item>
                            <Button fullWidth variant='contained' onClick={() => remove(index)}>
                              Delete
                            </Button>
                          </Grid>
                        </Grid>
                      ))}
                      <Grid mt={2} item>
                        <Button fullWidth variant='contained' onClick={() => push({ color: '' })}>
                          Add color
                        </Button>
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
                Create color
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
        </Container>
      </FormikProvider>
    );
  }
}
