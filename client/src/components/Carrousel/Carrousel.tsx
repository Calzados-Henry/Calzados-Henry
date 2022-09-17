import Carousel from 'react-material-ui-carousel';
import { items } from './data';
import Item from './Item/Item';

export default function Carouselv2() {
  return (
    <Carousel navButtonsAlwaysVisible height={500} stopAutoPlayOnHover={true}>
      {items.map((item, i) => (
        <Item key={i} title={item.name} description={item.description} image={item.image}></Item>
      ))}
    </Carousel>
  );
}
