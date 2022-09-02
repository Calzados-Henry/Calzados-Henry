'use strict'
// se requiere el models
import { Router, Request, Response } from 'express';
const { getUsers, createUsers, updateUser, deleteUser } = require('../controllers/Users');
const router = Router();

router.get('/', async (_req: Request, res: Response) => {
  try {
    var users: string = await getUsers();
    res.json(users)
  } catch (e: any) {
    res.json({ error: e.message })
  }
})
router.post('/', async (req: Request, res: Response) => {
  try {
    var nUser: string = await createUsers(req.body)
    res.json(nUser)
  } catch (e: any) {
    res.json({ error: e.message })
  }
})
router.put('/', async (req: Request, res: Response) => {
  try {
    var putUser: string = await updateUser(req.body)
    res.json(putUser)
  } catch (e: any) {
    res.json({ error: e.message })
  }
})
router.delete('/', async (req: Request, res: Response) => {
  try {
    var delUser: string = await deleteUser(req.body.id)
    res.json(delUser)
  } catch (e: any) {
    res.json({ error: e.message })
  }
})
module.exports = router;