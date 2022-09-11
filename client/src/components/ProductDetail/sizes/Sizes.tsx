import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Typography from '@mui/material/Typography';
export default function Sizes({details}) {
  const [size, setSize] = React.useState( { 
      value: {
      size: '',
      stock: 0
    
  }});

  const handleChange = (event: SelectChangeEvent) => {
    setSize({...size, [event.target.name]: event.target.value});
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <Typography sx={{marginBottom: 2}} id='keep-mounted-modal-title' variant='h5' component='h2' pt={1}>
        <span>Stock:</span> <span style={{ fontWeight: 100 }}>{size.value.stock !== 0 && size.value.stock}</span>
      </Typography>
      <FormControl fullWidth>
        <InputLabel id='demo-simple-select-label'>Size</InputLabel>
       <Select
          labelId='demo-simple-select-label'
          id='demo-simple-select'
          name='value'
          value={size.value}
          label='size'
          onChange={handleChange}>
       { details.sizes.map( (item, index) => {
     return (
            <MenuItem key={index} value={item} >{item.size}</MenuItem>
          
        )})}
        </Select>
      </FormControl>
    </Box>
  );
}
