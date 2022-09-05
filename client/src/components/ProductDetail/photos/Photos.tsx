import { itemData } from '../data';
import { Box } from '@mui/material';
import { ProductPartial } from '../../../sehostypes/Product';
import s from './Photos.module.css';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';

// https://picsum.photos/500/400

export default function Photos({ images }: ProductPartial) {
  let content;
  if (images?.length) {
    content = (
      <>
        <img className={s.image} src={images[0].image} alt={images[0].image} />
        <ImageList sx={{ width: '400px', display: 'flex', minHeight: 150, height: 'auto' }}>
          {images.slice(1).map(item => (
            <ImageListItem key={item.id}>
              <img
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
