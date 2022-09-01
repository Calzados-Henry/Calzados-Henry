import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

export default function ButtonsGroup() {
  return (
    <Box
      mt={2}
      sx={{
        width: 500,
        maxWidth: '100%',
      }}>
      <TextField
        fullWidth
        id='outlined-number'
        label='Cant'
        type='number'
        aria-valuemin={1}
        InputLabelProps={{
          shrink: true,
        }}
      />
    </Box>
  );
}
