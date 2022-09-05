import { itemData } from '../data';
import { Box } from '@mui/material';
import { ProductPartial } from '../../../sehostypes/Product';
import s from './Photos.module.css';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import React from 'react'
// https://picsum.photos/500/400

export default function Photos({ images }: ProductPartial) {
  let content;
  const [count,setCount ] = React.useState(0)
  if (images?.length) {
    content = (
      <>
        <img className={s.image} src={images[count].image} alt={images[0].image} />
        <ImageList sx={{ width: '400px', display: 'flex', minHeight: 150, height: 'auto', cursor: 'pointer' }}>
          {images.map(item => (
            <ImageListItem key={item.id}>
              <img
                onClick={() => setCount(item.id-1)}
                src={`${item.image}`}
                alt={`${item.image}`}
                loading='lazy'
                style={{ objectFit: 'contain' }}
              />
            </ImageListItem>
          ))}
        </ImageList>
      </>
    );
  } else {
    <p>Image no Found</p>;
  }

  return (
    <Box sx={{ width: '100%' }} display='grid' justifyContent={'center'}>
      {content}
    </Box>
  );
}
