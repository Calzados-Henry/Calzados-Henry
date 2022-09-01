import Carousel from 'react-material-ui-carousel';
import style from './Carrousel.module.css';
import { items } from './data';
import Item from './Item/Item';

export default function Carouselv2() {
  return (
    <>
      <div className={style.container}>
        <div className={style.carrousel}>
          <Carousel navButtonsAlwaysVisible fullHeightHover={true}>
            {items.map((item, i) => (
              <Item
                key={i}
                title={item.name}
                description={item.description}
                image={item.image}></Item>
            ))}
          </Carousel>
        </div>
      </div>
    </>
  );
}
