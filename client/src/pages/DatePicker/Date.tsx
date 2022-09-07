import * as React from 'react';
import dayjs, { Dayjs } from 'dayjs';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';

export default function MaterialUIPickers() {
  const [value, setValue] = React.useState<Dayjs | null>(
    dayjs('00-00-0000'),
  );

  const handleChange = (newValue: Dayjs | null) => {
    setValue(newValue);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Stack spacing={3}>
        <DesktopDatePicker
          label="Birth Date"
          inputFormat="DD/MM/YYYY"
          value={value}
          onChange={handleChange}
          renderInput={(params) => <TextField {...params} />}
        />
      </Stack>
    </LocalizationProvider>
  );
}

//EJEMPLOS PARA APLICAR EN OTRAS PARTES
{/* 
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';

<MobileDatePicker
label="Date mobile"
inputFormat="MM/DD/YYYY"
value={value}
onChange={handleChange}
renderInput={(params) => <TextField {...params} />}
/>
<TimePicker
label="Time"
value={value}
onChange={handleChange}
renderInput={(params) => <TextField {...params} />}
/>
<DateTimePicker
label="Date&Time picker"
value={value}
onChange={handleChange}
renderInput={(params) => <TextField {...params} />}
/> */}