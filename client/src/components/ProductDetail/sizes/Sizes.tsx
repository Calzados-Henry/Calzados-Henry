import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Typography from '@mui/material/Typography';
import { Size } from '@/sehostypes/Product';

export default function Sizes({sizes, updateSizes}: {sizes: Size[] | undefined, updateSizes: Function}) {
  const [sizeValue, setSizeValue] = React.useState( { 
      value: ''
  });

  const handleChange = (event: SelectChangeEvent) => {
    updateSizes(event.target.value);
    setSizeValue({value: event.target.value})
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <Typography sx={{marginBottom: 2}} id='keep-mounted-modal-title' variant='h5' component='h2' pt={1}>
        <span>Stock:</span> <span style={{ fontWeight: 100 }}>{sizes?.find((el: Size) => el.size === sizeValue.value)?.stock}</span>
      </Typography>
      <FormControl fullWidth>
        <InputLabel id='demo-simple-select-label'>Size</InputLabel>
       <Select
          labelId='demo-simple-select-label'
          id='demo-simple-select'
          name='value'
          value={sizeValue.value}
          label='size'
          onChange={handleChange}>
       { sizes?.map( (item, index) => {
     return (
            <MenuItem key={index} value={item.size} >{item.size}</MenuItem>
          
        )})}
        </Select>
      </FormControl>
    </Box>
  );
}
