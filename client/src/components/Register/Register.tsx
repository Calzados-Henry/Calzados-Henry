import { Grid, Paper, Avatar, TextField, Button, Box, Typography} from "@mui/material"
import { LockOutlined } from "@mui/icons-material"
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useEffect, useState } from "react";
import MaterialUIPickers from '../../pages/DatePicker/Date'

const validations = yup.object().shape({
  username: yup.string().required('Username is required'),
  email: yup.string().email('Enter a valid email').required('Email is required'),
  password: yup.string().required('Password is required').min(8, 'Password length must be of minimun 8 chars'),
  phone: yup.string().min(10, "Minimun number length is 10").max(10, "Maximun number length is 10").required('Number is required'),
  identification: yup.number().nullable(true).required('Number is required'),
});


export default function Register() {
    const paperstyle = {padding:20, height: '100%', width:450, margin:"100px auto"}
    const navigate = useNavigate();

    useEffect(() => {
        document.getElementById('formSubmit')?.click()
    }, [])
    
    const [errorSubmit, setErrorSubmit] = useState({
        errorEmail: '',
        errorPassword: '',
        errorUserName: ''
    })

    const formik = useFormik({
        initialValues: {
        username: '',
        password: '',
        email: '',
        name: '',
        last_name: '',
        phone: '',
        identification: null,
        birth_date: '',
        type_user: 'User'
        },
        validationSchema: validations,
        onSubmit: () => {
        fetch('http://localhost:3001/users/', {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
            body: JSON.stringify(formik.values)
        })
            .then(response => response.json())
            .then(data => console.log(data))
            .catch(error => console.log(error))
        },
    });


    return  (
        <Grid alignContent={'-webkit-center'}>
            <Box component='form' noValidate={false} onSubmit={formik.handleSubmit} sx={{ mt: 3 }}>
                <Paper elevation={10} style={paperstyle}>
                    <h2>Register here</h2>
                    <TextField
                        sx={{marginTop: 3}} 
                        label='Username' 
                        placeholder="Enter an username..." 
                        fullWidth
                        id='username'
                        name='username'
                        value={formik.values.username}
                        onChange={formik.handleChange}
                        error={formik.touched.username && Boolean(formik.errors.username)}
                        helperText={formik.touched.username && formik.errors.username}
                        autoComplete='username'>
                    </TextField>
                    <TextField
                        sx={{marginTop: 3, marginBottom:3}} 
                        label='Email' 
                        placeholder="Enter your email..." 
                        fullWidth
                        id='email'
                        name='email'
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        error={formik.touched.email && Boolean(formik.errors.email)}
                        helperText={formik.touched.email && formik.errors.email}
                        autoComplete='email'>
                    </TextField>
                    <TextField 
                        sx={{marginBottom:3}}
                        label='Password' 
                        placeholder="Enter password..." 
                        type='password' 
                        fullWidth
                        id='password'
                        name='password'
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        error={formik.touched.password && Boolean(formik.errors.password) }
                        helperText={formik.touched.password && formik.errors.password}
                        autoComplete='password'>
                    </TextField>
                    <Grid container spacing={1}>
                        <Grid item xs={4}>
                            <MaterialUIPickers></MaterialUIPickers>
                        </Grid>
                        <Grid item xs={8}>
                            <TextField
                                label='Phone' 
                                placeholder="Enter phone..." 
                                type={"number"  }
                                sx={{marginBottom:5}}
                                fullWidth
                                id='phone'
                                name='phone'
                                value={formik.values.phone}
                                onChange={formik.handleChange}
                                error={formik.touched.phone && Boolean(formik.errors.phone) }
                                helperText={formik.touched.phone && formik.errors.phone}>
                            </TextField>
                        </Grid>
                    </Grid>
                    <TextField
                                label='Identification' 
                                placeholder="Enter your DNI/CC..." 
                                type='number'
                                fullWidth
                                id='identification'
                                name='identification'
                                value={formik.values.identification}
                                onChange={formik.handleChange}
                                error={formik.touched.identification && Boolean(formik.errors.identification) }
                                helperText={formik.touched.identification && formik.errors.identification}>
                            </TextField>
                    <Button type='submit' id='formSubmit' fullWidth variant='contained' sx={{ mt: 3, mb: 2 }} disabled={Boolean(formik.errors.username) || Boolean(formik.errors.username)}>
                        Register Now</Button>
                    <Typography>Have an account? <Link to='/login' style={{textDecoration: 'underline', color:'blue'}}>Go to login!</Link></Typography>
                </Paper>
            </Box>
        </Grid>
    )
}