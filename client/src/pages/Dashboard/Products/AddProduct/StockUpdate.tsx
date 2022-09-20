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
import { Endpoint } from '@/routes/routes';


/* VALIDACIONES */
const validations = yup.object({
    id: yup.string().required('Select at least one product'),
});
// 
/* COMPONENT */
// const isLoggedIn = useSelector((state: IRootState) => state.user.loggedIn)
export default function UpdateStock() {
    const dispatch = useDispatch()
    const sizes = useSelector((state: RootState) => state.sizes.sizes)
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
            details: {
                size: [
                    {
                        id: "",
                        stock: ""
                    }
                ]
            }
        },
        validationSchema: validations,
        onSubmit: values => {
            handleFormSubmit(values)
            console.log(values)
        },
    });
    const handleFormSubmit = async (values: any) => {
        const valores = JSON.stringify(values)
        console.log('entramos al handle ');
        console.log('estos son los values en el handle submit', values)
        if (values.id) {
            const axiosP = await axios.put(Endpoint.updateStock, values, { headers:{ "authorization":'bearer '+ auth.token }} )
            console.log(axiosP);
        }
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
                        Update Stock
                    </Typography>
                    <Divider style={{ width: '100%' }} variant='middle' />
                    <Box component='form' noValidate onSubmit={formik.handleSubmit} method='PUT' encType='multipart/form-data' sx={{ mt: 3 }}>
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
                                                                {sizes?.map((s: any) => {
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
                            Update product
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