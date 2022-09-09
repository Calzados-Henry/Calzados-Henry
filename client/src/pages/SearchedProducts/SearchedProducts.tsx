import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { resetSearch } from '../../features/product/productSlice';
import { RootState } from '../../store';
import { Box } from '@mui/material';
import Card from '../../components/Card/Card';
import { useNavigate } from 'react-router-dom';
import { PublicRoutes } from '../../routes/routes';

const SearchedProducts = () => {
  const products = useSelector((state: RootState) => state.products.searchResult);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!products.length) navigate(PublicRoutes.products);
  }, [products]);

  return (
     <Box textAlign='center'>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
        {products?.map((e: any) => (
          <div key={e.id}>
            <Card id={e.id} name={e.name} images={e.images} price={e.price}></Card>
          </div>
        ))}
      </div>
    </Box>
  );
};

export default SearchedProducts;
