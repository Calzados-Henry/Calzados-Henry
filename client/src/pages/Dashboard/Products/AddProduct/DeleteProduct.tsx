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
import { useGetCategoriesQuery, useGetProductsQuery } from '@/features';
import axios from 'axios';


/* VALIDACIONES */
const validations = yup.object({
    id: yup.string().required('Select at least one product'),
});
// 
/* COMPONENT */
// const isLoggedIn = useSelector((state: IRootState) => state.user.loggedIn)
export default function AddProduct() {
    const dispatch = useDispatch()
    const products: any = useSelector((state: RootState) => state.products)
    const { data: categories, error: errorC, isLoading: isLoadingC, isError: isErrorC, isSuccess: isSuccessC, currentData: currentDataC } = useGetCategoriesQuery()
    const { data } = useGetProductsQuery()
    useEffect(() => {
        dispatch(getSizes())
    }, [])
    /* HOOKS */
    const auth = useAuth()
    const formik = useFormik({
        initialValues: {
            id: 1,
        },
        validationSchema: validations,
        onSubmit: values => {
            handleFormSubmit(values)
            console.log(values)
        },
    });
    const handleFormSubmit = async (values: any) => {
        console.log(values)
        const prueba = await axios.delete("http://localhost:3001/products",{data:values, headers: { "Authorization": `bearer ${auth.token}` }})
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
                        Delete Product
                    </Typography>
                    <Divider style={{ width: '100%' }} variant='middle' />
                    <Box component='form' noValidate onSubmit={formik.handleSubmit} method='POST' action='http://localhost:3001/products' encType='multipart/form-data' sx={{ mt: 3 }}>
                        <Grid spacing={2}>
                            <Grid pl={2}>
                                <React.Fragment>
                                    <Grid item>
                                        <Typography variant="body2">Product</Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={12}>
                                        <Select style={{ width: '100%' }} onChange={formik.handleChange} name={`id`}>
                                            {data?.map((s: any) => {
                                                return (
                                                    <MenuItem value={s.id}>{s.name}</MenuItem>
                                                )
                                            })}
                                        </Select>
                                    </Grid>
                                </React.Fragment>
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
                            Delete Product
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
        </FormikProvider>
    )
}