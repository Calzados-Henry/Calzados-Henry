import Box from '@mui/material/Box';
import styles from './ProductDetail.module.css';
import Sizes from './sizes/Sizes';
import Cant from './cant/Cant';
import AddCartButton from './addCartButton/AddCartButton';
import Ratings from './ratings/Ratings';
import Photos from './photos/Photos';
import Description from './description/Description';
import ProductModal from './ProductModal';

export default function ProductDetail() {
  return (
    <Box className={styles.productDetail}>
      <Box className={styles.left}>
        <Photos></Photos>
      </Box>
      <Box className={styles.right}>
        <Description></Description>
        <Sizes></Sizes>
        <Cant></Cant>
        <AddCartButton></AddCartButton>
        <Ratings></Ratings>
        <ProductModal></ProductModal>
      </Box>
    </Box>
  );
}
