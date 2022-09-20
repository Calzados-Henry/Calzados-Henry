import express from "express"
import * as orders_details from "../controllers/Orders_details"

const router = express.Router()

router.get("/", async (_req, res) => {
  try {
    const details = await orders_details.getOrders_details()
    if (details) res.send(details)
  } catch (error: any) {
    res.status(400).json({ error: error.message })
  }
})

router.post("/", async (req, res) => {
  try {
    const newOrders_details: any = orders_details.toNewOrder_Detail(req.body)
    const result: any = await orders_details.createOrder_detail(newOrders_details)
    res.json(result)
  } catch (error: any) {
    res.status(400).json({ error: error.message })
  }
})

router.put("/", async (req, res) => {
  try {
    /* const updateOrders_details: any = orders_details.toUpdateOrder_Detail(req.body) */
    const updateOrders_details: any = await orders_details.updateOrder_Detail(req.body)
    res.json(updateOrders_details)
  } catch (error: any) {
    res.status(400).json({ error: error.message })
  }
})

router.get("/:orderId", async (req, res) => {
  try {
    const detail = await orders_details.getOrderDetail(req.params.orderId)
    if (detail) return res.send(detail)
  } catch (error) {
    return res.json(error)
  }
  return
})

// El order_Detail nunca se eliminar de la base de datos.

/* router.delete('/:id', async (req, res) => {
  try{
    const deleteOrders_details: any = await orders_details.deleteOrder_Detail(req.params)
    res.json(deleteOrders_details)
  }catch (error: any){
    res.status(400).json({ error: error.message})
  }
}) */

export default router
