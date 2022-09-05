import React, { useState, useEffect } from 'react';
import Shoe from '../Card/Card';
import { useGetProductsQuery } from '../../features/product/productApiSlice';
import Pagination from '@mui/material/Pagination';
import { ProductPartial } from '../Card/product.model';
import Box from '@mui/material/Box';
const Cards = () => {
  const productsPerPage = 9;
  const [current, setCurrent] = useState({
    first: 0,
    last: productsPerPage,
  });
  useEffect(() => {
    // console.log(current)
  }, [current.first, current.last]);
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>, page: number) => {
    const first = (page - 1) * productsPerPage;
    const last = (page - 1) * productsPerPage + productsPerPage;
    setCurrent({ first, last });
  };
  const { data, error, isLoading, isSuccess } = useGetProductsQuery();
  let content;
  if (isLoading)
    content = <img src='https://i.giphy.com/media/5AtXMjjrTMwvK/giphy.gif' alt='loading' />;
  if (error) content = <h2>Ups hay un error</h2>;
  if (isSuccess) {
    const currentsProducts = data?.slice(current.first, current.last);

    content = (
      <>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
          {currentsProducts.map((shoe: ProductPartial) => (
            <Shoe
              key={shoe.id}
              id={shoe.id}
              name={shoe.name}
              images={shoe.images}
              price={shoe.price}
            />
          ))}
        </div>
        <Box justifyContent={'center'} display={'flex'} marginRight='10px' marginTop='20px'>
          <Pagination count={Math.ceil(data.length / productsPerPage)} onChange={handleOnChange} />
        </Box>
      </>
    );
  }
  return <React.Fragment>{content}</React.Fragment>;
};

export default Cards;
