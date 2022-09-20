import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { resetSearch } from '../../features/product/productSlice';
import { RootState } from '../../store';
import { Box, Button } from '@mui/material';
import Card from '../../components/Card/Card';
import { useNavigate } from 'react-router-dom';
import { PublicRoutes } from '../../routes/routes';
import { Toaster } from 'react-hot-toast';

const SearchedProducts = () => {
  const products = useSelector((state: RootState) => state.products.searchResult);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [touched, setTouched] = useState('')
  
  const leftToast = document.getElementById(touched)?.getBoundingClientRect()?.x
  const topToast = document.getElementById(touched)?.getBoundingClientRect()?.top
  
  const handleClick = () => {
    dispatch(resetSearch());
    navigate(PublicRoutes.products);
  }
  

  return (
    <Box textAlign='center'>
    {products ?
    <>
       <Toaster
             toastOptions={{duration: 500}}
             containerStyle={{position:'fixed', top: topToast && (topToast + 30), left: leftToast && (leftToast - 150), inset:'unset', width:300}}
           />
      <Button variant='contained' onClick={handleClick}>Back</Button>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
        {products?.map((e: any) => (
          <div key={e.id}>
            <Card 
              id={e.id} 
              name={e.name} 
              description={e.description} 
              details={e.details} 
              sell_price={e.sell_price} 
              addTouched={(id:string) => setTouched(id)}
            ></Card>
          </div>
        ))}
      </div>
    </> :
      <p>No se han hallado resultados</p>
    }
    </Box>
  );
};

export default SearchedProducts;
