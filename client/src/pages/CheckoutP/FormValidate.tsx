import * as yup from 'yup';
import { Box, Grid, TextField, Button } from '@mui/material';
import { Formik, Form, Field, useFormik } from 'formik';

const validations = yup.object();

export default function FormValidate() {
  const formik = useFormik({
    initialValues: [
      {
        key1: 'price',
        value1: {
          base: 'null',
          top: 1,
        },
      },
      {
        key1: 'category',
        value1: '',
      },
      {
        key1: 'season',
        value1: '',
      },
    ],
    validationSchema: validations,
    onSubmit: values => console.log(values),
  });

  console.log(formik.values[0].value1);
  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <TextField
          fullWidth
          id='base'
          name='base'
          label='base'
          type={'number'}
          value={typeof formik.values[0].value1 === 'object' ? formik.values[0].value1.base : ''}
          onChange={formik.handleChange}
          /*           value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email} */
        />
        <TextField
          fullWidth
          id='value1'
          name='value1'
          label='value1'
          type='value1'
          /*       value={formik.values.password}
          onChange={formik.handleChange}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password} */
        />
        <Button color='primary' variant='contained' fullWidth type='submit'>
          Submit
        </Button>
      </form>
    </div>
  );
}
