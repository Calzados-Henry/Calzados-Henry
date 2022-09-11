import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import PaidIcon from '@mui/icons-material/Paid';
import {  ExpandMore, ExpandLess } from '@mui/icons-material';
import FilterAltIcon  from '@mui/icons-material/FilterAlt';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Paper from '@mui/material/Paper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import { useDispatch } from 'react-redux';
import {
  sortProducts,
  filtProducts,
  reset,
} from '../../features/product/productSlice';

import MenuIcon from '@mui/icons-material/Menu';
import { IconButton, Drawer, Button, Box, TextField } from '@mui/material';

import { useFormik } from 'formik';
/* import * as yup from 'yup'; */

import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

  



// const talles: number[] = [32, 34, 36, 44, 48, 50];
/* 
interface State {
  initialValue: number;
  finalValue: number;
}
 */
/* const validations = yup.object({
  initialValues: yup.array().of(yup.object({
    values: yup.object({
      base: yup.number().min(0, 'No se pueden ingresar valores negativos')
    .required('El valor debe ser mayor a 0'),
  top: yup.number().required('Debe tener un valor máximo de busqueda'),
    })}))
  
  
 
}); */

export default function SideBarComponent() {
 // const theme = useTheme();
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
/* const [openMenuPrices, setOpenMenuPrices] = useState(false) */
  const [disable, setDisable] = useState(true)
  const [category, setCategory] = React.useState('');
  const [season, setSeason] = React.useState('');


const navigate = useNavigate();

const [openMenuPrices, setOpenMenuPrices] = useState(false);

/* const [rating, setRating] = useState<number | null>(0);
const [amount, setAmount] = useState<State>({
    initialValue: 0,
    finalValue: 0,
  }); */

  const formik = useFormik({
    initialValues: [ {
      clave: 'price',
      valor: {
        base: 0,
        top: 0,
      }
    }, {
      clave: 'category',
      valor: ''
    },
    {
      clave: 'season',
      valor: ''
    }
  ],
/*     validationSchema: validations, */
    onSubmit: (values) => {
      dispatch(filtProducts(values));
      console.log("🚀 ~ file: SideBarComponent.tsx ~ line 112 ~ SideBarComponent ~ values", values)
      navigate('/products');
      setOpen(false);
    },
  });
  
  const validacion = (validar) => {
    const errors = {}
    if (validar[0].valor.base >= validar[0].valor.top) {
      errors.price = 'El minimo no puede ser mayor que el maximo Pone voluntad!'
    } else {

      delete errors.price
    }
    if(validar[0].valor.base  <= 0  || validar[0].valor.top <= 0) {
      errors.gratis = 'No vendemos nada gratis y menos pagamos para que te lleves productos'
    }
    else {
      delete errors.gratis

    }
    return errors
  }
  const handleChangeCategory = (event: SelectChangeEvent) => {
    setCategory(event.target.value)
   event.target.value !== 'Todas las categorias' && (formik.values[1].valor = event.target.value)
  };
  const handleChangeSeason = (event: SelectChangeEvent) => {
    setSeason(event.target.value)
   event.target.value !== 'Todas las Temporadas' && (formik.values[2].valor = event.target.value)
  };
  const [price, setPrice] = useState({
    base: 0,
    top:0
  });

const handleOnChangePrice = (e: SelectChangeEvent) => {
   const validar = validacion(formik.values)
   !Object.keys(validar).length ? setDisable(false) : setDisable(true)   
  isNaN(e.target.value) ? setPrice({...price, [e.target.name]: 0} ) :
setPrice({...price, [e.target.name]: (e.target.value)} )
formik.values[0].valor[e.target.name] = e.target.value 
}
  
const handleClickPrices = () => {
    setOpenMenuPrices(!openMenuPrices)
  };

   

 
  // PRUEBA DE FUNCIONALIDAD
  const anchorRef = React.useRef<HTMLButtonElement>(null);

  // const handleToggle = () => {
  //   setOpen(prevOpen => !prevOpen);
  // };

  const handleClose = (event: Event | React.SyntheticEvent) => {
    if (anchorRef.current && anchorRef.current.contains(event.target as HTMLElement)) {
      
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
    <>
      <IconButton
        onClick={() => setOpen(true)}
        size='large'
        edge='start'
        color='inherit'
        aria-label='open drawer'
        sx={{ mr: 2 }}>
        <MenuIcon />
      </IconButton>
      <Drawer
        variant='temporary'
        anchor='left'
        open={open}
        onClose={() => setOpen(false)}
        sx={{ minWidth: 300 }}>
        <Box textAlign='center' width='300px'>

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

       
          <ListItemButton onClick={handleClickPrices} autoFocus={false}>
            <ListItemIcon>
              <FilterAltIcon />
            </ListItemIcon>
            <ListItemText primary='Filtros' />
            {openMenuPrices ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>

          <Collapse in={openMenuPrices} timeout='auto' unmountOnExit>
            <List component='div' disablePadding>
              <Box
                component='form'
                noValidate
                onSubmit={formik.handleSubmit}
                sx={{  display: 'flex', flexDirection: 'column', gap: 0.5, mr: 1, ml: 1 }}>
                  <PaidIcon sx={{position: 'relative', top: 45, left: 10}} />
                <TextField
                sx={{maxWidth:200, alignSelf: 'center'}}
                  autoComplete='off'
                  name='base'
                  required
                  fullWidth
                  id='base'
                  label='Minimo'
                  autoFocus
                  value={price.base}
                  onChange={(e) => handleOnChangePrice(e)}
                  /* onBlur= {formik.handleBlur} */
                  error={formik.touched[0]?.valor.base && Boolean(formik.errors[0]?.valor.base)}
                  helperText={formik.touched[0]?.valor.base && formik.errors[0]?.valor.base}
                />
<PaidIcon sx={{position: 'relative', top: 45, left: 10}}/>
                <TextField
                sx={{maxWidth:200, alignSelf: 'center'}}
                  required
                  fullWidth
                  id='top'
                  label='Maximo'
                  name='top'
                  autoComplete='off'
                  value={price.top}
                  onChange={(e) => handleOnChangePrice(e)}
                  error={formik.touched[0]?.valor.top && Boolean(formik.errors[0]?.valor.top)}
                  helperText={formik.touched[0]?.valor.top && formik.errors[0]?.valor.top}
                />
                 <FormControl sx={{marginTop: 2}}>
        <InputLabel id="category">Categoría</InputLabel>
        <Select
          labelId="category"
          id="category"
          value={category}
          label="Categoría"
          onChange={handleChangeCategory}
        >
          <MenuItem value={'Todas las categorias'}>Todas las categorias</MenuItem>
          <MenuItem value={'Botas'}>Botas</MenuItem>
          <MenuItem value={'Sandalias'}>Sandalias</MenuItem>
          <MenuItem value={'Mocasines'}>Mocasines</MenuItem>
          <MenuItem value={'Tenis'}>Tenis</MenuItem>
        </Select>
          </FormControl>
          <FormControl sx={{marginTop: 2}}>
        <InputLabel id="season">Temporada</InputLabel>
        <Select
          labelId="season"
          id="season"
          value={season}
          label="Temporada"
          /* sx={{marginTop: 2}} */
          onChange={handleChangeSeason}
        >
          <MenuItem value={'Todas las Temporadas'}>Todas las Temporadas</MenuItem>
          <MenuItem value={'Summer'}>Verano</MenuItem>
          <MenuItem value={'Winter'}>Invierno</MenuItem>
          <MenuItem value={'Fall'}>Otoño</MenuItem>
          <MenuItem value={'Spring'}>Primavera</MenuItem>
        </Select>
        </FormControl>
      
                <Button type='submit' disabled={disable} fullWidth variant='contained' sx={{ mt: 3, mb: 2 }}>
                  Submit
                </Button>
              </Box>
            </List>
          </Collapse>

        
          <Button
            variant='contained'
            sx={{ mt: 3 }}
            onClick={() => {
              dispatch(reset());
              navigate('/products');
              setOpen(false);
            }}>
            Reset
          </Button>
        </Box>
      </Drawer>
    </>
  );
}

