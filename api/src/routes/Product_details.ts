'use strict'
// se requiere el models
import { Router, Request, Response } from 'express';
import { getP_Details, createP_Details, updateP_Details, deleteP_Details } from '../controllers/Product_details';
import { userExtractorAdmin } from '../middleware/userExtractor';
const router = Router();

router.get('/', async (_req: Request, res: Response) => {
  try {
    var p_Details = await getP_Details();
    res.json(p_Details)
  } catch (e: any) {
    res.json({ error: e.message })
  }
})
router.post('/', userExtractorAdmin, async (req: Request, res: Response) => {
  try {
    var nP_Details = await createP_Details(req.body)
    res.json(nP_Details)
  } catch (e: any) {
    res.json({ error: e.message })
  }
})
router.put('/', userExtractorAdmin, async (req: Request, res: Response) => {
  try {
    var putP_Details = await updateP_Details(req.body)
    res.json(putP_Details)
  } catch (e: any) {
    res.json({ error: e.message })
  }
})
router.delete('/', userExtractorAdmin, async (req: Request, res: Response) => {
  try {
    var delP_Details = await deleteP_Details(req.body.id)
    res.json(delP_Details)
  } catch (e: any) {
    res.json({ error: e.message })
  }
})
export default router;