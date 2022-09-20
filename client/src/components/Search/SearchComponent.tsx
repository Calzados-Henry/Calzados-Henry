import React, { useEffect, useState } from 'react';
import { styled, alpha } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';

import { Button, InputBase } from '@mui/material';
import { useDispatch } from 'react-redux';
import { setSearchProducts } from '../../features/product/productSlice';
import { useNavigate } from 'react-router-dom';
import { PublicRoutes } from '../../routes/routes';
import { searchProduct } from '../../features/product/searchReducer';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import toast from 'react-hot-toast';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

const SearchComponent = (name: any) => {
  const [search, setSearch] = useState({ product: '' });
  const products = useSelector((state: RootState) => state.products.searchResult);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setSearch({ ...search, [e.target.name]: e.target.value });
  };

  const dispatchSearch = (val: any) => {
    dispatch(searchProduct(val));
  };

  const onClick = () => {
    if (!search.product.length) {
      toast.error(<b>Don't have any character to search</b>);
    } else {
      dispatchSearch(search.product);
    }
  };

  useEffect(() => {
    if (products?.length) navigate(PublicRoutes.searchResult);
  }, [products]);

  return (
    <>
      <Search>
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <StyledInputBase
          placeholder='Search...'
          name={name.name}
          onChange={onChange}
          inputProps={{ 'aria-label': name.name }}
        />
      </Search>
      <Button onClick={onClick} size='small' variant='contained'>
        Search
      </Button>
    </>
  );
};

export default SearchComponent;
