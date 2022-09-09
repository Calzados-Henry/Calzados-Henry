import { Grid, Paper, Avatar, TextField, Button, Box, Typography} from "@mui/material"
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useEffect } from "react";
import Swal from 'sweetalert2'

const validations = yup.object().shape({
  name: yup.string().required('Username is required'),
  last_name: yup.string().required('Username is required'),
  username: yup.string().required('Username is required'),
  email: yup.string().email('Enter a valid email').required('Email is required'),
  password: yup.string().required('Password is required').min(8, 'Password length must be of minimun 8 chars'),
  phone: yup.string().min(10, "Minimun number length is 10").max(10, "Maximun number length is 10").required('Number is required'),
  identification: yup.number().nullable(true).required('Number is required'),
  birth_date: yup.date().required('BirthDate is required')
});


export default function Register() {
    const paperstyle = {padding:20, height: '100%', width:450, margin:"100px auto"}
    const navigate = useNavigate();
    const initial = {
        username: '',
        password: '',
        email: '',
        name: '',
        last_name: '',
        phone: '',
        identification: '',
        birth_date: '',
        type_user: 'User'
    }

    useEffect(() => {
        document.getElementById('formSubmit')?.click()
        const user = window.localStorage.getItem('user')
        if(user) {
            window.history.back()
        }
    }, [])

    const formik = useFormik({
        initialValues: initial,
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
            .then(data => {
                console.log(data)
                if(data.username?.includes('existe') || data.email?.includes('existe') || (isNaN(data.identification) && data.identification?.includes('existe'))) {
                    Swal.fire({
                        title: 'Error!',
                        text: data.username || data.email || data.identification,
                        icon: 'error',
                        confirmButtonText: 'Try again!'
                    })
                } else {
                    Swal.fire({
                        title: 'Success!',
                        icon: 'success',
                        text: `You're Registered!, you will be redirect to Login`,
                        showConfirmButton: false,
                        timer: 1000
                    })
                    setTimeout(() => {
                        navigate('/login')
                    }, 1200);
                }
            })
            .catch(error => Swal.fire({
                title: 'Error!',
                text: error.message,
                icon: 'error',
                confirmButtonText: 'Try again!'
            }))
        },
    });


    return  (
        <Grid alignContent={'-webkit-center'}>
            <Box component='form' noValidate={false} onSubmit={formik.handleSubmit} sx={{ mt: 3 }}>
                <Paper elevation={10} style={paperstyle}>
                    <h2>Register here</h2>
                    <Grid container spacing={1}>
                        <Grid item xs={6}>
                            <TextField
                                label='Name' 
                                placeholder="Enter your names..."
                                fullWidth
                                id='name'
                                name='name'
                                value={formik.values.name}
                                onChange={formik.handleChange}
                                error={formik.touched.name && Boolean(formik.errors.name) }
                                helperText={formik.touched.name && formik.errors.name}>
                            </TextField>
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                label='Last Name' 
                                placeholder="Enter your last name..."
                                fullWidth
                                id='last_name'
                                name='last_name'
                                value={formik.values.last_name}
                                onChange={formik.handleChange}
                                error={formik.touched.last_name && Boolean(formik.errors.last_name) }
                                helperText={formik.touched.last_name && formik.errors.last_name}>
                            </TextField>
                        </Grid>
                    </Grid>
                    <TextField
                        label='Username' 
                        sx={{mt:3}}
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
                        <Grid item xs={5}>
                        <TextField
                            sx={{width:'100%'}}
                            id="birth_date"
                            label="Birthdate"
                            type="date"
                            value={formik.values.birth_date}
                            onChange={formik.handleChange}
                            InputLabelProps={{
                            shrink: true,
                            }}
                        />
                        </Grid>
                        <Grid item xs={7}>
                            <TextField
                                label='Phone' 
                                placeholder="Enter phone..." 
                                type="number"
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
                    <Button type='submit' id='formSubmit' fullWidth variant='contained' sx={{ mt: 3, mb: 2 }}>
                        Register Now</Button>
                    <Typography>Have an account? <Link to='/login' style={{textDecoration: 'underline', color:'blue'}}>Go to login!</Link></Typography>
                </Paper>
            </Box>
        </Grid>
    )
}

// disabled={Boolean(formik.errors.username) || Boolean(formik.errors.password) || Boolean(formik.errors.email) || Boolean(formik.errors.name) || Boolean(formik.errors.last_name) || Boolean(formik.errors.phone) || Boolean(formik.errors.identification) || !Boolean(formik.values.birth_date)}