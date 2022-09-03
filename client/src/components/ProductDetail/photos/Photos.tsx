import { itemData } from '../data';
import { Box } from '@mui/material';
import { ProductPartial } from '../../../sehostypes/Product';
import s from './Photos.module.css';

// https://picsum.photos/500/400
export default function Photos({ image, title }: ProductPartial) {
  return (
    <Box sx={{ width: '100%' }} display='grid' justifyContent={'center'}>
      <img className={s.image} src={image} alt={title}></img>
    </Box>
  );
}
