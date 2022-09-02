import { Router, Request, Response } from 'express';
const Users = require('./routes/Users')
const Size = require('./routes/Size')
const Carrousel = require('./routes/Carrousel')

const router = Router();

router.get('/', (_req: Request, res: Response) => {
  res.send("todo ok");
})

router.use('/users', Users)
router.use('/size', Size)
router.use('/carrousel', Carrousel)

module.exports = router;
