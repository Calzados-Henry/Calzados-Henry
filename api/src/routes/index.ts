import { Router, Request, Response } from 'express';
/* const Users = require('./routes/Users') */
import usersRouter from './Users'

const router = Router();

router.get('/', (_req: Request, res: Response) => {
  res.send("todo ok");
})


router.use('/Users', usersRouter)

export default router

/* module.exports = router;
 */