'use strict'
// se requiere el models
import { Router, Request, Response, NextFunction } from 'express';
import { login } from '../controllers/Login';

const router = Router();

router.post('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    var response: any = await login(req.body);
    res.json(response)
  } catch (e) {
    next(e)
  }
})

export default router;