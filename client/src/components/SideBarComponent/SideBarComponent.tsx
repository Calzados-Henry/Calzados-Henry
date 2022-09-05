import React, { useState } from 'react';

import { useNavigate } from 'react-router-dom';

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
import Grid from '@mui/material/Grid';

import ListIcon from '@mui/icons-material/List';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Stack from '@mui/material/Stack';
import { useDispatch } from 'react-redux';
import {
  sortProducts,
  filtProductsByCategory,
  filtProductsByPrice,
  reset,
} from '../../features/product/productSlice';

import MenuIcon from '@mui/icons-material/Menu';
import { IconButton, Drawer, Button, useTheme, Box, TextField } from '@mui/material';

import { useFormik } from 'formik';
import * as yup from 'yup';

const talles: number[] = [32, 34, 36, 44, 48, 50];

interface State {
  initialValue: number;
  finalValue: number;
}

const validations = yup.object({
  base: yup
    .number()
    .min(0, 'No se pueden ingresar valores negativos')
    .required('El valor debe ser mayor a 0'),
  top: yup.number().required('Debe tener un valor máximo de busqueda'),
});

export default function SideBarComponent() {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [openMenuPrices, setOpenMenuPrices] = useState(false);
  const [openMenuFilter, setOpenMenuFilter] = useState(false);
  const [openMenuRating, setOpenMenuRating] = useState(false);
  const [rating, setRating] = useState<number | null>(0);
  const [amount, setAmount] = useState<State>({
    initialValue: 0,
    finalValue: 0,
  });

  const formik = useFormik({
    initialValues: {
      base: 0,
      top: 0,
    },
    validationSchema: validations,
    onSubmit: values => {
      dispatch(filtProductsByPrice(values));
      navigate('/products');
      setOpen(false);
    },
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

    setTimeout(() => setOpen(false), 1100);
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

  //PRUEBA DE FUNCIONALIDAD
  const anchorRef = React.useRef<HTMLButtonElement>(null);

  // const handleToggle = () => {
  //   setOpen(prevOpen => !prevOpen);
  // };

  const handleClose = (event: Event | React.SyntheticEvent) => {
    if (anchorRef.current && anchorRef.current.contains(event.target as HTMLElement)) {
      return;
    }
    // setOpen(false);
  };

  const sort = (event: Event | React.SyntheticEvent, sortType: string) => {
    dispatch(sortProducts(sortType));
    handleClose(event);

    setTimeout(() => {
      setOpen(false);
      navigate('/products');
    }, 500);
  };

  function handleListKeyDown(event: React.KeyboardEvent) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === 'Escape') {
      setOpen(false);
    }
  }
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
          {/* <List
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
          </Collapse> */}

          <Paper>
            <ClickAwayListener onClickAway={handleClose}>
              <MenuList
                autoFocusItem={open}
                id='composition-menu'
                aria-labelledby='composition-button'
                onKeyDown={handleListKeyDown}>
                <MenuItem
                  onClick={e => {
                    sort(e, 'lowerPrice');
                  }}>
                  Lower Price
                </MenuItem>

                <MenuItem
                  onClick={e => {
                    sort(e, 'higherPrice');
                  }}>
                  Higher Price
                </MenuItem>

                <MenuItem
                  onClick={e => {
                    sort(e, 'nameAZ');
                  }}>
                  By name AZ
                </MenuItem>

                <MenuItem
                  onClick={e => {
                    sort(e, 'nameZA');
                  }}>
                  By name ZA
                </MenuItem>
                <MenuItem
                  onClick={e => {
                    sort(e, 'bestSellers');
                  }}>
                  Best sellers
                </MenuItem>
              </MenuList>
            </ClickAwayListener>
          </Paper>

          {/* <Button variant='contained' onClick={applyFilters} sx={{ mt: 2 }}>
            Aplicar Filtros
          </Button> */}
          <ListItemButton onClick={handleClickPrices} autoFocus={false}>
            <ListItemIcon>
              <PriceChangeIcon />
            </ListItemIcon>
            <ListItemText primary='Filtrar por precio' />
            {openMenuPrices ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>

          <Collapse in={openMenuPrices} timeout='auto' unmountOnExit>
            <List component='div' disablePadding>
              <Box
                component='form'
                noValidate
                onSubmit={formik.handleSubmit}
                sx={{ mt: 3, display: 'flex', flexDirection: 'column', gap: 3, mr: 1, ml: 1 }}>
                <TextField
                  autoComplete='given-name'
                  name='base'
                  required
                  fullWidth
                  id='base'
                  label='Initial Value'
                  autoFocus
                  value={formik.values.base}
                  onChange={formik.handleChange}
                  error={formik.touched.base && Boolean(formik.errors.base)}
                  helperText={formik.touched.base && formik.errors.base}
                />

                <TextField
                  required
                  fullWidth
                  id='top'
                  label='Final Value'
                  name='top'
                  autoComplete='family-name'
                  value={formik.values.top}
                  onChange={formik.handleChange}
                  error={formik.touched.top && Boolean(formik.errors.top)}
                  helperText={formik.touched.top && formik.errors.top}
                />

                <Button type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2 }}>
                  Submit
                </Button>
              </Box>
            </List>
          </Collapse>

          <Paper>
            <ClickAwayListener onClickAway={handleClose}>
              <MenuList
                autoFocusItem={open}
                id='composition-menu'
                aria-labelledby='composition-button'
                onKeyDown={handleListKeyDown}>
                <MenuItem
                  onClick={() => {
                    dispatch(filtProductsByCategory('Botas'));
                    navigate('/products');
                    setOpen(false);
                  }}>
                  Botas
                </MenuItem>

                <MenuItem
                  onClick={() => {
                    dispatch(filtProductsByCategory('Mocasines'));
                    navigate('/products');
                    setOpen(false);
                  }}>
                  Mocasines
                </MenuItem>

                <MenuItem
                  onClick={() => {
                    dispatch(filtProductsByCategory('Tenis'));
                    navigate('/products');
                    setOpen(false);
                  }}>
                  Tenis
                </MenuItem>

                <MenuItem
                  onClick={() => {
                    dispatch(filtProductsByCategory('Sandalias'));
                    navigate('/products');
                    setOpen(false);
                  }}>
                  Sandalias
                </MenuItem>
              </MenuList>
            </ClickAwayListener>
          </Paper>

          <Button variant='contained' sx={{ mt: 3 }} onClick={() => dispatch(reset())}>
            Reset
          </Button>
        </Box>
      </Drawer>
    </IconButton>
  );
}
