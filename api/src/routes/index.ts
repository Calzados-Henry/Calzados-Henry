import { Router, Request, Response } from 'express';

import Category from './routes/Category';
const Users = require('./routes/Users');
const Size = require('./routes/Size');
const Carrousel = require('./routes/Carrousel');
const Products = require('./routes/Products');
const Orders = require('./routes/Orders');

const router = Router();




router.get('/', (_req: Request, res: Response) => {
  res.send("todo ok");
})

router.use('/users', Users) // jesner
router.use('/size', Size) // jesner
router.use('/carrousel', Carrousel) // jesner
router.use('/products', Products) // jesner
router.use('/orders', Orders) // jesner
router.use('/', Category); // facundo
module.exports = router;
