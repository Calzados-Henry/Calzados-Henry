'use strict'
// se requiere el models
import { Router, Request, Response } from 'express';
import { getImages, createImages, updateImages, deleteImages } from '../controllers/Images';
const router = Router();

router.get('/', async (_req: Request, res: Response) => {
  try {
    var images: string = await getImages();
    res.json(images)
  } catch (e: any) {
    res.json({ error: e.message })
  }
})
router.post('/', async (req: Request, res: Response) => {
  try {
    var nImages: string = await createImages(req.body)
    res.json(nImages)
  } catch (e: any) {
    res.json({ error: e.message })
  }
})
router.put('/', async (req: Request, res: Response) => {
  try {
    var putImages: string = await updateImages(req.body)
    res.json(putImages)
  } catch (e: any) {
    res.json({ error: e.message })
  }
})
router.delete('/', async (req: Request, res: Response) => {
  try {
    var delImages: string = await deleteImages(req.body.id)
    res.json(delImages)
  } catch (e: any) {
    res.json({ error: e.message })
  }
})
export default router;