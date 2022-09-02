import { Router, Request, Response } from 'express';
const Users = require('./routes/Users')

const router = Router();

router.get('/', (_req: Request, res: Response) => {
  res.send("todo ok");
})


router.use('/Users', Users)

module.exports = router;
