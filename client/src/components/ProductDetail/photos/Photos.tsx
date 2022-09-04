import { itemData } from '../data';
import { Box } from '@mui/material';
import { ProductPartial } from '../../../sehostypes/Product';
import s from './Photos.module.css';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';

// https://picsum.photos/500/400
export default function Photos({ images, name}: ProductPartial) {
  return (
    <Box sx={{ width: '100%' }} display='grid' justifyContent={'center'}>
      {images !== undefined && (<img className={s.image} src={images[0].image} alt={name}/>)}
      
      <ImageList sx={{ width: '400px', display: 'flex' }}>
  { images?.map((item) => {
    return(
    <ImageListItem key={item.id}>
      <img style={{width: "150px", objectFit: 'contain'}}
        src={item.image}
        srcSet={item.image}
/>    
    </ImageListItem>
  )}) }
      </ImageList>
    </Box>
  );
}
