// eslint-disable-next-line no-unused-vars
import React from 'react';
// eslint-disable-next-line no-unused-vars
import { useGetProductsQuery, productsApiSlice } from './productApiSlice';

function ProductApi() {
  // tambien pueden sacar isLoading, isSuccess, isError
  const { data: shoes, error, isLoading, isSuccess } = useGetProductsQuery();
  //   const {
  //     data: shoes,
  //     error,
  //     isLoading,
  //     isSuccess,
  //   } = productsApiSlice.endpoints.getProducts.useQuery();
  // data ? console.log(data) : console.log(error);

  let content;
  if (isLoading) content = <h1>loading....</h1>;
  if (error) content = <h2>Ups hay un error</h2>;
  if (isSuccess) {
    content = (
      <div>
        {shoes?.map(item => (
          <h3 key={item.id}>{item.title}</h3>
        ))}
      </div>
    );
  }
  return <React.Fragment>{content}</React.Fragment>;
}

export default ProductApi;
