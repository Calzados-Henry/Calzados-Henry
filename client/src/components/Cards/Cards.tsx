import React, { useState, useEffect } from 'react';
import Shoe from '../Card/Card';
import { useGetProductsQuery } from '../../features/product/productApiSlice';
import Pagination from '@mui/material/Pagination';
import { ProductPartial } from '../../sehostypes/Product';
import Box from '@mui/material/Box';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { setProducts } from '../../features/product/productSlice';
import Sorting from '../SideBarComponent/Sorting/Sorting';

const Cards = () => {
  const productsPerPage = 9;
  const dispatch = useDispatch();
  const products = useSelector((state: RootState) => state.products.allProducts);
  const [current, setCurrent] = useState({
    first: 0,
    last: productsPerPage,
  });

  const updateList = () => {
    data !== undefined && dispatch(setProducts(data));
  };
  useEffect(() => {
    // console.log(current)
  }, [current.first, current.last]);
  const handleOnChange = (e, page: number) => {
    e.preventDefault();
    const first = (page - 1) * productsPerPage;
    const last = (page - 1) * productsPerPage + productsPerPage;
    setCurrent({ first, last });
  };
  const { data, error, isLoading, isSuccess } = useGetProductsQuery();
  let content;
  if (isLoading)
    content = <img src='https://i.giphy.com/media/5AtXMjjrTMwvK/giphy.gif' alt='loading' />;
  if (error) content = <h2>Ups hay un error</h2>;
  if (data) updateList();

  const currentsProducts = products.slice(current.first, current.last);

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
        <Pagination
          count={Math.ceil(products.length / productsPerPage)}
          onChange={handleOnChange}
        />
      </Box>
    </>
  );

  return (
    <>
      {/* <Box>
        <Sorting></Sorting>
      </Box> */}
      {content}
    </>
  );
};

export default Cards;
