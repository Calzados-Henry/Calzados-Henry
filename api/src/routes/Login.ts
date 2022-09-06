'use strict'
// se requiere el models
import { Router, Request, Response } from 'express';
import { login } from '../controllers/Login';

const router = Router();

router.post('/', async (req: Request, res: Response) => {
  try {
    var response: any = await login(req.body);
    res.json(response)
  } catch (e: any) {
    res.json({ error: e.message })
  }
})

export default router;