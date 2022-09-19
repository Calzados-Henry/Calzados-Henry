import React, { useState, useEffect } from 'react';
import Shoe from '../Card/Card';
import { useGetProductsQuery } from '../../features/product/productApiSlice';
import Pagination from '@mui/material/Pagination';
import { ProductPartial } from '../../sehostypes/Product';
import Box from '@mui/material/Box';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { setProducts } from '../../features/product/productSlice';
import { Toaster } from 'react-hot-toast';




const Cards = () => {
  const productsPerPage: number = 9;
  const dispatch = useDispatch();
  const products = useSelector((state: RootState) => state.products.allProducts);
  const [page, setPage] = useState(1);
  const [touched, setTouched] = useState('')
  const [current, setCurrent] = useState({
    first: 0,
    last: productsPerPage,
  });

  
  useEffect(() =>{ 
    const newPages = {
      first: (page - 1) * productsPerPage,
      last: ((page - 1) * productsPerPage) + productsPerPage
    }
    setCurrent(newPages);
  }, [page])
  
  const handleOnChange = (e: React.ChangeEvent<unknown>, value: number) => {
    e.preventDefault();
    setPage(value)
  };
  const { data, error, isSuccess} = useGetProductsQuery();
  let content;
  if (error) content = <h2>Ups there is an error</h2>;
   const updateList = () => {
    data !== undefined && dispatch(setProducts(data));
  };

  useEffect(() => {
    if (data) updateList();
  },[data])
  const currentsProducts = products.slice(current.first, current.last);
  
  if(isSuccess) content = (
    <>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
        {currentsProducts?.map((shoe: ProductPartial) => (
            <Shoe
              key={shoe.id}
              id={shoe.id}
              name={shoe.name}
              details={shoe.details}
              sell_price={shoe.sell_price}
              description={shoe.description}
              addTouched = {(id:string) => setTouched(id)}
              />
        ))}
      </div>
      { Math.ceil(products.length / productsPerPage) > 1 && (<Box justifyContent={'center'} display={'flex'} marginRight='10px' marginTop='20px'>
        <Pagination
          count={Math.ceil(products.length / productsPerPage)}
          page={page}
          onChange={handleOnChange}
        />
      </Box>)}
    </>
  );

  const leftToast = document.getElementById(touched)?.getBoundingClientRect()?.x
  const topToast = document.getElementById(touched)?.getBoundingClientRect()?.top
  
  return (  
    <>
      <div style={{position:'relative'}}>
        <Toaster
          toastOptions={{duration: 500}}
          containerStyle={{position:'fixed', top: topToast && (topToast + 30), left: leftToast && (leftToast - 150), inset:'unset', width:300}}
        />
        {content}
      </div>
    </>
  );
};

export default Cards;
