import { Paper } from '@mui/material';
import style from './Item.module.css';

// Types
type ItemI = { title: string; description: string; image: string };

// Item
export default function Item({ title, image }: ItemI) {
  return (
    <Paper className={style.item}>
      {/* <p>{description}</p> */}
      <img
        className={style.image}
        src={image}
        alt={title}
        style={{ width: '100%', height: '100%' }}></img>
    </Paper>
  );
}
