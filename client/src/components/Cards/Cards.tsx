import React from 'react'
import Zapato from '../Card/Card';
import { useGetProductsQuery } from '../../features/product/productApiSlice';



const Cards = () => {
    const { data, error, isLoading, isSuccess } = useGetProductsQuery()
    let content;

    if(isLoading) content = <h1>loading....</h1>;
    if (error) content = <h2>Ups hay un error</h2>;
  if (isSuccess) {
  content = (
      <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center'}}>
        {data?.map(shoe => 
            ( <Zapato style={{marginLeft: '10px'}} key={shoe.id} title={shoe.title} image={shoe.image} price={shoe.price} />) 
            
        )}
      </div>
    );
}
    return (<React.Fragment>{content}</React.Fragment>)
    
}

export default Cards