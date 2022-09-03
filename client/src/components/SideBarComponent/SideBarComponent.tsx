import React, { useState } from 'react';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';

import { StarBorder, ExpandMore, ExpandLess } from '@mui/icons-material';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import TuneIcon from '@mui/icons-material/Tune';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import PriceChangeIcon from '@mui/icons-material/PriceChange';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';

import MenuIcon from '@mui/icons-material/Menu';
import { IconButton, Drawer, Button, useTheme, Box, TextField } from '@mui/material';

const talles: number[] = [32, 34, 36, 44, 48, 50];

interface State {
  initialValue: number;
  finalValue: number;
}

export default function SideBarComponent() {
  const theme = useTheme();
  const [open, setOpen] = useState(false);

  const [openMenuPrices, setOpenMenuPrices] = useState(false);
  const [openMenuFilter, setOpenMenuFilter] = useState(false);
  const [openMenuRating, setOpenMenuRating] = useState(false);
  const [rating, setRating] = useState<number | null>(0);
  const [amount, setAmount] = useState<State>({
    initialValue: 0,
    finalValue: 0,
  });

  const [talla, setTalla] = useState<number>();

  const handleChangeTalla = (e: any) => {
    setTalla(Number(e.target.value));
    console.log(talla);
  };

  const applyFilters = () => {
    const data = {
      talla,
      rating,
      amount,
    };
    console.log(data);

    cleanData();
  };

  const cleanData = () => {
    setRating(0);
    setAmount({
      initialValue: 0,
      finalValue: 0,
    });
    setTalla(0);

    setOpenMenuPrices(false);
    setOpenMenuFilter(false);
    setOpenMenuRating(false);

    setTimeout(() => setOpen(false) , 1100)
  };

  const handleChangeAmount =
    (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setAmount({ ...amount, [prop]: Number(event.target.value) });
    };

  const handleClickPrices = () => {
    setOpenMenuPrices(!openMenuPrices);
  };
  const handleClickFilter = () => {
    setOpenMenuFilter(!openMenuFilter);
  };

  const handleClickRating = () => {
    setOpenMenuRating(!openMenuRating);
  };

  return (
    <IconButton size='large' edge='start' color='inherit' aria-label='open drawer' sx={{ mr: 2 }}>
      <MenuIcon onClick={() => setOpen(true)} />
      <Drawer
        variant='temporary'
        anchor='left'
        open={open}
        onClose={() => setOpen(false)}
        sx={{ minWidth: 300 }}>
        <Box textAlign='center' width='300px'>
          <List
            sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
            component='nav'
            aria-labelledby='nested-list-subheader'
            subheader={
              <ListSubheader component='div' id='nested-list-subheader'>
                SideBar
              </ListSubheader>
            }>
            <ListItemButton onClick={handleClickFilter} autoFocus={false}>
              <ListItemIcon>
                <TuneIcon />
              </ListItemIcon>
              <ListItemText primary='Filtrar por talla' />
              {openMenuFilter ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>

            <Collapse in={openMenuFilter} timeout='auto' unmountOnExit>
              <List component='div' disablePadding>
                <ListItemButton sx={{ pl: 4 }} autoFocus={false}>
                  <FormGroup>
                    {talles?.map(e => (
                      <div key={e}>
                        <Box textAlign='center' key={e}>
                          <FormControlLabel
                            control={<Checkbox checked={talla === e ? true : false} />}
                            value={e}
                            onClick={handleChangeTalla}
                            label={`Talle: ${e}`}
                          />
                        </Box>
                      </div>
                    ))}
                  </FormGroup>
                </ListItemButton>
              </List>
            </Collapse>

            <ListItemButton onClick={handleClickPrices} autoFocus={false}>
              <ListItemIcon>
                <PriceChangeIcon />
              </ListItemIcon>
              <ListItemText primary='Filtrar por precio' />
              {openMenuPrices ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>

            <Collapse in={openMenuPrices} timeout='auto' unmountOnExit>
              <List component='div' disablePadding>
                <ListItemButton sx={{ pl: 4 }} autoFocus={false}>
                  <ListItemIcon>
                    <Box
                      component='form'
                      sx={{
                        '& > :not(style)': { m: 1, width: '25ch' },
                        display: 'flex',
                        flexDirection: 'column',
                      }}
                      textAlign='center'
                      noValidate
                      autoComplete='off'>
                      <FormControl fullWidth sx={{ m: 1 }}>
                        <InputLabel htmlFor='outlined-adornment-amount' color='info'>
                          Valor Inicial
                        </InputLabel>
                        <OutlinedInput
                          id='outlined-adornment-amount'
                          value={amount.initialValue}
                          onChange={handleChangeAmount('initialValue')}
                          startAdornment={<InputAdornment position='start'>$</InputAdornment>}
                          label='initialValue'
                          color='info'
                        />
                      </FormControl>

                      <FormControl fullWidth sx={{ m: 1 }}>
                        <InputLabel htmlFor='outlined-adornment-amount' color='info'>
                          Valor Final
                        </InputLabel>
                        <OutlinedInput
                          id='outlined-adornment-amount'
                          value={amount.finalValue}
                          onChange={handleChangeAmount('finalValue')}
                          startAdornment={<InputAdornment position='start'>$</InputAdornment>}
                          label='finalValue'
                          color='info'
                        />
                      </FormControl>
                    </Box>
                  </ListItemIcon>

                  <ListItemText />
                </ListItemButton>
              </List>
            </Collapse>
          </List>

          <ListItemButton onClick={handleClickRating} autoFocus={false}>
            <ListItemIcon>
              <TuneIcon />
            </ListItemIcon>
            <ListItemText primary='Filtrar por Rating' />
            {openMenuRating ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>

          <Collapse in={openMenuRating} timeout='auto' unmountOnExit>
            <List component='div' disablePadding>
              <ListItemButton sx={{ pl: 4 }} autoFocus={false}>
                <Box textAlign='center'>
                  <Typography component='legend'>Selecciona un rating</Typography>
                  <Rating
                    name='simple-controlled'
                    value={rating}
                    onChange={(event, newValue) => {
                      setRating(newValue);
                    }}
                  />
                </Box>
              </ListItemButton>
            </List>
          </Collapse>

          <Button variant='contained' onClick={applyFilters} sx={{ mt: 2 }}>
            Aplicar Filtros
          </Button>
        </Box>
      </Drawer>
    </IconButton>
  );
}
