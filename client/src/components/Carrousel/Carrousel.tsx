import Carousel from 'react-material-ui-carousel';
import style from './Carrousel.module.css';
import { items } from './data';
import Box from '@mui/material/Box';
import Item from './Item/Item';

export default function Carouselv2() {
  return (
    <Carousel navButtonsAlwaysVisible fullHeightHover={true}>
      {items.map((item, i) => (
        <Item key={i} title={item.name} description={item.description} image={item.image}></Item>
      ))}
    </Carousel>
  );
}
