import { ExpandLess, ExpandMore } from '@mui/icons-material';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import MenuIcon from '@mui/icons-material/Menu';
import PaidIcon from '@mui/icons-material/Paid';
import PriceChangeIcon from '@mui/icons-material/PriceChange';
import { Box, Button, Drawer, IconButton, TextField } from '@mui/material';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Collapse from '@mui/material/Collapse';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Paper from '@mui/material/Paper';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Tooltip from '@mui/material/Tooltip';
import Zoom from '@mui/material/Zoom';
import { FormikValues, useFormik } from 'formik';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useGetProductsQuery } from '../../features/product/productApiSlice';
import {
  filtProducts,
  setProducts, sortProducts
} from '../../features/product/productSlice';
  



// const talles: number[] = [32, 34, 36, 44, 48, 50];
/* 
interface State {
  initialValue: number;
  finalValue: number;
}
 */


export default function SideBarComponent() {
 // const theme = useTheme();
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const [disable, setDisable] = useState(false)
  const [category, setCategory] = React.useState('');
  const [season, setSeason] = React.useState('');
const { data } = useGetProductsQuery();
const [gender, setGender] = React.useState('')
const navigate = useNavigate();
const [openMenu, setOpenMenu ] = useState(false)
const [openMenuPrices, setOpenMenuPrices] = useState(false);

/* const [rating, setRating] = useState<number | null>(0);
const [amount, setAmount] = useState<State>({
    initialValue: 0,
    finalValue: 0,
  }); */
  
  const errors = {
    price: ''
  }
   const validacion2 = (validar: FormikValues) => {
    const error = {
      base: '',
      top: '',
      errorBase: false,
      errorTop: false
    };
    if ( Number(validar[0].valor.base) > Number(validar[0].valor.top)) {
      error.base = 'El minimo no puede ser mayor que el maximo!'
      error.errorBase = true
    }
    else if(Number(validar[0].valor.base) !== 0 && (Number(validar[0].valor.base) === Number(validar[0].valor.top))){
      error.top = 'El maximo no puede ser igual que el minimo!'
      error.errorTop = true
    }
    return error 
  }
  const validacion = (validar: FormikValues) => {
    if ( Number(validar[0].valor.base) !== 0 ? (Number(validar[0].valor.base) >= Number(validar[0].valor.top)) : (Number(validar[0].valor.base) > Number(validar[0].valor.top)) ) {
      errors.price = 'El minimo no puede ser mayor que el maximo Pone voluntad!'
    }
     errors.price.length > 0 ? setDisable(true) : setDisable(false);
  }
  const formik = useFormik({
    initialValues: [ {
      clave: 'price',
      valor: {
        base: 0,
        top: 0,
      }
    }, {
      clave: 'Category',
      valor: ''
    },
    {
      clave: 'season',
      valor: ''
    },
    {
      clave: 'gender',
      valor: ''
    }
  ],
  
    onSubmit: (values) => {
      dispatch(filtProducts(values));
      navigate('/products');
      setOpen(false);
      setOpenMenu(false)
    },
  });
  
  const handleChangeCategory = (event: SelectChangeEvent) => {
    setCategory(event.target.value)
    event.target.value === 'Todas las categorias' ? (formik.values[1].valor = '') :   (formik.values[1].valor = event.target.value)
  };
  const handleChangeSeason = (event: SelectChangeEvent) => {
    setSeason(event.target.value)
    event.target.value === 'Todas las Temporadas' ? (formik.values[2].valor = '') :  (formik.values[2].valor = event.target.value)
  };
  const handleChangeGender = (event: SelectChangeEvent) => {
    setGender(event.target.value)
    event.target.value === 'Todos los Generos' ? (formik.values[3].valor = '') :  (formik.values[3].valor = event.target.value)
  };
  const [price, setPrice] = useState({
    base: 0,
    top:0
  });
  React.useEffect(() => {
    validacion(formik.values)
    if (!openMenuPrices){
      setPrice({base:0, top: 0});
     ( typeof formik.values[0].valor === "object") && (formik.values[0].valor.base = 0);
    ( typeof formik.values[0].valor === "object") && (formik.values[0].valor.top = 0)
    } 

  },[price.base, price.top, openMenuPrices])
  
  const handleOnChangePrice =  (e:  React.ChangeEvent<HTMLTextAreaElement>) => {
 typeof e.currentTarget.value === 'number' && isNaN(e.currentTarget.value) ? setPrice({...price, [e.currentTarget.name]: 0} ) :
  setPrice({...price, [e.currentTarget.name]: Number(e.currentTarget.value)} )
 typeof formik.values[0].valor === 'object' && ( e.currentTarget.name === 'base' ||e.currentTarget.name === 'top') && (formik.values[0].valor[e.currentTarget.name] = Number(e.currentTarget.value)) 
   
}
const handleClick = () => {
    setOpenMenu(!openMenu)
  };
  

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
//
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
        sx={{ minWidth: 300}}>
        <Box textAlign='center' width='300px' sx={{position: 'inherit', top: '7%', bgcolor:'white', borderEndEndRadius: 10}}>

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

       
          <ListItemButton onClick={handleClick} autoFocus={false}>
            <ListItemIcon>
              <FilterAltIcon />
            </ListItemIcon>
            <ListItemText primary='Filtros' />
            {openMenu ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>

          <Collapse in={openMenu} timeout='auto' unmountOnExit>
            <List component='div' disablePadding>
              <Box
                component='form'
                noValidate
                onSubmit={formik.handleSubmit}
                sx={{  display: 'flex', flexDirection: 'column', gap: 0.5, mr: 1, ml: 1 }}>
          <Tooltip
            title='Cerrar si no se quiere filtrar por precio'
            TransitionComponent={Zoom}
            sx={{ x: 1  }}
            arrow>
          <ListItemButton onClick={handleClickPrices} autoFocus={false}>
            <ListItemIcon>
              <PriceChangeIcon />
            </ListItemIcon>
            <ListItemText primary='Precio' sx={{padding: 0}} />
            {openMenuPrices ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          </Tooltip>
                  <Collapse in={openMenuPrices} timeout='auto' unmountOnExit>
                    <Box
                component='form'
                noValidate
                onSubmit={formik.handleSubmit}
                sx={{  display: 'flex', flexDirection: 'column', gap: 0.5, mr: 1, ml: 1 }}>
                  <PaidIcon sx={{position: 'relative', top: 45, left: 10}} />
                <TextField
                sx={{maxWidth:200, alignSelf: 'center',}}
                  autoComplete='off'
                  name='base'
                  required
                  fullWidth
                  id='base'
                  label='Minimo'
                  autoFocus
                  value={price.base}
                  onChange={handleOnChangePrice}
                  error={validacion2(formik.values).errorBase }
                  helperText={validacion2(formik.values).base}
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
                  onChange={handleOnChangePrice}
                  error={(validacion2(formik.values).errorTop)}
                  helperText={validacion2(formik.values).top}
                />
                </Box>
                </Collapse>
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
          <MenuItem value={"Winter"}>Invierno</MenuItem>
          <MenuItem value={'Fall'}>Otoño</MenuItem>
          <MenuItem value={'Spring'}>Primavera</MenuItem>
        </Select>
        </FormControl>
         <FormControl sx={{marginTop: 2}}>
        <InputLabel id="gender">Genero</InputLabel>
        <Select
          labelId="gender"
          id="gender"
          value={gender}
          label="Genero"
          
          onChange={handleChangeGender}
        >
          <MenuItem value={'Todos los Generos'}>Todos los Generos</MenuItem>
          <MenuItem value={'Female'}>Femenino</MenuItem>
          <MenuItem value={"Male"}>Masculino</MenuItem>
          <MenuItem value={'Unisex'}>Unisex</MenuItem>
        </Select>
        </FormControl>
      
                <Button type='submit' disabled={disable} fullWidth variant='contained' sx={{ mt: 3, mb: 2 }}>
                  Submit
                </Button>
              </Box>
            </List>
      <Tooltip
            title='Se usa para hacer un nuevo filtrado'
            TransitionComponent={Zoom}
            sx={{ x: 1  }}
            arrow>
          <Button
              variant='contained'
              sx={{ mt: 2, marginBottom: 5 }}
              onClick={() => {
              data !== undefined && dispatch(setProducts(data));
              }}>
              Reset
          </Button>
      </Tooltip>
          </Collapse>
            
         
        </Box>
      </Drawer>
    </>
  );
}

