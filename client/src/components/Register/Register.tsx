import { Grid, Paper, Avatar, TextField, Button, Box, Typography, FormControlLabel, Checkbox } from "@mui/material"
import { LockOutlined } from "@mui/icons-material"
import { Link, useNavigate } from "react-router-dom";
import { ErrorMessage, useFormik } from 'formik';
import * as yup from 'yup';
import { useState } from "react";

const validations = yup.object().shape({
  email: yup.string().email('Enter a valid email').required('Email is required'),
  username: yup.string().required('Username is required'),
  password: yup.string().required('Password is required'),
});

export default function Register() {
    const paperstyle = {padding:20, height: '70vh', width:400, margin:"100px auto"}
    const navigate = useNavigate();
    const [errorSubmit, setErrorSubmit] = useState({
        errorEmail: '',
        errorPassword: '',
        errorUserName: ''
    })

    const formik = useFormik({
        initialValues: {
        username: '',
        email: '',
        password: '',
        },
        validationSchema: validations,
        onSubmit: () => {
        fetch('http://localhost:3001/users/')
            .then(response => response.json())
            .then(data => {
                const userValidate = data.find((user: { email: string; }) => user.email === formik.values.email)
                if(!userValidate) {
                    setErrorSubmit({...errorSubmit, errorEmail: 'That email is not registered yet'})
                }
                else {
                    if(userValidate.password === formik.values.password) console.log('Login complete')
                    else setErrorSubmit({...errorSubmit, errorPassword: ' Invalid password '})
                }
            })
            .catch(error => console.log(error))
        },
    });


    return (
        <Grid alignContent={'center'}>
            <Box component='form' noValidate onSubmit={formik.handleSubmit} sx={{ mt: 3 }}>
                <Paper elevation={10} style={paperstyle}>
                    <Grid>
                        <Avatar sx={{bgcolor:'primary.main'}}><LockOutlined/></Avatar>
                        <h2>Register here</h2>
                    </Grid>
                    <TextField
                        sx={{marginTop: 5}} 
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
                        sx={{marginTop: 5, marginBottom:5}} 
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
                        sx={{marginBottom:5}}
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
                    
                    <Button type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2 }}>Register Now</Button>
                    <Typography>Have an account? <Link to='/login' style={{textDecoration: 'underline', color:'blue'}}>Go to login!</Link></Typography>
                </Paper>
            </Box>
        </Grid>
    )
}