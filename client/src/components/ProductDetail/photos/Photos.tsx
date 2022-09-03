import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { itemData } from '../data';
import { Box } from '@mui/material';

// https://picsum.photos/500/400
export default function Photos() {
  return (
    <Box>
      <Box sx={{ width: '100%' }}>
        <img
          src={
            'https://i.picsum.photos/id/63/500/400.jpg?hmac=AdMb2SfNVtaxiemyVlmc51Rcm0tKGYJfx7MidERexf0'
          }></img>
      </Box>
      <Box>
        <ImageList sx={{ width: 500, height: 220 }} cols={4} rowHeight={100}>
          {itemData.map(item => (
            <ImageListItem key={item.img}>
              <img src={`${item.img}`} srcSet={`${item.img}`} alt={item.title} loading='lazy' />
            </ImageListItem>
          ))}
        </ImageList>
      </Box>
    </Box>
  );
}
