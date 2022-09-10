import { Router } from "express";
import { getCartAmount } from "../controllers/Amount";

const Ammount = Router()

Ammount.get('/cart/ammount/:email', async (req, res) => {
    try {
        const ammount: any = getCartAmount(req.params.email)
        if (ammount) {
            res.status(200).send(ammount)
        }
    } catch (error) {
        console.log(error);
    }
})