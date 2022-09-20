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
import { getSizes } from '@/features/sizes/sizesSlice';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { ArrayInterpolation } from '@emotion/react';
import { SizeI } from '../../../../../../../api/src/types'
import { RootState } from '../../../../../store';
import Loader from '@/app/Loader';
import Divider from '@mui/material/Divider';
import { Endpoint } from '@/routes/routes';

/* VALIDACIONES */

/* COMPONENT */
// const isLoggedIn = useSelector((state: IRootState) => state.user.loggedIn)
export default function addsize() {
    const dispatch = useDispatch()
    const sizes: any = useSelector((state: RootState) => state.sizes.sizes)
    useEffect(() => {
        dispatch(getSizes())
    }, [])

    const sizesTraidas: Array<string> = sizes.map((c: SizeI) => c.size.toString())
    const validations = yup.object({
        sizes: yup.array(yup.object({
            size: yup.string().required().min(1, "Insert a valid size").max(15).notOneOf(sizesTraidas, 'You cannot add exitent sizes'),
        })).min(1).max(3).required('Please, type at least one size')
    });
    /* HOOKS */
    const formik = useFormik({
        initialValues: {  //!import correcto de los size y las sizes
            sizes:
                [{
                    size: ""
                }], //! ver que esté cambiado size ->  id_size
        },
        validationSchema: validations,
        onSubmit: async values => {
            console.log(values)
            const post: any = await axios.post(Endpoint.postSizes, values)
            console.log(post);
        },
    })
    if (!sizes.length) {
        return (
            <Loader size={25} />
        )
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
                        {/* size */}
                        <Typography component='h1' variant='h5'>
                            Create Size
                        </Typography>
                        <Divider style={{ width: '100%' }} variant='middle' />
                        <Box component='form' noValidate onSubmit={formik.handleSubmit} method='POST' action='http://localhost:3001/products' encType='multipart/form-data' sx={{ mt: 3 }}>
                            <Grid>
                                <FieldArray name="sizes">
                                    {({ push, remove }) => (
                                        <React.Fragment>
                                            <Grid item>
                                                <Typography variant="body2">size</Typography>
                                            </Grid>
                                            {formik.values.sizes.map((_, index) => (
                                                <Grid container spacing={2} item>
                                                    <Grid xs={8} item>
                                                        <TextField
                                                            size='small'
                                                            fullWidth
                                                            name={`sizes[${index}].size`}
                                                            onChange={formik.handleChange}
                                                            error={formik.touched.sizes && Boolean(formik.errors.sizes)}
                                                        />
                                                    </Grid>
                                                    <Grid item>
                                                        <Button fullWidth variant="contained" onClick={() => remove(index)}>Delete</Button>
                                                    </Grid>
                                                </Grid>
                                            ))}
                                            <Grid mt={2} item>
                                                <Button fullWidth variant="contained" onClick={() => push({ size: '' })} >Add Size</Button>
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
                                Create size
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
                    {/* <Copyright sx={{ mt: 5 }} /> */}
                </Container >
            </FormikProvider >
        )
    }
}
