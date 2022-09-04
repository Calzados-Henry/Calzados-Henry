import { Router, Request, Response } from 'express';
import Category from './Category';
import Users from './Users';
import Sizes from './Sizes';
import Carrousel from './Carrousel';
import Products from './Products';
import Orders from './Orders';
import Address from './Address';
import Images from './Images';
import Prueba from './Prueba';
import Color from './Color';
import Product_details from './Product_details';


const router = Router();

router.get('/', (_req: Request, res: Response) => {
  res.send("todo ok");
})

router.use('/prueba', Prueba)
router.use('/users', Users) // jesner
router.use('/carrousel', Carrousel) // jesner
router.use('/products', Products) // jesner
router.use('/products/details', Product_details) // jesner
router.use('/products/details/sizes', Sizes) // jesner
router.use('/products/details/images', Images) // jesner
router.use('/products/details/color', Color) // jesner
router.use('/orders', Orders) // jesner

router.use('/users/address', Address) // facundo
router.use('/category', Category); // facundo

export default router;
