"use strict"
// se requiere el models
import { Router, Request, Response } from "express"
import { getOrders, createOrders, updateOrders, deleteOrders, getOrdersUser } from "../controllers/Orders"
import { userExtractorUser } from "../middleware/userExtractor"

const router = Router()

router.get("/", async (_req: Request, res: Response) => {
  try {
    var orders = await getOrders()
    res.json(orders)
  } catch (e: any) {
    res.json({ error: e.message })
  }
})
router.post("/", userExtractorUser, async (req: Request, res: Response) => {
  try {
    var nOrders = await createOrders({ ...req.params, ...req.body })
    res.json(nOrders)
  } catch (e: any) {
    res.status(404).json({ error: e.message })
  }
})
router.put("/", async (req: Request, res: Response) => {
  try {
    var putOrders = await updateOrders(req.body)
    res.json(putOrders)
  } catch (e: any) {
    res.json({ error: e.message })
  }
})
router.delete("/", async (req: Request, res: Response) => {
  try {
    var delOrders = await deleteOrders(req.body.id)
    res.json(delOrders)
  } catch (e: any) {
    res.json({ error: e.message })
  }
})

router.get("/user", userExtractorUser, async (req: Request, res: Response) => {
  try {
    // console.log(req.body)
    var orders = await getOrdersUser(req.params.id)
    return res.json(orders)
  } catch (error) {
    return res.json({ error })
  }
})

export default router
