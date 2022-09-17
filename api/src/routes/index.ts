import { Router, Request, Response, NextFunction } from 'express';
import Category from './Category';
import Users from './Users';
import Sizes from './Sizes';
import Carrousel from './Carrousel';
import Products from './Products';
import Orders from './Orders';
import Address from './Address';
import Images from './Images';
import Color from './Color';
import Product_details from './Product_details';
import Orders_Details from './Orders_details';
import Search from './SearchBar';
import Login from './Login';
import { send } from './../controllers/NotificationMail';
import Prueba from './Prueba';
import RecoveryPassword from './RecoveryPassword';
import Reviews from './Reviews';

const router = Router();

router.get('/', (_req: Request, res: Response) => {
	res.json({ messagee: '✅ API_ON! ✅' });
});

router.post('/email', async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { email, subject, content } = req.body;
		await send(email, subject, content);
		res.send('mensaje enviado');
	} catch (error) {
		next(error);
	}
});

router.use('/products/search', Search);
router.use('/prueba', Prueba);
router.use('/login', Login);
router.use('/users', Users); // jesner -> aqui mismo esta el Cart_Detail y Favoritos
router.use('/users/address', Address); // facundo
router.use('/carrousel', Carrousel); // jesner
router.use('/category', Category); // facundo
router.use('/products', Products); // jesner
router.use('/products/details', Product_details); // jesner
router.use('/products/details/sizes', Sizes); // jesner
router.use('/products/details/images', Images); // jesner
router.use('/products/details/color', Color); // jesner
router.use('/orders', Orders); // jesner
router.use('/orders/details', Orders_Details);
router.use("/reviews", Reviews); //andres
router.use("/recovery_password", RecoveryPassword); //joel

export default router;

