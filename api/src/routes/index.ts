import { Router, Request, Response } from 'express';
const Users = require('./routes/Users')
const Size = require('./routes/Size')

const router = Router();

router.get('/', (_req: Request, res: Response) => {
  res.send("todo ok");
})

router.use('/Users', Users)
router.use('/Size', Size)

module.exports = router;
