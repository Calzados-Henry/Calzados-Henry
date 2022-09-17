import { useDeleteAddressMutation } from '@/features';
import { AddressI } from '@/sehostypes/Address';
import DeleteIcon from '@mui/icons-material/Delete';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import LabelIcon from '@mui/icons-material/Label';
import { Box, Button } from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import { SyntheticEvent, useState } from 'react';
import Swal from 'sweetalert2';

export default function AddressCard({
  id,
  title,
  city,
  country,
  address,
  state,
}: Partial<AddressI>) {
  const [expanded, setExpanded] = useState<string | false>(false);
  const [edit, setEdit] = useState(true);
  const [deleteAddress, { data }] = useDeleteAddressMutation();

  const handleChange = (panel: string) => (_event: SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  const deleteAddFn = (): void => {
    Swal.fire({
      title: `Are you sure?`,
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#412800',
      cancelButtonColor: '#fe4450',
      confirmButtonText: 'Yes, delete it!',
    }).then(result => {
      if (result.isConfirmed) {
        id ? deleteAddress(id) : <></>;
        Swal.fire({
          title: 'Deleted!',
          text: 'Your file has been deleted.',
          icon: 'success',
          confirmButtonColor: '#412800',
        });
      }
    });
  };

  return (
    <>
      <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls='panel1bh-content'
          id='panel1bh-header'>
          <LabelIcon />
          <Typography sx={{ marginLeft: '1rem', width: '33%', flexShrink: 0 }}>{title}</Typography>
          <Typography sx={{ color: 'text.secondary' }}>{city}</Typography>
          {/* <Button onClick={() => setEdit(() => !edit)} color='secondary' startIcon={<EditIcon />}>
            {edit ? <u>edit</u> : <u>close</u>}
          </Button> */}
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant='h6'>
            {country} / {state}
          </Typography>
          <Typography>
            {city} / {address}
          </Typography>
          <Box display={'flex'} width='100%' justifyContent={'flex-end'}>
            <Button color='secondary' onClick={deleteAddFn}>
              <DeleteIcon />
            </Button>
          </Box>
        </AccordionDetails>
      </Accordion>
    </>
  );
}
