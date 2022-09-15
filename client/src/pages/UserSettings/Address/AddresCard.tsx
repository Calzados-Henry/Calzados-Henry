import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import HomeIcon from '@mui/icons-material/Home';

export default function AddressCard() {
  const [expanded, setExpanded] = React.useState<string | false>(false);

  const handleChange = (panel: string) => (_event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <>
      <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls='panel1bh-content' id='panel1bh-header'>
          <HomeIcon />
          <Typography sx={{ marginLeft: '1rem', width: '33%', flexShrink: 0 }}>Title</Typography>
          <Typography sx={{ color: 'text.secondary' }}>City</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>Nueva Esparta, Calle Marti Jaramillo, Apto 74</Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls='panel1bh-content' id='panel1bh-header'>
          <HomeIcon />
          <Typography sx={{ marginLeft: '1rem', width: '33%', flexShrink: 0 }}>Home</Typography>
          <Typography sx={{ color: 'text.secondary' }}></Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Nulla facilisi. Phasellus sollicitudin nulla et quam mattis feugiat. Aliquam eget maximus est, id dignissim
            quam.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </>
  );
}
